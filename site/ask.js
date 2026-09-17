/* Ask the map a question out loud. Records, sends to /api/ask, speaks the answer back.
   Degrades quietly: if the endpoint is not there (running the files locally, or no key
   configured), the button hides itself rather than sitting there broken. */
(function () {
  const R = window.AegeanReader;
  if (!R) return;

  let rec = null, chunks = [], busy = false, available = null;
  const player = new Audio();

  const el = document.createElement('div');
  el.className = 'ask';
  el.hidden = true;
  el.innerHTML = `
    <button class="ask-mic" type="button" aria-label="Ask a question out loud">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z"/><path d="M18 11a1 1 0 1 0-2 0 4 4 0 0 1-8 0 1 1 0 1 0-2 0 6 6 0 0 0 5 5.91V19H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-2.09A6 6 0 0 0 18 11z"/></svg>
      <span class="ask-label">Ask the map</span>
    </button>
    <div class="ask-out" hidden><p class="ask-q"></p><p class="ask-a"></p></div>`;

  const mic = el.querySelector('.ask-mic');
  const label = el.querySelector('.ask-label');
  const out = el.querySelector('.ask-out');
  const qEl = el.querySelector('.ask-q');
  const aEl = el.querySelector('.ask-a');

  function say(t) { label.textContent = t; }

  async function probe() {
    if (available !== null) return available;
    try {
      const r = await fetch('api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
      available = r.status !== 404 && r.status !== 405;
    } catch { available = false; }
    el.hidden = !available;
    return available;
  }

  async function start() {
    if (busy) return;
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { say('Not supported here'); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find(m => MediaRecorder.isTypeSupported(m)) || '';
      rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      chunks = [];
      rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
      rec.onstop = () => { stream.getTracks().forEach(t => t.stop()); send(new Blob(chunks, { type: rec.mimeType || 'audio/webm' })); };
      rec.start();
      el.classList.add('recording');
      say('Listening, tap to stop');
      setTimeout(() => { if (rec && rec.state === 'recording') stop(); }, 30000);
    } catch { say('Microphone blocked'); }
  }

  function stop() { if (rec && rec.state === 'recording') rec.stop(); rec = null; el.classList.remove('recording'); }

  async function send(blob) {
    busy = true; say('Thinking');
    try {
      const b64 = await new Promise(res => { const f = new FileReader(); f.onload = () => res(String(f.result).split(',')[1]); f.readAsDataURL(blob); });
      const r = await fetch('api/ask', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audio: b64, mime: blob.type, place: R.state.placeId || null }),
      });
      const data = await r.json();
      if (r.status === 503) { el.hidden = true; return; }
      if (!r.ok) { qEl.textContent = ''; aEl.textContent = data.error || 'That did not work.'; out.hidden = false; }
      else {
        qEl.textContent = data.question ? `"${data.question}"` : '';
        aEl.textContent = data.answer;
        out.hidden = false;
        if (data.audio) { player.src = 'data:audio/mp3;base64,' + data.audio; player.play().catch(() => {}); }
      }
    } catch { aEl.textContent = 'Could not reach the map.'; out.hidden = false; }
    busy = false; say('Ask the map');
  }

  mic.addEventListener('click', () => {
    if (el.classList.contains('recording')) stop();
    else { out.hidden = true; player.pause(); start(); }
  });

  function mount() {
    const nav = document.querySelector('.tour-nav');
    const inner = document.querySelector('.reader-inner');
    const host = inner || nav;
    if (!host || el.isConnected) return;
    (nav || host).parentNode.insertBefore(el, nav || null);
    probe();
  }
  if (document.readyState !== 'loading') mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
