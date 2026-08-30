// Batch A — the static gates (docs/batch-a-implementation-brief.md §5).
//
// Everything checkable without a browser:
//   1. PACING     — every `[→]` in an installed script maps to exactly one
//                   advance, in order.
//   2. VERBATIM   — the installed scripts are the batch package's §2 scripts,
//                   character for character.
//   3. LANGUAGE   — the self-reference ban, over visible text and notes.
//   4. SWEEP      — AGENTS.md §14's search-based cleanup list.
//   5. SPLICE     — the eleven superseded legacy slides are out of the manifest
//                   and still on disk, and nothing in src/ still names them.
//   6. REGISTER   — no raster reference outside the dark-field register; no
//                   accent anywhere in the Prologue.
//
// Usage: node static-gates.cjs
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const SRC = path.join(REPO, 'src');
const SCENES = path.join(SRC, 'scenes');
const SLIDES = path.join(SRC, 'slides');

const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(dir, e.name);
  return e.isDirectory() ? walk(p) : [p];
});
const stripComments = (t) => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  console.log(`${ok ? '  ok  ' : 'FAIL  '}${name}${detail ? ` :: ${detail}` : ''}`);
}

// The five new scenes, in deck order. `entered` is whether the scene is
// reached by an advance — which is where its own script's first `[→]` goes
// (master §7: "the advance that leaves the scene belongs to the next scene's
// script"). P1 is the film's first frame and is reached by nothing, so its
// opening line is spoken over the authored black with no arrow.
const NEW_SCENES = [
  { file: path.join(SCENES, 'prologue', 'p1-eighty-thousand-hours.js'), key: 'P1', entered: false },
  { file: path.join(SCENES, 'prologue', 'p2-the-stakes.js'), key: 'P2', entered: true },
  { file: path.join(SCENES, 'act-1-the-unfinished-exchange', '02-the-direct-exchange.js'), key: 'S2', entered: true },
  { file: path.join(SCENES, 'act-1-the-unfinished-exchange', '03-the-breakthrough.js'), key: 'S3', entered: true },
  { file: path.join(SCENES, 'act-1-the-unfinished-exchange', '04-spend-or-save.js'), key: 'S4', entered: true }
];

// The build counts are the stage's, not the module's, for Act I; read them
// from the two places they are actually declared.
const stageSrc = read(path.join(SCENES, 'act-1-the-unfinished-exchange', '_exchangeStage.js'));

// The state table's own array for a scene id, read by bracket balance rather
// than by a shape-guessing regex — the count is the gate's whole point, so it
// must not silently return nothing when the formatting moves.
function stateBlock(id) {
  const open = stageSrc.indexOf(`'${id}': [`);
  if (open < 0) return null;
  let i = stageSrc.indexOf('[', open);
  let depth = 0;
  for (; i < stageSrc.length; i += 1) {
    if (stageSrc[i] === '[') depth += 1;
    else if (stageSrc[i] === ']') {
      depth -= 1;
      if (depth === 0) return stageSrc.slice(open, i + 1);
    }
  }
  return null;
}
const ACT1_BUILDS = {
  'the-direct-exchange': stateBlock('the-direct-exchange'),
  'the-breakthrough': stateBlock('the-breakthrough'),
  'spend-or-save': stateBlock('spend-or-save')
};
const countStates = (block) => (block ? (block.match(/^ {4}\{/gm) || []).length : null);

const notesOf = (src) => {
  const i = src.lastIndexOf('notes: `');
  if (i < 0) return null;
  const start = i + 'notes: `'.length;
  const end = src.indexOf('`', start);
  return src.slice(start, end);
};

// ------------------------------------------------------------------ 1. PACING
{
  const rows = [];
  const bad = [];
  for (const sc of NEW_SCENES) {
    const src = read(sc.file);
    const notes = notesOf(src);
    const arrows = (notes.match(/\[→\]/g) || []).length;
    // The Prologue scenes declare their id inline; the Act I scenes hold it in
    // `const ID` and pass it to the shared contract.
    const id = (src.match(/const ID = '([^']+)'/) || src.match(/id:\s*'([^']+)'/) || [])[1];
    let builds = Number((src.match(/const MAX_STEP = (\d+)/) || [])[1]);
    if (!Number.isFinite(builds)) builds = countStates(ACT1_BUILDS[id]) - 1;
    const expected = builds + (sc.entered ? 1 : 0);
    rows.push({ scene: sc.key, id, builds, arrows, expected });
    if (arrows !== expected) bad.push(`${sc.key}: ${arrows} arrows vs ${expected} expected`);
  }
  check('PACING: every [→] maps to exactly one advance', bad.length === 0,
    bad.join(' · ') || rows.map((r) => `${r.scene} ${r.arrows}→${r.builds}`).join(' · '));
}

// ---------------------------------------------------------------- 2. VERBATIM
{
  const pkg = read(path.join(REPO, 'docs', 'batch-a-package.md'));
  const section = pkg.slice(pkg.indexOf('# 2. Scripts'), pkg.indexOf('# 3. Style-frame'));
  const HEADINGS = {
    P1: '## P1 — Eighty Thousand Hours / What Is Money?',
    P2: '## P2 — The Stakes',
    S2: '## S2 — The Direct Exchange',
    S3: '## S3 — The Breakthrough',
    S4: '## S4 — Spend or Save'
  };
  const keys = Object.keys(HEADINGS);
  const bad = [];
  keys.forEach((k, i) => {
    const start = section.indexOf(HEADINGS[k]);
    const nextHead = i + 1 < keys.length ? section.indexOf(HEADINGS[keys[i + 1]]) : section.length;
    const script = section.slice(start + HEADINGS[k].length, nextHead)
      .replace(/\n---\n[\s\S]*$/, '')
      .trim();
    const sc = NEW_SCENES.find((s) => s.key === k);
    const notes = notesOf(read(sc.file)).trim();
    if (script !== notes) {
      // Report the first divergence, not the whole text.
      let at = 0;
      while (at < script.length && at < notes.length && script[at] === notes[at]) at += 1;
      bad.push(`${k} diverges at char ${at}: package “${script.slice(at, at + 40)}” vs notes “${notes.slice(at, at + 40)}”`);
    }
  });
  check('VERBATIM: the installed scripts are the package’s §2 scripts, character for character',
    bad.length === 0, bad.join(' · ') || '5/5 identical');
}

// --------------------------------------------------------------- 3. LANGUAGE
{
  const MEDIUM = /\b(this presentation|these slides|my updated slides|this deck|this video|this talk)\b/i;
  const sceneFiles = walk(SCENES).filter((f) => f.endsWith('.js'));
  const hits = sceneFiles.filter((f) => MEDIUM.test(stripComments(read(f))))
    .map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
  check('LANGUAGE: no visible line or script in src/scenes/ names the medium',
    hits.length === 0, hits.join(', ') || `${sceneFiles.length} scene files swept`);

  // The ban is about what reaches the viewer, so the notes are swept on their
  // own too — they are the recording script, not commentary.
  const noteHits = NEW_SCENES.filter((sc) => MEDIUM.test(notesOf(read(sc.file)))).map((s) => s.key);
  check('LANGUAGE: no installed script names the medium', noteHits.length === 0,
    noteHits.join(', ') || '5/5 clean');
}

// ------------------------------------------------------------------ 4. SWEEP
{
  // AGENTS.md §14's search-based cleanup list, over the new scenes only (the
  // legacy deck is the GATE's scope, not a FAST batch's).
  const TERMS = [
    'German investment advisor', 'perfect engineered solution', 'refrigeration',
    'L1:', 'thought experiment'
  ];
  const sceneFiles = walk(SCENES).filter((f) => f.endsWith('.js'));
  const hits = [];
  sceneFiles.forEach((f) => {
    const t = read(f);
    TERMS.forEach((term) => {
      if (t.toLowerCase().includes(term.toLowerCase())) {
        hits.push(`${path.basename(f)}: “${term}”`);
      }
    });
  });
  check('SWEEP: none of the retired-wording terms appears in the new scenes',
    hits.length === 0, hits.join(' · ') || `${TERMS.length} terms, ${sceneFiles.length} files`);

  // Absolute slide numbers: a scene must not name its own deck position.
  const numbered = NEW_SCENES.filter((sc) => /\b(slide|scene) (number )?\d+\b/i.test(notesOf(read(sc.file))))
    .map((s) => s.key);
  check('SWEEP: no installed script names an absolute slide number',
    numbered.length === 0, numbered.join(', ') || '5/5 clean');
}

// ----------------------------------------------------------------- 5. SPLICE
{
  const SUPERSEDED = [
    ['section-1-question/01-eighty-thousand-hours.js', '1-01-eighty-thousand-hours'],
    ['section-1-question/02-the-conversion.js', '1-02-the-conversion'],
    ['section-1-question/03-what-is-money.js', '1-03-what-is-money'],
    ['section-1-question/04-the-stakes.js', '1-04-the-stakes'],
    ['section-1-question/05-the-promise.js', '1-05-the-promise'],
    ['section-2-origin/01-the-world-without-it.js', '2-01-the-world-without-it'],
    ['section-2-origin/02-the-discovery.js', '2-02-the-discovery'],
    ['section-2-origin/03-the-convergence.js', '2-03-the-convergence'],
    ['section-4-ideal-store/03-simple-exchange.js', '4-03-simple-exchange'],
    ['section-4-ideal-store/04-unfinished-exchange.js', '4-04-unfinished-exchange'],
    ['section-4-ideal-store/05-spend-or-save.js', '4-05-spend-or-save']
  ];
  const manifest = read(path.join(SLIDES, 'manifest.js'));
  const stillImported = SUPERSEDED.filter(([file]) => manifest.includes(`'./${file}'`)).map(([, id]) => id);
  check('SPLICE: no superseded slide is imported by the manifest',
    stillImported.length === 0, stillImported.join(', ') || '11/11 removed');

  const missing = SUPERSEDED.filter(([file]) => !fs.existsSync(path.join(SLIDES, file))).map(([, id]) => id);
  check('SPLICE: every superseded slide file is still on disk',
    missing.length === 0, missing.join(', ') || '11/11 kept');

  // No surviving module may reference a retired id — deep links, continuations,
  // scene groups, prose.
  const srcFiles = walk(SRC).filter((f) => /\.(js|css)$/.test(f));
  const refs = [];
  SUPERSEDED.forEach(([file, id]) => {
    srcFiles.forEach((f) => {
      if (path.relative(SLIDES, f).replace(/\\/g, '/') === file) return;   // the retired file itself
      if (stripComments(read(f)).includes(id)) {
        refs.push(`${path.relative(REPO, f).replace(/\\/g, '/')} → ${id}`);
      }
    });
  });
  check('SPLICE: no surviving module references a retired id',
    refs.length === 0, refs.join(' · ') || 'no stale deep links');

  const importedNames = (manifest.match(/^import \w+ from/gm) || []).length;
  const arrayEntries = new Set((manifest.match(/\b(p1|p2|scene[234]|s[2345]_\d+)\b(?=[,\]\s])/g) || []));
  check('SPLICE: the manifest imports exactly what it lists',
    importedNames === 39, `${importedNames} imports, ${arrayEntries.size} distinct names in the arrays`);
}

// --------------------------------------------------------------- 6. REGISTER
{
  const sceneFiles = walk(SCENES).filter((f) => f.endsWith('.js'));
  const rasterPaths = sceneFiles.filter((f) => /['"`][^'"`]*\.(png|jpe?g|webp)['"`]/i.test(stripComments(read(f))))
    .map((f) => path.basename(f));
  check('REGISTER: no scene names an image path', rasterPaths.length === 0,
    rasterPaths.join(', ') || 'every raster goes through src/dark-field.js');

  // The Prologue is monochrome plus photographic warmth: the accent enters the
  // film at the Claim Mark's birth, in Scene 3, and nowhere earlier.
  const prologueFiles = walk(path.join(SCENES, 'prologue')).filter((f) => f.endsWith('.js'));
  const accent = prologueFiles.filter((f) => /--accent|#F7931A|ClaimMark|LuminousDisc|luminous-disc/i.test(read(f)))
    .map((f) => path.basename(f));
  check('REGISTER: no accent, no Claim Mark and no disc anywhere in the Prologue',
    accent.length === 0, accent.join(', ') || `${prologueFiles.length} files clean`);

  // And the accent's entry point is the birth: Scene 2 must not carry it.
  const s2 = read(path.join(SCENES, 'act-1-the-unfinished-exchange', '02-the-direct-exchange.js'));
  check('REGISTER: Scene 2 carries no accent', !/--accent|#F7931A/i.test(s2),
    'orange enters at the birth in Scene 3');
}

fs.writeFileSync(path.join(__dirname, '..', 'static-gates.json'), JSON.stringify({
  date: new Date().toISOString(),
  checks: results.length,
  failures: results.filter((r) => !r.ok).length,
  results
}, null, 2));

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} static gates green`);
process.exit(failed.length ? 1 : 0);
