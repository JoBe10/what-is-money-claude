// Batch B — the static gates (docs/batch-b-implementation-brief.md §3).
//
// Everything checkable without a browser. These are the checks the pixel proof
// cannot make: it proves that every settled frame is the frame he approved, and
// says nothing about the words under it, the running order around it, or what
// the splice left behind.
//
//   1. PACING     — every `[→]` in an installed Act II script maps to exactly
//                   one advance, in order.
//   2. VERBATIM   — the installed scripts are `docs/batch-b-package.md` §2's
//                   scripts, character for character.
//   3. LANGUAGE   — the self-reference ban, over visible text and notes.
//   4. SWEEP      — AGENTS.md §14's search-based cleanup list, plus absolute
//                   slide numbers in a script.
//   5. GUARDRAILS — master §10's prohibited overclaims, over the Act II
//                   scripts (S9 is the scene the rule exists for).
//   6. SPLICE     — the six superseded legacy slides are out of the manifest
//                   and still on disk, nothing in src/ still names them, and
//                   the manifest imports exactly what it lists.
//   7. REGISTER   — no raster reference outside the dark-field register; the
//                   rails law's own clause, that no render stands on a drawn
//                   line; no accent anywhere in the Prologue.
//   8. DEAD CODE  — Act II left the scratch route at the splice, and the
//                   scene contract dropped the protoKey with it.
//
// Usage: node static-gates.cjs
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const SRC = path.join(REPO, 'src');
const SCENES = path.join(SRC, 'scenes');
const SLIDES = path.join(SRC, 'slides');
const ACT2 = path.join(SCENES, 'act-2-the-architecture-of-money');

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

// Act II's six scenes, in deck order. Every one of them is REACHED BY AN
// ADVANCE, so its script's first `[→]` is spoken over its entry (master §7 —
// the advance that leaves a scene belongs to the next scene's script), and the
// arrow count is builds + 1.
const ACT2_SCENES = [
  { key: 'S5', id: 'the-function-stayed', file: '05-the-function-stayed.js' },
  { key: 'S6', id: 'scarcity-in-matter', file: '06-gold-scarcity-in-matter.js' },
  { key: 'S7', id: 'claims-on-gold', file: '07-claims-on-gold.js' },
  { key: 'S8', id: 'money-becomes-information', file: '08-money-becomes-information.js' },
  { key: 'S9', id: 'scarcity-becomes-digital', file: '09-scarcity-becomes-digital.js' },
  { key: 'S10', id: 'the-trade-off-keeps-moving', file: '10-the-trade-off-keeps-moving.js' }
];

const stageSrc = read(path.join(ACT2, '_architectureStage.js'));

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
const countStates = (block) => (block ? (block.match(/^ {4}\{/gm) || []).length : null);

const notesOf = (src) => {
  const i = src.lastIndexOf('notes: `');
  if (i < 0) return null;
  const start = i + 'notes: `'.length;
  return src.slice(start, src.indexOf('`', start));
};

// ------------------------------------------------------------------ 1. PACING
{
  const rows = [];
  const bad = [];
  for (const sc of ACT2_SCENES) {
    const notes = notesOf(read(path.join(ACT2, sc.file)));
    const arrows = (notes.match(/\[→\]/g) || []).length;
    const states = countStates(stateBlock(sc.id));
    if (states == null) { bad.push(`${sc.key}: no state block for "${sc.id}"`); continue; }
    const builds = states - 1;
    const expected = builds + 1;   // reached by an advance
    rows.push(`${sc.key} ${arrows}→${builds}`);
    if (arrows !== expected) bad.push(`${sc.key}: ${arrows} arrows vs ${expected} expected`);
  }
  const total = ACT2_SCENES.reduce((n, sc) => n + countStates(stateBlock(sc.id)), 0);
  check('PACING: every [→] maps to exactly one advance', bad.length === 0 && total === 37,
    bad.join(' · ') || `${rows.join(' · ')} — ${total} beats`);
}

// ---------------------------------------------------------------- 2. VERBATIM
{
  const pkg = read(path.join(REPO, 'docs', 'batch-b-package.md'));
  const section = pkg.slice(pkg.indexOf('# 2. Scripts'), pkg.indexOf('# 3. Style-frame'));
  const bad = [];
  ACT2_SCENES.forEach((sc, i) => {
    const start = section.indexOf(`\n## ${sc.key} — `);
    const nextKey = ACT2_SCENES[i + 1] ? `\n## ${ACT2_SCENES[i + 1].key} — ` : '\n## The contracts';
    const end = section.indexOf(nextKey, start);
    const block = section.slice(start, end < 0 ? section.length : end);
    // The package's own bracketed annotations are its record, not spoken
    // material: S6 opens with a re-split note (Session 1 report §6.5). What is
    // installed, and what is compared, is the `[→]` paragraphs.
    const want = block.split('\n\n').map((p) => p.trim())
      .filter((p) => p.startsWith('[→]')).join('\n\n');
    const notes = notesOf(read(path.join(ACT2, sc.file)));
    if (want !== notes) {
      let at = 0;
      while (at < want.length && at < notes.length && want[at] === notes[at]) at += 1;
      bad.push(`${sc.key} diverges at char ${at}: package “${want.slice(at, at + 40)}”` +
        ` vs notes “${notes.slice(at, at + 40)}”`);
    }
  });
  check('VERBATIM: the installed scripts are the package’s §2 scripts, character for character',
    bad.length === 0, bad.join(' · ') || '6/6 identical');
}

// --------------------------------------------------------------- 3. LANGUAGE
{
  const MEDIUM = /\b(this presentation|these slides|my updated slides|this deck|this video|this talk)\b/i;
  const sceneFiles = walk(SCENES).filter((f) => f.endsWith('.js'));
  const hits = sceneFiles.filter((f) => MEDIUM.test(stripComments(read(f))))
    .map((f) => path.relative(REPO, f).replace(/\\/g, '/'));
  check('LANGUAGE: no visible line or script in src/scenes/ names the medium',
    hits.length === 0, hits.join(', ') || `${sceneFiles.length} scene files swept`);

  const noteHits = ACT2_SCENES.filter((sc) => MEDIUM.test(notesOf(read(path.join(ACT2, sc.file)))))
    .map((s) => s.key);
  check('LANGUAGE: no Act II script names the medium', noteHits.length === 0,
    noteHits.join(', ') || '6/6 clean');
}

// ------------------------------------------------------------------ 4. SWEEP
{
  const TERMS = [
    'German investment advisor', 'perfect engineered solution', 'refrigeration',
    'L1:', 'thought experiment', 'salability'
  ];
  const act2Files = walk(ACT2).filter((f) => f.endsWith('.js'));
  const hits = [];
  act2Files.forEach((f) => {
    const t = read(f);
    TERMS.forEach((term) => {
      if (t.toLowerCase().includes(term.toLowerCase())) hits.push(`${path.basename(f)}: “${term}”`);
    });
  });
  check('SWEEP: none of the retired-wording terms appears in Act II',
    hits.length === 0, hits.join(' · ') || `${TERMS.length} terms, ${act2Files.length} files`);

  const numbered = ACT2_SCENES
    .filter((sc) => /\b(slide|scene) (number )?\d+\b/i.test(notesOf(read(path.join(ACT2, sc.file)))))
    .map((s) => s.key);
  check('SWEEP: no Act II script names an absolute slide number',
    numbered.length === 0, numbered.join(', ') || '6/6 clean');
}

// ------------------------------------------------------------- 5. GUARDRAILS
{
  // Master §10's prohibited overclaims, in the forms a script could actually
  // reach them. Scene 9 is the scene these exist for: it describes and never
  // argues, and the honesty rides in the same breath as the capabilities.
  const BANNED = [
    /\brisk[- ]free\b/i,
    /\bguarantees? (your )?purchasing power\b/i,
    /\bbitcoin is perfect\b/i,
    /\bvolatility is (the )?(a )?feature\b/i,
    /\bno dependencies\b/i,
    /\bcan never change\b/i,
    /\bpurpose[- ]built\b/i,
    /\bengineered\b/i
  ];
  const hits = [];
  ACT2_SCENES.forEach((sc) => {
    const notes = notesOf(read(path.join(ACT2, sc.file)));
    BANNED.forEach((re) => {
      const m = notes.match(re);
      if (m) hits.push(`${sc.key}: “${m[0]}”`);
    });
  });
  check('GUARDRAILS: no Act II script makes a master §10 prohibited overclaim',
    hits.length === 0, hits.join(' · ') || `${BANNED.length} patterns, 6 scripts`);
}

// ----------------------------------------------------------------- 6. SPLICE
{
  const SUPERSEDED = [
    ['section-2-origin/04-the-competition-record.js', '2-04-the-competition-record'],
    ['section-2-origin/05-two-survivors.js', '2-05-two-survivors'],
    ['section-2-origin/06-the-abstraction-ladder.js', '2-06-the-abstraction-ladder'],
    ['section-2-origin/07-the-severance.js', '2-07-the-severance'],
    ['section-2-origin/08-the-pattern.js', '2-08-the-pattern'],
    ['section-3-function/05-the-palladium-test.js', '3-05-the-palladium-test']
  ];
  const manifest = read(path.join(SLIDES, 'manifest.js'));
  const stillImported = SUPERSEDED.filter(([file]) => manifest.includes(`'./${file}'`)).map(([, id]) => id);
  check('SPLICE: no superseded slide is imported by the manifest',
    stillImported.length === 0, stillImported.join(', ') || '6/6 removed');

  const missing = SUPERSEDED.filter(([file]) => !fs.existsSync(path.join(SLIDES, file))).map(([, id]) => id);
  check('SPLICE: every superseded slide file is still on disk',
    missing.length === 0, missing.join(', ') || '6/6 kept');

  // No surviving module may reference a retired id in live code — deep links,
  // continuations, scene groups. Comments are the provenance trail and stay.
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
  check('SPLICE: no surviving module references a retired id in live code',
    refs.length === 0, refs.join(' · ') || 'no stale deep links');

  const importedNames = (manifest.match(/^import \w+ from/gm) || []).length;
  check('SPLICE: the manifest imports exactly the 39 slides it lists',
    importedNames === 39, `${importedNames} imports`);

  // The eleven Batch A retirements are still out, and still on disk — a splice
  // must not quietly resurrect what an earlier one removed.
  const BATCH_A = [
    'section-1-question/01-eighty-thousand-hours.js', 'section-1-question/02-the-conversion.js',
    'section-1-question/03-what-is-money.js', 'section-1-question/04-the-stakes.js',
    'section-1-question/05-the-promise.js', 'section-2-origin/01-the-world-without-it.js',
    'section-2-origin/02-the-discovery.js', 'section-2-origin/03-the-convergence.js',
    'section-4-ideal-store/03-simple-exchange.js', 'section-4-ideal-store/04-unfinished-exchange.js',
    'section-4-ideal-store/05-spend-or-save.js'
  ];
  const resurrected = BATCH_A.filter((f) => manifest.includes(`'./${f}'`));
  const goneFromDisk = BATCH_A.filter((f) => !fs.existsSync(path.join(SLIDES, f)));
  check('SPLICE: Batch A’s eleven retirements are still out of the manifest and still on disk',
    resurrected.length === 0 && goneFromDisk.length === 0,
    [...resurrected, ...goneFromDisk].join(', ') || '11/11 out, 11/11 kept');
}

// --------------------------------------------------------------- 7. REGISTER
{
  const sceneFiles = walk(SCENES).filter((f) => f.endsWith('.js'));
  const rasterPaths = sceneFiles.filter((f) => /['"`][^'"`]*\.(png|jpe?g|webp)['"`]/i.test(stripComments(read(f))))
    .map((f) => path.basename(f));
  check('REGISTER: no scene names an image path', rasterPaths.length === 0,
    rasterPaths.join(', ') || 'every raster goes through src/dark-field.js');

  // The rails law's own preserved clause (AGENTS.md §6): the object band sits
  // ABOVE the line, never on it — which is the form of the register boundary
  // the law keeps while amending its rail case. Read the stage's own numbers.
  const num = (re) => { const m = stageSrc.match(re); return m ? Number(m[1]) : null; };
  const bandH = num(/const BAND_H = (\d+)/);
  const bandGap = num(/const BAND_GAP = (\d+)/);
  const stripY = num(/strip: \{\n\s*y: (\d+)/);
  const bottom = stripY != null && bandGap != null ? stripY - bandGap : null;
  check('REGISTER: no render stands on the strip’s drawn line (the rails law’s band clause)',
    bandH === 244 && bandGap === 68 && stripY === 470 && bottom === 402 && bottom < stripY,
    `band ${bandH} tall, bottom at ${bottom}, the line at ${stripY} — ${stripY - bottom}px of clearance`);

  const prologueFiles = walk(path.join(SCENES, 'prologue')).filter((f) => f.endsWith('.js'));
  const accent = prologueFiles.filter((f) => /--accent|--accent-light|--accent-dim|#F7931A/i.test(read(f)))
    .map((f) => path.basename(f));
  check('REGISTER: no accent color anywhere in the Prologue',
    accent.length === 0, accent.join(', ') || `${prologueFiles.length} files clean`);
}

// -------------------------------------------------------------- 8. DEAD CODE
{
  const registry = read(path.join(SRC, 'proto', 'registry.js'));
  const stillRegistered = ACT2_SCENES.filter((sc) => registry.includes(sc.file)).map((s) => s.key);
  check('DEAD CODE: Act II left the scratch route at the splice',
    stillRegistered.length === 0, stillRegistered.join(', ') || 'the registry lists Gate 2’s three only');

  const contract = read(path.join(ACT2, '_sceneModule.js'));
  check('DEAD CODE: the Act II scene contract carries no protoKey',
    !/protoKey/.test(contract), 'the scenes are addressed by the manifest now');
}

fs.writeFileSync(path.join(__dirname, '..', 'static-gates.json'), JSON.stringify({
  date: new Date().toISOString(),
  session: 'batch-b',
  checks: results.length,
  failures: results.filter((r) => !r.ok).length,
  results
}, null, 2));

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} static gates green`);
process.exit(failed.length ? 1 : 0);
