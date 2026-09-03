// Scene 23 — The Comparison (6 beats).
//
// Legacy 4-15 and 4-16, re-homed in the architecture's merge, at the
// presenter's Row 1 ruling (A, 3 Sep 2026): the candidate lineup stands as
// its own frame before the table — the question, then GOLD · FIAT · BITCOIN
// at display scale in the dark-field register under MONETARY ASSETS as the
// holding assumptions are spoken; REAL ESTATE · SHARES under PRODUCTIVE
// ASSETS with the divider; the five settling into one candidate set; the
// question receding. Then the table — THE COMPARISON in the quiet kicker
// register, PROPERTY, the five compact headers as grammar glyphs, ten rows —
// and ALL FIFTY SCORES LANDING IN ONE ADVANCE (R7.4 §D.3), the frozen data
// by its own module; then the closing line, "Don't trust. Verify.", on stage
// exactly once in the film (master §3.7). No total, no winner badge, no
// highlight. Every beat is the legacy module's own live advance.
//
// The empty table (4-16's build 0) has no spoken advance of its own; it
// enters as the first movement of the scores' gesture — the legacy's own
// crossfade from the candidates onto the drawn, empty table, then the fifty
// dots filling in the legacy's 520ms — exactly as the approved s23-b5 records
// it. The kicker-to-table spacing is carried as the legacy renders it, an
// accepted legacy fact (the Batch D ruling 3).
//
// The stability steelman and the Q&A arsenal ride in the notes as armor,
// never spoken (architecture Ruling 5; master §9.6).
//
// Landed states — the approved cells s23-b1 … s23-b6, by construction.

import { makeSceneModule } from './_sceneModule.js';
import { legacyAdvance, legacyBoundary, legacyEntry } from './_testStage.js';

const ID = 'the-comparison';

const entry = legacyEntry(ID, 's415', 1.1);
const morphIn = legacyBoundary(ID, 0, 's414', 's415', 1.5);

const transitions = {
  // beat 2 — the two productive assets join, the divider between the two
  // families (4-15 build 2).
  1: legacyAdvance(ID, 1, 's415', 2, 1.1),
  // beat 3 — the five settle into one candidate set (build 3).
  2: legacyAdvance(ID, 2, 's415', 3, 0.9),
  // beat 4 — the question recedes; the candidates hold the frame (build 4).
  3: legacyAdvance(ID, 3, 's415', 4, 0.9),
  // beat 5 — the table: the empty table enters in the legacy's crossfade,
  // then all fifty scores land in one advance (4-16 build 1).
  4: legacyBoundary(ID, 4, 's415', 's416', 1.4),
  // beat 6 — the closing line (build 2).
  5: legacyAdvance(ID, 5, 's416', 2, 0.9)
};

export default makeSceneModule({
  id: ID,
  number: 23,
  title: 'The Comparison',
  entry,
  morphIn,
  transitions,
  notes: `[→] So let’s point them at the three assets people actually use as money. Gold, fiat, Bitcoin — principally monetary assets. And before a single score appears I have to tell you exactly what I mean by each, because a score without a holding assumption is a score you cannot check. Gold means physical investment-grade bullion, held directly or through secure bullion custody, with no tokenized wrapper. Fiat means a major developed-market currency in ordinary contemporary forms — bank deposits and cash, normal access through regulated financial infrastructure; I am not treating an unusual capital-control edge case as the default, and I am not claiming deposits and physical cash are structurally identical. And Bitcoin means native BTC held in self-custody on the Bitcoin network, with valid private-key control and no custodial or synthetic wrapper. Hold on to that last one — it does real work later.

[→] And two productive assets, because this is where most of the world’s savings actually sit. Real estate means direct, unlevered title to real property — no REIT, no tokenized wrapper, and with the ordinary legal and maintenance obligations that come with owning a building. Shares means a diversified portfolio of listed ordinary shares held through standard brokerage and custody infrastructure — not private-company shares; I am not assuming fractional access is universal, and the voting and economic rights stay with legally recognized shares and share classes. These two are not the same kind of instrument as the first three. Their value can come from rents, from profits, from productive activity. But people use all five to carry purchasing power through time, which is the only job we are scoring.

[→] Why these five? Because this is where the world’s savings actually sit — cash and bonds, gold, real estate, shares — plus the one new entrant that credibly claims the foundation role on its properties. And one more question I should answer before you ask it: why is Bitcoin the only digital candidate? The palladium logic, applied internally. At the base layer, the deciding properties are a credibly fixed supply, no issuer, and resistance to control — and a coin with a foundation, a management team, or a changeable supply schedule fails the *properties*, before the network bar is even raised. And that same logic answers tomorrow’s version of the question — why not the *next* one, in 2080? Because beyond a fixed supply and near-zero costs of transport and verification, there is very little categorical room left to stand in. Marginally better has never moved a crown — and at the frontier, categorically better may have nowhere left to be. Structure, not prophecy: the century stays a question, and the table will say so.

[→] One last thing before we score. The framework makes the trade-offs explicit; the scores stay judgments, and reasonable people can disagree with them. That is not a disclaimer. It is the point of doing it this way.

[→] Before a single dot: this is not an attempt at a mathematically perfect answer, and every score depends on the assumptions we just set — the form in which each asset is held, transferred and verified. The point is not the number. The point is to make each structural trade-off visible. So, the first five — supply, and movement. Bitcoin scores five on no supply inflation, because no person and no authority can unilaterally create additional valid units and dilute the claim in the ones already held. Fiat scores one, and I want to be fair about why: elasticity is a *feature* of that system, deliberately built in. It buys flexibility. It just means the holder does not control the rules. Gold takes four — mining adds a little, every year, and always has. Divisibility, liquidity, portability: fiat and Bitcoin do well; gold is heavy, and expensive to store, secure and move; real estate is a building — you cannot send a third of it to Singapore. Shares get three on divisibility because fractional access is not universal and may not reproduce the full legal and voting rights of whole shares. And look at carrying costs, because this is one I score against Bitcoin: four, not five. Self-custody is not free. Secure hardware, redundant backups, inheritance planning, ongoing security discipline — real, recurring costs. Far smaller than a vault’s. Not zero. Pretending otherwise is exactly the idealization this table exists to avoid. And now the second five, where the real disagreements live. Resistance to control: Bitcoin five — and that score rests entirely on the holding we defined a moment ago, native BTC in self-custody. That assumption is doing real work. Self-custody removes the custodian; it does not remove custodial risk, it transfers it to you. Hand the same coins to a third party and it is a different score. Durability: gold five, obviously — the atom does not care about institutions. Bitcoin also five, and that one deserves a defense, because the hundred-year test was deliberately skeptical about institutions surviving. The distinction is what kind of thing has to survive. Gold’s durability is physical. Bitcoin’s is informational and social — the protocol persists the way mathematics or a language does. As long as the source code and the ledger survive anywhere and people have reason to run them, it can exist. A globally distributed network with strong economic incentives for its own continuation is a different class of dependency from any single institution, government or company. It is still a judgment, like every score here, and I would rather you challenged it than accepted it. Verifiability: five, because supply and ownership can be checked by anyone. Fungibility: four, not five — transaction histories are visible and intermediaries can and do treat units differently; shares get four for a related reason, since shares of the same company and class are interchangeable while different companies and share classes are not. Track record: two out of five, and I am not going to dress that up. Seventeen years against a hundred-year question is thin evidence, and gold’s five is earned. Real estate scores poorly on several of these, which does not make it a bad asset — it makes it a building, not money. And listed shares can be extraordinarily liquid while still depending on issuers, brokers, custodians, exchanges, regulators and legal systems. Notice what is missing: there is no total. There cannot be, because the properties do not carry equal weight, and one severe weakness may matter more than several moderate strengths.

[→] Bitcoiners will recognize the phrase — and here’s what it means, concretely: these fifty scores are my judgments, as of 2026. Every one of them is an invitation. Check each score against your own knowledge, and when we disagree, that disagreement is the framework doing its job. That is why there is a framework and not a conclusion. One caveat before anyone turns this into an investment thesis: this table compares architecture, not valuation. A strong carrier can be expensive; a weak one can be cheap. What the table tells you is which assets are structurally best positioned to compete for monetary demand. So — where does that monetary demand actually go right now?

**[Notes-only — Q&A armor, never spoken: the stability steelman, relocated here by architecture Ruling 5 (the stability scene is cut; the two-question distinction and the stage-signature inoculation speak in Scene 9; the rules line stays spoken in Scene 29). Verbatim from legacy 4-20's three closing spoken beats, less two sentences: its two pointer sentences — "That is this line: restless, and it is supposed to be." and "That is this one." — named 4-20's drawn contrast, which has no frame here, and are cut by presenter ruling (3 September 2026, master §13); nothing is written in their place.]**

Which leaves one objection, and it is the one I hear most: “fine, but the thing you are proposing as a store of value moved thirty percent last quarter.” It is a fair thing to say, and the answer starts by noticing that two completely different questions are hiding inside the word stability. There is the market’s valuation of the claim — demand, liquidity, expectations.

And there is the architecture of the claim — supply rules, ownership rules, verification, control. Architecture protects the integrity of the claim; the market decides what the claim can buy. And they are not substitutes for one another. A smooth price cannot compensate for an architecture that quietly dilutes you — that is precisely the currency chart you saw earlier, a beautifully stable price on a line that went down for fifty years. And sound architecture alone cannot guarantee demand. Both statements are true at once.

So here is the honest claim, and it is narrower than the one people argue against. Bitcoin does not fix its price. It fixes the rules through which the market discovers its price. Today’s volatility is the cost of monetizing a new fixed-supply asset — the stage, not the verdict, exactly as the ladder taught — and deeper markets may calm it. Expectation, not guarantee.

**[Notes-only — Q&A armor, never spoken: the two-prong displacement writeup and the trapped-exit answer, at the comparison scene's notes per master §9.6. Verbatim from legacy 4-20's Q&A arsenal.]**

*If asked “your own rail shows every money losing the role — what stops something better than Bitcoin later?”*: History shows two ways to lose the monetary role: beaten, or captured. Beaten requires a categorical improvement on the deciding properties — and beyond absolutely fixed supply and near-zero costs of transport and verification, there is little categorical room left; marginal improvement has never moved a crown (palladium). Captured is how gold actually fell — and capture attacked gold’s custodial layer, not the metal, which is why resistance to control and direct self-custody are scored properties, and why the table scores self-custodied Bitcoin rather than a wrapper: the same vector aimed at Bitcoin runs through custodians and paper claims. Neither answer makes the century certain — which is why track record scores two out of five. *If asked “I’d see failure coming and adjust in time”*: history’s worst store-of-value failures were fast and closed the exits first — bank holidays, capital controls, confiscation orders; and even successful adjustment just means choosing the best carrier later, in a hurry — the same question, asked worse.`
});
