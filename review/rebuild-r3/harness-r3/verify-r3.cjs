// R3 verification suite (session brief §3 Phase C).
// Usage: node verify-r3.cjs [--rm] [--part=traversal|direct|static]
const { chromium } = require('playwright');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { probeInPage, ladderGeometryProbeInPage } = require('./probes-r3.cjs');

const BASE = 'http://localhost:4311';
const OUT = path.join(__dirname, '..');
const SHOTS = path.join(OUT, 'screenshots');
const REPO = path.resolve(__dirname, '../../..');
const REDUCED = process.argv.includes('--rm');
const PART = (process.argv.find((a) => a.startsWith('--part')) || '--part=all').split('=')[1];

// [id, totalBuildSteps, 1-based slide number]
const SLIDES = [
  ['3-00-waypoint-function', 2, 14],
  ['3-01-the-three-functions', 5, 15],
  ['3-02-the-functions-separate', 3, 16],
  ['3-03-the-order-of-monetization', 6, 17],
  ['3-04-stage-signatures', 2, 18],
  ['3-05-the-palladium-test', 4, 19],
  ['3-06-what-your-money-is', 4, 20],
  ['3-07-where-bitcoin-is', 5, 21],
  ['3-08-waypoint-judge', 2, 22]
];
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
  if (id === '3-06-what-your-money-is') return 1400;
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
  const page = await context.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') {
      const t = m.text();
      if (!t.startsWith('[vite]')) consoleLines.push(`[${m.type()}] ${t}`);
    }
  });
  page.on('pageerror', (e) => consoleLines.push(`[pageerror] ${e.message}`));

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

  async function ladderGeometry(section, id, build) {
    if (!LADDER_SLIDES.has(id)) return;
    if (id === '3-07-where-bitcoin-is' && (build === 0 || build === 5)) return;
    if (id === '3-03-the-order-of-monetization' && build === 0) return;
    const g = await geomProbe();
    record(section, `ladder-geometry ${id} b${build}`, g.ok, g.detail);
  }

  async function directEnter(id, slideNo, buildStep) {
    await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
    await ready();
    if (buildStep > 0) {
      await page.evaluate(({ n, k }) => {
        sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
      }, { n: slideNo, k: buildStep });
      await page.reload({ waitUntil: 'networkidle' });
      await ready();
    } else {
      await page.evaluate(() => sessionStorage.clear());
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
        await page.screenshot({
          path: path.join(SHOTS, 'traversal', `${String(steps).padStart(3, '0')}-${s.id}-b${s.build}.png`)
        });
        shotCount += 1;
      }
      // The seam into Section 4: the opener rises over the ignited line.
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

    // Backward all the way (crosses the ladder group in reverse and every
    // authored-black landing).
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

    // The backward ladder handoff: 3-04 b0 ← lands 3-03 at its end state
    // (build 6, foundation re-ignited), never at black build 0.
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

    // Fast re-forward through Sections 2–3 (animation cancellation, rapid
    // handoffs, zero stale overlays).
    await page.goto(`${BASE}/?slide=2-01-the-world-without-it`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(() => sessionStorage.clear());
    await page.waitForTimeout(1200);
    s = await state();
    let fwd = 0;
    while (s.idx < 22 && fwd < 120) {
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
        if (stOk) await ladderGeometry(REDUCED ? 'rm-direct-geometry' : 'direct-geometry', id, b);
        if (!REDUCED) {
          await page.screenshot({ path: path.join(SHOTS, `${id}-b${b}.png`) });
          shotCount += 1;
        }
      }
    }

    // ---------- 3. Refresh mid-animation ----------
    const midCases = [
      ['3-00-waypoint-function', 14, 2, 500],
      ['3-03-the-order-of-monetization', 17, 1, 600],
      ['3-05-the-palladium-test', 19, 2, 800],
      ['3-06-what-your-money-is', 20, 1, 300]
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

    // ---------- 4. Named frames (§C.7), live ----------
    if (!REDUCED) {
      // Both ignitions, live.
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

      // The layer tower taking the foundation emphasis, live.
      await directEnter('3-06-what-your-money-is', 20, 3);
      await page.waitForTimeout(1600);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(1600);
      await page.screenshot({ path: path.join(SHOTS, 'layer-tower-foundation.png') });
      shotCount += 1;
      {
        const r = await probe('3-06-what-your-money-is', 4);
        record('named-frames', 'layer tower foundation emphasis (live)', r.ok, r.detail);
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

      // The seam into Section 4, captured as a sequence from the ignited line.
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
    const read = (p) => fs.readFileSync(path.join(REPO, p), 'utf8');
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
    const pacing = [];
    for (const [id, builds] of SLIDES) {
      const file = allNew.find((f) => f.includes(id.slice(2)));
      const src = read(file);
      const notes = (src.match(/notes: `([\s\S]*?)`\n};/) || [])[1] || '';
      const arrows = (notes.match(/\[→\]/g) || []).length;
      pacing.push({ id, builds, arrows });
      record('static-pacing', `${id}: ${arrows} arrows = ${builds} builds`, arrows === builds, `arrows=${arrows} builds=${builds}`);
    }

    // 6.2 Scripts verbatim against the brief (apostrophe/quote-normalized).
    const brief = read('docs/r3-session-brief.md');
    const down = (t) => t.replace(/’/g, "'").replace(/[“”]/g, '"');
    for (const [id] of SLIDES) {
      const slug = id.slice(2);
      const m = brief.match(new RegExp('### `' + slug + '`[^\\n]*\\n([\\s\\S]*?)(?=\\n### |\\n# )'));
      if (!m) { record('static-verbatim', `${id} script found in brief`, false, 'no block'); continue; }
      const wanted = m[1].split(/\n/).map((l) => l.trim())
        .filter((l) => l.startsWith('[→]')).join('\n\n');
      const src = read(allNew.find((f) => f.includes(slug)));
      const notes = (src.match(/notes: `([\s\S]*?)`\n};/) || [])[1] || '';
      const same = down(notes) === down(wanted);
      record('static-verbatim', `${id} script verbatim (normalized)`, same,
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
      [`${S3_DIR}/02-the-functions-separate.js`, "word: 'dollars and bricks'"],
      [`${S3_DIR}/02-the-functions-separate.js`, 'Argentina, five decades.'],
      [`${S3_DIR}/02-the-functions-separate.js`, 'The functions are separable — across goods, and across time. A good can be money in one function before, or without, the others.'],
      [`${S3_DIR}/03-the-order-of-monetization.js`, 'after Vijay Boyapati.'],
      [`${S3_DIR}/03-the-order-of-monetization.js`, 'Nobody accepts as payment what they don’t expect to hold value.'],
      [`${S3_DIR}/03-the-order-of-monetization.js`, 'Nobody writes contracts in what nobody accepts.'],
      [`${S3_DIR}/03-the-order-of-monetization.js`, 'Store of value is the foundation function. Every monetary good must win it first.'],
      ['src/components/section-3/StageLadder.js', "label: 'COLLECTIBLE'"],
      ['src/components/section-3/StageLadder.js', "label: 'STORE OF VALUE'"],
      ['src/components/section-3/StageLadder.js', "label: 'MEDIUM OF EXCHANGE'"],
      ['src/components/section-3/StageLadder.js', "label: 'UNIT OF ACCOUNT'"],
      ['src/components/section-3/StageLadder.js', 'Early-stage signature: few holders · thin markets · reflexive pricing.'],
      [`${S3_DIR}/04-stage-signatures.js`, 'Volatility and illiquidity are properties of the stage — not verdicts on the good.'],
      [`${S3_DIR}/05-the-palladium-test.js`, 'Palladium: rarer than gold. Genuinely useful. At times more expensive. It never became money.'],
      [`${S3_DIR}/05-the-palladium-test.js`, 'Discovered in 1803 — facing a monetary network thousands of years old.'],
      [`${S3_DIR}/05-the-palladium-test.js`, 'Marginally better is structurally insufficient. Only a categorical difference on the deciding properties has ever moved the crown.'],
      ['src/components/section-3/LayerDiagram.js', "label: 'PAYMENT APPS'"],
      ['src/components/section-3/LayerDiagram.js', "label: 'BANK DEPOSITS'"],
      ['src/components/section-3/LayerDiagram.js', "label: 'BASE MONEY'"],
      [`${S3_DIR}/06-what-your-money-is.js`, 'a claim on your deposit.'],
      [`${S3_DIR}/06-what-your-money-is.js`, 'a claim on base money.'],
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
    record('static-copy', `all ${COPY.length} on-screen strings verbatim`, copyMissing === 0, `${COPY.length - copyMissing}/${COPY.length}`);

    // 6.4 Constitution gates.
    const newSources = allNew.map((f) => [f, read(f)]);
    const banned = /engineered|purpose-built|repurposed|designed as a solution/i;
    const bannedHits = newSources.filter(([, t]) => banned.test(t)).map(([f]) => f);
    record('static-gates', 'banned terms: zero in Section 3 sources', bannedHits.length === 0, bannedHits.join(','));

    // "claim" appears in Section 3 only within slide 06 (its specified copy
    // and script) — no other file, no component, not the CSS region.
    const claimHits = [];
    for (const [f, t] of newSources) {
      const n = (t.match(/claim/gi) || []).length;
      if (n && !f.endsWith('06-what-your-money-is.js')) claimHits.push(`${f}:${n}`);
    }
    if (/claim/i.test(s3Css)) claimHits.push('slides.css(S3 region)');
    record('static-gates', '"claim" only within slide 06', claimHits.length === 0, claimHits.join(','));
    const claim06 = (read(`${S3_DIR}/06-what-your-money-is.js`).match(/claim/gi) || []).length;
    record('static-gates', 'slide 06 carries the rung (occurrences recorded)', claim06 > 0, `${claim06} occurrences in 06`);

    // R7 territory stays out: no falsifiability, no displacement framework.
    const r7 = /falsifiab|displac|beaten or captured/i;
    const r7Hits = newSources.filter(([, t]) => r7.test(t)).map(([f]) => f);
    record('static-gates', 'falsifiability/displacement content absent', r7Hits.length === 0, r7Hits.join(','));

    // The color arc: accent only at the ignition and the two foundation
    // emphases. Parse the S3 CSS region into rule blocks.
    const blocks = s3Css.split('}');
    const accentBlocks = blocks.filter((b) => /(--accent|247,\s*147,\s*26)/.test(b));
    const allowed = /(data-state="active"|data-state="foundation"|data-foundation="true"|data-live="true"|wayline-ignite)/;
    const badAccent = accentBlocks.filter((b) => !allowed.test(b));
    record('static-gates', 'color arc: accent only at ignition + foundations (CSS)',
      badAccent.length === 0, badAccent.map((b) => b.trim().slice(0, 80)).join(' | '));
    const jsAccent = newSources.filter(([, t]) => /#F7931A|247,\s*147,\s*26|--accent/i.test(t)).map(([f]) => f);
    record('static-gates', 'no accent in Section 3 JS', jsAccent.length === 0, jsAccent.join(','));

    // American English in the new sources.
    const british = /\b(colour|behaviour|monetis|labour|judgement|jewellery|centre|defence|analyse|organis|programme|recognis|realis)\w*/i;
    const brHits = [];
    for (const [f, t] of newSources) if (british.test(t)) brHits.push(`${f}:${t.match(british)[0]}`);
    if (british.test(s3Css)) brHits.push('slides.css(S3)');
    record('static-gates', 'American English: zero British spellings', brHits.length === 0, brHits.join(','));

    // Typographic apostrophes: no ASCII apostrophe between letters anywhere
    // in the new sources or the S3 CSS region.
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

    // Section 4 untouched since the R2 merge (git-verify); Sections 1–2
    // sources untouched except the sanctioned glyphs.js selection extension.
    const changed = execSync('git diff --name-only 20cca0d HEAD', { cwd: REPO }).toString().trim().split(/\r?\n/);
    const s4Touched = changed.filter((f) => f.includes('section-4') || f.includes('section-5'));
    record('static-gates', 'Section 4/5 files untouched (git)', s4Touched.length === 0, s4Touched.join(','));
    const s12Touched = changed.filter((f) =>
      (f.includes('section-1') || f.includes('section-2')) &&
      !f.endsWith('glyphs.js') && !f.startsWith('review/'));
    record('static-gates', 'Sections 1–2 sources untouched beyond glyphs.js (git)', s12Touched.length === 0, s12Touched.join(','));

    // 6.5 PROVISIONAL + SOURCES.
    const pd = read(`${S3_DIR}/05-the-palladium-test.js`);
    record('static-sources', 'palladium chart flagged PROVISIONAL in code', /PROVISIONAL DATA/.test(pd), '');
    const sources = read('docs/SOURCES.md');
    for (const wim of ['WIM-PD-001', 'WIM-PD-002', 'WIM-AR-001', 'WIM-BTC-001']) {
      record('static-sources', `${wim} entry present`, sources.includes(wim), '');
    }
    record('static-sources', 'palladium stubs marked PROVISIONAL',
      /WIM-PD-001[\s\S]{0,200}PROVISIONAL/.test(sources) && /WIM-PD-002[\s\S]{0,200}PROVISIONAL/.test(sources), '');

    // 6.6 Glyph statics: candidates, svgs, selections, contact sheet, doc.
    const NEW_GLYPHS = ['through-time', 'between-people', 'measure', 'collectible',
      'palladium', 'dollar', 'peso', 'brick', 'gate', 'tie'];
    const missingSvg = [];
    for (const n of NEW_GLYPHS) {
      for (const l of ['a', 'b', 'c']) {
        if (!fs.existsSync(path.join(REPO, 'assets/icons/candidates', `${n}-${l}.svg`))) missingSvg.push(`${n}-${l}`);
      }
    }
    record('static-glyphs', '30 new candidate svgs present', missingSvg.length === 0, missingSvg.join(',') || 'all present');
    const glyphsSrc = read('src/components/section-2/glyphs.js');
    const selCount = NEW_GLYPHS.filter((n) =>
      new RegExp(`'?${n}'?:\\s*'[abc]'`).test(glyphsSrc)).length;
    record('static-glyphs', 'SELECTIONS covers the 10 new glyphs', selCount === 10, `${selCount}/10`);
    const sheet = read('review/rebuild-r2/icon-studio/contact-sheet.html');
    const sheetCount = NEW_GLYPHS.filter((n) => sheet.includes(`id="${n}"`)).length;
    record('static-glyphs', 'contact sheet carries the 10 new rows', sheetCount === 10, `${sheetCount}/10`);
    const grammar = read('docs/icon-grammar.md');
    record('static-glyphs', 'grammar doc records the R3 extension',
      grammar.includes('The R3 extension') && NEW_GLYPHS.every((n) => grammar.includes(n)), '');
    // Placements: the new glyphs render through glyph() at their surfaces.
    const ladderSrc = read('src/components/section-3/StageLadder.js');
    const layersSrc = read('src/components/section-3/LayerDiagram.js');
    const sepSrc = read(`${S3_DIR}/02-the-functions-separate.js`);
    const fnSrc = read(`${S3_DIR}/01-the-three-functions.js`);
    const palSrc = read(`${S3_DIR}/05-the-palladium-test.js`);
    record('static-glyphs', 'function/stage glyphs placed (ladder + functions row)',
      /'through-time'/.test(ladderSrc + fnSrc) && /'between-people'/.test(ladderSrc + fnSrc) &&
      /measure/.test(ladderSrc + fnSrc) && /collectible/.test(ladderSrc), '');
    record('static-glyphs', 'argentina triad placed (dollar, peso, brick)',
      /'dollar'/.test(sepSrc) && /'peso'/.test(sepSrc) && /'brick'/.test(sepSrc), '');
    record('static-glyphs', 'palladium + gate + tie placed',
      /'palladium'/.test(palSrc) && /glyph\('gate'/.test(ladderSrc) && /glyph\('tie'/.test(layersSrc), '');
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
  const outName = (REDUCED ? 'verification-results-r3-rm' : 'verification-results-r3') + partSuffix + '.json';
  fs.writeFileSync(path.join(OUT, outName), JSON.stringify(summary, null, 2));
  fs.appendFileSync(path.join(OUT, 'console-log-r3.txt'),
    `--- ${summary.variant}${partSuffix} ${summary.date} ---\n${consoleLines.join('\n')}\n`);
  console.log(`${summary.variant}${partSuffix}: ${results.length} checks, ${failures.length} failures, console lines: ${consoleLines.length}`);
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
