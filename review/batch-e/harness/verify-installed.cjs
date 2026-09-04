// Batch E — the installed deck verified: protected lines, notes, self-reference
// (docs/batch-e-implementation-brief.md §3).
//
// The foundation's harness (review/act-5/harness/script-install.cjs) proved the
// PACKAGE against the legacy sources. This one proves the DECK: the scripts as
// they are actually installed in the seven Act V scene modules that now ship,
// and the one protected line that stands on screen rather than in a script.
//
// Every string it compares against is READ FROM AN AUTHORITY, never retyped
// here — the architecture and the master for the protected lines, the legacy
// source for the on-screen conclusion, the package for the scripts. A harness
// that types the line it is checking proves only that it can type.
//
// What it checks:
//   INSTALLED   the seven scene modules' notes are the package's §2 blocks,
//               character for character, and the act is 27 arrows — one per
//               beat, matching the frozen map and each scene's totalBuildSteps.
//   PROTECTED   the rules line, once, in Scene 29, immediately before "The case
//               is not that the price will behave."; the conclusion on screen
//               at Scene 29 beat 2, character for character with its two accent
//               terms; the callback opening Scene 30; the covenant and the
//               disclaimer; the film ending on "Thank you."; the road sentence
//               cut; the asked-calmly line at its relocated home; "The monetary
//               competition is decided at the margin." spoken and never staged;
//               "Don't trust. Verify." on stage exactly once in the whole film.
//   BAN         the self-reference sweep over all seven installed scripts, and
//               hardest over the close: no medium, no sequel, no waypoint.
//   HYGIENE     no `L1:` artifacts, no retired legacy ids, no absolute slide
//               numbers in any installed Act V note.
//
// Usage: node verify-installed.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const REPO = path.join(__dirname, '..', '..', '..');

const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8').replace(/\r\n/g, '\n');

const SCENES = [
  ['S24', 'migration', '24-migration.js', 4],
  ['S25', 'the-monetary-premium', '25-the-monetary-premium.js', 4],
  ['S26', 'when-other-assets-do-moneys-job', '26-when-other-assets-do-moneys-job.js', 9],
  ['S27', 'the-marginal-decision', '27-the-marginal-decision.js', 3],
  ['S28', 'fixed-supply-reprices-at-the-margin', '28-fixed-supply-reprices-at-the-margin.js', 3],
  ['S29', 'the-case-from-first-principles', '29-the-case-from-first-principles.js', 2],
  ['S30', 'the-close', '30-the-close.js', 2]
];

const results = [];
let failed = 0;
function check(name, ok, detail = '') {
  results.push({ name, ok: Boolean(ok), detail });
  if (!ok) failed += 1;
  console.log(`${ok ? '  ok' : 'FAIL'}  ${name}${detail ? ` :: ${detail}` : ''}`);
}

// ---- the installed notes ---------------------------------------------------
const notesOf = (src) => {
  const i = src.lastIndexOf('notes: `');
  const start = i + 'notes: `'.length;
  return src.slice(start, src.indexOf('`', start));
};
const installed = {};
SCENES.forEach(([key, , file]) => {
  installed[key] = notesOf(read(`src/scenes/act-5-the-case/${file}`));
});

// The package's own §2 blocks — the authority the installer injects from.
function packageScripts() {
  const pkg = read('docs/batch-e-package.md');
  const section = pkg.slice(pkg.indexOf('# 2. Scripts'), pkg.indexOf('\n# 3. '));
  const keys = SCENES.map(([k]) => k);
  const out = {};
  keys.forEach((key, i) => {
    const start = section.indexOf(`\n## ${key} — `);
    const nextKey = keys[i + 1] ? `\n## ${keys[i + 1]} — ` : null;
    const end = nextKey ? section.indexOf(nextKey, start) : -1;
    const block = section.slice(start, end < 0 ? section.length : end);
    const paras = block.split('\n\n').map((p) => p.trim()).filter(Boolean).slice(1);
    const passageAt = paras.findIndex((p) => p.startsWith('**[Spoken'));
    out[key] = paras
      .filter((p, j) => p.startsWith('[→]') || (key === 'S26' && passageAt > -1 && j >= passageAt))
      .join('\n\n');
  });
  return out;
}

(async () => {
  // ---- INSTALLED -----------------------------------------------------------
  const pkg = packageScripts();
  const mismatched = SCENES.filter(([k]) => installed[k] !== pkg[k]).map(([k]) => k);
  check('INSTALLED: all seven scene modules carry the package’s §2 script character for character',
    mismatched.length === 0, mismatched.join(', ') || '7/7 identical');

  const arrows = Object.fromEntries(SCENES.map(([k]) => [k, (installed[k].match(/\[→\]/g) || []).length]));
  const beatsOk = SCENES.every(([k, , , beats]) => arrows[k] === beats);
  check('INSTALLED: every beat is exactly one arrow — S24 4 · S25 4 · S26 9 · S27 3 · S28 3 · S29 2 · S30 2, the frozen map',
    beatsOk, SCENES.map(([k, , , b]) => `${k} ${arrows[k]}/${b}`).join(' · '));
  const total = Object.values(arrows).reduce((a, b) => a + b, 0);
  check('INSTALLED: Act V is 27 beats', total === 27, String(total));

  // ---- PROTECTED: the rules line -------------------------------------------
  // The authority is the architecture's own sentence (Ruling 5) — read, not typed.
  const arch = read('docs/synthesis-architecture.md');
  const rulesLine = arch.match(/\*"(Bitcoin does not fix its price\.[^"]*?)"\*/)[1].trim();
  const s29 = installed.S29;
  check('PROTECTED: the rules line stands in Scene 29’s installed script, exactly once',
    s29.split(rulesLine).length - 1 === 1, rulesLine);
  check('PROTECTED: it sits immediately before "The case is not that the price will behave." (Row 3, ruled A)',
    s29.includes(`${rulesLine} The case is not that the price will behave.`));
  check('PROTECTED: the three sentences after it stay together, so "in eleven words" still points at the pair beside it',
    /The case is not that the price will behave\. Price should be free to move\. The monetary rules should be hard to move\. That’s the whole case, in eleven words/.test(s29));
  const stagedRules = SCENES.filter(([k]) => k !== 'S29').some(([k]) => installed[k].includes(rulesLine));
  check('PROTECTED: no other Act V script carries it, and no Act V scene stages it (Ruling 5: script, not frame)',
    !stagedRules);

  // ---- PROTECTED: the on-screen conclusion, from the legacy source ----------
  const src423 = read('src/slides/section-4-ideal-store/23-investment-case-from-first-principles.js');
  const conclusionParts = [
    src423.match(/conclusion\.append\('([^']*replace everything\.)'\)/)[1],
    src423.match(/conclusion\.append\('(It only needs to become the )'\)/)[1],
    src423.match(/preferred\.textContent = '([^']*)'/)[1],
    src423.match(/conclusion\.append\('(to store the )'\)/)[1],
    src423.match(/nextUnit\.textContent = '([^']*)'/)[1]
  ];
  const wantedConclusion = `${conclusionParts[0]}${conclusionParts[1]}${conclusionParts[2]}${conclusionParts[3]}${conclusionParts[4]}.`;

  // ---- PROTECTED: the close ------------------------------------------------
  const src501 = read('src/slides/section-5-close/01-thank-you.js');
  const legacyClose = notesOf(src501);
  const callback = legacyClose.match(/(An hour ago I told you something strange:[^]*?Now you can define it\.)/)[1];
  const covenant = legacyClose.match(/(That framework is yours now\.[^]*?the education you were never given\.)/)[1];
  const roadSentence = legacyClose.match(/(There’s the whole road — all three questions, kept\.)/)[1];
  const s30 = installed.S30;
  check('PROTECTED: the callback opens Scene 30’s first beat — nothing stands before it',
    s30.startsWith(`[→] ${callback}`), callback.slice(0, 60) + '…');
  check('PROTECTED: the covenant and the disclaimer stand verbatim in Scene 30’s second beat',
    s30.includes(covenant));
  check('PROTECTED: the film’s script ends on "Thank you."', s30.trim().endsWith('Thank you.'));
  check('PROTECTED: the road sentence is cut — the one ruled change — and survives only in the legacy source',
    !s30.includes(roadSentence) && !s30.includes('whole road') && src501.includes(roadSentence));
  check('PROTECTED: "you won’t be able to stop" stands as the legacy words',
    /Here’s the last thing I’ll tell you about seeing money this way: you won’t be able to stop\./.test(s30));

  // ---- PROTECTED: the marginal decision ------------------------------------
  const s27 = installed.S27;
  const src421 = read('src/slides/section-4-ideal-store/21-marginal-store-of-value-decision.js');
  check('PROTECTED: "The monetary competition is decided at the margin." is spoken at Scene 27',
    /The monetary competition is decided at the margin\./.test(s27));
  const stagedMargin = /textContent = '[^']*monetary competition is decided at the margin/.test(src421);
  check('PROTECTED: it is on no on-screen string of the scene’s source — spoken-only holds (master §3.7)', !stagedMargin);
  check('PROTECTED: the asked-calmly line stands at its relocated home (R7)',
    /you’re just asking it calmly, in advance, with time to think\./.test(s27));

  // ---- HYGIENE -------------------------------------------------------------
  const allNotes = SCENES.map(([k]) => installed[k]).join('\n\n');
  check('HYGIENE: no "L1:" transcript artifacts in any installed Act V note', !/\bL1:/.test(allNotes));
  const retiredIds = /(4-0\d|4-1\d|4-2\d|5-01|3-0\d|2-0\d|1-0\d)-[a-z]/.test(allNotes);
  check('HYGIENE: no retired legacy slide id appears in any installed note', !retiredIds);
  const absoluteNumbers = /\b(slide|frame)\s+\d{1,2}\b/i.test(allNotes);
  check('HYGIENE: no absolute slide numbers in any installed note', !absoluteNumbers);

  // ---- BAN: the self-reference sweep ---------------------------------------
  //
  // The foundation's own patterns, re-run against the INSTALLED deck — the same
  // two regexes review/act-5/harness/script-install.cjs swept the package with,
  // so "re-verified" means the same check on the shipping text rather than a
  // new and differently drawn one.
  //
  // THE MARKER IS SET ASIDE, as it was there. Scene 26 carries one bold
  // bracketed paragraph — the stage direction that places the falsifiability
  // passage — and it is written FOR the presenter, not spoken TO the audience:
  // it says the beat "left the deck for the script" and that the line is "on
  // stage once, at Scene 23's table". Those are the words of the instruction,
  // and sweeping them would be checking the label rather than the speech.
  const MARKER = /\*\*\[[\s\S]*?\]\*\*/g;
  const spoken = Object.fromEntries(SCENES.map(([k]) => [k, installed[k].replace(MARKER, '')]));
  const MEDIUM = /\b(this presentation|these slides|my updated slides|this deck|this video|this talk|this film|one slide ago|the rest of the evening|tonight|this section|whole section|this chapter|section \d)\b/i;
  const CLOSE_BAN = /\b(sequel|next time|part two|see you|subscribe|the whole road|waypoint|three questions|slides?|presentation|video|talk|film|deck|chapter)\b/i;
  const mediumHits = SCENES.filter(([k]) => MEDIUM.test(spoken[k]))
    .map(([k]) => `${k}: "${spoken[k].match(MEDIUM)[0]}"`);
  check('BAN: no installed Act V script names the medium, the live delivery or a section (the marker set aside)',
    mediumHits.length === 0, mediumHits.join(' · ') || 'all seven scripts clean');

  const closeHits = spoken.S30.match(CLOSE_BAN);
  check('BAN: the close names no medium, no sequel, no waypoint — checked hardest here (master §5 rule 13)',
    !closeHits, closeHits ? `"${closeHits[0]}"` : 'clean');
  check('BAN: the marker Scene 26 carries is a stage direction, not speech — it holds no advance',
    !/\[→\]/.test((installed.S26.match(MARKER) || [''])[0]));

  // The two ledger substitutions, still applied in the installed deck.
  check('BAN: the two self-reference substitutions are still in place — "this whole inquiry began from" and "the last few minutes"',
    /which is precisely the diagnosis this whole inquiry began from/.test(installed.S25) &&
    !/diagnosis this whole section began from/.test(installed.S25) &&
    /I’ve spent the last few minutes answering objections\./.test(installed.S26) &&
    !/I’ve spent this whole section answering objections\./.test(installed.S26));

  // ---- the live deck: the on-screen protected line and the one "Verify." ----
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  const enter = async (sceneId, build) => {
    await page.goto(`${BASE}/?slide=${sceneId}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
      null, { timeout: 30000 });
    const idx = await page.evaluate(() => window.__deck.index);
    await page.evaluate(([i, b]) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
    }, [idx, build]);
    await page.goto(`${BASE}/?slide=${sceneId}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
    await page.waitForFunction(() => {
      if (window.__deck.transitioning) return false;
      const a = window.__act5;
      if (a && !a.settled()) return false;
      return document.getAnimations().filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
  };

  await enter('the-case-from-first-principles', 1);
  const frame = await page.evaluate(() => {
    const el = document.querySelector('.deck-slide[data-active="true"] .s4-investment-case__conclusion');
    if (!el) return null;
    return {
      text: el.textContent,
      accents: [...el.querySelectorAll('strong')].map((s) => s.textContent),
      lineBreaks: el.querySelectorAll('br').length
    };
  });
  check('PROTECTED (on screen): the conclusion at Scene 29 beat 2 is the frozen final frame, character for character',
    frame && frame.text === wantedConclusion,
    frame ? JSON.stringify(frame.text) : 'NOT FOUND');
  check('PROTECTED (on screen): its two accent terms are "preferred place" and "next unit of value", across three authored lines',
    frame && frame.accents.length === 2 &&
    frame.accents[0] === conclusionParts[2] && frame.accents[1] === conclusionParts[4] &&
    frame.lineBreaks === 2,
    frame ? `${frame.accents.join(' | ')} · ${frame.lineBreaks} breaks` : 'NOT FOUND');

  // "Don't trust. Verify." — on stage exactly once in the whole film.
  //
  // Walked, not sampled: the deck is driven forward from the FIRST state
  // through every build of every scene by its own advance, exactly as the smoke
  // traverses it, and the rendered frame is read at each state. The start is
  // asserted, because the checks above deep-link and the engine persists every
  // landing — a walk that quietly began at Scene 29 would have reported the
  // film's one on-stage "Verify." as absent. Visibility is walked up the ancestor
  // chain, because each act stage keeps its other legacy layers mounted and
  // hidden — a per-element style test would read text that is not on screen.
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => sessionStorage.removeItem('deck-state'));
  await page.goto(`${BASE}/?slide=1`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
    null, { timeout: 30000 });
  const startedAt = await page.evaluate(() => ({ i: window.__deck.index, b: window.__deck.buildStep }));
  if (startedAt.i !== 0 || startedAt.b !== 0) {
    throw new Error(`the walk must start at the top; it started at ${startedAt.i}:${startedAt.b}`);
  }
  const settledDeck = async () => {
    await page.waitForFunction(() => {
      if (window.__deck.transitioning) return false;
      for (const key of ['__act2', '__act3', '__act4', '__act5', '__exchange', '__prologue']) {
        const a2 = window[key];
        if (a2 && typeof a2.settled === 'function' && !a2.settled()) return false;
      }
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
    await page.waitForTimeout(60);
  };
  const readsVerify = () => page.evaluate(() => {
    const root = document.querySelector('.deck-slide[data-active="true"]');
    if (!root) return false;
    const isShown = (el) => {
      let n = el;
      while (n && n !== root) {
        const cs = getComputedStyle(n);
        if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.02) return false;
        n = n.parentElement;
      }
      return true;
    };
    // The line is two elements on the frame, not one — the legacy sets
    // "Don’t trust." and "Verify." as separate spans so the second can carry
    // its own voice. So the frame's visible text is joined and tested whole,
    // rather than looking for both halves inside a single leaf.
    const text = [...root.querySelectorAll('*')]
      .filter((el) => el.children.length === 0 && isShown(el) && el.textContent.trim())
      .map((el) => el.textContent.trim())
      .join(' ');
    return /Don’t trust\.\s*Verify\./.test(text);
  });

  const totalStates = await page.evaluate(() =>
    window.__deck.slides.reduce((acc, sl) => acc + (sl.totalBuildSteps || 0) + 1, 0));
  const onStage = [];
  await settledDeck();
  for (let i = 0; i < totalStates; i += 1) {
    if (i > 0) {
      await page.evaluate(() => window.__deck.advance());
      await settledDeck();
    }
    if (await readsVerify()) {
      const at = await page.evaluate(() => ({
        id: window.__deck.slides[window.__deck.index].id, b: window.__deck.buildStep
      }));
      onStage.push(`${at.id}:${at.b}`);
    }
  }
  const scenesOnStage = [...new Set(onStage.map((x) => x.split(':')[0]))];
  check('PROTECTED (on screen): "Don’t trust. Verify." stands on stage in exactly one scene of the whole film',
    scenesOnStage.length === 1, onStage.join(' · ') || 'NOWHERE');
  check('PROTECTED (on screen): that scene is Scene 23, the table',
    scenesOnStage.length === 1 && scenesOnStage[0] === 'the-comparison', scenesOnStage.join(', ') || '—');
  const mentionOnly = /That’s what “Don’t trust\. Verify\.” means when it’s meant\./.test(installed.S26);
  check('PROTECTED: Act V names it only as a spoken mention, in the falsifiability passage', mentionOnly);

  await browser.close();
  check('CONSOLE: no errors while verifying the installed deck', errors.length === 0, String(errors.length));

  fs.writeFileSync(path.join(__dirname, '..', 'verify-installed.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'batch-e',
    scope: 'the installed deck — the seven Act V scene modules that ship, and the one protected line that stands on screen',
    passed: results.length - failed,
    of: results.length,
    checks: results,
    onScreenConclusion: frame,
    verifyOnStage: onStage,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${results.length - failed}/${results.length} installed-deck checks green`);
  process.exit(failed || errors.length ? 1 : 0);
})();
