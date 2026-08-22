// R3.1 verification suite (revision brief §E). The R3 Phase C suite carried
// forward at the revised state: the four changed slides get new build
// counts, new probes, and new gates — the pacing tables, the claim-count
// gate, the color audit, and the verbatim comparison now read the four
// changed scripts out of docs/r3-1-revision-brief.md and the five unchanged
// ones out of docs/r3-session-brief.md.
//
// Usage: node verify-r3-1.cjs [--rm] [--part=traversal|direct|static]
const { chromium } = require('playwright');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const {
  probeInPage, ladderGeometryProbeInPage, towerGeometryProbeInPage
} = require('./probes-r3-1.cjs');

const BASE = 'http://localhost:4311';
const OUT = path.join(__dirname, '..');
const SHOTS = path.join(OUT, 'screenshots-r3-1');
const REPO = path.resolve(__dirname, '../../..');
const REDUCED = process.argv.includes('--rm');
const PART = (process.argv.find((a) => a.startsWith('--part')) || '--part=all').split('=')[1];

// [id, totalBuildSteps, 1-based slide number]  — 05 and 06 grew at R3.1.
const SLIDES = [
  ['3-00-waypoint-function', 2, 14],
  ['3-01-the-three-functions', 5, 15],
  ['3-02-the-functions-separate', 3, 16],
  ['3-03-the-order-of-monetization', 6, 17],
  ['3-04-stage-signatures', 2, 18],
  ['3-05-the-palladium-test', 5, 19],
  ['3-06-what-your-money-is', 6, 20],
  ['3-07-where-bitcoin-is', 5, 21],
  ['3-08-waypoint-judge', 2, 22]
];
const CHANGED = new Set([
  '3-02-the-functions-separate', '3-03-the-order-of-monetization',
  '3-05-the-palladium-test', '3-06-what-your-money-is'
]);
const PROBED = new Set(SLIDES.map(([id]) => id));
const LADDER_SLIDES = new Set([
  '3-03-the-order-of-monetization', '3-04-stage-signatures', '3-07-where-bitcoin-is'
]);

function settleMs(id, b) {
  if (REDUCED) return 500;
  if (id === '3-00-waypoint-function' || id === '3-08-waypoint-judge') return b === 2 ? 1700 : 1500;
  if (id === '3-01-the-three-functions') return b === 1 ? 1900 : 1500;
  if (id === '3-02-the-functions-separate') return b === 2 ? 1600 : 1300;
  if (id === '3-03-the-order-of-monetization') return b === 1 ? 2000 : 1500;
  if (id === '3-04-stage-signatures') return 1500;
  if (id === '3-05-the-palladium-test') return b === 2 ? 2500 : 1400;
  // The tower: b4 carries the tremor (~1s), b6 draws the drop line (1.3s).
  if (id === '3-06-what-your-money-is') return b === 4 ? 1800 : b === 6 ? 2000 : 1500;
  if (id === '3-07-where-bitcoin-is') return b === 1 ? 2000 : 1600;
  return 1300;
}

const results = [];
const consoleLines = [];
let shotCount = 0;

function record(section, name, ok, detail) {
  results.push({ section, name, ok, detail });
  if (!ok) console.log(`FAIL ${section} :: ${name} :: ${detail}`);
}

(async () => {
  fs.mkdirSync(path.join(SHOTS, 'traversal'), { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    reducedMotion: REDUCED ? 'reduce' : 'no-preference'
  });
  // The renderer is recycled every RECYCLE_AFTER navigations. This rig has
  // ~1.5GB free, and a suite that reloads the deck ~120 times while taking
  // screenshots exhausts Chromium's network/memory budget partway through
  // (net::ERR_INSUFFICIENT_RESOURCES, then a window.__deck timeout). A fresh
  // page every 24 navigations keeps the run inside the budget; nothing about
  // the deck's state survives a navigation anyway, so this changes what is
  // measured not at all. Recorded in the report rather than hidden.
  const RECYCLE_AFTER = 24;
  let page;
  let navCount = 0;

  function attach(p) {
    p.on('console', (m) => {
      if (m.type() === 'error' || m.type() === 'warning') {
        const t = m.text();
        if (!t.startsWith('[vite]')) consoleLines.push(`[${m.type()}] ${t}`);
      }
    });
    p.on('pageerror', (e) => consoleLines.push(`[pageerror] ${e.message}`));
  }

  async function freshPage() {
    const old = page;
    page = await context.newPage();
    attach(page);
    navCount = 0;
    if (old) await old.close();
  }
  await freshPage();

  const ready = () => page.waitForFunction(() => window.__deck, null, { timeout: 25000 });

  const state = () => page.evaluate(() => ({
    idx: window.__deck.index,
    build: window.__deck.buildStep,
    id: window.__deck.slides[window.__deck.index].id,
    total: window.__deck.slides.length,
    containers: document.querySelectorAll('.deck-slide').length,
    active: document.querySelectorAll('.deck-slide[data-active="true"]').length,
    empty: document.querySelector('.deck-slide[data-active="true"]').children.length === 0,
    imagesBroken: Array.from(document.querySelectorAll('.deck-slide img'))
      .filter((i) => !i.complete || i.naturalWidth === 0).length
  }));

  const probe = (id, build) => page.evaluate(probeInPage, { id, build });
  const geomProbe = () => page.evaluate(ladderGeometryProbeInPage);
  const towerProbe = () => page.evaluate(towerGeometryProbeInPage);

  async function ladderGeometry(section, id, build) {
    if (!LADDER_SLIDES.has(id)) return;
    if (id === '3-07-where-bitcoin-is' && (build === 0 || build === 5)) return;
    if (id === '3-03-the-order-of-monetization' && build === 0) return;
    const g = await geomProbe();
    record(section, `ladder-geometry ${id} b${build}`, g.ok, g.detail);
  }

  async function towerGeometry(section, id, build) {
    if (id !== '3-06-what-your-money-is' || build === 0) return;
    const g = await towerProbe();
    record(section, `tower-geometry ${id} b${build}`, g.ok, g.detail);
  }

  // Every build, including 0, is seeded explicitly and reloaded. (The R3
  // suite cleared sessionStorage for build 0 without reloading, which left
  // the live deck on whatever build the restored state had already put it
  // at; harmless there because consecutive cases never shared a slide, but
  // it desynchronized the R3.1 tower cases, which do. Seeding is
  // deterministic for every build.)
  async function directEnter(id, slideNo, buildStep) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      if (navCount >= RECYCLE_AFTER || attempt > 0) await freshPage();
      try {
        navCount += 2;
        await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
        await ready();
        await page.evaluate(({ n, k }) => {
          sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
        }, { n: slideNo, k: buildStep });
        await page.reload({ waitUntil: 'networkidle' });
        await ready();
        return;
      } catch (err) {
        if (attempt === 1) throw err;
        consoleLines.push(`[harness] retrying direct entry ${id} b${buildStep} after ${err.name}`);
      }
    }
  }

  // ---------- 1. Full deck traversal: forward / back / fast-forward ----------
  if (PART === 'traversal' || PART === 'all') {
    await page.goto(`${BASE}/?slide=1`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(() => sessionStorage.clear());
    await page.waitForTimeout(1500);

    let s = await state();
    const TOTAL = s.total;
    record('traversal', 'deck is 46 slides', TOTAL === 46, `total=${TOTAL}`);
    let traversalOk = true;
    let steps = 0;
    while (!(s.idx === TOTAL - 1)) {
      const before = s;
      await page.keyboard.press('ArrowRight');
      steps += 1;
      const nextBuild = before.build + 1;
      await page.waitForTimeout(PROBED.has(before.id) || PROBED.has(s.id)
        ? settleMs(before.id, nextBuild) : 800);
      s = await state();
      if (s.containers !== 1 || s.active !== 1 || s.empty || s.imagesBroken) {
        await page.waitForTimeout(1800);
        s = await state();
      }
      if (s.containers !== 1 || s.active !== 1 || s.empty || s.imagesBroken) {
        traversalOk = false;
        record('traversal', `forward step ${steps} at ${s.id} b${s.build}`, false, JSON.stringify(s));
      }
      if (PROBED.has(s.id) && !REDUCED) {
        if (s.id !== before.id) await page.waitForTimeout(1100);
        const r = await probe(s.id, s.build);
        record('traversal-probe', `${s.id} b${s.build}`, r.ok, r.detail);
        await ladderGeometry('traversal-geometry', s.id, s.build);
        await towerGeometry('traversal-geometry', s.id, s.build);
        await page.screenshot({
          path: path.join(SHOTS, 'traversal', `${String(steps).padStart(3, '0')}-${s.id}-b${s.build}.png`)
        });
        shotCount += 1;
      }
      if (before.id === '3-08-waypoint-judge' && s.id === '4-01-ideal-store-of-value') {
        await page.waitForTimeout(1500);
        const seam = await state();
        record('traversal', 'the seam 3-08 → 4-01 lands clean',
          seam.containers === 1 && seam.active === 1 && !seam.empty && seam.imagesBroken === 0,
          JSON.stringify({ id: seam.id, imagesBroken: seam.imagesBroken }));
        if (!REDUCED) {
          await page.screenshot({ path: path.join(SHOTS, 'seam-3-08-to-4-01.png') });
          shotCount += 1;
        }
      }
      if (steps > 400) { record('traversal', 'runaway', false, 'too many steps'); break; }
    }
    record('traversal', 'forward pass complete', traversalOk && s.idx === TOTAL - 1,
      `${steps} steps to ${s.id}`);

    // Backward all the way.
    let backSteps = 0;
    s = await state();
    while (!(s.idx === 0 && s.build === 0) && backSteps < 500) {
      await page.keyboard.press('ArrowLeft');
      backSteps += 1;
      await page.waitForTimeout(PROBED.has(s.id) ? 520 : 420);
      s = await state();
      if (s.containers !== 1 || s.active !== 1 || s.empty) {
        await page.waitForTimeout(1200);
        s = await state();
        if (s.containers !== 1 || s.active !== 1 || s.empty) {
          record('traversal', `backward step ${backSteps} at ${s.id} b${s.build}`, false, JSON.stringify(s));
        }
      }
    }
    record('traversal', 'backward pass reaches 1.1 b0', s.idx === 0 && s.build === 0, `${backSteps} steps`);

    // The backward ladder handoff lands 3-03 at its end state, never black.
    await directEnter('3-04-stage-signatures', 18, 0);
    await page.waitForTimeout(1600);
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(REDUCED ? 500 : 1700);
    s = await state();
    const backOk = s.id === '3-03-the-order-of-monetization' && s.build === 6;
    record('traversal', 'ladder backward handoff lands 3-03 b6', backOk, `${s.id} b${s.build}`);
    if (backOk && !REDUCED) {
      const r = await probe('3-03-the-order-of-monetization', 6);
      record('traversal', 'ladder backward handoff state', r.ok, r.detail);
    }

    // Fast re-forward through Sections 2–3.
    await page.goto(`${BASE}/?slide=2-01-the-world-without-it`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(() => sessionStorage.clear());
    await page.waitForTimeout(1200);
    s = await state();
    let fwd = 0;
    while (s.idx < 22 && fwd < 140) {
      await page.keyboard.press('ArrowRight');
      fwd += 1;
      await page.waitForTimeout(140);
      s = await state();
    }
    await page.waitForTimeout(2500);
    s = await state();
    const stale = await page.evaluate(() =>
      document.querySelectorAll('[data-exiting="true"]').length);
    const fastOk = s.containers === 1 && s.active === 1 && !s.empty && stale === 0;
    record('traversal', 'fast re-forward through Sections 2–3', fastOk,
      JSON.stringify({ id: s.id, containers: s.containers, staleOverlays: stale }));
  }

  // ---------- 2. Direct entry at every build ----------
  if (PART === 'direct' || PART === 'all') {
    for (const [id, builds, slideNo] of SLIDES) {
      for (let b = 0; b <= builds; b += 1) {
        await directEnter(id, slideNo, b);
        await page.waitForTimeout(REDUCED ? 900 : 1600);
        const st = await state();
        const stOk = st.id === id && st.build === b;
        const r = stOk ? await probe(id, b) : { ok: false, detail: `landed ${st.id} b${st.build}` };
        record(REDUCED ? 'rm-direct-entry' : 'direct-entry', `${id} b${b}`, r.ok, r.detail);
        if (stOk) {
          await ladderGeometry(REDUCED ? 'rm-direct-geometry' : 'direct-geometry', id, b);
          await towerGeometry(REDUCED ? 'rm-direct-geometry' : 'direct-geometry', id, b);
        }
        if (!REDUCED) {
          await page.screenshot({ path: path.join(SHOTS, `${id}-b${b}.png`) });
          shotCount += 1;
        }
      }
    }

    // ---------- 3. Refresh mid-animation ----------
    // The four R3 cases plus the two new choreographies: the tower's tremor
    // and its drop line must both reconstruct as states, not as gestures.
    const midCases = [
      ['3-00-waypoint-function', 14, 2, 500],
      ['3-03-the-order-of-monetization', 17, 1, 600],
      ['3-05-the-palladium-test', 19, 2, 800],
      ['3-06-what-your-money-is', 20, 1, 300],
      ['3-06-what-your-money-is', 20, 4, 400],
      ['3-06-what-your-money-is', 20, 6, 500]
    ];
    for (const [id, slideNo, targetBuild, midWait] of midCases) {
      await directEnter(id, slideNo, 0);
      await page.waitForTimeout(1200);
      for (let b = 1; b <= targetBuild; b += 1) {
        await page.keyboard.press('ArrowRight');
        if (b < targetBuild) await page.waitForTimeout(REDUCED ? 400 : settleMs(id, b));
      }
      await page.waitForTimeout(midWait);
      await page.reload({ waitUntil: 'networkidle' });
      await ready();
      await page.waitForTimeout(REDUCED ? 900 : 1600);
      const st = await state();
      const ok = st.id === id && st.build === targetBuild;
      const r = ok ? await probe(id, targetBuild) : { ok: false, detail: `landed ${st.id} b${st.build}` };
      record(REDUCED ? 'rm-mid-refresh' : 'mid-animation-refresh', `${id} b${targetBuild}`, r.ok, r.detail);
    }

    // ---------- 4. Named frames (§E), live ----------
    if (!REDUCED) {
      for (const [id, slideNo, shot] of [
        ['3-00-waypoint-function', 14, 'ignition-waypoint-2.png'],
        ['3-08-waypoint-judge', 22, 'ignition-waypoint-3.png']
      ]) {
        await directEnter(id, slideNo, 1);
        await page.waitForTimeout(1600);
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(1600);
        await page.screenshot({ path: path.join(SHOTS, shot) });
        shotCount += 1;
        const r = await probe(id, 2);
        record('named-frames', `${id} ignition (live)`, r.ok, r.detail);
      }

      // The ladder's thresholds, live: each brightens on its own build.
      await directEnter('3-03-the-order-of-monetization', 17, 1);
      await page.waitForTimeout(1800);
      for (let b = 2; b <= 6; b += 1) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(settleMs('3-03-the-order-of-monetization', b));
        const r = await probe('3-03-the-order-of-monetization', b);
        record('named-frames', `ladder thresholds live b${b}`, r.ok, r.detail);
        const g = await geomProbe();
        record('named-frames', `threshold geometry live b${b}`, g.ok, g.detail);
      }
      await page.screenshot({ path: path.join(SHOTS, 'ladder-thresholds-b6.png') });
      shotCount += 1;

      // The placed bitcoin glyph, live.
      await directEnter('3-07-where-bitcoin-is', 21, 1);
      await page.waitForTimeout(2000);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(1800);
      await page.screenshot({ path: path.join(SHOTS, 'bitcoin-placed-at-sov.png') });
      shotCount += 1;
      {
        const r = await probe('3-07-where-bitcoin-is', 2);
        record('named-frames', 'the placed bitcoin glyph (live)', r.ok, r.detail);
        const g = await geomProbe();
        record('named-frames', 'placement geometry', g.ok, g.detail);
      }

      // The palladium beat's second epoch, live.
      await directEnter('3-05-the-palladium-test', 19, 3);
      await page.waitForTimeout(1600);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(SHOTS, 'palladium-two-epochs.png') });
      shotCount += 1;
      {
        const r = await probe('3-05-the-palladium-test', 4);
        record('named-frames', 'palladium second epoch (live)', r.ok, r.detail);
      }

      // The tower, live, all the way through: the settle, the tremor, the
      // scope, and the held question.
      await directEnter('3-06-what-your-money-is', 20, 0);
      await page.waitForTimeout(1200);
      for (let b = 1; b <= 6; b += 1) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(settleMs('3-06-what-your-money-is', b));
        const r = await probe('3-06-what-your-money-is', b);
        record('named-frames', `tower live b${b}`, r.ok, r.detail);
        const g = await towerProbe();
        record('named-frames', `tower geometry live b${b}`, g.ok, g.detail);
        await page.screenshot({ path: path.join(SHOTS, `tower-live-b${b}.png`) });
        shotCount += 1;
      }

      // The tremor, sampled mid-flight. The dip is a 460ms flicker whose
      // trough sits around 140ms, so the sampling runs inside the page at
      // ~16ms — screenshotting between samples is far too slow to catch it
      // and misses the trough on some runs. The visual record is taken as a
      // separate pass below.
      await directEnter('3-06-what-your-money-is', 20, 3);
      await page.waitForTimeout(1600);
      const shudderPromise = page.evaluate(() => new Promise((resolve) => {
        const ty = (sel) => {
          const t = getComputedStyle(document.querySelector(sel)).transform;
          const m = t && t !== 'none' ? t.match(/matrix\(([^)]+)\)/) : null;
          return m ? parseFloat(m[1].split(',')[5]) : 0;
        };
        const base = document.querySelector('.s3f-tower__slab[data-layer="base"]');
        const out = [];
        const t0 = performance.now();
        const tick = () => {
          out.push({
            t: Math.round(performance.now() - t0),
            apps: ty('.s3f-tower__slab[data-layer="apps"]'),
            deposits: ty('.s3f-tower__slab[data-layer="deposits"]'),
            baseOpacity: parseFloat(getComputedStyle(base).opacity)
          });
          if (performance.now() - t0 < 1400) requestAnimationFrame(tick);
          else resolve(out);
        };
        requestAnimationFrame(tick);
      }));
      await page.keyboard.press('ArrowRight');
      const shudder = await shudderPromise;
      const dipped = shudder.some((f) => f.baseOpacity < 0.7);
      const moved = shudder.some((f) => Math.abs(f.apps - 14) > 0.4 || Math.abs(f.deposits - 7) > 0.4);
      const restrained = shudder.every((f) =>
        Math.abs(f.apps - 14) <= 4 && Math.abs(f.deposits - 7) <= 4 && f.baseOpacity >= 0.35);
      record('named-frames', 'tremor: the base dips once', dipped,
        `min base opacity ${Math.min(...shudder.map((f) => f.baseOpacity)).toFixed(2)}`);
      record('named-frames', 'tremor: the shudder reaches the layers above', moved,
        JSON.stringify(shudder.map((f) => [f.apps.toFixed(1), f.deposits.toFixed(1)])));
      record('named-frames', 'tremor: restrained (≤4px, never collapses)', restrained,
        `max slab displacement ${Math.max(...shudder.map((f) =>
          Math.max(Math.abs(f.apps - 14), Math.abs(f.deposits - 7)))).toFixed(2)}px`);
      {
        const r = await probe('3-06-what-your-money-is', 4);
        record('named-frames', 'tremor settles back to its exact state', r.ok, r.detail);
      }

      // The visual record of the tremor, as its own pass.
      await directEnter('3-06-what-your-money-is', 20, 3);
      await page.waitForTimeout(1600);
      await page.keyboard.press('ArrowRight');
      for (let i = 0; i < 8; i += 1) {
        await page.screenshot({ path: path.join(SHOTS, `tremor-frame-${i}.png`) });
        shotCount += 1;
        await page.waitForTimeout(110);
      }

      // The held question as the final frame: the line into darkness, no copy.
      await directEnter('3-06-what-your-money-is', 20, 5);
      await page.waitForTimeout(1600);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(SHOTS, 'tower-held-question.png') });
      shotCount += 1;
      {
        const r = await probe('3-06-what-your-money-is', 6);
        record('named-frames', 'the held question holds (live)', r.ok, r.detail);
        const g = await towerProbe();
        record('named-frames', 'held-question geometry', g.ok, g.detail);
      }

      // The ladder group handoff, captured as a sequence.
      await directEnter('3-03-the-order-of-monetization', 17, 6);
      await page.waitForTimeout(1800);
      await page.keyboard.press('ArrowRight');
      for (let i = 0; i < 5; i += 1) {
        await page.screenshot({ path: path.join(SHOTS, `ladder-handoff-${i}.png`) });
        shotCount += 1;
        await page.waitForTimeout(220);
      }
      await page.waitForTimeout(600);
      {
        const r = await probe('3-04-stage-signatures', 0);
        record('named-frames', 'ladder handoff resolves to 3-04 b0', r.ok, r.detail);
      }

      // The seam into Section 4.
      await directEnter('3-08-waypoint-judge', 22, 2);
      await page.waitForTimeout(1800);
      await page.keyboard.press('ArrowRight');
      for (let i = 0; i < 5; i += 1) {
        await page.screenshot({ path: path.join(SHOTS, `seam-sequence-${i}.png`) });
        shotCount += 1;
        await page.waitForTimeout(90);
      }
      await page.waitForTimeout(1200);
      const cf = await state();
      record('named-frames', 'seam crossfade lands 4-01 clean',
        cf.id === '4-01-ideal-store-of-value' && cf.containers === 1,
        JSON.stringify({ id: cf.id, containers: cf.containers }));
    }
  }

  // ---------- 5. Reduced-motion live advances + handoffs + cuts ----------
  if (REDUCED && (PART === 'direct' || PART === 'all')) {
    for (const [id, builds, slideNo] of SLIDES) {
      await directEnter(id, slideNo, 0);
      await page.waitForTimeout(900);
      for (let b = 1; b <= builds; b += 1) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(420);
        const r = await probe(id, b);
        record('rm-live-advance', `${id} b${b} settled ≤420ms`, r.ok, r.detail);
      }
    }
    // The tremor is skipped entirely under reduced motion: no animation runs
    // on any slab at the tremor build, live.
    await directEnter('3-06-what-your-money-is', 20, 3);
    await page.waitForTimeout(900);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(80);
    const anim = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.s3f-tower__slab, .s3f-tower__link'))
        .map((el) => getComputedStyle(el).animationName)
        .filter((n) => n && n !== 'none'));
    record('rm-tremor', 'tremor skipped entirely under reduced motion',
      anim.length === 0, anim.join(','));
    {
      const r = await probe('3-06-what-your-money-is', 4);
      record('rm-tremor', 'tremor build lands its exact state ≤80ms', r.ok, r.detail);
    }
    // The ladder group handoff resolves instantly, both directions.
    const rmBoundaries = [
      ['3-03-the-order-of-monetization', 17, 6, '3-04-stage-signatures', 0, 'ArrowRight'],
      ['3-04-stage-signatures', 18, 0, '3-03-the-order-of-monetization', 6, 'ArrowLeft']
    ];
    for (const [fromId, fromNo, fromBuild, toId, toBuild, key] of rmBoundaries) {
      await directEnter(fromId, fromNo, fromBuild);
      await page.waitForTimeout(900);
      await page.keyboard.press(key);
      await page.waitForTimeout(420);
      const r = await probe(toId, toBuild);
      record('rm-handoff', `${fromId} b${fromBuild} ${key === 'ArrowRight' ? '→' : '←'} ${toId} b${toBuild} ≤420ms`, r.ok, r.detail);
    }
    // Standard boundaries cut instantly — including the seam into Section 4.
    const rmCuts = [
      ['3-02-the-functions-separate', 16, 3, '3-03-the-order-of-monetization'],
      ['3-06-what-your-money-is', 20, 6, '3-07-where-bitcoin-is'],
      ['3-08-waypoint-judge', 22, 2, '4-01-ideal-store-of-value']
    ];
    for (const [fromId, fromNo, fromBuild, toId] of rmCuts) {
      await directEnter(fromId, fromNo, fromBuild);
      await page.waitForTimeout(900);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(200);
      const st = await state();
      const cutOk = st.id === toId && st.containers === 1 && st.active === 1;
      record('rm-instant-cut', `${fromId} → ${toId} ≤200ms one container`, cutOk,
        JSON.stringify({ id: st.id, containers: st.containers }));
    }
  }

  // ---------- 6. Static checks ----------
  if (!REDUCED && (PART === 'static' || PART === 'all')) {
    // Sources are read with line endings normalized: a fresh checkout can
    // materialize tracked files as CRLF, and every gate below reasons about
    // content, never about newline bytes.
    const CRLF = new RegExp(String.fromCharCode(13, 10), 'g');
    const read = (p) => fs.readFileSync(path.join(REPO, p), 'utf8')
      .replace(CRLF, String.fromCharCode(10));
    const S3_DIR = 'src/slides/section-3-function';
    const s3Files = fs.readdirSync(path.join(REPO, S3_DIR)).filter((f) => f.endsWith('.js'));
    const componentFiles = [
      'src/components/WaypointInterstitial.js',
      'src/components/section-3/StageLadder.js',
      'src/components/section-3/LayerDiagram.js'
    ];
    const allNew = [...s3Files.map((f) => `${S3_DIR}/${f}`), ...componentFiles];
    const cssAll = read('src/styles/slides.css');
    const s3CssStart = cssAll.indexOf('===== Section 3 — What Money Must Do');
    const s3Css = cssAll.slice(s3CssStart);
    record('static', 'Section 3 CSS region present', s3CssStart > 0, '');

    // 6.1 Pacing audit: every script's [→] count equals its build count.
    for (const [id, builds] of SLIDES) {
      const file = allNew.find((f) => f.includes(id.slice(2)));
      const src = read(file);
      const notes = (src.match(/notes: `([\s\S]*?)`\n};/) || [])[1] || '';
      const arrows = (notes.match(/\[→\]/g) || []).length;
      record('static-pacing', `${id}: ${arrows} arrows = ${builds} builds`, arrows === builds,
        `arrows=${arrows} builds=${builds}`);
      // The declared build count must match the module's own clamp and field.
      const declared = (src.match(/totalBuildSteps:\s*(\d+)/) || [])[1];
      record('static-pacing', `${id}: totalBuildSteps declares ${builds}`,
        Number(declared) === builds, `declared=${declared}`);
    }

    // 6.2 Scripts verbatim (apostrophe/quote-normalized). Five slides come
    // from the R3 session brief unchanged; the four changed ones are
    // assembled from the R3.1 revision brief — 02 and 03 replace one
    // paragraph each, 05 and 06 are full replacements.
    const brief = read('docs/r3-session-brief.md');
    const brief11 = read('docs/r3-1-revision-brief.md');
    const down = (t) => t.replace(/’/g, "'").replace(/[“”]/g, '"');
    const sectionOf = (md, heading) => {
      const i = md.indexOf(heading);
      if (i < 0) return '';
      const rest = md.slice(i + heading.length);
      const j = rest.search(/\n# /);
      return j < 0 ? rest : rest.slice(0, j);
    };
    const arrowsIn = (text) => text.split(/\n/)
      .map((l) => l.replace(/^>\s?/, '').trim())
      .filter((l) => l.startsWith('[→]'));
    const sessionArrows = (slug) => {
      const m = brief.match(new RegExp('### `' + slug + '`[^\\n]*\\n([\\s\\S]*?)(?=\\n### |\\n# )'));
      return m ? arrowsIn(m[1]) : null;
    };
    const A = arrowsIn(sectionOf(brief11, '\n# A. Argentina slide'));
    const B = arrowsIn(sectionOf(brief11, '\n# B. StageLadder'));
    const C = arrowsIn(sectionOf(brief11, '\n# C. Palladium reframe'));
    const D = arrowsIn(sectionOf(brief11, '\n# D. The layer tower rebuilt'));
    record('static-verbatim', 'R3.1 brief yields 1/1/5/6 script paragraphs (A/B/C/D)',
      A.length === 1 && B.length === 1 && C.length === 5 && D.length === 6,
      `${A.length}/${B.length}/${C.length}/${D.length}`);

    // R4.1 amended one Section 3 script under an authorized presenter ruling
    // (R-05, the supply-anchored hook). The verbatim discipline is kept, not
    // waived: the expected text is the R3.1 brief's, with each recorded
    // amendment applied, so the installed script is still compared
    // character-for-character against a known text rather than trusted.
    const R41_AMENDMENTS = {
      '3-05-the-palladium-test': [
        ["Palladium. Rarer in the Earth's crust than gold. Genuinely useful — industry needs it.",
          'Palladium. Scarcer in supply than gold: the world mines about fifteen times as much gold each year. Genuinely useful — industry needs it.'],
        ['Eighteen-oh-three: palladium is discovered — rarer than gold — and walks into a world',
          'Eighteen-oh-three: palladium is discovered — scarcer than gold — and walks into a world']
      ]
    };
    const amend = (id, arrows) => (R41_AMENDMENTS[id] || []).reduce(
      (acc, [from, to]) => acc.map((p) => p.replace(from, to)), arrows);

    const expected = {};
    for (const [id] of SLIDES) {
      const slug = id.slice(2);
      const base = sessionArrows(slug);
      if (!base) { record('static-verbatim', `${id} script found in brief`, false, 'no block'); continue; }
      if (id === '3-02-the-functions-separate') expected[id] = [base[0], A[0], base[2]];
      else if (id === '3-03-the-order-of-monetization') expected[id] = [...base.slice(0, 5), B[0]];
      else if (id === '3-05-the-palladium-test') expected[id] = amend(id, C);
      else if (id === '3-06-what-your-money-is') expected[id] = D;
      else expected[id] = base;
    }
    // Every amendment must actually be an amendment — if a `from` string is
    // absent from the brief the gate would silently compare an unchanged text
    // and pass for the wrong reason.
    const briefText = C.join('\n');
    const dead = (R41_AMENDMENTS['3-05-the-palladium-test'] || [])
      .filter(([from]) => !briefText.includes(from))
      .map(([from]) => `"${from.slice(0, 44)}…"`);
    record('static-verbatim', 'every R4.1 amendment matches brief text it replaces',
      dead.length === 0, dead.join(', '));
    for (const [id] of SLIDES) {
      if (!expected[id]) continue;
      const src = read(allNew.find((f) => f.includes(id.slice(2))));
      const notes = (src.match(/notes: `([\s\S]*?)`\n};/) || [])[1] || '';
      const wanted = expected[id].join('\n\n');
      const same = down(notes) === down(wanted);
      const source = CHANGED.has(id)
        ? (id.includes('-05-') || id.includes('-06-') ? 'R3.1 full replacement' : 'R3.1 paragraph swap')
        : 'R3 unchanged';
      record('static-verbatim', `${id} script verbatim (${source})`, same,
        same ? '' : `first diff at ${[...down(notes)].findIndex((c, i) => c !== down(wanted)[i])}`);
    }

    // 6.3 On-screen copy present, verbatim, in its file.
    const COPY = [
      ['src/components/WaypointInterstitial.js', 'Ask where it came from.'],
      ['src/components/WaypointInterstitial.js', 'Ask what it must do.'],
      ['src/components/WaypointInterstitial.js', 'Ask how you would judge anything that tries to be it.'],
      [`${S3_DIR}/01-the-three-functions.js`, "name: 'STORE OF VALUE'"],
      [`${S3_DIR}/01-the-three-functions.js`, "sub: 'moves value through time.'"],
      [`${S3_DIR}/01-the-three-functions.js`, "name: 'MEDIUM OF EXCHANGE'"],
      [`${S3_DIR}/01-the-three-functions.js`, "sub: 'moves value between people.'"],
      [`${S3_DIR}/01-the-three-functions.js`, "name: 'UNIT OF ACCOUNT'"],
      [`${S3_DIR}/01-the-three-functions.js`, "sub: 'measures value.'"],
      [`${S3_DIR}/01-the-three-functions.js`, 'Across time. Across space. Across scale. The three dimensions of the competition — seen from the inside.'],
      [`${S3_DIR}/02-the-functions-separate.js`, "head: 'PRICED IN'"],
      [`${S3_DIR}/02-the-functions-separate.js`, "head: 'PAID IN'"],
      [`${S3_DIR}/02-the-functions-separate.js`, "head: 'SAVED IN'"],
      [`${S3_DIR}/02-the-functions-separate.js`, "word: 'dollars'"],
      [`${S3_DIR}/02-the-functions-separate.js`, "word: 'pesos'"],
      // R3.1 §A1.
      [`${S3_DIR}/02-the-functions-separate.js`, "word: 'dollars · real estate'"],
      [`${S3_DIR}/02-the-functions-separate.js`, 'Argentina, five decades.'],
      [`${S3_DIR}/02-the-functions-separate.js`, 'The functions are separable — across goods, and across time. A good can be money in one function before, or without, the others.'],
      [`${S3_DIR}/03-the-order-of-monetization.js`, 'after Vijay Boyapati.'],
      [`${S3_DIR}/03-the-order-of-monetization.js`, 'Nobody accepts as payment what they don’t expect to hold value.'],
      [`${S3_DIR}/03-the-order-of-monetization.js`, 'Nobody writes contracts in what nobody accepts.'],
      // R3.1 §B2.
      [`${S3_DIR}/03-the-order-of-monetization.js`, 'Store of value is the foundation function. The other functions are built on it.'],
      ['src/components/section-3/StageLadder.js', "label: 'COLLECTIBLE'"],
      ['src/components/section-3/StageLadder.js', "label: 'STORE OF VALUE'"],
      ['src/components/section-3/StageLadder.js', "label: 'MEDIUM OF EXCHANGE'"],
      ['src/components/section-3/StageLadder.js', "label: 'UNIT OF ACCOUNT'"],
      ['src/components/section-3/StageLadder.js', 'Early-stage signature: few holders · thin markets · reflexive pricing.'],
      [`${S3_DIR}/04-stage-signatures.js`, 'Volatility and illiquidity are properties of the stage — not verdicts on the good.'],
      // R4.1 §R-05: the hook is supply-anchored.
      [`${S3_DIR}/05-the-palladium-test.js`, 'Palladium: scarcer in supply than gold. Genuinely useful. At times more expensive. It never became money.'],
      // R3.1 §C.
      [`${S3_DIR}/05-the-palladium-test.js`, 'PRICE OF ONE OUNCE · MODERN ERA'],
      [`${S3_DIR}/05-the-palladium-test.js`, 'Discovered in 1803 — facing a monetary network thousands of years old.'],
      [`${S3_DIR}/05-the-palladium-test.js`, 'And when gold’s role narrowed to store of value, palladium never touched that either. Central banks hold gold — not palladium.'],
      [`${S3_DIR}/05-the-palladium-test.js`, 'Marginally better is structurally insufficient. Only a categorical difference on the deciding properties has ever moved the crown.'],
      ['src/components/section-3/LayerDiagram.js', "label: 'PAYMENT APPS'"],
      ['src/components/section-3/LayerDiagram.js', "label: 'BANK DEPOSITS'"],
      ['src/components/section-3/LayerDiagram.js', "label: 'BASE MONEY'"],
      [`${S3_DIR}/06-what-your-money-is.js`, 'a claim on your deposit.'],
      [`${S3_DIR}/06-what-your-money-is.js`, 'a claim on base money.'],
      // R3.1 §D.
      [`${S3_DIR}/06-what-your-money-is.js`, 'More claims than base. That is what a bank run runs on.'],
      [`${S3_DIR}/06-what-your-money-is.js`, 'Layers are not a scam — they are how money scales. But layers inherit the soundness of their base.'],
      [`${S3_DIR}/06-what-your-money-is.js`, 'This presentation’s question is about the foundation asset — underneath them all.'],
      [`${S3_DIR}/07-where-bitcoin-is.js`, 'Collectible, 2009–. Now visibly in the store-of-value stage: held by individuals, funds, institutions, states. Not a medium of exchange or unit of account at scale.'],
      [`${S3_DIR}/07-where-bitcoin-is.js`, 'Supply: 21,000,000 units — fixed by the protocol’s rules.'],
      [`${S3_DIR}/07-where-bitcoin-is.js`, 'Can be held directly, with no counterparty — like a bearer asset.'],
      [`${S3_DIR}/07-where-bitcoin-is.js`, 'Early in a process that history shows can stall. Candidates have died mid-climb before.'],
      [`${S3_DIR}/07-where-bitcoin-is.js`, 'So how do you tell — for this candidate or any other — whether it deserves the foundation role?']
    ];
    let copyMissing = 0;
    for (const [file, text] of COPY) {
      if (!read(file).includes(text)) {
        copyMissing += 1;
        record('static-copy', `verbatim: ${text.slice(0, 50)}…`, false, `missing in ${file}`);
      }
    }
    record('static-copy', `all ${COPY.length} on-screen strings verbatim`, copyMissing === 0,
      `${COPY.length - copyMissing}/${COPY.length}`);
    // The replaced strings are gone, not merely joined.
    const RETIRED = [
      [`${S3_DIR}/02-the-functions-separate.js`, 'dollars and bricks'],
      [`${S3_DIR}/03-the-order-of-monetization.js`, 'Every monetary good must win it first'],
      [`${S3_DIR}/05-the-palladium-test.js`, 'PRICE OF ONE OUNCE · 1990–2026']
    ];
    const stillThere = RETIRED.filter(([f, t]) => read(f).includes(t)).map(([, t]) => t);
    record('static-copy', 'the replaced on-screen strings are gone', stillThere.length === 0,
      stillThere.join(' | '));

    // 6.4 Constitution gates.
    const newSources = allNew.map((f) => [f, read(f)]);
    const banned = /engineered|purpose-built|repurposed|designed as a solution/i;
    const bannedHits = newSources.filter(([, t]) => banned.test(t)).map(([f]) => f);
    record('static-gates', 'banned terms: zero in Section 3 sources', bannedHits.length === 0, bannedHits.join(','));

    // The claim-count gate (§E.3): "claim" appears in Section 3 only within
    // slide 06 — no other slide, no component, not the CSS region — and the
    // count is recorded so the revision cannot leak the word silently.
    const claimHits = [];
    for (const [f, t] of newSources) {
      const n = (t.match(/claim/gi) || []).length;
      if (n && !f.endsWith('06-what-your-money-is.js')) claimHits.push(`${f}:${n}`);
    }
    if (/claim/i.test(s3Css)) claimHits.push('slides.css(S3 region)');
    record('static-gates', '"claim" only within slide 06', claimHits.length === 0, claimHits.join(','));
    const src06 = read(`${S3_DIR}/06-what-your-money-is.js`);
    const claim06 = (src06.match(/claim/gi) || []).length;
    const notes06 = (src06.match(/notes: `([\s\S]*?)`\n};/) || [])[1] || '';
    const claimNotes = (notes06.match(/claim/gi) || []).length;
    const claimCopy = ['a claim on your deposit.', 'a claim on base money.',
      'More claims than base. That is what a bank run runs on.']
      .reduce((n, s) => n + (s.match(/claim/gi) || []).length, 0);
    const claimComments = claim06 - claimNotes - claimCopy;
    record('static-gates',
      `slide 06 carries the rung: ${claim06} occurrences = ${claimCopy} on-screen copy + ${claimNotes} script + ${claimComments} comment`,
      claim06 === 12 && claimCopy === 3 && claimNotes === 7 && claimComments === 2,
      `total=${claim06} copy=${claimCopy} script=${claimNotes} comment=${claimComments}`);

    // R7 territory stays out.
    const r7 = /falsifiab|displac|beaten or captured/i;
    const r7Hits = newSources.filter(([, t]) => r7.test(t)).map(([f]) => f);
    record('static-gates', 'falsifiability/displacement content absent', r7Hits.length === 0, r7Hits.join(','));

    // The color arc: accent only at the ignitions and the two foundation
    // emphases. R3.1 adds no accent — the thresholds light in warm white and
    // the tower's orange is still the base slab's, under data-foundation.
    const blocks = s3Css.split('}');
    const accentBlocks = blocks.filter((b) => /(--accent|247,\s*147,\s*26)/.test(b));
    const allowed = /(data-state="active"|data-state="foundation"|data-foundation="true"|data-live="true"|wayline-ignite)/;
    const badAccent = accentBlocks.filter((b) => !allowed.test(b));
    record('static-gates', 'color arc: accent only at ignition + foundations (CSS)',
      badAccent.length === 0, badAccent.map((b) => b.trim().slice(0, 80)).join(' | '));
    // Exactly three things on stage may carry orange in Section 3: the
    // waypoint ignition dot, the ladder's foundation marker, the tower's
    // base slab. R3.1 introduces no fourth.
    const accentSelectors = accentBlocks.map((b) => b.split('{')[0].trim().replace(/\s+/g, ' '));
    const wantedAccent = ['wayline__dot', 's3f-ladder__dot', 's3f-tower__slab'];
    record('static-gates', 'color arc: exactly three accent-bearing rules — ignition dot, ladder foundation, tower base',
      accentBlocks.length === 3 &&
      wantedAccent.every((k, i) => accentSelectors[i] && accentSelectors[i].includes(k)),
      `${accentBlocks.length}: ${accentSelectors.join(' | ')}`);
    const jsAccent = newSources.filter(([, t]) => /#F7931A|247,\s*147,\s*26|--accent/i.test(t)).map(([f]) => f);
    record('static-gates', 'no accent in Section 3 JS', jsAccent.length === 0, jsAccent.join(','));
    // The threshold ticks are warm white, never the accent.
    const tickBlock = s3Css.split('}').find((b) => /s3f-ladder__gate\[data-mark="bright"\]/.test(b)) || '';
    record('static-gates', 'threshold bright = warm white, not orange',
      /--unit-warm-bright/.test(tickBlock) && !/247,\s*147,\s*26/.test(tickBlock), tickBlock.trim().slice(0, 90));

    // American English in the new sources.
    const british = /\b(colour|behaviour|monetis|labour|judgement|jewellery|centre|defence|analyse|organis|programme|recognis|realis)\w*/i;
    const brHits = [];
    for (const [f, t] of newSources) if (british.test(t)) brHits.push(`${f}:${t.match(british)[0]}`);
    if (british.test(s3Css)) brHits.push('slides.css(S3)');
    record('static-gates', 'American English: zero British spellings', brHits.length === 0, brHits.join(','));

    // Typographic apostrophes.
    const ascii = /[A-Za-z]'[A-Za-z]/;
    const asciiHits = [];
    for (const [f, t] of newSources) if (ascii.test(t)) asciiHits.push(f);
    if (ascii.test(s3Css)) asciiHits.push('slides.css(S3)');
    record('static-gates', 'typographic apostrophes throughout', asciiHits.length === 0, asciiHits.join(','));

    // Scene groups: declared on exactly 3-03 and 3-04.
    const groupDecls = newSources.filter(([, t]) => /sceneGroup:/.test(t)).map(([f]) => path.basename(f));
    record('static-gates', 'stage-ladder group on exactly 03 + 04',
      groupDecls.length === 2 && groupDecls.includes('03-the-order-of-monetization.js') &&
      groupDecls.includes('04-stage-signatures.js'), groupDecls.join(','));

    // Section 4/5 untouched since the R2 merge; Sections 1–2 untouched
    // except the sanctioned glyphs.js selection file.
    const changed = execSync('git diff --name-only 20cca0d HEAD', { cwd: REPO }).toString().trim().split(/\r?\n/);
    const dirty = execSync('git status --porcelain', { cwd: REPO }).toString().trim()
      .split(/\r?\n/).filter(Boolean).map((l) => l.slice(3));
    const allTouched = [...new Set([...changed, ...dirty])];
    const s4Touched = allTouched.filter((f) => f.includes('section-4') || f.includes('section-5'));
    record('static-gates', 'Section 4/5 files untouched (git, incl. working tree)',
      s4Touched.length === 0, s4Touched.join(','));
    // The R3-era "Sections 1–2 untouched" invariant is retired here: R4
    // rebuilt the Section 2 chart and R4.1 applied authorized copy rulings
    // across Sections 1–2, both by mandate. Cycle scope is now owned by
    // review/rebuild-r4/harness-r4/gates-r4.cjs, which asserts the exact file
    // list either cycle was allowed to touch — a stricter check than this one
    // ever was. What this suite still owns is Section 3's own integrity.
    record('static-gates', 'cycle scope now gated by harness-r4/gates-r4.cjs (see note above)',
      fs.existsSync(path.join(REPO, 'review/rebuild-r4/harness-r4/gates-r4.cjs')), '');

    // 6.5 PROVISIONAL + SOURCES.
    // R4 replaced the provisional figures with sourced ones, so the flag that
    // R3.1 required is now required to be *absent*. Same discipline, opposite
    // sign — the chart must never sit between the two states.
    const pd = read(`${S3_DIR}/05-the-palladium-test.js`);
    record('static-sources', 'palladium chart carries no PROVISIONAL flag (R4: figures are sourced)',
      !/PROVISIONAL/i.test(pd), '');
    record('static-sources', 'palladium chart cites its SOURCES entries',
      /WIM-PD-001/.test(pd) && /WIM-PD-002/.test(pd), '');
    const sources = read('docs/SOURCES.md');
    // WIM-PD-003 is new at R3.1: the second-epoch line makes an on-screen
    // factual claim about official reserves, so it gets its own entry.
    for (const wim of ['WIM-PD-001', 'WIM-PD-002', 'WIM-PD-003', 'WIM-AR-001', 'WIM-BTC-001']) {
      record('static-sources', `${wim} entry present`, sources.includes(wim), '');
    }
    record('static-sources', 'no palladium stub is still marked PROVISIONAL (R4: all three resolved)',
      !/WIM-PD-00[123][\s\S]{0,200}\*\*Status: PROVISIONAL/.test(sources), '');
    // Every on-screen string the revision added or changed is accounted for
    // in SOURCES.md where it asserts a fact.
    record('static-sources', 'the second-epoch line is sourced (WIM-PD-003)',
      /WIM-PD-003[\s\S]{0,600}Central banks hold gold/.test(sources), '');
    record('static-sources', 'WIM-AR-001 records the revised saved column',
      /WIM-AR-001[\s\S]{0,400}real estate/.test(sources), '');
    record('static-sources', 'WIM-PD-002 records the retitled panel',
      /WIM-PD-002[\s\S]{0,1200}MODERN ERA/.test(sources), '');
    // The tower's proportions are qualitative — no figure is displayed and
    // the code says so.
    const layersSrc = read('src/components/section-3/LayerDiagram.js');
    record('static-sources', 'tower widths documented as qualitative, not to scale',
      /NOT to scale/.test(layersSrc) && !/\d+\s*(?:x|:)\s*\d+\s*(?:reserve|ratio)/i.test(layersSrc), '');

    // 6.6 Glyph statics: candidates, svgs, selections, contact sheet, doc.
    const NEW_GLYPHS = ['through-time', 'between-people', 'measure', 'collectible',
      'palladium', 'dollar', 'peso', 'brick', 'gate', 'tie'];
    const missingSvg = [];
    for (const n of NEW_GLYPHS) {
      for (const l of ['a', 'b', 'c']) {
        if (!fs.existsSync(path.join(REPO, 'assets/icons/candidates', `${n}-${l}.svg`))) missingSvg.push(`${n}-${l}`);
      }
    }
    record('static-glyphs', '30 new candidate svgs still present', missingSvg.length === 0,
      missingSvg.join(',') || 'all present');
    const glyphsSrc = read('src/components/section-2/glyphs.js');
    const selCount = NEW_GLYPHS.filter((n) =>
      new RegExp(`'?${n}'?:\\s*'[abc]'`).test(glyphsSrc)).length;
    record('static-glyphs', 'SELECTIONS still records all 10 R3 selections', selCount === 10, `${selCount}/10`);
    record('static-glyphs', 'glyphs.js marks gate + tie retired at R3.1',
      /RETIRED AT R3\.1/.test(glyphsSrc), '');
    const sheet = read('review/rebuild-r2/icon-studio/contact-sheet.html');
    const sheetCount = NEW_GLYPHS.filter((n) => sheet.includes(`id="${n}"`)).length;
    record('static-glyphs', 'contact sheet carries the 10 new rows', sheetCount === 10, `${sheetCount}/10`);
    const grammar = read('docs/icon-grammar.md');
    record('static-glyphs', 'grammar doc records the R3 extension',
      grammar.includes('The R3 extension') && NEW_GLYPHS.every((n) => grammar.includes(n)), '');
    // R3.1 §B1: the legibility rule is written down, and the retirement with it.
    record('static-glyphs', 'grammar doc carries the R3.1 legibility rule',
      /any mark whose meaning a viewer cannot infer without a legend fails the grammar/i.test(grammar) &&
      /Retired from the deck at R3\.1/.test(grammar), '');
    // Placements: eight of the ten ship; gate and tie are off every surface.
    const ladderSrc = read('src/components/section-3/StageLadder.js');
    const sepSrc = read(`${S3_DIR}/02-the-functions-separate.js`);
    const fnSrc = read(`${S3_DIR}/01-the-three-functions.js`);
    const palSrc = read(`${S3_DIR}/05-the-palladium-test.js`);
    record('static-glyphs', 'function/stage glyphs placed (ladder + functions row)',
      /'through-time'/.test(ladderSrc + fnSrc) && /'between-people'/.test(ladderSrc + fnSrc) &&
      /measure/.test(ladderSrc + fnSrc) && /collectible/.test(ladderSrc), '');
    record('static-glyphs', 'argentina triad placed (dollar, peso, brick)',
      /'dollar'/.test(sepSrc) && /'peso'/.test(sepSrc) && /'brick'/.test(sepSrc), '');
    record('static-glyphs', 'palladium mark placed', /'palladium'/.test(palSrc), '');
    const retiredPlacements = newSources
      .filter(([, t]) => /glyph\(\s*'(gate|tie)'/.test(t)).map(([f]) => f);
    record('static-glyphs', 'gate + tie glyphs on no surface (R3.1 retirement)',
      retiredPlacements.length === 0, retiredPlacements.join(','));
    record('static-glyphs', 'the tower imports no glyph at all',
      !/glyphs\.js/.test(layersSrc), '');
  }

  const failures = results.filter((r) => !r.ok);
  const summary = {
    variant: REDUCED ? 'reduced-motion' : 'standard',
    revision: 'R3.1',
    date: new Date().toISOString(),
    checks: results.length,
    failures: failures.length,
    screenshots: shotCount,
    consoleLines: consoleLines.length,
    results
  };
  const partSuffix = PART === 'all' ? '' : `-${PART}`;
  const outName = (REDUCED ? 'verification-results-r3-1-rm' : 'verification-results-r3-1') + partSuffix + '.json';
  fs.writeFileSync(path.join(OUT, outName), JSON.stringify(summary, null, 2));
  fs.appendFileSync(path.join(OUT, 'console-log-r3-1.txt'),
    `--- ${summary.variant}${partSuffix} ${summary.date} ---\n${consoleLines.join('\n')}\n`);
  console.log(`${summary.variant}${partSuffix}: ${results.length} checks, ${failures.length} failures, console lines: ${consoleLines.length}`);
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
