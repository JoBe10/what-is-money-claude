// R7.3 — the brightness gate (§9.4 rule 10, brief §2).
//
// The presenter's fresh-eyes review found whole frames rendering at a third of
// full voice: the record's stops, the contenders under their wounds, the
// pattern's thesis. Two rules came out of it, and both are measurable, which is
// the only reason they are worth writing down:
//
//   1. THE LEGIBILITY FLOOR. No element that has landed and is then dimmed
//      settles below 55% of full warmth. Dimming means recede, never vanish.
//   2. THE LAST-LIT INVARIANT. The most recently landed text element of any
//      build renders at full brightness. Dimming applies only to what came
//      before it.
//
// The measurement is one number per element: its *effective alpha* — the alpha
// channel of its computed color multiplied by every opacity between it and the
// slide root. That is what the eye reads on a black stage, and it collapses the
// three different ways this deck dims something (a color token swap, an opacity
// on the element, an opacity on an ancestor) into one comparable quantity.
//
// What counts as ink: a text leaf, or an element that directly carries an SVG
// mark (the glyph wrappers, which set `color` and let currentColor do the rest).
// Ink drawn as a background — the rail's marker dots, its line, the tower's
// slabs — is deliberately out of scope: `background-color` composites against
// whatever is behind it and is not comparable to a text alpha, and none of it
// is what the review was about. That exclusion is stated rather than silent.
//
// Four exemptions, each of them a designed state rather than a loosening, and
// each declared rather than inferred:
//
//   · A scene layer that has handed the frame to a superseding scene: the rail
//     beneath the risen periodic table (2.5, `data-dimmed` on the rail root)
//     and the exchange triangle under its own summary lines (2.2,
//     `data-yielded`). Nothing on either is being read; it is a handoff, not a
//     dim. §9.4 rule 10 sanctions it, and both layers say so in the DOM.
//   · A canvas field, where the collective state of the members *is* the
//     argument: the periodic table's cells going out wave by wave, the hours
//     grid's units. Nobody reads "Md" at the end of 2.5; they read "the field
//     went dark and two are left." Elimination is not recession.
//   · An overlay marked `data-exiting`, which is at opacity 0 the instant it is
//     marked and gone 650ms later. It describes how a frame arrived.
//   · Clearing. An element that goes to (effectively) zero has been cleared,
//     which §9.4 rule 1 sanctions in the same breath as dimming. The floor
//     governs what stays on screen; it has nothing to say about what leaves.
//
// And two definitions that matter:
//
//   · An element is "dimmed" only if it is dimmer than it was when it landed.
//     The deck's quiet tokens — `--text-muted` on a sub-line, a kicker at half
//     voice — are not dimmed priors, they are elements designed quiet, and the
//     floor is not a minimum brightness for the deck. The one addition is the
//     rail's `defeated` state, which the brief names alongside "dimmed prior"
//     precisely because a stop can arrive already defeated on a later slide:
//     it was dimmed on the slide that lit it, and the scene layer carried it.
//   · Rule 2 speaks about *statements*. A build's sentence is prose — twenty
//     characters or more — not a two-letter element symbol, a stop label or a
//     kicker, which are the deck's quiet registers (§9.4 rule 5) and land quiet
//     by design. A build that lands no statement lands a diagram beat or a
//     camera move, and has no "most recently landed" sentence to be tested on.
//
// Usage: node bright-r7-3.cjs [--port 4319] [--slides 2-,3-] [--settle 2000]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '4319');
const BASE = `http://localhost:${PORT}`;
const ONLY = (flag('--slides', '') || '').split(',').map((s) => s.trim()).filter(Boolean);
// 2700ms, the same value the R7 verify suite settled on and for the same
// reason: Section 2's gas drift runs to 2500ms and the rail's camera tween to
// 1700ms, and a frame sampled before it has settled measures a transition
// rather than a state. At 2000ms the census jittered by a dozen entries between
// runs — half of Section 4's carrier slides reported departures that were
// mid-transition opacities. A baseline that moves between runs is not a
// baseline, so this number is load-bearing.
const SETTLE = Number(flag('--settle', '2700'));
const OUT = path.join(__dirname, '..');

// The floor, and what counts as full. 0.55 is the brief's number; FULL is what
// "renders at full brightness" means for a white-ink deck — 0.92 rather than
// 1.0 so a 0.95-opacity landing state is not litigated as a failure.
const FLOOR = 0.55;
const FULL = 0.92;
// Below this an element is gone, not dim.
const CLEARED = 0.03;
// Alpha differences under this are rounding, not dimming.
const EPS = 0.02;
// A build's sentence, as opposed to a label, a symbol or a kicker.
const STATEMENT_CHARS = 20;
// Canvas fields: containers whose members' collective state is the argument.
const FIELDS = ['.s2o-elements', '.unit-field-grid'];

// ------------------------------------------------------------------ SCOPE
//
// The rule is new and the deck is not. Running it over all 46 slides found 131
// departures on 26 of them, and every one is a state that predates the rule —
// the brief scoped the *fixes* to the rail and the pattern and the *gate* to
// the whole deck, which is exactly how a backlog gets discovered.
//
// So the gate does two things and keeps them apart. Over ENFORCED — the slides
// this phase was briefed to fix, plus the two the deck-wide run turned up and
// that were fixed with it — a departure is a failure. Everywhere else it is
// counted against a **declared baseline**: the per-slide census below, measured
// on 11 August 2026, printed in full into bright-r7-3.json, and reported to the
// presenter as a decision he has not yet been asked to make. A slide over its
// baseline fails; a slide under it lowers the number.
//
// A baseline is not an exemption. It is a count that cannot go up silently, and
// it makes the backlog visible and finishable instead of invisible and
// permanent. The two idioms behind it are named in the report:
//
//   · a dimmed prior settling to --text-dim (0.30) or 0.50 — the same murk the
//     presenter flagged on the rail, in frames where a bright statement still
//     dominates, which is probably why he did not flag them;
//   · a statement landing at --text-secondary (0.75) beneath a question or
//     header still at full brightness. On several of those the header is a
//     standing subject and the statements accumulate under it, which §9.4 rule 1
//     already recognizes as "one accumulating element" — the last-lit rule may
//     need to name that shape before those frames can be called wrong.
const ENFORCED = [
  '2-02-the-discovery', '2-03-the-convergence', '2-04-the-competition-record',
  '2-05-two-survivors', '2-06-the-abstraction-ladder', '2-07-the-severance',
  '2-08-the-pattern', '3-01-the-three-functions', '3-02-the-functions-separate',
  '4-22-fixed-supply-reprices-at-margin'
];
const BASELINE = {
  '1-03-what-is-money': 6,
  '1-05-the-promise': 7,
  '3-00-waypoint-function': 2,
  '3-03-the-order-of-monetization': 4,
  '3-04-stage-signatures': 1,
  '3-05-the-palladium-test': 2,
  '3-06-what-your-money-is': 13,
  '3-07-where-bitcoin-is': 3,
  '3-08-waypoint-judge': 3,
  '4-01-define-the-job': 1,
  '4-03-simple-exchange': 4,
  '4-04-unfinished-exchange': 3,
  '4-05-spend-or-save': 3,
  '4-06-claim-and-carrier': 10,
  '4-07-store-of-value-function': 8,
  '4-08-100-year-test': 1,
  '4-09-future-is-unknowable': 7,
  '4-15-framework-to-comparison': 4,
  '4-18-monetary-premium': 16,
  '4-20-bitcoin-does-not-replace-everything': 12,
  '5-01-thank-you': 1
};

const inkInPage = ({ FIELDS, STATEMENT_CHARS }) => {
  const root = document.querySelector('.deck-slide[data-active="true"]') ||
    document.querySelector('.deck-slide');
  if (!root) return null;

  const alphaOf = (color) => {
    const m = /^rgba?\(([^)]+)\)$/.exec(color);
    if (!m) return 1;
    const parts = m[1].split(',').map((s) => Number(s.trim()));
    return parts.length > 3 ? parts[3] : 1;
  };

  const out = [];
  const walk = (el, pathKey) => {
    const kids = [...el.children];
    kids.forEach((kid, i) => walk(kid, `${pathKey}/${i}`));

    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;

    const ownText = [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent)
      .join('')
      .trim();
    const carriesMark = kids.some((k) => k.tagName && k.tagName.toLowerCase() === 'svg');
    if (!ownText && !carriesMark) return;

    // Effective alpha: the ink's own color alpha through every opacity above it.
    let alpha = alphaOf(cs.color);
    let p = el;
    let exiting = false;
    let handedOff = false;
    let defeated = false;
    let upcoming = false;
    while (p && p !== document.body) {
      const pcs = getComputedStyle(p);
      alpha *= Number(pcs.opacity);
      if (p.dataset) {
        if (p.dataset.exiting === 'true') exiting = true;
        if (p.dataset.dimmed && p.dataset.dimmed !== 'false') handedOff = true;
        if (p.dataset.yielded === 'true') handedOff = true;
        if (p.dataset.state === 'defeated') defeated = true;
        if (p.dataset.state === 'upcoming') upcoming = true;
      }
      p = p.parentElement;
    }
    if (exiting) return;
    const inField = FIELDS.some((sel) => el.closest(sel));
    // An `upcoming` stop is the record's future, deliberately ghosted ahead of
    // the camera. It has not landed, so it is neither a dimmed prior nor a
    // statement — the floor and the last-lit rule both start at its arrival.
    if (upcoming) return;

    const cls = el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className;
    out.push({
      key: `${pathKey}|${cls}|${(ownText || 'MARK').slice(0, 34)}`,
      text: (ownText || `«${cls}»`).slice(0, 60),
      alpha: Number(alpha.toFixed(4)),
      // The line this ink belongs to. A line can be two leaves — 3.1 sets
      // "STORE OF VALUE" at full brightness and "— moves value through time."
      // at the muted tone inside one <p>, which is one line in two voices, not
      // a dimmed statement. Rule 2 asks whether the *line* is at full voice.
      line: pathKey.slice(0, pathKey.lastIndexOf('/')) || '/',
      handedOff,
      defeated,
      inField,
      // A statement is the build's sentence: prose, not a label, a symbol or a
      // kicker. Length alone let "dollars · real estate" through, so it also
      // has to end like a sentence. Rule 2 is about which sentence is spoken.
      statement: ownText.length >= STATEMENT_CHARS && /[.?!]["'’)]?$/.test(ownText) &&
        !/kicker/.test(String(cls)) && !inField && !handedOff
    });
  };
  walk(root, '');
  return out;
};

const results = [];
const backlog = [];
let currentSlide = null;
function check(name, ok, detail) {
  // Outside the enforced scope a departure is census, not verdict — recorded
  // with its numbers, counted against the slide's declared baseline below.
  if (!ok && currentSlide && !ENFORCED.includes(currentSlide)) {
    backlog.push({ slide: currentSlide, name, detail: String(detail) });
    return;
  }
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  if (!ok) console.log(`FAIL  ${name} :: ${detail}`);
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  let page = await context.newPage();
  const consoleLines = [];
  const attach = (p) => {
    p.on('console', (m) => {
      if ((m.type() === 'error' || m.type() === 'warning') && !m.text().startsWith('[vite]')) {
        consoleLines.push(`[${m.type()}] ${m.text()}`);
      }
    });
    p.on('pageerror', (e) => consoleLines.push(`[pageerror] ${e.message}`));
  };
  attach(page);

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  const manifest = (await page.evaluate(() => window.__deck.slides.map((s, i) => ({
    n: i + 1, id: s.id, builds: s.totalBuildSteps || 0
  })))).filter((s) => !ONLY.length || ONLY.some((p) => s.id.startsWith(p)));

  const report = [];
  let nav = 0;
  for (const slide of manifest) {
    currentSlide = slide.id;
    // key → { landed: build, landedAlpha, text, byBuild: Map }
    const seen = new Map();
    const builds = [];
    for (let b = 0; b <= slide.builds; b += 1) {
      if (nav && nav % 12 === 0) {
        const old = page;
        page = await context.newPage();
        attach(page);
        await old.close();
      }
      nav += 1;
      await page.goto(`${BASE}/?slide=${slide.id}`, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
      await page.evaluate(({ n, k }) => {
        sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
      }, { n: slide.n, k: b });
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
      await page.waitForTimeout(SETTLE);
      const ink = await page.evaluate(inkInPage, { FIELDS, STATEMENT_CHARS });
      builds.push(new Map((ink || []).map((r) => [r.key, r])));
    }

    builds.forEach((frame, b) => {
      const landedHere = [];
      frame.forEach((row, key) => {
        if (row.alpha <= CLEARED) return;
        const prev = seen.get(key);
        if (!prev) {
          seen.set(key, { landed: b, landedAlpha: row.alpha, text: row.text });
          // A stop that arrives already `defeated` — every rail slide after the
          // record forms — has not landed here; it landed on the slide that lit
          // it, and the scene layer carried it across. It is a dimmed prior
          // wherever it appears, which is why the brief names `defeated`
          // alongside "dimmed prior" in the floor rule.
          if (!row.defeated) landedHere.push(row);
        }
        // Rule 1 — the legibility floor: anything dimmer than it landed, plus
        // anything in the defeated state by definition.
        const landedAlpha = prev ? prev.landedAlpha : row.alpha;
        const dimmed = row.alpha < landedAlpha - EPS;
        if ((dimmed || row.defeated) && row.alpha < FLOOR - EPS && !row.handedOff && !row.inField) {
          check(`${slide.id} b${b}: dimmed element holds the legibility floor — "${row.text}"`,
            false,
            `α ${row.alpha.toFixed(2)}${dimmed ? ` (landed ${landedAlpha.toFixed(2)} at b${prev ? prev.landed : b})` : ' (defeated)'}; floor ${FLOOR}`);
        }
      });

      // Rule 2 — the last-lit invariant. A build that lands no statement is a
      // camera move, a diagram beat or a field wave, and has no "most recently
      // landed" sentence of its own; the rule speaks about builds that land one.
      //
      // Measured per *line*: a statement's brightness is the brightest ink on
      // the line it belongs to, so a line set in two voices is judged by the
      // voice it speaks in.
      const lineMax = new Map();
      frame.forEach((row) => {
        lineMax.set(row.line, Math.max(lineMax.get(row.line) || 0, row.alpha));
      });
      const statements = landedHere.filter((r) => r.statement);
      if (b > 0 && statements.length) {
        const brightest = statements.reduce((m, r) =>
          ((lineMax.get(r.line) || r.alpha) > (lineMax.get(m.line) || m.alpha) ? r : m), statements[0]);
        const alpha = lineMax.get(brightest.line) || brightest.alpha;
        check(`${slide.id} b${b}: the statement that just landed is at full brightness`,
          alpha >= FULL,
          `brightest of ${statements.length} new statement(s): α ${alpha.toFixed(2)} — "${brightest.text}"`);
      }
    });

    const floorRows = [];
    builds.forEach((frame, b) => frame.forEach((row, key) => {
      const prev = seen.get(key);
      if (prev && row.alpha > CLEARED && row.alpha < prev.landedAlpha - EPS) {
        floorRows.push({ build: b, text: row.text, alpha: row.alpha, landedAlpha: prev.landedAlpha, handedOff: row.handedOff });
      }
    }));
    const min = floorRows.filter((r) => !r.handedOff).reduce((m, r) => Math.min(m, r.alpha), 1);
    report.push({
      id: slide.id, builds: slide.builds,
      dimmedStates: floorRows.length,
      minDimmedAlpha: floorRows.length ? Number(min.toFixed(3)) : null
    });
    console.log(`  ${slide.id}: ${floorRows.length} dimmed state(s), min α ${floorRows.length ? min.toFixed(2) : '—'}`);
  }

  // The census, against its declared baseline. A slide over its number is a
  // regression and fails like anything else; a slide under it has been improved
  // and says so, so the baseline can be lowered rather than quietly kept high.
  const census = {};
  backlog.forEach((b) => { census[b.slide] = (census[b.slide] || 0) + 1; });
  const overBaseline = Object.entries(census).filter(([id, n]) => n > (BASELINE[id] || 0));
  const under = Object.entries(BASELINE).filter(([id, n]) => (census[id] || 0) < n);
  currentSlide = null;
  overBaseline.forEach(([id, n]) => check(
    `BASELINE: ${id} is over its declared brightness baseline`, false,
    `${n} departures, baseline ${BASELINE[id] || 0} — a state was made worse, or a new one added`));
  check('BASELINE: no slide outside the enforced scope is over its declared count',
    overBaseline.length === 0,
    `${backlog.length} pre-existing departures across ${Object.keys(census).length} slides, all at or under baseline`);
  if (under.length) {
    console.log(`\nunder baseline (lower these numbers): ${under.map(([id, n]) => `${id} ${census[id] || 0}/${n}`).join(', ')}`);
  }
  // Paste-ready, so re-baselining after a fix is a copy rather than a
  // transcription — and so the number in the file is always a measured one.
  console.log('\nBASELINE, as measured:');
  console.log(JSON.stringify(Object.fromEntries(Object.entries(census).sort()), null, 2));

  const failures = results.filter((r) => !r.ok);
  fs.writeFileSync(path.join(OUT, 'bright-r7-3.json'), JSON.stringify({
    phase: 'R7.3', floor: FLOOR, full: FULL, settle: SETTLE, enforced: ENFORCED,
    slides: report, checks: results.length, failures: failures.length, results,
    baseline: BASELINE, census, backlog
  }, null, 2));
  console.log(`\nconsole: ${consoleLines.length}`);
  consoleLines.slice(0, 12).forEach((l) => console.log('  ' + l));
  console.log(`R7.3 brightness gate: ${results.length} checks, ${failures.length} failures over the enforced scope`);
  console.log(`             backlog: ${backlog.length} pre-existing departures across ${Object.keys(census).length} slides, at or under baseline`);
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
