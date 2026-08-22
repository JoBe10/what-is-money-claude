// R7.3 — the register audit. Supersedes `review/rebuild-r7-2/harness/
// register-r7-2.cjs`, which is kept as that phase's evidence; the rules are
// unchanged and two things around them are not. The declared-register list
// gains 2.06, because the featured close-up (§7) declares `mixed` when its
// toggle is on and the gate must not fail the presenter for ruling a flagged
// candidate in — the same disposition R7.2 gave 2.05's gold arrival. And the
// close-up gets its own named assertion, because its entire legality rests on
// where it lives: above the rail, in the slide's own stage space, never inside
// the diagram. A render inside `.s2o-rail` would travel with the camera and
// would *be* an entry on the record. That is what "the rail line itself never
// carries photographs" means in the DOM, so that is where it is checked.
//
// The inherited text follows.
//
// R7.2 — the register audit (brief §5.3).
//
// §9.4.9's governance clause is three sentences, and two of them are machine
// rules once the DOM says which register a slide speaks:
//
//   "dark-field never enters a diagram"
//   "glyphs never carry a sensory beat at display scale"
//   "register switches are designed moments, not convenience"
//
// The first is enforced here. The second is a design judgment and is recorded
// in the decision log, not gated. The third is enforced by there being exactly
// two switches in the deck, both named in the log — the static gate proves only
// two Section 1–3 files changed at all.
//
// The convention this rests on: **a slide that declares no register speaks the
// line grammar.** The line grammar is the deck's default and the only register
// a diagram may speak, so silence means line — which is why the audit's first
// assertion is that any slide *showing* a render has declared itself.
//
// The rail is the interesting case and it gets its own named assertion. The
// competition record's four contenders are renders while the row is a row and
// marks once the line draws through it, so the invariant that matters there is
// not "no render on the rail" but "no render while the line exists". That is
// the diagram rule stated exactly: what makes the rail a diagram is the line.
//
// Usage: node register-r7-3.cjs [--port 4318]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '4319');
const BASE = `http://localhost:${PORT}`;
const OUT = path.join(__dirname, '..');

// Every structural diagram in the deck, by the root class its component
// renders. A dark-field render may not be a descendant of any of them.
// `.s2o-rail` is deliberately absent — see the rail assertion below.
const DIAGRAMS = [
  '.s4-comparison-table',
  '.s4-failure-list',
  '.s4-fixed-supply-field',
  '.unit-field-grid',
  '.s3f-ladder',
  '.s3f-tower',
  '.s2o-elements',
  '.s2o-triad',
  '.s4-exchange__svg',
  '.wayline'
];

const auditInPage = (DIAGRAMS) => {
  const root = document.querySelector('.deck-slide[data-active="true"]') ||
    document.querySelector('.deck-slide');
  if (!root) return null;

  const shown = (el) => {
    let p = el;
    while (p && p !== document.body) {
      const cs = getComputedStyle(p);
      if (Number(cs.opacity) < 0.06 || cs.visibility === 'hidden' || cs.display === 'none') return false;
      p = p.parentElement;
    }
    return true;
  };

  const declared = root.querySelector('[data-register]');
  const register = declared ? declared.dataset.register : 'line';

  const images = [...root.querySelectorAll('.df-image')];
  const stubs = [...root.querySelectorAll('.df-stub')];
  const visibleImages = images.filter(shown);
  const inDiagram = visibleImages.filter((img) => DIAGRAMS.some((sel) => img.closest(sel)));

  const rail = root.querySelector('.s2o-rail');
  const railLine = rail ? rail.dataset.line === 'true' : null;
  const railRenders = rail
    ? [...rail.querySelectorAll('.df-image, .df-stub')].filter(shown).length
    : 0;

  // The featured close-up (R7.3 §7): present on stage, never inside the rail.
  const features = [...root.querySelectorAll('.s2o-railfeature')];
  const featuresInRail = features.filter((el) => el.closest('.s2o-rail')).length;

  return {
    register,
    images: images.length,
    visibleImages: visibleImages.length,
    stubs: stubs.length,
    visibleStubs: stubs.filter(shown).length,
    inDiagram: inDiagram.map((el) => el.closest('[data-subject]')?.dataset.subject || '?'),
    subjects: visibleImages.map((el) => el.closest('[data-subject]')?.dataset.subject || '?'),
    railLine,
    railRenders,
    features: features.length,
    featuresInRail
  };
};

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  if (!ok) console.log(`FAIL  ${name} :: ${detail}`);
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  let page = await context.newPage();

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  const manifest = await page.evaluate(() => window.__deck.slides.map((s, i) => ({
    n: i + 1, id: s.id, section: s.section, builds: s.totalBuildSteps || 0
  })));

  const perSlide = new Map();
  let nav = 0;
  for (const slide of manifest) {
    for (let b = 0; b <= slide.builds; b += 1) {
      if (nav && nav % 12 === 0) {
        const old = page;
        page = await context.newPage();
        await old.close();
      }
      nav += 1;
      await page.goto(`${BASE}/?slide=${slide.id}`, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
      await page.evaluate(({ id, k }) => {
        const n = window.__deck.slides.findIndex((s) => s.id === id) + 1;
        sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
      }, { id: slide.id, k: b });
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
      await page.waitForTimeout(900);

      const a = await page.evaluate(auditInPage, DIAGRAMS);
      if (!a) continue;

      const prev = perSlide.get(slide.id) || {
        id: slide.id, section: slide.section, register: a.register,
        maxImages: 0, maxStubs: 0, subjects: new Set()
      };
      prev.register = a.register;
      prev.maxImages = Math.max(prev.maxImages, a.visibleImages);
      prev.maxStubs = Math.max(prev.maxStubs, a.visibleStubs);
      a.subjects.forEach((s) => prev.subjects.add(s));
      perSlide.set(slide.id, prev);

      if (a.visibleImages > 0) {
        check(`${slide.id} b${b}: a slide showing a render declares a non-line register`,
          a.register !== 'line', `declared "${a.register}" with ${a.visibleImages} render(s) on stage`);
      }
      check(`${slide.id} b${b}: no dark-field render inside a structural diagram`,
        a.inDiagram.length === 0, a.inDiagram.join(', ') || 'clean');

      if (a.railLine !== null) {
        // The rail's own form of the rule. Before the line, the four
        // contenders are a row of goods; after it, they are entries on a
        // record. A render must never be standing on a drawn line.
        check(`${slide.id} b${b}: no render on the rail while the line is drawn`,
          !(a.railLine && a.railRenders > 0),
          a.railLine ? `line drawn, ${a.railRenders} render(s) present` : 'no line yet');
      }
      if (a.features > 0) {
        check(`${slide.id} b${b}: the featured close-up is above the rail, not on it`,
          a.featuresInRail === 0,
          `${a.features} close-up(s), ${a.featuresInRail} inside .s2o-rail`);
      }
    }
  }

  const rows = [...perSlide.values()].map((r) => ({
    ...r, subjects: [...r.subjects].filter((s) => s !== '?').sort()
  }));

  // The whole deck's register assignment, for the decision log.
  console.log('\n| slide | section | register | renders | pending stubs | subjects |');
  console.log('|---|---|---|---|---|---|');
  rows.forEach((r) => {
    console.log(`| ${r.id} | ${r.section} | ${r.register} | ${r.maxImages} | ${r.maxStubs} | ${r.subjects.join(' · ') || '—'} |`);
  });

  // The log's list. 2.05 and 2.06 are on it because their flagged candidates —
  // the gold arrival and the featured close-up — declare `mixed` when their
  // toggles are on, and the gate must not fail the presenter for ruling a
  // candidate in.
  const DECLARED = [
    '4-03-simple-exchange', '4-04-unfinished-exchange', '4-05-spend-or-save',
    '4-06-claim-and-carrier', '2-04-the-competition-record', '2-05-two-survivors',
    '2-06-the-abstraction-ladder'
  ];
  const mixed = rows.filter((r) => r.register !== 'line');
  check('REGISTER: the dark-field register is confined to the slides the log names',
    mixed.length > 0 && mixed.every((r) => DECLARED.includes(r.id)),
    mixed.map((r) => `${r.id}=${r.register}`).join(', '));

  const failures = results.filter((r) => !r.ok);
  fs.writeFileSync(path.join(OUT, 'register-r7-3.json'), JSON.stringify({
    phase: 'R7.3', diagrams: DIAGRAMS, checks: results.length, failures: failures.length, rows, results
  }, null, 2));
  console.log(`\nR7.3 register audit: ${results.length} checks, ${failures.length} failures`);
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
