> **Build prompt, executed — archived, not authoritative.** ChatGPT/Codex-era working material for the original Section 4 build.
> Superseded by `docs/what-is-money-master.md` and `docs/synthesis-architecture.md` (Stage 0, 25 August 2026). Nothing here governs.

# Codex Task — Rebuild Slide 4.03 Only

Read and follow these files first:

- `AGENTS.md`
- `docs/section-4-master-brief.md`
- `PLANS.md`

This task-specific prompt is the binding source of truth for slide **4.03** and overrides any conflicting earlier implementation detail for that slide.

## Task boundary

Rebuild **slide 4.03 only** from scratch.

Preserve without visual or narrative changes:

- slide 4.01;
- slide 4.02;
- slide 4.04;
- Sections 1–3;
- the close slide;
- all approved baseline fixes;
- the validated `SlideEngine` continuation fix.

Do not implement any later Section 4 slide.

Remove the current rejected 4.03 implementation, including:

- the crude code-drawn operating-theatre illustration;
- all capability labels positioned over or around that illustration;
- the overlapping arrow;
- the existing slide-specific CSS and animation logic that are no longer used;
- stale or superseded speaker-note wording.

Do not leave dead selectors, unused DOM, or alternate prototypes behind.

---

# 1. Purpose of slide 4.03

This slide introduces one concrete example of money being earned.

It must establish:

1. A surgeon performs one hour of surgery.
2. The service is exchanged for `$400`.
3. The market is not paying merely for the passage of one generic hour.
4. The service combines scarce and specialised capabilities:
   - specialised skill;
   - scarce knowledge;
   - years of training;
   - professional judgment;
   - dexterity;
   - responsibility.
5. The slide ends with the unresolved question:
   `What did he actually receive?`

Do not answer that question on slide 4.03. The answer belongs to slide 4.04.

The logical movement is:

> a concrete service  
> → what makes it specialised  
> → the agreed exchange price  
> → the unresolved nature of what money represents.

---

# 2. Speaker notes

Use this script closely and naturally. Do not add new economic theory or a subjective-value detour.

> Imagine that a surgeon performs one hour of surgery and receives four hundred dollars in exchange.
>
> What the market was paying for was not simply the passage of an hour. It was the specialised service delivered during it: a rare combination of specialised skill, scarce knowledge, years of training, professional judgment, dexterity and responsibility.
>
> That is why this hour of surgery is exchanged for four hundred dollars.
>
> But now look at what the surgeon receives in return.
>
> What did he actually receive?

End with this transition:

> To understand that, notice what he did not receive.

Do not include:

- language implying that one hour of labour objectively creates `$400` of value;
- the patient-versus-surgeon preference aside;
- a long explanation of Austrian subjective-value theory;
- any answer to the final question;
- stale `L1:` transcript markers;
- references to the rejected visual layout.

---

# 3. Visible text

The slide may display only the following text.

## Kicker

```text
A SIMPLE EXAMPLE
```

## Headline

```text
1 HOUR OF
SPECIALISED SURGERY
```

`SPECIALISED SURGERY` should carry the visual emphasis.

## Capability labels

```text
Specialised skill
Scarce knowledge
Years of training
Professional judgment
Dexterity
Responsibility
```

## Exchange result

Small label:

```text
RECEIVED IN EXCHANGE
```

Main amount:

```text
$400
```

## Final question

```text
What did he actually receive?
```

Do not add:

- an arrow with text running through it;
- `What the hour contains`;
- explanatory paragraphs;
- extra headings;
- icons beside every capability;
- labels over the image.

---

# 4. Required image asset

This slide must use a high-quality externally supplied image.

Expected path:

```text
assets/images/surgeon_exchange.png
```

Expected `src/assets.js` export:

```js
surgeonExchange
```

If the asset does not exist:

- stop before implementing the slide;
- report the missing asset;
- do not create a CSS/SVG operating-theatre illustration;
- do not use a generic icon;
- do not use a temporary stock placeholder;
- do not hotlink an external image.

## Image specification

The supplied image should be:

- a premium cinematic editorial image;
- an anonymous surgeon in a modern operating theatre;
- viewed from behind or at a three-quarter angle;
- no identifiable face;
- no visible blood or graphic medical content;
- no readable branding, text, hospital logo, or device UI;
- dark black and charcoal environment;
- restrained warm amber / Bitcoin-orange surgical light;
- sophisticated documentary or high-end magazine aesthetic;
- realistic or subtly stylised, not cartoon-like;
- enough negative space and dark falloff to blend into the deck;
- portrait or near-portrait composition suitable for the left side of a 16:9 slide;
- visually credible at 1920×1080.

Codex must treat this as a photographic/editorial asset and compose around it. It must not attempt to redraw it.

---

# 5. Visual composition

Use a disciplined two-column composition on the logical 1920×1080 stage.

## Overall grid

Recommended geometry, adjusted only where existing safe-zone tokens require it:

- outer horizontal margin: approximately 120 px;
- top kicker baseline: approximately 72–90 px;
- image column: approximately 660–720 px wide;
- gutter between image and content: approximately 100–130 px;
- content column: approximately 700–760 px wide;
- keep all important content within the established title and projection safe zones.

The slide must feel balanced as a still image before any animation is added.

## Left column — image

Place `surgeon_exchange.png` on the left.

Recommended treatment:

- crop into a tall editorial frame, approximately 680×740 px;
- position around x=120, y=165;
- use `object-fit: cover`;
- use a subtle dark gradient overlay at the right edge so the image blends into the black slide;
- optional extremely restrained border or hairline only if this matches the existing deck;
- no orange frame;
- no rounded-card treatment unless existing section imagery uses it;
- no capability text on top of the image;
- no arrows crossing the image.

The image should be visually strong but not brighter than `$400`.

## Right column — headline and capabilities

Place the headline at the top of the right column.

Suggested hierarchy:

```text
1 HOUR OF
SPECIALISED SURGERY
```

- `1 HOUR OF` smaller and quieter;
- `SPECIALISED SURGERY` larger;
- `SPECIALISED` may use the orange accent;
- keep the phrase to two clean lines;
- do not use excessive letter spacing.

Below the headline, place the six capability labels in a strict 2-column × 3-row grid.

Suggested pairing:

| Left column | Right column |
|---|---|
| Specialised skill | Scarce knowledge |
| Years of training | Professional judgment |
| Dexterity | Responsibility |

Requirements:

- labels must never overlap the image;
- labels must never overlap one another;
- use consistent column widths;
- use consistent row spacing;
- align text cleanly;
- use small restrained orange markers or short dashes only if they improve hierarchy;
- no cards;
- no floating annotations;
- no connector lines;
- no icon per capability.

The capability grid should read as one coherent supporting block.

## Exchange result

Below the capability grid, create a separate clean result block.

Small label:

```text
RECEIVED IN EXCHANGE
```

Then:

```text
$400
```

Requirements:

- `$400` large and orange;
- visually distinct from the capability block;
- no long arrow;
- no line passing through text;
- no label overlapping `$400`;
- use spacing and hierarchy to communicate exchange rather than a literal arrow.

A short restrained horizontal hairline may sit beside or above the result label, but it must not connect through the capability text.

## Final question

Place:

```text
What did he actually receive?
```

near the lower part of the right column.

Requirements:

- white;
- large enough to become the final focal point;
- left-aligned with the right-column content or centred within the right column;
- never overlap the image or `$400`;
- remain within the bottom safe zone;
- no underline;
- no decorative box.

---

# 6. Progressive builds

Implement exactly five cumulative states: build steps `0` through `4`.

Each state must reconstruct its full target state deterministically.

## Build 0 — Introduce the example

Visible:

- kicker `A SIMPLE EXAMPLE`;
- surgeon image;
- headline:
  `1 HOUR OF`
  `SURGERY`

At this stage:

- do not show `$400`;
- do not show capability labels;
- do not show the final question;
- `SURGERY` is white;
- image is clearly visible.

## Build 1 — Reveal specialisation

Change the headline to:

```text
1 HOUR OF
SPECIALISED SURGERY
```

Requirements:

- add `SPECIALISED` without reflowing the entire composition awkwardly;
- `SPECIALISED` changes to orange;
- the headline remains in its fixed content area;
- no sudden horizontal jump;
- no overlap.

## Build 2 — Reveal the capabilities

Reveal the six labels as one disciplined grid.

Preferred reveal:

- first row, then second row, then third row within one build;
- use a subtle stagger if desired;
- total animation should remain brief;
- all labels are readable in the final state.

Do not position labels around the image.

Do not animate connector lines.

## Build 3 — Reveal the exchange price

Reveal:

```text
RECEIVED IN EXCHANGE
$400
```

Requirements:

- `$400` becomes the strongest orange element on the slide;
- no arrow is required;
- image, headline, and capabilities remain visible;
- the layout must not move to make space;
- the result block must already have reserved space in earlier states.

## Build 4 — Ask the unresolved question

Reveal:

```text
What did he actually receive?
```

At the same time:

- dim the capability grid to approximately 30–40% opacity;
- dim the image slightly, but keep it legible;
- keep `$400` at full orange emphasis;
- keep the headline visible at a quieter level;
- do not remove everything except `$400`;
- do not create the current weak intermediate frame with a tiny dark surgery diagram and floating product icons.

The final state should clearly direct attention to:

1. `$400`;
2. `What did he actually receive?`

---

# 7. Initial and final states

## Initial state

Visible:

- `A SIMPLE EXAMPLE`;
- premium surgeon image;
- `1 HOUR OF SURGERY`.

The slide should already look complete and polished as a static frame.

## Final state

Visible:

- image, slightly dimmed;
- `1 HOUR OF SPECIALISED SURGERY`, quieter;
- capability grid, subdued;
- `RECEIVED IN EXCHANGE`;
- `$400` in strong orange;
- `What did he actually receive?` in white.

Nothing overlaps.

The final state must work as a polished standalone screenshot and create a strong handoff to slide 4.04.

---

# 8. Transition from slide 4.02

Do not modify slide 4.02.

A clean fade into the image and kicker is acceptable.

If slide 4.02 currently leaves a thin orange line during exit, it may visually align with the kicker’s short orange line, but do not use shared DOM or alter 4.02 merely to force this.

---

# 9. Transition into slide 4.04

Do not redesign slide 4.04 in this task.

On exit from 4.03:

- keep `$400` visually dominant until late in the transition;
- allow the image, headline, and capability grid to recede first;
- allow the final question to fade;
- hand `$400` into the current 4.04 transition only if this can be done without modifying 4.04;
- otherwise use a clean fade.

Do not add sneakers, steak, wine, or other final goods to 4.03. Those concepts belong to 4.04.

Do not modify 4.04 to create a complex transition in this task.

---

# 10. Implementation constraints

Modify only:

- the slide 4.03 module;
- slide 4.03-specific CSS/selectors;
- slide 4.03 speaker notes;
- `src/assets.js` only to export `surgeonExchange` if the image asset exists and is not already exported.

Do not:

- modify slide 4.01;
- modify slide 4.02;
- modify slide 4.04;
- modify the manifest order or active slide set unless strictly required to keep the existing reviewed sequence functional;
- add dependencies;
- create or generate the surgery image;
- create a new general-purpose scene framework;
- change global typography;
- modify the slide engine;
- run `npm audit fix`;
- leave the rejected surgery SVG or its styles active.

Prefer straightforward DOM and CSS. This slide does not need a new reusable component unless the image-frame treatment already exists in the repository.

---

# 11. Required self-review before completion

Before reporting completion, verify:

1. Is the old crude operating-theatre drawing completely removed?
2. Is the supplied image high-resolution and correctly cropped?
3. Are all capability labels outside the image?
4. Is the capability grid aligned in exactly two columns and three rows?
5. Does no text overlap another element at any build?
6. Is there no arrow crossing text?
7. Is `$400` visually strong without unbalancing the slide?
8. Does the layout remain fixed when later builds appear?
9. Does the final question become the focal point without reducing the slide to an empty weak frame?
10. Is the final frame suitable as a polished screenshot?
11. Are speaker notes aligned exactly with the approved narrative?
12. Were slides 4.01, 4.02, and 4.04 left visually unchanged?

Correct any failure before reporting completion.

---

# 12. Validation

After implementation:

1. Run `npm run build`.
2. Run `git diff --check`.
3. Inspect the full diff for every changed file.
4. Open slide 4.03 directly.
5. Inspect builds 0, 1, 2, 3, and 4 individually at 1920×1080.
6. Inspect the final frame at the actual recording viewport.
7. Test forward and backward builds.
8. Test force-next and force-previous.
9. Refresh at a nonzero build step and confirm restoration.
10. Test reduced-motion mode.
11. Verify notes overlay and second-window notes.
12. Navigate 4.02 → 4.03 → 4.04 and back.
13. Confirm slides 4.01, 4.02, and 4.04 are visually unchanged.
14. Keep the browser console open and confirm no errors.
15. Search active source/CSS for:
    - the rejected surgery SVG;
    - old annotation positioning;
    - the overlapping arrow;
    - obsolete slide 4.03 selectors;
    - `L1:` artifacts.

Stop after slide 4.03 is complete. Do not redesign any other slide.

---

# 13. Completion report

Report:

## Implemented
- concise summary of the rebuilt 4.03;
- confirmation that no other slide was redesigned.

## Files changed
- file-by-file list.

## Asset status
- exact image path used;
- export used from `src/assets.js`;
- confirmation that no substitute drawing or hotlinked asset was used.

## Validation
- commands and browser checks actually performed;
- build result;
- console result;
- reduced-motion result;
- notes result.

## Review access
- exact local direct URL/deep link for slide 4.03;
- instructions for viewing every build state if needed.

## Remaining judgment calls
- only issues that genuinely require human visual review.

End with one recommended next action only.
