// Scene 26 — When Other Assets Do Money's Job (9 beats).
//
// THE ARCHITECTURE'S OWN MERGE: two legacy slides, one scene. Legacy 4-19
// carries beats 1–5 — the four roles, each a statement over its render at the
// display box with its function label, one per advance (REAL ESTATE SHELTERS.
// · COMPANIES PRODUCE. · GOLD HAS LONG CARRIED MONETARY VALUE. · BITCOIN'S
// UTILITY IS MONETARY.), then their final line: It competes for the monetary
// premium attached elsewhere. Legacy 4-20 carries beats 6–9 — the three
// coexistence statements with the assets they name arriving as they are named,
// then the coexistence law over all five. Every beat is the legacy module's
// own live advance at the legacy stylesheet's durations.
//
// THE MERGE POINT, AS RULED (master §13, 4 Sep 2026 — the six seams are Batch
// E's to time): beat 5 → beat 6 is THE LEGACY CROSSFADE. The four roles and
// their final line give way to the first coexistence statement with the coin
// and the house beneath it, exactly as the legacy played 4-19 → 4-20, whose
// build 0 is empty — nothing stands between the two compositions but the
// advance. Inside one scene that boundary is the beat's gesture; the settled
// frame does not change.
//
// WHAT IS RETIRED AND NEVER DRIVEN: 4-20's builds 5–7 — the stability
// contrast, the restless price line over the flat rules line — are cut by
// architecture Ruling 5. The steelman is Scene 23's notes-only armor and the
// rules line is Scene 29's. This scene stops at build 4, and the stage's state
// list is the only thing that can reach the module.
//
// SPOKEN OVER THE LAST FRAME, NO ADVANCE: the falsifiability passage, at its
// ruled home (Row 2 = A, 4 Sep 2026). It is in the notes behind its bracketed
// marker, which carries no `[→]`, so the scene stays at nine beats while the
// passage is spoken over the coexistence law.
//
// Landed states — the approved cells s26-b1 … s26-b9, by construction.

import { makeSceneModule } from './_sceneModule.js';
import { legacyAdvance, legacyBoundary, legacyEntry } from './_caseStage.js';

const ID = 'when-other-assets-do-moneys-job';

const entry = legacyEntry(ID, 's419', 0.9);
const morphIn = legacyBoundary(ID, 0, 's418', 's419', 1.3);

const transitions = {
  // beats 2–4 — the second, third and fourth roles, each rising at 420/520ms
  // (4-19 builds 2, 3, 4).
  1: legacyAdvance(ID, 1, 's419', 2, 0.9),
  2: legacyAdvance(ID, 2, 's419', 3, 0.9),
  3: legacyAdvance(ID, 3, 's419', 4, 0.9),
  // beat 5 — the roles' final line beneath the four, 400/480ms (build 5).
  4: legacyAdvance(ID, 4, 's419', 5, 0.9),
  // beat 6 — THE MERGE: the legacy's own crossfade from 4-19 to 4-20's empty
  // build 0, then 4-20's own build-1 reveal — the first coexistence statement
  // with the coin and the house arriving beneath it.
  5: legacyBoundary(ID, 5, 's419', 's420', 1.3),
  // beats 7–8 — the second and third statements, shares arriving, then gold
  // and the fiat note completing the five (4-20 builds 2 and 3).
  6: legacyAdvance(ID, 6, 's420', 2, 0.9),
  7: legacyAdvance(ID, 7, 's420', 3, 0.9),
  // beat 9 — the coexistence law over the five assets (build 4); the
  // statements clear and the law lands in their place.
  8: legacyAdvance(ID, 8, 's420', 4, 0.9)
};

export default makeSceneModule({
  id: ID,
  number: 26,
  title: 'When Other Assets Do Money’s Job',
  entry,
  morphIn,
  transitions,
  notes: `[→] Real estate shelters people. That is what it is for, and it is very good at it.

[→] Companies produce. They make things, employ people, earn profits, and sometimes hand some of them back.

[→] Gold has carried monetary value for thousands of years, and it also sits in jewelry and in industry. But when the dominant money is not trusted to preserve purchasing power, all three of these are asked to do a second job on the side: absorb the savings demand the money is failing to satisfy.

[→] Bitcoin is different, and I want to state the difference precisely rather than flatteringly. It has no separate productive, consumptive or aesthetic function. Its utility is monetary — to carry and transfer value under rules that cannot be changed unilaterally. Now, people usually raise yield at exactly this point, so let me take it head-on. Yield is compensation — for capital, liquidity, time, balance-sheet capacity, insurance, or accepted risk — and it always has a source. The absence of native yield is not the advantage. The absence of a *required yield-producing counterparty* is: no tenant, no borrower, no management team has to succeed for the claim to stay whole.

[→] And that cuts both ways, which I am not going to hide. An asset with no non-monetary use also has no floor of non-monetary demand. Gold’s jewelry and industrial demand is a cushion Bitcoin does not have. Bitcoin’s value rests entirely on its monetary function — and that is the source of both its strength and its risk. So it is not another productive asset with a monetary premium attached. It is a monetary asset competing for the premium attached to everything else. Which reframes the question. It is not whether Bitcoin eliminates a building’s reason to exist. It is how much monetary demand these assets keep absorbing.

[→] A home still provides shelter. Nothing about any of this changes that, and a framework that needed it to would be a bad framework.

[→] A company still produces goods, earns profits, and may pay dividends. Those are real cash flows from real activity, and they do not evaporate because a better savings asset exists.

[→] And gold can remain a historically trusted monetary commodity — it has been one for five thousand years, and I am not predicting the end of that. Bitcoin does not need to eliminate any of these functions. What it competes with is the portion of their value that comes from savers needing somewhere to put purchasing power. The narrower question is whether those assets keep carrying the same monetary premium as more savers understand — and act on — the structural advantages of an asset whose primary function is to carry monetary value. And notice what changes over time there: not access. Bitcoin has been accessible for years. What changes is understanding, confidence, liquidity, custody infrastructure, and the willingness to act.

[→] So: Bitcoin competes with their monetary function — not their reason to exist.

**[Spoken over the scene's final frame, no advance — the falsifiability passage at its ruled home (master §9.6: spoken, not staged; R7.4: the beat left the deck for the script; the batch-d states report: Act V material). Verbatim from legacy 4-20's closing passages, with the ledger's one substitution. Its last sentence names "Don't trust. Verify." as a spoken mention; the line is on stage once, at Scene 23's table. ARGUABLE row 2 of docs/act-5-provenance.md, at its default: Scene 26's close.]**

I’ve spent the last few minutes answering objections. Let me do one better, and give you mine — the three things that would send me back to that table with an eraser.

If Bitcoin’s supply integrity ever credibly failed — if the twenty-one million turned out to be negotiable — the entire scarcity column collapses, and with it most of the case.

If the security budget — the economics that pay for the network’s defense — went into sustained decay, the durability and control scores would have to fall with it.

And if the protocol itself were ever captured — its rules rewritten by a single coordinated interest — then it would have become the thing it was built not to be, and this table would need rebuilding from the left column out.

None of these has happened. All of them are watchable — publicly, by anyone, which is itself unusual. And if one ever does happen: don’t wait for my updated scores. That’s what “Don’t trust. Verify.” means when it’s meant.`
});
