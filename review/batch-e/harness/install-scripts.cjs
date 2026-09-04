// Batch E — the script installer (docs/batch-e-implementation-brief.md §2).
//
// Speaker notes are production content and the recording script (AGENTS.md
// §11), so they are never retyped: this reads `docs/batch-e-package.md` §2 —
// the scripts installed verbatim from the legacy slides by the foundation's
// own harness (review/act-5/harness/script-install.cjs) — and injects each
// scene's spoken paragraphs into its module, replacing the `@@SCRIPT:S<N>@@`
// marker. Mechanical injection is the Batch B, C and D discipline, and the
// reason a verbatim gate can be a character-for-character comparison.
//
// What is taken: the `[→]` paragraphs of the scene's `## S<N> — …` block, in
// order — and for S26, additionally the falsifiability passage that follows
// them (its bold bracketed marker paragraph and the five paragraphs beneath
// it), because the passage is spoken over the scene's final frame with no
// advance (Row 2 ruled A, 4 Sep 2026). The marker carries no `[→]`, so the
// scene stays at nine beats. Session 1 installs Scenes 24–27; Session 2
// extends the list to Scenes 28–30.
//
// Usage: node install-scripts.cjs [--check]
//   --check  verify only; exit 1 if any installed script differs.
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const PKG = path.join(REPO, 'docs', 'batch-e-package.md');
const ACT5 = path.join(REPO, 'src', 'scenes', 'act-5-the-case');

const SCENES = [
  ['S24', '24-migration.js'],
  ['S25', '25-the-monetary-premium.js'],
  ['S26', '26-when-other-assets-do-moneys-job.js'],
  ['S27', '27-the-marginal-decision.js']
];
const ALL_KEYS = ['S24', 'S25', 'S26', 'S27', 'S28', 'S29', 'S30'];

const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

/** The package's §2 blocks, by scene key — the spoken paragraphs. */
function packageScripts() {
  const pkg = read(PKG);
  const section = pkg.slice(pkg.indexOf('# 2. Scripts'), pkg.indexOf('\n# 3. '));
  const out = {};
  ALL_KEYS.forEach((key, i) => {
    const start = section.indexOf(`\n## ${key} — `);
    if (start < 0) throw new Error(`package §2 has no block for ${key}`);
    const nextKey = ALL_KEYS[i + 1] ? `\n## ${ALL_KEYS[i + 1]} — ` : null;
    const end = nextKey ? section.indexOf(nextKey, start) : -1;
    const block = section.slice(start, end < 0 ? section.length : end);
    // The heading line is the block's first paragraph; everything after it is
    // script. S26's passage marker and its paragraphs are taken with the
    // arrows; every other scene carries arrows only.
    const paras = block.split('\n\n').map((p) => p.trim()).filter(Boolean).slice(1);
    const passageAt = paras.findIndex((p) => p.startsWith('**[Spoken'));
    const taken = paras.filter((p, i) => p.startsWith('[→]') || (key === 'S26' && passageAt > -1 && i >= passageAt));
    if (!taken.length || !taken[0].startsWith('[→]')) throw new Error(`package §2 block for ${key} has no [→] paragraphs`);
    out[key] = taken.join('\n\n');
  });
  return out;
}

const notesOf = (src) => {
  const i = src.lastIndexOf('notes: `');
  if (i < 0) return null;
  const start = i + 'notes: `'.length;
  const end = src.indexOf('`', start);
  return { start, end, text: src.slice(start, end) };
};

const check = process.argv.includes('--check');
const scripts = packageScripts();
let changed = 0;
let wrong = 0;

SCENES.forEach(([key, file]) => {
  const p = path.join(ACT5, file);
  const src = read(p);
  const notes = notesOf(src);
  if (!notes) throw new Error(`${file} has no notes block`);
  const want = scripts[key];
  const arrows = (want.match(/\[→\]/g) || []).length;
  if (notes.text === want) {
    console.log(`  ok   ${key.padEnd(3)} ${arrows} arrows — installed verbatim`);
    return;
  }
  if (check) {
    wrong += 1;
    let at = 0;
    while (at < want.length && at < notes.text.length && want[at] === notes.text[at]) at += 1;
    console.log(`FAIL   ${key} diverges at char ${at}: package “${want.slice(at, at + 48)}”` +
      ` vs notes “${notes.text.slice(at, at + 48)}”`);
    return;
  }
  fs.writeFileSync(p, src.slice(0, notes.start) + want + src.slice(notes.end));
  changed += 1;
  console.log(`  set  ${key.padEnd(3)} ${arrows} arrows — installed from the package`);
});

if (check) {
  console.log(`\n${SCENES.length - wrong}/${SCENES.length} scripts identical to the package`);
  process.exit(wrong ? 1 : 0);
}
console.log(`\n${changed} installed, ${SCENES.length - changed} already verbatim`);
