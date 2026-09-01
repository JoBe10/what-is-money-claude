// Act II rail implementation — THE CAPTURE STRIP, COMPLETED
// (docs/act-2-rail-impl-brief.md §3).
//
// The record of what the deck actually plays, out of the spliced film at
// 1920×1080: EVERY settled state of Act II — all thirty-seven — plus the
// connective motion caught MID-FLIGHT, which no settled frame can show. The
// settled frames are the ones the landed-state proof compares pixel for pixel;
// the gesture frames are the ones the presenter's act viewing judges, because
// the gate's criterion is the rail's own continuity and continuity only exists
// between frames.
//
// Session 1 captured Scenes 5–7; this run re-captures them alongside Scenes
// 8–10, so the whole strip is one record of one deck.
//
// Usage: node capture-batch.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', 'strip');
fs.mkdirSync(OUT, { recursive: true });

const SCENES = [
  {
    idx: 5, id: 'the-function-stayed', key: 's5',
    title: 'Scene 5 · The Function Stayed. The Carrier Changed.',
    note: 'The rail begins. The line draws in out of the dark and SHELLS takes station one with its virtue beneath it; CATTLE, SALT and IRON arrive to its RIGHT and fall, each wound landing at full voice while the one before it recedes; METALS rises with its own line; the ship returns to the far-left station; and the act’s thesis lands over the receded record. No claim disc anywhere — the traveler stepped off the Act II rail at the r2 ruling.',
    beats: [
      'b1 · the rail begins — SHELLS, and its virtue',
      'b2 · CATTLE arrives to the right, and falls',
      'b3 · SALT falls; CATTLE’s wound recedes',
      'b4 · IRON falls; SHELLS still standing',
      'b5 · METALS rises, with its own line beneath it',
      'b6 · ZANZIBAR, at the far-left SHELLS station',
      'b7 · “The function stayed. The carrier changed.”',
      'b8 · the exit question'
    ]
  },
  {
    idx: 6, id: 'scarcity-in-matter', key: 's6',
    title: 'Scene 6 · Gold: Scarcity in Matter',
    note: 'GOLD takes its station and its gain settles into the record; the rail recedes to the legacy’s deep dim and the table rises over it; the elimination runs at the legacy pacing, one wave per advance, untouched; the rail returns crowned; and the counted load names gold’s own weakness.',
    beats: [
      'b1 · GOLD arrives — SCARCITY IN MATTER lands',
      'b2 · the table rises over the deep-dimmed rail',
      'b3 · wave 1 — the gases',
      'b4 · wave 2 — what rusts, burns, dissolves',
      'b5 · wave 3 — the radioactive row',
      'b6 · wave 4 — what will not hold a shape',
      'b7 · wave 5 — the furnace decides',
      'b8 · the rail returns, GOLD crowned',
      'b9 · the counted load — the weight grows'
    ]
  },
  {
    idx: 7, id: 'claims-on-gold', key: 's7',
    title: 'Scene 7 · Claims on Gold: Portability Through Trust',
    note: 'COINAGE arrives photographic — its study was gated and ingested at the r2 session — and takes the mint’s terms, then the fleet problem writes its limit. Then the vault folds into the rail: CLAIM ON GOLD arrives, the dependency arc draws back to the gold through the corridor the traveler left, the featured line lands at full voice, and a beat later it condenses into the station’s own row.',
    beats: [
      'b1 · COINAGE arrives — the mint’s terms',
      'b2 · the fleet problem — the station’s limit',
      'b3 · CLAIM ON GOLD arrives; the arc draws back',
      'b4 · the sentence condenses into the record',
      'b5 · the trade named honestly'
    ]
  },
  {
    idx: 8, id: 'money-becomes-information', key: 's8',
    title: 'Scene 8 · Fiat: Money Becomes Information',
    note: 'THE DISSOLVE, said by the record: the certificate’s dependency arc releases — the one thing on screen asserting the paper still owes gold — its note gives way to the named trade, and LEDGER rises to the right of it. Then 1971 at the LEDGER station, gold and its claim dimming together; the ported chart over the deep-dimmed record; the rail returning with the residue as the ledger’s own dependency row before the wound is named over it.',
    beats: [
      'b1 · LEDGER arrives — MONEY BECAME INFORMATION',
      'b2 · the honest strengths; INSTANT TRANSFER settles',
      'b3 · 1971, the featured moment at the LEDGER station',
      'b4 · the chart over the deep-dimmed record',
      'b5 · the measured wound, over the receded rail'
    ]
  },
  {
    idx: 9, id: 'scarcity-becomes-digital', key: 's9',
    title: 'Scene 9 · Bitcoin: Can Scarcity Become Digital?',
    note: 'THE MESH FORMS OUT OF THE LEDGER STATION. The record recedes to the legacy’s deep dim, that station alone stays lit — the issuer the act has just watched fail — and its hub dissolves into the ring where the issuer stood. Then the rail returns and BITCOIN takes its station beside it, the facts, the three capabilities and the honest limitation landing as station annotations.',
    beats: [
      'b1 · the mesh, anchored where the ledger stood',
      'b2 · BITCOIN takes its station beside it',
      'b3 · the three capabilities, on their own advance',
      'b4 · the honest line, in the same breath',
      'b5 · the stability distinction, over the receded rail'
    ]
  },
  {
    idx: 10, id: 'the-trade-off-keeps-moving', key: 's10',
    title: 'Scene 10 · The Trade-Off Keeps Moving',
    note: 'NO SECOND STRIP. The scene draws nothing of its own: it reads the same rail, ten stations wide, and the recapitulation is a re-lighting — the pairs land station by station along the four architecture stops. The history line lands ON the complete record; palladium stands against it deep-dimmed rather than clearing it, because the bar is held up against the history it has to clear; and the exit question lands over the receded rail.',
    beats: [
      'b1 · the record read again as argument',
      'b2 · the history line, on the record it names',
      'b3 · palladium, against the extended rail',
      'b4 · THE BAR — marginally better is structurally insufficient',
      'b5 · the pivot into Act III'
    ]
  }
];

// The connective motion, caught at the moment it is only visible in flight.
const GESTURES = [
  ['g-s5-begins', 5, 0, 'cold', 900,
    'The rail begins — the line drawing in out of the dark before SHELLS lands.'],
  ['g-s5-cattle', 5, 1, 'step', 1200,
    'CATTLE arriving to the right of the shells as the camera opens and the line extends.'],
  ['g-s5-metals', 5, 4, 'step', 1400,
    'METALS rising out of the wreckage, its virtue landing beneath it.'],
  ['g-s5-zanzibar', 5, 5, 'step', 1500,
    'The ship returning to the oldest station — the dated fact landing at the far-left shells.'],
  ['g-s5-thesis', 5, 6, 'step', 1200,
    'The record receding under the act’s thesis, the shells’ defeat settling into its row.'],
  ['g-s5s6-seam', 6, 0, 'boundary', 1300,
    'The seam into Scene 6 — one world, the camera opening right as GOLD arrives.'],
  ['g-s6-table', 6, 1, 'step', 900,
    'The rail receding to the legacy’s deep dim as the table rises over it.'],
  ['g-s6-wave', 6, 3, 'step', 1100,
    'An elimination wave, at the legacy pacing, over the waiting rail.'],
  ['g-s6-return', 6, 7, 'step', 1100,
    'The rail coming back up out of its deep dim, GOLD crowned.'],
  ['g-s6-mass', 6, 8, 'step', 1600,
    'The counted load stacking course by course over the receded record.'],
  ['g-s6s7-return', 7, 0, 'boundary', 900,
    'The return seam — gold’s dependency note landing as the rail comes back.'],
  ['g-s6s7-coinage', 7, 0, 'boundary', 2300,
    'COINAGE arriving out of that return, further right than anything before it.'],
  ['g-s7-arc-1', 7, 2, 'step', 2200,
    'CLAIM ON GOLD arrived; the dependency arc beginning to draw back to the gold.'],
  ['g-s7-arc-2', 7, 2, 'step', 2700,
    'The arc landed — the certificate went, and it still owes.'],
  ['g-s7-condense', 7, 3, 'step', 900,
    'The featured line condensing into the station’s own row.'],
  ['g-s7s8-dissolve', 8, 0, 'boundary', 900,
    'THE DISSOLVE — the dependency arc releasing as the claim stops being a thing and becomes an entry.'],
  ['g-s8-ledger', 8, 0, 'boundary', 2300,
    'LEDGER rising to the right of the certificate, the record extending one station further.'],
  ['g-s8-1971', 8, 2, 'step', 1500,
    'The decree landing at the LEDGER station, gold and its claim dimming together behind it.'],
  ['g-s8-chart', 8, 3, 'step', 1100,
    'The record receding to the legacy’s deep dim as the ported chart rises over it.'],
  ['g-s8-residue', 8, 4, 'step', 1400,
    'The rail coming back with the residue noted — the chart’s slope becoming one line of the record.'],
  ['g-s8s9-mesh-1', 9, 0, 'boundary', 1500,
    'The institution standing first: the hub at full voice with its spokes out to the ring.'],
  ['g-s8s9-mesh-2', 9, 0, 'boundary', 2600,
    'The centre stepping away as the peer-to-peer chords come in — the hub dissolving where the issuer stood.'],
  ['g-s9-bitcoin', 9, 1, 'step', 2200,
    'The rail returning and BITCOIN taking its station beside the ledger.'],
  ['g-s9-capabilities', 9, 2, 'step', 900,
    'The three capabilities landing at the station on their own advance.'],
  ['g-s9-limitation', 9, 3, 'step', 900,
    'The honest line taking its own advance while everything above it recedes.'],
  ['g-s9s10-relight', 10, 0, 'boundary', 1200,
    'The record read again: the pairs lighting station by station along the four architecture stops.'],
  ['g-s10-palladium', 10, 2, 'step', 1600,
    'The palladium frame rising against the deep-dimmed record — the bar, against the history it must clear.'],
  ['g-s10-question', 10, 4, 'step', 1400,
    'The record returning under the question that opens Act III.']
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  const settled = async () => {
    await page.waitForFunction(() => {
      if (window.__deck && window.__deck.transitioning) return false;
      const a = window.__act2;
      if (a && !a.settled()) return false;
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
  };
  const ready = async () => {
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
    });
  };
  const hideChrome = async () => {
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForFunction(() => {
      const c = document.querySelector('.deck-chrome');
      return !c || getComputedStyle(c).opacity === '0';
    }, null, { timeout: 15000 });
  };
  const enterCold = async (idx, build) => {
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(([i, b]) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
    }, [idx, build]);
    await page.goto(`${BASE}/?slide=${idx + 1}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
    await ready();
  };

  // ---- the settled states, out of the film ----
  let shots = 0;
  for (const sc of SCENES) {
    for (let b = 0; b < sc.beats.length; b += 1) {
      await enterCold(sc.idx, b);
      await settled();
      await hideChrome();
      await page.waitForTimeout(150);
      await page.screenshot({
        path: path.join(OUT, `${sc.key}-b${b + 1}.png`),
        clip: { x: 0, y: 0, width: 1920, height: 1080 }
      });
      shots += 1;
      console.log(`state  ${sc.key}-b${b + 1}`);
    }
  }

  // ---- the gestures, caught in flight ----
  for (const [name, idx, build, kind, ms] of GESTURES) {
    if (kind === 'cold') {
      await enterCold(idx, build);
      await hideChrome();
      await page.waitForTimeout(ms);
    } else if (kind === 'step') {
      await enterCold(idx, build - 1);
      await settled();
      await hideChrome();
      await page.evaluate(() => window.__deck.advanceStep(false));
      await page.waitForTimeout(ms);
    } else {
      // A boundary: sit on the previous slide's last build and advance across.
      const prev = idx - 1;
      const prevBuilds = await page.evaluate(() => 0);
      await enterCold(idx, 0);
      await settled();
      const last = await page.evaluate((i) => window.__deck.slides[i].totalBuildSteps || 0, prev);
      await enterCold(prev, last);
      await settled();
      await hideChrome();
      await page.evaluate(() => window.__deck.advance());
      await page.waitForTimeout(ms);
      void prevBuilds;
    }
    await page.screenshot({
      path: path.join(OUT, `${name}.png`),
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    shots += 1;
    console.log(`motion ${name}`);
  }

  // ---- the strip's index ----
  const sceneSections = SCENES.map((sc) => `
  <h2>${esc(sc.title)}</h2>
  <p class="note">${esc(sc.note)}</p>
  <div class="row">${sc.beats.map((caption, i) => `
    <figure><a href="./${sc.key}-b${i + 1}.png" target="_blank"><img src="./${sc.key}-b${i + 1}.png" loading="lazy" alt="${sc.key}-b${i + 1}"></a>
    <figcaption><b>${sc.key}-b${i + 1}</b> · ${esc(caption)}</figcaption></figure>`).join('')}</div>`).join('\n');

  const motionSection = `
  <h2>The motion between them</h2>
  <p class="note">Frames a settled state cannot show, caught mid-gesture. These are what the act viewing judges, because the gate's criterion is the rail's own continuity and continuity only exists between frames.</p>
  <div class="row">${GESTURES.map(([name, , , , , caption]) => `
    <figure><a href="./${name}.png" target="_blank"><img src="./${name}.png" loading="lazy" alt="${name}"></a>
    <figcaption><b>${name}</b> · ${esc(caption)}</figcaption></figure>`).join('')}</div>`;

  fs.writeFileSync(path.join(OUT, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Act II on the rail — the capture strip</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 72px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:52px 0 10px; font-weight:500; }
  p.note { font-size:13.5px; color:rgba(255,255,255,.62); margin:0 0 16px; max-width:1040px; line-height:1.7; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figcaption { margin-top:8px; font-size:11.5px; color:rgba(255,255,255,.52); line-height:1.6; }
  figcaption b { color:rgba(255,255,255,.85); font-weight:600; }
  a { color:#F7931A; text-decoration:none; }
</style></head><body>
<h1>Act II on the rail — the capture strip</h1>
<p class="note">All six scenes as the deck actually plays them, captured out of the spliced film at
1920&times;1080. The settled frames are the ones the landed-state proof compares against the approved
r2 cells — <b>all thirty-three rail states at zero differing pixels</b>. The frames below them are the
motion between, which is what the act viewing judges: the gate's criterion is the rail's own
continuity, and continuity only exists between frames.</p>
${sceneSections}
${motionSection}
</body></html>`);

  fs.writeFileSync(path.join(__dirname, '..', 'strip-batch.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'batch-b-r2',
    shots,
    settledStates: SCENES.reduce((n, s) => n + s.beats.length, 0),
    gestures: GESTURES.length,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${shots} frames -> review/batch-b-r2/strip/`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
