// Batch B — the batch smoke (docs/batch-b-implementation-brief.md §3).
//
// Seven proofs, one run, all against the SPLICED DECK:
//   1. The deck boots: 39 slides in the spliced order, the six sections, the
//      Act II scenes at their architecture positions, 0 console errors.
//   2. Full traversal forward: every (slide, build) of the whole film walked
//      in order, the sequence exactly the running order.
//   3. Full traversal backward: every state walked back to the first frame,
//      monotonic, landing on 1:0 — with each within-group boundary handing
//      off to the previous scene's END state rather than its first.
//   4. THE BOUNDARIES, both directions, landings recorded: the five in-act
//      handoffs (S5→S6 … S9→S10) and the two the splice creates — Act I's
//      Scene 4 into Scene 5, and Scene 10 into the surviving legacy deck.
//   5. Cold entry at every one of Act II's 37 builds (URL + restored build
//      step — the engine's own deep-link path), all settled.
//   6. Reduced-motion parity: the same 37 cold entries under
//      prefers-reduced-motion serialize IDENTICALLY to the settled motion-on
//      states (window.__act2's serializer) — checked mechanically.
//   7. Deep links: every Act II scene id resolves, and no retired id does.
//
// Usage: node smoke-batch-b.cjs [--port 5275]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5275');
const BASE = `http://127.0.0.1:${PORT}`;

const EXPECTED_SLIDES = 39;
const ACT2 = [
  ['the-function-stayed', 8],
  ['scarcity-in-matter', 9],
  ['claims-on-gold', 5],
  ['money-becomes-information', 5],
  ['scarcity-becomes-digital', 5],
  ['the-trade-off-keeps-moving', 5]
];
const RETIRED = [
  '2-04-the-competition-record', '2-05-two-survivors', '2-06-the-abstraction-ladder',
  '2-07-the-severance', '2-08-the-pattern', '3-05-the-palladium-test'
];

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const result = {
    date: new Date().toISOString(),
    session: 'batch-b',
    deck: null, traversal: null, boundaries: [], directEntry: [], parity: [], deepLinks: null,
    consoleErrors: errors
  };
  let page;
  // The parity pass runs the same entries under prefers-reduced-motion, and
  // the page is recycled inside both passes, so the media emulation is state
  // the factory has to carry rather than something set once on a page.
  let reduced = false;
  const freshPage = async () => {
    if (page) await page.close();
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    page.setDefaultNavigationTimeout(60000);
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
    // This smoke asserts state, not pixels; serve every raster as a 1×1 so a
    // long traversal cannot exhaust the renderer (the proof loads the real ones).
    await page.route('**/*.png', (route) => route.fulfill({
      contentType: 'image/png',
      body: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64')
    }));
    if (reduced) await page.emulateMedia({ reducedMotion: 'reduce' });
  };
  await freshPage();

  const settled = async () => {
    await page.waitForFunction(() => {
      if (window.__deck && window.__deck.transitioning) return false;
      const a = window.__act2;
      if (a && !a.settled()) return false;
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
    await page.waitForTimeout(90);
  };
  const deckState = () => page.evaluate(() => ({
    idx: window.__deck.index, step: window.__deck.buildStep,
    id: window.__deck.slides[window.__deck.index].id
  }));
  const sceneState = () => page.evaluate(() => (window.__act2 ? window.__act2.state() : { kind: 'none' }));

  // ---- 1 · the deck boots spliced ----
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  result.deck = await page.evaluate(() => ({
    slides: window.__deck.slides.length,
    firstId: window.__deck.slides[0].id,
    ids: window.__deck.slides.map((s) => s.id),
    builds: window.__deck.slides.map((s) => s.totalBuildSteps || 0),
    sections: window.__deck.sections.map((s) => `${s.id}:${s.slides.length}`)
  }));
  console.log(`deck boots: ${result.deck.slides} slides — ${result.deck.sections.join(' · ')}`);
  const act2At = ACT2.map(([id]) => result.deck.ids.indexOf(id));
  const act2Placed = act2At.every((i, k) => i === act2At[0] + k) && act2At[0] === 5;
  const buildsOk = ACT2.every(([id, n], k) => result.deck.builds[act2At[k]] === n - 1);
  console.log(`Act II at ${act2At[0] + 1}–${act2At[5] + 1}: ${act2Placed ? 'in order' : 'WRONG'}, ` +
    `build counts ${buildsOk ? 'ok' : 'WRONG'}`);

  // ---- 2 + 3 · the whole film, forward then backward ----
  const expected = [];
  result.deck.builds.forEach((max, i) => {
    for (let b = 0; b <= max; b += 1) expected.push([i, b]);
  });
  console.log(`traversal: ${expected.length} states across ${result.deck.slides} slides`);

  await settled();
  const seen = [await deckState()];
  for (let i = 1; i < expected.length; i += 1) {
    await page.evaluate(() => window.__deck.advance());
    await settled();
    seen.push(await deckState());
  }
  const fwdOk = seen.every((s, i) => s.idx === expected[i][0] && s.step === expected[i][1]);
  const fwdFirstBad = seen.findIndex((s, i) => s.idx !== expected[i][0] || s.step !== expected[i][1]);

  const seenBack = [];
  for (let i = 0; i < expected.length + 12; i += 1) {
    const before = await deckState();
    if (before.idx === 0 && before.step === 0) break;
    await page.evaluate(() => window.__deck.retreat());
    await settled();
    seenBack.push(await deckState());
  }
  const backLanded = seenBack[seenBack.length - 1];
  const backOk = backLanded && backLanded.idx === 0 && backLanded.step === 0;
  const backMonotonic = seenBack.every((s, i) => {
    if (i === 0) return true;
    const p = seenBack[i - 1];
    return s.idx < p.idx || (s.idx === p.idx && s.step < p.step);
  });
  result.traversal = {
    states: expected.length,
    forward: fwdOk, forwardFirstMismatchAt: fwdOk ? null : fwdFirstBad,
    backwardReachesTop: backOk, backwardMonotonic: backMonotonic,
    backwardSteps: seenBack.length
  };
  console.log(`traversal: forward ${fwdOk ? 'ok' : `WRONG at ${fwdFirstBad}`}, ` +
    `backward ${backOk && backMonotonic ? 'ok' : 'WRONG'} (${seenBack.length} steps back to the top)`);

  // ---- 4 · the boundaries, both directions ----
  const jump = async (idx, step) => {
    const here = await page.evaluate(() => window.__deck.index);
    if (here !== idx) {
      await page.evaluate((i) => window.__deck.goTo(i), idx);
      await page.waitForFunction(
        (i) => !window.__deck.transitioning && window.__deck.index === i,
        idx, { timeout: 20000 });
    }
    await settled();
    const at = await page.evaluate(() => window.__deck.buildStep);
    for (let k = at; k < step; k += 1) {
      await page.evaluate(() => window.__deck.advanceStep(false));
      await settled();
    }
  };
  const boundary = async (name, from, act) => {
    await jump(from[0], from[1]);
    const before = await deckState();
    await act();
    await settled();
    const after = await deckState();
    result.boundaries.push({ name, from: before, to: after });
    console.log(`boundary ${name.padEnd(46)} ${before.id}:${before.step} → ${after.id}:${after.step}`);
  };
  const fwd = () => page.evaluate(() => window.__deck.advance());
  const back = () => page.evaluate(() => window.__deck.retreat());
  const idxOf = (id) => result.deck.ids.indexOf(id);
  const endOf = (id) => result.deck.builds[idxOf(id)];

  await boundary('Act I: Scene 4 end → Scene 5 (the splice seam)',
    [idxOf('spend-or-save'), endOf('spend-or-save')], fwd);
  await boundary('Scene 5 b0 → Scene 4 end (backward)', [idxOf('the-function-stayed'), 0], back);
  for (let k = 0; k < ACT2.length - 1; k += 1) {
    const [fromId] = ACT2[k];
    const [toId] = ACT2[k + 1];
    await boundary(`${fromId} end → ${toId} (forward)`, [idxOf(fromId), endOf(fromId)], fwd);
    await boundary(`${toId} b0 → ${fromId} end (backward)`, [idxOf(toId), 0], back);
  }
  await boundary('Scene 10 end → the surviving legacy deck (the splice seam)',
    [idxOf('the-trade-off-keeps-moving'), endOf('the-trade-off-keeps-moving')], fwd);
  await boundary('the legacy deck b0 → Scene 10 end (backward)',
    [idxOf('the-trade-off-keeps-moving') + 1, 0], back);

  // What the boundary landings have to prove, stated rather than eyeballed:
  // INSIDE the group, ← hands the shared stage back to the previous scene's
  // END state (a scene's build-0 birth is never a valid landing mid-world);
  // ACROSS a group edge the deck-wide convention is unchanged — ← enters the
  // previous slide at build 0, and ↑ remains the jump-to-end key. Both splice
  // seams are group edges, so both land at 0, and that is correct rather than
  // tolerated.
  const landing = (name) => result.boundaries.find((b) => b.name.startsWith(name));
  const inGroupBack = ACT2.slice(1).map(([toId], k) => {
    const b = landing(`${toId} b0 → ${ACT2[k][0]} end`);
    return b && b.to.id === ACT2[k][0] && b.to.step === endOf(ACT2[k][0]);
  });
  const seamBack = [
    landing('Scene 5 b0 → Scene 4 end'),
    landing('the legacy deck b0 → Scene 10 end')
  ].map((b) => b && b.to.step === 0);
  result.boundaryLaw = {
    withinGroupHandsBackToEndState: inGroupBack.every(Boolean),
    crossGroupEntersPreviousAtBuildZero: seamBack.every(Boolean)
  };
  console.log(`boundary law: within-group ← lands on the previous scene's end ` +
    `${inGroupBack.filter(Boolean).length}/${inGroupBack.length} · ` +
    `cross-group ← enters at build 0 ${seamBack.filter(Boolean).length}/${seamBack.length}`);

  // ---- 5 + 6 · cold entry at every Act II build, then parity ----
  // Seventy-four cold entries on one page exhausts the renderer long before
  // the run ends, so the page is recycled on a fixed cadence and on every
  // retry. A retry that reuses the page it just timed out on proves nothing.
  let entered = 0;
  const enterCold = async (sceneId, build) => {
    let last = null;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      if (attempt > 1 || entered % 6 === 0) await freshPage();
      entered += 1;
      try {
        await page.goto(`${BASE}/?slide=${sceneId}`, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
          null, { timeout: 15000 });
        const idx = await page.evaluate((sid) => window.__deck.slides.findIndex((s) => s.id === sid), sceneId);
        await page.evaluate(([i, b]) => {
          sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
        }, [idx, build]);
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__deck, null, { timeout: 15000 });
        await settled();
        last = await deckState();
        if (last.id === sceneId && last.step === build) return sceneState();
      } catch (err) {
        last = { err: String(err) };
      }
      if (attempt < 3) console.log(`  retrying direct entry ${sceneId}:${build}`);
    }
    throw new Error(`direct entry ${sceneId}:${build} landed at ${JSON.stringify(last)}`);
  };

  const motionStates = {};
  for (const [id, builds] of ACT2) {
    for (let b = 0; b < builds; b += 1) {
      motionStates[`${id}:${b}`] = await enterCold(id, b);
      result.directEntry.push(`${id}:${b}`);
    }
  }
  console.log(`direct entry: ${result.directEntry.length} builds mounted cold, all settled`);

  reduced = true;
  await freshPage();
  let parityFailures = 0;
  for (const [id, builds] of ACT2) {
    for (let b = 0; b < builds; b += 1) {
      const key = `${id}:${b}`;
      const reduced = await enterCold(id, b);
      const same = JSON.stringify(reduced) === JSON.stringify(motionStates[key]);
      result.parity.push({ state: key, identical: same });
      if (!same) {
        parityFailures += 1;
        console.log(`PARITY MISMATCH at ${key}`);
        console.log('  motion:  ', JSON.stringify(motionStates[key]));
        console.log('  reduced: ', JSON.stringify(reduced));
      }
    }
  }
  console.log(`reduced-motion parity: ${result.parity.length - parityFailures}/${result.parity.length} identical`);
  reduced = false;
  await freshPage();

  // ---- 7 · deep links ----
  const live = [];
  for (const [id] of ACT2) {
    await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.__deck && !window.__deck.transitioning, null, { timeout: 15000 });
    const at = await deckState();
    live.push({ id, resolvedTo: at.id, ok: at.id === id });
  }
  const dead = [];
  for (const id of RETIRED) {
    // Session storage is cleared first, or the engine's own fallback chain
    // (URL, then storage) would land the stale link on wherever this run last
    // was — which would test the harness rather than the deck.
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => sessionStorage.clear());
    await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.__deck && !window.__deck.transitioning, null, { timeout: 15000 });
    const at = await deckState();
    // A retired id no longer resolves to any slide, so the engine opens on the
    // film's first frame rather than 404ing — the behavior a stale link should
    // get, and proof that nothing else quietly inherited the id.
    dead.push({ id, fallsBackTo: at.id, ok: at.idx === 0 });
  }
  result.deepLinks = { live, retired: dead };
  console.log(`deep links: ${live.filter((l) => l.ok).length}/${live.length} Act II ids resolve · ` +
    `${dead.filter((d) => d.ok).length}/${dead.length} retired ids fall back to the first frame`);

  fs.writeFileSync(path.join(__dirname, '..', 'smoke-batch-b.json'), JSON.stringify(result, null, 2));
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();

  const failed = errors.length || result.deck.slides !== EXPECTED_SLIDES ||
    !act2Placed || !buildsOk || !fwdOk || !backOk || !backMonotonic || parityFailures ||
    !result.boundaryLaw.withinGroupHandsBackToEndState ||
    !result.boundaryLaw.crossGroupEntersPreviousAtBuildZero ||
    live.some((l) => !l.ok) || dead.some((d) => !d.ok);
  process.exit(failed ? 1 : 0);
})();
