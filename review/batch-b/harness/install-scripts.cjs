// Batch B — the script installer (docs/batch-b-implementation-brief.md §3).
//
// Speaker notes are production content and the recording script (AGENTS.md
// §11), so they are never retyped: this reads `docs/batch-b-package.md` §2 and
// injects each scene's `[→]` paragraphs into its module, replacing the
// `@@SCRIPT:S<N>@@` marker. Mechanical injection is the same discipline
// Session 1 used, and the reason the VERBATIM gate can be a character-for-
// character comparison rather than a spot check.
//
// What is taken: the `[→]` paragraphs of the scene's `## S<N> — …` block, in
// order, joined by blank lines. What is left behind: the package's own
// bracketed annotations — Scene 6 opens with a re-split note that is the
// package's record, not spoken material (Session 1 report §6.5).
//
// Usage: node install-scripts.cjs [--check]
//   --check  verify only; exit 1 if any installed script differs.
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const PKG = path.join(REPO, 'docs', 'batch-b-package.md');
const ACT2 = path.join(REPO, 'src', 'scenes', 'act-2-the-architecture-of-money');

const SCENES = [
  ['S5', '05-the-function-stayed.js'],
  ['S6', '06-gold-scarcity-in-matter.js'],
  ['S7', '07-claims-on-gold.js'],
  ['S8', '08-money-becomes-information.js'],
  ['S9', '09-scarcity-becomes-digital.js'],
  ['S10', '10-the-trade-off-keeps-moving.js']
];

const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

/** The package's §2 scripts, by scene key — the `[→]` paragraphs only. */
function packageScripts() {
  const pkg = read(PKG);
  const section = pkg.slice(pkg.indexOf('# 2. Scripts'), pkg.indexOf('# 3. Style-frame'));
  const out = {};
  SCENES.forEach(([key], i) => {
    const start = section.indexOf(`\n## ${key} — `);
    if (start < 0) throw new Error(`package §2 has no block for ${key}`);
    const nextKey = SCENES[i + 1] ? `\n## ${SCENES[i + 1][0]} — ` : '\n## The contracts';
    const end = section.indexOf(nextKey, start);
    const block = section.slice(start, end < 0 ? section.length : end);
    const paras = block.split('\n\n').map((p) => p.trim()).filter((p) => p.startsWith('[→]'));
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
  const p = path.join(ACT2, file);
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
