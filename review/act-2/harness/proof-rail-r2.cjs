// Act II rail r2 — the byte-identity proof (docs/act-2-rail-r2-brief.md §2, §4).
//
// The brief's claim is precise: "Overlay interiors (the periodic table, the
// mass state, the chart, palladium) are untouched and carry byte-identical;
// only their seam states inherit the reordered receded rail." This proves that
// claim rather than asserting it, in four classes, all against sha256:
//
//   CARRIED    the six overlay-interior cells on the rail sheet (the five
//              elimination waves and the palladium bar) are byte-identical
//              BOTH to the approved states-sheet file they are copied from AND
//              to their own bytes at tag `act-2-rail-states`. The capture
//              copies files; it never re-renders them, and this shows it.
//   INTERIOR   the approved states-sheet cells whose BUILDERS the five seam
//              cells run (the table, the counted load, the chart, palladium)
//              are byte-identical to the tag — no overlay interior moved this
//              session, so a seam cell's overlay content cannot have drifted.
//   BANKED     the retired vault cell (r2.4) is still on file at the states
//              sheet, byte-identical — retired to file means banked, not
//              deleted.
//   RE-RENDERED every other rail cell DIFFERS from the tag. A ruling that
//              changed nothing would be a defect too, so the proof fails if a
//              cell that should have moved did not.
//
// Usage: node proof-rail-r2.cjs
const { execSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const RAIL = path.join(REPO, 'review', 'act-2', 'rail');
const STATES = path.join(REPO, 'review', 'act-2', 'states');
const TAG = 'act-2-rail-states';

// The overlay interiors the rail sheet carries by file copy (rail.mjs
// `carriedFrom`), and the approved cells whose builders the seams run.
const CARRIED = {
  's6-b3.png': 's6-b3.png',
  's6-b4.png': 's6-b4.png',
  's6-b5.png': 's6-b5.png',
  's6-b6.png': 's6-b6.png',
  's6-b7.png': 's6-b7.png',
  's10-b4.png': 's10-b4.png'
};
const INTERIOR_SOURCES = {
  's6-b2.png': 'the periodic-table overlay — the s6-b2 builder the S6 seam runs',
  's6-b9.png': 'the mass state — the s6-b9 builder the S6 b9 seam runs',
  's8-b4.png': 'the four-currency chart — the s8-b4 builder the S8 b4 seam runs',
  's10-b3.png': 'the palladium frame — the s10-b3 builder the S10 b3 seam runs'
};
const BANKED = {
  's7-b4.png': 'the retired vault restage (r2.4) — banked on file, not deleted'
};

const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const tagSha = (rel) => {
  try {
    return sha(execSync(`git show ${TAG}:${rel}`, {
      cwd: REPO, encoding: 'buffer', maxBuffer: 64 * 1024 * 1024
    }));
  } catch {
    return null;
  }
};

const railFiles = fs.readdirSync(RAIL).filter((f) => f.endsWith('.png')).sort();
const tagRail = execSync(`git ls-tree -r --name-only ${TAG} review/act-2/rail`, {
  cwd: REPO, encoding: 'utf8'
}).split('\n').filter((f) => f.endsWith('.png')).map((f) => path.basename(f));

const rows = [];
let failures = 0;
const record = (cls, file, ok, detail) => {
  if (!ok) failures += 1;
  rows.push({ file, class: cls, ok, detail });
  console.log(`${ok ? '  ok  ' : 'FAIL  '}${cls.padEnd(11)} ${file.padEnd(16)} ${detail}`);
};

// ---- the rail sheet ---------------------------------------------------------
for (const f of railFiles) {
  const now = sha(fs.readFileSync(path.join(RAIL, f)));
  const atTag = tagSha(`review/act-2/rail/${f}`);
  if (CARRIED[f]) {
    const src = sha(fs.readFileSync(path.join(STATES, CARRIED[f])));
    const ok = now === src && now === atTag;
    record('carried', f, ok, ok
      ? `byte-identical to review/act-2/states/${CARRIED[f]} and to the tag — copied, never re-rendered`
      : `${now === src ? '' : 'DIFFERS FROM ITS APPROVED SOURCE. '}${now === atTag ? '' : 'MOVED SINCE THE TAG.'}`);
  } else {
    const ok = atTag !== null && now !== atTag;
    record('re-rendered', f, ok, ok
      ? 'differs from the tag — the ruled re-render landed'
      : (atTag === null ? 'NOT AT THE TAG and not accounted for' : 'UNCHANGED FROM THE TAG — a ruled cell that did not move'));
  }
}

// ---- the overlay interiors on the states sheet ------------------------------
for (const [f, what] of Object.entries({ ...INTERIOR_SOURCES, ...BANKED })) {
  const now = sha(fs.readFileSync(path.join(STATES, f)));
  const atTag = tagSha(`review/act-2/states/${f}`);
  const ok = atTag !== null && now === atTag;
  record(BANKED[f] ? 'banked' : 'interior', f, ok,
    ok ? `byte-identical to the tag — ${what}` : 'MOVED SINCE THE TAG');
}

// ---- nothing left the sheet -------------------------------------------------
const gone = tagRail.filter((f) => !railFiles.includes(f));
if (gone.length) {
  failures += 1;
  console.log(`FAIL  tag files missing from the rail sheet: ${gone.join(', ')}`);
}

const counts = rows.reduce((m, r) => { m[r.class] = (m[r.class] || 0) + 1; return m; }, {});
fs.writeFileSync(path.join(__dirname, '..', 'proof-rail-r2.json'), JSON.stringify({
  date: new Date().toISOString(),
  session: 'act-2-rail-r2',
  baseline: TAG,
  method: 'sha256 — byte-identity implies zero differing pixels; the carried cells are checked against both their approved source and the baseline tag',
  counts,
  tagFilesMissing: gone,
  failures,
  rows
}, null, 2));

console.log(`\n${rows.length} files: ${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(' · ')} · ${failures} failures`);
process.exit(failures ? 1 : 0);
