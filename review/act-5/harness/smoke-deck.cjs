// Act V states — the closing boot smoke (FAST scope: "the boot smoke", as the
// Act IV states session ran it).
//
// One claim, made checkable in the deck: after this session's one deck change
// (Scene 23's fit ruling at the source) the spliced 32-slide deck still boots
// clean, Scene 23 direct-enters at its last build, and the eight legacy Act V
// slides — the sources the sheet mounts — still run forward through every
// build to the close with no console error. Nothing here is a landed-state
// proof (that is review/act-5/landed-proof-s23-band.json) and nothing here is
// a deck-wide traversal (the GATE's).
//
// Usage: node smoke-deck.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;

const EXPECTED_SLIDES = 32;
const ACT_V = [
  ['4-17-store-of-value-function-migrates', 3],
  ['4-18-monetary-premium', 3],
  ['4-19-other-assets-do-moneys-job', 5],
  ['4-20-bitcoin-does-not-replace-everything', 7],
  ['4-21-marginal-store-of-value-decision', 2],
  ['4-22-fixed-supply-reprices-at-margin', 3],
  ['4-23-investment-case-from-first-principles', 2],
  ['5-01-thank-you', 2]
];

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  console.log(`${ok ? '  ok  ' : 'FAIL  '}${name}${detail ? ` :: ${detail}` : ''}`);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  const settled = () => page.waitForFunction(() => window.__deck && !window.__deck.transitioning, null, { timeout: 30000 });

  // ---- boot ------------------------------------------------------------------
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await settled();
  const deck = await page.evaluate(() => ({
    slides: window.__deck.slides.length,
    ids: window.__deck.slides.map((s) => s.id),
    index: window.__deck.index
  }));
  check(`BOOT: the deck boots at slide 0 with ${EXPECTED_SLIDES} slides`, deck.slides === EXPECTED_SLIDES && deck.index === 0, `${deck.slides} slides`);
  const actVIdx = ACT_V.map(([id]) => deck.ids.indexOf(id));
  check('BOOT: the eight Act V sources follow Act IV directly and in order, the close last',
    actVIdx.every((i, k) => i >= 0 && (k === 0 || i === actVIdx[k - 1] + 1)) && actVIdx[7] === deck.slides - 1 && deck.ids[actVIdx[0] - 1] === 'the-comparison',
    `${deck.ids[actVIdx[0] - 1]} → ${ACT_V.map(([id]) => id).join(' → ')}`);

  // ---- Scene 23 direct entry at its last build ---------------------------------
  // The engine gives the URL precedence over sessionStorage, and sessionStorage
  // supplies the build step — so enter through ?slide= and store the build.
  const s23 = deck.ids.indexOf('the-comparison');
  await page.goto(`${BASE}/?slide=the-comparison`, { waitUntil: 'networkidle' });
  await settled();
  await page.evaluate(([i]) => { sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: 5 })); }, [s23]);
  await page.reload({ waitUntil: 'networkidle' });
  await settled();
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== 'running' && a.playState !== 'pending'), null, { timeout: 30000 });
  const at = await page.evaluate(() => ({ i: window.__deck.index, b: window.__deck.buildStep,
    band: document.querySelectorAll('.s4-comparison__band .df[data-pending="false"]').length,
    rows: document.querySelectorAll('.s4-comparison-table__row').length,
    pitch: Math.round(document.querySelector('.s4-comparison-table__row')?.getBoundingClientRect().height || 0),
    scores: document.querySelectorAll('.s4-dot-rating[data-revealed="true"]').length,
    line: document.querySelectorAll('.s4-comparison__final[data-visible="true"]').length }));
  check('S23: direct entry at the closing line — the band’s five renders, ten rows at 60, fifty scores, the line',
    at.i === s23 && at.b === 5 && at.band === 5 && at.rows === 10 && at.pitch === 60 && at.scores === 50 && at.line === 1,
    `${at.i}:${at.b} · band ${at.band} · rows ${at.rows} × ${at.pitch} · scores ${at.scores} · line ${at.line}`);

  // ---- the Act V sources forward through every build ----------------------------
  await page.evaluate(([i]) => { sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: 0 })); }, [actVIdx[0]]);
  await page.goto(`${BASE}/?slide=${ACT_V[0][0]}`, { waitUntil: 'networkidle' });
  await settled();
  const walk = [];
  let bad = 0;
  for (const [id, builds] of ACT_V) {
    for (let b = 0; b <= builds; b += 1) {
      const st = await page.evaluate(() => ({ id: window.__deck.slides[window.__deck.index].id, b: window.__deck.buildStep }));
      walk.push(`${st.id}:${st.b}`);
      if (st.id !== id || st.b !== b) bad += 1;
      const last = id === ACT_V[7][0] && b === builds;
      if (!last) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(80);
        await settled();
        await page.waitForTimeout(120);
      }
    }
  }
  const expectedStates = ACT_V.reduce((n, [, b]) => n + b + 1, 0);
  check(`ACT V: the eight sources walk forward through every build — ${expectedStates} states, exact — to Thank you.`,
    bad === 0 && walk.length === expectedStates && walk[walk.length - 1] === '5-01-thank-you:2', `${walk.length} states · ${bad} off`);
  const thanks = await page.evaluate(() => document.querySelectorAll('.s5c__thanks[data-visible="true"]').length);
  check('ACT V: the close stands on “Thank you.”', thanks === 1);

  check('CONSOLE: 0 errors across the boot, the direct entry and the walk', errors.length === 0, `${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));

  fs.writeFileSync(path.join(__dirname, '..', 'smoke-deck.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-5-states',
    pass: results.every((r) => r.ok),
    deck: { slides: deck.slides, actV: ACT_V.map(([id]) => id) },
    s23DirectEntry: at,
    walk,
    checks: results.length,
    failures: results.filter((r) => !r.ok).length,
    results,
    consoleErrors: errors
  }, null, 2));
  console.log(`\n${results.filter((r) => r.ok).length}/${results.length} smoke checks green`);
  await browser.close();
  process.exit(results.some((r) => !r.ok) ? 1 : 0);
})();
