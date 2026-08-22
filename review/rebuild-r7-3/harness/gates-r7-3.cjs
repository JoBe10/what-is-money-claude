// R7.3 static gates. Everything checkable without a browser.
//
// Supersedes `review/rebuild-r7-2/harness/gates-r7-2.cjs`, which is kept
// unmodified as that phase's evidence and **now fails by design in exactly two
// checks**, both of which are "the deck moved on" rather than "the deck broke":
//
//   · its SCOPE gate asserts that only two Section 1–3 slide files have changed
//     since the R7.1 report commit — true of R7.2, and the thing R7.3 was
//     briefed to change;
//   · its "every shipping render has a grade-gate result" compares the tree
//     against R7.2's own grade run, which knew seven images. There are eleven.
//
// Both are restated here against this phase's own facts, together with the rest
// of that gate and what this phase added. That is the same disposition R7.2
// gave R7.1's gate, and for the same reason: deleting the old file would erase
// the record of what that phase actually checked.
//
// What is new at R7.3:
//   · the scope gate is re-based on this phase's own starting line and its own
//     allowed set;
//   · the studio round is proved *unapplied* — three checks, because "the
//     presenter selects" is a promise that is easy to make and easy to break;
//   · the ladder script is byte-checked against the brief's install-verbatim
//     passage, so a later edit cannot quietly drift from an approved script;
//   · the flagged toggles are proved to ship in their default state;
//   · the retired currency glyphs are proved to have no call site.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO = path.join(__dirname, '..', '..', '..');
const BASE = 'b029e4d'; // main, at the R7 merge — the freeze baseline
const R72 = 'a956b09';  // where R7.3 starts: R7.2 shipped, plus the four renders
const S1 = path.join(REPO, 'src', 'slides', 'section-1-question');
const S2 = path.join(REPO, 'src', 'slides', 'section-2-origin');
const S3 = path.join(REPO, 'src', 'slides', 'section-3-function');
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

const srcDir = path.join(REPO, 'src');
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
  d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]);
const allSrc = walk(srcDir).filter((f) => /\.(js|css)$/.test(f));
const stripComments = (t) => t
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/(^|[^:])\/\/.*$/gm, '$1');

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
  const scoreCount = (now.match(/(gold|fiat|bitcoin|property|shares): \d/g) || []).length;
  check('FREEZE: _comparison-data.js untouched entirely', before === now,
    before === now ? `file identical — ${scoreCount} scores` : 'the file differs');

  const f423 = 'src/slides/section-4-ideal-store/23-investment-case-from-first-principles.js';
  check('FREEZE: 4.23 slide file untouched',
    git('show', `${BASE}:${f423}`).replace(/\r\n/g, '\n') === read(path.join(REPO, f423)),
    '4.23 is the frozen final frame');

  // Section 4's direction is out of scope this session; the brief admits one
  // exception, "where a shared component fix (brightness floors, disc)
  // necessarily propagates". It propagated exactly once, to 4.22's two
  // statements, and it propagated through the stylesheet — no Section 4 slide
  // file changed at all. Both halves of that are gated, because "we only
  // touched CSS" is not the same claim as "we only touched brightness".
  const s4changed = git('diff', '--name-only', R72, '--', 'src/slides/section-4-ideal-store')
    .split('\n').map((s) => s.trim()).filter(Boolean);
  check('SCOPE: no Section 4 slide file changed this phase',
    s4changed.length === 0, s4changed.join(', ') || 'none');

  const s4Blocks = (t) => {
    const out = {};
    (t.match(/^\.s4-[^{]*\{[^}]*\}/gms) || []).forEach((b) => {
      out[b.slice(0, b.indexOf('{')).trim().replace(/\s+/g, ' ')] = b.slice(b.indexOf('{'));
    });
    return out;
  };
  const cssBefore = s4Blocks(git('show', `${R72}:src/styles/slides.css`).replace(/\r\n/g, '\n'));
  const cssNow = s4Blocks(cssText);
  const movedS4 = [...new Set([...Object.keys(cssBefore), ...Object.keys(cssNow)])]
    .filter((k) => cssBefore[k] !== cssNow[k]);
  const ALLOWED_S4_CSS = [
    '.s4-fixed-supply__statement--opening[data-quiet="true"]',
    '.s4-fixed-supply__statement--mechanism',
    '.s4-fixed-supply__statement--mechanism[data-quiet="true"]'
  ];
  const strayS4 = movedS4.filter((k) => !ALLOWED_S4_CSS.includes(k));
  check('SCOPE: the only Section 4 CSS this phase changed is 4.22\'s two brightness states',
    strayS4.length === 0, strayS4.join(', ') || movedS4.join(', ') || 'none');
  const onlyColor = movedS4.every((k) => {
    const a = (cssBefore[k] || '').split('\n').map((s) => s.trim()).filter(Boolean);
    const b = (cssNow[k] || '').split('\n').map((s) => s.trim()).filter(Boolean);
    const diff = [...a.filter((l) => !b.includes(l)), ...b.filter((l) => !a.includes(l))];
    return diff.every((l) => /^color:/.test(l));
  });
  check('SCOPE: and it changed nothing on them but the color', onlyColor,
    movedS4.length ? 'color declarations only' : 'nothing changed');

  const changed = git('diff', '--name-only', R72, '--', 'src/slides/section-1-question',
    'src/slides/section-2-origin', 'src/slides/section-3-function')
    .split('\n').map((s) => s.trim()).filter(Boolean);
  const allowed = new Set([
    'src/slides/section-2-origin/02-the-discovery.js',        // §2 the declared yield
    'src/slides/section-2-origin/03-the-convergence.js',      // §5.1 the disc regression
    'src/slides/section-2-origin/04-the-competition-record.js', // §1 §2 §7
    'src/slides/section-2-origin/05-two-survivors.js',        // §5.3 the bridge sentence
    'src/slides/section-2-origin/06-the-abstraction-ladder.js', // §4 §2 §7
    'src/slides/section-2-origin/08-the-pattern.js',          // §3 §2
    'src/slides/section-3-function/01-the-three-functions.js', // §5.1
    'src/slides/section-3-function/02-the-functions-separate.js' // §5.2
  ]);
  const stray = changed.filter((f) => !allowed.has(f));
  check('SCOPE: only the eight Section 1–3 slides this brief names have changed',
    stray.length === 0, stray.join(', ') || `${changed.length} file(s), all named`);
}

// ------------------------------------------ 2. THE TWO REGISTERS, STATICALLY
{
  const MANIFEST = path.join(srcDir, 'dark-field.js');
  const RASTER = /\.(png|jpe?g|webp|avif)\b|\{png[,}]|assets\/dark-field/i;
  const rasterRefs = allSrc.filter((f) => {
    const t = stripComments(read(f)).replace(/icon_bitcoin\.png/g, '');
    return RASTER.test(t);
  }).map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
  check('REGISTER: every raster reference in src/ flows through src/dark-field.js',
    rasterRefs.length === 1 && rasterRefs[0] === 'src/dark-field.js',
    rasterRefs.join(', ') || 'none at all');

  const imgTags = allSrc.filter((f) => /<img\b/.test(stripComments(read(f))) ||
    /createElement\(['"]img['"]\)/.test(stripComments(read(f))))
    .map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
  check('REGISTER: only components/DarkField.js constructs an image element',
    imgTags.length === 1 && imgTags[0] === 'src/components/DarkField.js',
    imgTags.join(', ') || 'none');

  check('REGISTER: the manifest is a glob, so a pending render needs no code change',
    /import\.meta\.glob\(/.test(read(MANIFEST)), 'src/dark-field.js');

  const dfDir = path.join(REPO, 'assets', 'dark-field');
  const shipping = fs.readdirSync(dfDir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();
  const gradeFile = path.join(__dirname, '..', 'grade-r7-3.json');
  if (fs.existsSync(gradeFile)) {
    const grade = JSON.parse(read(gradeFile));
    const graded = grade.rows.filter((r) => r.zone === 'integrated').map((r) => r.file).sort();
    check('REGISTER: every shipping render has a grade-gate result',
      JSON.stringify(shipping) === JSON.stringify(graded),
      `${shipping.length} shipping, ${graded.length} graded`);
    check('REGISTER: no shipping render failed the grade gate', grade.failures === 0,
      `${grade.failures} failures across ${grade.checks} checks`);
    // Every subject the deck asks for must have a measured framing row, or it
    // renders at identity scale and the row it sits in stops being one shoot.
    const framing = Object.keys(JSON.parse(read(path.join(srcDir, 'dark-field.js'))
      .match(/const FRAMING = (\{[\s\S]*?\n\});/)[1]
      .replace(/([a-z_]+):/g, '"$1":')));
    const subjects = shipping.map((f) => f.replace(/\.[a-z]+$/i, ''));
    const unframed = subjects.filter((s) => !framing.includes(s));
    check('REGISTER: every shipping render carries a measured framing row',
      unframed.length === 0, unframed.join(', ') || `${framing.length} rows`);
  } else {
    check('REGISTER: grade-gate results present', false, 'run grade-r7-2.cjs --out review/rebuild-r7-3 --name grade-r7-3.json first');
  }

  const imgDir = path.join(REPO, 'assets', 'images');
  const remaining = fs.existsSync(imgDir) ? fs.readdirSync(imgDir) : [];
  check('REGISTER: assets/images still holds only the favicon',
    remaining.length === 1 && remaining[0] === 'icon_bitcoin.png',
    remaining.join(', ') || 'empty');

  const manifestDoc = read(path.join(REPO, 'docs', 'dark-field-manifest.md'));
  const requested = new Set();
  [...sources.values(),
    read(path.join(S2, '04-the-competition-record.js')),
    read(path.join(REPO, 'src', 'components', 'section-2', 'EvolutionRail.js')),
    read(path.join(REPO, 'src', 'components', 'section-2', 'RailFeature.js'))]
    .join('\n')
    .replace(/(?:name|subject):\s*'([a-z_-]+)'/g, (_, n) => { requested.add(n); return ''; });
  const subjects = shipping.map((f) => f.replace(/\.[a-z]+$/i, ''));
  const pending = [...requested].filter((n) => !subjects.includes(n));
  const undocumented = pending.filter((n) => !new RegExp(`\`${n}\``).test(manifestDoc));
  check('REGISTER: every pending subject is listed in docs/dark-field-manifest.md',
    undocumented.length === 0,
    undocumented.join(', ') || (pending.length ? `pending: ${pending.join(', ')}` : 'nothing pending'));
}

// --------------------------------------- 3. THE STUDIO ROUND IS NOT APPLIED
{
  // The brief's §6 is explicit — the presenter selects — so the promise is
  // gated three ways rather than asserted once.
  const importers = allSrc.filter((f) => /candidates-r7-3/.test(read(f)))
    .map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
  check('STUDIO: the R7.3 candidates have no importer in src/',
    importers.length === 0, importers.join(', ') || 'none — proposals only');

  const glyphsRel = 'src/components/section-2/glyphs.js';
  const now = read(path.join(REPO, glyphsRel));
  const before = git('show', `${R72}:${glyphsRel}`).replace(/\r\n/g, '\n');
  // Sorted, because R7.3 *moved* two entries — the retired currency marks — and
  // the claim being gated is "no selection changed", not "no line moved".
  const sel = (t) => (t.match(/^\s+'?[a-z-]+'?:\s+'[abc]'/gm) || [])
    .map((s) => s.trim().replace(/\s+/g, ' ').replace(/'/g, '')).sort();
  const same = JSON.stringify(sel(now)) === JSON.stringify(sel(before));
  check('STUDIO: no glyph selection changed this phase', same,
    same ? `${sel(now).length} selections, all unchanged`
      : sel(now).filter((s) => !sel(before).includes(s)).join(', '));

  const sheet = path.join(__dirname, '..', 'icon-studio', 'contact-sheet.png');
  check('STUDIO: the contact sheet exists — the round\'s only output',
    fs.existsSync(sheet), fs.existsSync(sheet)
      ? `${Math.round(fs.statSync(sheet).size / 1024)} kB`
      : 'not built');
}

// ------------------------------------------------- 4. THE APPROVED SCRIPTS
{
  // §4 is an install-verbatim passage. Byte-check it against the brief so no
  // later edit can drift from an approved script without the gate saying so.
  // The one licensed difference is orthographic: the brief is written with
  // ASCII apostrophes and the deck's language rule requires typographic ones.
  const brief = read(path.join(REPO, 'docs', 'r7-3-addendum-brief.md'));
  const ladder = read(path.join(S2, '06-the-abstraction-ladder.js'));
  const norm = (s) => s.replace(/[’]/g, "'").replace(/\s+/g, ' ').trim();
  const passages = (brief.match(/^\[→\] (?:So people built upward|But coins solve)[^\n]*/gm) || []);
  check('SCRIPT: the brief\'s two ladder paragraphs are present verbatim',
    passages.length === 2 && passages.every((p) => norm(ladder).includes(norm(p))),
    `${passages.length} passage(s) matched`);

  const bridge = (brief.match(/\*"(So let's zoom all the way out[^"]*)"\*/) || [])[1];
  const survivors = read(path.join(S2, '05-two-survivors.js'));
  check('SCRIPT: the periodic-table bridge sentence opens the two-survivors note',
    Boolean(bridge) && norm(survivors).includes(norm(`[→] ${bridge}`)),
    bridge ? 'installed at the head of the first paragraph' : 'not found in the brief');

  // Waypoint / 1.5 copy is explicitly NOT changed this session.
  ['00-waypoint-function.js', '08-waypoint-judge.js'].forEach((f) => {
    const rel = `src/slides/section-3-function/${f}`;
    check(`SCRIPT: ${f} untouched (waypoint copy is pending presenter rulings)`,
      git('show', `${R72}:${rel}`).replace(/\r\n/g, '\n') === read(path.join(REPO, rel)), rel);
  });
  const w15 = 'src/slides/section-1-question/05-the-promise.js';
  check('SCRIPT: 1.5 untouched (waypoint copy is pending presenter rulings)',
    git('show', `${R72}:${w15}`).replace(/\r\n/g, '\n') === read(path.join(REPO, w15)), w15);
}

// ----------------------------------------------- 5. THE FLAGGED CANDIDATES
{
  const feature = read(path.join(REPO, 'src', 'components', 'section-2', 'RailFeature.js'));
  check('FLAGGED: the featured-render toggle ships off',
    /export const RAIL_FEATURE = false;/.test(feature), 'RAIL_FEATURE');
  const survivors = read(path.join(S2, '05-two-survivors.js'));
  check('FLAGGED: the gold-arrival toggle still ships off (R7.2\'s flag, unchanged)',
    /export const GOLD_ARRIVAL = false;/.test(survivors), 'GOLD_ARRIVAL');
}

// ------------------------------------------------------ 6. THE BRIGHTNESS TOKENS
{
  const globals = read(path.join(REPO, 'src', 'styles', 'globals.css'));
  check('BRIGHTNESS: the dimmed-prior step is one token, deck-wide',
    /--dim-prior:\s*0\.58;/.test(globals) && /--text-prior:\s*rgba\(255, 255, 255, 0\.58\);/.test(globals),
    '--dim-prior / --text-prior');
  // The retired currency marks must have no call site left.
  ['dollar', 'peso'].forEach((name) => {
    const hits = allSrc.filter((f) => new RegExp(`glyph\\(['"]${name}['"]`).test(stripComments(read(f))) ||
      new RegExp(`glyphs:\\s*\\[[^\\]]*'${name}'`).test(stripComments(read(f))))
      .map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
    check(`RETIRED: the ${name} glyph has no call site`, hits.length === 0,
      hits.join(', ') || 'retired at R7.3 §5.2');
  });
}

// -------------------------------------------------- 7. THE HEADER CONVENTION
{
  const users = [...sources.entries()].filter(([, t]) => /KickerLabel/.test(t)).map(([f]) => f);
  check('KickerLabel has exactly one caller, the frozen 4.23',
    users.length === 1 && users[0].startsWith('23-'), users.join(', ') || 'none');

  // One caller since R7.4 §D.4 deleted the falsifiability beat: the comparison
  // table is the only frame left in Section 4 that must be named.
  const quiet = [...sources.entries()].filter(([, t]) => /QuietKicker/.test(t)).map(([f]) => f);
  check('QuietKicker is used by exactly the one named frame',
    quiet.length === 1 && quiet[0].startsWith('16-'), quiet.join(', ') || 'none');
}

// ------------------------------------------------------- 8. NO BOXED PANELS
{
  const blocks = cssText.split(/\n(?=\.|@|\/\*)/);
  const offenders = blocks.filter((b) => /^\.s4-[a-z-]+/.test(b.trim()) && /\n\s*border:\s*[^;]*(solid|dashed)/.test(b))
    .map((b) => b.trim().split('\n')[0]);
  check('no boxed-panel borders on Section 4 selectors', offenders.length === 0,
    offenders.join(', ') || 'none');

  const dfBlocks = blocks.filter((b) => /^\.df\b|^\.df-image|^\.df-stub|^\.s2o-railfeature/.test(b.trim()));
  const framed = dfBlocks.filter((b) => /\n\s*(border|border-radius|box-shadow):/.test(b))
    .map((b) => b.trim().split('\n')[0]);
  check('REGISTER: no border, radius or shadow on a dark-field surface',
    framed.length === 0, framed.join(', ') || 'clean');
}

// ------------------------------------------------------------- 9. LANGUAGE
{
  const s123 = [S1, S2, S3].flatMap((d) => fs.readdirSync(d).filter((f) => f.endsWith('.js'))
    .map((f) => [path.basename(f), read(path.join(d, f))]));
  const everySlide = new Map([...sources.entries(), ...s123]);

  const verifyCount = ([...sources.values()].join('\n').match(/textContent = 'Verify\.';/g) || []).length;
  check('"Don\'t trust. Verify." on stage exactly twice', verifyCount === 2, `${verifyCount} occurrence(s)`);

  const banned = ['engineered', 'purpose-built', 'designed as a solution', 'repurposed'];
  banned.forEach((word) => {
    const re = new RegExp(`\\b${word}(?![A-Za-z])`, 'i');
    const hits = [...everySlide.entries()].filter(([, t]) => re.test(t)).map(([f]) => f);
    check(`banned term absent: "${word}"`, hits.length === 0, hits.join(', ') || 'absent');
  });

  const british = [['labour', 'labor'], ['specialised', 'specialized'], ['centralised', 'centralized'],
    ['recognised', 'recognized'], ['judgement', 'judgment'], ['jewellery', 'jewelry'], ['colour', 'color']];
  british.forEach(([bad, good]) => {
    const re = new RegExp(`\\b${bad}(?![A-Za-z])`, 'i');
    const hits = [...everySlide.entries()].filter(([, t]) => re.test(t)).map(([f]) => f);
    check(`American English: "${bad}" → "${good}"`, hits.length === 0, hits.join(', ') || 'clean');
  });

  const ascii = [...everySlide.entries()].filter(([, t]) => {
    const strings = t.match(/(textContent|append)\([^)]*'[^']*'[^)]*\)/g) || [];
    return strings.some((s) => /[A-Za-z]'[A-Za-z]/.test(s));
  }).map(([f]) => f);
  check('typographic apostrophes in visible copy', ascii.length === 0, ascii.join(', ') || 'clean');

  const notesAscii = [...everySlide.entries()].filter(([, t]) => {
    const i = t.indexOf('notes:');
    return i > -1 && /[A-Za-z]'[A-Za-z]/.test(t.slice(i));
  }).map(([f]) => f);
  check('typographic apostrophes in the scripts', notesAscii.length === 0, notesAscii.join(', ') || 'clean');
}

// --------------------------------------------------------------- 10. PACING
{
  const mismatches = [];
  let builds = 0;
  let arrows = 0;
  const pacing = [];
  const files = [
    ...slideFiles,
    ...[S1, S2, S3].flatMap((d) => fs.readdirSync(d).filter((f) => f.endsWith('.js')).map((f) => path.join(d, f)))
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

  // No build count moved this phase: every change rides an advance the script
  // already had.
  const before = git('diff', R72, '--', 'src/slides').split('\n')
    .filter((l) => /^[-+]\s*totalBuildSteps:/.test(l));
  check('PACING: no build count changed this phase', before.length === 0,
    before.map((s) => s.trim()).join(' · ') || 'no totalBuildSteps line moved');

  fs.writeFileSync(path.join(__dirname, '..', 'pacing-r7-3.json'), JSON.stringify(pacing, null, 2));
}

const failures = results.filter((r) => !r.ok);
fs.writeFileSync(path.join(__dirname, '..', 'gates-r7-3.json'),
  JSON.stringify({ phase: 'R7.3', base: BASE, from: R72, checks: results.length, failures: failures.length, results }, null, 2));
console.log(`\nR7.3 gates: ${results.length} checks, ${failures.length} failures`);
process.exit(failures.length ? 1 : 0);
