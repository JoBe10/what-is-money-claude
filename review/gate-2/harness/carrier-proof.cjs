// Gate 2 r2 — the ClaimMark carrier-centering proof (docs/gate-2-r2-brief.md §1).
//
// PRESENTER-RULED, 27 August 2026: in the ClaimMark's carrier context the disc
// sits centered between the carrier arcs, fully symmetric. The fix lives in
// the component (.s4-claim-object__disc, slides.css); this harness proves it
// mechanically, in DOM geometry, where the defect lived:
//
//   1. The legacy 4.05 (the presenter's marked-up reference): at the SAVE
//      build the disc's center must equal both its claim-stage's center and
//      the carrier shell's center. Before the fix the disc sat 16px low
//      (measured on ref-4-05-b3.png: disc cy 605.5 vs shell cy 589.5).
//   2. The Gate 1 sheet's carrier row: every scale (48 / 116 / 176), every
//      candidate — the mark's center must equal the shell's center. This is
//      the ruling's own acceptance clause ("must hold at every scale").
//
// A capture of the fixed 4.05 SAVE build lands beside the numbers so the
// record shows the frame, not only the arithmetic.
//
// Usage: node carrier-proof.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', 'r2');
fs.mkdirSync(OUT, { recursive: true });

const TOL = 0.75;   // px on the 1920×1080 stage — sub-pixel layout noise only

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  const result = { ruling: 'the disc sits centered between the carrier arcs, fully symmetric', legacy405: [], gate1CarrierRow: [], consoleErrors: errors };
  const centered = (a, b) => Math.abs(a.x - b.x) <= TOL && Math.abs(a.y - b.y) <= TOL;

  // ---- 1 · the legacy 4.05, builds 0 (inherited claim) and 3 (SAVE) ----
  await page.goto(`${BASE}/?slide=4-05-spend-or-save`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 60000 });
  await page.waitForTimeout(900);

  const measure405 = () => page.evaluate(() => {
    const c = (r) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    const stage = document.querySelector('.s4-spend-save__claim-stage');
    const disc = stage.querySelector('.luminous-disc');
    const shell = stage.querySelector('.s4-spend-save__shell');
    return { stage: c(stage.getBoundingClientRect()), disc: c(disc.getBoundingClientRect()), shell: c(shell.getBoundingClientRect()) };
  });

  for (const [build, name] of [[0, 'the claim, inherited and centered'], [3, 'SAVE — the shell around the claim']]) {
    while ((await page.evaluate(() => window.__deck.buildStep)) < build) {
      await page.evaluate(() => window.__deck.advanceStep());
      await page.waitForTimeout(900);
    }
    const m = await measure405();
    const ok = centered(m.disc, m.stage) && centered(m.disc, m.shell);
    result.legacy405.push({ build, name, ...m, centered: ok });
    console.log(`4.05 b${build}  disc (${m.disc.x.toFixed(1)}, ${m.disc.y.toFixed(1)})  shell (${m.shell.x.toFixed(1)}, ${m.shell.y.toFixed(1)})  ${ok ? 'CENTERED' : 'OFF'}`);
    if (build === 3) {
      await page.evaluate(() => window.__deck && window.__deck._hideChrome());
      await page.waitForTimeout(450);
      await page.screenshot({ path: path.join(OUT, 'carrier-fix-4-05-b3.png') });
    }
  }

  // ---- 2 · the Gate 1 sheet's carrier row, every scale ----
  await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(async () => {
    const mod = await import('/review/frames-a/harness/gate1-sheet.mjs');
    mod.buildSheet();
  });
  await page.waitForTimeout(600);
  const rows = await page.evaluate(() => {
    const c = (r) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    return [...document.querySelectorAll('.g1-stage')]
      .filter((st) => st.querySelector('.s4-carrier-shell'))
      .map((st) => {
        const mark = st.querySelector('.claim-mark');
        const shellBox = st.querySelector('.s4-carrier-shell').parentElement;
        const size = mark.querySelector('.luminous-disc')
          ? parseFloat(mark.querySelector('.luminous-disc').style.getPropertyValue('--disc-size'))
          : null;
        return { candidate: mark.dataset.candidate, size, mark: c(mark.getBoundingClientRect()), shell: c(shellBox.getBoundingClientRect()) };
      });
  });
  rows.forEach((r) => {
    const ok = centered(r.mark, r.shell);
    result.gate1CarrierRow.push({ ...r, centered: ok });
    console.log(`gate1 carrier ${r.candidate}${r.size ? ` @${r.size}` : ''}  mark (${r.mark.x.toFixed(1)}, ${r.mark.y.toFixed(1)})  shell (${r.shell.x.toFixed(1)}, ${r.shell.y.toFixed(1)})  ${ok ? 'CENTERED' : 'OFF'}`);
  });

  fs.writeFileSync(path.join(OUT, 'carrier-proof.json'), JSON.stringify(result, null, 2));
  const failed = errors.length
    || result.legacy405.some((m) => !m.centered)
    || result.gate1CarrierRow.length === 0
    || result.gate1CarrierRow.some((m) => !m.centered);
  console.log(`\nconsole errors: ${errors.length}`);
  await browser.close();
  process.exit(failed ? 1 : 0);
})();
