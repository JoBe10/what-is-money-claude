// R3 state probes — evaluated in the page. Each returns { ok, detail }.
// The probes assert the exact reconstructed state per build: element
// visibility and opacity, waypoint states and the ignition accent, ladder
// stop states, gate lighting, the foundation accents, chart draw state,
// entity placement, and the ladder's line geometry (markers pinned on the
// rising line, labels never crossing it — the outside rule on a slope).

// One switchable probe for every Section 3 slide/build.
function probeInPage({ id, build }) {
  const q = (sel) => document.querySelector(sel);
  const qa = (sel) => Array.from(document.querySelectorAll(sel));
  const issues = [];
  const near = (a, b, tol) => Math.abs(a - b) <= tol;
  const opacity = (el) => (el ? parseFloat(getComputedStyle(el).opacity) : -1);
  const visibleAttr = (el) => el && el.dataset.visible === 'true';
  const scaleOf = (el) => {
    const t = getComputedStyle(el).transform;
    if (!t || t === 'none') return 1;
    const m = t.match(/matrix\(([-\d.e]+)/);
    return m ? parseFloat(m[1]) : 1;
  };
  const isAccent = (color) => /247,\s*147,\s*26/.test(color);

  const active = q('.deck-slide[data-active="true"]');
  if (!active) return { ok: false, detail: 'no active container' };

  // ----- The waypoint interstitials -----
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
      // Geometry: three dots on one horizontal line, even 490px pitch.
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

  // ----- 3.1 the three functions -----
  if (id === '3-01-the-three-functions') {
    const token = q('.s3f-functions__token');
    const fns = ['sov', 'moe', 'uoa'];
    if ((build >= 1) !== (opacity(token) > 0.9)) issues.push(`token o=${opacity(token)} at b${build}`);
    fns.forEach((key, i) => {
      const wantOn = build >= i + 2;
      const fn = q(`.s3f-functions__fn[data-fn="${key}"]`);
      const spoke = q(`.s3f-functions__spoke[data-fn="${key}"]`);
      if (wantOn !== (opacity(fn) > 0.9)) issues.push(`${key} block o=${opacity(fn)}`);
      // The uoa spoke draws with scaleY — read the matrix's d coefficient.
      const t = getComputedStyle(spoke).transform;
      const m = t && t !== 'none' ? t.match(/matrix\(([^)]+)\)/) : null;
      const parts = m ? m[1].split(',').map(parseFloat) : [1, 0, 0, 1, 0, 0];
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

  // ----- 3.2 the functions separate -----
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
    }
    const principle = q('.s3f-separate__principle');
    if ((build >= 3) !== (opacity(principle) > 0.9)) issues.push(`principle o=${opacity(principle)}`);
    return { ok: issues.length === 0, detail: issues.join('; ') || `separate b${build} exact` };
  }

  // ----- The ladder slides -----
  const ladderExpect = {
    '3-03-the-order-of-monetization': (b) => ({
      line: b >= 1,
      stages: {
        collectible: b >= 2 ? 'revealed' : 'upcoming',
        sov: b >= 6 ? 'foundation' : b >= 3 ? 'revealed' : 'upcoming',
        moe: b >= 4 ? 'revealed' : 'upcoming',
        uoa: b >= 5 ? 'revealed' : 'upcoming'
      },
      gates: { g1: b >= 3, g2: b >= 4, g3: b >= 5 },
      bracket: false,
      entity: false
    }),
    '3-04-stage-signatures': (b) => ({
      line: true,
      stages: { collectible: 'revealed', sov: 'revealed', moe: 'revealed', uoa: 'revealed' },
      gates: { g1: true, g2: true, g3: true },
      bracket: b >= 1,
      entity: false
    }),
    '3-07-where-bitcoin-is': (b) => ({
      line: b >= 1,
      stages: b >= 1
        ? { collectible: 'revealed', sov: 'revealed', moe: 'revealed', uoa: 'revealed' }
        : { collectible: 'upcoming', sov: 'upcoming', moe: 'upcoming', uoa: 'upcoming' },
      gates: { g1: b >= 1, g2: b >= 1, g3: b >= 1 },
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
    Object.entries(want.gates).forEach(([key, lit]) => {
      const gate = q(`.s3f-ladder__gate[data-gate="${key}"]`);
      if ((gate.dataset.lit === 'true') !== lit) issues.push(`${key} lit=${gate.dataset.lit}`);
      if (lit !== (opacity(gate) > 0.9)) issues.push(`${key} o=${opacity(gate)}`);
    });
    const bracket = q('.s3f-ladder__bracket');
    if (want.bracket !== (opacity(bracket) > 0.9)) issues.push(`bracket o=${opacity(bracket)}`);
    const entity = q('.s3f-ladder__entity');
    if (want.entity !== (opacity(entity) > 0.9)) issues.push(`entity o=${opacity(entity)}`);
    if (want.entity && !entity.querySelector('svg')) issues.push('entity glyph missing');

    // Slide-local overlays.
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

  // ----- 3.5 the palladium test -----
  if (id === '3-05-the-palladium-test') {
    const hook = q('.s3f-palladium__hook');
    if ((build >= 1) !== (opacity(hook) > 0.7)) issues.push(`hook o=${opacity(hook)}`);
    const chart = q('.s3f-palladium__chart');
    if ((build >= 2) !== (opacity(chart) > 0.9)) issues.push(`chart o=${opacity(chart)}`);
    if (build >= 2) {
      // The hook has yielded upward (transform matrix f goes negative).
      const t = getComputedStyle(hook).transform;
      const f = t && t !== 'none' ? parseFloat(t.split(',').pop()) : 0;
      if (f > -150) issues.push(`hook not lifted (ty=${f})`);
      const series = qa('.s3f-palladium__series');
      if (series.length !== 2) issues.push(`series=${series.length}`);
      series.forEach((p, i) => {
        const off = parseFloat(getComputedStyle(p).strokeDashoffset) || 0;
        if (Math.abs(off) > 2) issues.push(`series${i} dashoffset=${off}`);
      });
      const bars = qa('.s3f-palladium__raritybar');
      if (!bars.every((b) => scaleOf(b) > 0.95)) issues.push('rarity bars not drawn');
    }
    const timing = q('.s3f-palladium__timing');
    if ((build >= 3) !== (opacity(timing) > 0.9)) issues.push(`timing o=${opacity(timing)}`);
    const bar = q('.s3f-palladium__bar');
    if ((build >= 4) !== (opacity(bar) > 0.9)) issues.push(`bar o=${opacity(bar)}`);
    return { ok: issues.length === 0, detail: issues.join('; ') || `palladium b${build} exact` };
  }

  // ----- 3.6 what your money is -----
  if (id === '3-06-what-your-money-is') {
    const wants = {
      apps: build >= 1, deposits: build >= 2, base: build >= 3
    };
    Object.entries(wants).forEach(([key, on]) => {
      const chip = q(`.s3f-layers__chip[data-layer="${key}"]`);
      if (on !== (opacity(chip) > 0.9)) issues.push(`${key} o=${opacity(chip)}`);
    });
    const t1 = q('.s3f-layers__tie[data-tie="t1"]');
    const t2 = q('.s3f-layers__tie[data-tie="t2"]');
    if ((build >= 2) !== (opacity(t1) > 0.9)) issues.push(`t1 o=${opacity(t1)}`);
    if ((build >= 3) !== (opacity(t2) > 0.9)) issues.push(`t2 o=${opacity(t2)}`);
    if (build >= 2) {
      const cap = t1.querySelector('.s3f-layers__tiecaption').textContent;
      if (cap !== 'a claim on your deposit.') issues.push(`t1 caption "${cap}"`);
    }
    if (build >= 3) {
      const cap = t2.querySelector('.s3f-layers__tiecaption').textContent;
      if (cap !== 'a claim on base money.') issues.push(`t2 caption "${cap}"`);
    }
    const base = q('.s3f-layers__chip[data-layer="base"]');
    const baseAccent = isAccent(getComputedStyle(base).borderColor) ||
      isAccent(getComputedStyle(base).boxShadow);
    if ((build >= 4) !== baseAccent) issues.push(`foundation accent=${baseAccent} at b${build}`);
    const principle = q('.s3f-money__principle');
    if ((build >= 3) !== (opacity(principle) > 0.9)) issues.push(`principle o=${opacity(principle)}`);
    const scoping = q('.s3f-money__scoping');
    if ((build >= 4) !== (opacity(scoping) > 0.9)) issues.push(`scoping o=${opacity(scoping)}`);
    return { ok: issues.length === 0, detail: issues.join('; ') || `money b${build} exact` };
  }

  return { ok: true, detail: `no probe for ${id}` };
}

// Ladder geometry — the rail rules on a slope (icon grammar §4.5–4.7):
// every visible stop marker's center sits on the drawn rising line
// (|perpendicular Δ| ≤ 0.75 stage px); every visible label is horizontally
// centered under its own stop (|Δx| ≤ 0.75) and its padded box never
// intersects the drawn line segment; the entity marker, when placed, is
// centered on the store-of-value column.
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
  // The authored line: (330, 682.9) → (1650, 347.1).
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
    // Padded label box must not intersect the line segment (2px padding).
    if (lineVisible) {
      const pad = 2;
      const box = { x0: label.x0 - pad, x1: label.x1 + pad, y0: label.y0 - pad, y1: label.y1 + pad };
      // Sample the line across the box's x-range; if the line's y at any
      // sampled x falls inside the box, the label crosses the drawn edge.
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

  const entity = q('.s3f-ladder__entity');
  if (entity && entity.dataset.visible === 'true') {
    const glyphBox = toStage(entity.querySelector('.s3f-ladder__entityglyph').getBoundingClientRect());
    if (Math.abs(glyphBox.cx - 800) > 1.5) issues.push(`entity off column ${(glyphBox.cx - 800).toFixed(2)}`);
  }

  return { ok: issues.length === 0, detail: issues.join('; ') || `geometry exact (${details.join(', ')})` };
}

module.exports = { probeInPage, ladderGeometryProbeInPage };
