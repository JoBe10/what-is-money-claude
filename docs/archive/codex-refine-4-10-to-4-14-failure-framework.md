> **Build prompt, executed — archived, not authoritative.** ChatGPT/Codex-era working material for the original Section 4 build.
> Superseded by `docs/what-is-money-master.md` and `docs/synthesis-architecture.md` (Stage 0, 25 August 2026). Nothing here governs.

# Codex Task — Refine Slides 4.10–4.14: Inversion, Failure Modes, and Final Property Framework

Read and follow these files first:

- `AGENTS.md`
- `PLANS.md`
- `docs/section-4-master-brief.md`
- `docs/section-4-narrative-master-document.md`
- `docs/codex-rebuild-section-4-04-to-4-07-object-system.md`
- `docs/codex-final-refinement-slides-4-04-to-4-07.md`
- `docs/codex-revise-4-07-and-build-100-year-test-4-08-4-09.md`
- `docs/codex-build-4-10-to-4-14-inversion-failures-properties.md`

This task-specific brief is the binding source of truth for the refinement of slides **4.10–4.14**.

It supersedes conflicting implementation details for those slides while preserving the approved narrative arc and the visual quality established in slides 4.03–4.09.

This is not a new section redesign. It is a focused correction of the current 4.10–4.14 implementation.

The refinement must make the sequence:

- simpler;
- more consistent;
- more legible;
- less animation-heavy;
- easier to explain verbally;
- visually aligned with the premium editorial standard of the preceding slides.

---

# 1. Task boundary

Refine:

- slide 4.10 — Invert the Question;
- slide 4.11 — How the Carrier Can Fail: I;
- slide 4.12 — How the Carrier Can Fail: II;
- slide 4.13 — From Failure to Requirement;
- slide 4.14 — The Ten Properties;
- speaker notes for those slides;
- slide-specific CSS and narrowly scoped helpers used only by those slides.

Preserve without visual or narrative changes:

- slides 4.01–4.09;
- Sections 1–3;
- the approved `ClaimObject`;
- the approved `CarrierShell`;
- the approved Bitcoin-orange accent system;
- the approved Section 4 kicker;
- the 100-Year Test;
- the validated `SlideEngine`;
- slide 4.15 and all later slides.

Do not implement:

- comparison candidates;
- comparison scores;
- the comparison table;
- any later Section 4 content.

Do not:

- add dependencies;
- add external images;
- add icon libraries;
- modify the slide engine;
- alter global typography;
- run `npm audit fix`.

---

# 2. Core refinement decisions

The following decisions are binding.

## 2.1 Remove the redundant final sentence from slide 4.10

Remove:

```text
Every failure implies a requirement.
```

from the visible slide.

The spoken notes already express this logic, and slide 4.13 will later deliver that conclusion properly.

The final frame of slide 4.10 should land only on:

```text
ASK INSTEAD:
How could the carrier fail?
```

with the claim/carrier inside the restrained stress-test frame.

## 2.2 Remove all ten bespoke failure visualisations

Do not continue with one custom animated visual metaphor for every failure mode.

Remove the active failure-effect system from slides 4.11 and 4.12, including obsolete DOM, CSS, SVG and animation logic for:

- dilution copies;
- attempted division;
- stalled liquidity path;
- trapping boundary;
- visual erosion from carrying costs;
- control contours;
- shell degradation;
- duplicate unverifiable claims;
- non-fungibility acceptance states;
- untested evidence trail.

Do not retain these effects hidden in the DOM.

The failure modes will instead be explained through a premium typographic system:

- five rows on slide 4.11;
- five rows on slide 4.12;
- one row revealed per click;
- one concise explanation per row;
- no icons;
- no carrier diagram;
- no colour-changing active-row logic.

## 2.3 Rebuild the failure-to-property reveal

The current `1 → 2 → 7` property reveal is inconsistent and must be replaced.

Use the following logic:

1. show all ten failures;
2. demonstrate one inversion:
   - `DILUTED → NO SUPPLY INFLATION`;
3. reveal the remaining nine completed mappings together;
4. display all ten completed mappings with one consistent style;
5. fade the failures and arrows;
6. leave all ten properties.

## 2.4 Update the ideal property language

Replace:

```text
SUPPLY INTEGRITY
```

with:

```text
NO SUPPLY INFLATION
```

Replace:

```text
LOW CARRYING COSTS
```

with:

```text
NO CARRYING COSTS
```

The final canonical property list is:

```text
01  NO SUPPLY INFLATION
02  DIVISIBILITY
03  LIQUIDITY
04  PORTABILITY
05  NO CARRYING COSTS
06  RESISTANCE TO CONTROL
07  DURABILITY
08  VERIFIABILITY
09  FUNGIBILITY
10  TRACK RECORD
```

Use those exact visible terms throughout slides 4.13 and 4.14.

---

# 3. Canonical failure-to-property mapping

Use this exact mapping:

| Failure mode | Ideal property |
|---|---|
| Diluted | No supply inflation |
| Indivisible | Divisibility |
| Illiquid | Liquidity |
| Trapped | Portability |
| Costly to hold | No carrying costs |
| Controlled | Resistance to control |
| Degraded | Durability |
| Unverifiable | Verifiability |
| Non-fungible | Fungibility |
| Untested | Track record |

Do not substitute synonyms.

Do not use:

- `Supply integrity`;
- `No inflation possible`;
- `No inflation` without the word `supply`;
- `Low carrying costs`;
- `No one controls it`.

---

# 4. Correct spoken explanation of supply inflation

The spoken explanation must not imply that the carrier itself creates additional units.

Use this exact concise wording on slide 4.11:

> A sound carrier prevents any person or authority from creating additional units that dilute the claim on value embodied in those already held.

This wording is binding.

It captures the intended logic:

- the carrier is the embodiment of the claim;
- an external person, institution or authority may create more units of that carrier;
- those new carrier units do not create additional underlying claims on real value;
- the result is dilution of the claim embodied in existing units.

Do not replace it with wording that says:

- “the carrier creates units”;
- “the carrier prints claims”;
- “the asset inflates itself”;
- “more claims on value are created.”

---

# 5. Slide 4.10 — Invert the Question

## 5.1 Purpose

Slide 4.10 changes the method of inquiry.

It should end on one simple question:

```text
How could the carrier fail?
```

This creates the conceptual pause before the failure modes.

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

Do not add another spoken sentence after this.

## 5.3 Visible text

### Kicker

```text
INVERT THE QUESTION
```

### First framing

```text
DON'T BEGIN BY ASKING:
What makes a good carrier?
```

### Final framing

```text
ASK INSTEAD:
How could the carrier fail?
```

Do not display:

```text
Every failure implies a requirement.
```

## 5.4 Build sequence

Use exactly three meaningful build states.

### Build 0 — Direct framing

Carry forward the claim/carrier and the governing question from 4.09 briefly.

Reveal:

```text
DON'T BEGIN BY ASKING:
What makes a good carrier?
```

### Build 1 — Invert

Replace the direct framing with:

```text
ASK INSTEAD:
How could the carrier fail?
```

Form or retain the restrained stress-test frame around the claim/carrier.

### Build 2 — Hold the question

Keep only:

- kicker;
- `ASK INSTEAD:`;
- `How could the carrier fail?`;
- claim/carrier;
- restrained stress-test frame.

No bottom sentence.

No new copy.

No failure labels yet.

## 5.5 Composition

Preserve the current strong composition:

- question in the upper-middle;
- claim/carrier centred;
- stress-test corner marks around it;
- generous black space.

Remove the now-empty bottom-text region from the visual balance. Re-centre the remaining composition subtly if necessary.

Do not enlarge the carrier dramatically.

---

# 6. Shared typographic system for slides 4.11–4.12

Slides 4.11 and 4.12 must use one identical row-based visual system.

## 6.1 Row structure

Each failure row contains:

```text
NUMBER    FAILURE NAME    CONCISE EXPLANATION
```

Example:

```text
01    DILUTED    Additional carrier units can dilute the claim embodied in existing units.
```

Use:

- number in Bitcoin orange;
- failure name in white;
- explanation in restrained neutral grey;
- no cards;
- no icons;
- no horizontal boxes;
- no active-row orange that later turns white;
- no bespoke failure visual.

## 6.2 Layout

Use one clean single-column five-row framework.

Suggested logical columns at 1920×1080:

```text
number x ≈ 235–285
failure name x ≈ 355–430
explanation x ≈ 700–760
right edge ≈ 1600
```

Suggested row centres:

```text
y ≈ 300
y ≈ 415
y ≈ 530
y ≈ 645
y ≈ 760
```

Use the same geometry on both slides.

The explanations should remain one line where possible.

If a sentence must wrap:

- allow a maximum of two lines;
- preserve consistent row height;
- do not shrink one row independently;
- do not allow rows to collide.

## 6.3 Build logic

Each slide uses six states:

- Build 0: kicker and empty row framework or no rows;
- Builds 1–5: reveal one full row per click.

When a row appears:

- its number, title and explanation appear together;
- it immediately uses its final styling;
- it remains unchanged on later builds.

Do not:

- highlight the active row orange;
- turn earlier rows grey;
- animate words individually;
- change colour after a click;
- reveal multiple rows on one click.

## 6.4 Motion

Use a restrained row reveal:

- opacity;
- 12–24 px upward translation;
- 350–450 ms;
- no bounce;
- no stagger within a row;
- no separate animation for number, title and explanation.

---

# 7. Slide 4.11 — How the Carrier Can Fail: I

## 7.1 Purpose

Introduce the first five failure modes clearly and efficiently.

## 7.2 Visible text

### Kicker

```text
HOW THE CARRIER CAN FAIL
```

### Rows

```text
01  DILUTED
Additional carrier units can dilute the claim embodied in existing units.
```

```text
02  INDIVISIBLE
The carrier cannot be divided into the quantities required for exchange.
```

```text
03  ILLIQUID
It cannot be exchanged reliably without delay, friction or significant loss.
```

```text
04  TRAPPED
It cannot move freely across distance or jurisdiction.
```

```text
05  COSTLY TO HOLD
Storage, maintenance or administration consume the claim over time.
```

Do not display the longer supply-inflation explanation on screen.

## 7.3 Speaker notes

Use this script closely:

> The first failure is dilution.
>
> If additional units of the monetary carrier can be created arbitrarily, the claim on value embodied in every existing unit can be diluted.
>
> A sound carrier prevents any person or authority from creating additional units that dilute the claim on value embodied in those already held.
>
> Second, the carrier could be indivisible. It may preserve enormous value but be impossible to divide into the quantities needed for ordinary exchange.
>
> Third, it could be illiquid. The claim may appear valuable, but the holder cannot reliably exchange it without delay, friction or a large loss.
>
> Fourth, it could be trapped. Value that cannot cross borders, jurisdictions or physical distance may never reach the person who needs it.
>
> Fifth, the carrier itself could consume the claim through storage, maintenance, administration or other carrying costs.

End with:

> But those are only the first five ways the carrier can fail.

## 7.4 Composition

Use the shared five-row system.

No claim object.

No carrier shell.

No stress-test frame.

The shift to typography is intentional: the audience is now receiving the framework, not watching an abstract animation.

## 7.5 Final state

All five rows visible.

All five use identical final styling.

No row is active.

No additional summary strip is required because the rows themselves form the final summary.

---

# 8. Slide 4.12 — How the Carrier Can Fail: II

## 8.1 Purpose

Introduce the second five failure modes using the exact same visual system.

## 8.2 Visible text

### Kicker

```text
HOW THE CARRIER CAN FAIL
```

### Rows

```text
06  CONTROLLED
An external party can alter access, ownership or the governing rules.
```

```text
07  DEGRADED
The carrier can decay or fail before the claim is redeemed.
```

```text
08  UNVERIFIABLE
Authenticity, ownership or supply cannot be established confidently.
```

```text
09  NON-FUNGIBLE
Equal units can be treated differently because of their history or condition.
```

```text
10  UNTESTED
There is insufficient evidence across crises, technologies and changing regimes.
```

## 8.3 Speaker notes

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

> Now invert each failure, and the required properties emerge.

## 8.4 Composition and builds

Use the exact same:

- column positions;
- row positions;
- typography;
- line height;
- number styling;
- reveal timing;
- build count;

as slide 4.11.

Do not introduce a second design.

## 8.5 Final state

All five rows visible and equally styled.

No active highlight.

No icons.

No summary strip.

---

# 9. Transition from 4.10 to 4.11

At slide exit:

1. inversion question fades;
2. claim/carrier fades;
3. stress-test frame fades;
4. slide 4.11 kicker remains or appears;
5. first row reveals.

Do not attempt to retain the carrier visual behind the list.

The cleaner typographic reset is intentional.

---

# 10. Transition from 4.11 to 4.12

Use a clean structural continuation:

- slide title remains in the same position;
- first set of rows fades or crossfades;
- second slide begins with the same empty row geometry;
- row 06 appears on the first build.

Do not animate the first five into a small summary area.

The audience has just seen them. A forced persistent reference is unnecessary.

---

# 11. Slide 4.13 — From Failure to Requirement

## 11.1 Purpose

Demonstrate the inversion logic once, then apply it consistently to the complete framework.

## 11.2 Speaker notes

Use this script closely:

> Now invert each failure, and the required properties emerge.
>
> If additional carrier units can dilute existing claims, the ideal carrier allows no supply inflation.
>
> If it is indivisible, it must be divisible.
>
> If it is illiquid, it must be liquid.
>
> If it becomes trapped, it must be portable.
>
> If carrying costs consume the claim, the ideal carrier has no carrying costs.
>
> The same inversion applies to the remaining failures.
>
> Control implies resistance to control. Degradation implies durability. Uncertainty implies verifiability. Unequal units imply fungibility. And insufficient evidence implies the need for a track record.

End with:

> Together, those inversions give us ten properties by which any monetary carrier can be assessed.

## 11.3 Visible text

### Kicker

```text
FROM FAILURE TO REQUIREMENT
```

### Headline

```text
Invert each failure. The properties emerge.
```

Replace the old headline:

```text
Every failure implies a property.
```

### Exact mappings

```text
DILUTED → NO SUPPLY INFLATION
INDIVISIBLE → DIVISIBILITY
ILLIQUID → LIQUIDITY
TRAPPED → PORTABILITY
COSTLY TO HOLD → NO CARRYING COSTS

CONTROLLED → RESISTANCE TO CONTROL
DEGRADED → DURABILITY
UNVERIFIABLE → VERIFIABILITY
NON-FUNGIBLE → FUNGIBILITY
UNTESTED → TRACK RECORD
```

## 11.4 Build sequence

Use exactly four cumulative states.

### Build 0 — Show all ten failures

Display ten failure terms in two balanced columns of five.

No arrows.

No properties.

Failure terms use restrained grey.

### Build 1 — Demonstrate one inversion

Transform or connect:

```text
DILUTED → NO SUPPLY INFLATION
```

Only this mapping is complete.

Treatment during the demonstration:

- `DILUTED` grey;
- arrow Bitcoin orange;
- `NO SUPPLY INFLATION` Bitcoin orange.

All nine other failure terms remain grey with no property.

### Build 2 — Apply the rule to all ten

Reveal all remaining nine mappings in one controlled batch.

At the completion of this build, all ten mappings must use the exact same final style:

- failure terms grey;
- arrows Bitcoin orange;
- property terms white.

Important:

- `NO SUPPLY INFLATION` must change from orange to white;
- no property remains active;
- no group reveals in a different colour;
- no `1 → 2 → 7` logic;
- no stagger longer than 700–850 ms total.

### Build 3 — Remove the scaffolding

Fade:

- all failure terms;
- all arrows.

Retain:

- all ten property terms;
- all property terms white;
- exact two-column alignment.

No orange active property remains.

This is the transition state into 4.14.

## 11.5 Mapping layout

Use two balanced columns of five rows.

### Left mappings

```text
DILUTED          → NO SUPPLY INFLATION
INDIVISIBLE      → DIVISIBILITY
ILLIQUID         → LIQUIDITY
TRAPPED          → PORTABILITY
COSTLY TO HOLD   → NO CARRYING COSTS
```

### Right mappings

```text
CONTROLLED       → RESISTANCE TO CONTROL
DEGRADED         → DURABILITY
UNVERIFIABLE     → VERIFIABILITY
NON-FUNGIBLE     → FUNGIBILITY
UNTESTED         → TRACK RECORD
```

Requirements:

- equal row baselines;
- equal column widths;
- failure terms align;
- arrows align;
- property terms align;
- long property terms remain on one line if possible;
- no cards;
- no icons;
- no inconsistent colour states.

---

# 12. Slide 4.14 — The Ten Properties

## 12.1 Purpose

Present the final ideal property framework cleanly and definitively.

## 12.2 Speaker notes

Use this script closely:

> That gives us ten properties.
>
> No supply inflation: can anyone create additional carrier units that dilute the claim on value embodied in those already held?
>
> Divisibility: can the carrier represent both very large and very small values?
>
> Liquidity: can it be exchanged reliably without excessive delay or loss?
>
> Portability: can it move across distance and jurisdiction?
>
> No carrying costs: can the claim be held without storage, maintenance or administration consuming it?
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

## 12.3 Visible text

### Kicker

```text
THE TEN PROPERTIES
```

### Left column

```text
01  NO SUPPLY INFLATION
02  DIVISIBILITY
03  LIQUIDITY
04  PORTABILITY
05  NO CARRYING COSTS
```

### Right column

```text
06  RESISTANCE TO CONTROL
07  DURABILITY
08  VERIFIABILITY
09  FUNGIBILITY
10  TRACK RECORD
```

## 12.4 Build sequence

Use exactly three cumulative states.

### Build 0 — Properties 01–05

Reveal the left column.

Final styling immediately:

- numbers Bitcoin orange;
- properties white.

### Build 1 — Properties 06–10

Reveal the right column.

Use the exact same style.

### Build 2 — Hold the complete framework

All ten properties remain.

No colour changes.

No pulsing.

No new text.

No partially transformed table layout.

The final frame must be stable and screenshot-ready.

## 12.5 Composition

Use a mathematically symmetrical two-column layout.

Preserve:

- exact row baselines across both columns;
- consistent number width;
- consistent gap between numbers and property terms;
- sufficient width for `RESISTANCE TO CONTROL`;
- equal visual weight between columns.

Do not use:

- icons;
- cards;
- boxes;
- row backgrounds;
- ranking;
- candidate names;
- table cells.

---

# 13. Cleanup requirements

Remove obsolete implementation associated with the rejected failure visualisations.

Search and remove:

- unused SVG paths;
- duplicate claim objects created only for failure animations;
- control boundaries;
- trapped barriers;
- verification scans;
- degradation fragments;
- evidence trails;
- stale failure-active classes;
- old active-row colour logic;
- old `Supply integrity` strings;
- old `Low carrying costs` strings;
- old `Every failure implies a requirement.` visible copy;
- old `Every failure implies a property.` headline;
- abandoned animation timelines.

Do not remove shared components still used by slides 4.04–4.10.

---

# 14. Deterministic build requirements

For slides 4.10–4.14:

- each build reconstructs its complete target state;
- forward navigation works;
- backward navigation works;
- refresh at nonzero builds works;
- force-next works;
- force-previous works;
- reduced motion works;
- row reveals do not duplicate;
- property mappings do not accumulate inconsistently;
- no old active colour remains;
- no removed failure visual returns;
- timelines and delayed calls are cleaned up.

---

# 15. Required visual self-review

Inspect every build at 1920×1080.

## Slide 4.10

1. Is the bottom sentence completely removed?
2. Does the final frame land only on `How could the carrier fail?`
3. Is the composition still balanced without the bottom sentence?

## Slide 4.11

4. Are five rows revealed one per click?
5. Does each row use final styling immediately?
6. Are the explanations concise and legible?
7. Are there no bespoke failure animations?
8. Is the exact corrected dilution logic present in the notes?
9. Is the final five-row frame balanced?

## Slide 4.12

10. Does it use exactly the same row geometry as 4.11?
11. Are rows 06–10 revealed one per click?
12. Are there no icons or custom failure visualisations?
13. Is the final frame balanced?

## Slide 4.13

14. Is the headline exactly `Invert each failure. The properties emerge.`?
15. Does Build 1 demonstrate only one mapping?
16. Does Build 2 reveal the remaining nine mappings together?
17. Do all ten mappings share one consistent final style?
18. Does `NO SUPPLY INFLATION` turn white with the other completed properties?
19. Does Build 3 leave only the ten properties?
20. Are all property names exact?

## Slide 4.14

21. Is `NO SUPPLY INFLATION` used?
22. Is `NO CARRYING COSTS` used?
23. Are both columns mathematically aligned?
24. Are all properties white?
25. Are all numbers orange?
26. Is no candidate or score content present?

## Preservation

27. Are slides 4.01–4.09 visually unchanged?
28. Is slide 4.15 untouched?
29. Are speaker notes aligned with the approved logic?
30. Is every intermediate build screenshot-ready?

Correct every failed item before reporting completion.

---

# 16. Validation

After implementation:

1. Run `npm run build`.
2. Run `git diff --check`.
3. Inspect the complete diff.
4. Open slide 4.10 directly.
5. Inspect every 4.10 build at 1920×1080.
6. Open slide 4.11 directly.
7. Inspect builds 0–5.
8. Open slide 4.12 directly.
9. Inspect builds 0–5.
10. Open slide 4.13 directly.
11. Inspect builds 0–3.
12. Open slide 4.14 directly.
13. Inspect builds 0–2.
14. Inspect final states at the actual recording viewport.
15. Navigate 4.09 → 4.10 → 4.11 → 4.12 → 4.13 → 4.14 repeatedly.
16. Navigate backward through the sequence.
17. Refresh every slide at nonzero build states.
18. Test force-next and force-previous.
19. Test reduced-motion mode.
20. Verify notes overlay.
21. Verify second-window notes.
22. Keep the browser console open and confirm no errors.
23. Confirm slide 4.15 is untouched.
24. Search active source and CSS for:
    - `Supply integrity`;
    - `Low carrying costs`;
    - `Every failure implies a requirement.`;
    - `Every failure implies a property.`;
    - rejected failure-effect selectors;
    - obsolete active-row colour logic;
    - generic icons;
    - comparison candidates;
    - table scores;
    - stale `L1:` notes.

Stop after slides 4.10–4.14 are refined.

Do not proceed to the comparison section.

---

# 17. Completion report

Report:

## Implemented

- concise summary of the slide 4.10 simplification;
- confirmation that bespoke failure visualisations were removed;
- concise summary of the new row-based 4.11–4.12 system;
- concise summary of the corrected 4.13 reveal logic;
- concise summary of the final 4.14 property framework.

## Exact supply-inflation wording

Confirm that the notes use:

> A sound carrier prevents any person or authority from creating additional units that dilute the claim on value embodied in those already held.

## Canonical property list

Confirm the exact final list:

```text
No supply inflation
Divisibility
Liquidity
Portability
No carrying costs
Resistance to control
Durability
Verifiability
Fungibility
Track record
```

## Files changed

Provide a file-by-file list.

Confirm which obsolete failure-effect code was removed.

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

Include instructions for reviewing each build state.

## Remaining judgement calls

List only genuine visual issues requiring human review.

End with one recommended next action only.
