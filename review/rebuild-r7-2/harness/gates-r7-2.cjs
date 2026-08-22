// R7.2 static gates. Everything checkable without a browser: the freeze, the
// language rules, the pacing, the chrome R7.1 removed — and, replacing R7.1's
// blanket photography ban, the two-register containment rules.
//
// One gate is deliberately *repealed* here and the repeal is recorded rather
// than hidden. R7.1's `no <img> or raster asset reference anywhere in src/`
// encoded §9.4.3 read as an absolute. The presenter's Option A ruling scopes
// that rule rather than repealing it, so the replacement is narrower and
// stronger: raster references may exist, but every one of them must flow
// through `src/dark-field.js`, and no slide file may name an image path. A gate
// that says "none" is easy to pass and stops describing the system the moment
// the system has one; a gate that says "all of them, through here" keeps
// describing it.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO = path.join(__dirname, '..', '..', '..');
const BASE = 'b029e4d'; // main, at the R7 merge — the freeze baseline
const R71 = 'ca7ca49';  // the R7.1 report commit — this phase's own starting line
const S1 = path.join(REPO, 'src', 'slides', 'section-1-question');
const S2 = path.join(REPO, 'src', 'slides', 'section-2-origin');
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

  // R7.2 touches two Section 1–3 slide files and nothing else in those
  // sections (brief §4.3). Measured against where R7.1 left the branch —
  // R7.1's own Section 1 changes (the shared LuminousDisc refactor) are that
  // phase's business and are already reported there.
  const changed = git('diff', '--name-only', R71, '--', 'src/slides/section-1-question',
    'src/slides/section-2-origin', 'src/slides/section-3-function')
    .split('\n').map((s) => s.trim()).filter(Boolean);
  const allowed = new Set([
    'src/slides/section-2-origin/04-the-competition-record.js',
    'src/slides/section-2-origin/05-two-survivors.js'
  ]);
  const stray = changed.filter((f) => !allowed.has(f));
  check('SCOPE: only the two designated Section 1–3 slides changed since the R7 merge',
    stray.length === 0, stray.join(', ') || changed.join(', ') || 'none');
}

// ------------------------------------------ 2. THE TWO REGISTERS, STATICALLY
{
  const srcDir = path.join(REPO, 'src');
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]);
  const all = walk(srcDir).filter((f) => /\.(js|css)$/.test(f));
  // Comments stripped first: prose about a contact sheet's .png captures is
  // documentation, not an asset reference.
  const stripComments = (t) => t
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');

  const MANIFEST = path.join(srcDir, 'dark-field.js');
  // Any raster extension, whether written as a path or inside a glob pattern.
  const RASTER = /\.(png|jpe?g|webp|avif)\b|\{png[,}]|assets\/dark-field/i;
  const rasterRefs = all.filter((f) => {
    const t = stripComments(read(f)).replace(/icon_bitcoin\.png/g, '');
    return RASTER.test(t);
  }).map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
  check('REGISTER: every raster reference in src/ flows through src/dark-field.js',
    rasterRefs.length === 1 && rasterRefs[0] === 'src/dark-field.js',
    rasterRefs.join(', ') || 'none at all');

  const imgTags = all.filter((f) => /<img\b/.test(stripComments(read(f))) ||
    /createElement\(['"]img['"]\)/.test(stripComments(read(f))))
    .map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
  check('REGISTER: only components/DarkField.js constructs an image element',
    imgTags.length === 1 && imgTags[0] === 'src/components/DarkField.js',
    imgTags.join(', ') || 'none');

  check('REGISTER: the manifest is a glob, so a pending render needs no code change',
    /import\.meta\.glob\(/.test(read(MANIFEST)), 'src/dark-field.js');

  // The shipping set is exactly what the gate passed. Nothing may sit in
  // assets/dark-field/ that has not been through it.
  const dfDir = path.join(REPO, 'assets', 'dark-field');
  const shipping = fs.readdirSync(dfDir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();
  const gradeFile = path.join(__dirname, '..', 'grade-r7-2.json');
  if (fs.existsSync(gradeFile)) {
    const grade = JSON.parse(read(gradeFile));
    const graded = grade.rows.filter((r) => r.zone === 'integrated').map((r) => r.file).sort();
    check('REGISTER: every shipping render has a grade-gate result',
      JSON.stringify(shipping) === JSON.stringify(graded),
      `${shipping.length} shipping, ${graded.length} graded`);
    check('REGISTER: no shipping render failed the grade gate', grade.failures === 0,
      `${grade.failures} failures across ${grade.checks} checks`);
  } else {
    check('REGISTER: grade-gate results present', false, 'run grade-r7-2.cjs first');
  }

  // The old raster directory stays retired: the dark-field register has its own.
  const imgDir = path.join(REPO, 'assets', 'images');
  const remaining = fs.existsSync(imgDir) ? fs.readdirSync(imgDir) : [];
  check('REGISTER: assets/images still holds only the favicon',
    remaining.length === 1 && remaining[0] === 'icon_bitcoin.png',
    remaining.join(', ') || 'empty');

  // Every pending subject is declared in the manifest doc, so a stub is never
  // an orphan: a reader who finds one can find the prompt that resolves it.
  const manifestDoc = read(path.join(REPO, 'docs', 'dark-field-manifest.md'));
  const requested = new Set();
  [...sources.values(), read(path.join(S2, '04-the-competition-record.js')),
    read(path.join(REPO, 'src', 'components', 'section-2', 'EvolutionRail.js'))]
    .join('\n')
    .replace(/name:\s*'([a-z-]+)'/g, (_, n) => { requested.add(n); return ''; });
  const subjects = shipping.map((f) => f.replace(/\.[a-z]+$/i, ''));
  const pending = [...requested].filter((n) => !subjects.includes(n));
  const undocumented = pending.filter((n) => !new RegExp(`\`${n}\``).test(manifestDoc));
  check('REGISTER: every pending subject is listed in docs/dark-field-manifest.md',
    undocumented.length === 0,
    undocumented.join(', ') || (pending.length ? `pending: ${pending.join(', ')}` : 'nothing pending'));
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

  const selectors = (cssText.match(/^\.s4-[a-z-]+__kicker/gm) || [])
    .map((s) => s.replace(/^\./, ''));
  const allowed = new Set(['s4-comparison__kicker', 's4-falsifiability__kicker', 's4-investment-case__kicker']);
  const stray = [...new Set(selectors)].filter((s) => !allowed.has(s));
  check('no retired per-slide header selectors remain in CSS', stray.length === 0,
    stray.join(', ') || 'only the three survivors');
}

// ------------------------------------------------------- 4. NO BOXED PANELS
{
  const blocks = cssText.split(/\n(?=\.|@|\/\*)/);
  const offenders = blocks.filter((b) => /^\.s4-/.test(b.trim()) && /\n\s*border:\s*[^;]*(solid|dashed)/.test(b))
    .map((b) => b.trim().split('\n')[0]);
  check('no boxed-panel borders on Section 4 selectors', offenders.length === 0,
    offenders.join(', ') || 'none');

  // A dark-field render is a photograph on black, not a framed picture.
  const dfBlocks = blocks.filter((b) => /^\.df\b|^\.df-image|^\.df-stub/.test(b.trim()));
  const framed = dfBlocks.filter((b) => /\n\s*(border|border-radius|box-shadow):/.test(b))
    .map((b) => b.trim().split('\n')[0]);
  check('REGISTER: no border, radius or shadow on a dark-field surface',
    framed.length === 0, framed.join(', ') || 'clean');
}

// ------------------------------------------------------------- 5. LANGUAGE
{
  const all = [...sources.values()].join('\n');

  const verifyCount = (all.match(/textContent = 'Verify\.';/g) || []).length;
  check('"Don\'t trust. Verify." on stage exactly twice', verifyCount === 2, `${verifyCount} occurrence(s)`);

  const banned = ['engineered', 'purpose-built', 'designed as a solution', 'repurposed'];
  banned.forEach((word) => {
    const re = new RegExp(`\\b${word}(?![A-Za-z])`, 'i');
    const hits = [...sources.entries()].filter(([, t]) => re.test(t)).map(([f]) => f);
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
  const mismatches = [];
  let builds = 0;
  let arrows = 0;
  const pacing = [];
  const files = [
    ...slideFiles,
    ...fs.readdirSync(S1).filter((f) => f.endsWith('.js')).map((f) => path.join(S1, f)),
    ...fs.readdirSync(S2).filter((f) => f.endsWith('.js')).map((f) => path.join(S2, f))
  ];
  files.forEach((file) => {
    const f = path.basename(file);
    if (f.startsWith('_')) return;
    const t = read(file);
    const id = (t.match(/id:\s*'([^']+)'/) || [])[1];
    const declared = Number((t.match(/totalBuildSteps:\s*(\d+)/) || [])[1]);
    const max = Number((t.match(/const MAX_STEP = (\d+)/) || [])[1]);
    const steps = Number.isFinite(declared) ? declared : max;
    const notesIdx = t.indexOf('notes:');
    const notes = notesIdx > -1 ? t.slice(notesIdx) : '';
    const n = (notes.match(/\[→\]/g) || []).length;
    if (!Number.isFinite(steps)) return;
    builds += steps;
    arrows += n;
    pacing.push({ id, builds: steps, arrows: n });
    if (steps !== n) mismatches.push(`${id}: ${steps} builds vs ${n} arrows`);
  });
  check('[→] count equals build count on every slide walked', mismatches.length === 0,
    mismatches.join(' · ') || `${builds} builds, ${arrows} arrows across ${pacing.length} slides`);
  fs.writeFileSync(path.join(__dirname, '..', 'pacing-r7-2.json'), JSON.stringify(pacing, null, 2));
}

const failures = results.filter((r) => !r.ok);
fs.writeFileSync(path.join(__dirname, '..', 'gates-r7-2.json'),
  JSON.stringify({ phase: 'R7.2', base: BASE, checks: results.length, failures: failures.length, results }, null, 2));
console.log(`\nR7.2 gates: ${results.length} checks, ${failures.length} failures`);
process.exit(failures.length ? 1 : 0);
