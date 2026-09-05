// Batch D — the script installer (docs/batch-d-implementation-brief.md §2).
//
// Speaker notes are production content and the recording script (AGENTS.md
// §11), so they are never retyped: this reads `docs/batch-d-package.md` §2 —
// the scripts installed verbatim from the legacy slides by the foundation's
// own harness (review/act-4/harness/script-install.cjs) — and injects each
// scene's spoken paragraphs into its module, replacing the `@@SCRIPT:S<N>@@`
// marker. Mechanical injection is the Batch B and C discipline, and the
// reason a verbatim gate can be a character-for-character comparison.
//
// What is taken: the `[→]` paragraphs of the scene's `## S<N> — …` block, in
// order — and for S23, additionally the two notes-only armor blocks that
// follow them (each a bold bracketed marker paragraph and the armor
// paragraphs beneath it), because the armor is notes material by its own
// label (installed notes-only, never spoken, zero advances inside it — the
// Batch C S13 precedent). Session 1 installed Scenes 16–19; Session 2
// extends the list to Scenes 20–23.
//
// Usage: node install-scripts.cjs [--check]
//   --check  verify only; exit 1 if any installed script differs.
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const PKG = path.join(REPO, 'docs', 'batch-d-package.md');
const ACT4 = path.join(REPO, 'src', 'scenes', 'act-4-the-store-of-value-test');

const SCENES = [
  ['S16', '16-return-to-the-open-exchange.js'],
  ['S17', '17-what-the-carrier-must-preserve.js'],
  ['S18', '18-the-100-year-test.js'],
  ['S19', '19-invert-the-question.js'],
  ['S20', '20-how-the-carrier-can-fail-i.js'],
  ['S21', '21-how-the-carrier-can-fail-ii.js'],
  ['S22', '22-from-failure-to-requirement.js'],
  ['S23', '23-the-comparison.js']
];
const ALL_KEYS = ['S16', 'S17', 'S18', 'S19', 'S20', 'S21', 'S22', 'S23'];

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
    // The heading line is the block's first paragraph; everything after it
    // is script. S23's armor markers and paragraphs are taken with the
    // arrows; every other scene carries arrows only.
    const paras = block.split('\n\n').map((p) => p.trim()).filter(Boolean).slice(1);
    const armorAt = paras.findIndex((p) => p.startsWith('**[Notes-only'));
    const taken = paras.filter((p, i) => p.startsWith('[→]') || (key === 'S23' && armorAt > -1 && i >= armorAt));
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
  const p = path.join(ACT4, file);
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
