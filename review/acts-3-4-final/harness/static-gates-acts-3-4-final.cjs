// Acts III–IV final — the static gates (the Act V kickoff brief, Part A:
// the four rulings made checkable at the source, the scripts verbatim, the
// protected lines re-verified in the installed deck, the frozen data, the
// splice). The Batch D gate suite's shape, applied to the four rulings.
//
//   1. BEATS      — S12's notes carry 3 arrows, S15's 7; Act III is 25; Act
//                   IV is unchanged at 42.
//   2. VERBATIM   — the installed Act III and Act IV scripts are their
//                   packages' §2 scripts, character for character (each
//                   act's own installer, --check).
//   3. PROTECTED  — the hinge question on stage and in S15's notes, the coda
//                   verbatim; "Don't trust. Verify." on stage exactly once
//                   across every module the manifest reaches; the crescendo
//                   and the dated scores still in their notes; the Scene 16
//                   join keeps the legacy "And".
//   4. FROZEN     — the two data files at the recorded blob ids.
//   5. LANGUAGE   — the self-reference ban over src/scenes.
//   6. SPLICE     — 3-00 and 3-04 on disk but out of the manifest, the
//                   function section gone, the counts stated, the seven Act
//                   V sources and the thirteen Act III–IV scenes still in.
//   7. SOURCE     — the rulings at their sources: the band in legacy 4-16,
//                   the label-only headings, the toggle gone, the pitch
//                   attribute; the household cells gone from the jobs stage
//                   and the exit state present; Scene 15's last transition
//                   touching the tower alone; Scene 16's entry at the slab.
//   8. CELLS      — both sheets' check records green on file at this
//                   session; the retired cells on disk at the carried shas.
//
// Recorded, not widened: the batch-c static gate asserts S12 = 4 and the
// batch-d static gate asserts the survivors stay in the manifest. Both are
// their batches' evidence at their tags; neither is re-run or edited here.
//
// Usage: node static-gates-acts-3-4-final.cjs
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync, spawnSync } = require('child_process');

const REPO = path.join(__dirname, '..', '..', '..');
const ACT3 = path.join(REPO, 'src', 'scenes', 'act-3-the-jobs-of-money');
const ACT4 = path.join(REPO, 'src', 'scenes', 'act-4-the-store-of-value-test');
const SCENES_DIR = path.join(REPO, 'src', 'scenes');
const LEGACY = path.join(REPO, 'src', 'slides', 'section-4-ideal-store');

const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  console.log(`${ok ? '  ok  ' : 'FAIL  '}${name}${detail ? ` :: ${detail}` : ''}`);
}
const notesOf = (src) => {
  const i = src.lastIndexOf('notes: `');
  const start = i + 'notes: `'.length;
  return src.slice(start, src.indexOf('`', start));
};
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
const stripComments = (s) => s.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
const arrows = (s) => (s.match(/\[→\]/g) || []).length;

const ACT3_SCENES = [
  ['S11', '11-three-familiar-jobs.js', 5], ['S12', '12-we-already-split-those-jobs.js', 3],
  ['S13', '13-the-order-of-monetization.js', 7], ['S14', '14-the-coffee-objection.js', 3], ['S15', '15-the-tower.js', 7]
];
const ACT4_SCENES = [
  ['S16', '16-return-to-the-open-exchange.js', 8], ['S17', '17-what-the-carrier-must-preserve.js', 5],
  ['S18', '18-the-100-year-test.js', 8], ['S19', '19-invert-the-question.js', 2],
  ['S20', '20-how-the-carrier-can-fail-i.js', 5], ['S21', '21-how-the-carrier-can-fail-ii.js', 5],
  ['S22', '22-from-failure-to-requirement.js', 3], ['S23', '23-the-comparison.js', 6]
];
const notes3 = Object.fromEntries(ACT3_SCENES.map(([k, f]) => [k, notesOf(read(path.join(ACT3, f)))]));
const notes4 = Object.fromEntries(ACT4_SCENES.map(([k, f]) => [k, notesOf(read(path.join(ACT4, f)))]));

// ------------------------------------------------------------------ 1. BEATS
{
  const bad3 = ACT3_SCENES.filter(([k, , n]) => arrows(notes3[k]) !== n).map(([k]) => `${k} ${arrows(notes3[k])}`);
  const total3 = ACT3_SCENES.reduce((s, [k]) => s + arrows(notes3[k]), 0);
  check('BEATS: every Act III scene’s notes carry the amended map’s arrows — S12 = 3, Act III is 25',
    bad3.length === 0 && total3 === 25, bad3.join(' · ') || `${ACT3_SCENES.map(([k]) => arrows(notes3[k])).join(' · ')} = ${total3}`);
  const bad4 = ACT4_SCENES.filter(([k, , n]) => arrows(notes4[k]) !== n).map(([k]) => `${k} ${arrows(notes4[k])}`);
  const total4 = ACT4_SCENES.reduce((s, [k]) => s + arrows(notes4[k]), 0);
  check('BEATS: Act IV is unchanged at 42', bad4.length === 0 && total4 === 42, bad4.join(' · ') || `${total4}`);
}

// --------------------------------------------------------------- 2. VERBATIM
{
  const run = (script) => spawnSync(process.execPath, [path.join(REPO, script), '--check'], { cwd: REPO, encoding: 'utf8' });
  const c = run('review/batch-c/harness/install-scripts.cjs');
  check('VERBATIM: the installed Act III scripts are docs/batch-c-package.md §2, character for character (the batch-c installer, --check)',
    c.status === 0, (c.stdout || '').trim().split('\n').pop());
  const d = run('review/batch-d/harness/install-scripts.cjs');
  check('VERBATIM: the installed Act IV scripts are docs/batch-d-package.md §2, character for character (the batch-d installer, --check)',
    d.status === 0, (d.stdout || '').trim().split('\n').pop());
}

// -------------------------------------------------------------- 3. PROTECTED
{
  const HINGE = 'What makes something a good store of value?';
  const CODA = '[→] So now we can ask it properly. What makes something a good store of value? That question — asked from first principles — is the rest of this story.';
  const stage = read(path.join(ACT3, '_jobsStage.js'));
  const onStage = stage.includes(`question: '${HINGE}'`) &&
    /\{ tower: 7, question: S14_LINES\.question \}/.test(stage);
  check('PROTECTED: the hinge question stands on stage at the exit, word for word — the stage’s question string and the S15 b7 state', onStage);
  check('PROTECTED: the pivot coda is the last paragraph of S15’s installed notes, verbatim', notes3.S15.trim().endsWith(CODA));
  check('PROTECTED: the hinge question appears in S15’s notes exactly once, inside the coda', notes3.S15.split(HINGE).length - 1 === 1);
  const pkg = read(path.join(REPO, 'docs', 'batch-c-package.md'));
  check('PROTECTED: the package carries the coda verbatim and the master records the wording as protected',
    pkg.includes(CODA) && /wording is protected as Act IV's hinge question/.test(read(path.join(REPO, 'docs', 'what-is-money-master.md'))));

  const CRESCENDO = 'you cannot print money. You can only print the units it comes in — and every unit printed drains the ones already earned.';
  check('PROTECTED: the bisection crescendo stands in S16’s notes, character for character', notes4.S16.includes(`**${CRESCENDO}**`));
  check('PROTECTED: the scores are dated in S23’s notes — "my judgments, as of 2026"', /these fifty scores are my judgments, as of 2026\./.test(notes4.S23));
  check('PROTECTED: the Scene 16 join keeps the legacy "And" (the leftovers ruling, closed)',
    notes4.S16.includes('The surgeon is still holding the claim he accepted that day. And this is the moment to pay a debt'));

  const manifest = stripComments(read(path.join(REPO, 'src', 'slides', 'manifest.js')));
  const reachable = new Set();
  const visit = (file) => {
    const abs = path.resolve(file);
    if (reachable.has(abs) || !fs.existsSync(abs)) return;
    reachable.add(abs);
    const src = stripComments(read(abs));
    [...src.matchAll(/from '(\.[^']+)'/g)].forEach((m) => {
      const target = path.resolve(path.dirname(abs), m[1]);
      if (target.endsWith('.js')) visit(target);
    });
  };
  [...manifest.matchAll(/from '(\.[^']+)'/g)].forEach((m) => visit(path.join(REPO, 'src', 'slides', m[1])));
  const onStageVerify = [...reachable].filter((f) => /textContent = 'Don’t trust\.'|textContent = 'Verify\.'/.test(read(f)))
    .map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
  check('PROTECTED: "Don’t trust. Verify." is on stage exactly once across every module the manifest reaches — legacy 4-16, re-homed at S23 b6',
    onStageVerify.length === 1 && onStageVerify[0] === 'src/slides/section-4-ideal-store/16-the-comparison.js', `${reachable.size} modules reached · on stage in: ${onStageVerify.join(', ') || 'none'}`);
  results.reachable = reachable.size;
}

// ----------------------------------------------------------------- 4. FROZEN
{
  const FROZEN_BLOBS = {
    'src/slides/section-4-ideal-store/_comparison-data.js': '3a6440aa274260924ae6b83d896d60f37a5f1154',
    'src/slides/section-4-ideal-store/_failure-property-data.js': 'c1eb13d4d22eebedf4600d708e6f61c7a7cd0bc0'
  };
  const bad = [];
  Object.entries(FROZEN_BLOBS).forEach(([file, blob]) => {
    const committed = execSync(`git rev-parse HEAD:${file}`, { cwd: REPO }).toString().trim();
    if (committed !== blob) bad.push(`${file}: HEAD ${committed.slice(0, 8)} vs recorded ${blob.slice(0, 8)}`);
    const dirty = execSync(`git status --porcelain -- ${file}`, { cwd: REPO }).toString().trim();
    if (dirty) bad.push(`${file}: working tree differs`);
  });
  check('FROZEN: the two data files’ committed blob ids are the ids the ruled map records, and the working tree carries no change to them',
    bad.length === 0, bad.join(' · ') || '3a6440aa… and c1eb13d4… — untouched');
}

// --------------------------------------------------------------- 5. LANGUAGE
{
  const MEDIUM = /\b(this presentation|these slides|my updated slides|this deck|this video|this talk|this film|one slide ago|the rest of the evening|tonight)\b/i;
  const sceneFiles = walk(SCENES_DIR).filter((f) => f.endsWith('.js'));
  const hits = sceneFiles.filter((f) => MEDIUM.test(stripComments(read(f)))).map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
  check('LANGUAGE: no visible line or script in src/scenes/ names the medium or the live delivery', hits.length === 0, hits.join(', ') || `${sceneFiles.length} scene files swept`);
}

// ----------------------------------------------------------------- 6. SPLICE
{
  const manifest = read(path.join(REPO, 'src', 'slides', 'manifest.js'));
  const code = stripComments(manifest);
  const RETIRED = ['section-3-function/00-waypoint-function.js', 'section-3-function/04-stage-signatures.js'];
  const onDisk = RETIRED.every((f) => fs.existsSync(path.join(REPO, 'src', 'slides', f)));
  const imported = RETIRED.filter((f) => code.includes(f.split('/')[1]));
  check('SPLICE: 3-00 and 3-04 stay on disk and are out of the manifest', onDisk && imported.length === 0, imported.join(', ') || '2/2 on disk, 0/2 imported');
  check('SPLICE: the function section has left the sections list', !/id: 'function'/.test(code));
  check('SPLICE: the counts are stated in the manifest’s own record (34 → 32)', /\*\*The deck is 32 slides\*\* \(was 34\)/.test(manifest));
  const ACT_V = ['17-store-of-value-function-migrates', '18-monetary-premium', '19-other-assets-do-moneys-job',
    '20-bitcoin-does-not-replace-everything', '21-marginal-store-of-value-decision', '22-fixed-supply-reprices-at-margin', '23-investment-case-from-first-principles'];
  check('SPLICE: the seven Act V sources (4-17 … 4-23) and the close stay in the manifest for Batch E',
    ACT_V.every((f) => code.includes(f)) && code.includes('section-5-close/01-thank-you.js'));
  const scenes = [...ACT3_SCENES, ...ACT4_SCENES].map(([, f]) => f.replace(/\.js$/, '')).filter((f) => !code.includes(f));
  check('SPLICE: the thirteen Act III–IV scenes are in the manifest', scenes.length === 0, scenes.join(', ') || '13/13');
}

// ----------------------------------------------------------------- 7. SOURCE
{
  const s416 = stripComments(read(path.join(LEGACY, '16-the-comparison.js')));
  const table = stripComments(read(path.join(REPO, 'src', 'components', 'section-4', 'AssetComparisonTable.js')));
  const header = stripComments(read(path.join(REPO, 'src', 'components', 'section-4', 'ComparisonAssetHeader.js')));
  const css = read(path.join(REPO, 'src', 'styles', 'slides.css'));
  const subjects = ['gold', 'fiat', 'bitcoin', 'property', 'shares'].every((s) => new RegExp(`\\b${s}: \\d+ / \\d+`).test(s416));
  check('SOURCE (ruling 2): legacy 4-16 builds the header band — five subjects in the rails-law box, the register mixed, the pitch attribute on the root',
    /s4-comparison__band/.test(s416) && /const BAND = 188/.test(s416) && subjects && /dataset\.register = 'mixed'/.test(s416) && /dataset\.band = 'true'/.test(s416));
  check('SOURCE (ruling 2): the table’s asset headings carry the label alone, and the R7.4 toggle is gone from src/',
    /mark: false/.test(table) && !/TABLE_HEADERS_DARK_FIELD/.test(table) && !/TABLE_HEADERS_DARK_FIELD/.test(header) && !/TABLE_HEADERS_DARK_FIELD/.test(s416) &&
    walk(path.join(REPO, 'src')).filter((f) => f.endsWith('.js')).every((f) => !read(f).includes('TABLE_HEADERS_DARK_FIELD')));
  check('SOURCE (ruling 2): the stylesheet carries the band and the tightened pitch under the attribute, the legacy pitch kept',
    /\.s4-comparison__band \{/.test(css) && /\[data-band="true"\] \.s4-comparison-table__row \{\s*height: 48px;/.test(css) &&
    /^\.s4-comparison-table__row \{\s*height: 60px;/m.test(css));

  const stage = stripComments(read(path.join(ACT3, '_jobsStage.js')));
  const splitBlock = stage.slice(stage.indexOf('const SPLIT_CELLS'), stage.indexOf('const SPLIT_BAND_BOTTOM'));
  check('SOURCE (ruling 1): the jobs stage carries no household cells, and Scene 12 stands at three states',
    !/household/.test(splitBlock) && /'we-already-split-those-jobs': \[\s*\{ split: \{\} \},\s*\{ split: \{ cells: 'argentina', kicker: true \} \},\s*\{ split: \{ cells: 'argentina', kicker: true, principle: true \} \}\s*\]/.test(stage));
  check('SOURCE (ruling 3): the jobs stage’s exit state stands only the base slab', /const exit = beat >= 7;/.test(stage) && /apps: beat >= 1 && !exit/.test(stage));
  const tower = stripComments(read(path.join(ACT3, '15-the-tower.js')));
  const t6 = tower.slice(tower.indexOf('6: (mod, stage) =>'), tower.indexOf('export default'));
  check('SOURCE (ruling 3): Scene 15’s last transition dissolves the upper layers, the links and the drop and lands the question — no triad, no token',
    /slabs\.apps\.el, stage\.slabs\.deposits\.el/.test(t6) && /stage\.drop/.test(t6) && /landStatement\(/.test(t6) && !/triadLayer|token|spokes/.test(t6));
  const s16 = stripComments(read(path.join(ACT4, '16-return-to-the-open-exchange.js')));
  check('SOURCE (ruling 3): Scene 16’s entry begins its disc at the base slab’s center', /const SLAB_DISC = \[960, 528, 120\];/.test(s16) && !/TRIAD_DISC/.test(s16));
}

// ------------------------------------------------------------------ 8. CELLS
{
  const c3 = JSON.parse(read(path.join(REPO, 'review', 'act-3', 'harness', 'check-cells.json')));
  const c4 = JSON.parse(read(path.join(REPO, 'review', 'act-4', 'harness', 'check-cells.json')));
  check('CELLS: both sheets’ check records are green on file at this session',
    c3.failures === 0 && c3.session === 'acts-3-4-final' && c4.failures === 0 && c4.session === 'acts-3-4-final',
    `act-3 ${c3.checks - c3.failures}/${c3.checks} · act-4 ${c4.checks - c4.failures}/${c4.checks}`);
  const r3 = JSON.parse(read(path.join(REPO, 'review', 'act-3', 'states', 'states.json')));
  const r4 = JSON.parse(read(path.join(REPO, 'review', 'act-4', 'states', 'states.json')));
  check('CELLS: the Act III record stands at 25 beats and 31 cells; the Act IV record at 42',
    r3.beatMap.total === 25 && r3.cellCount === 31 && r4.beatMap.total === 42 && r4.cellCount === 42, `${r3.beatMap.total}/${r3.cellCount} · ${r4.beatMap.total}/${r4.cellCount}`);
  const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(path.join(REPO, 'review', 'act-3', 'states', f))).digest('hex');
  check('CELLS: the retired cells are on disk at the carried shas — the household row (the approved s12-b2) and the triad coda (the approved s14-b4)',
    sha('s12-b2-household.png') === '9512f386e3e9ecda4086c5f8b53581595620d30bc16665cd3995708bc80f98b5' &&
    sha('s15-b7-triad.png') === '8e69451b67206dda1f56e54543a5e088290a08e6c692e701baf12ee44ee6538d');
}

fs.writeFileSync(path.join(__dirname, '..', 'static-gates-acts-3-4-final.json'), JSON.stringify({
  date: new Date().toISOString(),
  session: 'acts-3-4-final',
  supersededNotWidened: 'review/batch-c/harness/static-gates.cjs (S12 = 4) and review/batch-d/harness/static-gates.cjs (the survivors stay) are their batches’ evidence at their tags; neither is re-run or edited here',
  checks: results.length,
  failures: results.filter((r) => !r.ok).length,
  results
}, null, 2));

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} static gates green`);
process.exit(failed.length ? 1 : 0);
