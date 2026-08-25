> **Build prompt, executed — archived, not authoritative.** ChatGPT/Codex-era working material for the original Section 4 build.
> Superseded by `docs/what-is-money-master.md` and `docs/synthesis-architecture.md` (Stage 0, 25 August 2026). Nothing here governs.

# Codex Task — Rebuild Slide 4.05 Only

Read and follow these files first:

- `AGENTS.md`
- `docs/section-4-master-brief.md`
- `PLANS.md`

This task-specific prompt is the binding source of truth for slide **4.05** and overrides any conflicting earlier implementation detail for that slide.

## Task boundary

Create or rebuild **slide 4.05 only**.

Preserve without visual or narrative changes:

- slide 4.01;
- slide 4.02;
- slide 4.03;
- slide 4.04;
- Sections 1–3;
- the close slide;
- all approved baseline fixes;
- the validated `SlideEngine` continuation fix.

Do not implement slide 4.06 or any later Section 4 slide.

If a prior placeholder or rejected slide 4.05 exists, remove its obsolete DOM, CSS, animation logic, and speaker notes. Do not leave dead selectors or alternate prototypes behind.

---

# 1. Purpose of slide 4.05

This slide explains the two possible next steps after the surgeon has received an earned, transferable claim on value:

1. **Spend now**
   - redeem the claim;
   - receive the final goods or services;
   - close the exchange.

2. **Save for later**
   - do not redeem the claim yet;
   - carry it forward;
   - keep the final counter-value pending;
   - keep the exchange open.

The slide must land the central distinction:

```text
Spending closes the exchange.
Saving keeps it open.
```

It should then leave the Open Claim Circuit in its saved, still-open state so the next slide can explain:

> The claim on value is the essence of money. But an abstract claim still needs a body—something capable of carrying it across people, places, and time.

Do not introduce the carrier or outer shell yet.

---

# 2. Speaker notes

Use this script closely and naturally. Do not add new theory or detours.

> Once the surgeon has received this claim, he has two basic options.
>
> He can spend it now. In that case, he returns to the market and exchanges the claim for the final goods or services he wants. The pending side of the exchange is completed. The claim is redeemed, and the exchange closes.
>
> Or he can save it.
>
> If he saves, he does not redeem the claim yet. The final counter-value remains pending, and the exchange stays open. He carries the claim forward so that he—or someone else who rightfully receives it—can redeem it later.
>
> Saving, then, is the decision to defer the final exchange.
>
> Spending closes the exchange. Saving keeps it open.

End with this transition:

> But if an abstract claim is going to remain open and travel through time, it still needs something capable of carrying it.

Do not include:

- the full claim/carrier explanation yet;
- a discussion of investment or yield;
- a discussion of inflation or dilution;
- an extended explanation of time preference;
- stale `L1:` transcript markers.

---

# 3. Visible text

The slide may display only the following text.

## Kicker

```text
SPEND OR SAVE
```

## Two choices

Left:

```text
SPEND NOW
```

Right:

```text
SAVE FOR LATER
```

## Spend-state explanation

```text
Redeem the claim now
```

Status:

```text
EXCHANGE CLOSED
```

Right-node label in the spend state:

```text
FINAL COUNTER-VALUE
RECEIVED
```

## Save-state explanation

```text
Carry the claim forward
```

Status:

```text
EXCHANGE REMAINS OPEN
```

Right-node label in the save state:

```text
FINAL COUNTER-VALUE
PENDING
```

## Final statement

```text
Spending closes the exchange.
Saving keeps it open.
```

Do not add any other visible copy.

---

# 4. Open Claim Circuit states

Reuse the approved Open Claim Circuit from slide 4.04.

Do not replace its visual grammar.

Canonical open state:

```text
VALUE PROVIDED                         FINAL COUNTER-VALUE
  COMPLETE          ●────────────○           PENDING
                    TRANSFERABLE CLAIM
```

## Spend state

When the claim is spent:

- the hollow right node fills;
- `PENDING` changes to `RECEIVED`;
- the path visually resolves into a completed exchange;
- restrained examples of final goods may appear beyond or around the completed right node;
- the status becomes `EXCHANGE CLOSED`.

The circuit should feel complete, not “dead” or broken.

Do not use:

- a lock icon;
- a green checkmark;
- celebratory particles;
- a progress bar;
- a large success card.

## Save state

When the claim is saved:

- the right node remains hollow;
- `PENDING` remains visible;
- the complete Open Claim Circuit begins moving subtly forward along a restrained timeline;
- the status becomes `EXCHANGE REMAINS OPEN`;
- the path remains active but not continuously pulsing;
- no carrier shell appears yet.

The saved circuit should clearly be the same claim being carried forward, not a second new claim.

---

# 5. Visual composition

## Overall approach

Use one full-width conceptual composition.

Do not create two permanent cards or two independent side-by-side copies of the claim.

The same central Open Claim Circuit should demonstrate the two possible states sequentially:

1. spend;
2. save.

This avoids implying that the claim has been duplicated.

The final state should remain on the **save** scenario because that is the path into the store-of-value discussion.

## Kicker

Place:

```text
SPEND OR SAVE
```

top left in the established section-kicker style.

## Choice labels

Place:

```text
SPEND NOW
```

toward the upper-left of the main conceptual area.

Place:

```text
SAVE FOR LATER
```

toward the upper-right of the main conceptual area.

Requirements:

- both labels visible from the choice build onward;
- inactive choice is dimmed;
- active choice is orange or white according to the deck hierarchy;
- do not place them inside cards;
- do not use large icons beside them;
- keep the centre available for the circuit.

## Circuit placement

Keep the Open Claim Circuit centred horizontally and around the middle of the slide.

Suggested logical placement:

- circuit centre around x=960;
- circuit baseline around y=520–560;
- choice labels around y=250–300;
- explanation/status around y=690–760;
- final statement around y=820–875.

Use the same node sizes, path style, labels, and typography established on 4.04.

## Spend examples

When demonstrating spending, show only a restrained set of final-goods silhouettes, such as:

- sneakers;
- steak;
- wine.

Requirements:

- small;
- neutral or subtly warm;
- unlabelled;
- clearly connected to the completed right node;
- subordinate to the circuit;
- disappear before the save state.

Do not create a product catalogue.

## Save timeline

When demonstrating saving, show a minimal forward-time path:

```text
NOW  ─────────────────────────  LATER
```

or an even more abstract temporal trajectory.

Requirements:

- extremely restrained;
- no calendar UI;
- no date cards;
- no clock icons;
- no 100-year labels yet;
- no year 2126 yet;
- no carrier shell.

The circuit may shift subtly rightward or the timeline may extend beneath it. Do not move the circuit so far that the composition loses balance.

## Final statement

Place:

```text
Spending closes the exchange.
Saving keeps it open.
```

centred near the bottom.

Preferred emphasis:

- `Spending closes the exchange.` in subdued white/grey;
- `Saving keeps it open.` in white with `keeps it open` or the full second sentence in orange.

Do not overuse orange. The open right node remains the primary orange visual.

---

# 6. Progressive builds

Implement exactly five cumulative states: build steps `0` through `4`.

Each build must reconstruct its complete target state deterministically. Do not assume the previous build ran.

## Build 0 — Begin with the open claim

Visible:

- kicker `SPEND OR SAVE`;
- Open Claim Circuit in the final open state from 4.04;
- `The exchange is still open.` may remain briefly or appear as a quiet inherited line;
- no choice labels yet;
- no goods;
- no timeline;
- no final summary.

The slide should feel continuous from 4.04.

## Build 1 — Reveal the two options

Reveal:

```text
SPEND NOW
```

and:

```text
SAVE FOR LATER
```

Requirements:

- both choices visible;
- neither is active yet;
- circuit remains open and unchanged;
- no cards or dividing line;
- no explanatory text yet.

If `The exchange is still open.` was inherited in Build 0, fade it out during this build.

## Build 2 — Demonstrate spending

Activate `SPEND NOW`.

Dim `SAVE FOR LATER`.

Transform the central circuit:

1. right node fills;
2. `PENDING` becomes `RECEIVED`;
3. restrained final-goods examples appear;
4. reveal:

```text
Redeem the claim now
```

5. reveal status:

```text
EXCHANGE CLOSED
```

Requirements:

- the completed circuit remains elegant;
- do not move the entire layout;
- do not add a success card;
- goods remain subordinate;
- no timeline visible.

## Build 3 — Demonstrate saving

Return the circuit to its open state deterministically.

Activate `SAVE FOR LATER`.

Dim `SPEND NOW`.

Requirements:

1. goods disappear;
2. right node becomes hollow again;
3. `RECEIVED` returns to `PENDING`;
4. reveal a restrained forward-time path;
5. move the circuit subtly forward or extend the path beneath it;
6. reveal:

```text
Carry the claim forward
```

7. reveal status:

```text
EXCHANGE REMAINS OPEN
```

Do not create a carrier shell.

Do not show 2126.

## Build 4 — Land the distinction

Keep the slide in the save state.

Keep:

- `SAVE FOR LATER` active;
- `SPEND NOW` subdued;
- right node hollow;
- timeline visible but quiet;
- status `EXCHANGE REMAINS OPEN`.

Reveal:

```text
Spending closes the exchange.
Saving keeps it open.
```

Requirements:

- final line becomes the concluding focal point;
- save state remains clearly active;
- spend state remains understandable from the dimmed label and final sentence;
- no duplicated circuits;
- final frame is clean and screenshot-ready.

---

# 7. Initial and final states

## Initial state

Visible:

- kicker;
- one central Open Claim Circuit in the open state;
- no fork yet.

This must feel like the immediate continuation of 4.04.

## Final state

Visible:

- kicker;
- both option labels;
- `SAVE FOR LATER` active;
- `SPEND NOW` subdued;
- Open Claim Circuit still open;
- restrained forward-time path;
- `Carry the claim forward`;
- `EXCHANGE REMAINS OPEN`;
- final statement:

```text
Spending closes the exchange.
Saving keeps it open.
```

Not visible:

- final-goods examples;
- spend-state `RECEIVED` label;
- `EXCHANGE CLOSED`;
- carrier shell;
- 100-Year Test;
- 2126.

The final frame must naturally prepare the next slide.

---

# 8. Transition from slide 4.04

Do not redesign slide 4.04.

Preferred continuation:

1. 4.04 headline fades;
2. wider-market field fades;
3. supporting market text fades;
4. `The exchange is still open.` remains briefly;
5. the Open Claim Circuit stays in place;
6. 4.05 kicker and choice labels appear.

Use the existing `continuesFrom` mechanism only if it preserves the approved circuit reliably.

If not, use matching geometry and a clean crossfade.

Do not modify 4.04 merely to force technical continuity.

---

# 9. Transition into slide 4.06

Do not implement or redesign slide 4.06.

Leave 4.05 in the save state.

The intended later handoff is:

- choice labels fade;
- final summary fades;
- timeline remains briefly;
- Open Claim Circuit stays open and central;
- the next slide introduces:

```text
The claim on value is the essence of money.
But an abstract claim still needs a body—
something capable of carrying it across people, places and time.
```

Do not show this copy during 4.05.

Do not add the carrier shell during 4.05.

---

# 10. Implementation constraints

Modify only:

- the slide 4.05 module;
- slide 4.05-specific CSS/selectors;
- slide 4.05 speaker notes;
- the approved Open Claim Circuit component only if a minimal extension is required to expose:
  - open state;
  - closed/received state;
  - deterministic reset;
  - subtle forward-time translation.

Any component change must preserve slide 4.04 exactly.

Do not:

- modify slide 4.01;
- modify slide 4.02;
- modify slide 4.03;
- visually alter slide 4.04;
- modify the slide engine;
- add dependencies;
- create a generic branching framework;
- create two independent permanent circuit copies;
- implement carrier-shell behavior;
- implement the 100-Year Test;
- run `npm audit fix`;
- leave obsolete 4.05 styles or DOM.

## Circuit component extension

If extending the Open Claim Circuit:

- keep the API narrow;
- preserve all existing 4.04 defaults;
- add only the state controls required by this slide;
- ensure every state is deterministic;
- ensure backwards navigation works;
- clean up timelines, delayed calls, and transforms;
- respect reduced motion;
- avoid embedding slide-specific text inside a generic component unless that is already the approved component convention.

---

# 11. Required self-review before completion

Before reporting completion, verify:

1. Does the slide clearly present only two choices?
2. Is the same claim used for both scenarios rather than visually duplicated?
3. Does spending visibly fill the pending node?
4. Does the spend state clearly read as `EXCHANGE CLOSED`?
5. Does saving restore the hollow pending node?
6. Does the save state clearly read as `EXCHANGE REMAINS OPEN`?
7. Is the time path restrained and free of carrier or 100-year concepts?
8. Does no text overlap any circuit element?
9. Does the layout remain stable across all builds?
10. Is the final state clearly focused on saving?
11. Does the final sentence land cleanly?
12. Is slide 4.04 visually unchanged?
13. Are slides 4.01–4.03 visually unchanged?
14. Are the speaker notes exactly aligned with the approved narrative?
15. Is the final Open Claim Circuit ready for the later claim/carrier slide?
16. Does backward navigation reconstruct both spend and save states correctly?

Correct any failure before reporting completion.

---

# 12. Validation

After implementation:

1. Run `npm run build`.
2. Run `git diff --check`.
3. Inspect the full diff for every changed file.
4. Open slide 4.05 directly.
5. Inspect builds 0, 1, 2, 3, and 4 individually at 1920×1080.
6. Inspect the final frame at the actual recording viewport.
7. Test forward and backward builds repeatedly.
8. Test force-next and force-previous.
9. Refresh at build 2, build 3, and build 4 and confirm restoration.
10. Test reduced-motion mode.
11. Verify notes overlay and second-window notes.
12. Navigate 4.04 → 4.05 and back repeatedly.
13. Confirm slides 4.01–4.04 are visually unchanged.
14. Keep the browser console open and confirm no errors.
15. Search active source/CSS for:
    - duplicated circuit implementations;
    - obsolete spend/save copy;
    - card-based option layouts;
    - carrier-shell logic;
    - 2126 or 100-year content;
    - `L1:` artifacts.

Stop after slide 4.05 is complete. Do not implement or redesign any other slide.

---

# 13. Completion report

Report:

## Implemented

- concise summary of the new 4.05;
- confirmation that no other slide was redesigned.

## Files changed

- file-by-file list;
- exact Open Claim Circuit component changes, if any;
- confirmation that slide 4.04 retains its original appearance.

## Validation

- commands and browser checks actually performed;
- build result;
- console result;
- reduced-motion result;
- notes result;
- backward-navigation and restoration results.

## Review access

- exact local direct URL/deep link for slide 4.05;
- instructions for viewing every build state if needed.

## Remaining judgment calls

- only issues that genuinely require human visual review.

End with one recommended next action only.
