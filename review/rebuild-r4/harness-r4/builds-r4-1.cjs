// R4.1 build integration — ruling R-03 added a sixth build to slide 2.5,
// inside the `evolution-rail` scene group. A new build in a group slide is
// the one change that can desynchronize a handoff, so this checks the wave
// states themselves, the group boundaries in both directions, and the
// reduced-motion landing.
//
// The elimination waves are asserted by counting lit cells per fate, which is
// what the argument actually claims: chemistry leaves the noble family
// (8 cells), and the furnace leaves two.
//
// Usage: node builds-r4-1.cjs [--rm]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4311';
const OUT = path.join(__dirname, '..');
const REDUCED = process.argv.includes('--rm');

// Slide 2.5 is 1-based slide 10. Expected lit cells after each build, by fate.
// g = gas, r = reactive, x = radioactive, i = will not hold a shape,
// n = noble but unmeltable, s = survivor.
const WAVES = [
  { build: 0, table: false },
  { build: 1, table: true, lit: ['g', 'r', 'x', 'i', 'n', 's'] },
  { build: 2, table: true, lit: ['r', 'x', 'i', 'n', 's'], line: 'Anything that floats away is out.' },
  { build: 3, table: true, lit: ['x', 'i', 'n', 's'], line: 'Anything that rusts, burns, or dissolves is out.' },
  { build: 4, table: true, lit: ['i', 'n', 's'], line: 'Anything that kills the holder is out.' },
  { build: 5, table: true, lit: ['n', 's'], line: 'Anything that will not hold a shape is out.' },
  { build: 6, table: true, lit: ['s'], verdict: 'Workable nobility leaves two.' }
];

const results = [];
function record(name, ok, detail) {
  results.push({ name, ok, detail: detail || '' });
  if (!ok) console.log(`FAIL ${name} :: ${detail}`);
}

const probe = () => ({
  step: document.querySelector('.s2o-elements')?.dataset.step ?? null,
  tableVisible: document.querySelector('.s2o-survivors__grid')?.dataset.visible === 'true',
  litByFate: Array.from(document.querySelectorAll('.s2o-elements__cell'))
    .filter((c) => c.dataset.state !== 'out')
    .reduce((acc, c) => { acc[c.dataset.fate] = (acc[c.dataset.fate] || 0) + 1; return acc; }, {}),
  alone: Array.from(document.querySelectorAll('.s2o-elements__cell'))
    .filter((c) => c.dataset.state === 'alone').map((c) => c.textContent).sort(),
  waveLine: Array.from(document.querySelectorAll('.s2o-survivors__waveline'))
    .filter((l) => l.dataset.visible === 'true').map((l) => l.textContent)[0] || null,
  verdict: document.querySelector('.s2o-survivors__verdict')?.dataset.visible === 'true'
    ? document.querySelector('.s2o-survivors__verdict').textContent : null
});

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    reducedMotion: REDUCED ? 'reduce' : 'no-preference'
  });
  const page = await context.newPage();
  const consoleLines = [];
  page.on('console', (m) => {
    if ((m.type() === 'error' || m.type() === 'warning') && !m.text().startsWith('[vite]')) {
      consoleLines.push(`[${m.type()}] ${m.text()}`);
    }
  });
  page.on('pageerror', (e) => consoleLines.push(`[pageerror] ${e.message}`));

  const ready = () => page.waitForFunction(() => window.__deck, null, { timeout: 25000 });
  const state = () => page.evaluate(() => ({
    id: window.__deck.slides[window.__deck.index].id,
    build: window.__deck.buildStep,
    containers: document.querySelectorAll('.deck-slide').length
  }));
  const enter = async (id, no, build) => {
    await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(({ n, k }) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
    }, { n: no, k: build });
    await page.reload({ waitUntil: 'networkidle' });
    await ready();
  };

  // ---- 1. Direct entry at every build: the waves resolve exactly ----
  for (const w of WAVES) {
    await enter('2-05-two-survivors', 10, w.build);
    await page.waitForTimeout(REDUCED ? 700 : 2400);
    const st = await state();
    const p = await page.evaluate(probe);
    const issues = [];
    if (st.id !== '2-05-two-survivors' || st.build !== w.build) issues.push(`landed ${st.id} b${st.build}`);
    if (p.tableVisible !== Boolean(w.table)) issues.push(`table visible=${p.tableVisible}`);
    if (w.table) {
      const litFates = Object.keys(p.litByFate).sort().join(',');
      const wantFates = [...w.lit].sort().join(',');
      if (litFates !== wantFates) issues.push(`lit fates ${litFates} want ${wantFates}`);
    }
    if (w.build >= 5 && p.litByFate.n !== (w.build === 5 ? 6 : undefined)) {
      if (w.build === 5 && p.litByFate.n !== 6) issues.push(`platinum group lit=${p.litByFate.n} want 6`);
    }
    if (w.build === 6 && p.alone.join(',') !== 'Ag,Au') issues.push(`alone=${p.alone.join(',')}`);
    if (w.line && p.waveLine !== w.line) issues.push(`wave line "${p.waveLine}"`);
    if (w.verdict && p.verdict !== w.verdict) issues.push(`verdict "${p.verdict}"`);
    if (!w.verdict && p.verdict) issues.push(`verdict shown early: "${p.verdict}"`);
    record(`2-05 b${w.build} exact`, issues.length === 0,
      issues.join('; ') || JSON.stringify({ lit: p.litByFate, alone: p.alone }));
  }

  // ---- 2. The noble family is genuinely on stage at build 5 ----
  await enter('2-05-two-survivors', 10, 5);
  await page.waitForTimeout(REDUCED ? 700 : 2400);
  {
    const p = await page.evaluate(probe);
    const lit = Object.entries(p.litByFate).reduce((a, [, n]) => a + n, 0);
    record('R-03: chemistry leaves the noble family — 8 cells lit at b5', lit === 8,
      `${lit} lit: ${JSON.stringify(p.litByFate)}`);
  }
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(REDUCED ? 500 : 2400);
  {
    const p = await page.evaluate(probe);
    const lit = Object.entries(p.litByFate).reduce((a, [, n]) => a + n, 0);
    record('R-03: the furnace leaves two — 2 cells lit at b6, live', lit === 2 && p.alone.join(',') === 'Ag,Au',
      `${lit} lit, alone=${p.alone.join(',')}`);
  }

  // ---- 3. The scene-group boundaries still hand off ----
  await enter('2-05-two-survivors', 10, 6);
  await page.waitForTimeout(REDUCED ? 600 : 1800);
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(REDUCED ? 500 : 1800);
  {
    const st = await state();
    record('forward handoff 2-05 b6 → 2-06 b0',
      st.id === '2-06-the-abstraction-ladder' && st.build === 0 && st.containers === 1,
      `${st.id} b${st.build} containers=${st.containers}`);
  }
  await enter('2-06-the-abstraction-ladder', 11, 0);
  await page.waitForTimeout(REDUCED ? 600 : 1800);
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(REDUCED ? 500 : 1900);
  {
    const st = await state();
    const p = await page.evaluate(probe);
    record('backward handoff 2-06 b0 → 2-05 b6 (lands the end state, not black)',
      st.id === '2-05-two-survivors' && st.build === 6 && p.alone.join(',') === 'Ag,Au',
      `${st.id} b${st.build} alone=${p.alone.join(',')}`);
  }
  await enter('2-04-the-competition-record', 9, 8);
  await page.waitForTimeout(REDUCED ? 600 : 1800);
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(REDUCED ? 500 : 1900);
  {
    const st = await state();
    record('forward handoff 2-04 b8 → 2-05 b0', st.id === '2-05-two-survivors' && st.build === 0,
      `${st.id} b${st.build}`);
  }

  // ---- 4. Live walk: every build settles, and reduced motion lands fast ----
  await enter('2-05-two-survivors', 10, 0);
  await page.waitForTimeout(REDUCED ? 600 : 1500);
  for (let b = 1; b <= 6; b += 1) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(REDUCED ? 420 : 2400);
    const st = await state();
    const p = await page.evaluate(probe);
    const want = WAVES[b];
    const litFates = Object.keys(p.litByFate).sort().join(',');
    record(`${REDUCED ? 'rm ' : ''}live advance to b${b}`,
      st.build === b && litFates === [...want.lit].sort().join(','),
      `b${st.build} lit ${litFates}`);
  }

  const failures = results.filter((r) => !r.ok);
  const summary = {
    revision: 'R4.1',
    variant: REDUCED ? 'reduced-motion' : 'standard',
    date: new Date().toISOString(),
    checks: results.length,
    failures: failures.length,
    consoleLines: consoleLines.length,
    results
  };
  fs.writeFileSync(
    path.join(OUT, REDUCED ? 'builds-r4-1-results-rm.json' : 'builds-r4-1-results.json'),
    JSON.stringify(summary, null, 2)
  );
  console.log(`\nR4.1 builds ${summary.variant}: ${results.length} checks, ${failures.length} failures, console ${consoleLines.length}`);
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
