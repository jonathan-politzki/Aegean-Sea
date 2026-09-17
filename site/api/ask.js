// Answers a spoken question about the map. Runs on Vercel, holds the API key server side.
// POST { audio: "<base64 webm>", mime: "audio/webm", place: "milos" }
//   -> { question, answer, audio: "<base64 mp3>" }
// POST { text: "how did they catch tuna?", place: "milos" }  works too, for typing.
import { KNOWLEDGE } from '../lib/knowledge.js';

const CHAT_MODEL = process.env.ASK_CHAT_MODEL || 'gpt-4o-mini';
const STT_MODEL = process.env.ASK_STT_MODEL || 'whisper-1';
const TTS_MODEL = process.env.ASK_TTS_MODEL || 'gpt-4o-mini-tts';
const VOICE = process.env.ASK_VOICE || 'onyx';

const MAX_AUDIO_BYTES = 2_000_000;   // about 40 seconds of webm opus
const MAX_QUESTION = 400;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;

const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 500) for (const [k, v] of hits) if (!v.some(t => now - t < WINDOW_MS)) hits.delete(k);
  return list.length > MAX_PER_WINDOW;
}

const SYSTEM = `You are the voice of a 1683 map of the Aegean that hangs on the wall of a man named Cole, who fishes and reads ancient history. He is pointing his phone at the map and asking you questions out loud.

Answer only from the SOURCE below. It is the whole of what you know. If the answer is not in it, say plainly that the map's notes do not cover it, and offer the nearest thing that is in there. Never invent a date, a number, a name or a quotation. If the source hedges a claim, hedge it too.

Speak the way a good museum guide speaks aloud: three or four sentences, plain words, concrete facts, no preamble, no restating the question, no lists. Do not use em dashes. Do not say "great question". Start with the answer.

SOURCE:
${KNOWLEDGE}`;

async function openai(url, body, headers = {}) {
  const res = await fetch(`https://api.openai.com/v1/${url}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, ...headers },
    body,
  });
  if (!res.ok) throw new Error(`${url} ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: 'No API key is configured on the server, so questions are switched off. The narration still works.' });
  }
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return res.status(429).json({ error: 'That is a lot of questions at once. Give it a minute.' });

  try {
    const { audio, mime, text, place } = req.body || {};
    let question = (text || '').slice(0, MAX_QUESTION).trim();

    if (!question) {
      if (!audio) return res.status(400).json({ error: 'Nothing to answer.' });
      const buf = Buffer.from(audio, 'base64');
      if (buf.length > MAX_AUDIO_BYTES) return res.status(413).json({ error: 'That was too long. Keep it under about half a minute.' });
      const form = new FormData();
      form.append('file', new Blob([buf], { type: mime || 'audio/webm' }), 'question.webm');
      form.append('model', STT_MODEL);
      const r = await openai('audio/transcriptions', form);
      question = ((await r.json()).text || '').slice(0, MAX_QUESTION).trim();
    }
    if (!question) return res.status(400).json({ error: 'I could not make that out. Try again.' });

    const where = place ? `The reader is currently looking at ${place} on the map.` : '';
    const chat = await openai('chat/completions', JSON.stringify({
      model: CHAT_MODEL,
      max_tokens: 220,
      temperature: 0.3,
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: `${where}\n\nQuestion: ${question}` },
      ],
    }), { 'Content-Type': 'application/json' });
    const answer = ((await chat.json()).choices?.[0]?.message?.content || '').trim().replace(/—/g, ', ');
    if (!answer) return res.status(502).json({ error: 'No answer came back.' });

    let spoken = null;
    try {
      const tts = await openai('audio/speech', JSON.stringify({
        model: TTS_MODEL, voice: VOICE, input: answer, response_format: 'mp3',
        instructions: 'Unhurried, warm and plain, like a museum guide answering a question.',
      }), { 'Content-Type': 'application/json' });
      spoken = Buffer.from(await tts.arrayBuffer()).toString('base64');
    } catch (e) { /* text still works without audio */ }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ question, answer, audio: spoken });
  } catch (e) {
    const msg = String(e.message || e);
    if (/insufficient_quota|no credits|429/.test(msg)) {
      return res.status(503).json({ error: 'Questions are switched off at the moment. The narration and everything else still works.' });
    }
    return res.status(500).json({ error: 'Something went wrong asking that. Try again in a moment.' });
  }
}
