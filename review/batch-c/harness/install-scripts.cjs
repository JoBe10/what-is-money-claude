// Batch C — the script installer (docs/batch-c-implementation-brief.md §2).
//
// Speaker notes are production content and the recording script (AGENTS.md
// §11), so they are never retyped: this reads `docs/batch-c-package.md` §2 and
// injects each scene's spoken paragraphs into its module, replacing the
// `@@SCRIPT:S<N>@@` marker. Mechanical injection is the Batch B discipline,
// and the reason a verbatim gate can be a character-for-character comparison.
//
// What is taken: the `[→]` paragraphs of the scene's `## S<N> — …` block, in
// order — and for S13, additionally the `**[Notes-only — Q&A armor …]**`
// block, because the armor is notes material by its own label (installed
// notes-only, never spoken, zero advances inside it — the r1 install's own
// terms). The package's struck-through map annotations stay behind.
//
// Usage: node install-scripts.cjs [--check]
//   --check  verify only; exit 1 if any installed script differs.
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const PKG = path.join(REPO, 'docs', 'batch-c-package.md');
const ACT3 = path.join(REPO, 'src', 'scenes', 'act-3-the-jobs-of-money');

const SCENES = [
  ['S11', '11-three-familiar-jobs.js'],
  ['S12', '12-we-already-split-those-jobs.js'],
  ['S13', '13-the-order-of-monetization.js'],
  ['S14', '14-the-coffee-objection.js'],
  ['S15', '15-the-tower.js']
];
const ALL_KEYS = ['S11', 'S12', 'S13', 'S14', 'S15'];

const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

/** The package's §2 blocks, by scene key — spoken paragraphs (+ S13 armor). */
function packageScripts() {
  const pkg = read(PKG);
  const section = pkg.slice(pkg.indexOf('# 2. Scripts'));
  const out = {};
  ALL_KEYS.forEach((key, i) => {
    const start = section.indexOf(`\n## ${key} — `);
    if (start < 0) throw new Error(`package §2 has no block for ${key}`);
    const nextKey = ALL_KEYS[i + 1] ? `\n## ${ALL_KEYS[i + 1]} — ` : null;
    const end = nextKey ? section.indexOf(nextKey, start) : -1;
    const block = section.slice(start, end < 0 ? section.length : end);
    const paras = block.split('\n\n').map((p) => p.trim()).filter((p) =>
      p.startsWith('[→]') || (key === 'S13' && p.startsWith('**[Notes-only')));
    if (!paras.length) throw new Error(`package §2 block for ${key} has no [→] paragraphs`);
    out[key] = paras.join('\n\n');
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
  const p = path.join(ACT3, file);
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
