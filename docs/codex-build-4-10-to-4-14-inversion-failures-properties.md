# Codex Task — Build Inversion, Failure Modes, and the Ten Properties (Slides 4.10–4.14)

Read and follow these files first:

- `AGENTS.md`
- `PLANS.md`
- `docs/section-4-master-brief.md`
- `docs/section-4-narrative-master-document.md`
- `docs/codex-rebuild-section-4-04-to-4-07-object-system.md`
- `docs/codex-final-refinement-slides-4-04-to-4-07.md`
- `docs/codex-revise-4-07-and-build-100-year-test-4-08-4-09.md`

This task-specific brief is the binding source of truth for slides **4.10–4.14**.

It overrides any conflicting prior implementation guidance for those slides while preserving the approved Section 4 narrative, visual language, speaker-note logic, and interaction system.

This task must maintain the standard now established by slides 4.03–4.09:

- clean;
- restrained;
- premium;
- conceptually rigorous;
- visually coherent;
- mathematically aligned where symmetry is intended;
- screenshot-ready at every build;
- minimal on-screen text;
- no generic infographic clutter;
- no weak stock icons;
- no unnecessary decorative effects.

---

# 1. Task boundary

Create:

- slide 4.10 — Invert the Question;
- slide 4.11 — How the Carrier Can Fail: I;
- slide 4.12 — How the Carrier Can Fail: II;
- slide 4.13 — From Failure to Requirement;
- slide 4.14 — The Ten Properties.

Modify only as required:

- slide modules for 4.10–4.14;
- slide-specific CSS for 4.10–4.14;
- speaker notes for 4.10–4.14;
- narrowly scoped shared components required for the stress-test and transformation sequence;
- minimal manifest/registration entries required to make the new slides active in the approved order.

Preserve without visual or narrative changes:

- slides 4.01–4.09;
- Sections 1–3;
- the close slide;
- the approved `ClaimObject`;
- the approved `CarrierShell`;
- the approved Bitcoin-orange accent system;
- the approved Section 4 kicker style;
- the approved 100-Year Test sequence;
- the validated `SlideEngine` continuation behaviour;
- all approved baseline fixes.

Do not implement:

- slide 4.15;
- candidate comparison framing;
- the comparison table;
- any scoring system;
- any later Section 4 slide.

Do not add dependencies.

Do not modify the slide engine.

Do not run `npm audit fix`.

---

# 2. Narrative arc of slides 4.10–4.14

The previous slide ends with:

```text
What properties give this claim the best chance
of reaching 2126 with its purchasing power intact?
```

This task must continue with the following exact reasoning arc:

```text
direct property-listing is difficult
→ invert the question
→ ask how the carrier could fail
→ stress-test the carrier across ten failure modes
→ every failure implies a requirement
→ derive ten properties
→ present the canonical ten-property framework
```

This sequence is not a generic list of desirable traits.

The properties must feel **derived from first principles**.

The audience should understand that the framework was produced by asking:

```text
What could prevent the claim from reaching 2126
with its purchasing power intact and still redeemable?
```

The comparison table comes later.

Do not mention or score candidate assets in this task.

---

# 3. Canonical failure-to-property mapping

Use the following exact mapping throughout slides 4.10–4.14.

| Failure mode | Required property |
|---|---|
| Diluted | Supply integrity |
| Indivisible | Divisibility |
| Illiquid | Liquidity |
| Trapped | Portability |
| Costly to hold | Low carrying costs |
| Controlled | Resistance to control |
| Degraded | Durability |
| Unverifiable | Verifiability |
| Non-fungible | Fungibility |
| Untested | Track record |

These exact property names will later become the comparison table rows.

Do not substitute:

- `No inflation possible` for `Supply integrity`;
- `No one controls it` for `Resistance to control`;
- `Low storage cost` for `Low carrying costs`;
- any looser synonyms.

Speaker notes may explain the concepts in fuller language, but the visible canonical terms must remain exactly as listed above.

---

# 4. Shared visual system for slides 4.10–4.12

Reuse the approved:

- `ClaimObject`;
- `CarrierShell`;
- Bitcoin-orange accent;
- black editorial background;
- Section 4 kicker;
- typography;
- spacing system.

The same claim and carrier from the 100-Year Test now enter a restrained **stress-test stage**.

## 4.1 Stress-test stage

Create one narrowly scoped reusable visual stage for slides 4.10–4.12.

Suggested component name:

```text
CarrierStressStage
```

The stage may contain:

- the approved claim object;
- the approved carrier shell;
- a minimal four-corner inspection frame;
- a neutral testing zone;
- one active failure effect at a time.

The frame should feel like:

- scrutiny;
- examination;
- a conceptual stress test.

It must not feel like:

- a laboratory machine;
- a sci-fi scanner;
- a dashboard;
- a warning box;
- a prison;
- a cage;
- a computer HUD;
- a futuristic weapon interface.

Preferred treatment:

- four restrained corner marks;
- thin neutral-grey lines;
- no full rectangle;
- no labels inside the frame;
- no looping scan line;
- no pulsing animation.

## 4.2 One dominant failure at a time

Only one failure effect may be active at a time.

Do not accumulate:

- multiple failure visuals;
- warning icons;
- multiple claim copies from prior states;
- multiple boundaries;
- previous headings.

At the end of each failure slide, active visual effects clear and the identified failure names settle into a quiet consolidated group.

## 4.3 No external image assets

Do not create or use new AI-generated imagery for slides 4.10–4.14.

All visual logic should be:

- SVG;
- HTML/CSS;
- restrained vector geometry;
- typography;
- motion.

Do not install an icon library.

Do not use generic icons.

---

# 5. Slide 4.10 — Invert the Question

## 5.1 Exact purpose

Slide 4.10 changes the method of inquiry.

It must establish:

1. the direct question from 4.09 is difficult to answer well;
2. inversion provides a more concrete method;
3. instead of starting with an ideal property list, ask how the carrier could fail;
4. each identified failure will imply a required property;
5. the carrier is about to be stress-tested.

This slide should feel like a shift in reasoning mode, not a new topic.

Charlie Munger may be mentioned verbally as an attribution to the inversion method.

Do not place:

- Charlie Munger’s portrait;
- a quotation;
- his name as a large visual;
- biographical information.

The method matters more than the attribution.

## 5.2 Speaker notes

Use this script closely:

> We could try to answer that question directly by listing everything a good monetary carrier should possess.
>
> But there is a more reliable way to reason.
>
> Invert the question.
>
> Instead of beginning by asking what makes a good carrier, ask how the carrier could fail.
>
> What could prevent the claim from reaching 2126 with its purchasing power intact and still redeemable?
>
> Once we identify the ways it can fail, the required properties become much easier to derive.
>
> This is the inversion method often associated with Charlie Munger.

End with:

> So let’s stress-test the carrier.

Do not introduce individual failure modes before the transition.

## 5.3 Visible text

### Kicker

```text
INVERT THE QUESTION
```

### Carried-forward governing question

```text
What properties give this claim the best chance
of reaching 2126 with its purchasing power intact?
```

### First framing

```text
DON'T BEGIN BY ASKING:
What makes a good carrier?
```

### Inverted framing

```text
ASK INSTEAD:
How could the carrier fail?
```

### Final line

```text
Every failure implies a requirement.
```

Do not add any other visible copy.

## 5.4 Progressive builds

Implement exactly four cumulative states: build steps `0` through `3`.

Every build must reconstruct its complete target state deterministically.

### Build 0 — Carry the governing question forward

Carry forward from slide 4.09:

- approved claim object inside the carrier shell;
- final governing question;
- atmospheric `2126` only if required for the transition.

Change the kicker to:

```text
INVERT THE QUESTION
```

Requirements:

- governing question remains dominant;
- claim/carrier remains visible;
- no stress-test frame yet;
- no failure language yet.

### Build 1 — Challenge the direct framing

Subdue the carried-forward question.

Reveal:

```text
DON'T BEGIN BY ASKING:
What makes a good carrier?
```

Requirements:

- `DON'T BEGIN BY ASKING:` small and Bitcoin orange;
- `What makes a good carrier?` larger and white;
- claim/carrier remains calm and centred;
- no stress effect.

### Build 2 — Invert

Replace the first framing with:

```text
ASK INSTEAD:
How could the carrier fail?
```

At the same time:

- atmospheric `2126` fully fades;
- the restrained stress-test corner frame begins forming around the claim/carrier;
- no specific failure effect appears.

Requirements:

- `ASK INSTEAD:` Bitcoin orange;
- `How could the carrier fail?` white and dominant;
- no warning graphics;
- no red colour;
- no shake or impact animation.

### Build 3 — Land the method

Keep:

```text
How could the carrier fail?
```

Reveal:

```text
Every failure implies a requirement.
```

Requirements:

- final line smaller than the question;
- final line may highlight `failure` and `requirement` very subtly, but do not overuse orange;
- stress-test frame now complete;
- claim/carrier remains neutral and ready for the next slide.

## 5.5 Composition

Use one central vertical hierarchy:

1. kicker;
2. inversion question;
3. claim/carrier inside the stress-test frame;
4. concluding line.

Suggested logical geometry:

```text
main question centre y ≈ 300–345
claim/carrier centre y ≈ 545–590
final line centre y ≈ 790–835
```

Preserve generous black space.

## 5.6 Transition from 4.09

Preferred sequence:

1. final 4.09 question remains briefly;
2. atmospheric `2126` recedes;
3. kicker changes;
4. direct-framing text appears;
5. claim/carrier remains central.

Do not create a hard cut if matching geometry allows a clean continuation.

## 5.7 Transition into 4.11

At slide exit:

- inversion text fades;
- final line fades;
- claim/carrier and stress-test frame remain;
- first failure word appears on 4.11.

The first test should feel like it begins immediately.

---

# 6. Slide 4.11 — How the Carrier Can Fail: I

## 6.1 Exact purpose

Slide 4.11 introduces the first five ways a carrier can fail:

1. Diluted
2. Indivisible
3. Illiquid
4. Trapped
5. Costly to hold

These failures concern whether the carrier can preserve and deliver economic command across time.

Each failure must be experienced as one concrete stress test, not introduced as a static list.

The slide must give special emphasis to dilution through the line:

```text
A sound carrier prevents arbitrary dilution from the money side.
```

This is the only visible supporting sentence required for an individual failure.

## 6.2 Speaker notes

Use this script closely:

> The first failure is dilution.
>
> If additional monetary claims can be created arbitrarily, every existing claim can command a smaller share of the real goods and services available.
>
> A sound carrier prevents arbitrary dilution from the money side.
>
> Second, the carrier could be indivisible. It may preserve enormous value but be impossible to divide into the quantities needed for ordinary exchange.
>
> Third, it could be illiquid. The claim may appear valuable, but the holder cannot reliably exchange it without delay, friction or a large loss.
>
> Fourth, it could be trapped. Value that cannot cross borders, jurisdictions or physical distance may never reach the person who needs it.
>
> Fifth, the carrier itself could consume the claim through storage, maintenance, administration or other carrying costs.

End with:

> But preserving economic command is not enough. The carrier can also fail through control, decay, uncertainty and insufficient evidence.

Do not introduce the required properties yet.

## 6.3 Visible text

### Kicker

```text
HOW THE CARRIER CAN FAIL
```

### Dominant failure words

```text
DILUTED
```

```text
INDIVISIBLE
```

```text
ILLIQUID
```

```text
TRAPPED
```

```text
COSTLY TO HOLD
```

### Dilution supporting line

```text
A sound carrier prevents arbitrary dilution from the money side.
```

### Final consolidated row

```text
DILUTED
INDIVISIBLE
ILLIQUID
TRAPPED
COSTLY TO HOLD
```

Do not display definitions or explanations beneath the other four failures.

## 6.4 Progressive builds

Implement exactly six cumulative states: build steps `0` through `5`.

### Build 0 — Begin the stress test

Visible:

- kicker;
- neutral claim/carrier;
- restrained stress-test frame;
- no failure word;
- no consolidated row.

### Build 1 — Diluted

Reveal:

```text
DILUTED
```

Visual effect:

- retain one original claim marker clearly;
- introduce several lower-opacity competing claim markers around or behind it;
- distribute visual emphasis across the enlarged set;
- the original marker becomes relatively less dominant;
- the carrier itself does not expand;
- do not create a full pool, pie chart, supply chart or monetary diagram.

Reveal:

```text
A sound carrier prevents arbitrary dilution from the money side.
```

Requirements:

- supporting line appears beneath the stress stage;
- `arbitrary dilution` may receive restrained orange emphasis;
- no numeric example;
- no currency-printing animation;
- no banknote imagery.

### Build 2 — Indivisible

Clear all dilution copies.

Reveal:

```text
INDIVISIBLE
```

Visual effect:

- one large claim marker aligns with several smaller neutral redemption slots;
- a restrained division seam attempts to form within the claim;
- the division cannot complete;
- claim remains one rigid unit.

Avoid:

- broken glass;
- explosion;
- jagged destruction;
- scissors;
- literal fraction symbols.

### Build 3 — Illiquid

Clear the indivisibility effect.

Reveal:

```text
ILLIQUID
```

Visual effect:

- claim/carrier begins travelling toward one restrained neutral redemption endpoint;
- the route narrows, fades or terminates before contact;
- movement visibly stalls;
- endpoint remains reachable in principle but inaccessible in practice.

Avoid:

- queues;
- people icons;
- a marketplace;
- a shopping basket;
- currency-exchange boards.

### Build 4 — Trapped

Clear the illiquidity effect.

Reveal:

```text
TRAPPED
```

Visual effect:

- claim/carrier travels toward a destination;
- one clean vertical or slightly faceted boundary blocks the route;
- destination remains visible beyond the boundary;
- claim cannot cross.

Avoid:

- flags;
- maps;
- prison bars;
- padlocks;
- government icons;
- red warning tape.

### Build 5 — Costly to hold

Clear the trapped effect.

Reveal:

```text
COSTLY TO HOLD
```

Visual effect:

- claim/carrier travels a short measured distance through time;
- small controlled portions of the claim’s visual mass are removed in stages;
- it arrives visibly smaller than it began;
- carrier may remain, but the embodied economic claim is reduced.

Avoid:

- flames;
- corrosion;
- cartoon coins falling out;
- percentage labels;
- dramatic destruction.

After the active effect lands:

- restore claim/carrier to neutral;
- clear the stress visual;
- settle the five identified failure names into a quiet, evenly spaced consolidated row near the bottom.

## 6.5 Composition

Maintain one stable central stress-test stage.

Suggested hierarchy:

```text
failure word centre y ≈ 260–305
stress stage centre y ≈ 520–585
support/consolidated region y ≈ 790–850
```

The failure word should be large but not oversized.

The claim/carrier remains the visual subject.

## 6.6 Final consolidated row

At the end of Build 5, display the five failures in equal visual slots.

Requirements:

- mathematically even spacing;
- neutral grey text;
- small uppercase;
- no icons;
- no bullets;
- no separators required;
- `DILUTED` may retain only a very slight orange trace, but no item should dominate strongly.

## 6.7 Transition into 4.12

Preferred continuation:

- consolidated first-five row remains;
- row moves into a quiet “already identified” zone;
- claim/carrier remains central;
- second slide begins with a neutral stress stage.

Do not repeat inversion.

---

# 7. Slide 4.12 — How the Carrier Can Fail: II

## 7.1 Exact purpose

Slide 4.12 introduces the remaining five failure modes:

6. Controlled
7. Degraded
8. Unverifiable
9. Non-fungible
10. Untested

These failures concern:

- discretionary power;
- physical or technical persistence;
- confidence and authenticity;
- equivalence between units;
- strength of historical evidence.

Together with 4.11, they complete the inversion-derived failure framework.

## 7.2 Speaker notes

Use this script closely:

> Sixth, the carrier may be subject to discretionary control. An external party may alter access, ownership or the rules governing the asset.
>
> Seventh, the carrier may degrade. Physical decay, technical failure or environmental damage can destroy its ability to carry the claim.
>
> Eighth, it may be unverifiable. If the future holder cannot establish authenticity, ownership or supply, the claim cannot be trusted.
>
> Ninth, units may not be fungible. Two nominally equal units may be valued differently because of their history, condition or provenance.
>
> And finally, the carrier may be untested. A short history gives us limited evidence about how it behaves across wars, crises, technological shifts and institutional change.
>
> Those are ten distinct ways the carrier could fail.

End with:

> And each failure tells us exactly what the carrier must do instead.

Do not reveal the properties before the transition.

## 7.3 Visible text

### Kicker

```text
HOW THE CARRIER CAN FAIL
```

### Dominant failure words

```text
CONTROLLED
```

```text
DEGRADED
```

```text
UNVERIFIABLE
```

```text
NON-FUNGIBLE
```

```text
UNTESTED
```

### Final second group

```text
CONTROLLED
DEGRADED
UNVERIFIABLE
NON-FUNGIBLE
UNTESTED
```

No supporting sentences are required on screen for individual failures.

## 7.4 Progressive builds

Implement exactly six cumulative states: build steps `0` through `5`.

### Build 0 — Continue the test

Visible:

- kicker;
- neutral claim/carrier;
- stress-test frame;
- first-five failures in a quiet existing group;
- no active second-group failure.

The first group must be subordinate and must not compete with the active test.

### Build 1 — Controlled

Reveal:

```text
CONTROLLED
```

Visual effect:

- an external neutral boundary or control contour closes partially around the carrier;
- one access route is redirected, narrowed or disabled from outside;
- claim remains visible;
- holder does not initiate the change.

Avoid:

- hands;
- government buildings;
- flags;
- padlocks;
- chains;
- red warning states.

### Build 2 — Degraded

Clear the controlled effect.

Reveal:

```text
DEGRADED
```

Visual effect:

- carrier shell loses restrained segments, fades, fractures or becomes discontinuous;
- claim becomes partially exposed;
- claim itself initially remains intact, clearly demonstrating that the body has failed.

Avoid:

- dramatic shattering;
- fire;
- rust textures;
- photographic decay;
- debris.

### Build 3 — Unverifiable

Clear the degradation effect.

Reveal:

```text
UNVERIFIABLE
```

Visual effect:

- a second near-identical claim/carrier appears;
- a restrained verification contour or scan attempts to evaluate them;
- neither receives clear confirmation;
- visual uncertainty comes from indistinguishability, not from a question-mark icon.

Avoid:

- question marks;
- magnifying glasses;
- QR codes;
- app UI;
- red crosses.

### Build 4 — Non-fungible

Clear the unverifiable effect.

Reveal:

```text
NON-FUNGIBLE
```

Visual effect:

- show two initially identical claim markers side by side;
- one receives full acceptance/emphasis;
- the other is visibly discounted, dimmed or rejected due to provenance or condition;
- geometry begins identical so unequal treatment is unmistakable.

Avoid:

- price labels;
- numeric discounts;
- traffic-light colours;
- marketplace cards.

### Build 5 — Untested

Clear the non-fungibility effect.

Reveal:

```text
UNTESTED
```

Visual effect:

- claim/carrier sits near the beginning of a long future path;
- only a short evidence trail exists behind it;
- the unknown path ahead is substantially longer than the observed path;
- no dates are required;
- do not reintroduce the full 100-Year Test timeline.

After the effect lands:

- restore claim/carrier to neutral;
- clear the active effect;
- settle the second five failure names into a quiet, evenly spaced group;
- present both groups as a complete ten-failure framework.

## 7.5 Final ten-failure state

Display two mathematically balanced rows or columns of five.

Preferred arrangement:

### Left group

```text
DILUTED
INDIVISIBLE
ILLIQUID
TRAPPED
COSTLY TO HOLD
```

### Right group

```text
CONTROLLED
DEGRADED
UNVERIFIABLE
NON-FUNGIBLE
UNTESTED
```

Requirements:

- equal row heights;
- identical type sizes;
- exact column alignment;
- no icons;
- no definitions;
- no active stress effect;
- claim/carrier neutral and central or slightly subdued.

## 7.6 Transition into 4.13

The ten failure words become the transition material.

Preferred continuation:

- claim/carrier fades;
- stress-test frame fades;
- ten failure terms remain;
- terms reorganise into two mapping columns;
- slide 4.13 kicker appears.

Do not hard-cut to an unrelated layout if the words can continue cleanly.

---

# 8. Slide 4.13 — From Failure to Requirement

## 8.1 Exact purpose

Slide 4.13 delivers the intellectual payoff of inversion.

It must establish:

```text
Every failure implies the property required to prevent it.
```

The slide should:

1. begin with the complete ten-failure set;
2. demonstrate the mapping logic with a few examples;
3. reveal all ten mappings;
4. remove the failure side;
5. leave the ten canonical properties.

This is the bridge from stress-testing to the comparison framework.

## 8.2 Speaker notes

Use this script closely:

> Now the required properties largely reveal themselves.
>
> If the claim can be diluted, the carrier needs supply integrity.
>
> If it is indivisible, it must be divisible.
>
> If it is illiquid, it must be liquid.
>
> If it becomes trapped, it must be portable.
>
> If carrying costs consume it, those costs must remain low.
>
> The same inversion applies to the remaining failures.
>
> Control implies resistance to control. Degradation implies durability. Uncertainty implies verifiability. Unequal units imply fungibility. And insufficient evidence implies the need for a track record.

End with:

> Together, those inversions give us ten properties by which any monetary carrier can be assessed.

## 8.3 Visible text

### Kicker

```text
FROM FAILURE TO REQUIREMENT
```

### Main line

```text
Every failure implies a property.
```

### Exact mappings

```text
DILUTED → SUPPLY INTEGRITY
INDIVISIBLE → DIVISIBILITY
ILLIQUID → LIQUIDITY
TRAPPED → PORTABILITY
COSTLY TO HOLD → LOW CARRYING COSTS

CONTROLLED → RESISTANCE TO CONTROL
DEGRADED → DURABILITY
UNVERIFIABLE → VERIFIABILITY
NON-FUNGIBLE → FUNGIBILITY
UNTESTED → TRACK RECORD
```

Do not add definitions on this slide.

## 8.4 Progressive builds

Implement exactly five cumulative states: build steps `0` through `4`.

### Build 0 — Complete failure set

Visible:

- kicker;
- main line;
- ten failure terms arranged in two balanced five-row columns;
- no properties;
- no arrows;
- no claim/carrier.

### Build 1 — First inversion

Highlight:

```text
DILUTED
```

Reveal its exact paired property:

```text
SUPPLY INTEGRITY
```

Connect them using either:

- one restrained horizontal arrow;
- a clean typographic morph;
- a line that draws once.

Preferred treatment:

- failure in neutral grey;
- property in Bitcoin orange;
- arrow neutral or low-emphasis orange.

### Build 2 — Establish the rule

Add:

```text
INDIVISIBLE → DIVISIBILITY
ILLIQUID → LIQUIDITY
```

Requirements:

- same mapping geometry;
- exact row alignment;
- no large simultaneous animation;
- active new mappings may use orange briefly;
- prior mapping settles into the standard final style.

### Build 3 — Complete all mappings

Reveal all ten pairs.

Use two balanced five-row columns.

Do not animate all seven remaining pairs with elaborate individual effects.

Use:

- a restrained stagger;
- or a controlled batch reveal.

Requirements:

- all rows share identical geometry;
- failure terms align;
- arrows align;
- property terms align;
- long terms such as `RESISTANCE TO CONTROL` and `LOW CARRYING COSTS` fit without shrinking the whole system excessively.

### Build 4 — Remove the failures

Fade:

- failure terms;
- arrows.

Retain:

- ten property terms.

The ten properties remain in two aligned columns and become the handoff to slide 4.14.

## 8.5 Composition

Use two mapping columns.

Suggested structure:

```text
left mapping column centre x ≈ 520
right mapping column centre x ≈ 1400
rows y ≈ 385, 475, 565, 655, 745
```

Within each mapping row:

```text
failure term | arrow | property term
```

Property terms should carry greater emphasis than failure terms.

## 8.6 Typography

- failure terms: restrained grey, uppercase;
- arrows: thin neutral/low-orange;
- properties: white in final state;
- active property: Bitcoin orange during its reveal;
- no card backgrounds;
- no icons;
- no numbering yet.

## 8.7 Transition into 4.14

Retain all ten property terms.

On the next slide:

- kicker changes;
- numbers appear;
- property terms settle into the canonical framework;
- spacing becomes more generous and final.

Do not add candidate columns yet.

---

# 9. Slide 4.14 — The Ten Properties

## 9.1 Exact purpose

Slide 4.14 presents the canonical ten-property framework that will later become the comparison table’s row structure.

It must:

1. consolidate the properties;
2. establish their exact names;
3. give every property equal status;
4. present a clean, credible framework;
5. provide a stable endpoint before the later comparison-table sequence.

This is the conclusion of the first-principles derivation.

Do not introduce:

- gold;
- fiat;
- Bitcoin;
- property;
- shares;
- scores;
- table cells;
- winners;
- rankings.

## 9.2 Speaker notes

Use this script closely:

> That gives us ten properties.
>
> Supply integrity: can the monetary units resist arbitrary dilution?
>
> Divisibility: can the carrier represent both very large and very small values?
>
> Liquidity: can it be exchanged reliably without excessive delay or loss?
>
> Portability: can it move across distance and jurisdiction?
>
> Low carrying costs: how much of the claim is consumed merely by holding it?
>
> Resistance to control: can an external party unilaterally change access, ownership or the rules?
>
> Durability: can the carrier survive physical, technical and institutional change?
>
> Verifiability: can authenticity, ownership and supply be established?
>
> Fungibility: are equal units treated as equal?
>
> And track record: what evidence do we have that the carrier survives crises and changing regimes?
>
> These are the criteria we can now apply to every candidate.

End with:

> So how do the major monetary carriers compare?

Do not reveal candidates on screen in this task.

## 9.3 Visible text

### Kicker

```text
THE TEN PROPERTIES
```

### Left column

```text
01  SUPPLY INTEGRITY
02  DIVISIBILITY
03  LIQUIDITY
04  PORTABILITY
05  LOW CARRYING COSTS
```

### Right column

```text
06  RESISTANCE TO CONTROL
07  DURABILITY
08  VERIFIABILITY
09  FUNGIBILITY
10  TRACK RECORD
```

Do not add the optional line:

```text
Derived by asking how the carrier could fail.
```

The framework is stronger without extra copy.

## 9.4 Progressive builds

Implement exactly three cumulative states: build steps `0` through `2`.

### Build 0 — First five properties

Reveal:

```text
01  SUPPLY INTEGRITY
02  DIVISIBILITY
03  LIQUIDITY
04  PORTABILITY
05  LOW CARRYING COSTS
```

Requirements:

- left column only;
- exact row spacing;
- numbers in restrained Bitcoin orange;
- property names white;
- no icons;
- no definitions.

### Build 1 — Complete the framework

Reveal:

```text
06  RESISTANCE TO CONTROL
07  DURABILITY
08  VERIFIABILITY
09  FUNGIBILITY
10  TRACK RECORD
```

Requirements:

- second column mirrors the first;
- identical row heights;
- identical number/property spacing;
- no visual hierarchy implying one column is more important.

### Build 2 — Lock the final system

Keep all ten visible.

Use a restrained final emphasis pass:

- numbers remain orange;
- property names remain white;
- one subtle line or shared alignment guide may momentarily confirm that the ten items form one system;
- no new copy;
- no candidates;
- no table preparation animation that leaves the slide in a partially transformed state.

The final state must be a complete, stable, screenshot-ready framework.

## 9.5 Composition

Use a mathematically symmetrical two-column layout.

Suggested logical geometry:

```text
left column start x ≈ 330
right column start x ≈ 1045
column width ≈ 545
row y ≈ 330, 440, 550, 660, 770
```

Adjust to safe zones and actual typography.

Requirements:

- exact row baselines across both columns;
- consistent number width;
- consistent gap between number and property;
- sufficient width for `RESISTANCE TO CONTROL`;
- no wrapping where avoidable;
- if one label must wrap, rebalance all row heights deliberately rather than allowing one accidental exception.

Preferred solution: keep every property on one line through appropriate sizing and column width.

## 9.6 Typography

- kicker: approved Section 4 style;
- numbers: Bitcoin orange, restrained weight;
- property names: white, uppercase;
- no bullets;
- no icons;
- no cards;
- no boxes;
- no row dividers unless extremely subtle and demonstrably beneficial.

## 9.7 Final frame

The final frame must communicate:

```text
These are the ten criteria.
```

without displaying that sentence.

It should feel:

- definitive;
- neutral;
- rigorous;
- ready for comparison;
- not propagandistic;
- not Bitcoin-specific.

---

# 10. Cross-slide continuity

## 10.1 4.09 → 4.10

Carry the governing question forward briefly.

Then change the method from direct questioning to inversion.

The claim/carrier remains the conceptual subject.

## 10.2 4.10 → 4.11

Retain:

- claim/carrier;
- stress-test frame.

Remove:

- inversion text.

Reveal the first failure.

## 10.3 4.11 → 4.12

Retain:

- stress-test stage;
- neutral claim/carrier;
- first-five failure group in a subdued region.

Do not restart the conceptual sequence.

## 10.4 4.12 → 4.13

Retain the ten failure words.

Fade:

- claim/carrier;
- stress-test frame.

Reorganise the words into mapping rows.

## 10.5 4.13 → 4.14

Retain the ten property terms.

Remove:

- failure terms;
- arrows;
- mapping scaffolding.

Add:

- canonical numbering;
- final spacing;
- 4.14 kicker.

Use clean continuity where reliable.

Do not force fragile shared-DOM transitions if matching geometry and crossfades are safer.

---

# 11. Motion standards

Allowed:

- opacity;
- restrained translation;
- subtle scale;
- one-time line drawing;
- controlled duplication of claim markers for dilution;
- controlled carrier-segment fading for degradation;
- clean reorganisation of words;
- restrained stagger.

Avoid:

- particles;
- bounce;
- spring motion;
- spinning;
- pulsing loops;
- red alert effects;
- shaking;
- aggressive glitch;
- heavy blur;
- dramatic impact animation;
- cartoon destruction;
- stock warning graphics.

Suggested timing:

```text
standard text reveal: 350–500 ms
failure-effect formation: 450–700 ms
failure-effect clearing: 250–400 ms
mapping reveal: 350–550 ms
full mapping stagger total: 600–850 ms
word reorganisation: 550–800 ms
```

Respect reduced motion.

In reduced-motion mode:

- complete target states appear instantly;
- no content is omitted;
- no delayed callback is required for correctness.

---

# 12. Deterministic build requirements

For slides 4.10–4.14:

- every build reconstructs its full target state;
- no build depends on the previous build’s mutations;
- forward navigation works;
- backward navigation works;
- refresh at nonzero builds works;
- force-next works;
- force-previous works;
- reduced motion works;
- timelines are cleaned up;
- delayed calls are cleaned up;
- duplicated claim markers do not persist;
- boundaries do not persist;
- degradation states do not persist;
- mapping rows do not accumulate incorrectly;
- no stale orange emphasis remains.

---

# 13. Implementation scope

Modify only:

- slide 4.10 module;
- slide 4.11 module;
- slide 4.12 module;
- slide 4.13 module;
- slide 4.14 module;
- slide-specific CSS/selectors for those slides;
- speaker notes for those slides;
- a narrowly scoped stress-test component;
- a narrowly scoped failure-effect helper if genuinely useful;
- a narrowly scoped mapping-grid helper if genuinely useful;
- minimal slide registration/manifest entries.

Any shared-component change must preserve slides 4.04–4.09 exactly.

Do not:

- modify slides 4.01–4.09 content or layout;
- implement 4.15;
- add comparison candidates;
- add scores;
- alter global typography;
- modify the slide engine;
- add dependencies;
- add image assets;
- add an icon library;
- run `npm audit fix`;
- leave abandoned prototypes;
- retain unused failure-effect DOM;
- create a large general-purpose animation framework.

---

# 14. Required self-review

Inspect every build at 1920×1080.

## Slide 4.10

1. Does the final 4.09 question carry forward cleanly?
2. Is inversion immediately understandable?
3. Is the stress-test frame restrained?
4. Does the slide avoid Charlie Munger imagery or quotation clutter?
5. Is the final state ready for the first failure?

## Slide 4.11

6. Is only one failure visually dominant at a time?
7. Does dilution show relative weakening without becoming a monetary-pool diagram?
8. Is the dilution line visible exactly as approved?
9. Is indivisibility understandable without broken-glass imagery?
10. Is illiquidity distinct from trapped?
11. Is trapped understandable without flags or maps?
12. Does costly-to-hold visibly reduce the embodied claim?
13. Is the final five-item row balanced and clean?

## Slide 4.12

14. Does controlled clearly imply external discretion without cliché icons?
15. Does degraded show carrier failure while preserving the claim initially?
16. Does unverifiable communicate inability to establish authenticity?
17. Does non-fungible show unequal treatment of nominally equal units?
18. Does untested show insufficient evidence rather than mere youth?
19. Are the final ten failures balanced in two groups?
20. Is the stress stage visually consistent with 4.11?

## Slide 4.13

21. Is the failure-to-property logic obvious after the first mapping?
22. Are all ten canonical property names exact?
23. Are mapping rows aligned consistently?
24. Do long terms fit cleanly?
25. Does the final state contain properties only?
26. Is there no claim/carrier visual remaining?

## Slide 4.14

27. Are the two columns mathematically symmetrical?
28. Are all ten rows aligned?
29. Are the exact canonical property names used?
30. Are numbers restrained and orange?
31. Are property names white and equal in status?
32. Is there no candidate or score content?
33. Is the final frame stable and complete?

## Preservation

34. Are slides 4.01–4.09 visually unchanged?
35. Is slide 4.15 untouched?
36. Are Sections 1–3 unchanged?
37. Are notes aligned with the approved narrative?
38. Is every intermediate build screenshot-ready?
39. Does backward navigation reconstruct every failure cleanly?
40. Does reduced motion preserve every concept?

Correct any failed item before reporting completion.

---

# 15. Validation

After implementation:

1. Run `npm run build`.
2. Run `git diff --check`.
3. Inspect the full diff for every changed file.
4. Open slide 4.10 directly.
5. Inspect builds 0–3 at 1920×1080.
6. Open slide 4.11 directly.
7. Inspect builds 0–5 at 1920×1080.
8. Open slide 4.12 directly.
9. Inspect builds 0–5 at 1920×1080.
10. Open slide 4.13 directly.
11. Inspect builds 0–4 at 1920×1080.
12. Open slide 4.14 directly.
13. Inspect builds 0–2 at 1920×1080.
14. Inspect all final states at the actual recording viewport.
15. Navigate 4.09 → 4.10 → 4.11 → 4.12 → 4.13 → 4.14 repeatedly.
16. Navigate backward through the same sequence repeatedly.
17. Refresh every new slide at multiple nonzero build states.
18. Test force-next and force-previous.
19. Test reduced-motion mode.
20. Verify notes overlay.
21. Verify second-window notes.
22. Keep the browser console open and confirm no errors.
23. Confirm slide 4.15 is untouched.
24. Search source and CSS for:
    - wrong property names;
    - `No inflation possible`;
    - `No one controls it`;
    - generic icons;
    - red warning states;
    - leaked failure effects;
    - duplicated claim markers;
    - stale stress boundaries;
    - comparison candidates;
    - table scores;
    - obsolete `L1:` notes;
    - accidental changes beyond scope.

Stop after slides 4.10–4.14 are complete.

Do not proceed to the comparison section.

---

# 16. Completion report

Report:

## Implemented

- concise summary of slide 4.10;
- concise summary of slide 4.11;
- concise summary of slide 4.12;
- concise summary of slide 4.13;
- concise summary of slide 4.14;
- confirmation that no comparison slide was implemented.

## Canonical framework

Confirm the exact final property list:

```text
Supply integrity
Divisibility
Liquidity
Portability
Low carrying costs
Resistance to control
Durability
Verifiability
Fungibility
Track record
```

## Files changed

Provide a file-by-file list.

Report exact paths for:

- stress-test component;
- failure-effect helper, if created;
- mapping-grid helper, if created.

Confirm that slides 4.04–4.09 retain their approved appearance.

## Validation

Report:

- commands actually run;
- build result;
- console result;
- reduced-motion result;
- forward-navigation result;
- backward-navigation result;
- refresh/restoration result;
- notes result.

## Review access

Provide exact deep links for:

- slide 4.10;
- slide 4.11;
- slide 4.12;
- slide 4.13;
- slide 4.14.

Include instructions for reviewing every build state.

## Remaining judgement calls

List only genuine visual issues requiring human review.

End with one recommended next action only.
