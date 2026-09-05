// Batch B — the capture strip, completed at Session 2
// (docs/batch-b-implementation-brief.md §2–§3).
//
// Every settled state of Act II — all thirty-seven — captured OUT OF THE
// SPLICED DECK at 1920×1080, the same pixels the landed-state proof compares,
// plus the batch's connective motion caught mid-flight, which the settled
// frames cannot show: the claim's entry from Scene 4's world, the carrier
// handoffs, the record transformation under the rails law, the evidence
// landings, the certificate travel, the paper dissolving into the ledger, the
// hub stepping away, the honesty arriving on its own advance, and the claim's
// walk along the strip to the body it wears now.
//
// Session 1 captured Scenes 5–7 out of the scratch route; this run re-captures
// them out of the film, so the whole strip is one record of one deck.
//
// Usage: node capture-batch-b.cjs [--port 5275]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5275');
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', 'strip');
fs.mkdirSync(OUT, { recursive: true });

const SCENES = [
  {
    id: 'the-function-stayed', key: 's5', title: 'Scene 5 · The Function Stayed. The Carrier Changed.',
    note: 'The held claim enters from Scene 4’s resting place and takes construction C’s carrier; the contender row takes its wounds exactly as the legacy landed them; the record transforms under the rails law with the goods riding the band; the Zanzibar receipt lands in the evidence grammar; and the same claim returns for the closing pair.',
    beats: [
      'b1 · the claim in its first body — SHELLS',
      'b2 · CATTLE falls',
      'b3 · SALT falls',
      'b4 · IRON falls',
      'b5 · the record — METALS rises, the goods on the band',
      'b6 · the Zanzibar receipt',
      'b7 · “The function stayed. The carrier changed.”',
      'b8 · the exit question'
    ]
  },
  {
    id: 'scarcity-in-matter', key: 's6', title: 'Scene 6 · Gold: Scarcity in Matter',
    note: 'The winner, studied. The elimination runs at the legacy pacing — one wave per advance, exactly as 2-05 performs it — then the claim returns wearing GOLD, and the counted load names gold’s own weakness.',
    beats: [
      'b1 · GOLD — SCARCITY IN MATTER',
      'b2 · the table rises',
      'b3 · the gases drift off',
      'b4 · the corrosion wave',
      'b5 · the radioactive row pulses out',
      'b6 · the shapeless settle',
      'b7 · the furnace decides — two survive',
      'b8 · the claim’s strongest body yet',
      'b9 · the mass state — the counted load'
    ]
  },
  {
    id: 'claims-on-gold', key: 's7', title: 'Scene 7 · Claims on Gold: Portability Through Trust',
    note: 'Gold’s weight answered by architecture: the weaknesses named on the body, the coin, the vault — and the certificate traveling out of the vault’s orbit with the dependency line drawing back. The trade named honestly.',
    beats: [
      'b1 · the weaknesses, on the body that has them',
      'b2 · the body becomes the coin',
      'b3 · custody — the gold stops',
      'b4 · the detachment — the certificate traveled, the line back',
      'b5 · “Portability improved.” / “Trust moved to the issuer.”'
    ]
  },
  {
    id: 'money-becomes-information', key: 's8', title: 'Scene 8 · Fiat: Money Becomes Information',
    note: 'The receipt idea followed all the way. The paper claim dissolves into the glowing ledger entry — P1’s own approved cross-dissolve, both of whose frames the presenter has already approved — then 1971 in the evidence grammar, the capture named in the pattern slide’s own words, the four-currency record ported whole, and the two facts that both stay true.',
    beats: [
      'b1 · MONEY BECAME INFORMATION',
      'b2 · 1971 — the evidence grammar’s second specimen',
      'b3 · captured, not beaten',
      'b4 · the record — what one unit still buys',
      'b5 · both facts on one screen'
    ]
  },
  {
    id: 'scarcity-becomes-digital', key: 's9', title: 'Scene 9 · Bitcoin: Can Scarcity Become Digital?',
    note: 'The neutral register, held for a whole scene. The hub dissolves — the institution at the centre steps away and the mesh forms between the ring’s own nodes, no word on the frame — and then the entrant block, with the honest line arriving on its own advance at full voice while everything above it recedes.',
    beats: [
      'b1 · the network formation — the hub dissolving',
      'b2 · the facts, in the neutral register',
      'b3 · the three capabilities',
      'b4 · the honest line, in the same breath',
      'b5 · the two-question distinction'
    ]
  },
  {
    id: 'the-trade-off-keeps-moving', key: 's10', title: 'Scene 10 · The Trade-Off Keeps Moving',
    note: 'The act’s own recapitulation, and the last leg of the claim’s journey: the strip staged one station at a time with the claim walking it, then palladium as the bar the strip must clear, and the pivot that opens Act III.',
    beats: [
      'b1 · the strip — GOLD · CLAIM ON GOLD · LEDGER · BITCOIN',
      'b2 · “The history of money is a history of changing trade-offs.”',
      'b3 · palladium — scarcer, at times pricier, never money',
      'b4 · the bar',
      'b5 · “Better for what job?”'
    ]
  }
];

// [file, scene id, from-build (null = the scene's own entry), wait (ms), caption, kind]
// kind 'morph' enters the PREVIOUS scene at its end and advances across the
// boundary; kind undefined with from=null reloads the scene and catches its
// cold-entry gesture.
const GESTURES = [
  ['g-s4s5-seam', 'the-function-stayed', null, 900, 'Act I → Scene 5 · the splice seam — the held claim arrives from Scene 4’s resting place', 'morph'],
  ['g-s5-entry-2', 'the-function-stayed', null, 2900, 'S5 entry · the claim crosses into the act; the carrier begins to form'],
  ['g-s5-handoff', 'the-function-stayed', 0, 900, 'S5 b1→b2 · the carrier hands the stage to the record'],
  ['g-s5-transform', 'the-function-stayed', 3, 1500, 'S5 b4→b5 · the transformation — the camera opens, the goods stay riding the band'],
  ['g-s5-evidence', 'the-function-stayed', 4, 1400, 'S5 b5→b6 · the receipt lands in the severance’s own reveal'],
  ['g-s5-return', 'the-function-stayed', 5, 1100, 'S5 b6→b7 · the same claim returns — the argument made visible'],
  ['g-s5s6-cut', 'scarcity-in-matter', null, 900, 'S5→S6 · the authored cut — the composition clears as the study reveals', 'morph'],
  ['g-s6-wave', 'scarcity-in-matter', 3, 1300, 'S6 b4→b5 · the radioactive row pulses out — the legacy wave, mid-flight'],
  ['g-s6-mass', 'scarcity-in-matter', 7, 2600, 'S6 b8→b9 · the counted load stacking — one, four, twelve'],
  ['g-s6s7-morph', 'claims-on-gold', null, 1200, 'S6→S7 · the morph — the diagram recedes, the composition returns', 'morph'],
  ['g-s7-travel-1', 'claims-on-gold', 2, 1100, 'S7 b3→b4 · the certificate travel — the vault settles into custody'],
  ['g-s7-travel-2', 'claims-on-gold', 2, 2000, 'S7 b3→b4 · the certificate leaves the vault’s orbit'],
  ['g-s7-travel-3', 'claims-on-gold', 2, 3000, 'S7 b3→b4 · the dependency line draws back — it went, and it still owes'],
  ['g-s7s8-dissolve-1', 'money-becomes-information', null, 900, 'S7→S8 · the ported dissolve — the paper claim takes the forms’ own box', 'morph'],
  ['g-s7s8-dissolve-2', 'money-becomes-information', null, 1500, 'S7→S8 · the ledger rises through the paper, which releases a beat late — money becomes information', 'morph'],
  ['g-s8-evidence', 'money-becomes-information', 0, 1500, 'S8 b1→b2 · 1971 lands — a date with no place, the same grammar'],
  ['g-s8-chart', 'money-becomes-information', 2, 1200, 'S8 b3→b4 · the record arrives in the legacy’s own reveal'],
  ['g-s8s9-hub-1', 'scarcity-becomes-digital', null, 1300, 'S8→S9 · the institution first — the centre holding the record, spokes to the ring', 'morph'],
  ['g-s8s9-hub-2', 'scarcity-becomes-digital', null, 2600, 'S8→S9 · the centre steps away as the mesh forms — the two weights are the argument', 'morph'],
  ['g-s9-capabilities', 'scarcity-becomes-digital', 1, 1000, 'S9 b2→b3 · the three capabilities land; the facts settle back'],
  ['g-s9-honesty', 'scarcity-becomes-digital', 2, 1100, 'S9 b3→b4 · the honest line, at full voice, everything above it receded'],
  ['g-s9s10-walk-1', 'the-trade-off-keeps-moving', null, 1500, 'S9→S10 · the line draws and the claim enters at its left end', 'morph'],
  ['g-s9s10-walk-2', 'the-trade-off-keeps-moving', null, 4600, 'S9→S10 · the walk — CLAIM ON GOLD lights and its words rise behind the claim, GOLD receded', 'morph'],
  ['g-s9s10-walk-3', 'the-trade-off-keeps-moving', null, 5900, 'S9→S10 · LEDGER lights; the claim is one body from the end', 'morph'],
  ['g-s9s10-arrival', 'the-trade-off-keeps-moving', null, 6550, 'S9→S10 · THE ARRIVAL — the claim rises off the line into the newest body it will wear, and is absorbed', 'morph'],
  ['g-s9s10-landed', 'the-trade-off-keeps-moving', null, 7000, 'S9→S10 · the walk complete — four bodies lit, the claim inside the last of them, the frame settling to the approved cell', 'morph'],
  ['g-s10-palladium', 'the-trade-off-keeps-moving', 1, 1800, 'S10 b2→b3 · palladium arrives — the hook lifted, the panels in the legacy’s own reveal'],
  ['g-s10-bar', 'the-trade-off-keeps-moving', 2, 1700, 'S10 b3→b4 · the bar lands; the two epoch lines settle back beneath it'],
  ['g-s10-legacy-seam', null, null, 1100, 'Scene 10 → the surviving legacy deck · the splice seam, walked not smoothed', 'seam']
];

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  let page;
  const freshPage = async () => {
    if (page) await page.close();
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    page.setDefaultNavigationTimeout(60000);
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
  };

  // Sixty-five captures, each with real rasters: `networkidle` starts timing
  // out deep into the run as the renderer fills. A retry on a fresh page is
  // the honest fix — retrying on the page that just stalled proves nothing —
  // and `load` plus the explicit readiness wait below is the same guarantee
  // without the idle heuristic.
  const goto = async (url) => {
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        await page.goto(url, { waitUntil: 'load' });
        return;
      } catch (err) {
        if (attempt === 3) throw err;
        console.log(`  retrying ${url}`);
        await freshPage();
      }
    }
  };

  const ready = async () => {
    await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
    });
  };
  const settled = async () => {
    await page.waitForFunction(() => {
      if (window.__deck && window.__deck.transitioning) return false;
      const a = window.__act2;
      if (a && !a.settled()) return false;
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
  };
  const hideChrome = async () => {
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForFunction(() => {
      const c = document.querySelector('.deck-chrome');
      return !c || getComputedStyle(c).opacity === '0';
    }, null, { timeout: 15000 });
    await page.waitForTimeout(120);
  };
  const enter = async (sceneId, build) => {
    await goto(`${BASE}/?slide=${sceneId}`);
    await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
      null, { timeout: 30000 });
    if (build != null && build > 0) {
      const idx = await page.evaluate((sid) => window.__deck.slides.findIndex((s) => s.id === sid), sceneId);
      await page.evaluate(([i, b]) => {
        sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
      }, [idx, build]);
      await page.reload({ waitUntil: 'load' });
    }
    await ready();
  };

  // ---- the settled frames -----------------------------------------------------
  const frames = [];
  for (const sc of SCENES) {
    for (let b = 0; b < sc.beats.length; b += 1) {
      await freshPage();
      await enter(sc.id, b);
      await settled();
      await hideChrome();
      const file = `${sc.key}-b${b + 1}.png`;
      await page.screenshot({ path: path.join(OUT, file), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
      frames.push({ file, scene: sc.key, caption: sc.beats[b] });
      console.log(`state  ${file.padEnd(14)} ${sc.beats[b]}`);
    }
  }

  // ---- the gestures, mid-flight ----------------------------------------------
  const gestures = [];
  for (const [file, sceneId, from, wait, caption, kind] of GESTURES) {
    await freshPage();
    if (kind === 'morph') {
      // A boundary gesture: enter the PREVIOUS slide at its end, hide the
      // chrome, then advance across the boundary and catch the incoming morph.
      await goto(`${BASE}/?slide=${sceneId}`);
      await ready();
      const prev = await page.evaluate((sid) => {
        const i = window.__deck.slides.findIndex((s) => s.id === sid);
        return { idx: i - 1, id: window.__deck.slides[i - 1].id,
          end: window.__deck.slides[i - 1].totalBuildSteps || 0 };
      }, sceneId);
      await enter(prev.id, prev.end);
      await settled();
      await hideChrome();
      await page.evaluate(() => window.__deck.advance());
    } else if (kind === 'seam') {
      // The other splice seam: Act II's last frame into the legacy deck.
      const last = SCENES[SCENES.length - 1];
      await enter(last.id, last.beats.length - 1);
      await settled();
      await hideChrome();
      await page.evaluate(() => window.__deck.advance());
    } else if (from == null) {
      // A cold entry's own gesture: reload and catch it mid-flight.
      await enter(sceneId, 0);
      await hideChrome();
      await page.reload({ waitUntil: 'load' });
      await ready();
      await page.evaluate(() => window.__deck._hideChrome());
    } else {
      await enter(sceneId, from);
      await settled();
      await hideChrome();
      await page.evaluate(() => window.__deck.advance());
    }
    await page.waitForTimeout(wait);
    await page.screenshot({ path: path.join(OUT, `${file}.png`), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    gestures.push({ file: `${file}.png`, caption });
    console.log(`flight ${(file + '.png').padEnd(22)} ${caption}`);
  }

  // ---- the strip page ---------------------------------------------------------
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const fig = (f) => `
  <figure><a href="./${f.file}" target="_blank"><img src="./${f.file}" loading="lazy" alt="${f.file}"></a>
  <figcaption>${esc(f.caption)}</figcaption></figure>`;
  const sceneBlocks = SCENES.map((sc) => `
<h2>${esc(sc.title)}</h2>
<p class="lang">${esc(sc.note)}</p>
<div class="row">${frames.filter((f) => f.scene === sc.key).map(fig).join('')}</div>`).join('\n');

  fs.writeFileSync(path.join(OUT, 'strip.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Batch B — the capture strip</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 72px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:48px 0 6px; font-weight:500; }
  p.note, p.lang { font-size:13px; color:rgba(255,255,255,.55); margin:0 0 14px; max-width:1020px; line-height:1.65; }
  .row { display:flex; flex-wrap:wrap; gap:22px; }
  figure { margin:0; width:448px; }
  img { display:block; width:448px; height:252px; outline:1px solid rgba(255,255,255,.09); }
  figcaption { margin-top:6px; font-size:11.5px; color:rgba(255,255,255,.52); line-height:1.55; }
  a { color:#F7931A; text-decoration:none; }
</style></head><body>
<h1>Batch B — the capture strip · Act II, Scenes 5–10</h1>
<p class="note">All ${frames.length} settled states of Act II as the <b>spliced deck</b> runs them — the same pixels the
landed-state proof compares, each one its presenter-approved cell at zero differing pixels — and the batch's
connective motion caught mid-flight beneath them. <b>This strip is the record, not the review: the review is the act,
running, at the viewing that ruling 3 makes the gate.</b></p>
${sceneBlocks}
<h2>The connective motion, mid-flight</h2>
<p class="lang">What the settled frames cannot show: the claim's entry from Scene 4's world, the handoffs, the
transformation under the rails law, the evidence landings, the certificate travel, the paper dissolving into the
ledger, the hub stepping away, the honesty arriving on its own advance, the claim's walk along the strip — and both
seams the splice creates, walked rather than smoothed.</p>
<div class="row">${gestures.map(fig).join('')}</div>
</body></html>`);

  console.log(`\n${frames.length} settled states · ${gestures.length} gestures -> review/batch-b/strip/`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
