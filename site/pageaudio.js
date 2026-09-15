/* Narration for the pages that are not the map.
   A page declares what it wants with  <body data-audio="overview">  for a single
   walkthrough, and/or  data-fish-audio  to put a short recording on every species.
   The mp3s ship with the site, so nothing here calls an API. */
(function () {
  const audio = new Audio();
  audio.preload = 'none';
  let currentKey = null;
  let manifest = null;

  const fmt = s => (s == null ? '' : `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`);

  function play(key, file) {
    if (currentKey !== key) { audio.src = file; currentKey = key; }
    const p = audio.play();
    if (p && p.catch) p.catch(() => {});
  }

  function control(key, entry, { label = 'Listen to this', big = false } = {}) {
    const wrap = document.createElement('div');
    wrap.className = 'listen' + (big ? ' listen-big' : '');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'listen-play';
    const time = document.createElement('span');
    time.className = 'listen-time';

    const playing = () => currentKey === key && !audio.paused && !audio.ended;
    function paint() {
      const icon = playing()
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1"/><rect x="13.5" y="5" width="4" height="14" rx="1"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.2v13.6a1 1 0 0 0 1.53.85l10.2-6.8a1 1 0 0 0 0-1.7L9.53 4.35A1 1 0 0 0 8 5.2z"/></svg>';
      btn.innerHTML = `${icon}<span>${playing() ? 'Pause' : label}</span>`;
      btn.setAttribute('aria-label', playing() ? 'Pause' : label);
      const left = playing() && audio.duration ? audio.duration - audio.currentTime : entry.seconds;
      time.textContent = playing() ? `${fmt(left)} left` : fmt(entry.seconds);
      wrap.classList.toggle('on', playing());
    }
    btn.addEventListener('click', () => {
      if (playing()) { audio.pause(); paint(); return; }
      play(key, entry.file);
      paint();
    });
    ['play', 'pause', 'ended', 'timeupdate', 'loadedmetadata'].forEach(e =>
      audio.addEventListener(e, () => { if (wrap.isConnected) paint(); }));
    wrap.append(btn, time);
    paint();
    return wrap;
  }

  function mount() {
    if (!manifest) return;
    const body = document.body;

    // One walkthrough for the whole page.
    const slug = body.dataset.audio;
    if (slug) {
      const entry = manifest[`page|${slug}`];
      const main = document.querySelector('main');
      if (entry && main && !main.querySelector('.page-listen')) {
        const holder = document.createElement('div');
        holder.className = 'page-listen';
        holder.appendChild(control(`page|${slug}`, entry, { label: 'Listen to this page', big: true }));
        const header = main.querySelector('header');
        if (header) header.insertAdjacentElement('afterend', holder);
        else main.prepend(holder);
      }
    }

    // One short recording per species.
    if (body.hasAttribute('data-fish-audio')) {
      document.querySelectorAll('article.fish').forEach(art => {
        if (art.querySelector('.listen')) return;
        const entry = manifest[`fish|${art.id}`];
        if (!entry) return;
        const names = art.querySelector('.names');
        const c = control(`fish|${art.id}`, entry, { label: 'Listen' });
        if (names) names.insertAdjacentElement('afterend', c);
      });
    }
  }

  fetch('audio/manifest.json')
    .then(r => (r.ok ? r.json() : null))
    .then(m => { manifest = m; mount(); })
    .catch(() => {});

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => mount());
})();
