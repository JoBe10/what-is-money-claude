> **Build prompt, executed — archived, not authoritative.** ChatGPT/Codex-era working material for the original Section 4 build.
> Superseded by `docs/what-is-money-master.md` and `docs/synthesis-architecture.md` (Stage 0, 25 August 2026). Nothing here governs.

# Codex Task — Rebuild Slide 4.06 Only

Read and follow these files first:

- `AGENTS.md`
- `docs/section-4-master-brief.md`
- `PLANS.md`

This task-specific prompt is the binding source of truth for slide **4.06** and overrides any conflicting earlier implementation detail for that slide.

## Task boundary

Create or rebuild **slide 4.06 only**.

Preserve without visual or narrative changes:

- slide 4.01;
- slide 4.02;
- slide 4.03;
- slide 4.04;
- slide 4.05;
- Sections 1–3;
- the close slide;
- all approved baseline fixes;
- the validated `SlideEngine` continuation fix.

Do not implement slide 4.07 or any later Section 4 slide.

If a placeholder or rejected slide 4.06 exists, remove its obsolete DOM, CSS, animation logic, and speaker notes. Do not leave dead selectors, alternate prototypes, or unused carrier components behind.

---

# 1. Purpose of slide 4.06

This slide introduces the distinction between:

- the **economic essence of money** — the earned, transferable claim on value;
- the **body that embodies and transports it** — the monetary carrier.

The slide must establish:

1. Saving leaves the monetary claim open.
2. An abstract claim cannot move through people, places, and time without being embodied in something.
3. The claim on value is the essence of money.
4. The monetary medium or monetary asset is the carrier.
5. Different societies have used different carriers.
6. The carrier can change while the monetary function remains recognisable.
7. The quality of the carrier will determine how faithfully the claim can be preserved.

The slide must land the distinction:

```text
The claim is the essence.
The monetary asset is the carrier.
```

This slide should prepare the next question:

> What must a good carrier do to preserve the integrity and usability of the claim through time?

Do not define the complete store-of-value function yet. That belongs to slide 4.07.

Do not introduce dilution, the 100-Year Test, failure modes, or the ten properties yet.

---

# 2. Speaker notes

Use this script closely and naturally. Do not add a long history-of-money detour.

> Saving keeps the exchange open. But if this claim is going to remain open and travel through time, it cannot exist only as an abstraction.
>
> The claim on value is the essence of money. But an abstract claim still needs a body—something capable of carrying it across people, places and time.
>
> That body is the monetary medium: the carrier.
>
> Throughout history, societies have embodied monetary claims in different things: shells and other commodities, precious metals, paper notes, bank ledgers and now digitally native assets such as Bitcoin.
>
> The body can change. The economic function remains recognisable: the carrier must embody and transport the claim.
>
> The claim is the essence. The monetary asset is the carrier.

End with this transition:

> Once we separate the claim from the carrier, the store-of-value problem becomes much more precise: what must that carrier do to keep the claim intact and usable through time?

Do not include:

- a formal battery metaphor;
- a long explanation of why every historical carrier emerged;
- an assessment of which carrier is best;
- a claim that all carriers preserve the claim equally well;
- dilution, inflation, or productivity;
- the 100-Year Test;
- stale `L1:` transcript markers.

---

# 3. Visible text

The slide may display only the following text.

## Kicker

```text
THE CLAIM AND ITS CARRIER
```

## First conceptual statement

```text
The claim on value is the essence of money.
```

## Second conceptual statement

```text
But an abstract claim still needs a body—
something capable of carrying it across people, places and time.
```

## Carrier reveal

```text
THE MONETARY MEDIUM
THE CARRIER
```

## Historical carrier lineage

```text
SHELLS
GOLD
PAPER
BANK LEDGERS
BITCOIN
```

## Final statement

```text
The claim is the essence.
The monetary asset is the carrier.
```

Do not add any other visible copy.

Do not show the complete store-of-value definition on this slide.

---

# 4. Reuse of the Open Claim Circuit

Reuse the approved Open Claim Circuit from slides 4.04–4.05.

Its inner meaning must remain unchanged:

- filled left node = value provided / complete;
- hollow right node = final counter-value pending;
- connecting path = transferable claim;
- the exchange remains open.

Do not change its node geometry, label hierarchy, line weight, or orange treatment in a way that alters slides 4.04 or 4.05.

The new concept on 4.06 is an **outer carrier body** that forms around the existing circuit.

## Carrier-body grammar

The carrier body should:

- surround and protect the Open Claim Circuit without obscuring it;
- be visually distinct from the claim itself;
- use a restrained neutral or warm-metal outline;
- look like an embodiment or vessel, not a locked vault;
- remain open enough that the audience can clearly see the inner claim;
- avoid suggesting that the carrier is literally a physical box;
- avoid resembling a battery, coin, wallet, capsule pill, progress bar, or science-fiction pod.

Preferred form:

- a refined outer contour or architectural frame;
- slightly rounded or faceted;
- thin neutral boundary;
- one restrained orange contact point where the inner claim connects to the body.

The inner claim remains orange.

The outer carrier should initially be neutral, making the essence/body distinction immediately visible.

Do not implement later protective, dilution, failure-mode, or 100-year behaviors.

---

# 5. Visual composition

## Overall approach

Use one central conceptual composition.

The slide should begin with the saved, open claim from 4.05 and then progressively distinguish:

1. essence;
2. need for embodiment;
3. carrier;
4. historical carrier forms;
5. final essence/carrier summary.

The composition should become more structured without becoming dense.

## Kicker

Place:

```text
THE CLAIM AND ITS CARRIER
```

top left in the established Section 4 kicker style.

## Central claim

Keep the Open Claim Circuit centred around the middle of the logical 1920×1080 stage.

Suggested region:

- circuit centre around x=960;
- circuit baseline around y=500–545;
- sufficient space above for the conceptual statements;
- sufficient space below for carrier lineage and final statement.

At the start, no outer shell is visible.

## Essence label

When the first statement appears, add a small restrained label:

```text
ESSENCE
```

near the inner Open Claim Circuit.

This label may appear as a small orange or white typographic pointer, but do not use an arrow crossing the circuit.

The visible text list above does not require `ESSENCE` as a separate headline, but it may be used as a tiny diagram label if needed for clarity.

## Carrier reveal

When the outer body forms:

- place a small restrained label `CARRIER` near the outer contour;
- reveal:
  - `THE MONETARY MEDIUM`
  - `THE CARRIER`

Preferred hierarchy:

```text
THE MONETARY MEDIUM
THE CARRIER
```

with `THE CARRIER` larger and orange.

Do not place these labels inside cards.

## People, places, and time

The phrase:

```text
something capable of carrying it across people, places and time
```

should be supported by subtle abstract destinations:

- two or three human endpoints for people;
- a restrained spatial route or distant endpoint for places;
- a short temporal trail for time.

These must remain extremely subtle and may be represented by simple points and paths.

Do not use:

- human pictograms;
- maps;
- globes;
- clocks;
- calendars;
- literal timelines with years;
- dense diagrams.

The words are more important than the supporting marks.

## Historical carrier lineage

Place a restrained lineage near the lower third:

```text
SHELLS   GOLD   PAPER   BANK LEDGERS   BITCOIN
```

Use one clean horizontal sequence.

Requirements:

- each term evenly spaced;
- small uppercase text;
- no large cards;
- no detailed illustration row;
- small minimalist line symbols may accompany each term only if they remain elegant;
- the central outer body may briefly morph or adopt a subtle contour associated with each carrier as the lineage is revealed;
- the inner Open Claim Circuit must remain visually constant throughout.

Suggested abstract carrier contours:

- `SHELLS`: organic oval / scalloped contour;
- `GOLD`: restrained circular or ingot-like contour;
- `PAPER`: rectangular note contour;
- `BANK LEDGERS`: clean ledger/window contour;
- `BITCOIN`: digitally native geometric contour.

Do not use detailed clip-art icons.

The final state should not privilege Bitcoin yet. This slide explains categories, not superiority.

## Final statement

Place near the bottom:

```text
The claim is the essence.
The monetary asset is the carrier.
```

Preferred emphasis:

- first sentence white, with `essence` orange;
- second sentence white, with `carrier` orange.

Keep both lines balanced and readable.

---

# 6. Progressive builds

Implement exactly six cumulative states: build steps `0` through `5`.

Each build must reconstruct its complete target state deterministically. Do not assume the previous build ran.

## Build 0 — Carry the saved claim forward

Visible:

- kicker `THE CLAIM AND ITS CARRIER`;
- Open Claim Circuit in the saved/open state from 4.05;
- right node hollow and pending;
- a restrained residual forward-time path may remain briefly;
- no spend/save labels;
- no final 4.05 summary;
- no outer carrier body;
- no historical lineage.

The slide should feel like a direct continuation from 4.05.

## Build 1 — Name the essence

Fade the residual time path.

Reveal:

```text
The claim on value is the essence of money.
```

Requirements:

- centred above the circuit;
- white;
- `essence of money` or only `essence` may receive orange emphasis;
- add the tiny diagram label `ESSENCE` near the inner circuit if needed;
- no outer body yet;
- circuit remains fully visible.

## Build 2 — Establish the need for a body

Keep the first statement visible but slightly quieter.

Reveal:

```text
But an abstract claim still needs a body—
something capable of carrying it across people, places and time.
```

Requirements:

- two clean lines;
- centred;
- no paragraph block;
- subtle abstract destination marks may appear;
- no carrier shell yet;
- no historical lineage yet.

Create a deliberate conceptual pause.

## Build 3 — Reveal the carrier

Form the neutral outer carrier body around the Open Claim Circuit.

Reveal:

```text
THE MONETARY MEDIUM
THE CARRIER
```

Requirements:

- outer body forms cleanly around the unchanged circuit;
- inner circuit remains visibly orange;
- outer body remains neutral;
- `THE CARRIER` receives orange emphasis;
- small `CARRIER` label may identify the outer contour;
- no heavy glow;
- no locking animation;
- no implication that the body is one specific asset yet.

## Build 4 — Show changing embodiments

Reveal the historical carrier lineage:

```text
SHELLS   GOLD   PAPER   BANK LEDGERS   BITCOIN
```

During the reveal:

- the inner claim remains constant;
- the outer contour may morph sequentially through restrained abstract forms;
- each term highlights briefly as its contour appears;
- final state returns to a clean neutral carrier contour or leaves all lineage terms evenly visible;
- do not leave Bitcoin uniquely highlighted;
- no detailed icon wall;
- no animation loop.

The conceptual message is:

> The body can change while the monetary function remains recognisable.

Do not display that sentence unless it is required in notes; it is not approved visible copy.

## Build 5 — Land the distinction

Dim the historical lineage slightly.

Keep:

- inner claim;
- outer carrier;
- small essence/carrier diagram labels if used.

Reveal:

```text
The claim is the essence.
The monetary asset is the carrier.
```

Requirements:

- final statement becomes the concluding focal point;
- `essence` and `carrier` receive restrained orange emphasis;
- earlier explanatory statements recede;
- final frame remains clean and screenshot-ready.

---

# 7. Initial and final states

## Initial state

Visible:

- kicker;
- one saved/open Open Claim Circuit;
- no carrier body.

This must feel like the direct continuation of 4.05.

## Final state

Visible:

- kicker;
- Open Claim Circuit inside a clearly distinct outer carrier body;
- subtle `ESSENCE` and `CARRIER` labels if used;
- subdued historical lineage;
- final statement:

```text
The claim is the essence.
The monetary asset is the carrier.
```

Not visible as dominant elements:

- spend/save choices;
- 4.05 final summary;
- people/place/time destination marks;
- long explanatory statements;
- any store-of-value definition;
- any ranking of carriers;
- any 100-year or failure-mode content.

The final frame must be conceptually precise and visually calm.

---

# 8. Transition from slide 4.05

Do not redesign slide 4.05.

Preferred continuation:

1. `SPEND NOW` and `SAVE FOR LATER` fade;
2. the final 4.05 summary fades;
3. `Carry the claim forward` and `EXCHANGE REMAINS OPEN` fade;
4. the time path remains briefly, then fades;
5. the Open Claim Circuit stays centred and unchanged;
6. 4.06 kicker and first statement appear.

Use shared-DOM continuation only if the approved circuit remains stable.

If not, use matching geometry and a clean crossfade.

Do not modify 4.05 merely to force a complex continuation.

---

# 9. Transition into slide 4.07

Do not implement or redesign slide 4.07.

Leave 4.06 in its final essence/carrier state.

The intended later handoff is:

1. historical lineage fades;
2. final statement recedes;
3. `ESSENCE` and `CARRIER` labels remain briefly;
4. carrier body and inner claim remain central;
5. the next slide asks what the carrier must preserve;
6. the carrier then begins moving through time.

Do not display the store-of-value definition or integrity/usability labels during 4.06.

---

# 10. Implementation constraints

Modify only:

- the slide 4.06 module;
- slide 4.06-specific CSS/selectors;
- slide 4.06 speaker notes;
- the approved Open Claim Circuit component only if a minimal non-breaking extension is required;
- a minimal carrier-body component if needed.

Any shared-component change must preserve slides 4.04 and 4.05 exactly.

Do not:

- modify slide 4.01;
- modify slide 4.02;
- modify slide 4.03;
- modify slide 4.04;
- visually alter slide 4.05;
- modify the slide engine;
- add dependencies;
- create a generic history-of-money framework;
- implement later protective/failure states;
- implement the 100-Year Test;
- rank or score carriers;
- highlight Bitcoin as the winner;
- use stock imagery;
- run `npm audit fix`;
- leave obsolete 4.06 styles or DOM.

## Component scope

If creating a carrier-body component:

- keep it narrow and presentational;
- accept only the states needed for this slide;
- support deterministic build restoration;
- support reduced motion;
- clean up GSAP timelines and transforms;
- do not encode later store-of-value, dilution, or failure-mode behavior;
- do not duplicate the inner claim component.

---

# 11. Required self-review before completion

Before reporting completion, verify:

1. Is the claim/carrier distinction immediately understandable?
2. Does the inner claim remain visually unchanged while the outer body appears?
3. Does the outer carrier avoid looking like a literal box, battery, vault, or pill?
4. Is the phrase about carrying across people, places, and time clear without a dense diagram?
5. Does the historical lineage show different embodiments without implying equal quality?
6. Does the same inner claim remain constant through every carrier morph?
7. Is Bitcoin not prematurely highlighted as the winner?
8. Does no text overlap the circuit or carrier body?
9. Does the layout remain stable through all builds?
10. Does the final statement land cleanly?
11. Are slides 4.04 and 4.05 visually unchanged?
12. Are slides 4.01–4.03 visually unchanged?
13. Are the speaker notes exactly aligned with the approved narrative?
14. Does backward navigation reconstruct every carrier state correctly?
15. Is the final state ready for the later store-of-value-function slide?
16. Is the implementation free of later dilution, 100-year, or failure-mode logic?

Correct any failure before reporting completion.

---

# 12. Validation

After implementation:

1. Run `npm run build`.
2. Run `git diff --check`.
3. Inspect the full diff for every changed file.
4. Open slide 4.06 directly.
5. Inspect builds 0, 1, 2, 3, 4, and 5 individually at 1920×1080.
6. Inspect the final frame at the actual recording viewport.
7. Test forward and backward builds repeatedly.
8. Test force-next and force-previous.
9. Refresh at build 3, build 4, and build 5 and confirm restoration.
10. Test reduced-motion mode.
11. Verify notes overlay and second-window notes.
12. Navigate 4.05 → 4.06 and back repeatedly.
13. Confirm slides 4.01–4.05 are visually unchanged.
14. Keep the browser console open and confirm no errors.
15. Search active source/CSS for:
    - duplicate Open Claim Circuit implementations;
    - battery or vault metaphors;
    - later failure-mode logic;
    - 100-year or 2126 content;
    - premature carrier scoring;
    - `L1:` artifacts.

Stop after slide 4.06 is complete. Do not implement or redesign any other slide.

---

# 13. Completion report

Report:

## Implemented

- concise summary of the new 4.06;
- confirmation that no other slide was redesigned.

## Files changed

- file-by-file list;
- exact Open Claim Circuit changes, if any;
- exact carrier-body component path, if created;
- confirmation that slides 4.04 and 4.05 retain their approved appearance.

## Validation

- commands and browser checks actually performed;
- build result;
- console result;
- reduced-motion result;
- notes result;
- backward-navigation and restoration results.

## Review access

- exact local direct URL/deep link for slide 4.06;
- instructions for viewing every build state if needed.

## Remaining judgment calls

- only issues that genuinely require human visual review.

End with one recommended next action only.
