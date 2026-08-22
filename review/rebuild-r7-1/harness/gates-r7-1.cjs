// R7.1 static gates (brief §5.4). Everything here is checkable without a
// browser: the freeze, the language rules, and the three things this phase
// claims to have removed from Section 4 — photographs, boxed panels, and the
// header convention.
//
// SUPERSEDED AT R7.2, and it will fail if you run it. Section 2 below asserts
// that no raster asset is referenced anywhere in `src/`, which was §9.4.3 read
// as an absolute. The presenter's Option A ruling (1 August 2026) scopes that
// rule instead of repealing it, so the assertion is replaced rather than
// relaxed: `review/rebuild-r7-2/harness/gates-r7-2.cjs` requires that every
// raster reference flow through `src/dark-field.js` and that none reach a
// diagram. Run that one. This file is kept as R7.1's evidence, unmodified, so
// the record of what that phase actually checked survives — see
// `docs/r7-2-report.md` §6.4.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO = path.join(__dirname, '..', '..', '..');
const BASE = 'b029e4d'; // main, at the R7 merge
const S4 = path.join(REPO, 'src', 'slides', 'section-4-ideal-store');
const S5 = path.join(REPO, 'src', 'slides', 'section-5-close');
const CSS = path.join(REPO, 'src', 'styles', 'slides.css');

const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const git = (...a) => execSync(`git ${a.join(' ')}`, { cwd: REPO, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const slideFiles = [
  ...fs.readdirSync(S4).filter((f) => f.endsWith('.js')).map((f) => path.join(S4, f)),
  ...fs.readdirSync(S5).filter((f) => f.endsWith('.js')).map((f) => path.join(S5, f))
];
const sources = new Map(slideFiles.map((f) => [path.basename(f), read(f)]));
const cssText = read(CSS);

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  if (!ok) console.log(`FAIL  ${name} :: ${detail}`);
}

// ------------------------------------------------------------ 1. THE FREEZE
{
  const rel = 'src/slides/section-4-ideal-store/_comparison-data.js';
  const now = read(path.join(REPO, rel));
  const before = git('show', `${BASE}:${rel}`).replace(/\r\n/g, '\n');
  const rows = (t) => {
    const s = t.indexOf('const comparisonRows = [');
    const e = t.indexOf('];', s);
    return s < 0 ? null : t.slice(s, e + 2);
  };
  const a = rows(before);
  const b = rows(now);
  const rowCount = b ? (b.match(/property: '/g) || []).length : 0;
  const scoreCount = b ? (b.match(/(gold|fiat|bitcoin|property|shares): \d/g) || []).length : 0;
  check('FREEZE: comparisonRows byte-identical to main', a && b && a === b,
    a === b ? `${rowCount} properties × 5 candidates = ${scoreCount} scores unchanged` : 'the scores block differs');
  check('FREEZE: _comparison-data.js untouched entirely', before === now,
    before === now ? 'file identical' : 'the file differs outside the scores block');

  const f423 = 'src/slides/section-4-ideal-store/23-investment-case-from-first-principles.js';
  check('FREEZE: 4.23 slide file untouched',
    git('show', `${BASE}:${f423}`).replace(/\r\n/g, '\n') === read(path.join(REPO, f423)),
    '4.23 is the frozen final frame (C4)');
}

// ------------------------------------------- 2. NO PHOTOGRAPHY IN SECTIONS 1-4
{
  const srcDir = path.join(REPO, 'src');
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]);
  const all = walk(srcDir);
  // Comments stripped first: prose about the contact sheet's .png captures is
  // documentation, not an asset reference, and the gate must not confuse them.
  const stripComments = (t) => t
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
  const offenders = all.filter((f) => {
    if (!/\.(js|css)$/.test(f)) return false;
    const t = stripComments(read(f)).replace(/icon_bitcoin\.png/g, '');
    return /<img\b/.test(t) || /\.(png|jpe?g|webp|avif)\b/i.test(t);
  }).map((f) => path.relative(REPO, f));
  check('no <img> or raster asset reference anywhere in src/', offenders.length === 0,
    offenders.join(', ') || 'none');

  const imgDir = path.join(REPO, 'assets', 'images');
  const remaining = fs.existsSync(imgDir) ? fs.readdirSync(imgDir) : [];
  check('assets/images holds only the favicon',
    remaining.length === 1 && remaining[0] === 'icon_bitcoin.png',
    remaining.join(', ') || 'empty');

  check('the photographic components are gone',
    !fs.existsSync(path.join(REPO, 'src', 'components', 'section-4', 'GoodsCluster.js')) &&
    !fs.existsSync(path.join(REPO, 'src', 'assets.js')),
    'GoodsCluster.js and src/assets.js deleted');
}

// -------------------------------------------------- 3. THE HEADER CONVENTION
{
  const users = [...sources.entries()].filter(([, t]) => /KickerLabel/.test(t)).map(([f]) => f);
  check('KickerLabel has exactly one caller, the frozen 4.23',
    users.length === 1 && users[0].startsWith('23-'), users.join(', ') || 'none');

  const quiet = [...sources.entries()].filter(([, t]) => /QuietKicker/.test(t)).map(([f]) => f);
  check('QuietKicker is used by exactly the two named frames',
    quiet.length === 2 &&
    quiet.some((f) => f.startsWith('16-')) && quiet.some((f) => f.startsWith('20b-')),
    quiet.join(', '));

  // The retired per-slide header selectors: only the three survivors may remain.
  const selectors = (cssText.match(/^\.s4-[a-z-]+__kicker/gm) || [])
    .map((s) => s.replace(/^\./, ''));
  const allowed = new Set(['s4-comparison__kicker', 's4-falsifiability__kicker', 's4-investment-case__kicker']);
  const stray = [...new Set(selectors)].filter((s) => !allowed.has(s));
  check('no retired per-slide header selectors remain in CSS', stray.length === 0,
    stray.join(', ') || 'only the three survivors');
}

// ------------------------------------------------------- 4. NO BOXED PANELS
{
  // §9.4.3: no filled panels except structural slabs. A full `border:` on a
  // Section 4 selector is the shape this phase removed.
  const blocks = cssText.split(/\n(?=\.|@|\/\*)/);
  const offenders = blocks.filter((b) => /^\.s4-/.test(b.trim()) && /\n\s*border:\s*[^;]*(solid|dashed)/.test(b))
    .map((b) => b.trim().split('\n')[0]);
  check('no boxed-panel borders on Section 4 selectors', offenders.length === 0,
    offenders.join(', ') || 'none');
}

// ------------------------------------------------------------- 5. LANGUAGE
{
  const copyOf = (t) => t;
  const all = [...sources.values()].join('\n');

  const verifyCount = (all.match(/textContent = 'Verify\.';/g) || []).length;
  check('"Don\'t trust. Verify." on stage exactly twice', verifyCount === 2, `${verifyCount} occurrence(s)`);

  const banned = ['engineered', 'purpose-built', 'designed as a solution', 'repurposed'];
  banned.forEach((word) => {
    const re = new RegExp(`\\b${word}(?![A-Za-z])`, 'i');
    const hits = [...sources.entries()].filter(([, t]) => re.test(copyOf(t))).map(([f]) => f);
    check(`banned term absent: "${word}"`, hits.length === 0, hits.join(', ') || 'absent');
  });

  const british = [['labour', 'labor'], ['specialised', 'specialized'], ['centralised', 'centralized'],
    ['recognised', 'recognized'], ['judgement', 'judgment'], ['jewellery', 'jewelry'], ['colour', 'color']];
  british.forEach(([bad, good]) => {
    const re = new RegExp(`\\b${bad}(?![A-Za-z])`, 'i');
    const hits = [...sources.entries()].filter(([, t]) => re.test(t)).map(([f]) => f);
    check(`American English: "${bad}" → "${good}"`, hits.length === 0, hits.join(', ') || 'clean');
  });

  const ascii = [...sources.entries()].filter(([, t]) => {
    const strings = t.match(/(textContent|append)\([^)]*'[^']*'[^)]*\)/g) || [];
    return strings.some((s) => /[A-Za-z]'[A-Za-z]/.test(s));
  }).map(([f]) => f);
  check('typographic apostrophes in visible copy', ascii.length === 0, ascii.join(', ') || 'clean');
}

// --------------------------------------------------------------- 6. PACING
{
  let mismatches = [];
  let builds = 0;
  let arrows = 0;
  sources.forEach((t, f) => {
    if (f.startsWith('_')) return;
    const decl = t.slice(t.indexOf('export default {'));
    const id = (decl.match(/id:\s*'([^']+)'/) || [])[1];
    const max = Number((t.match(/const MAX_STEP = (\d+)/) || [])[1]);
    const notesIdx = t.indexOf('notes:');
    const notes = notesIdx > -1 ? t.slice(notesIdx) : '';
    const n = (notes.match(/\[→\]/g) || []).length;
    if (!Number.isFinite(max)) return;
    builds += max;
    arrows += n;
    if (max !== n) mismatches.push(`${id}: ${max} builds vs ${n} arrows`);
  });
  check('[→] count equals build count on every slide', mismatches.length === 0,
    mismatches.join(' · ') || `${builds} builds, ${arrows} arrows across ${sources.size} slides`);
}

const failures = results.filter((r) => !r.ok);
fs.writeFileSync(path.join(__dirname, '..', 'gates-r7-1.json'),
  JSON.stringify({ phase: 'R7.1', base: BASE, checks: results.length, failures: failures.length, results }, null, 2));
console.log(`\nR7.1 gates: ${results.length} checks, ${failures.length} failures`);
process.exit(failures.length ? 1 : 0);
