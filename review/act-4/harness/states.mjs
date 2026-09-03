// Act IV — the beat-state sheet builders (the Act IV kickoff brief, Session 2;
// the ruled map `docs/act-4-provenance.md`, 3 September 2026).
//
// EVERY CELL IS A PORT, AND THIS FILE DRAWS NOTHING. The ruled map is
// 21 PORT · 0 ADAPT · 0 NEW · 2 retired (the three ARGUABLE rows answered
// A · A · A at their defaults, master §13), so the sheet's job is transplant,
// not design: each cell MOUNTS THE LEGACY SLIDE MODULE ITSELF — the same
// `render` / `onEnter` / `buildStep` the deck runs — at the legacy build the
// map names, and lets the legacy stylesheet place every element. The one cell
// that is not a Section 4 slide, the homecoming (S16 b1), mounts THE FILM'S
// OWN ACT I STAGE and applies Scene 4's approved save state through the
// stage's own state law (`applyState('spend-or-save', 3)` — the state whose
// settled frame the landed-state proof proved against the approved s4-b4-b at
// zero pixels). The only element this file creates is the stage container.
// A check gates that at the source: `document.createElement(` appears once.
//
// THE FROZEN BEAT MAP (master §13, 3 Sep 2026): S16 8 · S17 5 · S18 8 ·
// S19 2 · S20 5 · S21 5 · S22 3 · S23 6 — 42 beats, 42 cells, one per beat
// (43 until the Batch D ruling 2 of the same day merged Scene 22's list beats).
//
// THE BEAT → LEGACY BUILD DERIVATION, from the ruled map's rows:
//   S16  b1 the homecoming (F1: the film's own s4-b4-b) · b2–b3 4-04 build 3
//        (F3 — the scene gone, the definition risen, the claim released) ·
//        b4 4-04 build 4 · b5 4-06 build 1 · b6 build 2 · b7 build 3 · b8 build 4
//   S17  4-07 builds 1–5
//   S18  4-08 builds 1–3 · 4-09 builds 1–5 (4-09's build 0 is 4-08's last state)
//   S19  4-10 builds 1–2
//   S20  4-11 builds 1–5 · S21 4-12 builds 1–5
//   S22  4-13 builds 1–2 · 4-14 build 2 (the ten properties in one advance —
//        ruled 3 Sep 2026; the legacy's two builds are the film's one)
//   S23  4-15 builds 1–4 · 4-16 builds 1–2
//
// WHERE A LEGACY BUILD 0 HAS NO ADVANCE IN THE MERGED ACT (4-10's direct
// framing, 4-13's unmapped grid, 4-14's empty frame, 4-16's empty table) the
// sheet stands the settled state of the beat and flags the movement in plain
// English — one honest render, nothing decided silently. The same for the
// entry seam and the disc's travel and scale between S16's frames.
//
// Review classes: `approved-port` — a PORT cell, approved by provenance;
// `approved-ruled` — a cell whose flag the presenter answered with a ruling
// at the flipbook walk (the Batch D implementation brief §1, 3 Sep 2026,
// master §13), the ruling recorded on the cell in the flag's place;
// `approved-as-rendered` — a cell that carried a wiring flag to the walk and
// was approved as rendered there (ruling 3 of the same brief), its flag kept
// as a closed record. THE SHEET IS APPROVED IN FULL (3 Sep 2026): no cell is
// pending, and the 42 cells are the approved set — the visual authority for
// every landed-state proof of the Batch D implementation. No cell carries a
// candidate system.
//
// THE BATCH D RULINGS (3 Sep 2026, ruled against this sheet): (1) Scene 19
// restages — the carrier arrives at beat 2, keyed to build 2 at the source
// (legacy 4-10 + CarrierStressStage's `visible`); S19-F1 is ADAPT, the one
// ruled change named in the map. The cells still mount the legacy module
// itself: the ruled change lives at the source, so the mount carries it.
// (2) Scene 22 merges its list beats — all ten properties land in one
// advance; S22 = 3, the act = 42; S22-F2 is ADAPT (the landing as one
// gesture, Scene 22's build at Session 2); the merged cell is legacy 4-14's
// own last state, mounted as the legacy performs it. (3) The sheet is
// approved in full — the eight remaining flagged cells as rendered, the
// table-kicker spacing (s23-b5 · s23-b6) an accepted legacy fact.
//
// AMENDED AT ACTS III–IV FINAL (the Act V kickoff brief, Part A §2; master
// §13, 3 Sep 2026 — the ruling recorded before this file was touched): THE
// TABLE'S HEADERS BECOME RENDERS. The five candidate glyphs retire from the
// asset headings and the renders ride as a header band above the table at
// the rails-law band scale, the grammar beneath untouched. The change is
// made at the source (legacy 4-16 and the table component), so the mount
// carries it: s23-b5 and s23-b6 re-render as the updated approved states on
// the ruling's authority; S23-F2 is ADAPT (18 PORT · 3 ADAPT).
//
// AMENDED AT ACT-5-STATES (the presenter's fit ruling, 4 Sep 2026, master
// §13 — recorded before this file was touched): the band's fit, flagged at
// the session above, is ruled — the ten score rows return to the legacy 60 px
// pitch and the band shrinks to a 100 × 100 contain box (a ruled departure
// from the rails law's 188 box for this surface). The change is at the source
// again (legacy 4-16, the stylesheet); s23-b5 and s23-b6 re-render a second
// time on that authority and are re-proven in the deck
// (review/act-5/landed-proof-s23-band.json).

import { ensureStage, destroyStage } from '/src/scenes/act-1-the-unfinished-exchange/_exchangeStage.js';
import s404 from '/src/slides/section-4-ideal-store/04-unfinished-exchange.js';
import s406 from '/src/slides/section-4-ideal-store/06-claim-and-carrier.js';
import s407 from '/src/slides/section-4-ideal-store/07-store-of-value-function.js';
import s408 from '/src/slides/section-4-ideal-store/08-100-year-test.js';
import s409 from '/src/slides/section-4-ideal-store/09-future-is-unknowable.js';
import s410 from '/src/slides/section-4-ideal-store/10-invert-the-question.js';
import s411 from '/src/slides/section-4-ideal-store/11-carrier-failures-i.js';
import s412 from '/src/slides/section-4-ideal-store/12-carrier-failures-ii.js';
import s413 from '/src/slides/section-4-ideal-store/13-failure-to-requirement.js';
import s414 from '/src/slides/section-4-ideal-store/14-ten-properties.js';
import s415 from '/src/slides/section-4-ideal-store/15-framework-to-comparison.js';
import s416 from '/src/slides/section-4-ideal-store/16-the-comparison.js';

const STAGE_ID = 'act4-states-stage';

let cleanup = [];

export const CELLS = {};
function cell(id, meta, build) {
  CELLS[id] = { ...meta, build };
}

// The stage container — the one element this file creates. The legacy roots
// are `position:absolute; inset:0` (`.s4-opening`) and the Act I stage's root
// likewise, so a fixed 1920 × 1080 box on the deck's black is the slide-root
// they expect, minus the deck chrome.
function stage() {
  teardown();
  const el = document.createElement('div');
  el.id = STAGE_ID;
  el.style.cssText = 'position:fixed; left:0; top:0; width:1920px; height:1080px;' +
    'background:#000; overflow:hidden; z-index:9999; font-family:Inter,sans-serif;';
  document.body.appendChild(el);
  return el;
}

// Mount a legacy slide module at a build, as the engine mounts it for a
// direct entry: render, then onEnter with the target build (which arms the
// reconstruction snap so nothing transitions), then buildStep. The settled
// frame is the deck's own direct-entry frame for that build.
function mount(st, mod, build) {
  mod.render(st);
  mod.onEnter({ targetBuildStep: build, container: st });
  mod.buildStep(build);
  cleanup.push(() => mod.onExit?.({ container: st }));
  return st;
}

// The homecoming: the film's own Act I stage at Scene 4's approved state.
// `build` is Scene 4's build index — 3 is s4-b4-b, the saved frame: the claim
// resting on the save road, the terminal dissolved, the road drawing on into
// black (`_exchangeStage.js` STATES['spend-or-save'][3]).
function homecoming(st, build) {
  const act1 = ensureStage(st);
  act1.applyState('spend-or-save', build);
  cleanup.push(() => destroyStage(st));
  return st;
}

// ---- the probes: is the still showing the state the cell claims? ----------
//
// `expect` on a cell is a list of [selector, count]: the number of elements
// matching the selector that are actually shown — present, not display:none,
// not visibility:hidden, and with no ancestor up to the stage at opacity
// below 0.05. The capture records got-vs-expected per cell; the checks gate it.

function isShown(el, root) {
  let node = el;
  while (node && node !== root) {
    const cs = getComputedStyle(node);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.05) return false;
    node = node.parentElement;
  }
  return true;
}

export function probe(id) {
  const c = CELLS[id];
  const root = document.getElementById(STAGE_ID);
  const results = (c.expect || []).map(([sel, n]) => {
    const got = [...root.querySelectorAll(sel)].filter((el) => isShown(el, root)).length;
    return { sel, expected: n, got, ok: got === n };
  });
  const extra = {};
  if (c.act1) extra.act1 = window.__act1 ? window.__act1.state() : null;
  const disc = root.querySelector('.s4-claim-object__disc, .luminous-disc');
  if (disc) extra.discSize = disc.style.getPropertyValue('--disc-size') || getComputedStyle(disc).getPropertyValue('--disc-size').trim();
  return { results, ok: results.every((r) => r.ok), ...extra };
}

// ============================================================ SCENE 16 (8 beats)
//
// The return to the open exchange — the homecoming (F1), the definition (F3),
// the claim and its carrier (F4 · F5 · F6). The ruled map's Row 3 (A) closes
// the scene on 4-06's four beats, the crescendo included.

cell('s16-b1', {
  scene: 'S16', beat: 1, frame: 'S16-F1', klass: 'PORT', review: 'approved-as-rendered', act1: true,
  source: 'the film’s own Scene 4 — the approved s4-b4-b (review/gate-2/states/states.json approvedSetCurrent), rebuilt by the Act I stage’s own state law: _exchangeStage.js applyState(\'spend-or-save\', 3)',
  caption: 'Beat 1 · the homecoming: the Scene 4 frame reconstructs exactly as the viewer left it at the save — the claim resting on the save road at (1530, 630), the terminal dissolved, the road drawing on into black, the spend road subdued on the left. The return line and your join are spoken over it: “We left this exchange open. What has to survive until we close it? The surgeon is still holding the claim he accepted that day…” Built by the Act I stage’s own applyState, so the still is the approved s4-b4-b by construction — nothing here is drawn by this sheet.',
  flag: 'The entry seam, rendered once as the map asks (§4 seam 1). Three wiring readings stand here, each one word to change. First, the whole fork returns at rest — the approved s4-b4-b entire, both roads — rather than the save road with the held claim alone. Second, the pair beneath it (s4-b5-b’s “Spending closes the exchange. / Saving keeps it open.”) does not return, and no words are put on the frame: the return line is spoken, and no legacy treatment carries it on screen. Third, “everything recedes but the claim” is the gesture into beat 2, not a settled state — the roads dissolve and the disc travels to the fork’s apex as the definition lands. The register needs no shift: this frame is already black, white and the accent.',
  expect: [['.act1-stage .luminous-disc', 1], ['.act1-stage svg path', 2]]
}, (st) => homecoming(st, 3));

cell('s16-b2', {
  scene: 'S16', beat: 2, frame: 'S16-F3', klass: 'PORT', review: 'approved-as-rendered',
  source: '4-04-unfinished-exchange, build 3 — the scene gone, the headline risen to the middle lane, the claim released to center at 116',
  caption: 'Beat 2 · the definition lands at display scale over the released claim: AN EARNED, TRANSFERABLE / CLAIM ON VALUE — two stacked lines at 68px with the claim in the accent, master §5 rule 11’s own reference frame — and beneath the words the disc at (960, 470), which is the apex of Scene 4’s fork, the very point the claim rose to before it took the save road. The exchange scene is gone; only the claim and its name remain. Spoken: “Money is an earned, transferable claim on value…”',
  flag: 'The legacy lands this sentence twice — first low, under the still-present exchange (its build 2), then risen into the middle as the scene leaves (build 3). In the film the scene that leaves is Scene 4’s fork, and it recedes during beat 1, so this beat stands at the legacy’s build-3 composition. If you want the definition to land low first, under the receded fork, that is one word. The disc’s travel from its rest on the save road (1530, 630) to the apex (960, 470), and its size here (the legacy’s 116; 176 at beat 4), are wiring.',
  expect: [['.s4-unfinished__headline[data-visible="true"][data-lane="mid"]', 1], ['.s4-unfinished__headline[data-quiet="true"]', 0],
    ['.s4-unfinished__claim-stage[data-position="released"] .s4-claim-object[data-visible="true"]', 1], ['.s4-exchange__node', 0], ['.s4-unfinished__want', 0]]
}, (st) => mount(st, s404, 3));

cell('s16-b3', {
  scene: 'S16', beat: 3, frame: 'S16-F3', klass: 'PORT', review: 'approved-as-rendered',
  source: '4-04-unfinished-exchange, build 3 — held; the legacy speaks its third beat over this composition',
  caption: 'Beat 3 · the social claim: the frame holds — the definition at full voice over the released claim — while the spoken word does the enlarging: not a legal claim on anyone in particular, a social claim on everyone in general, enforced by acceptance; and 1971 seen properly. The legacy speaks this beat over the same composition it landed the definition on.',
  flag: 'This still is beat 2’s frame, held. The legacy 4-04 has one state fewer here than the film has beats, because its build 2 — the definition low under the exchange scene — retired with that scene. Rung 4 of the enlargement therefore lands in the spoken word alone. A landed line for the social claim would be a NEW element, and the ruled map names none; if you want one, that is a ruling, not a wiring change.',
  expect: [['.s4-unfinished__headline[data-visible="true"][data-lane="mid"]', 1], ['.s4-unfinished__headline[data-quiet="true"]', 0],
    ['.s4-unfinished__claim-stage[data-position="released"] .s4-claim-object[data-visible="true"]', 1]]
}, (st) => mount(st, s404, 3));

cell('s16-b4', {
  scene: 'S16', beat: 4, frame: 'S16-F3', klass: 'PORT', review: 'approved-port',
  source: '4-04-unfinished-exchange, build 4 — the claim at 176, the headline’s data-quiet settle',
  caption: 'Beat 4 · the recognition: the claim takes the frame — the disc released to 176 at center, the definition settling to the dimmed-prior step beneath it (the legacy’s own data-quiet settle) — as the words land: “That’s what those eighty thousand hours become. That’s what you’ve been holding your whole life without a name for it. The exchange is still open.”',
  expect: [['.s4-unfinished__headline[data-visible="true"][data-quiet="true"]', 1],
    ['.s4-unfinished__claim-stage[data-position="released"] .s4-claim-object[data-visible="true"]', 1]]
}, (st) => mount(st, s404, 4));

cell('s16-b5', {
  scene: 'S16', beat: 5, frame: 'S16-F4', klass: 'PORT', review: 'approved-as-rendered',
  source: '4-06-claim-and-carrier, build 1 — it needs a body',
  caption: 'Beat 5 · the claim needs a body: 4-06’s opening statement lands — The claim on value is the essence of money. — with the body line beneath it: But an abstract claim still needs a body — something capable of carrying it across people, places and time. The claim stands alone at the carrier stage’s center; no shell yet.',
  flag: 'From beat 4’s released disc (176, at the fork’s apex) to 4-06’s claim inside the carrier stage (the ClaimObject’s own 116 at the scene’s center) is a re-centering and a scale change the map records as wiring (§0: the disc’s scale at the homecoming against its Section 4 scale inside the shell). One number places it; nothing about the object changes — it is the same drawn disc.',
  expect: [['.s4-claim-carrier__statement--essence[data-visible="true"]', 1], ['.s4-claim-carrier__statement--body[data-visible="true"]', 1],
    ['.s4-carrier-shell[data-visible="true"]', 0], ['.s4-claim-carrier__claim[data-visible="true"]', 1]]
}, (st) => mount(st, s406, 1));

cell('s16-b6', {
  scene: 'S16', beat: 6, frame: 'S16-F4', klass: 'PORT', review: 'approved-as-rendered',
  source: '4-06-claim-and-carrier, build 2 — the split, and the whole record reorganized into carriers',
  caption: 'Beat 6 · the split: THE MONETARY MEDIUM / THE CARRIER lands, the banded-wall shell closes around the claim (construction C, R7.2), the five-carrier lineage stands beneath in the dark-field register — SHELLS · GOLD · PAPER · BANK LEDGERS · BITCOIN at 150 × 112, all five renders in the shipping set — and the final statement: The claim is the essence. The monetary asset is the carrier.',
  flag: 'The BITCOIN position in the lineage carries a photograph of a physical coin — the legacy source’s own V-1 flag (a photograph of an object the script denies), restored by your R7.2 ruling and carried here as ruled (map §4 seam 6). One word in the source’s carrier table returns it to the grammar mark; the other four positions are unaffected.',
  expect: [['.s4-claim-carrier__carrier-title[data-visible="true"]', 1], ['.s4-carrier-shell[data-visible="true"]', 1],
    ['.s4-claim-carrier__lineage[data-visible="true"] .s4-claim-carrier__lineage-item .df[data-pending="false"]', 5],
    ['.s4-claim-carrier__final[data-visible="true"]', 1]]
}, (st) => mount(st, s406, 2));

cell('s16-b7', {
  scene: 'S16', beat: 7, frame: 'S16-F5', klass: 'PORT', review: 'approved-port',
  source: '4-06-claim-and-carrier, build 3 — the bodies recede and the claim does not',
  caption: 'Beat 7 · the crescendo: the bodies recede and the claim does not — the lineage and the carrier title settle to the quiet step, the shell stays, and the statement stands: The claim is the essence. The monetary asset is the carrier. Over it you speak the protected line, verbatim and verified: you cannot print money — you can only print the units it comes in, and every unit printed drains the ones already earned. Nothing new lands on the frame; the sentence is spoken.',
  expect: [['.s4-claim-carrier__lineage[data-visible="true"][data-quiet="true"]', 1], ['.s4-claim-carrier__carrier-title[data-quiet="true"]', 1],
    ['.s4-claim-carrier__final[data-visible="true"]', 1], ['.s4-carrier-shell[data-visible="true"]', 1]]
}, (st) => mount(st, s406, 3));

cell('s16-b8', {
  scene: 'S16', beat: 8, frame: 'S16-F6', klass: 'PORT', review: 'approved-port',
  source: '4-06-claim-and-carrier, build 4 — one carrier, one claim, and the question',
  caption: 'Beat 8 · one carrier, one claim, and the question: the lineage is gone, the shell takes its future focus — the trailing wall dims, the leading wall brightens, the carrier facing forward through time — and the statement holds. “Which carrier can transport an unredeemed claim most faithfully through time?” Scene 17 opens by answering.',
  expect: [['.s4-claim-carrier__lineage[data-visible="true"]', 0], ['.s4-carrier-shell[data-visible="true"][data-focus="future"]', 1],
    ['.s4-claim-carrier__final[data-visible="true"]', 1]]
}, (st) => mount(st, s406, 4));

// ============================================================ SCENE 17 (5 beats)

cell('s17-b1', {
  scene: 'S17', beat: 1, frame: 'S17-F1', klass: 'PORT', review: 'approved-port',
  source: '4-07-store-of-value-function, build 1',
  caption: 'Beat 1 · the question: What must the carrier actually preserve? lands over the claim in its shell at the NOW position — the composition 4-06 handed over, the carrier inherited.',
  expect: [['.s4-store-function__question[data-visible="true"]', 1], ['.s4-store-function__time[data-visible="true"]', 0], ['.s4-carrier-shell[data-visible="true"]', 1]]
}, (st) => mount(st, s407, 1));

cell('s17-b2', {
  scene: 'S17', beat: 2, frame: 'S17-F1', klass: 'PORT', review: 'approved-port',
  source: '4-07-store-of-value-function, build 2',
  caption: 'Beat 2 · the claim has to cross time: the drawn path appears — NOW → LATER, one stroke with its arrowhead — and the carrier steps from now to later along it. A stone survives a century; it carries nothing.',
  expect: [['.s4-store-function__time[data-visible="true"]', 1], ['.s4-store-function__scene[data-position="later"]', 1], ['.s4-store-function__measure--purchasing-power[data-visible="true"]', 0]]
}, (st) => mount(st, s407, 2));

cell('s17-b3', {
  scene: 'S17', beat: 3, frame: 'S17-F1', klass: 'PORT', review: 'approved-port',
  source: '4-07-store-of-value-function, build 3',
  caption: 'Beat 3 · PURCHASING POWER lands as the first measure — The claim can still command real value later. — and the claim inside the shell takes its focus. The qualification is spoken: not freezing every relative price, not guaranteeing a basket forever.',
  expect: [['.s4-store-function__measure--purchasing-power[data-visible="true"]', 1], ['.s4-store-function__measure--redeemability[data-visible="true"]', 0]]
}, (st) => mount(st, s407, 3));

cell('s17-b4', {
  scene: 'S17', beat: 4, frame: 'S17-F1', klass: 'PORT', review: 'approved-port',
  source: '4-07-store-of-value-function, build 4',
  caption: 'Beat 4 · REDEEMABILITY lands as the second measure — The future holder can still exercise it. — and the shell takes its future focus, the carrier facing forward. A claim you cannot exercise is not a store of value; it is a souvenir.',
  expect: [['.s4-store-function__measure--redeemability[data-visible="true"]', 1], ['.s4-carrier-shell[data-visible="true"][data-focus="future"]', 1], ['.s4-store-function__definition[data-visible="true"]', 0]]
}, (st) => mount(st, s407, 4));

cell('s17-b5', {
  scene: 'S17', beat: 5, frame: 'S17-F2', klass: 'PORT', review: 'approved-port',
  source: '4-07-store-of-value-function, build 5',
  caption: 'Beat 5 · the definition, three lines with its two bold terms: A store of value is a monetary carrier that preserves the purchasing power of an unredeemed claim and keeps that claim redeemable through time. The question, the path and the two measures settle to the quiet step beneath it — the legacy’s own settle. Spoken with the ledger’s one substitution: “the definition we will use from here”.',
  expect: [['.s4-store-function__definition[data-visible="true"]', 1], ['.s4-store-function__question[data-quiet="true"]', 1], ['.s4-store-function__measure[data-quiet="true"]', 2]]
}, (st) => mount(st, s407, 5));

// ============================================================ SCENE 18 (8 beats)

cell('s18-b1', {
  scene: 'S18', beat: 1, frame: 'S18-F1', klass: 'PORT', review: 'approved-port',
  source: '4-08-100-year-test, build 1 — the experiment stated in full',
  caption: 'Beat 1 · the experiment stated — four statements as one block, arriving in reading order inside one gesture (the R7 ruling in the source): You earn the claim today. You choose not to redeem it. You pass it forward. Your descendants receive it in 2126. The carrier waits at the start.',
  expect: [['.s4-century-test__statement[data-visible="true"]', 4], ['.s4-century-test__timeline[data-visible="true"]', 0], ['.s4-century-test__scene[data-position="start"]', 1]]
}, (st) => mount(st, s408, 1));

cell('s18-b2', {
  scene: 'S18', beat: 2, frame: 'S18-F2', klass: 'PORT', review: 'approved-port',
  source: '4-08-100-year-test, build 2 — the century, and the carrier setting out into it',
  caption: 'Beat 2 · the century: the timeline draws — 2026 at the left, 100 YEARS over the span, 2126 at the right — and the carrier sets out into it, mid-travel. The protected sentence is spoken here, verbatim: one hundred years — long enough that you’re not allowed to assume any company, any arrangement, any government survives it. That’s the point of the number.',
  expect: [['.s4-century-test__timeline[data-visible="true"][data-progress="middle"]', 1], ['.s4-century-test__scene[data-position="middle"]', 1], ['.s4-century-test__statement[data-visible="true"]', 0]]
}, (st) => mount(st, s408, 2));

cell('s18-b3', {
  scene: 'S18', beat: 3, frame: 'S18-F2', klass: 'PORT', review: 'approved-port',
  source: '4-08-100-year-test, build 3 — arrival in 2126',
  caption: 'Beat 3 · arrival: the travel stroke reaches 2126 and the carrier arrives at the end and holds. The x-ray sentence is spoken over it: an unredeemed purchasing-power claim — the open half of an exchange, waiting a century to close — so the question becomes precise.',
  expect: [['.s4-century-test__timeline[data-visible="true"][data-progress="end"][data-held="true"]', 1], ['.s4-century-test__scene[data-position="end"]', 1]]
}, (st) => mount(st, s408, 3));

cell('s18-b4', {
  scene: 'S18', beat: 4, frame: 'S18-F3', klass: 'PORT', review: 'approved-port',
  source: '4-09-future-is-unknowable, build 1 — the known and the unknown (its build 0 is 4-08’s last state, the merge mechanical)',
  caption: 'Beat 4 · we know the date, not the world: 4-09’s frame — 2126 large behind the scene, the pair We know the date. / We do not know the world. — with the carrier still standing at its arrival. The merge is the architecture’s: 4-09’s own build 0 is 4-08’s last state, so nothing bridges the two slides but the advance.',
  expect: [['.s4-future-unknown__opening[data-visible="true"]', 1], ['.s4-future-unknown__pair[data-visible="true"]', 0], ['.s4-future-unknown__final[data-visible="true"]', 0]]
}, (st) => mount(st, s409, 1));

cell('s18-b5', {
  scene: 'S18', beat: 5, frame: 'S18-F4', klass: 'PORT', review: 'approved-port',
  source: '4-09-future-is-unknowable, build 2',
  caption: 'Beat 5 · the first pair of unknowns: WHERE WILL THEY LIVE? / WHAT WILL THEY WANT? — the opening pair settles to the quiet step above it.',
  expect: [['.s4-future-unknown__pair[data-pair="0"][data-visible="true"]', 1], ['.s4-future-unknown__pair[data-visible="true"]', 1], ['.s4-future-unknown__opening[data-visible="true"][data-quiet="true"]', 1]]
}, (st) => mount(st, s409, 2));

cell('s18-b6', {
  scene: 'S18', beat: 6, frame: 'S18-F4', klass: 'PORT', review: 'approved-port',
  source: '4-09-future-is-unknowable, build 3',
  caption: 'Beat 6 · the second pair: WHICH GOVERNMENTS WILL EXIST? / WHICH INSTITUTIONS WILL SURVIVE? — a century ago the list of institutions that felt permanent was long, and most of it is gone.',
  expect: [['.s4-future-unknown__pair[data-pair="1"][data-visible="true"]', 1], ['.s4-future-unknown__pair[data-visible="true"]', 1]]
}, (st) => mount(st, s409, 3));

cell('s18-b7', {
  scene: 'S18', beat: 7, frame: 'S18-F4', klass: 'PORT', review: 'approved-port',
  source: '4-09-future-is-unknowable, build 4',
  caption: 'Beat 7 · the third pair: WHICH TECHNOLOGIES WILL DOMINATE? / WHICH RULES WILL APPLY? — which is a polite way of saying we don’t know what will be legal.',
  expect: [['.s4-future-unknown__pair[data-pair="2"][data-visible="true"]', 1], ['.s4-future-unknown__pair[data-visible="true"]', 1]]
}, (st) => mount(st, s409, 4));

cell('s18-b8', {
  scene: 'S18', beat: 8, frame: 'S18-F5', klass: 'PORT', review: 'approved-port',
  source: '4-09-future-is-unknowable, build 5 — the governing question, the scene quiet',
  caption: 'Beat 8 · the governing question at statement scale, the scene quiet beneath it: What properties give this claim the best chance of reaching 2126 with its purchasing power intact? The carrier recedes with the scene; the question holds the frame — and you say you don’t answer it by starting with the properties.',
  expect: [['.s4-future-unknown__final[data-visible="true"]', 1], ['.s4-future-unknown__scene[data-quiet="true"]', 1], ['.s4-future-unknown__pair[data-visible="true"]', 0]]
}, (st) => mount(st, s409, 5));

// ============================================================ SCENE 19 (2 beats)

cell('s19-b1', {
  scene: 'S19', beat: 1, frame: 'S19-F1', klass: 'ADAPT', review: 'approved-ruled',
  source: '4-10-invert-the-question, build 1 — the inversion replaces the direct framing; the stress stage’s carrier keyed to build 2 at the source (the one ruled change, 3 Sep 2026)',
  caption: 'Beat 1 · the inversion: ASK INSTEAD: / How could the carrier fail? — the inverted framing alone on the frame, having replaced the direct one, and no carrier on stage. Munger’s line is spoken: invert, always invert.',
  ruling: 'RULED 3 September 2026 (the Batch D implementation brief §1.1, master §13): beat 1 is the inverted framing alone — no carrier on stage. The change is made at the source — legacy 4-10 keys the stress stage’s carrier to build 2 — and S19-F1 is ADAPT in the ruled map, the one change named. The flag this cell carried (4-10’s build 0, the direct framing under the governing question, has no spoken advance of its own; the sheet stood the settled state) is answered by the same ruling: the movement is wiring, and the implementation plays the legacy’s own sequence — the direct framing under the question, then the inverted replacing it — as this beat’s gesture.',
  expect: [['.s4-inversion__framing--inverted[data-visible="true"]', 1], ['.s4-inversion__framing--direct[data-visible="true"]', 0], ['.s4-inversion__governing[data-visible="true"]', 0],
    ['.s4-stress-stage .s4-carrier-shell[data-visible="true"]', 0], ['.s4-stress-stage .s4-claim-object[data-visible="true"]', 0]]
}, (st) => mount(st, s410, 1));

cell('s19-b2', {
  scene: 'S19', beat: 2, frame: 'S19-F2', klass: 'PORT', review: 'approved-ruled',
  source: '4-10-invert-the-question, build 2 + CarrierStressStage (the corner frame deleted at R7.4 §D.1); the carrier arriving on this beat since 3 Sep 2026',
  caption: 'Beat 2 · the carrier on the bench: the claim in its shell arrives on the stress stage with no corner frame — R7.4 §D.1 deleted the four brackets and the component renders nothing for them, so the architecture’s “no corner frame” is already true of the source. It arrives on its word: “Let’s put a carrier on the bench and try to break it.”',
  ruling: 'RULED 3 September 2026 (the Batch D implementation brief §1.1, master §13): the carrier arrives at beat 2, timed to “let’s put a carrier on the bench and try to break it.” The flag this cell carried — the two beats shared one still since R7.4 deleted the corner brackets — is closed by the ruling: the frame is unchanged, and its arrival (the claim’s and the shell’s own reveals) is now the beat’s gesture. The beats are no longer identical stills.',
  expect: [['.s4-stress-stage .s4-carrier-shell[data-visible="true"]', 1], ['.s4-stress-stage .s4-claim-object[data-visible="true"]', 1], ['.s4-inversion__framing--inverted[data-visible="true"]', 1], ['.s4-stress-stage[data-frame-visible="true"]', 1]]
}, (st) => mount(st, s410, 2));

// ============================================================ SCENES 20–21 (5 + 5)

const FAILURES_I = [
  ['01 DILUTED', 'Additional carrier units can dilute the claim embodied in existing units.'],
  ['02 INDIVISIBLE', 'The carrier cannot be divided into the quantities required for exchange.'],
  ['03 ILLIQUID', 'It cannot be exchanged reliably without delay, friction or significant loss.'],
  ['04 TRAPPED', 'It cannot move freely across distance or jurisdiction.'],
  ['05 COSTLY TO HOLD', 'Storage, maintenance or administration consume the claim over time.']
];
const FAILURES_II = [
  ['06 CONTROLLED', 'An external party can alter access, ownership or the governing rules.'],
  ['07 DEGRADED', 'The carrier can decay or fail before the claim is redeemed.'],
  ['08 UNVERIFIABLE', 'Authenticity, ownership or supply cannot be established confidently.'],
  ['09 NON-FUNGIBLE', 'Equal units can be treated differently because of their history or condition.'],
  ['10 UNTESTED', 'There is insufficient evidence across crises, technologies and changing regimes.']
];

FAILURES_I.forEach(([name, explanation], i) => {
  const n = i + 1;
  cell(`s20-b${n}`, {
    scene: 'S20', beat: n, frame: 'S20-F1', klass: 'PORT', review: 'approved-port',
    source: `4-11-carrier-failures-i, build ${n} + FailureRows + FIRST_FAILURE_GROUP (frozen data)`,
    caption: `Beat ${n} · the failure index, one typographic row per advance: ${name} — ${explanation}${n === 1 ? ' The number, the failure, the explanation; nothing else on the frame.' : ''}${n === 5 ? ' Five rows stand; five more follow, and the second five do the most damage.' : ''}`,
    expect: [['.s4-failure-list__row[data-visible="true"]', n]]
  }, (st) => mount(st, s411, n));
});

FAILURES_II.forEach(([name, explanation], i) => {
  const n = i + 1;
  cell(`s21-b${n}`, {
    scene: 'S21', beat: n, frame: 'S21-F1', klass: 'PORT', review: 'approved-port',
    source: `4-12-carrier-failures-ii, build ${n} + FailureRows + SECOND_FAILURE_GROUP (frozen data)`,
    caption: `Beat ${n} · the second index: ${name} — ${explanation}${n === 5 ? ' Ten distinct ways to fail; now watch what happens when you turn them around.' : ''}`,
    expect: [['.s4-failure-list__row[data-visible="true"]', n]]
  }, (st) => mount(st, s412, n));
});

// ============================================================ SCENE 22 (3 beats — ruled 3 Sep 2026)

cell('s22-b1', {
  scene: 'S22', beat: 1, frame: 'S22-F1', klass: 'PORT', review: 'approved-as-rendered',
  source: '4-13-failure-to-requirement, build 1 — the first sweep',
  caption: 'Beat 1 · the first sweep: the ten failures stand in the mapping grid under the line Invert each failure. The properties emerge., and the first five turn around — DILUTED → NO SUPPLY INFLATION, INDIVISIBLE → DIVISIBILITY, ILLIQUID → LIQUIDITY, TRAPPED → PORTABILITY, COSTLY TO HOLD → NO CARRYING COSTS — while the second five still stand unmapped.',
  flag: '4-13’s build 0 — all ten failures standing in the grid, none yet mapped — is the composition this beat’s sweep starts from, and it has no advance of its own in the merged act: Scene 21’s completed index gives way to the grid as this beat’s first movement, and the sweep follows. Wiring, flagged. (The count is as you ruled it: three compositions across four advances.)',
  expect: [['.s4-mapping__row[data-mapped="true"]', 5], ['.s4-mapping__row', 10], ['.s4-mapping__main', 1]]
}, (st) => mount(st, s413, 1));

cell('s22-b2', {
  scene: 'S22', beat: 2, frame: 'S22-F1', klass: 'PORT', review: 'approved-port',
  source: '4-13-failure-to-requirement, build 2 — the second sweep',
  caption: 'Beat 2 · the second sweep: the second five turn around — CONTROLLED → RESISTANCE TO CONTROL, DEGRADED → DURABILITY, UNVERIFIABLE → VERIFIABILITY, NON-FUNGIBLE → FUNGIBILITY, UNTESTED → TRACK RECORD. Each one a failure with a minus sign in front of it: I did not choose these.',
  expect: [['.s4-mapping__row[data-mapped="true"]', 10]]
}, (st) => mount(st, s413, 2));

cell('s22-b3', {
  scene: 'S22', beat: 3, frame: 'S22-F2', klass: 'ADAPT', review: 'approved-ruled',
  source: '4-14-ten-properties, build 2 — the complete two-column list, the legacy’s own last state; the film lands it in one advance (the one ruled change, 3 Sep 2026)',
  caption: 'Beat 3 · the ten properties, all landing in one advance as the two numbered columns — 01 NO SUPPLY INFLATION · 02 DIVISIBILITY · 03 LIQUIDITY · 04 PORTABILITY · 05 NO CARRYING COSTS · 06 RESISTANCE TO CONTROL · 07 DURABILITY · 08 VERIFIABILITY · 09 FUNGIBILITY · 10 TRACK RECORD — each a question you can put to anything that claims to be money. Ten criteria — derived, not chosen. Now let’s point them at something.',
  ruling: 'RULED 3 September 2026 (the Batch D implementation brief §1.2, master §13): Scene 22 merges its list beats — all ten properties land in one advance; the two paragraphs merge at zero word changes, one [→] removed; S22 = 3, the act = 42. This cell is the merged beat’s settled state — legacy 4-14’s complete list, its own last state — and S22-F2 is ADAPT in the ruled map, the one change named: the landing as one gesture, at Scene 22’s build (Session 2). The five-row cell this beat used to be leaves the record, and the flag it carried (the grid giving way to the list with no legacy morph between them) is answered the same way — the composition change is Scene 22’s wiring.',
  expect: [['.s4-properties__row[data-visible="true"]', 10], ['.s4-properties__column--right .s4-properties__row[data-visible="true"]', 5]]
}, (st) => mount(st, s414, 2));

// ============================================================ SCENE 23 (6 beats)

cell('s23-b1', {
  scene: 'S23', beat: 1, frame: 'S23-F1', klass: 'PORT', review: 'approved-port',
  source: '4-15-framework-to-comparison, build 1 — the monetary candidates (Row 1 ruled A: the lineup ports whole)',
  caption: 'Beat 1 · the three monetary candidates under the question — How well can each asset carry purchasing power through time? — GOLD · FIAT · BITCOIN at display scale in the dark-field register under MONETARY ASSETS, as the holding assumptions are spoken: bullion held directly, a major currency in ordinary forms, native BTC in self-custody.',
  expect: [['.s4-candidates__asset[data-visible="true"]', 3], ['.s4-candidates__group--monetary[data-visible="true"]', 1], ['.s4-candidates__divider[data-visible="true"]', 0], ['.s4-candidates__asset[data-visible="true"] .df[data-pending="false"]', 3]]
}, (st) => mount(st, s415, 1));

cell('s23-b2', {
  scene: 'S23', beat: 2, frame: 'S23-F1', klass: 'PORT', review: 'approved-port',
  source: '4-15-framework-to-comparison, build 2 — the productive ones',
  caption: 'Beat 2 · the two productive assets join — REAL ESTATE · SHARES under PRODUCTIVE ASSETS, the divider between the two families. Five candidates, all five renders in the shipping set; people use all five to carry purchasing power through time, which is the only job being scored.',
  expect: [['.s4-candidates__asset[data-visible="true"]', 5], ['.s4-candidates__group[data-visible="true"]', 2], ['.s4-candidates__divider[data-visible="true"]', 1], ['.s4-candidates__asset[data-visible="true"] .df[data-pending="false"]', 5]]
}, (st) => mount(st, s415, 2));

cell('s23-b3', {
  scene: 'S23', beat: 3, frame: 'S23-F1', klass: 'PORT', review: 'approved-port',
  source: '4-15-framework-to-comparison, build 3 — the five settle into one candidate set',
  caption: 'Beat 3 · the five settle into one candidate set — the stage’s settled state — as you answer why these five, why Bitcoin is the only digital candidate (the palladium logic, applied internally), and the frontier: structure, not prophecy.',
  expect: [['.s4-candidates__stage[data-settled="true"]', 1], ['.s4-candidates__asset[data-visible="true"]', 5]]
}, (st) => mount(st, s415, 3));

cell('s23-b4', {
  scene: 'S23', beat: 4, frame: 'S23-F1', klass: 'PORT', review: 'approved-port',
  source: '4-15-framework-to-comparison, build 4 — the question recedes',
  caption: 'Beat 4 · the question recedes and the candidates hold the frame alone — the legacy’s own last frame before the table, as the honesty line is spoken: the framework makes the trade-offs explicit; the scores stay judgments.',
  expect: [['.s4-candidates[data-answered="true"]', 1], ['.s4-candidates__asset[data-visible="true"]', 5]]
}, (st) => mount(st, s415, 4));

cell('s23-b5', {
  scene: 'S23', beat: 5, frame: 'S23-F2', klass: 'ADAPT', review: 'approved-ruled',
  source: '4-16-the-comparison, build 1 — all fifty scores on one advance (R7.4 §D.3) + AssetComparisonTable + DotRating + COMPARISON_ROWS (frozen); the header band at the source since the Acts III–IV final ruling 2 (3 Sep 2026), at its ruled 100 box and the legacy row pitch since the fit ruling (4 Sep 2026)',
  caption: 'Beat 5 · the table — THE COMPARISON in the quiet kicker register; the five candidates as renders in a band above the table in the ruled 100 box (gold, the fiat note, the coin, the house, and shares, bottom-aligned on one baseline, each over its own column); beneath it the grammar untouched at its legacy pitch — MONETARY ASSETS · PRODUCTIVE ASSETS, PROPERTY, the five labels, ten rows — and ALL FIFTY SCORES LANDING AT ONCE — the frozen data, blob-proven, walked in the spoken word. No total, no winner badge, no highlight. The closing line is not yet on the frame.',
  ruling: 'RULED 3 September 2026 (the Act V kickoff brief, Part A §2, master §13): the table’s headers become renders — the five candidate glyphs retire, the renders ride as a header band above the table at lineup scale per the rails law, the drawn grammar beneath untouched; the group labels and the kicker stay as approved; the fifty-score landing is unchanged. S23-F2 is ADAPT. The change is at the source (legacy 4-16, the table component); this cell mounts the module and carries it. The band’s fit, flagged at that session (at the rails-law box the band did not fit above the table with the closing line at its held position unless the ten score rows tightened to 48), was RULED 4 September 2026 (master §13): the score rows return to the legacy 60 px pitch — the scores keep their proven geometry — and the band shrinks to a 100 × 100 contain box, a ruled departure from the rails law’s 188 box for this one surface; the heading row stays at its label. This cell re-rendered again on that authority and is re-proven in the deck (review/act-5/landed-proof-s23-band.json). The kicker-to-table stack is no longer tight — the band sits between them. One thing to see at the viewing: at the 100 box the fiat note reads small, by the register’s own framing of that render.',
  expect: [['.s4-dot-rating[data-revealed="true"]', 50], ['.s4-comparison__final[data-visible="true"]', 0], ['.s4-comparison-table__property', 10],
    ['.s4-comparison__band .df[data-pending="false"]', 5], ['.s4-comparison-table__asset-heading .s4-comparison-asset__mark', 0], ['.s4-comparison-table__asset-heading .s4-comparison-asset__label', 5]]
}, (st) => mount(st, s416, 1));

cell('s23-b6', {
  scene: 'S23', beat: 6, frame: 'S23-F3', klass: 'PORT', review: 'approved-ruled',
  source: '4-16-the-comparison, build 2 — the line; the header band at the source since the Acts III–IV final ruling 2 (3 Sep 2026), at its ruled 100 box and the legacy row pitch since the fit ruling (4 Sep 2026)',
  caption: 'Beat 6 · the closing line: Don’t trust. Verify. — two spans, on stage exactly once in the film, beneath the fifty scores, the render band standing above the table. The scores are dated in the spoken word: my judgments, as of 2026; every one of them an invitation. The act ends on the turn to where monetary demand goes.',
  ruling: 'RULED 3 September 2026 (the Act V kickoff brief, Part A §2, master §13): the table’s headers become renders — this cell re-renders on the ruling’s authority, the closing line at its held position (930) beneath the table; the line itself is untouched (S23-F3 stays PORT). RULED AGAIN 4 September 2026 (the fit ruling, master §13): the table stands at its legacy 60 px pitch beneath the band’s 100 box, its last row ending at 911 under the line’s 930; this cell re-rendered a second time on that authority and is re-proven in the deck. The flag this cell carried — the tight kicker-to-table stack, an accepted legacy fact — is overtaken by the band, which now sits between the kicker and the group labels.',
  expect: [['.s4-comparison__final[data-visible="true"]', 1], ['.s4-dot-rating[data-revealed="true"]', 50],
    ['.s4-comparison__band .df[data-pending="false"]', 5], ['.s4-comparison-table__asset-heading .s4-comparison-asset__mark', 0]]
}, (st) => mount(st, s416, 2));

// ---- runtime ---------------------------------------------------------------

export const CELL_IDS = Object.keys(CELLS);

export function buildCell(id) {
  const c = CELLS[id];
  if (!c) throw new Error(`no cell builder for "${id}"`);
  const st = stage();
  c.build(st);
  return id;
}

export function cellMeta() {
  return Object.fromEntries(Object.keys(CELLS).map((id) => {
    const { build, ...meta } = CELLS[id];
    return [id, meta];
  }));
}

export function teardown() {
  cleanup.forEach((fn) => { try { fn(); } catch { /* torn down with the DOM */ } });
  cleanup = [];
  const prev = document.getElementById(STAGE_ID);
  if (prev) prev.remove();
}

export default buildCell;
