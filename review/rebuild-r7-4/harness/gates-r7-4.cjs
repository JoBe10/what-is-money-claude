// R7.4 static gates — the FAST-mode subset.
//
// This does not supersede `review/rebuild-r7-3/harness/gates-r7-3.cjs`; it sits
// beside it. That gate is scoped to R7.3's brief and now reports eight failures,
// every one of them this phase doing what it was told (a deleted slide, two
// ruled build-count changes, the retired second "Don't trust. Verify.", four
// more renders, the self-reference sweep reaching two slides outside R7.3's
// allowed set). **None of them is widened here.** AGENTS.md §14.0 says a FAST
// session records what falls outside its scope and leaves it for the GATE, and
// re-basing R7.3's scope lists is GATE work — the next GATE reconciles them
// against whatever the presenter has ruled by then.
//
// What this file checks is what R7.4 itself claims, statically and in a second:
// the pacing invariant (the one that actually protects the recording), the two
// rounds proved unapplied, the flagged toggles, the deleted slide's total
// absence, the deck's new size, and the self-reference sweep.
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const SLIDES = path.join(REPO, 'src', 'slides');
const srcDir = path.join(REPO, 'src');
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
  d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]);
const allSrc = walk(srcDir).filter((f) => /\.(js|css)$/.test(f));
const slideFiles = walk(SLIDES).filter((f) => /\.js$/.test(f) && !path.basename(f).startsWith('_') && path.basename(f) !== 'manifest.js');
const stripComments = (t) => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  console.log(`${ok ? '  ok  ' : 'FAIL  '}${name}${detail ? ` :: ${detail}` : ''}`);
}

// ---------------------------------------------------------------- 1. PACING
{
  const mismatches = [];
  let builds = 0;
  let arrows = 0;
  slideFiles.forEach((file) => {
    const t = read(file);
    const id = (t.match(/id:\s*'([^']+)'/) || [])[1];
    const declared = Number((t.match(/totalBuildSteps:\s*(\d+)/) || [])[1]);
    const max = Number((t.match(/const MAX_STEP = (\d+)/) || [])[1]);
    const steps = Number.isFinite(declared) ? declared : max;
    const notesIdx = t.indexOf('notes:');
    const n = notesIdx > -1 ? (t.slice(notesIdx).match(/\[→\]/g) || []).length : 0;
    if (!Number.isFinite(steps)) return;
    builds += steps;
    arrows += n;
    if (steps !== n) mismatches.push(`${id}: ${steps} builds vs ${n} arrows`);
  });
  check('PACING: [→] count equals build count on every slide', mismatches.length === 0,
    mismatches.join(' · ') || `${builds} builds, ${arrows} arrows across ${slideFiles.length} slides`);
}

// ------------------------------------------------------- 2. THE DECK'S SIZE
{
  const manifest = read(path.join(SLIDES, 'manifest.js'));
  check('STRUCTURE: the falsifiability slide is gone from the manifest',
    !/s4_20b/.test(manifest) && !fs.existsSync(path.join(SLIDES, 'section-4-ideal-store', '20b-what-would-change-these-scores.js')),
    'no import, no array entry, no file');
  check('STRUCTURE: the deck is 45 slides', slideFiles.length === 45, `${slideFiles.length} slide modules`);
  const orphans = allSrc.filter((f) => /falsifiability/.test(stripComments(read(f))))
    .map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
  check('STRUCTURE: no falsifiability selector or reference survives in src/',
    orphans.length === 0, orphans.join(', ') || 'clean');
}

// -------------------------------------------------------- 3. THE TWO ROUNDS
{
  // §C's carrier candidates and §6's glyph candidates are proposals. Neither
  // may have a path into the deck, and the components they would replace must
  // be untouched.
  const carrierImporters = allSrc.filter((f) => /carrier-studio-r7-4/.test(read(f)))
    .map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
  check('STUDIO: the carrier treatments have no importer in src/',
    carrierImporters.length === 0, carrierImporters.join(', ') || 'proposals only');
  const shell = read(path.join(srcDir, 'components', 'section-4', 'CarrierShell.js'));
  check('STUDIO: CarrierShell still ships its R7.2 selection, unchanged',
    /const SELECTION = 'c';/.test(shell), "SELECTION = 'c' — the banded wall");
  const glyphImporters = allSrc.filter((f) => /candidates-r7-3/.test(read(f)))
    .map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
  check('STUDIO: R7.3\'s glyph candidates still have no importer in src/',
    glyphImporters.length === 0, glyphImporters.join(', ') || 'proposals only');
  const sheets = [
    'review/rebuild-r7-4/carrier-studio/contact-sheet.png',
    'review/rebuild-r7-4/screenshots/table-headers/headers-glyphs.png',
    'review/rebuild-r7-4/screenshots/table-headers/headers-dark-field.png'
  ];
  const missing = sheets.filter((f) => !fs.existsSync(path.join(REPO, f)));
  check('STUDIO: the three sheets this session owes the presenter exist',
    missing.length === 0, missing.join(', ') || sheets.length + ' delivered');
}

// ----------------------------------------------------- 4. FLAGGED TOGGLES
{
  const header = read(path.join(srcDir, 'components', 'section-4', 'ComparisonAssetHeader.js'));
  check('FLAGGED: the table-header exception ships glyphs',
    /export const TABLE_HEADERS_DARK_FIELD = false;/.test(header), 'TABLE_HEADERS_DARK_FIELD');
  check('FLAGGED: the featured-render toggle still ships off',
    /export const RAIL_FEATURE = false;/.test(read(path.join(srcDir, 'components', 'section-2', 'RailFeature.js'))), 'RAIL_FEATURE');
  check('FLAGGED: the gold-arrival toggle still ships off',
    /export const GOLD_ARRIVAL = false;/.test(read(path.join(SLIDES, 'section-2-origin', '05-two-survivors.js'))), 'GOLD_ARRIVAL');
}

// ------------------------------------------------- 5. THE REGISTER, R7.4
{
  // Display scale is the sensory register: every call site that renders an
  // asset at display scale must declare a non-line register on its slide.
  const users = slideFiles.filter((f) => /ComparisonAssetHeader\(/.test(read(f)));
  const undeclared = users.filter((f) => {
    const t = read(f);
    // 4.16 declares via the toggle; 4.21 asks for dark-field explicitly.
    return !/dataset\.register/.test(t);
  }).map((f) => path.basename(f));
  check('REGISTER: every slide showing a candidate declares a register',
    undeclared.length === 0, undeclared.join(', ') || `${users.length} slides`);

  const df = fs.readdirSync(path.join(REPO, 'assets', 'dark-field'))
    .filter((f) => /\.png$/i.test(f)).map((f) => f.replace(/\.png$/i, '')).sort();
  ['gold', 'bitcoin', 'property', 'shares', 'surgeon', 'meal'].forEach((s) => {
    check(`REGISTER: ${s} ships a graded render`, df.includes(s), df.includes(s) ? '' : 'missing');
  });
  const manifestDoc = read(path.join(REPO, 'docs', 'dark-field-manifest.md'));
  check('REGISTER: the one pending subject (fiat) is documented for regeneration',
    !df.includes('fiat') && /`fiat`/.test(manifestDoc), 'listed in docs/dark-field-manifest.md');
}

// --------------------------------------------- 6. THE SELF-REFERENCE SWEEP
{
  const MEDIUM = /\b(this presentation|these slides|my updated slides|this deck|this video|this talk)\b/i;
  const hits = slideFiles.filter((f) => MEDIUM.test(stripComments(read(f))))
    .map((f) => path.basename(f));
  check('LANGUAGE: no visible line or script names the medium',
    hits.length === 0, hits.join(', ') || 'swept');
  const verify = slideFiles.filter((f) => /textContent = 'Verify\.';/.test(read(f))).map((f) => path.basename(f));
  check('LANGUAGE: "Don\'t trust. Verify." is on stage exactly once, at the table',
    verify.length === 1 && verify[0].startsWith('16-'), verify.join(', ') || 'none');
}

const failures = results.filter((r) => !r.ok);
fs.writeFileSync(path.join(__dirname, '..', 'gates-r7-4.json'),
  JSON.stringify({ phase: 'R7.4', mode: 'FAST', checks: results.length, failures: failures.length, results }, null, 2));
console.log(`\nR7.4 gates (FAST subset): ${results.length} checks, ${failures.length} failures`);
process.exit(failures.length ? 1 : 0);
