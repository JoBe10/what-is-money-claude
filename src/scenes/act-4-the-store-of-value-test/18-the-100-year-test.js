// Scene 18 — The 100-Year Test (8 beats; the unknowable future merged in).
//
// Legacy 4-08 and 4-09, re-homed in the architecture's merge: the experiment
// stated — four statements as one block, arriving in reading order inside
// one gesture (the R7 ruling in the source); the century — 2026 → 2126, the
// carrier setting out into it and arriving at the end, held; then 4-09's
// world — we know the date, not the world; the three uncertainty pairs, one
// per advance; the governing question at statement scale with the scene
// quiet. 4-09's own build 0 is 4-08's last state, so the merge inside the
// scene is the legacy deck's own boundary — the crossfade, then the
// opening pair's own landing — and nothing bridges the two slides but the
// advance. Every beat is the legacy module's own live advance.
//
// The hundred-year sentence is protected (master §9.5) and spoken at beat 2
// over the century drawing itself; nothing before this scene speaks its
// phrase (the virginity check, review/act-4/script-install.json).
//
// Landed states — the approved cells s18-b1 … s18-b8, by construction.

import { makeSceneModule } from './_sceneModule.js';
import { legacyAdvance, legacyBoundary, legacyEntry } from './_testStage.js';

const ID = 'the-100-year-test';

const entry = legacyEntry(ID, 's408', 1.8);
const morphIn = legacyBoundary(ID, 0, 's407', 's408', 2.1);

const transitions = {
  // beat 2 — the century: the timeline draws and the carrier sets out into
  // it (4-08 build 2).
  1: legacyAdvance(ID, 1, 's408', 2, 1.4),
  // beat 3 — arrival: the travel reaches 2126 and the carrier holds (build 3).
  2: legacyAdvance(ID, 2, 's408', 3, 1.4),
  // beat 4 — we know the date, not the world: 4-09's frame, entered as the
  // legacy entered it — the crossfade onto its build 0 (4-08's last state),
  // then the opening pair's own landing (build 1).
  3: legacyBoundary(ID, 3, 's408', 's409', 1.2),
  // beats 5–7 — the unknowns, one pair per advance (4-09 builds 2–4).
  4: legacyAdvance(ID, 4, 's409', 2, 0.9),
  5: legacyAdvance(ID, 5, 's409', 3, 0.9),
  6: legacyAdvance(ID, 6, 's409', 4, 0.9),
  // beat 8 — the governing question at statement scale, the scene quiet
  // beneath it (build 5).
  7: legacyAdvance(ID, 7, 's409', 5, 1.0)
};

export default makeSceneModule({
  id: ID,
  number: 18,
  title: 'The 100-Year Test',
  entry,
  morphIn,
  transitions,
  notes: `[→] Here’s the thought experiment the rest of the inquiry lives inside. You provide value today, and you receive the claim. You decide not to redeem it. Instead, it goes to your descendants — people you may never meet — and it must arrive in their hands in the year 2126, intact.

[→] You must choose one carrier. And you know nothing about the world it will travel through — not where they’ll live, not what they’ll want, not which governments will exist, which institutions will survive, which technologies will dominate, which currencies will still be accepted. One hundred years — long enough that you’re not allowed to *assume* any company, any arrangement, any government survives it. That’s the point of the number.

[→] And notice: you know exactly what the carrier is carrying. Not time. Not a fixed basket of goods. An unredeemed purchasing-power claim — the open half of an exchange, waiting a century to close. So the question becomes precise: which properties give that claim the best chance of arriving?

[→] Here is the awkward part. We know the date exactly. We know almost nothing about the world it belongs to.

[→] We don’t know where they’ll be living. We don’t know what they’ll want — the things you and I would consider luxuries may be free by then, and things we take for granted may be unobtainable.

[→] We don’t know which governments will exist. We don’t know which institutions will still be standing — and remember, a century ago the list of institutions that felt permanent was long, and most of it is gone.

[→] We don’t know which technologies will dominate, and we don’t know which rules will apply — which is a polite way of saying we don’t know what will be legal.

[→] And the carrier still has to be chosen. Today. By you. So the question can’t be “which future do I predict?” — nobody in this record has ever won that bet. The question is this one: what properties give this claim the best chance of reaching 2126 with its purchasing power intact — and still redeemable by whoever is holding it? And I don’t think you answer that by starting with the properties.`
});
