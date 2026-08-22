// The deck’s unit-field component — one grammar, two renderers.
//
// `UnitField` renders 80,000 units — one per working hour of a life — on a
// single canvas, because 80,000 DOM nodes is not an option. `UnitGrid` renders
// a countable number of the same units as DOM, which is what 4.22's
// fixed-supply field needs (35 units that individually change state under CSS
// transitions). Both read their proportions from `UNIT_GRAMMAR` below, so the
// rhyme between 1.1's hours-field and 4.22's supply-field is now structural
// rather than a constant copied between two files: change the grammar and both
// fields move together. (Before R7 the fractions were transcribed into this
// header by hand and 4.22 owned its own geometry in CSS.)
//
// The rhyme is never pointed out in copy or spoken notes; it only lives here —
// a life poured in (1.1), the container it is poured into (4.22).
//
// Color is NOT 4.22's repricing orange. The hours are drawn in a warm neutral
// (--unit-warm / --unit-warm-bright in globals.css) — proto-value, not yet the
// deck’s accent.
//
// API is state-first: `setState({ mode, progress })` reconstructs any state
// instantly, so a slide’s `_applyBuild(n)` can land on the exact frame with no
// animation having run. `animate()` is a layer on top of that — it drives the
// same states over time and always resolves to the identical end state.
// Reduced motion collapses every animation to its instant end state.
//
// All state is scoped to the returned instance (no module-level scene caches);
// `destroy()` cancels the RAF loop and listeners, so nothing survives
// navigation.

const STAGE_W = 1920;
const STAGE_H = 1080;

const COLS = 400;
const ROWS = 200;
const UNIT_COUNT = COLS * ROWS; // 80,000 — one per working hour; not negotiable.

// Pitch tuned for exact fit: 400 × 4.58 = 1832 wide, 200 × 4.58 = 916 tall,
// centered on the stage (offsets 44 / 82) — "roughly 1920×960".
const PITCH = 4.58;
const FIELD_W = COLS * PITCH;
const FIELD_H = ROWS * PITCH;
const FIELD_X = (STAGE_W - FIELD_W) / 2;
const FIELD_Y = (STAGE_H - FIELD_H) / 2;

// The grammar both renderers are cut from. The fill fractions are 4.22's
// (84/102 and 46/62), rounded where they have always been rounded so the
// canvas field’s painted geometry is unchanged to the pixel.
export const UNIT_GRAMMAR = Object.freeze({
  PITCH_X: 102,
  PITCH_Y: 62,
  W_FRAC: 0.8235,
  H_FRAC: 0.7419
});

const UNIT_W_FRAC = UNIT_GRAMMAR.W_FRAC;
const UNIT_H_FRAC = UNIT_GRAMMAR.H_FRAC;

// The DOM renderer: a countable grid of the same units, at the grammar’s own
// pitch. State lives on the units (the consumer sets whatever data attributes
// its argument needs); geometry lives here.
export function UnitGrid({ cols = 7, rows = 5, className = '' } = {}) {
  const unitW = Math.round(UNIT_GRAMMAR.PITCH_X * UNIT_GRAMMAR.W_FRAC);
  const unitH = Math.round(UNIT_GRAMMAR.PITCH_Y * UNIT_GRAMMAR.H_FRAC);

  const el = document.createElement('div');
  el.className = `unit-field-grid ${className}`.trim();
  el.setAttribute('aria-hidden', 'true');
  el.style.setProperty('--unit-w', `${unitW}px`);
  el.style.setProperty('--unit-h', `${unitH}px`);
  el.style.gridTemplateColumns = `repeat(${cols}, ${unitW}px)`;
  el.style.gridTemplateRows = `repeat(${rows}, ${unitH}px)`;
  el.style.columnGap = `${UNIT_GRAMMAR.PITCH_X - unitW}px`;
  el.style.rowGap = `${UNIT_GRAMMAR.PITCH_Y - unitH}px`;

  const units = Array.from({ length: cols * rows }, (_, index) => {
    const unit = document.createElement('span');
    unit.className = 'unit-field-grid__unit';
    unit.dataset.column = String(index % cols);
    unit.dataset.row = String(Math.floor(index / cols));
    el.appendChild(unit);
    return unit;
  });

  return { el, units, cols, rows, unitW, unitH };
}

const CENTER_X = STAGE_W / 2;
const CENTER_Y = STAGE_H / 2;

// Per-unit brightness jitter — the field’s quiet texture (the small-scale
// stand-in for 4.22's glow treatment, which cannot render at 4px). The wide
// range keeps the field reading as points of light on black rather than a
// flat gray wall: most hours sit dim, some glint.
const ALPHA_BASE = 0.36;
const ALPHA_JITTER = 0.34;
const ALPHA_BUCKETS = 8;

const DIM_OPACITY_DEFAULT = 0.14; // 1.4's ghost state — watermark territory.

const MAX_BACKING_SCALE = 2.5;
const MAX_PARTICLES = 1400;

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function readToken(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

// `preRadial: true` pays the one-time radial sort at mount (inside the slide
// transition) so the collapse can start without a first-frame hitch.
// `warmAnim: true` also pre-renders the animation-resolution offscreen at
// mount, for slides whose animation starts with no authored hold to mask a
// cache miss.
export function UnitField({ dimOpacity = DIM_OPACITY_DEFAULT, preRadial = false, warmAnim = false } = {}) {
  const el = document.createElement('div');
  el.style.cssText = 'position:absolute; inset:0; pointer-events:none;';

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; display:block;';
  el.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // Transient layer for fill "birth glints" — cleared every animation frame,
  // so the cumulative base canvas stays cheap.
  const overlay = document.createElement('canvas');
  overlay.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; display:block;';
  el.appendChild(overlay);
  const octxOverlay = overlay.getContext('2d');

  const warm = hexToRgb(readToken('--unit-warm', '#FDE9D4'));
  const warmBright = hexToRgb(readToken('--unit-warm-bright', '#FEF4E8'));

  // ----- Per-unit static data (instance-scoped, built once) -----

  // Brightness bucket per unit, and one fillStyle string per bucket.
  const bucketOf = new Uint8Array(UNIT_COUNT);
  const bucketStyles = [];
  for (let b = 0; b < ALPHA_BUCKETS; b += 1) {
    const a = ALPHA_BASE + ((b + 0.5) / ALPHA_BUCKETS - 0.5) * ALPHA_JITTER;
    bucketStyles.push(`rgba(${warm.r}, ${warm.g}, ${warm.b}, ${a.toFixed(3)})`);
  }
  for (let i = 0; i < UNIT_COUNT; i += 1) {
    bucketOf[i] = Math.floor(Math.random() * ALPHA_BUCKETS);
  }

  // Shuffled appearance order for the fill (Fisher–Yates).
  const fillOrder = new Uint32Array(UNIT_COUNT);
  for (let i = 0; i < UNIT_COUNT; i += 1) fillOrder[i] = i;
  for (let i = UNIT_COUNT - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = fillOrder[i]; fillOrder[i] = fillOrder[j]; fillOrder[j] = t;
  }

  // Unit indices sorted by distance from stage center, plus the sorted
  // distances — built lazily on the first collapse (an ~80k sort).
  let radialOrder = null;
  let radialDist = null;
  function ensureRadial() {
    if (radialOrder) return;
    const dist = new Float32Array(UNIT_COUNT);
    for (let i = 0; i < UNIT_COUNT; i += 1) {
      const dx = unitX(i) - CENTER_X;
      const dy = unitY(i) - CENTER_Y;
      dist[i] = Math.hypot(dx, dy);
    }
    const order = Array.from({ length: UNIT_COUNT }, (_, i) => i);
    order.sort((a, b) => dist[a] - dist[b]);
    radialOrder = Uint32Array.from(order);
    radialDist = new Float32Array(UNIT_COUNT);
    for (let i = 0; i < UNIT_COUNT; i += 1) radialDist[i] = dist[radialOrder[i]];
  }

  function unitX(i) { return FIELD_X + (i % COLS) * PITCH + PITCH / 2; }
  function unitY(i) { return FIELD_Y + Math.floor(i / COLS) * PITCH + PITCH / 2; }

  // ----- Backing store / scale -----

  let S = 1;                 // logical px → backing px
  let backingKind = 'static';
  let offscreen = null;      // full 80,000-unit field at the current scale
  const offscreenCache = { static: null, anim: null }; // { canvas, S } per kind
  let unitW = 0;
  let unitH = 0;

  // Static frames are supersampled (floor 2×) so the 4px units and 0.8px
  // gaps stay crisp under the letterbox scaler. Animation frames run at
  // native resolution instead: the fill and collapse touch the full canvas
  // every frame, and quartering the pixel count is what holds 60fps. The
  // resolution switch is a single re-render, masked by the fill’s authored
  // hold and by the collapse’s first resting frame.
  function computeScale(kind) {
    const stageScale = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H) || 1;
    const dpr = window.devicePixelRatio || 1;
    const native = Math.max(1, dpr * stageScale);
    return kind === 'anim'
      ? Math.min(1.5, native)
      : Math.min(MAX_BACKING_SCALE, Math.max(2, native));
  }

  function rebuildBacking(kind = backingKind) {
    backingKind = kind;
    S = computeScale(kind);
    canvas.width = Math.round(STAGE_W * S);
    canvas.height = Math.round(STAGE_H * S);
    overlay.width = canvas.width;
    overlay.height = canvas.height;
    unitW = PITCH * UNIT_W_FRAC * S;
    unitH = PITCH * UNIT_H_FRAC * S;

    // The full 80,000-unit render is cached per kind, so flipping between
    // animation and static resolution costs a resize + drawImage, not an
    // 80,000-rect repaint.
    const cached = offscreenCache[kind];
    if (cached && cached.S === S) {
      offscreen = cached.canvas;
      return;
    }
    offscreen = document.createElement('canvas');
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const octx = offscreen.getContext('2d');
    drawUnitRange(octx, null, 0, UNIT_COUNT);
    offscreenCache[kind] = { canvas: offscreen, S };
  }

  // Draws units [from, to) of `order` (or of natural index order when `order`
  // is null), batched by brightness bucket so fillStyle changes stay at 8 per
  // call instead of one per unit.
  function drawUnitRange(target, order, from, to) {
    for (let b = 0; b < ALPHA_BUCKETS; b += 1) {
      target.fillStyle = bucketStyles[b];
      for (let k = from; k < to; k += 1) {
        const i = order ? order[k] : k;
        if (bucketOf[i] !== b) continue;
        target.fillRect(
          (unitX(i) * S) - unitW / 2,
          (unitY(i) * S) - unitH / 2,
          unitW,
          unitH
        );
      }
    }
  }

  // Soft-edged radial erase centered on the stage — the collapse consumption
  // front. Units inside r are gone; the soft band keeps the front from reading
  // as a hard geometric wipe at 4px unit scale.
  function punchHole(target, r) {
    if (r <= 0) return;
    const edge = Math.min(44, r);
    const g = target.createRadialGradient(
      CENTER_X * S, CENTER_Y * S, Math.max(0, (r - edge) * S),
      CENTER_X * S, CENTER_Y * S, r * S
    );
    g.addColorStop(0, 'rgba(0,0,0,1)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    target.save();
    target.globalCompositeOperation = 'destination-out';
    target.fillStyle = g;
    target.beginPath();
    target.arc(CENTER_X * S, CENTER_Y * S, r * S, 0, Math.PI * 2);
    target.fill();
    target.restore();
  }

  const R_MAX = Math.hypot(FIELD_W / 2, FIELD_H / 2) + 8;

  function consumedCountAt(r) {
    ensureRadial();
    // Binary search: first index with distance > r.
    let lo = 0;
    let hi = UNIT_COUNT;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (radialDist[mid] <= r) lo = mid + 1; else hi = mid;
    }
    return lo;
  }

  // ----- State -----

  const state = { mode: 'empty', progress: 0, dim: dimOpacity };
  let fillDrawnCount = -1; // how many fill units are on the visible canvas

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function clearOverlay() {
    octxOverlay.clearRect(0, 0, overlay.width, overlay.height);
  }

  function applyState(next = {}) {
    cancelAnimation();
    Object.assign(state, next);
    // Sharpen to static resolution only when the target state actually draws
    // field content — an empty or fully-consumed field renders nothing, so
    // e.g. the end of the collapse costs no resolution switch at all.
    const drawsField = !(state.mode === 'empty' || (state.mode === 'collapse' && state.progress >= 1));
    if (drawsField && backingKind !== 'static') rebuildBacking('static');
    renderState();
  }

  function renderState() {
    clearOverlay();
    canvas.style.opacity = state.mode === 'dim' ? String(state.dim) : '1';
    if (state.mode === 'empty') {
      clearCanvas();
      fillDrawnCount = 0;
      return;
    }
    if (state.mode === 'fill') {
      const n = Math.max(0, Math.min(UNIT_COUNT, Math.round(state.progress * UNIT_COUNT)));
      clearCanvas();
      if (n === UNIT_COUNT) {
        ctx.drawImage(offscreen, 0, 0);
      } else {
        drawUnitRange(ctx, fillOrder, 0, n);
      }
      fillDrawnCount = n;
      return;
    }
    if (state.mode === 'steady' || state.mode === 'dim') {
      clearCanvas();
      ctx.drawImage(offscreen, 0, 0);
      fillDrawnCount = UNIT_COUNT;
      return;
    }
    if (state.mode === 'collapse') {
      const p = Math.max(0, Math.min(1, state.progress));
      clearCanvas();
      if (p < 1) {
        ctx.drawImage(offscreen, 0, 0);
        punchHole(ctx, R_MAX * p);
      }
      fillDrawnCount = -1;
    }
  }

  // ----- Animation layer -----

  let raf = null;
  let anim = null;

  function cancelAnimation() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    anim = null;
  }

  // The fill’s unit-count curve: slow first seconds (single, countable units),
  // then acceleration to a flood. t and the returned fraction are both 0..1.
  function fillCurve(t) {
    return Math.pow(t, 5.5);
  }

  // The collapse front accelerates outward — near units stream first, the far
  // corners go last, and the pace builds like a fall.
  function collapseCurve(t) {
    return Math.pow(t, 1.7);
  }

  function animate({ mode, duration, delay = 0, onTick, onDone } = {}) {
    cancelAnimation();

    if (prefersReducedMotion()) {
      applyState({ mode: mode === 'fill' ? 'steady' : mode, progress: 1 });
      onTick?.(mode === 'fill' ? UNIT_COUNT : 1, 1);
      onDone?.();
      return;
    }

    if (mode !== 'fill' && mode !== 'collapse') return;
    if (backingKind !== 'anim') rebuildBacking('anim');
    if (mode === 'fill') {
      Object.assign(state, { mode: 'fill', progress: 0 });
    } else {
      ensureRadial();
      Object.assign(state, { mode: 'collapse', progress: 0 });
    }
    renderState();

    anim = {
      mode,
      duration,
      delay,
      onTick,
      onDone,
      start: performance.now(),
      // fill bookkeeping
      glints: [],
      // collapse bookkeeping
      consumed: 0,
      particles: []
    };
    raf = requestAnimationFrame(stepAnimation);
  }

  // Each arriving hour lands with a brief bright spark that settles into the
  // unit’s resting brightness — it is what makes the countable early units
  // legible and gives the flood its shimmer crest.
  const GLINT_MS = 650;
  const glintHalo = `rgba(${warmBright.r}, ${warmBright.g}, ${warmBright.b}, 0.2)`;
  const glintCore = `rgba(${warmBright.r}, ${warmBright.g}, ${warmBright.b}, 0.9)`;

  function drawGlints(a, now) {
    clearOverlay();
    const keep = [];
    for (const g of a.glints) {
      const u = (now - g.born) / GLINT_MS;
      if (u >= 1) continue;
      const fade = (1 - u) * (1 - u);
      const cx = g.x * S;
      const cy = g.y * S;
      octxOverlay.globalAlpha = fade;
      octxOverlay.fillStyle = glintHalo;
      octxOverlay.fillRect(cx - unitW * 1.5, cy - unitH * 1.5, unitW * 3, unitH * 3);
      octxOverlay.fillStyle = glintCore;
      octxOverlay.fillRect(cx - unitW * 0.8, cy - unitH * 0.8, unitW * 1.6, unitH * 1.6);
      keep.push(g);
    }
    octxOverlay.globalAlpha = 1;
    a.glints = keep;
  }

  function stepAnimation(now) {
    if (!anim) return;
    const a = anim;
    const t = Math.max(0, Math.min(1, (now - a.start - a.delay) / a.duration));

    if (a.mode === 'fill') {
      const n = Math.round(fillCurve(t) * UNIT_COUNT);
      if (n > fillDrawnCount) {
        // Incremental: draw only the units that appeared this frame, and
        // spark a bounded sample of them.
        drawUnitRange(ctx, fillOrder, fillDrawnCount, n);
        // Every countable unit sparkles; in the flood the glint pool is
        // capped — there the shimmer already emerges from the thousands of
        // units landing per frame, and an unbounded pool costs the 60fps.
        const fresh = n - fillDrawnCount;
        const spawn = fresh <= 60 ? fresh : Math.max(0, 320 - a.glints.length);
        for (let s = 0; s < spawn; s += 1) {
          const k = fillDrawnCount + (spawn === fresh ? s : Math.floor(Math.random() * fresh));
          const i = fillOrder[k];
          a.glints.push({ x: unitX(i), y: unitY(i), born: now });
        }
        fillDrawnCount = n;
      }
      drawGlints(a, now);
      state.mode = 'fill';
      state.progress = n / UNIT_COUNT;
      a.onTick?.(n, t);
      if (t >= 1) {
        const done = a.onDone;
        cancelAnimation();
        applyState({ mode: 'steady', progress: 1 });
        done?.();
        return;
      }
    }

    if (a.mode === 'collapse') {
      const r = R_MAX * collapseCurve(t);
      const target = consumedCountAt(r);

      // Spawn flight particles for a sample of the units consumed this frame.
      // Every unit leaves the field exactly on the front; a bounded sample of
      // them is drawn in flight — visually indistinguishable from all of them
      // flying, computationally flat.
      if (target > a.consumed) {
        const budget = Math.max(0, MAX_PARTICLES - a.particles.length);
        const fresh = target - a.consumed;
        const spawn = Math.min(budget, fresh, 130);
        for (let s = 0; s < spawn; s += 1) {
          const k = a.consumed + Math.floor(Math.random() * fresh);
          const i = radialOrder[Math.min(k, UNIT_COUNT - 1)];
          a.particles.push({
            sx: unitX(i),
            sy: unitY(i),
            born: now,
            dur: 340 + Math.random() * 200,
            bucket: bucketOf[i]
          });
        }
        a.consumed = target;
      }

      // Frame render: full field, minus the consumed disk, plus flights.
      clearCanvas();
      ctx.drawImage(offscreen, 0, 0);
      punchHole(ctx, r);

      const alive = [];
      for (const p of a.particles) {
        const pt = (now - p.born) / p.dur;
        if (pt >= 1) continue;
        const e = pt * pt * pt; // ease-in cubic: gravitational pull to center
        const x = p.sx + (CENTER_X - p.sx) * e;
        const y = p.sy + (CENTER_Y - p.sy) * e;
        const fade = pt < 0.85 ? 1 : 1 - (pt - 0.85) / 0.15;
        // Flights run slightly brighter than their resting units — hours
        // catching the light as they fall inward.
        ctx.globalAlpha = Math.min(1, fade * 1.35);
        ctx.fillStyle = bucketStyles[p.bucket];
        ctx.fillRect(x * S - unitW / 2, y * S - unitH / 2, unitW, unitH);
        alive.push(p);
      }
      ctx.globalAlpha = 1;
      a.particles = alive;

      state.mode = 'collapse';
      state.progress = t;
      a.onTick?.(t, t);

      if (t >= 1 && a.particles.length === 0) {
        const done = a.onDone;
        cancelAnimation();
        applyState({ mode: 'collapse', progress: 1 });
        done?.();
        return;
      }
    }

    raf = requestAnimationFrame(stepAnimation);
  }

  // ----- Resize -----

  let resizeTimer = null;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      rebuildBacking();
      // Reconstruct the current visual state at the new resolution. A running
      // animation keeps its clock; its next frame redraws in full.
      if (!anim) renderState();
      else if (anim.mode === 'fill') {
        clearCanvas();
        drawUnitRange(ctx, fillOrder, 0, Math.max(0, fillDrawnCount));
      }
    }, 150);
  }
  window.addEventListener('resize', onResize);

  function destroy() {
    cancelAnimation();
    clearTimeout(resizeTimer);
    window.removeEventListener('resize', onResize);
    el.remove();
    offscreen = null;
  }

  rebuildBacking();
  if (warmAnim) {
    rebuildBacking('anim');     // render + cache the animation-scale field…
    rebuildBacking('static');   // …then land back on static (cache hit)
  }
  renderState();
  if (preRadial) ensureRadial();

  return {
    el,
    unitCount: UNIT_COUNT,
    setState: applyState,
    animate,
    cancelAnimation,
    destroy
  };
}

export default UnitField;
