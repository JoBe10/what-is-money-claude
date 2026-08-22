# Codex Task — Final Art-Direction Refinement for Slides 4.04–4.07

Read and follow these files first:

- `AGENTS.md`
- `PLANS.md`
- `docs/section-4-master-brief.md`
- `docs/section-4-narrative-master-document.md`
- `docs/codex-rebuild-section-4-04-to-4-07-object-system.md`

This task-specific brief is the binding source of truth for the refinement pass described below. It supersedes conflicting visual instructions for slides **4.04–4.07**, while preserving the approved narrative and the successful object-based redesign.

This is **not** a fresh redesign. The object-based direction is approved and is a major improvement. The purpose of this task is to make the remaining art-direction refinements so that every build state feels balanced, symmetrical, premium, and presentation-ready.

---

# 1. Scope

Refine:

- slide 4.04;
- slide 4.05;
- slide 4.06;
- slide 4.07;
- the narrowly scoped shared components used by those slides;
- the presentation’s canonical orange accent token(s), as described below;
- asset exports required for the carrier images.

Do not change:

- the narrative logic;
- the approved speaker-note meaning;
- slide order;
- slide-engine behavior;
- Sections 1–3 layout or content;
- slide 4.01–4.03 layout or content;
- slide 4.08 or later slides;
- unrelated components;
- global typography;
- dependencies.

The only allowed presentation-wide visual change is the controlled correction of the canonical accent hue from yellow-amber toward Bitcoin orange. No layouts or content outside 4.04–4.07 may be redesigned.

Do not run `npm audit fix`.

---

# 2. Preserve what is already working

The following elements are approved and should remain:

- the premium surgeon image and its crop;
- the overall black-background editorial aesthetic;
- the object-based conceptual system;
- the use of individual sneaker, steak, and wine image assets;
- the “Spend now” destination composition;
- the “Save for later” destination composition;
- the broad narrative sequence:
  - `$400`;
  - earned transferable claim;
  - spend or save;
  - claim and carrier;
  - store-of-value function;
- the existing Section 4 kicker convention;
- the final narrative statements and speaker-note logic.

Do not reintroduce:

- the old large orange unfinished-exchange arc;
- persistent `VALUE PROVIDED`, `COMPLETE`, `FINAL COUNTER-VALUE`, `PENDING`, or `TRANSFERABLE CLAIM` annotations;
- market-dot constellations;
- weak line-art goods icons;
- generic Codex-generated carrier icons;
- dense explanatory diagrams.

---

# 3. Required asset preflight

Before editing, verify the following existing goods assets:

```text
assets/images/spend_now_goods_sneaker.png
assets/images/spend_now_goods_steak.png
assets/images/spend_now_goods_wine.png
```

Verify the following new carrier assets:

```text
assets/images/carrier_shells.png
assets/images/carrier_gold.png
assets/images/carrier_paper.png
assets/images/carrier_bank_ledgers.png
assets/images/carrier_bitcoin.png
```

Expected exports in `src/assets.js`:

```js
spendNowGoodsSneaker
spendNowGoodsSteak
spendNowGoodsWine

carrierShells
carrierGold
carrierPaper
carrierBankLedgers
carrierBitcoin
```

Inspect:

- file existence;
- dimensions;
- transparency or black-background treatment;
- crop safety;
- visual consistency;
- whether each asset reads clearly at a small size.

## Missing-asset behavior

The five carrier assets are required for the intended final treatment.

If any carrier asset is missing:

1. stop before editing;
2. report the exact missing path;
3. do not create a generic icon replacement;
4. do not silently fall back to the existing text-only row;
5. do not hotlink an external image.

If all assets exist, proceed.

---

# 4. Controlled Bitcoin-orange correction

The current accent reads too yellow. Correct the presentation’s canonical accent system so the primary hue reads as **Bitcoin orange**, while preserving the premium editorial tone.

## 4.1 Canonical primary accent

Use:

```css
#F7931A
```

as the canonical primary Bitcoin-orange accent, unless the repository already has a single canonical token whose naming should be preserved. Update the token value rather than scattering hardcoded replacements.

Examples of acceptable token mapping:

```css
--accent: #F7931A;
--bitcoin-orange: #F7931A;
```

Do not create competing orange tokens without a clear purpose.

## 4.2 Supporting orange treatments

Use softer variations for glow, ambient lines, and low-emphasis states:

```css
rgba(247, 147, 26, 0.08)
rgba(247, 147, 26, 0.16)
rgba(247, 147, 26, 0.28)
rgba(247, 147, 26, 0.45)
```

Use the solid primary orange only for:

- key emphasized words;
- the claim object;
- active branch paths;
- primary kicker accents;
- decisive conclusions.

Do not turn every label orange.

## 4.3 Presentation-wide rule

The hue correction may propagate to earlier slides through the canonical accent token.

That is intentional.

However:

- do not change any earlier layout;
- do not change typography;
- do not alter image color grading;
- do not recolor photographs;
- do not introduce a new saturated-orange glow everywhere;
- do not replace subtle neutral greys with orange.

The result should read more clearly as Bitcoin orange, not more loudly as “crypto branding.”

---

# 5. Refine the recurring claim object

The object-based system is approved. The current claim object is not yet refined enough.

The current form reads too much like a right-pointing tag or directional token. It also inherits the yellow accent issue.

Replace it with a more elegant, symmetrical, direction-neutral **claim marker**.

## 5.1 Concept

The claim object represents:

```text
an earned, transferable claim on value
```

It must feel like:

- a premium bearer marker;
- an abstract claim chip;
- a refined value token;
- a purposeful recurring symbol.

It must not feel like:

- a price tag;
- an arrow;
- a coin;
- a banknote;
- a Bitcoin logo;
- a battery;
- a pill;
- a crypto-app badge;
- a generic glowing orb;
- a button.

Do not replace it with an AI-generated raster image. It must remain vector/code-based for clean animation and visual consistency.

## 5.2 Exact geometry

Use a horizontally symmetrical faceted lozenge.

At the logical 1920×1080 stage, use an approximate base bounding box of:

```text
width: 168–184 px
height: 68–76 px
```

Geometry requirements:

- left and right ends are exact mirrors;
- both ends use matching chamfers;
- no directional point;
- horizontal centre axis is exact;
- vertical centre axis is exact;
- outline and inset contour are symmetrical;
- no asymmetrical notch that implies movement.

Suggested structure:

1. outer faceted orange body;
2. one thin lighter-orange inset contour;
3. one subtle inner neutral/orange contour;
4. restrained top-edge highlight;
5. extremely soft shadow/glow.

The object should be recognisable when shown at 65–75% scale.

## 5.3 Color and material

Use:

- primary body: `#F7931A`;
- subtle lighter highlight derived from the same hue;
- subtle darker edge derived from the same hue;
- no yellow fill;
- no white-hot centre;
- no heavy bloom.

The surface may feel lightly dimensional but must remain compatible with the deck’s clean visual language.

## 5.4 Component behavior

Preserve or refine the existing narrowly scoped `ClaimObject` component.

It must support:

- neutral centred state;
- travel left;
- reset to centre;
- travel right;
- carried state inside the carrier shell;
- deterministic build restoration;
- reduced motion;
- clean cleanup of transforms and timelines.

The same exact geometry must appear across 4.04–4.07.

---

# 6. Slide 4.04 refinements

## 6.1 Goods image size

On the build where the sneaker, steak, and wine appear beside the question:

```text
What does the $400 actually represent?
```

reduce the goods to approximately **50% of their current visual size**.

Interpret this as roughly:

- 45–52% of the current rendered width/height;
- 25% of the current visual area per object;
- enough to remain immediately recognisable;
- clearly subordinate to the question and `$400`.

Do not simply scale the full group from the top-left. Recompose the cluster after scaling.

## 6.2 Goods composition

Keep a compact triangular editorial composition on the right:

- sneaker: upper-left of the goods cluster;
- wine: upper-right or right edge;
- steak: lower-centre.

Requirements:

- the three objects must not touch;
- no rigid cards;
- no visible boxes;
- consistent black falloff around each asset;
- no labels;
- no line icons;
- no crosses;
- no “not received” stamp;
- no market dots.

The cluster should occupy approximately the far-right 28–32% of the slide, leaving clear space around `$400`.

## 6.3 Hierarchy

The hierarchy must be:

1. question;
2. `$400`;
3. surgeon image;
4. goods examples.

The goods are supporting examples, not the main subject.

## 6.4 Final claim reveal

In the final 4.04 build:

- use the refined symmetrical claim object;
- use corrected Bitcoin orange;
- preserve the clean two-line reveal:

```text
AN EARNED, TRANSFERABLE
CLAIM ON VALUE
```

The final frame should remain dramatically simpler than the goods frame.

The surgeon image may remain only as an extremely faint continuity trace if currently used. It must not compete with the claim reveal.

---

# 7. Slide 4.05 — perfectly symmetrical fork

The current fork geometry is not symmetrical. Fix it exactly.

## 7.1 Core rule

The neutral decision state must be built from one central claim object and two geometrically mirrored paths.

Do not eyeball the geometry.

Use one path definition and mirror it mathematically for the opposite side, or derive both from a single coordinate model.

## 7.2 Recommended logical geometry

At the logical 1920×1080 stage:

```text
claim centre: x = 960
claim centre: y = approximately 500
```

Each branch should use the same segments in mirrored order.

Example geometry:

```text
central horizontal segment: 100–120 px
diagonal segment: 165–190 px horizontal / 80–95 px vertical
outer horizontal segment: 175–210 px
```

The left and right branch endpoints must satisfy:

```text
leftX = centreX - distance
rightX = centreX + distance
leftY = rightY
```

Both branches must have:

- identical total path length;
- identical line thickness;
- identical corner treatment;
- identical opacity;
- identical vertical displacement;
- identical endpoint treatment;
- identical spacing from their headings.

## 7.3 Directional treatment

In the neutral choice state:

- neither branch should look more directional than the other;
- avoid an arrowhead on only one branch;
- either use no arrowheads in the neutral state or use identical subtle endpoint cues on both paths.

During the active state:

- the claim object itself communicates movement;
- the path may change to Bitcoin orange;
- do not add a large arrowhead.

## 7.4 Heading alignment

`SPEND NOW` and `SAVE FOR LATER` must be:

- aligned on the same baseline;
- equidistant from the slide centre;
- placed above their corresponding destination zones;
- identical in size and weight;
- neutral in the fork build;
- active orange only when selected.

## 7.5 Destination states

Preserve the successful compositions of:

- Spend now;
- Save for later.

Only update them to inherit:

- the refined claim object;
- the corrected orange;
- the mathematically mirrored path system;
- consistent heading alignment.

### Spend state

Keep:

- premium goods cluster;
- `Redeem the claim now`;
- `EXCHANGE CLOSED`.

The claim may move left and dissolve/redeem into the goods.

### Save state

Keep:

- claim object carried to the right;
- `Carry the claim forward`;
- `EXCHANGE REMAINS OPEN`.

The claim remains visible.

Do not redesign either state beyond the refinements required above.

## 7.6 Navigation and restoration

The same symmetrical geometry must remain correct when:

- moving forward;
- moving backward;
- refreshing at a spend build;
- refreshing at a save build;
- using force-next;
- using force-previous;
- using reduced motion.

---

# 8. Slide 4.06 — remove the weak opening build

The current introductory build containing mostly empty space, a long line, and the claim object sitting toward the right does not add conceptual or visual value.

Remove it.

Do not merely shorten its duration. Remove the state from the build sequence.

## 8.1 New opening build

The first displayed state of slide 4.06 must already be strong and complete.

Visible immediately:

### Kicker

```text
THE CLAIM AND ITS CARRIER
```

### Main statement

```text
The claim on value is the essence of money.
```

Preferred emphasis:

- sentence in white;
- `essence of money` or only `essence` in Bitcoin orange.

### Visual

- refined claim object centred below the statement;
- no long residual line;
- no object floating near the right edge;
- no empty transitional composition;
- no carrier shell yet;
- no historical assets yet.

The claim object should sit on the slide’s central vertical axis.

## 8.2 Revised build sequence

Use exactly five meaningful states: `0` through `4`.

### Build 0 — Essence

Visible:

- kicker;
- `The claim on value is the essence of money.`;
- centred refined claim object.

### Build 1 — Need for embodiment

Reveal:

```text
But an abstract claim still needs a body—
something capable of carrying it across people, places and time.
```

Requirements:

- keep the claim object centred;
- do not add literal people/place/time icons;
- preserve generous black space.

### Build 2 — Carrier formation

Form the refined carrier shell around the claim object.

Reveal:

```text
THE MONETARY MEDIUM
THE CARRIER
```

Preferred hierarchy:

- first line small and neutral;
- second line larger and Bitcoin orange.

### Build 3 — Historical carriers

Reveal the five carrier micro-renders and labels along the bottom:

- shells;
- gold;
- paper;
- bank ledgers;
- Bitcoin.

### Build 4 — Final distinction

Dim the carrier row slightly.

Reveal:

```text
The claim is the essence.
The monetary asset is the carrier.
```

Highlight only:

- `essence`;
- `carrier`.

Do not add another empty transition build before or after these states.

---

# 9. Refine the carrier shell

Preserve the object-inside-shell idea, but make sure the shell remains elegant.

Requirements:

- claim object remains clearly visible;
- shell is direction-neutral;
- shell is symmetrical or deliberately balanced;
- neutral warm-grey line treatment;
- no orange shell fill;
- no vault, battery, capsule, wallet, safe, or sci-fi-pod appearance;
- no oversized contour;
- no heavy glow.

The carrier shell should visually read as:

```text
body / embodiment / medium
```

not protection or imprisonment.

---

# 10. Carrier micro-render row

Replace the text-only carrier row with five premium image-and-label items.

## 10.1 Assets

Use:

```text
carrier_shells.png
carrier_gold.png
carrier_paper.png
carrier_bank_ledgers.png
carrier_bitcoin.png
```

## 10.2 Layout

Use five equal-width slots in a single horizontal row.

Suggested logical region:

```text
x: approximately 300–1620
y: approximately 710–825
```

Each slot contains:

1. a small image;
2. a restrained uppercase label beneath it.

Labels:

```text
SHELLS
GOLD
PAPER
BANK LEDGERS
BITCOIN
```

## 10.3 Image sizing

Use equal visual boxes, not equal raw pixel dimensions.

Suggested maximum rendered image box:

```text
width: 105–125 px
height: 72–92 px
```

Use:

```css
object-fit: contain;
```

Normalize optical size manually where necessary so one object does not dominate.

The five images must feel like members of one curated set.

## 10.4 Styling

- no cards;
- no visible image boxes;
- no borders;
- no generic code-drawn icons;
- no additional orange glow added if the images already contain rim light;
- labels in restrained neutral grey;
- Bitcoin must not be uniquely highlighted;
- keep the entire row secondary to the central claim/carrier visual.

## 10.5 Reveal

Use a subtle stagger from left to right.

Total stagger duration must remain restrained.

Do not animate each object dramatically.

---

# 11. Slide 4.07 preservation and minor propagation

The remainder of slide 4.07 is already working well.

Do not redesign it.

Only propagate:

- refined claim object;
- refined carrier shell;
- corrected Bitcoin orange;
- any shared sizing adjustments required for consistency.

Preserve:

- the `NOW → LATER` concept;
- integrity;
- usability;
- final definition;
- current narrative and build logic.

Do not reintroduce market dots.

---

# 12. Speaker notes

Do not rewrite the narrative.

Only update notes if required to remove references to a deleted build state or obsolete visual.

In particular:

- remove any note that instructs the presenter to wait for or refer to the deleted empty 4.06 opening state;
- preserve the meaning and wording of the approved narrative;
- do not introduce new theory;
- remove stale visual-description notes;
- remove obsolete `L1:` transcript markers if any remain.

---

# 13. Motion

Use restrained motion only.

Allowed:

- opacity;
- clean claim translation;
- one-time path drawing;
- subtle image fade/drift;
- shell formation;
- light stagger.

Avoid:

- bounce;
- spring motion;
- spinning;
- pulsing loops;
- particles;
- heavy bloom;
- dramatic blur;
- competing simultaneous animation;
- decorative motion without narrative purpose.

Suggested timing:

```text
standard reveal: 350–500 ms
claim travel: 550–700 ms
shell formation: 500–700 ms
carrier-row stagger total: 500–700 ms
```

Respect reduced motion.

---

# 14. Deterministic implementation requirements

Every build must reconstruct its complete target state.

Do not depend on mutation from the immediately prior build.

Verify:

- backward navigation;
- forward navigation;
- refresh restoration;
- force-next;
- force-previous;
- reduced motion;
- cleanup of GSAP timelines;
- cleanup of delayed calls;
- cleanup of transforms;
- no stale active-path state;
- no stale goods state;
- no stale carrier-row state.

---

# 15. Files allowed to change

Modify only what is necessary among:

- slide 4.04 module;
- slide 4.05 module;
- slide 4.06 module;
- slide 4.07 module;
- their narrowly scoped CSS;
- `ClaimObject`;
- `CarrierShell`;
- `src/assets.js`;
- the canonical accent token definition;
- slide 4.04–4.07 speaker notes;
- minimal test or snapshot files directly affected by these refinements.

Do not modify:

- slide 4.01–4.03 structure or copy;
- slide 4.08 or later;
- unrelated slide modules;
- slide engine;
- global fonts;
- dependencies;
- unrelated documentation.

---

# 16. Required visual self-review

Before reporting completion, inspect every affected build at 1920×1080.

## Accent

1. Does the primary accent now read as Bitcoin orange rather than yellow?
2. Does the presentation still feel premium rather than over-saturated?
3. Were photographs left untouched?
4. Did earlier slides inherit only the intended hue correction?

## Slide 4.04

5. Are the goods approximately half their former size?
6. Is the goods cluster compact and balanced?
7. Does `$400` clearly dominate the examples?
8. Is the final claim reveal clean and uncluttered?

## Claim object

9. Is it perfectly symmetrical?
10. Is it direction-neutral?
11. Does it avoid looking like a tag, arrow, coin, battery, or pill?
12. Is it recognisably the same object across all four slides?
13. Does it remain legible at smaller scales?

## Slide 4.05

14. Are the two fork paths exact mirrors?
15. Are the headings aligned symmetrically?
16. Does neither neutral branch look more active?
17. Does the spend state preserve its successful composition?
18. Does the save state preserve its successful composition?
19. Does the corrected geometry persist during backward navigation?

## Slide 4.06

20. Is the weak empty opening state fully removed?
21. Does the first build immediately feel strong?
22. Is the claim centred beneath the essence statement?
23. Does the carrier form clearly around the claim?
24. Are the five carrier images subtle and evenly balanced?
25. Are labels aligned consistently?
26. Is Bitcoin not prematurely highlighted?
27. Does the final distinction remain the focal point?

## Slide 4.07

28. Does the refined object propagate cleanly?
29. Does the refined carrier shell propagate cleanly?
30. Is the existing slide otherwise preserved?

## Preservation

31. Are slides 4.01–4.03 structurally unchanged?
32. Is slide 4.08 untouched?
33. Are Sections 1–3 free of layout regressions?
34. Is every intermediate build screenshot-ready?

Correct any failed item before reporting completion.

---

# 17. Validation

After implementation:

1. Run `npm run build`.
2. Run `git diff --check`.
3. Inspect the full diff for every changed file.
4. Confirm all five carrier assets load.
5. Inspect all builds of slide 4.04 at 1920×1080.
6. Inspect all builds of slide 4.05 at 1920×1080.
7. Inspect all builds of slide 4.06 at 1920×1080.
8. Inspect all builds of slide 4.07 at 1920×1080.
9. Inspect the affected slides at the actual recording viewport.
10. Navigate 4.03 → 4.04 → 4.05 → 4.06 → 4.07 repeatedly.
11. Navigate backward through the same sequence repeatedly.
12. Refresh at nonzero build states on each affected slide.
13. Test force-next and force-previous.
14. Test reduced-motion mode.
15. Verify notes overlay.
16. Verify second-window notes.
17. Keep the browser console open and confirm no errors.
18. Confirm slide 4.08 remains untouched.
19. Search the source for:
    - old yellow hardcoded accent values;
    - asymmetric claim-object geometry;
    - old asymmetric fork paths;
    - the deleted 4.06 opening build;
    - generic carrier icons;
    - unused text-only carrier-row code;
    - obsolete `L1:` notes;
    - accidental changes beyond scope.

Stop after this refinement pass.

Do not continue to later slides.

---

# 18. Completion report

Report:

## Implemented

- concise summary of the refinement;
- confirmation that the object-based system was preserved;
- confirmation that this was not a narrative redesign.

## Accent update

- old canonical accent value;
- new canonical accent value;
- token/file changed;
- confirmation that images were not recolored.

## Claim object

- component path;
- geometry changes;
- symmetry approach;
- confirmation that it remains vector/code-based.

## Fork geometry

- exact method used to guarantee mirroring;
- confirmation that spend and save destination states were preserved.

## Slide 4.06

- confirmation that the weak opening build was removed;
- new build count;
- new first-state description.

## Carrier assets

Report whether each was found and used:

```text
carrier_shells.png
carrier_gold.png
carrier_paper.png
carrier_bank_ledgers.png
carrier_bitcoin.png
```

## Files changed

Provide a file-by-file list.

## Validation

Report:

- commands actually run;
- build result;
- console result;
- reduced-motion result;
- navigation result;
- restoration result;
- notes result.

## Review access

Provide exact deep links for:

- slide 4.04;
- slide 4.05;
- slide 4.06;
- slide 4.07.

Include instructions for reviewing every build state.

## Remaining judgment calls

List only genuine visual issues requiring human review.

End with one recommended next action only.
