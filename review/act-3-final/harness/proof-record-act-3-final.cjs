// Act III final — the record's byte-identity proof against tag batch-c-r2
// (the proof-record discipline of Batch C, applied to the three rulings).
//
// The session's law: no cell moves except the three the rulings re-render,
// and the one the ruling relocates. Proven at byte strength against the
// prior tag — byte-identity implies zero differing pixels, and it is
// checked from git, not asserted:
//
//   UNTOUCHED   every cell no ruling touched is byte-identical to the tag.
//   RE-STAGED   s12-b3, s12-b4 (ruling 1 — the renders replace the words)
//               and s14-b2 (ruling 2 — the ruled line) differ from the tag.
//   RELOCATED   s15-b7 is byte-identical to the tag's s14-b4 (ruling 3 —
//               the pivot moved beats with its bytes).
//   GONE        s14-b4 is absent from the sheet, and accounted for by the
//               relocation — the only tag file allowed to be missing.
//
// Any file on the sheet that fits none of the classes fails the proof.
//
// Usage: node proof-record-act-3-final.cjs
const { execSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const STATES = path.join(REPO, 'review', 'act-3', 'states');
const TAG = 'batch-c-r2';

const RESTAGED = {
  's12-b3.png': 'ruling 1 — the Argentina columns carry the header, then the render(s), nothing else',
  's12-b4.png': 'ruling 1 — the principle over the render-bearing columns',
  's14-b2.png': 'ruling 2 — the landed line reads the ruled wording'
};
// now → the tag file whose bytes it carries
const RELOCATED = { 's15-b7.png': 's14-b4.png' };
const GONE = new Set(['s14-b4.png']);

const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const tagSha = (file) => {
  try {
    return sha(execSync(`git show ${TAG}:review/act-3/states/${file}`, {
      cwd: REPO, encoding: 'buffer', maxBuffer: 64 * 1024 * 1024
    }));
  } catch {
    return null;
  }
};

const files = fs.readdirSync(STATES).filter((f) => f.endsWith('.png')).sort();
const tagFiles = execSync(`git ls-tree -r --name-only ${TAG} review/act-3/states`, {
  cwd: REPO, encoding: 'utf8'
}).split('\n').filter((f) => f.endsWith('.png')).map((f) => path.basename(f));

const rows = [];
let failures = 0;
for (const f of files) {
  const now = sha(fs.readFileSync(path.join(STATES, f)));
  let klass;
  let ok;
  let detail;
  if (RESTAGED[f]) {
    const was = tagSha(f);
    klass = 're-staged';
    ok = was !== null && now !== was;
    detail = ok ? RESTAGED[f]
      : (was === null ? 'NOT AT THE TAG' : 'IDENTICAL TO THE TAG — the re-render did not land');
  } else if (RELOCATED[f]) {
    const was = tagSha(RELOCATED[f]);
    klass = 'relocated';
    ok = was !== null && now === was;
    detail = ok ? `byte-identical to the tag's ${RELOCATED[f]} — the pivot moved beats with its bytes (ruling 3)`
      : (was === null ? `${RELOCATED[f]} NOT AT THE TAG` : `DIFFERS FROM THE TAG'S ${RELOCATED[f]}`);
  } else {
    const was = tagSha(f);
    klass = 'untouched';
    ok = was !== null && now === was;
    detail = ok ? 'byte-identical to the tag — zero differing pixels'
      : (was === null ? 'NOT AT THE TAG and not accounted for' : 'DIFFERS FROM THE TAG');
  }
  if (!ok) failures += 1;
  rows.push({ file: f, class: klass, ok, detail, sha256: now });
  console.log(`${ok ? '  ok  ' : 'FAIL  '}${klass.padEnd(10)} ${f.padEnd(22)} ${detail}`);
}

const gone = tagFiles.filter((f) => !files.includes(f));
const unaccounted = gone.filter((f) => !GONE.has(f));
const goneOk = unaccounted.length === 0 && [...GONE].every((f) => gone.includes(f));
if (!goneOk) failures += 1;
console.log(`${goneOk ? '  ok  ' : 'FAIL  '}gone       ${[...GONE].join(', ').padEnd(22)} ${goneOk
  ? 'absent from the sheet and accounted for by the relocation'
  : `unaccounted: ${unaccounted.join(', ') || 'none'} · expected gone but present: ${[...GONE].filter((f) => !gone.includes(f)).join(', ') || 'none'}`}`);

const counts = rows.reduce((m, r) => { m[r.class] = (m[r.class] || 0) + 1; return m; }, {});
fs.writeFileSync(path.join(__dirname, '..', 'proof-record-act-3-final.json'), JSON.stringify({
  date: new Date().toISOString(),
  session: 'act-3-final',
  baseline: TAG,
  method: 'sha256 of every cell PNG against the file at the baseline tag; byte-identity implies zero differing pixels; the relocated cell is checked against the tag file whose bytes it carries',
  counts,
  gone: [...GONE],
  tagFilesMissing: gone,
  failures,
  rows
}, null, 2));

console.log(`\n${files.length} files: ${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(' · ')} · ${failures} failures`);
process.exit(failures ? 1 : 0);
