/* Narration. The mp3s are generated once by tools/make-audio.mjs and shipped with
   the site, so nothing here calls an API or costs anything to play. */
(function () {
  const R = window.AegeanReader, D = window.AEGEAN;
  if (!R || !D) return;

  let manifest = null;
  const audio = new Audio();
  audio.preload = 'none';
  let currentN = null;
  let autoAdvance = false;

  const keyFor = stop => `${stop.place}|${stop.title}`;
  const entryForN = n => (manifest && D.stops[n - 1]) ? manifest[keyFor(D.stops[n - 1])] : null;

  // Called straight from a click, never deferred, so the gesture is not lost.
  function play(n) {
    const entry = entryForN(n);
    if (!entry) return false;
    if (currentN !== n) { audio.src = entry.file; currentN = n; }
    const p = audio.play();
    if (p && p.catch) p.catch(() => {});
    return true;
  }

  fetch('audio/manifest.json')
    .then(r => (r.ok ? r.json() : null))
    .then(m => { manifest = m; refresh(); })
    .catch(() => { manifest = null; });

  const fmt = s => (s == null ? '' : `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`);

  function control(n, entry) {
    const wrap = document.createElement('div');
    wrap.className = 'listen';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'listen-play';
    const time = document.createElement('span');
    time.className = 'listen-time';

    const isThis = () => currentN === n;
    const playing = () => isThis() && !audio.paused && !audio.ended;
    function paint() {
      btn.setAttribute('aria-label', playing() ? 'Pause' : 'Play the narration');
      const icon = playing()
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1"/><rect x="13.5" y="5" width="4" height="14" rx="1"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.2v13.6a1 1 0 0 0 1.53.85l10.2-6.8a1 1 0 0 0 0-1.7L9.53 4.35A1 1 0 0 0 8 5.2z"/></svg>';
      const left = playing() && audio.duration ? audio.duration - audio.currentTime : entry.seconds;
      btn.innerHTML = `${icon}<span>${playing() ? 'Pause' : 'Listen to this'}</span>`;
      time.textContent = playing() ? `${fmt(left)} left` : fmt(entry.seconds);
      wrap.classList.toggle('on', playing());
    }

    btn.addEventListener('click', () => {
      if (playing()) { audio.pause(); paint(); return; }
      play(n);
      paint();
    });

    ['play', 'pause', 'ended', 'timeupdate', 'loadedmetadata'].forEach(e => audio.addEventListener(e, () => { if (wrap.isConnected) paint(); }));
    wrap.append(btn, time);
    paint();
    return wrap;
  }

  audio.addEventListener('ended', () => {
    if (!autoAdvance) return;
    const next = R.state.stopIndex + 1;
    if (next < D.stops.length) { R.goToStop(next); play(next + 1); }
    else {
      autoAdvance = false;
      const b = document.querySelector('.listen-all');
      if (b) { b.classList.remove('on'); b.textContent = 'Play through'; }
    }
  });

  function refresh() {
    if (!manifest) return;
    const inner = document.querySelector('.reader-inner');
    if (!inner) return;
    inner.querySelectorAll('.listen').forEach(el => el.remove());
    inner.querySelectorAll('.stop').forEach(sec => {
      const n = parseInt((sec.id || '').replace('stop-', ''), 10);
      const stop = D.stops[n - 1];
      if (!stop) return;
      const entry = manifest[`${stop.place}|${stop.title}`];
      if (!entry) return;
      const title = sec.querySelector('.stop-title');
      if (title) title.insertAdjacentElement('afterend', control(n, entry));
    });
  }

  R.onChange(() => {
    // A new stop was opened; stop whatever was playing unless it is this one.
    const st = R.state;
    const n = st.stopIndex >= 0 ? st.stopIndex + 1 : null;
    if (currentN != null && currentN !== n && !autoAdvance) { audio.pause(); }
    setTimeout(refresh, 0);
  });

  // "Play them all" lives on the tour bar.
  function mountAll() {
    const nav = document.querySelector('.tour-nav');
    if (!nav || nav.querySelector('.listen-all')) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'listen-all';
    b.textContent = 'Play through';
    b.addEventListener('click', () => {
      autoAdvance = !autoAdvance;
      b.classList.toggle('on', autoAdvance);
      b.textContent = autoAdvance ? 'Stop playing' : 'Play through';
      if (autoAdvance) {
        if (R.state.stopIndex < 0) R.goToStop(0);
        const n = R.state.stopIndex + 1;
        if (!play(n)) {
          autoAdvance = false; b.classList.remove('on'); b.textContent = 'Play through';
        }
      } else audio.pause();
    });
    nav.insertBefore(b, nav.querySelector('.pos'));
  }
  if (document.readyState !== 'loading') mountAll();
  else document.addEventListener('DOMContentLoaded', mountAll);
})();
