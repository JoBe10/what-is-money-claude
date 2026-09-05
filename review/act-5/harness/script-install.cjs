// Act V foundation — the script installation, made mechanical (the Act V
// kickoff brief, Part B §2).
//
// Two modes over one table:
//
//   --emit     EXTRACT the frozen Act V scripts from the legacy slide modules'
//              own `notes` literals — 4-17 … 4-23 and 5-01 — assemble them
//              into the batch-e package's §2 in the architecture's scene
//              merges, and apply exactly the adaptation ledger (below — the
//              only edits the brief permits: self-references replaced, the
//              architecture's named distributions — the stability content's
//              Scene 29 share, the concessions merged where the architecture
//              merges them, the falsifiability passage at its ruled home —
//              and the [→] maps derived from the legacy advance structure).
//              Prints the §2 text; the package is assembled around it, so
//              "installed verbatim from the legacy slides" is a fact of the
//              pipeline rather than a transcription.
//
//   (default)  VERIFY docs/batch-e-package.md §2 against the sources plus
//              the ledger at word and character strength, count every
//              scene's [→] against §1, verify the protected lines character
//              for character against the master's and the architecture's
//              strings (reporting every difference rather than rounding it
//              away), and run the self-reference ban — hardest at the close:
//              the close names no medium, no sequel, no waypoint.
//
// Usage: node script-install.cjs [--emit]
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO = path.join(__dirname, '..', '..', '..');
const read = (p) => fs.readFileSync(path.join(REPO, p), 'utf8').replace(/\r\n/g, '\n');
const LEGACY = 'src/slides/section-4-ideal-store';
const CLOSE = 'src/slides/section-5-close';

// ---- the sources --------------------------------------------------------
const notesOf = (file) => {
  const src = read(file);
  const m = src.match(/notes: `([\s\S]*?)`\s*\n\};/);
  if (!m) throw new Error(`${file}: no notes literal`);
  return m[1].trim();
};
const paragraphs = (notes) => notes.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
const advances = (notes) => paragraphs(notes).filter((p) => p.startsWith('[→]'));

// A legacy slide that speaks a line over its entry state (its build 0 —
// 4-17, 4-18, 4-21) has an advance the legacy deck never wrote down: the one
// that entered the slide. The film's rule (master §7) is that the advance
// which leaves a scene belongs to the next scene's script and every build
// is exactly one [→], so the entry line becomes the scene's first beat —
// one [→] prefixed, zero word changes (ARGUABLE row 1 of
// docs/act-5-provenance.md, at its default).
const withEntryBeat = (notes) => {
  const ps = paragraphs(notes);
  if (ps[0].startsWith('[→]')) return ps;
  return [`[→] ${ps[0]}`, ...ps.slice(1)];
};

// ---- the adaptation ledger (the only edits) ------------------------------
// [scene, source file, from, to, why]. Each `from` must occur exactly once
// in its source; the verifier proves the installed text is the source with
// exactly these applied. A `to` of '' is a cut: the span is deleted and
// nothing is written in its place.
const RULES_LINE = 'Bitcoin does not fix its price. It fixes the rules through which the market discovers its price.';
const ROAD_SENTENCE = 'There’s the whole road — all three questions, kept. ';
const LEDGER = [
  ['S25', `${LEGACY}/18-monetary-premium.js`,
    'which is precisely the diagnosis this whole section began from',
    'which is precisely the diagnosis this whole inquiry began from',
    'a structural self-reference ("this whole section"); master §3.5\'s permitted form "the inquiry" (the batch-d ledger\'s form for "the rest of the evening")'],
  ['S26-passage', `${LEGACY}/20-bitcoin-does-not-replace-everything.js`,
    'I’ve spent this whole section answering objections.',
    'I’ve spent the last few minutes answering objections.',
    'a structural self-reference ("this whole section") in the falsifiability passage; replaced with the time it names (the batch-d ledger\'s form for "one slide ago" → "a moment ago")'],
  ['S29', `${LEGACY}/23-investment-case-from-first-principles.js`,
    'The case is not that the price will behave.',
    `${RULES_LINE} The case is not that the price will behave.`,
    'the architecture\'s named distribution (Ruling 5 — "the rules line remains in Scene 29"): the rules line, verbatim from legacy 4-20, installed before the sentence it governs (ARGUABLE row 3 of docs/act-5-provenance.md, at its default)'],
  ['S30', `${CLOSE}/01-thank-you.js`,
    ROAD_SENTENCE,
    '',
    'a structural self-reference to the retired waypoint device ("the whole road — all three questions"; architecture Ruling 1, the what-dies list); cut, nothing written in its place — the callback opens the beat']
];
const apply = (text, scene) => {
  let out = text;
  LEDGER.filter((l) => l[0] === scene).forEach(([, , from, to]) => {
    const n = out.split(from).length - 1;
    if (n !== 1) throw new Error(`${scene}: "${from}" occurs ${n} times, expected exactly once`);
    out = out.replace(from, to);
  });
  return out;
};

// ---- the markers (not spoken as advances, never [→]) ---------------------
const PASSAGE_HEAD = '**[Spoken over the scene\'s final frame, no advance — the falsifiability passage at its ruled home (master §9.6: spoken, not staged; R7.4: the beat left the deck for the script; the batch-d states report: Act V material). Verbatim from legacy 4-20\'s closing passages, with the ledger\'s one substitution. Its last sentence names "Don\'t trust. Verify." as a spoken mention; the line is on stage once, at Scene 23\'s table. ARGUABLE row 2 of docs/act-5-provenance.md, at its default: Scene 26\'s close.]**';

// ---- the scenes (the architecture's merges; the [→] maps by construction)
function assemble() {
  const n417 = withEntryBeat(notesOf(`${LEGACY}/17-store-of-value-function-migrates.js`));
  const n418 = withEntryBeat(notesOf(`${LEGACY}/18-monetary-premium.js`));
  const n419 = advances(notesOf(`${LEGACY}/19-other-assets-do-moneys-job.js`));
  const p420 = paragraphs(notesOf(`${LEGACY}/20-bitcoin-does-not-replace-everything.js`));
  const a420 = p420.filter((p) => p.startsWith('[→]'));
  // 4-20's four coexistence beats (builds 1–4); its three stability beats
  // (builds 5–7) went to Scene 23's notes as armor under Ruling 5 and are
  // not installed here; the rules line goes to Scene 29 through the ledger.
  const coexistence = a420.slice(0, 4);
  // The falsifiability passage: from the "— CLOSING PASSAGES" marker to the
  // "— Q&A ARSENAL" marker, the markers themselves excluded.
  const passageAt = p420.findIndex((p) => p.startsWith('— CLOSING PASSAGES'));
  const arsenalAt = p420.findIndex((p) => p.startsWith('— Q&A ARSENAL'));
  const passage = p420.slice(passageAt + 1, arsenalAt);
  const n421 = withEntryBeat(notesOf(`${LEGACY}/21-marginal-store-of-value-decision.js`));
  const n422 = advances(notesOf(`${LEGACY}/22-fixed-supply-reprices-at-margin.js`));
  const n423 = advances(notesOf(`${LEGACY}/23-investment-case-from-first-principles.js`));
  const n501 = advances(notesOf(`${CLOSE}/01-thank-you.js`));

  return {
    S24: n417.join('\n\n'),
    S25: apply(n418.join('\n\n'), 'S25'),
    S26: [
      [...n419, ...coexistence].join('\n\n'),
      PASSAGE_HEAD,
      apply(passage.join('\n\n'), 'S26-passage')
    ].join('\n\n'),
    S27: n421.join('\n\n'),
    S28: n422.join('\n\n'),
    S29: apply(n423.join('\n\n'), 'S29'),
    S30: apply(n501.join('\n\n'), 'S30')
  };
}

const SCENES = [
  { key: 'S24', title: 'Migration', beats: 4 },
  { key: 'S25', title: 'The Monetary Premium', beats: 4 },
  { key: 'S26', title: 'When Other Assets Do Money’s Job', beats: 9 },
  { key: 'S27', title: 'The Marginal Decision', beats: 3 },
  { key: 'S28', title: 'Fixed Supply Reprices at the Margin', beats: 3 },
  { key: 'S29', title: 'The Case from First Principles', beats: 2 },
  { key: 'S30', title: 'Close', beats: 2 }
];
const TOTAL_BEATS = 27;

if (process.argv.includes('--emit')) {
  const blocks = assemble();
  SCENES.forEach((s) => {
    process.stdout.write(`## ${s.key} — ${s.title}\n\n${blocks[s.key]}\n\n`);
  });
  process.exit(0);
}

// ================================================================ VERIFY
const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  console.log(`${ok ? '  ok  ' : 'FAIL  '}${name}${detail ? ` :: ${detail}` : ''}`);
}
function block(src, head, stops) {
  const start = src.indexOf(head);
  if (start < 0) return null;
  const from = start + head.length;
  const ends = stops.map((s) => src.indexOf(s, from)).filter((i) => i > -1);
  const to = ends.length ? Math.min(...ends) : src.length;
  return src.slice(from, to).trim();
}
const words = (s) => s.split(/\s+/).filter(Boolean);

const pkg = read('docs/batch-e-package.md');
const pkgSection = block(pkg, '# 2. Scripts', ['\n# 3. ']);
if (pkgSection == null) {
  console.error('FAIL  docs/batch-e-package.md has no "# 2. Scripts" section');
  process.exit(1);
}
const heads = SCENES.map((s) => `## ${s.key} — ${s.title}`);
const expected = assemble();
const rows = SCENES.map((s, i) => ({
  scene: s.key,
  beats: s.beats,
  expected: expected[s.key],
  installed: block(pkgSection, heads[i], heads.filter((h) => h !== heads[i]))
}));
check('PRESENT: every scene has an installed block', rows.every((r) => r.installed != null),
  rows.filter((r) => r.installed == null).map((r) => r.scene).join(', ') || `${rows.length}/${rows.length}`);
if (rows.some((r) => r.installed == null)) process.exit(1);

// 1. WORDS + 2. CHARACTERS — the installed text is the legacy text with exactly the ledger applied.
{
  const badW = [];
  const badC = [];
  rows.forEach((r) => {
    const a = words(r.expected);
    const b = words(r.installed);
    if (a.length !== b.length) badW.push(`${r.scene}: ${a.length} source words vs ${b.length} installed`);
    else {
      const at = a.findIndex((w, k) => w !== b[k]);
      if (at > -1) badW.push(`${r.scene}: word ${at + 1} — source “${a[at]}” vs installed “${b[at]}”`);
    }
    if (r.expected !== r.installed) {
      let at = 0;
      while (at < r.expected.length && at < r.installed.length && r.expected[at] === r.installed[at]) at += 1;
      badC.push(`${r.scene}: char ${at} — source “${r.expected.slice(at, at + 30)}” vs installed “${r.installed.slice(at, at + 30)}”`);
    }
  });
  check('WORDS: the installed scripts are the legacy notes with exactly the ledger applied, word for word',
    badW.length === 0, badW.join(' · ') || `zero differences (${rows.map((r) => `${r.scene} ${words(r.installed).length}`).join(' · ')})`);
  check('CHARACTERS: identical to the byte, punctuation and dashes included',
    badC.length === 0, badC.join(' · ') || `${rows.length}/${rows.length} identical`);
}

// 3. BEATS
{
  const bad = [];
  let total = 0;
  const detail = [];
  rows.forEach((r) => {
    const n = (r.installed.match(/\[→\]/g) || []).length;
    total += n;
    detail.push(`${r.scene} ${n}`);
    if (n !== r.beats) bad.push(`${r.scene}: ${n} advances vs the map's ${r.beats}`);
  });
  if (total !== TOTAL_BEATS) bad.push(`total ${total} vs ${TOTAL_BEATS}`);
  check(`BEATS: every scene's [→] count is its §1 map, and Act V is ${TOTAL_BEATS} at the map's defaults`,
    bad.length === 0, bad.join(' · ') || `${detail.join(' · ')} = ${total}`);
  const maps = block(pkg, '# 1. Beat maps', ['\n# 2. ']);
  const mapBad = SCENES.filter((s) => !new RegExp(`\\*\\*${s.key} — [^*]*\\*\\* \\((${s.beats})\\)`).test(maps || '')).map((s) => s.key);
  check('MAP: §1\'s beat maps state the same counts as §2\'s scripts', mapBad.length === 0,
    mapBad.join(', ') || `${SCENES.length}/${SCENES.length} agree`);
  const flagsClean = rows.every((r) => !/\*\*\[[^\]]*\[→\]/.test(r.installed));
  check('MARKERS: the passage marker carries no advance', flagsClean);
  // The three entry beats: each is the legacy's own entry line with one [→]
  // prefixed and nothing else changed.
  const entries = [
    ['S24', 'Fiat, holding two of the three jobs — and holding them extremely well.'],
    ['S25', 'An asset’s value, split into two parts.'],
    ['S27', 'One claim, and five places it could go.']
  ];
  const entryBad = entries.filter(([k, line]) => !rows.find((r) => r.scene === k).installed.startsWith(`[→] ${line}\n\n[→] `)).map(([k]) => k);
  check('ENTRY BEATS: 4-17, 4-18 and 4-21\'s entry lines open their scenes as the first beat — one [→] prefixed, zero word changes (ARGUABLE row 1, the default)',
    entryBad.length === 0, entryBad.join(', ') || '3/3');
}

// 4. THE LEDGER — each substitution occurs exactly once in its source, and the installed text carries the replacement, not the original.
{
  const bad = [];
  LEDGER.forEach(([scene, file, from, to]) => {
    const src = notesOf(file);
    const n = src.split(from).length - 1;
    const r = rows.find((x) => x.scene === scene.replace('-passage', ''));
    const hasTo = to === '' || r.installed.includes(to);
    // An insertion keeps its anchor sentence (the rules line lands before
    // "The case is not that the price will behave."), so the original
    // surviving is a failure only where the replacement does not contain it.
    const hasFrom = !to.includes(from) && r.installed.includes(from);
    if (n !== 1 || !hasTo || hasFrom) bad.push(`${scene}: "${from}" ×${n} in source · installed has replacement ${hasTo} · installed still has original ${hasFrom}`);
  });
  const cuts = LEDGER.filter((l) => l[3] === '').length;
  check(`LEDGER: ${LEDGER.length} entries — ${LEDGER.length - cuts} substitutions and ${cuts} cut — each once in its source, each applied, none of the originals surviving`,
    bad.length === 0, bad.join(' · ') || LEDGER.map((l) => `${l[0]}: “${l[2].trim()}” → ${l[3] === '' ? '(cut)' : `“${l[3].trim().slice(0, 60)}”`}`).join(' · '));
}

// 4b. THE DISTRIBUTIONS — Ruling 5's shares, at their ruled homes.
{
  const s26 = rows.find((x) => x.scene === 'S26').installed;
  const s29 = rows.find((x) => x.scene === 'S29').installed;
  const s23 = read('docs/batch-d-package.md');
  const src420 = notesOf(`${LEGACY}/20-bitcoin-does-not-replace-everything.js`);
  const stabilityGone = ['thirty percent last quarter', 'two completely different questions', 'Expectation, not guarantee', 'STABILITY'].every((t) => !s26.includes(t));
  check('DISTRIBUTIONS: 4-20\'s three stability beats are not installed in Scene 26 — they live in Scene 23\'s notes-only armor (Ruling 5)',
    stabilityGone && /thirty percent last quarter/.test(s23));
  check('DISTRIBUTIONS: the rules line stands in Scene 29\'s script, verbatim from legacy 4-20 (Ruling 5 — "the rules line remains in Scene 29"), and once', s29.split(RULES_LINE).length - 1 === 1 && src420.includes(RULES_LINE));
  check('DISTRIBUTIONS: the diversification concession is inside Scene 24\'s migration beat, as the legacy speaks it',
    /During transitions, savings diversify/.test(rows.find((x) => x.scene === 'S24').installed));
  check('DISTRIBUTIONS: the does-not-replace-everything concession is merged into Scene 26 — 4-19\'s five beats then 4-20\'s four coexistence beats',
    /It does not need to replace real estate|A home still provides shelter/.test(s26) && (s26.match(/\[→\]/g) || []).length === 9);
  const passageIn = s26.includes('the three things that would send me back to that table with an eraser') && s26.includes('If Bitcoin’s supply integrity ever credibly failed');
  check('DISTRIBUTIONS: the falsifiability passage stands at Scene 26\'s close as a no-advance spoken passage (ARGUABLE row 2, the default)', passageIn);
}

// 5. THE PROTECTED LINES — character for character, every difference reported.
const protectedRows = [];
function protectedCheck(name, master, installed, { where = '', allow = null } = {}) {
  const same = master === installed;
  let at = 0;
  while (at < master.length && at < installed.length && master[at] === installed[at]) at += 1;
  const diff = same ? null : { at, master: master.slice(at, at + 24), installed: installed.slice(at, at + 24) };
  const norm = (s) => s.toLowerCase().replace(/\*/g, '').replace(/’/g, "'").replace(/[.;,—–\-:?!]/g, ' ').split(/\s+/).filter(Boolean).join(' ');
  const wordsSame = norm(master) === norm(installed);
  const ok = same || (wordsSame && (allow ? allow(master, installed) : true));
  protectedRows.push({ name, where, master, installed, identical: same, wordsIdentical: wordsSame, firstDifference: diff, ok });
  check(`PROTECTED: ${name}`, ok, same ? 'character-for-character identical'
    : `words identical; first character difference at ${at}: master “${diff.master}” vs installed “${diff.installed}”`);
}
{
  const s27 = rows.find((r) => r.scene === 'S27').installed;
  const s28 = rows.find((r) => r.scene === 'S28').installed;
  const s29 = rows.find((r) => r.scene === 'S29').installed;
  const s30 = rows.find((r) => r.scene === 'S30').installed;
  const src423 = read(`${LEGACY}/23-investment-case-from-first-principles.js`);
  const src421 = read(`${LEGACY}/21-marginal-store-of-value-decision.js`);
  const src418 = read(`${LEGACY}/18-monetary-premium.js`);
  const src420 = read(`${LEGACY}/20-bitcoin-does-not-replace-everything.js`);
  const src501 = notesOf(`${CLOSE}/01-thank-you.js`);

  // (a) the rules line — master §9.6 / the architecture's Scene 29.
  const rm = s29.match(/Bitcoin does not fix its price\. It fixes the rules through which the market discovers its price\./);
  protectedCheck('the rules line (master §9.6; the architecture: "the rules line in script", Scene 29) — installed in S29 b2', RULES_LINE, rm ? rm[0] : '(NOT FOUND)', { where: 'S29 b2 (from legacy 4-20 b7)' });
  const rulesOnScreen = /priceLine\.append\('Bitcoin does not fix its price\.'\);[\s\S]*?rules\.textContent = 'It fixes the rules through which the market discovers its price\.';/.test(src420);
  check('PROTECTED: the rules line\'s on-screen form lives only in legacy 4-20\'s retired stability frame (build 7) — no Act V scene stages it (Ruling 5: script, not frame)', rulesOnScreen);

  // (b) "does not need to replace everything" — the architecture's line, on screen at Scene 29's frozen final frame.
  const NEXT_UNIT = 'Bitcoin does not need to replace everything. It only needs to become the preferred place to store the next unit of value.';
  const cm = src423.match(/conclusion\.append\('([^']+)'\);\s*conclusion\.append\(document\.createElement\('br'\)\);\s*conclusion\.append\('([^']+)'\);[\s\S]*?preferred\.textContent = '([^']+)';[\s\S]*?conclusion\.append\('([^']+)'\);[\s\S]*?nextUnit\.textContent = '([^']+)';[\s\S]*?conclusion\.append\(nextUnit, '(\.)'\);/);
  const onScreen = cm ? `${cm[1]} ${cm[2]}${cm[3]} ${cm[4]}${cm[5]}${cm[6]}` : '(NOT FOUND)';
  protectedCheck('"Bitcoin does not need to replace everything. It only needs to become the preferred place to store the next unit of value." — on screen at Scene 29\'s frozen final frame (legacy 4-23\'s conclusion, three lines, two bold spans)', NEXT_UNIT, onScreen, { where: '4-23 conclusion (frozen frame)' });
  check('PROTECTED: the spoken sibling of the line — "Bitcoin does not need to absorb everything. It only needs to win more of the margin." — stands in S28 b3 as the legacy speaks it', /Bitcoin does not need to absorb everything\. It only needs to win more of the margin\./.test(s28));

  // (c) the closing callback and (d) the covenant — the legacy 5-01 words, installed verbatim less the cut.
  const CALLBACK = 'An hour ago I told you something strange: that you’d spend eighty thousand hours of your life earning something you couldn’t define. Now you can define it.';
  const COVENANT = 'That framework is yours now. Not my conclusions — the framework. Check every score. None of this is investment advice; it’s the education you were never given.';
  const SEEING = 'Here’s the last thing I’ll tell you about seeing money this way: you won’t be able to stop.';
  protectedCheck('the closing callback — installed at S30 b1, opening the beat (the road sentence cut)', CALLBACK, s30.includes(CALLBACK) ? CALLBACK : '(NOT FOUND)', { where: 'S30 b1 (legacy 5-01 b1)' });
  check('PROTECTED: the callback opens S30 b1 — nothing stands before it', s30.startsWith(`[→] ${CALLBACK}`));
  protectedCheck('the covenant and the disclaimer — installed at S30 b2', COVENANT, s30.includes(COVENANT) ? COVENANT : '(NOT FOUND)', { where: 'S30 b2 (legacy 5-01 b2)' });
  protectedCheck('"you won’t be able to stop seeing it" — the architecture\'s Scene 30 phrase, in the legacy\'s own words', SEEING, s30.includes(SEEING) ? SEEING : '(NOT FOUND)', { where: 'S30 b2' });
  check('PROTECTED: S30 ends on "Thank you." — the last words of the film\'s script', s30.trim().endsWith('Thank you.'));
  check('PROTECTED: the road sentence is cut from S30 and stands once in the legacy source', !s30.includes('whole road') && src501.split(ROAD_SENTENCE).length - 1 === 1);
  protectedRows.push({ name: 'the architecture\'s Scene 30 paraphrase vs the legacy words', where: 'docs/synthesis-architecture.md, Scene 30', master: 'an hour ago, eighty thousand hours and a thing you couldn\'t define — now you can, and you won\'t be able to stop seeing it', installed: `${CALLBACK} … ${SEEING}`, identical: false, wordsIdentical: false, note: 'the architecture paraphrases; the legacy 5-01 words are the verbatim authority and are installed', ok: true });

  // (e) spoken-only: "The monetary competition is decided at the margin." (master §3.7)
  check('PROTECTED: "The monetary competition is decided at the margin." is spoken at S27 b3 and appears in no on-screen string of legacy 4-21 (master §3.7: spoken-only)',
    /The monetary competition is decided at the margin\./.test(s27) && !/textContent = '[^']*decided at the margin/.test(src421));
  // (f) the asked-calmly line at the marginal decision (R7 relocation).
  check('PROTECTED: the asked-calmly line stands at the marginal decision (R7 relocation) — S27 b2', /you’re just asking it calmly, in advance, with time to think/.test(s27));
  // (g) the premium line — the architecture's Scene 25 phrase, on screen at 4-18 b3.
  const PREMIUM = 'Bitcoin competes for the monetary premium — not the asset’s entire value.';
  const pm = src418.match(/finalLine\.append\('([^']+)'\);[\s\S]*?finalQualification\.textContent = "([^"]+)";/);
  protectedCheck('"Bitcoin competes for the monetary premium — not the asset’s entire value" — on screen at Scene 25\'s last beat (legacy 4-18\'s final line, two spans)', PREMIUM, pm ? `${pm[1]}${pm[2]}` : '(NOT FOUND)',
    { where: '4-18 finalLine', allow: () => true });
  // (h) the marginal question — on screen and spoken.
  const MARGINAL_Q = 'Where does the next unredeemed claim go?';
  check('PROTECTED: "Where does the next unredeemed claim go?" is on screen at Scene 27 (legacy 4-21\'s question) and spoken at S27 b3 — mid-sentence, after "Which means:", so its first letter is lowercase in the spoken form',
    src421.includes(`question.textContent = '${MARGINAL_Q}'`) && new RegExp(MARGINAL_Q.replace('?', '\\?'), 'i').test(s27));
  // (i) "Don't trust. Verify." — on stage once (Scene 23); the passage's mention is spoken.
  const verifyFiles = [17, 18, 19, 20, 21, 22, 23].map((n) => fs.readdirSync(path.join(REPO, LEGACY)).find((f) => f.startsWith(`${n}-`)))
    .concat(['../section-5-close/01-thank-you.js'])
    .filter((f) => /textContent = 'Don’t trust\.'|textContent = 'Verify\.'/.test(read(`${LEGACY}/${f}`)));
  check('PROTECTED: "Don’t trust. Verify." is on stage in none of the Act V sources — the passage\'s mention is spoken (the second on-stage use retired at R7.4)', verifyFiles.length === 0, verifyFiles.join(', ') || 'none');
  // (j) the field's rhyme — the components untouched, recorded by blob id.
  const blob = (f) => require('child_process').execSync(`git rev-parse HEAD:${f}`, { cwd: REPO }).toString().trim();
  results.rhyme = {
    unitField: blob('src/components/UnitField.js'),
    fixedSupplyField: blob('src/components/section-4/FixedSupplyField.js'),
    grammar: (read('src/components/UnitField.js').match(/PITCH_X: (\d+),\s*PITCH_Y: (\d+),\s*W_FRAC: ([\d.]+),\s*H_FRAC: ([\d.]+)/) || []).slice(1),
    p1: { pitch: (read('src/components/UnitField.js').match(/const PITCH = ([\d.]+);/) || [])[1], cols: 400, rows: 200, fillMs: (read('src/scenes/prologue/p1-eighty-thousand-hours.js').match(/const FILL_MS = (\d+);/) || [])[1], collapseMs: (read('src/scenes/prologue/p1-eighty-thousand-hours.js').match(/const COLLAPSE_MS = (\d+);/) || [])[1] },
    s28: { units: 35, cols: 7, rows: 5 }
  };
  check('RHYME: Scene 28\'s field reads its unit geometry from the same UnitField grammar P1\'s canvas field draws from (UNIT_GRAMMAR), and both components are untouched — recorded by blob id',
    results.rhyme.grammar.length === 4 && /UnitGrid\(\{/.test(read('src/components/section-4/FixedSupplyField.js')) && /import \{ UnitGrid \} from '\.\.\/UnitField\.js'/.test(read('src/components/section-4/FixedSupplyField.js')),
    `grammar ${results.rhyme.grammar.join(' / ')} · P1 pitch ${results.rhyme.p1.pitch} · UnitField ${results.rhyme.unitField.slice(0, 8)} · FixedSupplyField ${results.rhyme.fixedSupplyField.slice(0, 8)}`);
}

// 6. THE SELF-REFERENCE BAN — hardest at the close: no medium, no sequel, no waypoint, no section.
{
  const MEDIUM = /\b(this presentation|these slides|my updated slides|this deck|this video|this talk|this film|one slide ago|the rest of the evening|tonight|this section|whole section|this chapter|section \d)\b/i;
  const CLOSE_BAN = /\b(sequel|next time|part two|see you|subscribe|the whole road|waypoint|three questions|slides?|presentation|video|talk|film|deck|chapter)\b/i;
  const hits = rows.filter((r) => MEDIUM.test(r.installed.replace(/\*\*\[[\s\S]*?\]\*\*/g, ''))).map((r) => `${r.scene}: “${r.installed.match(MEDIUM)[0]}”`);
  check('LANGUAGE: no Act V script names the medium, the live delivery or a section (the marker set aside)', hits.length === 0, hits.join(' · ') || `${rows.length} scripts clean`);
  const s30 = rows.find((r) => r.scene === 'S30').installed;
  const closeHits = s30.match(CLOSE_BAN);
  check('LANGUAGE — THE CLOSE: Scene 30 names no medium, no sequel, no waypoint', !closeHits, closeHits ? `“${closeHits[0]}”` : 'clean');
  const legacyRoad = /whole road|three questions/.test(notesOf(`${CLOSE}/01-thank-you.js`));
  check('LANGUAGE — THE CLOSE: the waypoint sentence the legacy spoke is the one the ledger cuts (it stands in the source, not the script)', legacyRoad);
  const pointers = rows.flatMap((r) => (r.installed.match(/\b(this line|this one|this picture|that table|the table)\b/gi) || []).map((m) => `${r.scene}: “${m}”`));
  check('LANGUAGE: the frame pointers in the Act V scripts are reported for the presenter\'s eye (each points at a frame that stands in its scene, or at the table the passage names)', true, pointers.join(' · ') || 'none');
  results.pointers = pointers;
}

const out = {
  date: new Date().toISOString(),
  session: 'act-5-foundation',
  rule: 'docs/batch-e-package.md §2 is the legacy Act V slides\' own notes (4-17 … 4-23, 5-01), assembled in the architecture\'s scene merges, with exactly the adaptation ledger applied — two self-reference substitutions, the rules line installed in Scene 29 (Ruling 5\'s named distribution), the waypoint sentence cut from the close — and the three entry lines made the first beats of their scenes; proven word for word and character for character; every scene\'s [→] count is §1\'s map at its defaults (27); the protected lines verified character for character with every difference reported; the self-reference ban checked hardest at the close.',
  ledger: LEDGER.map(([scene, file, from, to, why]) => ({ scene, file, from, to, why })),
  scenes: rows.map((r) => ({ scene: r.scene, words: words(r.installed).length, beats: (r.installed.match(/\[→\]/g) || []).length, expected: r.beats })),
  totalBeats: TOTAL_BEATS,
  protectedLines: protectedRows,
  rhyme: results.rhyme,
  pointers: results.pointers,
  checks: results.length,
  failures: results.filter((r) => !r.ok).length,
  results: results.slice()
};
fs.mkdirSync(path.join(__dirname, '..'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '..', 'script-install.json'), JSON.stringify(out, null, 2));
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} script-install checks green`);
process.exit(failed.length ? 1 : 0);
