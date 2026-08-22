// R3.1 state probes — evaluated in the page. Each returns { ok, detail }.
// The R3 probes, carried forward with the four changed slides re-probed
// against the revision brief: the Argentina saved column, the ladder's
// three-state threshold ticks (data-mark off/dim/bright, warm white when
// bright, never the accent) and their perpendicularity to the rising line,
// the palladium slide's five builds including the second-epoch line, and
// the rebuilt credit tower — slab widths inverted against the stack, the
// settle, the two link captions, the recede + foundation emphasis, and the
// held drop line as the final state with no copy on stage.

function probeInPage({ id, build }) {
  const q = (sel) => document.querySelector(sel);
  const qa = (sel) => Array.from(document.querySelectorAll(sel));
  const issues = [];
  const near = (a, b, tol) => Math.abs(a - b) <= tol;
  const opacity = (el) => (el ? parseFloat(getComputedStyle(el).opacity) : -1);
  const visibleAttr = (el) => el && el.dataset.visible === 'true';
  const matrixOf = (el) => {
    const t = getComputedStyle(el).transform;
    if (!t || t === 'none') return [1, 0, 0, 1, 0, 0];
    const m = t.match(/matrix\(([^)]+)\)/);
    return m ? m[1].split(',').map(parseFloat) : [1, 0, 0, 1, 0, 0];
  };
  const scaleOf = (el) => matrixOf(el)[0];
  const translateY = (el) => matrixOf(el)[5];
  const isAccent = (color) => /247,\s*147,\s*26/.test(color);
  // The bright threshold is --unit-warm-bright (#FEF4E8).
  const isWarmWhite = (color) => /254,\s*244,\s*232/.test(color);

  const active = q('.deck-slide[data-active="true"]');
  if (!active) return { ok: false, detail: 'no active container' };

  // ----- The waypoint interstitials (unchanged at R3.1) -----
  if (id === '3-00-waypoint-function' || id === '3-08-waypoint-judge') {
    const way = q('.wayline');
    if (!way) return { ok: false, detail: 'no wayline' };
    const wps = qa('.wayline__wp');
    const dots = qa('.wayline__dot');
    if (build === 0) {
      if (opacity(way) > 0.02) issues.push(`b0 device visible o=${opacity(way)}`);
    } else {
      if (opacity(way) < 0.95) issues.push(`device o=${opacity(way)}`);
      const completed = id === '3-00-waypoint-function' ? [0] : [0, 1];
      const activeIdx = build === 2 ? (id === '3-00-waypoint-function' ? 1 : 2) : -1;
      wps.forEach((wp, i) => {
        const want = i === activeIdx ? 'active' : completed.includes(i) ? 'completed' : 'upcoming';
        if (wp.dataset.state !== want) issues.push(`wp${i} state=${wp.dataset.state} want=${want}`);
      });
      if (activeIdx >= 0) {
        const dot = dots[activeIdx];
        const bg = getComputedStyle(dot).backgroundColor;
        if (!isAccent(bg)) issues.push(`ignited dot not accent: ${bg}`);
        if (!near(scaleOf(dot), 2, 0.25)) issues.push(`ignited dot scale=${scaleOf(dot)}`);
      }
      const canvas = q('.deck-canvas').getBoundingClientRect();
      const s = canvas.width / 1920;
      const centers = dots.map((d) => {
        const r = d.getBoundingClientRect();
        return { x: (r.left + r.width / 2 - canvas.left) / s, y: (r.top + r.height / 2 - canvas.top) / s };
      });
      if (!near(centers[0].y, centers[1].y, 0.75) || !near(centers[1].y, centers[2].y, 0.75)) {
        issues.push(`dot ys ${centers.map((c) => c.y.toFixed(1))}`);
      }
      if (!near(centers[1].x - centers[0].x, 490, 1.5) || !near(centers[2].x - centers[1].x, 490, 1.5)) {
        issues.push(`dot pitch ${(centers[1].x - centers[0].x).toFixed(1)}/${(centers[2].x - centers[1].x).toFixed(1)}`);
      }
    }
    return { ok: issues.length === 0, detail: issues.join('; ') || `wayline b${build} exact` };
  }

  // ----- 3.1 the three functions (unchanged at R3.1) -----
  if (id === '3-01-the-three-functions') {
    const token = q('.s3f-functions__token');
    const fns = ['sov', 'moe', 'uoa'];
    if ((build >= 1) !== (opacity(token) > 0.9)) issues.push(`token o=${opacity(token)} at b${build}`);
    fns.forEach((key, i) => {
      const wantOn = build >= i + 2;
      const fn = q(`.s3f-functions__fn[data-fn="${key}"]`);
      const spoke = q(`.s3f-functions__spoke[data-fn="${key}"]`);
      if (wantOn !== (opacity(fn) > 0.9)) issues.push(`${key} block o=${opacity(fn)}`);
      const parts = matrixOf(spoke);
      const sc = key === 'uoa' ? parts[3] : parts[0];
      if (wantOn !== (sc > 0.95)) issues.push(`${key} spoke scale=${sc}`);
    });
    const cont = q('.s3f-functions__continuity');
    if ((build >= 5) !== (opacity(cont) > 0.9)) issues.push(`continuity o=${opacity(cont)}`);
    if (build >= 2) {
      const txt = q('.s3f-functions__fn[data-fn="sov"] .s3f-functions__text').textContent;
      if (txt !== 'STORE OF VALUE — moves value through time.') issues.push(`sov copy "${txt}"`);
    }
    return { ok: issues.length === 0, detail: issues.join('; ') || `functions b${build} exact` };
  }

  // ----- 3.2 the functions separate (R3.1 §A: the saved column) -----
  if (id === '3-02-the-functions-separate') {
    const heads = qa('.s3f-separate__head');
    const cells = qa('.s3f-separate__cell');
    const headsOn = heads.every((h) => opacity(h) > 0.9);
    if ((build >= 1) !== headsOn) issues.push(`heads at b${build}`);
    const kicker = q('.s3f-separate__kicker');
    if ((build >= 2) !== (opacity(kicker) > 0.9)) issues.push(`kicker o=${opacity(kicker)}`);
    const cellsOn = cells.every((c) => opacity(c) > 0.9);
    if ((build >= 2) !== cellsOn) issues.push(`cells at b${build}`);
    if (build >= 2) {
      const savedGlyphs = qa('.s3f-separate__cell[data-col="2"] .s3f-separate__glyph svg');
      if (savedGlyphs.length !== 2) issues.push(`saved column glyphs=${savedGlyphs.length}`);
      if (kicker.textContent !== 'Argentina, five decades.') issues.push('kicker copy');
      // R3.1 §A1: the saved column names the goods; the brick glyph stays.
      const words = qa('.s3f-separate__word').map((w) => w.textContent);
      const want = ['dollars', 'pesos', 'dollars · real estate'];
      want.forEach((w, i) => {
        if (words[i] !== w) issues.push(`col${i} word "${words[i]}" want "${w}"`);
      });
    }
    const principle = q('.s3f-separate__principle');
    if ((build >= 3) !== (opacity(principle) > 0.9)) issues.push(`principle o=${opacity(principle)}`);
    return { ok: issues.length === 0, detail: issues.join('; ') || `separate b${build} exact` };
  }

  // ----- The ladder slides -----
  // R3.1 §B1: thresholds are three-valued. g1 goes dim with COLLECTIBLE and
  // bright with the store-of-value reveal; g2 dim with store of value,
  // bright with the acceptance gate line; g3 dim with the medium of
  // exchange, bright with the contracts gate line.
  const ALL_BRIGHT = { g1: 'bright', g2: 'bright', g3: 'bright' };
  const ALL_OFF = { g1: 'off', g2: 'off', g3: 'off' };
  const ladderExpect = {
    '3-03-the-order-of-monetization': (b) => ({
      line: b >= 1,
      stages: {
        collectible: b >= 2 ? 'revealed' : 'upcoming',
        sov: b >= 6 ? 'foundation' : b >= 3 ? 'revealed' : 'upcoming',
        moe: b >= 4 ? 'revealed' : 'upcoming',
        uoa: b >= 5 ? 'revealed' : 'upcoming'
      },
      gates: {
        g1: b >= 3 ? 'bright' : b >= 2 ? 'dim' : 'off',
        g2: b >= 4 ? 'bright' : b >= 3 ? 'dim' : 'off',
        g3: b >= 5 ? 'bright' : b >= 4 ? 'dim' : 'off'
      },
      bracket: false,
      entity: false
    }),
    '3-04-stage-signatures': (b) => ({
      line: true,
      stages: { collectible: 'revealed', sov: 'revealed', moe: 'revealed', uoa: 'revealed' },
      gates: ALL_BRIGHT,
      bracket: b >= 1,
      entity: false
    }),
    '3-07-where-bitcoin-is': (b) => ({
      line: b >= 1,
      stages: b >= 1
        ? { collectible: 'revealed', sov: 'revealed', moe: 'revealed', uoa: 'revealed' }
        : { collectible: 'upcoming', sov: 'upcoming', moe: 'upcoming', uoa: 'upcoming' },
      gates: b >= 1 ? ALL_BRIGHT : ALL_OFF,
      bracket: false,
      entity: b >= 2
    })
  };

  if (ladderExpect[id]) {
    const want = ladderExpect[id](build);
    const ladder = q('.s3f-ladder');
    if (!ladder) return { ok: false, detail: 'no ladder' };
    const line = q('.s3f-ladder__line');
    if (want.line !== (scaleOf(line) > 0.95)) issues.push(`line scale=${scaleOf(line)}`);
    Object.entries(want.stages).forEach(([key, state]) => {
      const stop = q(`.s3f-ladder__stop[data-stage="${key}"]`);
      if (stop.dataset.state !== state) issues.push(`${key}=${stop.dataset.state} want=${state}`);
      const label = stop.querySelector('.s3f-ladder__label');
      const on = state !== 'upcoming';
      if (on !== (opacity(label) > 0.5)) issues.push(`${key} label o=${opacity(label)}`);
      if (state === 'foundation') {
        const bg = getComputedStyle(stop.querySelector('.s3f-ladder__dot')).backgroundColor;
        if (!isAccent(bg)) issues.push(`foundation dot not accent: ${bg}`);
      }
      if (state === 'revealed' && key === 'sov') {
        const bg = getComputedStyle(stop.querySelector('.s3f-ladder__dot')).backgroundColor;
        if (isAccent(bg)) issues.push('sov dot accent while neutral');
      }
    });
    Object.entries(want.gates).forEach(([key, mark]) => {
      const gate = q(`.s3f-ladder__gate[data-gate="${key}"]`);
      if (gate.dataset.mark !== mark) issues.push(`${key} mark=${gate.dataset.mark} want=${mark}`);
      const o = opacity(gate);
      if (mark === 'off' && o > 0.05) issues.push(`${key} off but o=${o}`);
      if (mark !== 'off' && o < 0.9) issues.push(`${key} ${mark} but o=${o}`);
      const bg = getComputedStyle(gate).backgroundColor;
      if (isAccent(bg)) issues.push(`${key} threshold carries the accent: ${bg}`);
      if (mark === 'bright' && !isWarmWhite(bg)) issues.push(`${key} bright not warm white: ${bg}`);
      if (mark === 'dim' && isWarmWhite(bg)) issues.push(`${key} dim reads as bright: ${bg}`);
    });
    const bracket = q('.s3f-ladder__bracket');
    if (want.bracket !== (opacity(bracket) > 0.9)) issues.push(`bracket o=${opacity(bracket)}`);
    const entity = q('.s3f-ladder__entity');
    if (want.entity !== (opacity(entity) > 0.9)) issues.push(`entity o=${opacity(entity)}`);
    if (want.entity && !entity.querySelector('svg')) issues.push('entity glyph missing');
    // The retired arch glyph must not be back on the ladder.
    if (qa('.s3f-ladder__gate svg').length) issues.push('threshold renders a glyph');

    if (id === '3-03-the-order-of-monetization') {
      const pairs = [
        ['.s3f-order__kicker', build >= 1],
        ['.s3f-order__gateline[data-q="1"]', build >= 4],
        ['.s3f-order__gateline[data-q="2"]', build >= 5],
        ['.s3f-order__foundation', build >= 6]
      ];
      pairs.forEach(([sel, on]) => {
        const el = q(sel);
        if (!el) { if (on) issues.push(`${sel} missing`); return; }
        if (on !== visibleAttr(el)) issues.push(`${sel} visible=${el.dataset.visible} want=${on}`);
      });
      if (build >= 6) {
        const f = q('.s3f-order__foundation').textContent;
        const wantF = 'Store of value is the foundation function. The other functions are built on it.';
        if (f !== wantF) issues.push(`foundation copy "${f}"`);
      }
    }
    if (id === '3-04-stage-signatures') {
      const v = q('.s3f-signatures__verdict');
      if ((build >= 2) !== (v && visibleAttr(v))) issues.push('verdict visibility');
      const sig = q('.s3f-ladder__signature');
      if ((build >= 1) !== (opacity(sig) > 0.9)) issues.push(`signature o=${opacity(sig)}`);
    }
    if (id === '3-07-where-bitcoin-is') {
      const world = q('.s3f-bitcoin__world');
      const worldOn = build <= 4;
      if (worldOn !== (opacity(world) > 0.9)) issues.push(`world o=${opacity(world)} at b${build}`);
      const pairs = [
        ['.s3f-bitcoin__caption', build >= 2 && build <= 4],
        ['.s3f-bitcoin__literacy[data-line="1"]', build >= 3 && build <= 4],
        ['.s3f-bitcoin__literacy[data-line="2"]', build >= 3 && build <= 4],
        ['.s3f-bitcoin__honesty', build === 4],
        ['.s3f-bitcoin__handoff', build >= 5]
      ];
      pairs.forEach(([sel, on]) => {
        const el = q(sel);
        if (on !== (el && visibleAttr(el))) issues.push(`${sel} want=${on}`);
      });
      if (build >= 5) {
        const h = q('.s3f-bitcoin__handoff');
        if (opacity(h) < 0.9) issues.push(`handoff o=${opacity(h)}`);
      }
    }
    return { ok: issues.length === 0, detail: issues.join('; ') || `${id} b${build} exact` };
  }

  // ----- 3.5 the palladium test (R3.1 §C: five builds, two epochs) -----
  if (id === '3-05-the-palladium-test') {
    const hook = q('.s3f-palladium__hook');
    if ((build >= 1) !== (opacity(hook) > 0.7)) issues.push(`hook o=${opacity(hook)}`);
    const chart = q('.s3f-palladium__chart');
    if ((build >= 2) !== (opacity(chart) > 0.9)) issues.push(`chart o=${opacity(chart)}`);
    if (build >= 2) {
      const ty = translateY(hook);
      if (ty > -150) issues.push(`hook not lifted (ty=${ty})`);
      const series = qa('.s3f-palladium__series');
      if (series.length !== 2) issues.push(`series=${series.length}`);
      series.forEach((p, i) => {
        const off = parseFloat(getComputedStyle(p).strokeDashoffset) || 0;
        if (Math.abs(off) > 2) issues.push(`series${i} dashoffset=${off}`);
      });
      // R4 §1.2.1: the left panel measures annual mine supply, not crustal
      // abundance. Same geometry, new metric, and the figures are now stated.
      const bars = qa('.s3f-palladium__supplybar');
      if (bars.length !== 2) issues.push(`supply bars=${bars.length}`);
      if (!bars.every((b) => scaleOf(b) > 0.95)) issues.push('supply bars not drawn');
      const supplyLabels = qa('.s3f-palladium__supplylabel').map((t) => t.textContent);
      const wantSupply = ['GOLD  3,280 t', 'PALLADIUM  217 t'];
      wantSupply.forEach((w, i) => {
        if (supplyLabels[i] !== w) issues.push(`supply row ${i} "${supplyLabels[i]}" want "${w}"`);
      });
      if (qa('.s3f-palladium__raritybar').length) issues.push('retired rarity panel still rendered');
      // R3.1 §C: the price panel claims only its own window.
      const titles = qa('.s3f-palladium__paneltitle').map((t) => t.textContent);
      if (titles[0] !== 'ANNUAL MINE SUPPLY · TONNES') issues.push(`supply panel title "${titles[0]}"`);
      if (titles[1] !== 'PRICE OF ONE OUNCE · MODERN ERA') issues.push(`price panel title "${titles[1]}"`);
    }
    const timing = q('.s3f-palladium__timing');
    if ((build >= 3) !== (opacity(timing) > 0.9)) issues.push(`timing o=${opacity(timing)}`);
    const narrowed = q('.s3f-palladium__narrowed');
    if (!narrowed) issues.push('second-epoch line missing');
    else {
      if ((build >= 4) !== (opacity(narrowed) > 0.9)) issues.push(`narrowed o=${opacity(narrowed)}`);
      if (build >= 4) {
        const wantN = 'And when gold’s role narrowed to store of value, palladium never touched that either. Central banks hold gold — not palladium.';
        if (narrowed.textContent !== wantN) issues.push(`narrowed copy "${narrowed.textContent}"`);
      }
    }
    const bar = q('.s3f-palladium__bar');
    if ((build >= 5) !== (opacity(bar) > 0.9)) issues.push(`bar o=${opacity(bar)}`);
    return { ok: issues.length === 0, detail: issues.join('; ') || `palladium b${build} exact` };
  }

  // ----- 3.6 the credit tower (R3.1 §D: rebuilt, six builds) -----
  if (id === '3-06-what-your-money-is') {
    const slabWants = { apps: build >= 1, deposits: build >= 2, base: build >= 3 };
    Object.entries(slabWants).forEach(([key, on]) => {
      const slab = q(`.s3f-tower__slab[data-layer="${key}"]`);
      if (!slab) { issues.push(`${key} slab missing`); return; }
      if (on !== (opacity(slab) > 0.9)) issues.push(`${key} o=${opacity(slab)}`);
    });

    // The settle is state, not a gesture: a slab sits 7px lower for each
    // slab that has landed beneath it, and reconstruction must agree.
    const settleWant = {
      apps: (build >= 3 ? 14 : build === 2 ? 7 : 0),
      deposits: (build >= 3 ? 7 : 0),
      base: 0
    };
    Object.entries(settleWant).forEach(([key, px]) => {
      const slab = q(`.s3f-tower__slab[data-layer="${key}"]`);
      if (!slab || !slabWants[key]) return;
      const ty = translateY(slab);
      if (!near(ty, px, 0.6)) issues.push(`${key} settle ty=${ty} want=${px}`);
    });

    const links = { l1: build >= 2, l2: build >= 3 };
    const captions = { l1: 'a claim on your deposit.', l2: 'a claim on base money.' };
    Object.entries(links).forEach(([key, on]) => {
      const link = q(`.s3f-tower__link[data-link="${key}"]`);
      if (!link) { issues.push(`${key} link missing`); return; }
      if (on !== (opacity(link) > 0.9)) issues.push(`${key} o=${opacity(link)}`);
      if (!link.querySelector('.s3f-tower__linkline')) issues.push(`${key} has no line`);
      if (link.querySelector('svg')) issues.push(`${key} renders a glyph`);
      if (on) {
        const cap = link.querySelector('.s3f-tower__linkcaption').textContent;
        if (cap !== captions[key]) issues.push(`${key} caption "${cap}"`);
      }
    });

    // The scope build: uppers recede, base takes the slide's only orange.
    const base = q('.s3f-tower__slab[data-layer="base"]');
    const baseAccent = isAccent(getComputedStyle(base).borderColor) ||
      isAccent(getComputedStyle(base).boxShadow);
    if ((build >= 5) !== baseAccent) issues.push(`foundation accent=${baseAccent} at b${build}`);
    ['apps', 'deposits'].forEach((key) => {
      const slab = q(`.s3f-tower__slab[data-layer="${key}"]`);
      if (isAccent(getComputedStyle(slab).borderColor)) issues.push(`${key} carries the accent`);
    });

    // The held question: the drop line is the final state, and it holds
    // with no copy on stage.
    const drop = q('.s3f-tower__drop');
    if (!drop) issues.push('drop line missing');
    else {
      const drawn = matrixOf(drop)[3] > 0.95;
      if ((build >= 6) !== drawn) issues.push(`drop scaleY=${matrixOf(drop)[3]} at b${build}`);
      if (drop.textContent.trim()) issues.push('drop line carries text');
    }

    const copy = {
      '.s3f-money__run': build >= 3 && build <= 5,
      '.s3f-money__principle': build >= 4 && build <= 5,
      '.s3f-money__scoping': build === 5
    };
    Object.entries(copy).forEach(([sel, on]) => {
      const el = q(sel);
      if (!el) { issues.push(`${sel} missing`); return; }
      if (on !== visibleAttr(el)) issues.push(`${sel} visible=${el.dataset.visible} want=${on}`);
      // Settled lines still read at 0.55; cleared ones are gone.
      const o = opacity(el);
      if (on && o < 0.5) issues.push(`${sel} o=${o}`);
      if (!on && o > 0.05) issues.push(`${sel} o=${o} but cleared`);
    });
    if (build === 6) {
      const anyCopy = Object.keys(copy).some((sel) => opacity(q(sel)) > 0.05);
      if (anyCopy) issues.push('copy on stage at the held question');
    }
    return { ok: issues.length === 0, detail: issues.join('; ') || `tower b${build} exact` };
  }

  return { ok: true, detail: `no probe for ${id}` };
}

// Ladder geometry — the rail rules on a slope (icon grammar §4.5–4.8):
// every visible stop marker's center sits on the drawn rising line
// (|perpendicular Δ| ≤ 0.75 stage px); every visible label is horizontally
// centered under its own stop (|Δx| ≤ 0.75) and its padded box never
// intersects the drawn line segment; the entity marker, when placed, is
// centered on the store-of-value column. R3.1 adds the threshold ticks:
// each visible tick is centered on the line and runs perpendicular to it
// (grammar §4.7 — marks that cross a line are ticks in that line's own
// language).
function ladderGeometryProbeInPage() {
  const q = (sel) => document.querySelector(sel);
  const qa = (sel) => Array.from(document.querySelectorAll(sel));
  const issues = [];
  const canvas = q('.deck-canvas');
  if (!canvas || !q('.s3f-ladder')) return { ok: false, detail: 'no ladder/canvas' };
  const cr = canvas.getBoundingClientRect();
  const s = cr.width / 1920;
  const toStage = (r) => ({
    cx: (r.left + r.width / 2 - cr.left) / s,
    cy: (r.top + r.height / 2 - cr.top) / s,
    x0: (r.left - cr.left) / s, x1: (r.right - cr.left) / s,
    y0: (r.top - cr.top) / s, y1: (r.bottom - cr.top) / s
  });
  // The authored line: (330, 682.9) → (1650, 347.1), angle -14.27°.
  const A = { x: 330, y: 682.9 };
  const B = { x: 1650, y: 347.1 };
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const len = Math.hypot(dx, dy);
  const perp = (p) => Math.abs(dy * p.cx - dx * p.cy + B.x * A.y - B.y * A.x) / len;

  const lineVisible = (() => {
    const el = q('.s3f-ladder__line');
    const t = getComputedStyle(el).transform;
    const sc = !t || t === 'none' ? 1 : parseFloat(t.match(/matrix\(([-\d.e]+)/)[1]);
    return sc > 0.95;
  })();

  const stops = { collectible: 420, sov: 800, moe: 1180, uoa: 1560 };
  const details = [];
  Object.entries(stops).forEach(([key, x]) => {
    const stop = q(`.s3f-ladder__stop[data-stage="${key}"]`);
    if (stop.dataset.state === 'upcoming') return;
    const dot = toStage(stop.querySelector('.s3f-ladder__dot').getBoundingClientRect());
    const d = perp(dot);
    details.push(`${key} Δ=${d.toFixed(2)}`);
    if (lineVisible && d > 0.75) issues.push(`${key} dot off line by ${d.toFixed(2)}px`);
    if (Math.abs(dot.cx - x) > 0.75) issues.push(`${key} dot x=${dot.cx.toFixed(2)} want ${x}`);
    const label = toStage(stop.querySelector('.s3f-ladder__label').getBoundingClientRect());
    if (Math.abs(label.cx - x) > 0.75) issues.push(`${key} label off-center ${(label.cx - x).toFixed(2)}`);
    if (lineVisible) {
      const pad = 2;
      const box = { x0: label.x0 - pad, x1: label.x1 + pad, y0: label.y0 - pad, y1: label.y1 + pad };
      const xa = Math.max(box.x0, Math.min(A.x, B.x));
      const xb = Math.min(box.x1, Math.max(A.x, B.x));
      let crosses = false;
      for (let xx = xa; xx <= xb; xx += 4) {
        const yy = A.y + ((xx - A.x) / dx) * dy;
        if (yy >= box.y0 && yy <= box.y1) { crosses = true; break; }
      }
      if (xa <= xb && crosses) issues.push(`${key} label crosses the line`);
    }
  });

  // The threshold ticks: centered on the line, perpendicular to it.
  const wantAngle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
  const gateXs = { g1: 610, g2: 990, g3: 1370 };
  qa('.s3f-ladder__gate').forEach((gate) => {
    if (gate.dataset.mark === 'off') return;
    const box = toStage(gate.getBoundingClientRect());
    const d = perp(box);
    details.push(`${gate.dataset.gate} Δ=${d.toFixed(2)}`);
    if (lineVisible && d > 0.75) issues.push(`${gate.dataset.gate} tick off line by ${d.toFixed(2)}px`);
    const wantX = gateXs[gate.dataset.gate];
    if (Math.abs(box.cx - wantX) > 0.75) issues.push(`${gate.dataset.gate} tick x=${box.cx.toFixed(2)} want ${wantX}`);
    const m = getComputedStyle(gate).transform.match(/matrix\(([^)]+)\)/);
    const p = m ? m[1].split(',').map(parseFloat) : null;
    if (!p) issues.push(`${gate.dataset.gate} tick not rotated`);
    else {
      const deg = Math.atan2(p[1], p[0]) * 180 / Math.PI;
      if (Math.abs(deg - wantAngle) > 0.5) {
        issues.push(`${gate.dataset.gate} tick at ${deg.toFixed(2)}° want ${wantAngle.toFixed(2)}°`);
      }
    }
    // The tick must actually cross the line, not sit beside it.
    const halfSpan = Math.max(box.x1 - box.x0, box.y1 - box.y0) / 2;
    if (halfSpan < 8) issues.push(`${gate.dataset.gate} tick too short to cross (${halfSpan.toFixed(1)})`);
  });

  const entity = q('.s3f-ladder__entity');
  if (entity && entity.dataset.visible === 'true') {
    const glyphBox = toStage(entity.querySelector('.s3f-ladder__entityglyph').getBoundingClientRect());
    if (Math.abs(glyphBox.cx - 800) > 1.5) issues.push(`entity off column ${(glyphBox.cx - 800).toFixed(2)}`);
  }

  return { ok: issues.length === 0, detail: issues.join('; ') || `geometry exact (${details.join(', ')})` };
}

// Tower geometry (R3.1 §D §E.6) — the widths carry the argument, so they
// are measured, not asserted: base is the narrowest slab and sits at the
// bottom, deposits is distinctly wider above it, apps is wider still on
// top; every slab is centered on one spine; each rests on the one below
// with a positive gap; the link lines and the drop line sit on the spine;
// and the drop line hangs from the base slab's bottom edge.
function towerGeometryProbeInPage() {
  const q = (sel) => document.querySelector(sel);
  const issues = [];
  const canvas = q('.deck-canvas');
  const tower = q('.s3f-tower');
  if (!canvas || !tower) return { ok: false, detail: 'no tower/canvas' };
  const cr = canvas.getBoundingClientRect();
  const s = cr.width / 1920;
  const box = (el) => {
    const r = el.getBoundingClientRect();
    return {
      cx: (r.left + r.width / 2 - cr.left) / s,
      w: r.width / s,
      y0: (r.top - cr.top) / s,
      y1: (r.bottom - cr.top) / s
    };
  };
  const slab = (k) => q(`.s3f-tower__slab[data-layer="${k}"]`);
  const shown = (k) => slab(k).dataset.visible === 'true';

  const widths = {};
  ['apps', 'deposits', 'base'].forEach((k) => {
    const b = box(slab(k));
    widths[k] = b.w;
    if (Math.abs(b.cx - 960) > 0.75) issues.push(`${k} off spine by ${(b.cx - 960).toFixed(2)}`);
  });
  // The inverted proportion, with a real margin — "distinctly wider".
  if (!(widths.base < widths.deposits - 100)) {
    issues.push(`deposits (${widths.deposits.toFixed(0)}) not distinctly wider than base (${widths.base.toFixed(0)})`);
  }
  if (!(widths.deposits < widths.apps - 100)) {
    issues.push(`apps (${widths.apps.toFixed(0)}) not distinctly wider than deposits (${widths.deposits.toFixed(0)})`);
  }

  // Resting order: each visible slab sits below the one above it, with a gap.
  const pairs = [['apps', 'deposits'], ['deposits', 'base']];
  pairs.forEach(([upper, lower]) => {
    if (!shown(upper) || !shown(lower)) return;
    const u = box(slab(upper));
    const l = box(slab(lower));
    const gap = l.y0 - u.y1;
    if (gap <= 0) issues.push(`${upper}/${lower} overlap (gap ${gap.toFixed(1)})`);
    if (gap > 60) issues.push(`${upper}/${lower} not resting (gap ${gap.toFixed(1)})`);
  });

  ['l1', 'l2'].forEach((k) => {
    const link = q(`.s3f-tower__link[data-link="${k}"]`);
    if (link.dataset.visible !== 'true') return;
    const line = box(link.querySelector('.s3f-tower__linkline'));
    if (Math.abs(line.cx - 960) > 0.75) issues.push(`${k} line off spine by ${(line.cx - 960).toFixed(2)}`);
    const cap = box(link.querySelector('.s3f-tower__linkcaption'));
    if (cap.cx <= 960) issues.push(`${k} caption not right of center`);
  });
  // One shared alignment for both captions.
  const caps = ['l1', 'l2'].map((k) => q(`.s3f-tower__link[data-link="${k}"] .s3f-tower__linkcaption`))
    .map((el) => (el.getBoundingClientRect().left - cr.left) / s);
  if (Math.abs(caps[0] - caps[1]) > 0.75) issues.push(`caption alignment differs by ${(caps[0] - caps[1]).toFixed(2)}`);

  const drop = q('.s3f-tower__drop');
  const dropBox = box(drop);
  if (Math.abs(dropBox.cx - 960) > 0.75) issues.push(`drop off spine by ${(dropBox.cx - 960).toFixed(2)}`);
  if (drop.dataset.visible === 'true') {
    const b = box(slab('base'));
    if (dropBox.y0 < b.y1 || dropBox.y0 - b.y1 > 20) {
      issues.push(`drop does not hang from the base slab (Δ ${(dropBox.y0 - b.y1).toFixed(1)})`);
    }
    if (dropBox.y1 - dropBox.y0 < 150) issues.push(`drop too short (${(dropBox.y1 - dropBox.y0).toFixed(0)})`);
    if (dropBox.y1 > 1080) issues.push(`drop runs off stage (${dropBox.y1.toFixed(0)})`);
  }

  return {
    ok: issues.length === 0,
    detail: issues.join('; ') ||
      `widths base ${widths.base.toFixed(0)} < deposits ${widths.deposits.toFixed(0)} < apps ${widths.apps.toFixed(0)}`
  };
}

module.exports = { probeInPage, ladderGeometryProbeInPage, towerGeometryProbeInPage };
