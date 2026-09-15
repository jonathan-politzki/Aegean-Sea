/* The plate: hotspot overlay + pan/zoom for index.html */
(function () {
  const D = window.AEGEAN, R = window.AegeanReader;
  const stage = document.querySelector('.stage');
  const plate = document.querySelector('.plate');
  const img = plate.querySelector('img');
  const svg = plate.querySelector('svg');
  const W = 884, H = 1348;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const NS = 'http://www.w3.org/2000/svg';

  // Hotspots
  D.places.forEach((p, i) => {
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'spot'); g.dataset.id = p.id; g.style.setProperty('--i', i);
    g.setAttribute('role', 'button'); g.setAttribute('tabindex', '0');
    g.setAttribute('aria-label', p.modern);
    const cx = p.x / 100 * W, cy = p.y / 100 * H, rx = p.rx / 100 * W, ry = p.ry / 100 * W;
    const wash = document.createElementNS(NS, 'ellipse');
    wash.setAttribute('class', 'wash'); wash.setAttribute('cx', cx); wash.setAttribute('cy', cy); wash.setAttribute('rx', rx); wash.setAttribute('ry', ry);
    if (p.rot) wash.setAttribute('transform', `rotate(${p.rot} ${cx} ${cy})`);
    const hit = document.createElementNS(NS, 'ellipse');
    hit.setAttribute('class', 'hit'); hit.setAttribute('cx', cx); hit.setAttribute('cy', cy); hit.setAttribute('rx', rx + 10); hit.setAttribute('ry', ry + 10);
    if (p.rot) hit.setAttribute('transform', `rotate(${p.rot} ${cx} ${cy})`);
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', cx); t.setAttribute('y', cy - ry - 6); t.setAttribute('text-anchor', 'middle'); t.textContent = (p.label || p.modern).split(':')[0];
    g.append(wash, hit, t);
    g.addEventListener('click', e => { e.stopPropagation(); if (!moved) R.goToPlace(p.id); });
    g.addEventListener('pointerup', e => { e.stopPropagation(); });
    g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); R.goToPlace(p.id); } });
    svg.appendChild(g);
  });
  stage.classList.add('painting');
  setTimeout(() => stage.classList.remove('painting'), 3000);

  R.onChange(st => {
    svg.querySelectorAll('.spot').forEach(g => g.classList.toggle('active', g.dataset.id === st.placeId));
    if (st.placeId) focusOn(R.byId[st.placeId]);
  });

  // Pan / zoom
  let scale = 1, tx = 0, ty = 0, minScale = 1, moved = false;
  const apply = () => { plate.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`; };
  const phone = () => window.matchMedia('(max-width: 860px)').matches;
  // The sheet covers the bottom of the stage on phones. Measure it rather than
  // assuming a fraction of the stage: the masthead wraps to two rows on narrow
  // screens, which changes the stage height without changing the sheet height.
  const reader = document.querySelector('.reader');
  const visH = () => {
    if (!phone() || !reader) return stage.clientHeight;
    const cover = Math.min(reader.getBoundingClientRect().height, stage.clientHeight * 0.6);
    return Math.max(100, stage.clientHeight - cover);
  };
  function fit() {
    const sw = stage.clientWidth, sh = visH();
    const s = phone() ? sw / W : Math.min(sw / W, sh / H) * 0.96;
    minScale = s; scale = s;
    plate.style.width = W + 'px';
    tx = (sw - W * s) / 2;
    ty = phone() ? sh / 2 - 0.62 * H * s : (sh - H * s) / 2; // phones open on the heart of the Cyclades
    clamp(); apply();
  }
  function clamp() {
    const sw = stage.clientWidth, sh = visH(), w = W * scale, h = H * scale;
    tx = w <= sw ? (sw - w) / 2 : Math.min(0, Math.max(sw - w, tx));
    ty = h <= sh ? (sh - h) / 2 : Math.min(0, Math.max(sh - h, ty));
  }
  function zoomAt(f, px, py) {
    const ns = Math.max(minScale, Math.min(minScale * 6, scale * f));
    const k = ns / scale;
    tx = px - (px - tx) * k; ty = py - (py - ty) * k; scale = ns; clamp(); apply();
  }
  function focusOn(p) {
    // On phones the sheet covers the bottom; centre the spot in the visible strip.
    const sw = stage.clientWidth, sh = visH();
    scale = Math.max(scale, minScale * (phone() ? 1.9 : 1.6));
    tx = sw / 2 - p.x / 100 * W * scale;
    ty = sh / 2 - p.y / 100 * H * scale;
    clamp(); plate.style.transition = 'transform .45s ease'; apply();
    setTimeout(() => plate.style.transition = '', 500);
  }
  const pointers = new Map(); let lastDist = 0, start = null;
  stage.addEventListener('pointerdown', e => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); moved = false;
    if (pointers.size === 1) start = { x: e.clientX, y: e.clientY, tx, ty };
    stage.setPointerCapture(e.pointerId); stage.classList.add('dragging');
  });
  stage.addEventListener('pointermove', e => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1 && start) {
      const dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (Math.hypot(dx, dy) > 4) moved = true;
      tx = start.tx + dx; ty = start.ty + dy; clamp(); apply();
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const rect = stage.getBoundingClientRect();
      const mx = (a.x + b.x) / 2 - rect.left, my = (a.y + b.y) / 2 - rect.top;
      if (lastDist) zoomAt(dist / lastDist, mx, my);
      lastDist = dist; moved = true;
    }
  });
  // Pointer capture (needed for smooth dragging) retargets the click away from the
  // island, so selection is resolved here by hit-testing the point that was lifted.
  function selectAt(cx, cy) {
    const el = document.elementFromPoint(cx, cy);
    const g = el && el.closest ? el.closest('.spot') : null;
    if (g && g.dataset.id) { R.goToPlace(g.dataset.id); return true; }
    return false;
  }
  const up = e => {
    const had = pointers.has(e.pointerId);
    pointers.delete(e.pointerId);
    if (pointers.size < 2) lastDist = 0;
    if (!pointers.size) {
      if (had && !moved) selectAt(e.clientX, e.clientY);
      start = null; stage.classList.remove('dragging');
    }
  };
  stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
  stage.addEventListener('wheel', e => { e.preventDefault(); const r = stage.getBoundingClientRect(); zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX - r.left, e.clientY - r.top); }, { passive: false });
  stage.addEventListener('dblclick', e => { const r = stage.getBoundingClientRect(); zoomAt(scale > minScale * 1.5 ? 0.3 : 2.2, e.clientX - r.left, e.clientY - r.top); });
  document.querySelector('.zoom .in').addEventListener('click', () => zoomAt(1.4, stage.clientWidth / 2, stage.clientHeight / 2));
  document.querySelector('.zoom .out').addEventListener('click', () => zoomAt(1 / 1.4, stage.clientWidth / 2, stage.clientHeight / 2));
  window.addEventListener('resize', fit);
  // The masthead can rewrap after load, which changes the stage height without a
  // window resize. Refit whenever the stage itself changes size.
  if (window.ResizeObserver) {
    let last = 0;
    new ResizeObserver(() => {
      const h = stage.clientHeight + stage.clientWidth;
      if (!h || h === last) return;
      const first = last === 0;
      last = h;
      if (first) { fit(); return; }
      clamp(); apply();
      if (scale <= minScale * 1.02) fit();
    }).observe(stage);
  }
  if (img.complete) fit(); else img.addEventListener('load', fit);
  fit();

  // Deep link: index.html#<placeId> opens that island. Deferred by a tick because the
  // reader is mounted by an inline script that runs after this file.
  function fromHash() {
    let id = '';
    try { id = decodeURIComponent(location.hash.replace(/^#/, '')); } catch (e) { return; }
    if (id && R.byId[id]) R.goToPlace(id);
  }
  setTimeout(fromHash, 0);
  window.addEventListener('hashchange', fromHash);
})();
