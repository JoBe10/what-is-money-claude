// Act IV foundation — the script installation, made mechanical (the Act IV
// kickoff brief, Part B §2).
//
// Two modes over one table:
//
//   --emit     EXTRACT the frozen Section 4 scripts from the legacy slide
//              modules' own `notes` literals, assemble them into the
//              batch-d package's §2 in the architecture's scene merges, and
//              apply exactly the adaptation ledger's substitutions (below —
//              the only edits the brief permits: structural self-references
//              replaced, the named re-homing seams, the notes-only armor
//              relocated where the architecture and the master rule it).
//              Prints the §2 text; the package is assembled around it, so
//              "installed verbatim from the legacy slides" is a fact of the
//              pipeline rather than a transcription.
//
//   (default)  VERIFY docs/batch-d-package.md §2 against the sources plus
//              the ledger at word and character strength (the Act III
//              script-diff discipline), count every scene's [→] against §1,
//              verify the protected lines character for character against
//              the master's strings (reporting every difference rather than
//              rounding it away), and run the virginity check — nothing
//              before Scene 16 anticipates the generalization.
//
// Usage: node script-install.cjs [--emit]
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO = path.join(__dirname, '..', '..', '..');
const read = (p) => fs.readFileSync(path.join(REPO, p), 'utf8').replace(/\r\n/g, '\n');
const LEGACY = 'src/slides/section-4-ideal-store';

// ---- the sources --------------------------------------------------------
const notesOf = (file) => {
  const src = read(`${LEGACY}/${file}`);
  const m = src.match(/notes: `([\s\S]*?)`\s*\n\};/);
  if (!m) throw new Error(`${file}: no notes literal`);
  return m[1].trim();
};
const paragraphs = (notes) => notes.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
const advances = (notes) => paragraphs(notes).filter((p) => p.startsWith('[→]'));

// The architecture's own Scene 16 line (canonical — docs/synthesis-architecture.md, Scene 16).
const RETURN_LINE = 'We left this exchange open. What has to survive until we close it?';
// The presenter's bridge sentence (ruled 3 Sep 2026, master §13) and the span
// of legacy 4-04's first paragraph it replaces — the four sentences spoken at
// Scenes 3 and 4. The passage resumes, uncut, at "And this is the moment to
// pay a debt"; the legacy "And" is kept so no legacy character is altered.
const BRIDGE = 'The surgeon is still holding the claim he accepted that day.';
const CUT_404 = 'He has not received the final goods or services he actually wants. No shoes, no steak, no wine, no housing — if he’d received those directly, that would have been barter. Instead, he receives money. ';

// ---- the adaptation ledger (the only edits) ------------------------------
// [scene, source file, from, to, why]. Each `from` must occur exactly once
// in its source; the verifier proves the installed text is the source with
// exactly these applied.
const LEDGER = [
  ['S17', '07-store-of-value-function.js',
    'So here is the definition we will use for the rest of the evening:',
    'So here is the definition we will use from here:',
    'a live-delivery self-reference ("the evening"); master §3.5\'s permitted form "here"'],
  ['S23', '16-the-comparison.js',
    'the holding we defined one slide ago',
    'the holding we defined a moment ago',
    'a structural self-reference ("one slide ago"); the holding is spoken earlier in the same scene'],
  ['S23', '16-the-comparison.js',
    'and here’s what it means tonight, concretely:',
    'and here’s what it means, concretely:',
    'a live-delivery self-reference ("tonight") — the word deleted, nothing added'],
  ['S23-armor', '20-bitcoin-does-not-replace-everything.js',
    'that is precisely the currency chart from Section 2,',
    'that is precisely the currency chart you saw earlier,',
    'a structural self-reference ("Section 2") in the relocated steelman; replaced with what the viewer watched (the batch-c ledger\'s form)'],
  // A `to` of '' is a presenter-ruled CUT: the span is deleted and nothing is
  // written in its place (master §13, 3 Sep 2026 — the two dead pointer
  // sentences in the relocated steelman, which named 4-20's drawn contrast).
  ['S23-armor', '20-bitcoin-does-not-replace-everything.js',
    ' That is this line: restless, and it is supposed to be.',
    '',
    'presenter-ruled cut, 3 Sep 2026 (master §13): a dead pointer at 4-20\'s drawn contrast, which has no frame in Scene 23'],
  ['S23-armor', '20-bitcoin-does-not-replace-everything.js',
    ' That is this one.',
    '',
    'presenter-ruled cut, 3 Sep 2026 (master §13): the second dead pointer'],
  // The Scene 4 return's join (presenter-ruled, 3 Sep 2026 — master §13): the
  // four pre-spoken sentences give way to the bridge sentence; the legacy
  // passage resumes uncut from "this is the moment to pay a debt" onward.
  ['S16', '04-unfinished-exchange.js',
    CUT_404,
    `${BRIDGE} `,
    'the Scene 16 b1 join, presenter-ruled 3 Sep 2026 (master §13): the four sentences spoken at Scenes 3 and 4 are cut and the bridge sentence stands in their place; the legacy passage resumes uncut at "And this is the moment to pay a debt"']
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

// ---- the armor markers (not spoken, never [→]) ---------------------------
// (The seam flag that stood at S16 b1 until 3 Sep 2026 is gone: the join is
// the presenter's, installed through the ledger above.)
const ARMOR_STEELMAN_HEAD = '**[Notes-only — Q&A armor, never spoken: the stability steelman, relocated here by architecture Ruling 5 (the stability scene is cut; the two-question distinction and the stage-signature inoculation speak in Scene 9; the rules line stays spoken in Scene 29). Verbatim from legacy 4-20\'s three closing spoken beats, less two sentences: its two pointer sentences — "That is this line: restless, and it is supposed to be." and "That is this one." — named 4-20\'s drawn contrast, which has no frame here, and are cut by presenter ruling (3 September 2026, master §13); nothing is written in their place.]**';
const ARMOR_ARSENAL_HEAD = '**[Notes-only — Q&A armor, never spoken: the two-prong displacement writeup and the trapped-exit answer, at the comparison scene\'s notes per master §9.6. Verbatim from legacy 4-20\'s Q&A arsenal.]**';

// ---- the scenes (the architecture's merges; the [→] maps by construction)
function assemble() {
  const n404 = advances(notesOf('04-unfinished-exchange.js'));
  const n406 = advances(notesOf('06-claim-and-carrier.js'));
  const n407 = advances(notesOf('07-store-of-value-function.js'));
  const n408 = advances(notesOf('08-100-year-test.js'));
  const n409 = advances(notesOf('09-future-is-unknowable.js'));
  const n410 = advances(notesOf('10-invert-the-question.js'));
  const n411 = advances(notesOf('11-carrier-failures-i.js'));
  const n412 = advances(notesOf('12-carrier-failures-ii.js'));
  const n413 = advances(notesOf('13-failure-to-requirement.js'));
  const n414 = advances(notesOf('14-ten-properties.js'));
  const n415 = advances(notesOf('15-framework-to-comparison.js'));
  const n416 = advances(notesOf('16-the-comparison.js'));
  const p420 = paragraphs(notesOf('20-bitcoin-does-not-replace-everything.js'));
  const a420 = p420.filter((p) => p.startsWith('[→]'));
  // The steelman: 4-20's last three spoken beats (builds 5–7).
  const steelman = a420.slice(4, 7).map((p) => p.replace(/^\[→\]\s*/, ''));
  // The Q&A arsenal: the paragraph after the "— Q&A ARSENAL" marker.
  const arsenalAt = p420.findIndex((p) => p.startsWith('— Q&A ARSENAL'));
  const arsenal = p420.slice(arsenalAt + 1);

  const s16b1 = `[→] ${RETURN_LINE} ${n404[0].replace(/^\[→\]\s*/, '')}`;
  return {
    S16: apply([s16b1, n404[1], n404[2], n404[3], ...n406].join('\n\n'), 'S16'),
    S17: apply(n407.join('\n\n'), 'S17'),
    S18: [...n408, ...n409].join('\n\n'),
    S19: n410.join('\n\n'),
    S20: n411.join('\n\n'),
    S21: n412.join('\n\n'),
    S22: [...n413, ...n414].join('\n\n'),
    S23: [
      apply([...n415, ...n416].join('\n\n'), 'S23'),
      ARMOR_STEELMAN_HEAD,
      apply(steelman.join('\n\n'), 'S23-armor'),
      ARMOR_ARSENAL_HEAD,
      arsenal.join('\n\n')
    ].join('\n\n')
  };
}

const SCENES = [
  { key: 'S16', title: 'Return to the Open Exchange', beats: 8 },
  { key: 'S17', title: 'What the Carrier Must Preserve', beats: 5 },
  { key: 'S18', title: 'The 100-Year Test', beats: 8 },
  { key: 'S19', title: 'Invert the Question', beats: 2 },
  { key: 'S20', title: 'How the Carrier Can Fail: I', beats: 5 },
  { key: 'S21', title: 'How the Carrier Can Fail: II', beats: 5 },
  { key: 'S22', title: 'From Failure to Requirement — the Ten Properties', beats: 4 },
  { key: 'S23', title: 'The Comparison', beats: 6 }
];
const TOTAL_BEATS = 43;

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

const pkg = read('docs/batch-d-package.md');
const pkgSection = block(pkg, '# 2. Scripts', ['\n# 3. ']);
if (pkgSection == null) {
  console.error('FAIL  docs/batch-d-package.md has no "# 2. Scripts" section');
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
  check(`BEATS: every scene's [→] count is its §1 map, and Act IV is ${TOTAL_BEATS} at the default map`,
    bad.length === 0, bad.join(' · ') || `${detail.join(' · ')} = ${total}`);
  const maps = block(pkg, '# 1. Beat maps', ['\n# 2. ']);
  const mapBad = SCENES.filter((s) => !new RegExp(`\\*\\*${s.key} — [^*]*\\*\\* \\((${s.beats})\\)`).test(maps || '')).map((s) => s.key);
  check('MAP: §1\'s beat maps state the same counts as §2\'s scripts', mapBad.length === 0,
    mapBad.join(', ') || `${SCENES.length}/${SCENES.length} agree`);
  const flagsClean = rows.every((r) => !/\*\*\[[^\]]*\[→\]/.test(r.installed));
  check('MARKERS: the seam flag and the armor blocks carry no advance', flagsClean);
}

// 4. THE LEDGER — each substitution occurs exactly once in its source, and the installed text carries the replacement, not the original.
{
  const bad = [];
  LEDGER.forEach(([scene, file, from, to]) => {
    const src = notesOf(file);
    const n = src.split(from).length - 1;
    const r = rows.find((x) => x.scene === scene.replace('-armor', ''));
    const hasTo = to === '' || r.installed.includes(to);
    const hasFrom = r.installed.includes(from);
    if (n !== 1 || !hasTo || hasFrom) bad.push(`${scene}: "${from}" ×${n} in source · installed has replacement ${hasTo} · installed still has original ${hasFrom}`);
  });
  const cuts = LEDGER.filter((l) => l[3] === '').length;
  check(`LEDGER: ${LEDGER.length} entries — ${LEDGER.length - cuts} substitutions and ${cuts} presenter-ruled cuts — each once in its source, each applied, none of the originals surviving`,
    bad.length === 0, bad.join(' · ') || LEDGER.map((l) => `${l[0]}: “${l[2].trim()}” → ${l[3] === '' ? '(cut)' : `“${l[3].trim()}”`}`).join(' · '));
}

// 4b. THE ARMOR CUTS (presenter-ruled, 3 Sep 2026 — master §13): the two dead
// pointer sentences are gone from the installed steelman and stand, once
// each, in the legacy source they were cut from.
{
  // The marker blocks quote the cut sentences by name; the check reads the
  // armor's own paragraphs with the markers stripped.
  const s23 = rows.find((x) => x.scene === 'S23').installed.replace(/\*\*\[[\s\S]*?\]\*\*/g, '');
  const src420 = notesOf('20-bitcoin-does-not-replace-everything.js');
  const POINTERS = ['That is this line: restless, and it is supposed to be.', 'That is this one.'];
  const gone = POINTERS.every((p) => !s23.includes(p));
  const inSource = POINTERS.every((p) => src420.split(p).length - 1 === 1);
  check('ARMOR: the two dead pointer sentences are cut from the installed steelman (presenter ruling, 3 Sep 2026) and stand once each in the legacy 4-20 source',
    gone && inSource, `cut from S23 ${gone} · once each in 4-20 ${inSource}`);
}

// 4c. THE JOIN (presenter-ruled, 3 Sep 2026 — master §13): S16 b1 is the
// architecture's return line, the presenter's bridge sentence, then legacy
// 4-04's first paragraph from "this is the moment to pay a debt" onward; the
// four pre-spoken sentences are cut and stand, once, in the legacy source.
{
  const s16 = rows.find((x) => x.scene === 'S16').installed;
  const first = s16.split('\n\n')[0];
  const src404 = notesOf('04-unfinished-exchange.js');
  const head = `[→] ${RETURN_LINE} ${BRIDGE} And this is the moment to pay a debt — because`;
  const joined = first.startsWith(head);
  const cutGone = !s16.includes(CUT_404.trim());
  const cutInSource = src404.split(CUT_404).length - 1 === 1;
  const bridgeOnce = s16.split(BRIDGE).length - 1 === 1 && !src404.includes(BRIDGE);
  check('JOIN: S16 b1 is the return line, the bridge sentence, then the legacy passage from "this is the moment to pay a debt" onward — the four pre-spoken sentences cut (presenter ruling, 3 Sep 2026)',
    joined && cutGone && cutInSource && bridgeOnce,
    `joined ${joined} · the cut span absent ${cutGone} · once in 4-04 ${cutInSource} · the bridge once and nowhere in the legacy ${bridgeOnce}`);
}

// 5. THE PROTECTED LINES — character for character, every difference reported.
const protectedRows = [];
function protectedCheck(name, master, installed, { where = '', allow = null } = {}) {
  const same = master === installed;
  let at = 0;
  while (at < master.length && at < installed.length && master[at] === installed[at]) at += 1;
  const diff = same ? null : { at, master: master.slice(at, at + 24), installed: installed.slice(at, at + 24) };
  // The word stream, markup and punctuation stripped, lowercased — the words themselves.
  const norm = (s) => s.toLowerCase().replace(/\*/g, '').replace(/’/g, "'").replace(/[.;,—–\-:?!]/g, ' ').split(/\s+/).filter(Boolean).join(' ');
  const wordsSame = norm(master) === norm(installed);
  const ok = same || (wordsSame && (allow ? allow(master, installed) : true));
  protectedRows.push({ name, where, master, installed, identical: same, wordsIdentical: wordsSame, firstDifference: diff, ok });
  check(`PROTECTED: ${name}`, ok, same ? 'character-for-character identical'
    : `words identical; first character difference at ${at}: master “${diff.master}” vs installed “${diff.installed}”`);
}
{
  const s16 = rows.find((r) => r.scene === 'S16').installed;
  const s18 = rows.find((r) => r.scene === 'S18').installed;
  const s17 = rows.find((r) => r.scene === 'S17').installed;
  const s23 = rows.find((r) => r.scene === 'S23').installed;
  const src416 = read(`${LEGACY}/16-the-comparison.js`);
  const src404 = read(`${LEGACY}/04-unfinished-exchange.js`);

  // (a) the crescendo — master §9.3 / the architecture's Scene 16.
  const CRESCENDO = 'You cannot print money. You can only print the units it comes in — and every unit printed drains the ones already earned.';
  const cm = s16.match(/you cannot print money\. You can only print the units it comes in — and every unit printed drains the ones already earned\./i);
  protectedCheck('the bisection crescendo (master §9.3, architecture Scene 16) — installed in S16 b7', CRESCENDO, cm ? cm[0] : '(NOT FOUND)',
    { where: 'S16 b7 (legacy 4-06 b3)', allow: (m, i) => m.slice(1) === i.slice(1) });

  // (b) "Don't trust. Verify." — on stage exactly once, at the table (master §3.7).
  const onStage = /challenge\.textContent = 'Don’t trust\.';[\s\S]*?verification\.textContent = 'Verify\.';/.test(src416);
  const stageFiles = fs.readdirSync(path.join(REPO, LEGACY)).filter((f) => f.endsWith('.js'))
    .filter((f) => /textContent = 'Don’t trust\.'|textContent = 'Verify\.'/.test(read(`${LEGACY}/${f}`)));
  protectedCheck('"Don’t trust. Verify." — the table\'s closing line, on stage', 'Don’t trust. Verify.', onStage ? 'Don’t trust. Verify.' : '(NOT FOUND)',
    { where: '4-16 finalLine (two spans)' });
  check('PROTECTED: "Don’t trust. Verify." is on stage exactly once in the Section 4 sources (master §3.7; the second use retired at R7.4)',
    stageFiles.length === 1 && stageFiles[0] === '16-the-comparison.js', stageFiles.join(', '));

  // (c) the enlargement rung 4 phrasing — master §3.3 and §9.2.
  const RUNG4_33 = 'not a legal claim on anyone in particular; a social claim on everyone in general.';
  const RUNG4_92 = 'not a legal claim on anyone in particular — a social claim on everyone in general, enforced by acceptance, not courts.';
  const rm = s16.match(/Not a \*legal\* claim on anyone in particular\. A \*social\* claim on everyone in general — enforced not by courts, but by acceptance\./);
  const installedRung = rm ? rm[0] : '(NOT FOUND)';
  protectedCheck('the enlargement rung 4 phrasing vs master §3.3', RUNG4_33, installedRung.replace(/ — enforced not by courts, but by acceptance\./, '.'),
    { where: 'S16 b3 (legacy 4-04 b3)' });
  protectedRows[protectedRows.length - 1].note = 'the master’s §3.3 form ends at "in general."; the installed sentence continues "— enforced not by courts, but by acceptance." (the §9.2 clause, in the legacy’s own order); compared with that clause set aside';
  {
    // §9.2 adds the enforcement clause. The protected phrase proper (through
    // "in general") must match word for word; the clause's difference is
    // REPORTED exactly — the legacy's order and its extra word — never
    // rounded away and never altered.
    const norm = (s) => s.toLowerCase().replace(/\*/g, '').replace(/’/g, "'").replace(/[.;,—–\-:?!]/g, ' ').split(/\s+/).filter(Boolean);
    const a = norm(RUNG4_92);
    const b = norm(installedRung);
    const cut = (arr) => arr.indexOf('general') + 1;
    const phraseSame = a.slice(0, cut(a)).join(' ') === b.slice(0, cut(b)).join(' ');
    const clauseMaster = a.slice(cut(a)).join(' ');
    const clauseLegacy = b.slice(cut(b)).join(' ');
    const extra = b.slice(cut(b)).filter((w) => !a.slice(cut(a)).includes(w));
    protectedRows.push({
      name: 'the rung 4 phrasing vs master §9.2 — the enforcement clause', where: 'S16 b3 (legacy 4-04 b3)',
      master: RUNG4_92, installed: installedRung, identical: false, wordsIdentical: phraseSame,
      clause: { master: clauseMaster, legacy: clauseLegacy, legacyExtraWords: extra }, ok: phraseSame
    });
    check('PROTECTED: the rung 4 phrasing vs master §9.2 — the protected phrase word for word; the enforcement clause\'s difference reported exactly',
      phraseSame, phraseSame
        ? `phrase identical through "in general"; the clause: master “${clauseMaster}” vs legacy “${clauseLegacy}” — the legacy's extra word${extra.length === 1 ? '' : 's'}: ${extra.join(', ') || 'none'}; order differs`
        : `PHRASE DIFFERS: ${a.join(' ')} | ${b.join(' ')}`);
  }

  // (d) the definition on screen — master §9.2.
  const defOnScreen = /headlineLead\.textContent = 'AN EARNED, TRANSFERABLE';[\s\S]*?headlineClaim\.textContent = 'CLAIM ON VALUE';/.test(src404);
  protectedCheck('the on-screen definition (master §9.2) — legacy 4-04\'s two-line headline', 'AN EARNED, TRANSFERABLE CLAIM ON VALUE.',
    defOnScreen ? 'AN EARNED, TRANSFERABLE CLAIM ON VALUE' : '(NOT FOUND)', { where: '4-04 headline (two stacked lines, no trailing period)' });
  const defSpoken = /Money is an earned, transferable claim on value\./.test(s16);
  check('PROTECTED: the spoken definition "Money is an earned, transferable claim on value." is installed at S16 b2', defSpoken);

  // (e) the hundred-year sentence — master §9.5.
  const HUNDRED = "One hundred years — long enough that you're not allowed to assume any company, any arrangement, any government survives it. That's the point of the number.";
  const hm = s18.match(/One hundred years — long enough that you’re not allowed to \*assume\* any company, any arrangement, any government survives it\. That’s the point of the number\./);
  protectedCheck('the hundred-year sentence (master §9.5) — installed in S18 b2', HUNDRED, hm ? hm[0] : '(NOT FOUND)', { where: 'S18 b2 (legacy 4-08 b2)' });

  // (f) the dated scores — master §3.7.
  check('PROTECTED: the scores are dated — "my judgments, as of 2026" installed at S23 b6', /my judgments, as of 2026/.test(s23));

  // (g) the return line — the architecture's canonical Scene 16 line opens S16.
  check('PROTECTED: the architecture\'s return line opens S16 b1, verbatim', s16.startsWith(`[→] ${RETURN_LINE}`));

  // (h) the store-of-value definition, spoken — the legacy 4-07 form the architecture names (purchasing power + redeemability).
  check('PROTECTED: the store-of-value definition (purchasing power + redeemability) installed at S17 b5',
    /a store of value is a monetary carrier that preserves the purchasing power of an unredeemed claim, and keeps that claim redeemable through time\./.test(s17));

  // (i) the frozen data — recorded by sha256, and the table's own rules.
  const cmp = read(`${LEGACY}/_comparison-data.js`);
  const fpd = read(`${LEGACY}/_failure-property-data.js`);
  const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
  const scores = [...cmp.matchAll(/scores: \{ gold: (\d), fiat: (\d), bitcoin: (\d), property: (\d), shares: (\d) \}/g)].map((m) => m.slice(1, 6).map(Number));
  const props = [...cmp.matchAll(/property: '([A-Z ]+)'/g)].map((m) => m[1]);
  const failures = [...fpd.matchAll(/failure: '([A-Z \-]+)'/g)].map((m) => m[1]);
  const fpProps = [...fpd.matchAll(/property: '([A-Z ]+)'/g)].map((m) => m[1]);
  check('FROZEN: fifty scores, ten rows, in _comparison-data.js — recorded by sha256',
    scores.length === 10 && scores.every((r) => r.length === 5), `${scores.length} rows · sha256 ${sha(cmp).slice(0, 16)}…`);
  check('FROZEN: the ten properties invert one-to-one from the ten failures, in the table\'s order (master §9.5)',
    props.length === 10 && fpProps.length === 10 && props.every((p, i) => p === fpProps[i]) && failures.length === 10,
    `${failures.join(' · ')} → ${props.join(' · ')}`);
  check('FROZEN: PROPERTY is the row header and the real-estate asset is labeled REAL ESTATE (master §3.7)',
    /propertyHeading\.textContent = 'PROPERTY'/.test(read('src/components/section-4/AssetComparisonTable.js')) && /label: 'REAL ESTATE'/.test(cmp));
  results.frozen = { comparisonDataSha256: sha(cmp), failurePropertyDataSha256: sha(fpd), scores, properties: props, failures };
}

// 6. VIRGINITY — nothing before Scene 16 anticipates the generalization (master §3.3), and the 100-Year Test / the inversion never appear before Act IV.
{
  const before = [
    ...['src/scenes/prologue', 'src/scenes/act-1-the-unfinished-exchange', 'src/scenes/act-2-the-architecture-of-money', 'src/scenes/act-3-the-jobs-of-money']
      .flatMap((d) => fs.readdirSync(path.join(REPO, d)).filter((f) => f.endsWith('.js')).map((f) => `${d}/${f}`)),
    // The deck's two legacy survivors before Act IV. 3-08-waypoint-judge left
    // the deck on 3 Sep 2026 (master §13 — the file stays on disk); it no
    // longer stands before Act IV and is no longer enumerated here.
    'src/slides/section-3-function/00-waypoint-function.js',
    'src/slides/section-3-function/04-stage-signatures.js'
  ];
  const stripComments = (s) => s.split('\n').filter((l) => !/^\s*\/\//.test(l)).join('\n');
  const GENERALIZATION = [/claim on value/i, /social claim/i, /legal claim/i, /claim on everyone/i, /claim on anyone/i, /transferable claim/i, /earned, transferable/i];
  const TEST = [/100-year/i, /hundred-year/i, /hundred years/i, /2126/, /\binvert/i, /print money/i, /units it comes in/i, /ten propert/i, /ten ways/i];
  const genHits = [];
  const testHits = [];
  before.forEach((f) => {
    const src = stripComments(read(f));
    src.split('\n').forEach((line, i) => {
      if (GENERALIZATION.some((re) => re.test(line))) genHits.push(`${f}:${i + 1}: ${line.trim().slice(0, 90)}`);
      if (TEST.some((re) => re.test(line))) testHits.push(`${f}:${i + 1}: ${line.trim().slice(0, 110)}`);
    });
  });
  check('VIRGINITY: no scene before Scene 16 speaks or shows the generalization — "claim on value", "social claim", "legal claim", "transferable claim"',
    genHits.length === 0, genHits.join(' · ') || `${before.length} files clean`);
  check('VIRGINITY: the 100-Year Test and the inversion never appear before Act IV — every hit reported for the presenter\'s eye',
    true, testHits.length ? testHits.join(' · ') : 'no hits');
  results.virginity = { filesChecked: before.length, generalizationHits: genHits, testHits };
}

const out = {
  date: new Date().toISOString(),
  session: 'act-4-foundation',
  rule: 'docs/batch-d-package.md §2 is the legacy Section 4 slides\' own notes, assembled in the architecture\'s scene merges, with exactly the adaptation ledger applied — the four substitutions, and the presenter\'s rulings of 3 Sep 2026 (the Scene 16 b1 join; the two armor cuts) — proven word for word and character for character; every scene\'s [→] count is §1\'s frozen map; the protected lines are verified character for character against the master with every difference reported; nothing before Scene 16 anticipates the generalization.',
  ledger: LEDGER.map(([scene, file, from, to, why]) => ({ scene, file, from, to, why })),
  scenes: rows.map((r) => ({ scene: r.scene, words: words(r.installed).length, beats: (r.installed.match(/\[→\]/g) || []).length, expected: r.beats })),
  totalBeats: TOTAL_BEATS,
  protectedLines: protectedRows,
  frozen: results.frozen,
  virginity: results.virginity,
  checks: results.length,
  failures: results.filter((r) => !r.ok).length,
  results: results.slice()
};
fs.mkdirSync(path.join(__dirname, '..'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '..', 'script-install.json'), JSON.stringify(out, null, 2));
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} script-install checks green`);
process.exit(failed.length ? 1 : 0);
