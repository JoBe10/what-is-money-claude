// R2 verification suite (rebuild brief §4.1–§4.3, §4.8).
// Usage: node verify.js [--rm]   (--rm runs the reduced-motion variant)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { probeInPage, CAMERA } = require('./probes.cjs');

const BASE = 'http://localhost:4310';
const OUT = path.join(__dirname, '..');
const SHOTS = path.join(OUT, 'screenshots');
const REDUCED = process.argv.includes('--rm');
// --part traversal | direct — run one half (both halves merge into the same
// results file via the suffix).
const PART = (process.argv.find((a) => a.startsWith('--part')) || '--part=all').split('=')[1];

const S2 = [
  ['2-00-waypoint-origin', 1, 6],
  ['2-01-the-world-without-it', 3, 7],
  ['2-02-the-discovery', 4, 8],
  ['2-03-the-convergence', 3, 9],
  ['2-04-the-competition', 5, 10],
  ['2-05-the-rail-rises', 3, 11],
  ['2-06-two-survivors', 5, 12],
  ['2-07-the-abstraction-ladder', 4, 13],
  ['2-08-the-severance', 4, 14],
  ['2-09-the-pattern', 6, 15]
];

// Settle time after a live advance into build b of slide id.
function settleMs(id, b) {
  if (REDUCED) return 500;
  if (id === '2-00-waypoint-origin' && b === 1) return 3300; // 2.2s ignition bloom
  if (id === '2-03-the-convergence' && b === 2) return 6600;
  if (id === '2-03-the-convergence') return 2000;
  if (id === '2-01-the-world-without-it' && b === 2) return 4400;
  if (id === '2-01-the-world-without-it' && b === 1) return 2900;
  if (id === '2-02-the-discovery' && b === 1) return 3000; // travel + hold ring delay
  if (id === '2-02-the-discovery' && b === 2) return 2500;
  if (id === '2-06-two-survivors' && b >= 2) return 3100;
  if (id === '2-05-the-rail-rises' || id === '2-09-the-pattern') return 2300;
  if (id === '2-08-the-severance') return 2400;
  if (id === '2-07-the-abstraction-ladder') return 1400;
  return 1300;
}

// Extra settle after ENTERING a Section 2 slide fresh (build-0 entry
// gestures: the waypoint device fade, the contender stagger).
function entryMs(id) {
  if (REDUCED) return 300;
  if (id === '2-00-waypoint-origin') return 2500;
  if (id === '2-04-the-competition') return 1600;
  return 500;
}

const results = [];
const consoleLines = [];
let shotCount = 0;

function record(section, name, ok, detail) {
  results.push({ section, name, ok, detail });
  if (!ok) console.log(`FAIL ${section} :: ${name} :: ${detail}`);
}

(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    reducedMotion: REDUCED ? 'reduce' : 'no-preference'
  });
  const page = await context.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') {
      consoleLines.push(`[${m.type()}] ${m.text()}`);
    }
  });
  page.on('pageerror', (e) => consoleLines.push(`[pageerror] ${e.message}`));

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

  const probe = (id, build) =>
    page.evaluate(probeInPage, { id, build, camera: CAMERA });

  // ---------- 1. Full deck traversal: forward / back / forward ----------
  if (PART === 'traversal' || PART === 'all') {
  await page.goto(`${BASE}/?slide=1`, { waitUntil: 'networkidle' });
  await page.evaluate(() => sessionStorage.clear());
  await page.waitForTimeout(1500);

  let s = await state();
  const TOTAL = s.total;
  let traversalOk = true;
  let steps = 0;
  // Forward through every build of every slide.
  while (!(s.idx === TOTAL - 1)) {
    const before = s;
    await page.keyboard.press('ArrowRight');
    steps += 1;
    const isS2 = before.id.startsWith('2-');
    const nextBuild = before.build + 1;
    await page.waitForTimeout(isS2 ? settleMs(before.id, nextBuild) : 700);
    s = await state();
    if (s.containers !== 1 || s.active !== 1 || s.empty || s.imagesBroken) {
      // Large first-load images may still be decoding — allow one settle.
      await page.waitForTimeout(1800);
      s = await state();
    }
    if (s.containers !== 1 || s.active !== 1 || s.empty || s.imagesBroken) {
      traversalOk = false;
      record('traversal', `forward step ${steps} at ${s.id} b${s.build}`,
        false, JSON.stringify(s));
    }
    // Probe every Section 2 build state as we pass it, and screenshot.
    if (s.id.startsWith('2-') && !REDUCED) {
      if (s.id !== before.id) await page.waitForTimeout(entryMs(s.id));
      const r = await probe(s.id, s.build);
      record('traversal-probe', `${s.id} b${s.build}`, r.ok, r.detail);
      await page.screenshot({
        path: path.join(SHOTS, 'traversal', `${String(steps).padStart(3, '0')}-${s.id}-b${s.build}.png`)
      });
      shotCount += 1;
    }
    if (steps > 400) { record('traversal', 'runaway', false, 'too many steps'); break; }
  }
  record('traversal', 'forward pass complete', traversalOk && s.idx === TOTAL - 1,
    `${steps} steps to ${s.id}, ${TOTAL} slides`);

  // The seam: enter legacy Section 3 opener from 2-09 was crossed above;
  // verify it again explicitly.
  await page.goto(`${BASE}/?slide=2-09-the-pattern`, { waitUntil: 'networkidle' });
  await page.evaluate(() => sessionStorage.clear());
  await page.waitForTimeout(1200);
  for (let b = 0; b < 7; b += 1) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(REDUCED ? 350 : 900); }
  await page.waitForTimeout(1500);
  s = await state();
  record('traversal', 'seam 2-09 → legacy 3-01', s.id === '3-01-section-opener' && s.imagesBroken === 0 && !s.empty,
    JSON.stringify({ id: s.id, imagesBroken: s.imagesBroken }));
  if (!REDUCED) {
    await page.screenshot({ path: path.join(SHOTS, 'seam-2-09-to-3-01.png') });
  }

  // Backward all the way to slide 1 build 0.
  let backSteps = 0;
  s = await state();
  while (!(s.idx === 0 && s.build === 0) && backSteps < 500) {
    await page.keyboard.press('ArrowLeft');
    backSteps += 1;
    await page.waitForTimeout(s.id && s.id.startsWith('2-') ? 420 : 380);
    s = await state();
    if (s.containers !== 1 || s.active !== 1 || s.empty) {
      record('traversal', `backward step ${backSteps} at ${s.id} b${s.build}`, false, JSON.stringify(s));
    }
  }
  record('traversal', 'backward pass reaches 1.1 b0', s.idx === 0 && s.build === 0, `${backSteps} steps`);

  // Fast re-forward through Section 1 + 2 (exercises animation cancellation).
  let fwd = 0;
  while (s.idx < 15 && fwd < 80) {
    await page.keyboard.press('ArrowRight');
    fwd += 1;
    await page.waitForTimeout(140);
    s = await state();
  }
  await page.waitForTimeout(2500);
  s = await state();
  const fastOk = s.containers === 1 && s.active === 1 && !s.empty;
  record('traversal', 'fast re-forward through Sections 1–2', fastOk, JSON.stringify({ id: s.id, containers: s.containers }));
  }

  if (PART === 'direct' || PART === 'all') {
  // ---------- 2. Direct entry at every build (+ screenshots) ----------
  for (const [id, builds, slideNo] of S2) {
    for (let b = 0; b <= builds; b += 1) {
      await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
      await page.evaluate(({ n, k }) => {
        sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
      }, { n: slideNo, k: b });
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForTimeout(id === '2-03-the-convergence' ? 2600 : 1900);
      const st = await state();
      const stOk = st.id === id && st.build === b;
      const r = stOk ? await probe(id, b) : { ok: false, detail: `landed ${st.id} b${st.build}` };
      record(REDUCED ? 'rm-direct-entry' : 'direct-entry', `${id} b${b}`, r.ok, r.detail);
      if (!REDUCED) {
        await page.screenshot({ path: path.join(SHOTS, `${id}-b${b}.png`) });
        shotCount += 1;
      }
    }
  }

  // Named frames (§4.8): the first-orange ignition and the full-rail pull-back.
  if (!REDUCED) {
    await page.goto(`${BASE}/?slide=2-00-waypoint-origin`, { waitUntil: 'networkidle' });
    await page.evaluate(() => sessionStorage.clear());
    await page.waitForTimeout(2300);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(3200);
    await page.screenshot({ path: path.join(SHOTS, 'first-orange-waypoint-ignition.png') });
    const ig = await probe('2-00-waypoint-origin', 1);
    record('named-frames', 'first-orange ignition (live)', ig.ok, ig.detail);

    await page.goto(`${BASE}/?slide=2-09-the-pattern`, { waitUntil: 'networkidle' });
    await page.evaluate(() => sessionStorage.clear());
    await page.waitForTimeout(1400);
    await page.keyboard.press('ArrowRight'); // live pull-back
    await page.waitForTimeout(2600);
    await page.screenshot({ path: path.join(SHOTS, 'full-rail-pull-back.png') });
    const pb = await probe('2-09-the-pattern', 1);
    record('named-frames', 'full-rail pull-back (live)', pb.ok, pb.detail);
  }

  // ---------- 3. Refresh mid-animation (03, 06, 08) ----------
  const midCases = [
    ['2-03-the-convergence', 9, 2, 1800],  // mid-convergence
    ['2-06-two-survivors', 12, 3, 700],    // mid corrosion wave
    ['2-08-the-severance', 14, 2, 500]     // mid cut
  ];
  for (const [id, slideNo, targetBuild, midWait] of midCases) {
    await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => sessionStorage.clear());
    await page.waitForTimeout(1500);
    for (let b = 1; b <= targetBuild; b += 1) {
      await page.keyboard.press('ArrowRight');
      if (b < targetBuild) await page.waitForTimeout(REDUCED ? 400 : settleMs(id, b));
    }
    await page.waitForTimeout(midWait); // stop mid-gesture
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(id === '2-03-the-convergence' ? 2600 : 1900);
    const st = await state();
    const ok = st.id === id && st.build === targetBuild;
    const r = ok ? await probe(id, targetBuild) : { ok: false, detail: `landed ${st.id} b${st.build}` };
    record(REDUCED ? 'rm-mid-refresh' : 'mid-animation-refresh', `${id} b${targetBuild}`, r.ok, r.detail);
  }
  }

  // ---------- 4. Reduced-motion live advance settle check ----------
  if (REDUCED && (PART === 'direct' || PART === 'all')) {
    for (const [id, builds] of S2) {
      await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => sessionStorage.clear());
      await page.waitForTimeout(900);
      for (let b = 1; b <= builds; b += 1) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(420); // must be fully settled inside this
        const r = await probe(id, b);
        record('rm-live-advance', `${id} b${b} settled ≤420ms`, r.ok, r.detail);
      }
    }
  }

  const failures = results.filter((r) => !r.ok);
  const summary = {
    variant: REDUCED ? 'reduced-motion' : 'standard',
    date: new Date().toISOString(),
    checks: results.length,
    failures: failures.length,
    screenshots: shotCount,
    consoleLines: consoleLines.length,
    results
  };
  const partSuffix = PART === 'all' ? '' : `-${PART}`;
  const outName = (REDUCED ? 'verification-results-rm' : 'verification-results') + partSuffix + '.json';
  fs.writeFileSync(path.join(OUT, outName), JSON.stringify(summary, null, 2));
  fs.appendFileSync(path.join(OUT, 'console-log.txt'),
    `--- ${summary.variant} ${summary.date} ---\n${consoleLines.join('\n')}\n`);
  console.log(`${summary.variant}: ${results.length} checks, ${failures.length} failures, console lines: ${consoleLines.length}`);
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
