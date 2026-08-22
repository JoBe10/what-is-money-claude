// The murmuration of 2.3 — the legacy boids simulation (2.05) ported into the
// new architecture and re-staged in two phases.
//
// Phase 1 preserves the legacy flock’s behavior and beauty: the three
// classical rules (separation, alignment, cohesion) plus a soft attractor
// drifting a slow lissajous, so the flock continually reshapes and never sits
// still. What changes is scale and register: full stage, thousands of agents
// (the script says thousands, so there are thousands), monochrome — Section 2
// holds the color arc; the deck’s accent is not in this sky.
//
// Phase 2 is the convergence: over ~5s the steering weights shift — the
// attractor fixes to center and strengthens, an orbital term appears — and
// the flock organizes into orbit around a brightening point. The point’s
// bloom is drawn here; the token glyph it resolves into is the slide’s DOM
// (the same anonymous disc Section 1 established).
//
// State-first: `setState({ phase, progress })` reconstructs either build’s
// state from scratch — phase 1 seeds a flock and warms it up to
// mid-murmuration; phase 2 at progress 1 arranges the converged orbit. A
// boids field is chaotic, so "exact state" for this component means the exact
// build state (flock character, convergence, bloom), not a replayed frame.
// Reduced motion renders one still of either state and never starts the loop.
//
// All state is instance-scoped; `destroy()` cancels the RAF loop and
// listeners. Nothing survives navigation.

const STAGE_W = 1920;
const STAGE_H = 1080;
const CENTER_X = STAGE_W / 2;
const CENTER_Y = STAGE_H / 2;

const COUNT = 2200;
const WARMUP_STEPS = 260;

const MAX_SPEED = 2.3;
const MAX_FORCE = 0.075;
const PERCEPTION = 52;
const SEPARATION_DIST = 24;
const BIRD_SIZE = 4.6;

// Steering weights at the two ends of the convergence ramp.
const W1 = { sep: 1.65, ali: 1.0, coh: 0.8, att: 0.4, orbit: 0 };
const W2 = { sep: 0.95, ali: 0.85, coh: 0.95, att: 1.5, orbit: 1.5 };

const ORBIT_RADIUS = 175;
const CONVERGE_MS_DEFAULT = 5200;

// Spatial hash grid for neighbor lookups — the legacy O(n²) scan does not
// survive thousands of agents; a rebuilt-per-frame bucket grid does.
const CELL = 64;
const GRID_COLS = Math.ceil(STAGE_W / CELL) + 2;
const GRID_ROWS = Math.ceil(STAGE_H / CELL) + 2;

const ALPHA_BUCKETS = 4;
const ALPHA_MIN = 0.32;
const ALPHA_MAX = 0.8;

// Birds are blitted from a pre-rendered sprite atlas (heading quantized to
// ANGLE_STEPS) instead of path-filled per frame — at 2,200 agents the
// antialiased path raster is what breaks the 60fps budget, and at 4.6px a
// 15° quantization is invisible.
const ANGLE_STEPS = 24;
const SPRITE_CELL = 16;

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

export function MurmurationField() {
  const el = document.createElement('div');
  el.style.cssText = 'position:absolute; inset:0; overflow:hidden; pointer-events:none;';

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; display:block;';
  el.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const warm = hexToRgb(readToken('--unit-warm', '#FDE9D4'));

  // ----- Flock state (instance-scoped typed arrays) -----
  const px = new Float32Array(COUNT);
  const py = new Float32Array(COUNT);
  const vx = new Float32Array(COUNT);
  const vy = new Float32Array(COUNT);
  const bucketOf = new Uint8Array(COUNT);

  const bucketStyles = [];
  for (let b = 0; b < ALPHA_BUCKETS; b += 1) {
    const a = ALPHA_MIN + ((b + 0.5) / ALPHA_BUCKETS) * (ALPHA_MAX - ALPHA_MIN);
    bucketStyles.push(`rgba(255, 255, 255, ${a.toFixed(3)})`);
  }
  for (let i = 0; i < COUNT; i += 1) bucketOf[i] = Math.floor(Math.random() * ALPHA_BUCKETS);

  const gridHead = new Int32Array(GRID_COLS * GRID_ROWS);
  const gridNext = new Int32Array(COUNT);

  const attractor = { x: CENTER_X, y: CENTER_Y, phase: Math.random() * Math.PI * 2 };

  // Convergence progress 0..1 (phase 1 sits at 0; converged orbit at 1).
  let p = 0;
  let ramp = null; // { start, duration, onProgress, onDone }

  let raf = null;
  let running = false;

  // ----- Backing store -----
  // The living flock renders at native stage resolution — the field is pure
  // motion, and the raster cost of a DPR-scaled backing store is what costs
  // the 60fps budget at 2,200 agents. The reduced-motion stills are drawn
  // once and can afford the sharper scale.
  let S = 1;
  let atlas = null;
  let atlasCell = 0;

  // The bloom is pre-rendered once at full strength and blitted scaled each
  // frame — a per-frame radial-gradient fill is what software raster chokes
  // on during the convergence.
  let bloomSprite = null;
  const BLOOM_MAX_R = 220;
  function rebuildBloom() {
    const r = Math.ceil(BLOOM_MAX_R * S);
    bloomSprite = document.createElement('canvas');
    bloomSprite.width = r * 2;
    bloomSprite.height = r * 2;
    const bctx = bloomSprite.getContext('2d');
    const g = bctx.createRadialGradient(r, r, 0, r, r, r);
    g.addColorStop(0, `rgba(${warm.r}, ${warm.g}, ${warm.b}, 1)`);
    g.addColorStop(0.55, `rgba(${warm.r}, ${warm.g}, ${warm.b}, 0.35)`);
    g.addColorStop(1, `rgba(${warm.r}, ${warm.g}, ${warm.b}, 0)`);
    bctx.fillStyle = g;
    bctx.fillRect(0, 0, r * 2, r * 2);
  }

  // One sprite per (heading angle × alpha bucket), drawn once; the frame
  // loop then blits — image sampling instead of path AA raster.
  function rebuildAtlas() {
    atlasCell = Math.ceil(SPRITE_CELL * S);
    atlas = document.createElement('canvas');
    atlas.width = atlasCell * ANGLE_STEPS;
    atlas.height = atlasCell * ALPHA_BUCKETS;
    const actx = atlas.getContext('2d');
    const size = BIRD_SIZE * S;
    for (let b = 0; b < ALPHA_BUCKETS; b += 1) {
      actx.fillStyle = bucketStyles[b];
      for (let a = 0; a < ANGLE_STEPS; a += 1) {
        const cx = a * atlasCell + atlasCell / 2;
        const cy = b * atlasCell + atlasCell / 2;
        const angle = (a / ANGLE_STEPS) * Math.PI * 2;
        const hx = Math.cos(angle) * size;
        const hy = Math.sin(angle) * size;
        actx.beginPath();
        actx.moveTo(cx + hx, cy + hy);
        actx.lineTo(cx - hx * 0.7 - hy * 0.55, cy - hy * 0.7 + hx * 0.55);
        actx.lineTo(cx - hx * 0.7 + hy * 0.55, cy - hy * 0.7 - hx * 0.55);
        actx.closePath();
        actx.fill();
      }
    }
  }

  function rebuildBacking() {
    if (prefersReducedMotion()) {
      const stageScale = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H) || 1;
      const dpr = window.devicePixelRatio || 1;
      S = Math.min(2, Math.max(1, dpr * stageScale));
    } else {
      S = 1;
    }
    canvas.width = Math.round(STAGE_W * S);
    canvas.height = Math.round(STAGE_H * S);
    rebuildAtlas();
    rebuildBloom();
  }

  let resizeTimer = null;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      rebuildBacking();
      if (!running) draw();
    }, 150);
  }
  window.addEventListener('resize', onResize);

  // ----- Simulation -----

  function seedFlock() {
    for (let i = 0; i < COUNT; i += 1) {
      px[i] = Math.random() * STAGE_W;
      py[i] = Math.random() * STAGE_H;
      const a = Math.random() * Math.PI * 2;
      const s = MAX_SPEED * (0.4 + Math.random() * 0.6);
      vx[i] = Math.cos(a) * s;
      vy[i] = Math.sin(a) * s;
    }
    attractor.phase = Math.random() * Math.PI * 2;
  }

  // The converged arrangement: the flock in orbit around the resolved point —
  // uniform angles with jitter, a soft gaussian-ish band around the orbit
  // radius, tangential velocities so a live loop continues the orbit seamlessly.
  function arrangeOrbit() {
    for (let i = 0; i < COUNT; i += 1) {
      const a = (i / COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const band = (Math.random() + Math.random() + Math.random()) / 3 - 0.5; // ~gaussian
      const r = ORBIT_RADIUS + band * 150 + (i % 11 === 0 ? Math.random() * 130 : 0);
      px[i] = CENTER_X + Math.cos(a) * r;
      py[i] = CENTER_Y + Math.sin(a) * r;
      const speed = 1.9 * (0.8 + Math.random() * 0.4);
      vx[i] = -Math.sin(a) * speed;
      vy[i] = Math.cos(a) * speed;
    }
  }

  function rebuildGrid() {
    gridHead.fill(-1);
    for (let i = 0; i < COUNT; i += 1) {
      let cx = Math.floor(px[i] / CELL) + 1;
      let cy = Math.floor(py[i] / CELL) + 1;
      if (cx < 0) cx = 0; else if (cx >= GRID_COLS) cx = GRID_COLS - 1;
      if (cy < 0) cy = 0; else if (cy >= GRID_ROWS) cy = GRID_ROWS - 1;
      const cell = cy * GRID_COLS + cx;
      gridNext[i] = gridHead[cell];
      gridHead[cell] = i;
    }
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function step() {
    // Weight ramp across the convergence.
    const sepW = lerp(W1.sep, W2.sep, p);
    const aliW = lerp(W1.ali, W2.ali, p);
    const cohW = lerp(W1.coh, W2.coh, p);
    const attW = lerp(W1.att, W2.att, p);
    const orbW = lerp(W1.orbit, W2.orbit, p);

    // Phase 1's attractor drifts a slow lissajous (the legacy motion); as the
    // convergence runs it is reeled in to center.
    attractor.phase += 0.002;
    const driftX = CENTER_X + Math.cos(attractor.phase * 0.7) * STAGE_W * 0.26;
    const driftY = CENTER_Y + Math.sin(attractor.phase * 1.1) * STAGE_H * 0.2;
    attractor.x = lerp(driftX, CENTER_X, p);
    attractor.y = lerp(driftY, CENTER_Y, p);

    rebuildGrid();

    const perception2 = PERCEPTION * PERCEPTION;
    const separation2 = SEPARATION_DIST * SEPARATION_DIST;
    const cellReach = Math.ceil(PERCEPTION / CELL);

    for (let i = 0; i < COUNT; i += 1) {
      const bx = px[i];
      const by = py[i];
      let sepX = 0, sepY = 0;
      let aliX = 0, aliY = 0;
      let cohX = 0, cohY = 0;
      let count = 0;

      const cx = Math.floor(bx / CELL) + 1;
      const cy = Math.floor(by / CELL) + 1;
      for (let gy = cy - cellReach; gy <= cy + cellReach; gy += 1) {
        if (gy < 0 || gy >= GRID_ROWS) continue;
        for (let gx = cx - cellReach; gx <= cx + cellReach; gx += 1) {
          if (gx < 0 || gx >= GRID_COLS) continue;
          for (let j = gridHead[gy * GRID_COLS + gx]; j !== -1; j = gridNext[j]) {
            if (j === i) continue;
            const dx = bx - px[j];
            const dy = by - py[j];
            const d2 = dx * dx + dy * dy;
            if (d2 >= perception2) continue;
            aliX += vx[j]; aliY += vy[j];
            cohX += px[j]; cohY += py[j];
            count += 1;
            if (d2 < separation2 && d2 > 0) {
              const inv = 1 / Math.sqrt(d2);
              sepX += dx * inv;
              sepY += dy * inv;
            }
          }
        }
      }

      let fx = sepX * sepW;
      let fy = sepY * sepW;
      if (count > 0) {
        fx += (aliX / count - vx[i]) * aliW;
        fy += (aliY / count - vy[i]) * aliW;
        fx += (cohX / count - bx) * 0.01 * cohW;
        fy += (cohY / count - by) * 0.01 * cohW;
      }
      fx += (attractor.x - bx) * 0.0006 * attW;
      fy += (attractor.y - by) * 0.0006 * attW;

      // The orbital term of the convergence: a soft spring toward the orbit
      // band plus a tangential swirl around the resolving point.
      if (orbW > 0) {
        const rx = bx - CENTER_X;
        const ry = by - CENTER_Y;
        const d = Math.sqrt(rx * rx + ry * ry) || 1;
        const nx = rx / d;
        const ny = ry / d;
        const ringPull = (ORBIT_RADIUS - d) * 0.0011; // spring toward the band
        const swirl = 0.028;                          // tangential push around it
        fx += (nx * ringPull - ny * swirl) * orbW;
        fy += (ny * ringPull + nx * swirl) * orbW;
      }

      const fm = Math.sqrt(fx * fx + fy * fy);
      if (fm > MAX_FORCE) {
        fx = (fx / fm) * MAX_FORCE;
        fy = (fy / fm) * MAX_FORCE;
      }
      vx[i] += fx;
      vy[i] += fy;

      const vm = Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i]);
      const vmax = MAX_SPEED * lerp(1, 0.86, p);
      if (vm > vmax) {
        vx[i] = (vx[i] / vm) * vmax;
        vy[i] = (vy[i] / vm) * vmax;
      }
      px[i] += vx[i];
      py[i] += vy[i];

      // Wrap the stage edges so the flock never abruptly disappears (legacy
      // behavior, kept).
      if (px[i] < -20) px[i] = STAGE_W + 20;
      if (px[i] > STAGE_W + 20) px[i] = -20;
      if (py[i] < -20) py[i] = STAGE_H + 20;
      if (py[i] > STAGE_H + 20) py[i] = -20;
    }
  }

  // ----- Rendering -----

  function drawBloom() {
    if (p <= 0.02) return;
    const ease = p * p * (3 - 2 * p);
    const r = (60 + ease * 150) * S;
    ctx.globalAlpha = Math.pow(ease, 1.6) * 0.5;
    ctx.drawImage(bloomSprite, CENTER_X * S - r, CENTER_Y * S - r, r * 2, r * 2);
    ctx.globalAlpha = 1;
  }

  const TWO_PI = Math.PI * 2;
  const ANGLE_SCALE = ANGLE_STEPS / TWO_PI;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBloom();
    const half = atlasCell / 2;
    for (let i = 0; i < COUNT; i += 1) {
      let a = Math.atan2(vy[i], vx[i]);
      if (a < 0) a += TWO_PI;
      const ai = (Math.round(a * ANGLE_SCALE)) % ANGLE_STEPS;
      ctx.drawImage(
        atlas,
        ai * atlasCell, bucketOf[i] * atlasCell, atlasCell, atlasCell,
        (px[i] * S - half) | 0, (py[i] * S - half) | 0, atlasCell, atlasCell
      );
    }
  }

  function loop(now) {
    if (!running) return;
    if (ramp) {
      const t = Math.max(0, Math.min(1, (now - ramp.start) / ramp.duration));
      p = t * t * (3 - 2 * t); // smoothstep — the shift is gradual, then settles
      ramp.onProgress?.(p);
      if (t >= 1) {
        const done = ramp.onDone;
        ramp = null;
        p = 1;
        done?.();
      }
    }
    step();
    draw();
    raf = requestAnimationFrame(loop);
  }

  function startLoop() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(loop);
  }

  function stopLoop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    ramp = null;
  }

  // ----- Public API -----

  // Reconstructs a build state from scratch. { phase: 1 } → mid-murmuration
  // (seed + warmup); { phase: 2, progress: 1 } → the converged orbit with the
  // bloom resolved. Under reduced motion both are single stills from the
  // simulation — no loop ever starts.
  function setState({ phase = 1, progress = phase === 2 ? 1 : 0 } = {}) {
    stopLoop();
    p = phase === 2 ? Math.max(0, Math.min(1, progress)) : 0;
    if (phase === 2 && p >= 1) {
      arrangeOrbit();
      // A short settle lets the seeded orbit find its flock character.
      for (let k = 0; k < 40; k += 1) step();
    } else {
      seedFlock();
      for (let k = 0; k < WARMUP_STEPS; k += 1) step();
    }
    if (prefersReducedMotion()) {
      draw();
    } else {
      draw();
      startLoop();
    }
  }

  // Runs the convergence live from the current phase-1 flock. Reduced motion
  // resolves instantly to the converged still.
  function animate({ duration = CONVERGE_MS_DEFAULT, onProgress, onDone } = {}) {
    if (prefersReducedMotion()) {
      setState({ phase: 2, progress: 1 });
      onProgress?.(1);
      onDone?.();
      return;
    }
    if (!running) startLoop();
    ramp = { start: performance.now(), duration, onProgress, onDone };
  }

  function destroy() {
    stopLoop();
    clearTimeout(resizeTimer);
    window.removeEventListener('resize', onResize);
    el.remove();
  }

  rebuildBacking();

  return { el, setState, animate, destroy };
}

export default MurmurationField;
