// Acts III–IV final — the records' byte-identity proof against tag batch-d
// (the proof-record discipline of Batch C and the Act III final, applied to
// the four Part A rulings of the Act V kickoff brief).
//
// The session's law: no cell moves except the ones the rulings name. Proven
// at byte strength against the prior tag — byte-identity implies zero
// differing pixels, and it is checked from git, not asserted — over BOTH
// sheets, review/act-3/states and review/act-4/states:
//
//   UNTOUCHED   every cell no ruling touched is byte-identical to the tag.
//   CARRIED     a cell that moved beats, or retired to file, carries the
//               exact bytes of the tag file it came from:
//                 s12-b2-household ← the tag's s12-b2 (ruling 1 — retired)
//                 s12-b2           ← the tag's s12-b3 (ruling 1 — beat 3 → 2)
//                 s12-b3           ← the tag's s12-b4 (ruling 1 — beat 4 → 3)
//                 s15-b7-triad     ← the tag's s15-b7 (ruling 3 — retired)
//   RE-STAGED   s15-b7 (ruling 3 — the exit on the base slab, rendered
//               fresh), s23-b5 and s23-b6 (ruling 2 — the header band) differ
//               from the tag.
//   GONE        s12-b4 is absent from the Act III sheet and accounted for by
//               the carry (the only tag file allowed to be missing).
//
// Any file on either sheet that fits none of the classes fails the proof.
//
// Usage: node proof-record-acts-3-4-final.cjs
const { execSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const TAG = 'batch-d';

const SHEETS = [
  {
    dir: 'review/act-3/states',
    restaged: { 's15-b7.png': 'ruling 3 — the exit on the base slab: the tower receded to its glowing base slab, the hinge question beneath it (rendered fresh; the triad coda retired to file)' },
    // now → the tag file whose bytes it carries
    carried: {
      's12-b2-household.png': 's12-b2.png',
      's12-b2.png': 's12-b3.png',
      's12-b3.png': 's12-b4.png',
      's15-b7-triad.png': 's15-b7.png'
    },
    gone: ['s12-b4.png']
  },
  {
    dir: 'review/act-4/states',
    restaged: {
      's23-b5.png': 'ruling 2 — the header band of renders above the table, the glyphs retired, the fifty scores landed',
      's23-b6.png': 'ruling 2 — the same band, the closing line beneath the table'
    },
    carried: {},
    gone: []
  }
];

const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const tagSha = (dir, file) => {
  try {
    return sha(execSync(`git show ${TAG}:${dir}/${file}`, { cwd: REPO, encoding: 'buffer', maxBuffer: 64 * 1024 * 1024 }));
  } catch {
    return null;
  }
};

const rows = [];
const counts = {};
let failures = 0;
const sheets = [];

for (const sheet of SHEETS) {
  const files = fs.readdirSync(path.join(REPO, sheet.dir)).filter((f) => f.endsWith('.png')).sort();
  const tagFiles = execSync(`git ls-tree -r --name-only ${TAG} ${sheet.dir}`, { cwd: REPO, encoding: 'utf8' })
    .split('\n').filter((f) => f.endsWith('.png')).map((f) => path.basename(f));
  console.log(`\n${sheet.dir} — ${files.length} files now, ${tagFiles.length} at ${TAG}`);
  for (const f of files) {
    const now = sha(fs.readFileSync(path.join(REPO, sheet.dir, f)));
    let klass; let ok; let detail;
    if (sheet.restaged[f]) {
      const was = tagSha(sheet.dir, f);
      klass = 're-staged';
      ok = was !== null && now !== was;
      detail = ok ? sheet.restaged[f] : (was === null ? 'NOT AT THE TAG' : 'IDENTICAL TO THE TAG — the re-render did not land');
    } else if (sheet.carried[f]) {
      const from = sheet.carried[f];
      const was = tagSha(sheet.dir, from);
      klass = 'carried';
      ok = was !== null && now === was;
      detail = ok ? `byte-identical to the tag's ${from} — the bytes carried under the new name` : (was === null ? `${from} NOT AT THE TAG` : `DIFFERS FROM THE TAG'S ${from}`);
    } else {
      const was = tagSha(sheet.dir, f);
      klass = 'untouched';
      ok = was !== null && now === was;
      detail = ok ? 'byte-identical to the tag — zero differing pixels' : (was === null ? 'NOT AT THE TAG and not accounted for' : 'DIFFERS FROM THE TAG');
    }
    if (!ok) failures += 1;
    counts[klass] = (counts[klass] || 0) + 1;
    rows.push({ sheet: sheet.dir, file: f, class: klass, ok, detail, sha256: now });
    console.log(`${ok ? '  ok  ' : 'FAIL  '}${klass.padEnd(10)} ${f.padEnd(24)} ${detail}`);
  }
  const gone = tagFiles.filter((f) => !files.includes(f));
  const unaccounted = gone.filter((f) => !sheet.gone.includes(f));
  const goneOk = unaccounted.length === 0 && sheet.gone.every((f) => gone.includes(f));
  if (!goneOk) failures += 1;
  console.log(`${goneOk ? '  ok  ' : 'FAIL  '}gone       ${(sheet.gone.join(', ') || '(none)').padEnd(24)} ${goneOk
    ? (sheet.gone.length ? 'absent from the sheet and accounted for by the carry' : 'nothing missing from the tag')
    : `unaccounted: ${unaccounted.join(', ') || 'none'} · expected gone but present: ${sheet.gone.filter((f) => !gone.includes(f)).join(', ') || 'none'}`}`);
  sheets.push({ dir: sheet.dir, files: files.length, tagFiles: tagFiles.length, gone, goneOk });
}

fs.writeFileSync(path.join(__dirname, '..', 'proof-record-acts-3-4-final.json'), JSON.stringify({
  date: new Date().toISOString(),
  session: 'acts-3-4-final',
  baseline: TAG,
  method: 'sha256 of every cell PNG on both sheets against the file at the baseline tag; byte-identity implies zero differing pixels; a carried cell is checked against the tag file whose bytes it carries',
  counts,
  sheets,
  failures,
  rows
}, null, 2));

console.log(`\n${rows.length} files: ${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(' · ')} · ${failures} failures`);
process.exit(failures ? 1 : 0);
