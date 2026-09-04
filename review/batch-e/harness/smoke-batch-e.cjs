// Batch E — the batch smoke (the implementation brief §3).
//
// Ten proofs, one run, over the SPLICED 31-SCENE DECK — the film, end to end,
// with no legacy slide in it:
//   1. Deck boot: 31 slides (was 32), the same first id, the LAST id
//      `the-close`, the act-5 section labeled and placed after Act IV, and
//      NO LEGACY SLIDE ANYWHERE in the running order — asserted by id shape,
//      not by counting. 0 console errors.
//   2. Full deck traversal FORWARD, black to black: every build of every
//      scene, the (slide, build) sequence exactly the running order — all 31
//      scenes, 164 beats.
//   3. Full deck traversal BACKWARD: monotonic, reaching the top.
//   4. The two splice seams, both directions, landings recorded — Scene 23's
//      "Don't trust. Verify." into Scene 24's crossfade, and Scene 30 as the
//      deck's final state with NOTHING AFTER IT (advance at the end is a
//      no-op; the deck stays where it is).
//   5. The six in-act boundaries of Act V, both directions.
//   6. Direct entry at every act-5 build (the engine's own deep-link path),
//      all settled.
//   7. Reduced-motion parity: the same 27 cold entries under
//      prefers-reduced-motion serialize IDENTICALLY to the settled motion-on
//      states (window.__act5's serializer).
//   8. The close's fade is alive: after the advance from the silence, the
//      film's last line is measured MID-FADE — strictly between transparent
//      and opaque — which is what proves the ADAPT's retired build did not
//      cost the legacy's authored 1000ms fade. Under reduced motion the same
//      measurement lands at 1: instantly complete, as it must.
//   9. The silence is black and the last words stand alone: at Scene 30 beat 1
//      no text is on the frame, and at beat 2 the only visible text in the film
//      is "Thank you." — the self-reference ban checked on the live deck, at
//      the film's final state, not only on the archived cell.
//  10. The retired builds are unreachable from the deck: no state drives
//      legacy 4-20 past build 4 or touches 5-01's wayline build.
//
// Usage: node smoke-batch-e.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;

const ACT5 = [
  { id: 'migration', builds: 4 },
  { id: 'the-monetary-premium', builds: 4 },
  { id: 'when-other-assets-do-moneys-job', builds: 9 },
  { id: 'the-marginal-decision', builds: 3 },
  { id: 'fixed-supply-reprices-at-the-margin', builds: 3 },
  { id: 'the-case-from-first-principles', builds: 2 },
  { id: 'the-close', builds: 2 }
];
const EXPECTED_DECK_SLIDES = 31;
const WAS_SLIDES = 32;
// A legacy slide id is `<section>-<nn>-<name>`: it starts with a digit. Every
// scene id is a name. That shape is the assertion — it cannot pass by accident
// if a legacy slide is left behind under a different count.
const LEGACY_ID = /^\d/;

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const result = {
    date: new Date().toISOString(),
    session: 'batch-e',
    deck: null, traversal: null, seams: [], boundaries: [],
    directEntry: [], parity: [], closeFade: null, silence: null, lastFrame: null, retiredBuilds: null,
    consoleErrors: errors
  };
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  // This smoke asserts state, not pixels; serve every raster as a 1×1 so a
  // full-film traversal cannot exhaust the renderer (the proof harness loads
  // the real ones).
  const TINY_PNG = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64');
  await page.route('**/*.png', (route) => route.fulfill({ contentType: 'image/png', body: TINY_PNG }));

  const settled = async () => {
    await page.waitForFunction(() => {
      if (window.__deck && window.__deck.transitioning) return false;
      for (const key of ['__act2', '__act3', '__act4', '__act5', '__exchange', '__prologue']) {
        const a = window[key];
        if (a && typeof a.settled === 'function' && !a.settled()) return false;
      }
      const running = document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending');
      return running.length === 0;
    }, null, { timeout: 40000 });
    await page.waitForTimeout(120);
  };
  const deckState = () => page.evaluate(() => ({
    idx: window.__deck.index, step: window.__deck.buildStep,
    id: window.__deck.slides[window.__deck.index].id
  }));
  const act5State = () => page.evaluate(() => (window.__act5 ? window.__act5.state() : { kind: 'none' }));

  // ---- 1 · the deck boots as the film ----
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  result.deck = await page.evaluate(() => ({
    slides: window.__deck.slides.length,
    firstId: window.__deck.slides[0].id,
    lastId: window.__deck.slides.at(-1).id,
    ids: window.__deck.slides.map((s) => s.id),
    builds: window.__deck.slides.map((s) => s.totalBuildSteps || 0),
    sections: (window.__deck.sections || []).map((s) => ({ id: s.id, label: s.label, n: s.slides.length }))
  }));
  const legacyLeft = result.deck.ids.filter((id) => LEGACY_ID.test(id));
  result.deck.legacySlidesLeft = legacyLeft;
  result.deck.totalBeats = result.deck.builds.reduce((a, b) => a + b + 1, 0);
  console.log(`deck: ${result.deck.slides} slides (was ${WAS_SLIDES}), ${result.deck.totalBeats} beats, ` +
    `first ${result.deck.firstId}, last ${result.deck.lastId}`);
  console.log(`sections: ${result.deck.sections.map((s) => `${s.id}(${s.n})`).join(' · ')}`);
  console.log(`legacy slides left in the running order: ${legacyLeft.length ? legacyLeft.join(', ') : 'NONE'}`);

  // ---- 2 + 3 · the full film, forward and backward ----
  const expected = [];
  result.deck.builds.forEach((max, i) => {
    for (let b = 0; b <= max; b += 1) expected.push([i, b]);
  });
  console.log(`traversal: ${expected.length} states across ${result.deck.slides} scenes`);

  await settled();
  const seen = [await deckState()];
  for (let i = 1; i < expected.length; i += 1) {
    await page.evaluate(() => window.__deck.advance());
    await settled();
    seen.push(await deckState());
  }
  const fwdOk = seen.every((s, i) => s.idx === expected[i][0] && s.step === expected[i][1]);
  const fwdFirstBad = seen.findIndex((s, i) => s.idx !== expected[i][0] || s.step !== expected[i][1]);

  // ---- 4a · Scene 30 is the deck's final state: nothing after it ----
  const atEnd = await deckState();
  await page.evaluate(() => window.__deck.advance());
  await settled();
  const afterEnd = await deckState();
  const endHolds = afterEnd.idx === atEnd.idx && afterEnd.step === atEnd.step &&
    atEnd.idx === result.deck.slides - 1 && atEnd.id === 'the-close';
  result.seams.push({
    name: 'Scene 30 is the deck’s final state — nothing after it',
    at: atEnd, afterAdvance: afterEnd, holds: endHolds
  });
  console.log(`end of film: ${atEnd.id}:${atEnd.step} → advance → ${afterEnd.id}:${afterEnd.step}` +
    ` — ${endHolds ? 'holds' : 'MOVED'}`);

  const seenBack = [];
  for (let i = 0; i < expected.length + 40; i += 1) {
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

  // ---- 4b + 5 · the seams and the in-act boundaries ----
  const indexOf = (id) => page.evaluate((sid) =>
    window.__deck.slides.findIndex((s) => s.id === sid), id);
  const jump = async (id, step) => {
    const idx = await indexOf(id);
    const here = await page.evaluate(() => window.__deck.index);
    if (here !== idx) {
      await page.evaluate((i) => window.__deck.goTo(i), idx);
      await page.waitForFunction((i) => !window.__deck.transitioning && window.__deck.index === i,
        idx, { timeout: 20000 });
    }
    await settled();
    let at = await page.evaluate(() => window.__deck.buildStep);
    while (at > step) {
      await page.evaluate(() => window.__deck.retreatStep(false));
      await settled();
      at = await page.evaluate(() => window.__deck.buildStep);
    }
    while (at < step) {
      await page.evaluate(() => window.__deck.advanceStep(false));
      await settled();
      at = await page.evaluate(() => window.__deck.buildStep);
    }
  };
  const boundary = async (name, fromId, fromStep, act, into) => {
    await jump(fromId, fromStep);
    const before = await deckState();
    await act();
    await settled();
    const after = await deckState();
    const layer = await page.evaluate(() => (window.__act5 ? window.__act5.state().layer : null));
    (into || result.boundaries).push({ name, from: before, to: after, act5Layer: layer });
    console.log(`${name.padEnd(58)} ${before.id}:${before.step} → ${after.id}:${after.step}` +
      `${layer ? `  [${layer}]` : ''}`);
  };

  // The splice seam: Act IV's closing line into Act V's crossfade.
  await boundary('SEAM  S23 end → S24 (the crossfade — the film cuts)', 'the-comparison', 5,
    () => page.evaluate(() => window.__deck.advance()), result.seams);
  await boundary('SEAM  S24 b0 → S23 end (backward across the acts)', 'migration', 0,
    () => page.evaluate(() => window.__deck.retreat()), result.seams);

  const pairs = [
    ['S24 end → S25', 'migration', 3, 'the-monetary-premium'],
    ['S25 end → S26', 'the-monetary-premium', 3, 'when-other-assets-do-moneys-job'],
    ['S26 end → S27', 'when-other-assets-do-moneys-job', 8, 'the-marginal-decision'],
    ['S27 end → S28', 'the-marginal-decision', 2, 'fixed-supply-reprices-at-the-margin'],
    ['S28 end → S29', 'fixed-supply-reprices-at-the-margin', 2, 'the-case-from-first-principles'],
    ['S29 end → S30', 'the-case-from-first-principles', 1, 'the-close']
  ];
  for (const [name, fromId, fromStep, toId] of pairs) {
    await boundary(`${name} (forward)`, fromId, fromStep,
      () => page.evaluate(() => window.__deck.advance()));
    await boundary(`${name.replace('end →', 'b0 ←')} (backward, the handoff)`, toId, 0,
      () => page.evaluate(() => window.__deck.retreat()));
  }

  // ---- 8 · the close's fade is alive ----
  //
  // The ADAPT retires 5-01's build 1, which the legacy contract would read as a
  // reconstruction and snap. Measured here on the live deck: 300ms after the
  // advance the line must be PART WAY through its 1000ms fade.
  const measureFade = async () => {
    await jump('the-close', 0);
    await settled();
    await page.evaluate(() => window.__deck.advanceStep(false));
    await page.waitForTimeout(300);
    const mid = await page.evaluate(() => {
      const el = document.querySelector('.s5c__thanks');
      return el ? parseFloat(getComputedStyle(el).opacity) : null;
    });
    await settled();
    const end = await page.evaluate(() => {
      const el = document.querySelector('.s5c__thanks');
      return el ? parseFloat(getComputedStyle(el).opacity) : null;
    });
    return { mid, end };
  };
  const fadeMotion = await measureFade();
  result.closeFade = {
    motion: fadeMotion,
    fadesRatherThanPops: fadeMotion.mid !== null && fadeMotion.mid > 0.02 && fadeMotion.mid < 0.98,
    settlesOpaque: fadeMotion.end === 1
  };
  console.log(`close fade: 300ms in, opacity ${fadeMotion.mid} → settles ${fadeMotion.end}` +
    ` — ${result.closeFade.fadesRatherThanPops ? 'fades' : 'POPS'}`);

  // ---- 9 · the silence is black on the live deck ----
  await jump('the-close', 0);
  await settled();
  result.silence = await page.evaluate(() => {
    const root = document.querySelector('.deck-slide[data-active="true"]') || document.body;
    // Visibility is a property of the whole ancestor chain, not of one
    // element: the Act V stage keeps its other seven legacy layers mounted and
    // display:none, and a descendant of a hidden element still reports its own
    // display. Walk up to the root, exactly as the states sheet's probe does —
    // otherwise this check reads the text of every layer that is NOT on stage.
    const isShown = (el) => {
      let node = el;
      while (node && node !== root) {
        const cs = getComputedStyle(node);
        if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.02) return false;
        node = node.parentElement;
      }
      return true;
    };
    const shown = [...root.querySelectorAll('*')]
      .filter((el) => el.children.length === 0 && el.textContent.trim().length > 0 && isShown(el))
      .map((el) => el.textContent.trim());
    return { visibleText: shown, textCount: shown.length };
  });
  console.log(`silence: ${result.silence.textCount === 0 ? 'black — no text on the frame'
    : `TEXT PRESENT — ${result.silence.visibleText.join(' | ')}`}`);

  // ---- 9b · the film's last words, on the live deck ----
  //
  // The self-reference ban, checked where it matters most (master §3.5, §5
  // rule 13): at Scene 30 beat 2 the only visible text in the film is "Thank
  // you." — no medium, no sequel, no waypoint, no second line.
  await jump('the-close', 1);
  await settled();
  result.lastFrame = await page.evaluate(() => {
    const root = document.querySelector('.deck-slide[data-active="true"]') || document.body;
    const isShown = (el) => {
      let node = el;
      while (node && node !== root) {
        const cs = getComputedStyle(node);
        if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.02) return false;
        node = node.parentElement;
      }
      return true;
    };
    const shown = [...root.querySelectorAll('*')]
      .filter((el) => el.children.length === 0 && el.textContent.trim().length > 0 && isShown(el))
      .map((el) => el.textContent.trim());
    return { visibleText: shown };
  });
  const BANNED = /\b(video|film|series|episode|slide|deck|presentation|talk|part two|sequel|next time|subscribe|waypoint|road)\b/i;
  result.lastFrame.isThankYouAlone = result.lastFrame.visibleText.length === 1 &&
    result.lastFrame.visibleText[0] === 'Thank you.';
  result.lastFrame.namesNoMedium = !result.lastFrame.visibleText.some((t) => BANNED.test(t));
  console.log(`last frame: ${JSON.stringify(result.lastFrame.visibleText)}` +
    ` — ${result.lastFrame.isThankYouAlone ? 'two words, alone' : 'NOT ALONE'}` +
    `, ${result.lastFrame.namesNoMedium ? 'names no medium' : 'NAMES A MEDIUM'}`);

  // ---- 10 · the retired builds are unreachable ----
  const maxs = await page.evaluate(async () => {
    const mod = await import('/src/scenes/act-5-the-case/_caseStage.js');
    const per = {};
    Object.values(mod.STATES).forEach((states) => {
      states.forEach((st) => { per[st.layer] = Math.max(per[st.layer] ?? -1, st.build); });
    });
    const s501 = [];
    Object.values(mod.STATES).forEach((states) => {
      states.forEach((st) => { if (st.layer === 's501') s501.push(st.build); });
    });
    return { per, s501 };
  });
  result.retiredBuilds = {
    maxBuildPerLayer: maxs.per,
    s420StopsAt4: maxs.per.s420 === 4,
    s501BuildsUsed: maxs.s501,
    waylineNeverShown: !maxs.s501.includes(1),
    note: 'legacy 4-20 builds 5–7 (the stability contrast, Ruling 5) and 5-01 build 1 (the wayline, Ruling 1) appear in no state'
  };
  console.log(`retired builds: 4-20 max ${maxs.per.s420} (must be 4) · 5-01 uses ${maxs.s501.join(',')}` +
    ` (must not include 1)`);

  // ---- 6 + 7 · direct entry at every act-5 build, then parity ----
  const enterCold = async (sceneId, build) => {
    let last = null;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        await page.goto(`${BASE}/?slide=${sceneId}`, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
          null, { timeout: 15000 });
        const idx = await page.evaluate(() => window.__deck.index);
        await page.evaluate(([i, b]) => {
          sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
        }, [idx, build]);
        await page.goto(`${BASE}/?slide=${sceneId}`, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => window.__deck, null, { timeout: 15000 });
        await settled();
        last = await deckState();
        if (last.id === sceneId && last.step === build) return act5State();
      } catch (err) {
        last = { err: String(err) };
      }
      if (attempt < 3) console.log(`  retrying direct entry ${sceneId}:${build}`);
    }
    throw new Error(`direct entry ${sceneId}:${build} landed at ${JSON.stringify(last)}`);
  };

  const motionStates = {};
  for (const sc of ACT5) {
    for (let b = 0; b < sc.builds; b += 1) {
      motionStates[`${sc.id}:${b}`] = await enterCold(sc.id, b);
      result.directEntry.push(`${sc.id}:${b}`);
    }
  }
  console.log(`direct entry: ${result.directEntry.length} builds mounted cold, all settled`);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  let parityFailures = 0;
  for (const sc of ACT5) {
    for (let b = 0; b < sc.builds; b += 1) {
      const key = `${sc.id}:${b}`;
      const reduced = await enterCold(sc.id, b);
      const same = JSON.stringify(reduced) === JSON.stringify(motionStates[key]);
      result.parity.push({ state: key, identical: same });
      if (!same) {
        parityFailures += 1;
        console.log(`PARITY MISMATCH at ${key}`);
        fs.writeFileSync(path.join(__dirname, `parity-${sc.id}-${b}.json`),
          JSON.stringify({ motion: motionStates[key], reduced }, null, 2));
      }
    }
  }
  console.log(`reduced-motion parity: ${result.parity.length - parityFailures}/${result.parity.length} identical`);

  // The same fade, with motion off: it must land instantly and completely.
  const fadeReduced = await measureFade();
  result.closeFade.reduced = fadeReduced;
  result.closeFade.reducedIsInstant = fadeReduced.mid === 1 && fadeReduced.end === 1;
  console.log(`close fade (reduced motion): 300ms in, opacity ${fadeReduced.mid}` +
    ` — ${result.closeFade.reducedIsInstant ? 'instant, as it must be' : 'NOT INSTANT'}`);

  fs.writeFileSync(path.join(__dirname, '..', 'smoke-batch-e.json'), JSON.stringify(result, null, 2));
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();

  const failed = errors.length ||
    result.deck.slides !== EXPECTED_DECK_SLIDES ||
    result.deck.lastId !== 'the-close' ||
    legacyLeft.length ||
    !fwdOk || !backOk || !backMonotonic || !endHolds || parityFailures ||
    !result.closeFade.fadesRatherThanPops || !result.closeFade.settlesOpaque ||
    !result.closeFade.reducedIsInstant ||
    result.silence.textCount !== 0 ||
    !result.lastFrame.isThankYouAlone || !result.lastFrame.namesNoMedium ||
    !result.retiredBuilds.s420StopsAt4 || !result.retiredBuilds.waylineNeverShown;
  process.exit(failed ? 1 : 0);
})();
