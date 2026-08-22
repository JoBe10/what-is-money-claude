# Codex Task — Revise Slide 4.07 and Build the 100-Year Test (Slides 4.08–4.09)

Read and follow these files first:

- `AGENTS.md`
- `PLANS.md`
- `docs/section-4-master-brief.md`
- `docs/section-4-narrative-master-document.md`
- `docs/codex-rebuild-section-4-04-to-4-07-object-system.md`
- `docs/codex-final-refinement-slides-4-04-to-4-07.md`

This task-specific brief is the binding source of truth for:

- the wording refinement to slide **4.07**;
- the design and implementation of slide **4.08**;
- the design and implementation of slide **4.09**.

It overrides conflicting prior implementation detail for those slides while preserving the approved narrative and visual system.

This is a continuation of the approved Section 4 visual language. Maintain the established quality level:

- clean;
- restrained;
- premium;
- highly legible;
- cinematic;
- conceptually precise;
- screenshot-ready at every build;
- free of generic diagram clutter.

---

# 1. Task boundary

Modify:

- slide 4.07 wording and only the minimal visual emphasis needed to support the revised concepts;
- slide 4.08;
- slide 4.09;
- slide-specific CSS for those slides;
- speaker notes for those slides;
- narrowly scoped shared claim/carrier/timeline helpers only where necessary.

Preserve without visual or narrative changes:

- slides 4.01–4.06;
- Sections 1–3;
- the close slide;
- the approved `ClaimObject`;
- the approved `CarrierShell`;
- the approved Bitcoin-orange accent system;
- the approved Section 4 kicker convention;
- the validated `SlideEngine` continuation behavior;
- all approved baseline fixes.

Do not implement:

- slide 4.10;
- the inversion slide;
- any failure modes;
- the ten properties;
- the comparison table;
- any later Section 4 slide.

Do not add dependencies.

Do not modify the slide engine.

Do not run `npm audit fix`.

---

# 2. Narrative logic of this task

The current sequence has established:

```text
service provided
→ money earned
→ earned, transferable claim on value
→ spend or save
→ claim and carrier
→ store-of-value function
```

This task must sharpen the final store-of-value definition and then introduce the 100-Year Test.

The conceptual movement is:

```text
a carrier must preserve purchasing power and redeemability
→ extend the journey from now to 2126
→ the same claim crosses one century
→ the destination date is known
→ the destination world is unknowable
→ ask what properties give the claim the best chance of arriving with purchasing power intact
```

The 100-Year Test is not a prediction of the future.

It is a way to derive requirements under uncertainty.

---

# 3. Slide 4.07 — wording refinement only

## 3.1 Purpose

Slide 4.07 currently defines the store-of-value function using:

- integrity;
- usability.

The revised audience-facing language must focus more directly on:

1. **purchasing power**;
2. **redeemability**.

The underlying conceptual logic remains the same.

Do not redesign the slide.

Preserve:

- the approved claim object inside the carrier shell;
- the `NOW → LATER` axis;
- the current overall composition;
- the current build structure unless a minimal text-fit adjustment is necessary;
- the premium restrained visual treatment.

## 3.2 Revised speaker notes

Use this script closely:

> Now that we have separated the claim from the carrier, we can define the store-of-value function more precisely.
>
> A carrier does not succeed merely because it survives through time. It has to preserve two things.
>
> First, the purchasing power embodied in the claim. The future holder should still be able to command meaningful real value with it.
>
> This does not mean freezing every relative price or guaranteeing the same basket forever. Preferences, productivity and scarcity conditions will change. It means the carrier itself should preserve the economic claim as faithfully as possible rather than arbitrarily eroding it.
>
> Second, the claim must remain redeemable. The future holder must still be able to access it, verify it, transfer it and ultimately exercise it.
>
> A store of value is therefore a monetary carrier that preserves the purchasing power of an unredeemed claim and keeps that claim redeemable through time.

End with:

> The clearest way to test that definition is to extend the journey much further.

Do not introduce:

- the 100-Year Test before the transition line;
- dilution examples;
- the ten failure modes;
- the comparison table;
- new theoretical detours.

## 3.3 Revised visible text

Keep the kicker:

```text
THE STORE-OF-VALUE FUNCTION
```

Keep the question:

```text
What must the carrier actually preserve?
```

Replace:

```text
INTEGRITY
The claim remains intact.
```

with:

```text
PURCHASING POWER
The claim can still command real value later.
```

Replace:

```text
USABILITY
The future holder can still exercise it.
```

with:

```text
REDEEMABILITY
The future holder can still exercise it.
```

Replace the bottom definition with:

```text
A store of value is a monetary carrier that preserves
the purchasing power of an unredeemed claim
and keeps that claim redeemable through time.
```

Do not change the axis labels:

```text
NOW
LATER
```

The `NOW → LATER` axis is approved and must remain unchanged.

## 3.4 Text hierarchy

### Purchasing-power label

- heading in Bitcoin orange;
- supporting line in white or restrained neutral grey;
- align with the left conceptual zone of the existing composition.

### Redeemability label

- heading in Bitcoin orange;
- supporting line in white or restrained neutral grey;
- align with the right conceptual zone of the existing composition.

### Bottom definition

Use no more than three lines at 1920×1080.

Preferred emphasis:

- most text white;
- `purchasing power` in Bitcoin orange;
- `redeemable` in Bitcoin orange;
- avoid highlighting whole clauses.

The bottom definition must remain legible and balanced within the projection safe zone.

## 3.5 Visual emphasis

When `PURCHASING POWER` is introduced:

- give the inner claim object restrained emphasis;
- do not add a new icon;
- do not alter the carrier geometry;
- do not use a shield or lock.

When `REDEEMABILITY` is introduced:

- give the future-facing side of the carrier and/or the `LATER` endpoint restrained emphasis;
- do not add market dots;
- do not add a marketplace diagram;
- do not complete or redeem the claim.

---

# 4. Shared visual system for slides 4.08–4.09

Use the approved:

- `ClaimObject`;
- `CarrierShell`;
- Bitcoin-orange accent;
- black background;
- Section 4 kicker style;
- premium typography.

The claim and carrier must be recognisably identical to their 4.07 appearance.

Do not create:

- a new claim object;
- a new carrier shell;
- a future-city image;
- a descendant portrait;
- a family tree;
- a calendar;
- a clock;
- a sci-fi visual;
- generic icons;
- a dense infographic.

The future should remain abstract because the argument is that it cannot be predicted.

No new AI-generated image asset is required for slides 4.08–4.09.

---

# 5. Slide 4.08 — The 100-Year Test

## 5.1 Exact purpose

Slide 4.08 introduces the thought experiment.

It must establish:

1. the claim is earned in 2026;
2. it is not redeemed;
3. it is passed forward;
4. descendants receive it in 2126;
5. the same claim and carrier must cross one full century.

The slide must feel like a direct extension of the existing `NOW → LATER` framework.

It should not yet introduce:

- uncertainty questions;
- the final property question;
- inversion;
- failure modes.

The logical movement is:

```text
earned today
→ not redeemed
→ passed forward
→ received one century later
```

## 5.2 Speaker notes

Use this script closely:

> Let’s take the claim we have just described and extend the journey.
>
> Imagine that you provide value today and receive this claim in return.
>
> But instead of redeeming it yourself, you decide to preserve it and pass it forward.
>
> The person who ultimately receives it is not you. It is one of your descendants, one hundred years from now, in 2126.
>
> The same claim now has to cross an entire century.

End with:

> We know when it must arrive. But we know almost nothing about the world it will arrive in.

Do not add:

- inheritance-law detail;
- genealogical explanation;
- future-world speculation;
- inflation discussion;
- property requirements;
- inversion language.

## 5.3 Visible text

### Kicker

```text
THE 100-YEAR TEST
```

### Sequential statements

Only one of these should be dominant at a time:

```text
You earn the claim today.
```

```text
You choose not to redeem it.
```

```text
You pass it forward.
```

```text
Your descendants receive it in 2126.
```

### Timeline labels

```text
2026
```

```text
2126
```

### Time-span label

```text
100 YEARS
```

Do not add any other visible copy.

## 5.4 Progressive builds

Implement exactly five cumulative states: build steps `0` through `4`.

Every build must reconstruct its complete target state deterministically.

### Build 0 — Extend the journey

Carry forward:

- approved claim object inside the carrier shell;
- existing temporal visual logic from 4.07.

Change:

- kicker to `THE 100-YEAR TEST`;
- `NOW` to `2026`;
- `LATER` to `2126`.

Place the claim/carrier near the 2026 side.

Reveal:

```text
You earn the claim today.
```

Requirements:

- no uncertainty questions;
- no `100 YEARS` label yet;
- no movement yet;
- timeline already visible;
- claim/carrier visually identical to 4.07.

### Build 1 — Defer redemption

Replace the dominant sentence with:

```text
You choose not to redeem it.
```

Requirements:

- claim/carrier remains at 2026;
- no crossed-out goods;
- no save icon;
- no repeated spend/save fork;
- no movement;
- previous sentence removed or fully subdued.

### Build 2 — Pass it forward

Replace the dominant sentence with:

```text
You pass it forward.
```

Reveal:

```text
100 YEARS
```

above the centre of the timeline.

Draw or activate the full 2026–2126 timeline.

Begin moving the claim/carrier toward 2126.

Movement requirements:

- smooth;
- deliberate;
- no bouncing;
- no pulsing loop;
- no dramatic scale;
- no particle trail;
- no decade markers;
- no historical milestones.

### Build 3 — Arrive in 2126

Move the claim/carrier to the 2126 endpoint.

Replace the dominant sentence with:

```text
Your descendants receive it in 2126.
```

Requirements:

- 2026 becomes quieter;
- 2126 receives restrained Bitcoin-orange emphasis;
- travelled line behind the claim becomes quieter;
- claim/carrier remains intact and visually unchanged;
- no descendant image.

### Build 4 — Hold the test

Keep:

- kicker;
- 2026;
- 100 YEARS;
- 2126;
- claim/carrier at 2126;
- final sentence.

Refine the final balance:

- dim the travelled path slightly;
- keep destination emphasis;
- preserve generous black space;
- no new information.

This final frame must be screenshot-ready and provide a clean handoff into 4.09.

## 5.5 Composition

Use a long horizontal time axis.

Suggested logical geometry at 1920×1080:

```text
timeline start: x ≈ 330
timeline end: x ≈ 1590
timeline y: ≈ 585
claim start centre: x ≈ 430
claim destination centre: x ≈ 1490
main sentence centre y: ≈ 300
100 YEARS y: ≈ 455
```

Adjust to the existing safe-zone system where required.

### Timeline styling

- thin neutral line;
- restrained orange active/travelled portion;
- no thick arrow;
- no decade ticks;
- no clock;
- no calendar;
- no decorative milestones.

### Endpoints

`2026` and `2126` must:

- share the same baseline;
- use the same typography;
- sit symmetrically relative to the timeline;
- differ only through active emphasis at the relevant build.

### Claim/carrier sizing

Use the approved size from 4.07 or a minimal proportional adjustment.

Do not enlarge the object into a hero graphic.

The journey itself is the concept.

---

# 6. Slide 4.09 — The Future Is Unknowable

## 6.1 Exact purpose

Slide 4.09 establishes that:

- the arrival date is known;
- the destination world is unknowable;
- the carrier must be chosen today;
- the key question is which properties give the claim the best chance of reaching 2126 with its purchasing power intact.

Redeemability remains part of the spoken explanation and was established on 4.07.

Purchasing power becomes the central on-screen focus because it leads directly into the later failure modes.

The logical movement is:

```text
known date
→ unknown world
→ unknown lives, institutions, technologies and rules
→ carrier chosen today
→ ask which properties preserve purchasing power
```

## 6.2 Speaker notes

Use this script closely:

> We know the date: 2126.
>
> But we do not know the world.
>
> We do not know where your descendants will live or what they will want.
>
> We do not know which governments will exist, which institutions will survive, which technologies will dominate or which rules will apply.
>
> And yet the carrier has to be chosen today.
>
> So the question is not which future we can predict.
>
> The question is: what properties give this claim the best chance of reaching 2126 with its purchasing power intact?
>
> And, of course, still redeemable by the person who receives it.

End with:

> The most useful way to answer that question is not to begin with the properties.

Do not yet reveal:

- `Invert the question`;
- Charlie Munger;
- failure modes;
- any property list.

## 6.3 Visible text

### Kicker

```text
THE FUTURE IS UNKNOWABLE
```

### Opening statement

```text
We know the date.
We do not know the world.
```

### Uncertainty pair 1

```text
WHERE WILL THEY LIVE?
```

```text
WHAT WILL THEY WANT?
```

### Uncertainty pair 2

```text
WHICH GOVERNMENTS WILL EXIST?
```

```text
WHICH INSTITUTIONS WILL SURVIVE?
```

### Uncertainty pair 3

```text
WHICH TECHNOLOGIES WILL DOMINATE?
```

```text
WHICH RULES WILL APPLY?
```

### Final governing question

```text
What properties give this claim the best chance
of reaching 2126 with its purchasing power intact?
```

Highlight only:

```text
purchasing power intact
```

in Bitcoin orange.

Do not add any other visible copy.

## 6.4 Progressive builds

Implement exactly five cumulative states: build steps `0` through `4`.

Every build must reconstruct its complete target state deterministically.

### Build 0 — Known date, unknown world

Carry forward:

- claim/carrier from the 2126 endpoint.

Transition:

- timeline recedes;
- claim/carrier moves gently to centre;
- large low-opacity `2126` appears behind it.

Reveal:

```text
We know the date.
We do not know the world.
```

Preferred emphasis:

- `We know the date.` quieter;
- `We do not know the world.` stronger.

Requirements:

- no uncertainty pair yet;
- no final question yet;
- no future image;
- no icons.

### Build 1 — Unknown lives and wants

Subdue the opening statement.

Reveal a perfectly balanced pair:

Left:

```text
WHERE WILL THEY LIVE?
```

Right:

```text
WHAT WILL THEY WANT?
```

Requirements:

- exact mirrored placement;
- same type size;
- same line height;
- same distance from centre;
- claim/carrier remains centred;
- no icons;
- no accumulation beyond this build’s full state.

### Build 2 — Unknown institutions

Replace the prior pair with:

Left:

```text
WHICH GOVERNMENTS WILL EXIST?
```

Right:

```text
WHICH INSTITUTIONS WILL SURVIVE?
```

Requirements:

- exact mirrored placement;
- no flags;
- no buildings;
- no logos;
- no governmental imagery;
- claim/carrier remains unchanged.

### Build 3 — Unknown technologies and rules

Replace the prior pair with:

Left:

```text
WHICH TECHNOLOGIES WILL DOMINATE?
```

Right:

```text
WHICH RULES WILL APPLY?
```

Requirements:

- exact mirrored placement;
- no circuit graphics;
- no futuristic imagery;
- no law-book icon;
- no network diagram.

### Build 4 — Ask the governing question

Remove all uncertainty pairs.

Keep:

- large atmospheric `2126`;
- subdued claim/carrier.

Reveal:

```text
What properties give this claim the best chance
of reaching 2126 with its purchasing power intact?
```

Requirements:

- two lines preferred; three only if absolutely necessary;
- centred;
- most text white;
- `purchasing power intact` Bitcoin orange;
- no box;
- no underline;
- no subtitle;
- no extra redeemability line on screen;
- extensive black space;
- final frame is the strongest frame of the two-slide sequence.

## 6.5 Composition

### Large atmospheric `2126`

Use:

- very large type;
- low-opacity warm neutral grey;
- no orange fill;
- no outline;
- no futuristic font;
- no bevel;
- no glow;
- may be partly obscured by claim/carrier.

It represents the only known future fact: the date.

### Claim/carrier

- centred;
- same size and geometry as prior slides;
- subtle warm glow only;
- no motion during the question-pair builds;
- may shift slightly lower during the final question to create space.

### Question pairs

Use a mathematically mirrored two-column layout.

Suggested logical centres:

```text
left question centre x ≈ 510
right question centre x ≈ 1410
question centre y ≈ 540
claim/carrier centre x = 960
```

Both sides must:

- use the same max width;
- use the same font size;
- use the same line height;
- share the same baseline logic;
- remain equally distant from the central object.

Do not eyeball the symmetry.

Derive the right position from the left position or use a mirrored layout system.

### Final question

Place in the upper-middle or central region.

Suggested logical region:

```text
x centre = 960
y centre ≈ 365–440
max width ≈ 1120–1240
```

The claim/carrier remains visible below as the subject of the question.

---

# 7. Transition from slide 4.07 to 4.08

Do not redesign 4.07.

Preferred continuation:

1. bottom definition fades;
2. purchasing-power and redeemability labels fade;
3. `NOW → LATER` axis remains;
4. claim/carrier remains;
5. kicker changes to `THE 100-YEAR TEST`;
6. `NOW` morphs or crossfades to `2026`;
7. `LATER` morphs or crossfades to `2126`;
8. claim/carrier settles near 2026;
9. first sentence appears.

Use shared-DOM continuation only if reliable.

Otherwise use matching geometry and clean crossfades.

Do not modify 4.07 merely to force fragile continuation.

---

# 8. Transition from slide 4.08 to 4.09

Preferred continuation:

1. final 4.08 sentence fades;
2. `100 YEARS` fades;
3. timeline fades;
4. `2026` fades;
5. `2126` enlarges and moves into the background;
6. claim/carrier moves from the 2126 endpoint to centre;
7. 4.09 kicker appears;
8. opening statement appears.

The transition should visually communicate:

```text
we know the destination date
→ we do not know the destination world
```

Do not use:

- a glitch;
- a futuristic wipe;
- particles;
- a portal effect;
- dramatic zoom.

---

# 9. Transition from slide 4.09 into later inversion

Do not implement slide 4.10 in this task.

Leave 4.09 in the final governing-question state.

The intended later handoff is:

1. final question remains briefly;
2. `What properties` recedes;
3. later slide reveals:
   - `Invert the question.`
   - `How could the carrier fail?`
4. claim/carrier remains central.

Do not add inversion copy to 4.09.

---

# 10. Typography and color standards

## Kicker

Use the approved Section 4 kicker style:

- short Bitcoin-orange line;
- uppercase;
- restrained tracking;
- same position as prior approved slides.

## Main statements

- clean display typography;
- no more than two lines where possible;
- no decorative cards;
- no quotation marks;
- no excessive tracking.

## Orange usage

Use Bitcoin orange only for:

- active endpoint;
- `purchasing power intact`;
- subtle travelled timeline;
- kicker accents.

Do not turn all dates or questions orange.

## Neutral hierarchy

Use restrained greys for:

- inactive timeline endpoint;
- atmospheric `2126`;
- subdued prior statements;
- inactive line segments.

---

# 11. Motion standards

Allowed:

- opacity;
- restrained translation;
- clean claim/carrier movement;
- one-time line drawing;
- crossfade/morph between date labels;
- subtle scale of the atmospheric `2126`.

Avoid:

- particles;
- bouncing;
- spring animation;
- pulsing loops;
- spinning;
- dramatic blur;
- heavy glow;
- sci-fi transitions;
- complex simultaneous motion.

Suggested timing:

```text
standard text reveal: 350–500 ms
date-label morph/crossfade: 350–500 ms
timeline draw: 550–750 ms
claim journey: 800–1100 ms
4.08 → 4.09 transition: 600–850 ms
```

Respect reduced motion.

In reduced-motion mode:

- all target states appear instantly;
- no content is omitted;
- no delayed callback is required for correctness.

---

# 12. Deterministic build requirements

For slides 4.07–4.09:

- every build reconstructs the complete target state;
- do not rely on prior build mutations;
- forward navigation works;
- backward navigation works;
- refresh at nonzero build works;
- force-next works;
- force-previous works;
- reduced motion works;
- timelines are cleaned up;
- delayed calls are cleaned up;
- no stale transforms remain;
- no stale active endpoint remains;
- no uncertainty pair from another build remains visible.

---

# 13. Implementation scope

Modify only:

- slide 4.07 module;
- slide 4.08 module;
- slide 4.09 module;
- slide-specific CSS/selectors for those slides;
- speaker notes for those slides;
- narrowly scoped timeline/date-transition helper if needed;
- existing claim/carrier components only if a minimal non-breaking extension is required.

Any shared-component change must preserve slides 4.04–4.06 exactly.

Do not:

- modify slides 4.01–4.06 content or layout;
- implement 4.10;
- alter global typography;
- modify slide engine;
- add dependencies;
- add image assets;
- add generic icons;
- run `npm audit fix`;
- leave obsolete 4.07 wording active;
- create multiple competing timeline systems.

---

# 14. Required self-review

Before reporting completion, inspect all builds at 1920×1080.

## Slide 4.07

1. Is `NOW → LATER` unchanged?
2. Is `PURCHASING POWER` the left concept?
3. Is `REDEEMABILITY` the right concept?
4. Does the supporting copy match exactly?
5. Does the bottom definition fit cleanly?
6. Is the slide otherwise visually unchanged?

## Slide 4.08

7. Does the slide feel like a direct extension of 4.07?
8. Is the same claim/carrier used?
9. Are 2026 and 2126 balanced?
10. Is `100 YEARS` restrained?
11. Is the claim movement smooth and deliberate?
12. Is there no calendar, clock, descendant image or future-city imagery?
13. Does the final state clearly communicate arrival one century later?
14. Is every intermediate state screenshot-ready?

## Slide 4.09

15. Does the large `2126` feel atmospheric rather than decorative?
16. Is `We know the date. We do not know the world.` immediately legible?
17. Are all three question pairs exactly symmetrical?
18. Does each pair replace the prior pair cleanly?
19. Are there no icons or dense diagrams?
20. Does the final question dominate the final frame?
21. Is only `purchasing power intact` orange?
22. Is the claim/carrier still visible as the subject?
23. Is the final frame ready for inversion?

## Preservation

24. Are slides 4.01–4.06 unchanged except for any unavoidable canonical shared-component preservation?
25. Is slide 4.10 untouched?
26. Are Sections 1–3 unchanged?
27. Are notes aligned with the approved narrative?
28. Is every build deterministic?

Correct any failed item before reporting completion.

---

# 15. Validation

After implementation:

1. Run `npm run build`.
2. Run `git diff --check`.
3. Inspect the full diff for every changed file.
4. Open slide 4.07 directly.
5. Inspect every 4.07 build at 1920×1080.
6. Open slide 4.08 directly.
7. Inspect builds 0–4 at 1920×1080.
8. Open slide 4.09 directly.
9. Inspect builds 0–4 at 1920×1080.
10. Inspect final states at the actual recording viewport.
11. Navigate 4.06 → 4.07 → 4.08 → 4.09 repeatedly.
12. Navigate backward through the same sequence repeatedly.
13. Refresh at nonzero build states on all three slides.
14. Test force-next and force-previous.
15. Test reduced-motion mode.
16. Verify notes overlay.
17. Verify second-window notes.
18. Keep the browser console open and confirm no errors.
19. Confirm slide 4.10 is untouched.
20. Search source and CSS for:
    - old `INTEGRITY` wording on 4.07;
    - old `USABILITY` wording on 4.07;
    - old bottom definition;
    - unintended x-axis wording changes;
    - uncertainty pairs accumulating incorrectly;
    - duplicated timeline systems;
    - calendar/clock/future-image assets;
    - inversion copy;
    - obsolete `L1:` notes;
    - accidental changes beyond scope.

Stop after slides 4.07–4.09 are complete.

Do not proceed to inversion or later slides.

---

# 16. Completion report

Report:

## Implemented

- concise summary of the 4.07 wording refinement;
- concise summary of 4.08;
- concise summary of 4.09;
- confirmation that no later slide was implemented.

## Files changed

- file-by-file list;
- exact timeline/date helper path if created;
- exact shared-component changes, if any;
- confirmation that slides 4.04–4.06 retain their approved appearance.

## Slide 4.07 wording

Confirm exact final visible wording for:

- purchasing power;
- redeemability;
- bottom definition;
- unchanged `NOW → LATER` axis.

## Validation

Report:

- commands actually run;
- build result;
- console result;
- reduced-motion result;
- navigation result;
- refresh/restoration result;
- notes result.

## Review access

Provide exact deep links for:

- slide 4.07;
- slide 4.08;
- slide 4.09.

Include instructions for reviewing every build state.

## Remaining judgment calls

List only genuine visual issues requiring human review.

End with one recommended next action only.
