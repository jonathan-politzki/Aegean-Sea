/* Shared reader + tour logic. Used by index.html and ar.html. */
(function () {
  const D = window.AEGEAN; D.fishes = window.AEGEAN_FISHES || [];
  const byId = Object.fromEntries(D.places.map(p => [p.id, p]));
  const stopsFor = id => D.stops.filter(s => s.place === id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const state = { placeId: null, stopIndex: -1 };
  const listeners = [];
  const onChange = fn => listeners.push(fn);
  const emit = () => listeners.forEach(fn => fn(state));

  function renderStop(s, i) {
    const n = D.stops.indexOf(s) + 1;
    let h = `<section class="stop" id="stop-${n}">`;
    h += `<p class="stop-era">${esc(s.era)}</p>`;
    h += `<h3 class="stop-title">${esc(s.title)}</h3>`;
    if (s.draft) h += `<p class="draft">${esc(s.draft)}</p>`;
    (s.text || []).forEach(p => { h += `<p>${esc(p)}</p>`; });
    if (s.quote) h += `<blockquote>${esc(s.quote.text)}<cite>${esc(s.quote.cite)}</cite></blockquote>`;
    if (s.fishes && s.fishes.length && D.fishes.length) {
      const links = s.fishes.map(id => { const f = D.fishes.find(x => x.id === id); return f ? `<a href="fishes.html#${esc(id)}">${esc(f.en)}</a>` : ''; }).filter(Boolean);
      if (links.length) h += `<p class="fishlinks">In the species guide: ${links.join(', ')}.</p>`;
    }
    if (s.sources && s.sources.length) {
      h += `<ol class="sources">` + s.sources.map(src => `<li>${src.url ? `<a href="${esc(src.url)}" target="_blank" rel="noopener">${esc(src.title)}</a>` : esc(src.title)}</li>`).join('') + `</ol>`;
    }
    return h + `</section>`;
  }

  function renderPlace(el, placeId, focusStop) {
    const p = byId[placeId];
    const stops = stopsFor(placeId);
    let h = `<p class="place-plate">${esc(p.plate)} on the map</p>`;
    h += `<h2 class="place-name">${esc(p.modern)}</h2>`;
    h += `<p class="place-ancient">${esc(p.ancient)} to the ancients</p>`;
    if (!stops.length) h += `<p class="no-stop">No stop on this walk lands here. Use Earlier and Later to follow the sea in order, or tap another island.</p>`;
    stops.forEach((s, i) => h += renderStop(s, i));
    el.innerHTML = h;
    if (focusStop) {
      const n = D.stops.indexOf(focusStop) + 1;
      const target = el.querySelector(`#stop-${n}`);
      if (target && stops.indexOf(focusStop) > 0) target.scrollIntoView({ block: 'start', behavior: 'auto' });
      else el.closest('.reader')?.scrollTo({ top: 0 });
    } else el.closest('.reader')?.scrollTo({ top: 0 });
  }

  function renderIntro(el) {
    el.innerHTML = `<div class="intro">
      <h2>${esc(D.title)}</h2>
      <p>${esc(D.dedication)}</p>
      <p>The plate is Alain Manesson Mallet's, engraved in Paris in 1683. Tap any island to read what people have caught there, and how, from the first boats to this year. Or walk the whole sea in order.</p>
      <button class="start" type="button">Walk the sea from the beginning</button>
    </div>`;
    el.querySelector('.start').addEventListener('click', () => goToStop(0));
  }

  function goToStop(i) {
    if (i < 0 || i >= D.stops.length) return;
    state.stopIndex = i; state.placeId = D.stops[i].place; emit();
  }
  function goToPlace(id) {
    const first = D.stops.findIndex(s => s.place === id);
    state.placeId = id; state.stopIndex = first; emit();
  }

  function mountReader(readerEl) {
    const inner = readerEl.querySelector('.reader-inner');
    const nav = readerEl.querySelector('.tour-nav');
    const prev = nav.querySelector('.prev'), next = nav.querySelector('.next'), pos = nav.querySelector('.pos');
    renderIntro(inner);
    prev.addEventListener('click', () => goToStop(state.stopIndex - 1));
    next.addEventListener('click', () => goToStop(state.stopIndex + 1));
    onChange(st => {
      if (st.placeId) renderPlace(inner, st.placeId, D.stops[st.stopIndex]);
      prev.disabled = st.stopIndex <= 0;
      next.disabled = st.stopIndex >= D.stops.length - 1;
      pos.textContent = st.stopIndex >= 0 ? `Stop ${st.stopIndex + 1} of ${D.stops.length}` : `${D.stops.length} stops`;
    });
    pos.textContent = `${D.stops.length} stops`;
    prev.disabled = true; next.disabled = D.stops.length === 0;
    // phone: tap the handle to grow/shrink the sheet
    const handle = readerEl.querySelector('.handle');
    if (handle) handle.addEventListener('click', () => readerEl.classList.toggle('tall'));
  }

  window.AegeanReader = { state, onChange, goToStop, goToPlace, mountReader, byId, stopsFor };
})();
