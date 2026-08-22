# Codex Task — Rebuild Slides 4.04–4.07 as One Coherent Visual Sequence

Read and follow these files first:

- `AGENTS.md`
- `docs/section-4-master-brief.md`
- `docs/section-4-narrative-master-document.md`
- `PLANS.md`

This task-specific prompt is the binding source of truth for slides **4.04, 4.05, 4.06 and 4.07** and overrides any conflicting earlier implementation detail for those slides.

The purpose of this task is not to make small cosmetic improvements. It is to replace the current diagram-heavy “unfinished exchange” visual system with a cleaner, object-based visual language that is consistent across the entire subsection.

---

# 1. Task boundary

Rebuild **slides 4.04–4.07 only** as one coherent mini-sequence.

Preserve without visual or narrative changes:

- slide 4.01;
- slide 4.02;
- slide 4.03;
- Sections 1–3;
- the close slide;
- all approved baseline fixes;
- the validated `SlideEngine` continuation behavior.

Do not implement slide 4.08 or any later Section 4 slide.

Do not redesign slide 4.03. Its current surgeon image, typography, `$400`, and final question are approved and form the handoff into this sequence.

Remove the rejected 4.04–4.07 visual system, including:

- the large orange arc used as the recurring unfinished-exchange diagram;
- `VALUE PROVIDED / COMPLETE` and `FINAL COUNTER-VALUE / PENDING` as persistent diagram labels;
- the market-dot cluster;
- the large carrier frame currently surrounding the arc;
- the old spend/save composition built around that arc;
- the weak line icons for sneaker, steak and wine;
- obsolete slide-specific CSS, DOM, animation logic and notes;
- any unused or duplicate “Open Claim Circuit” implementation no longer required after this rebuild.

Do not leave dead selectors, hidden alternate layouts, unused SVG paths, or abandoned component variants behind.

---

# 2. New visual strategy

The narrative remains almost exactly the same.

The visual system changes completely.

## Old visual strategy to remove

The old approach used one annotated arc diagram to explain:

- value provided;
- counter-value pending;
- transferability;
- spend;
- save;
- the market;
- essence;
- carrier;
- store-of-value integrity.

This became visually dense and difficult to understand once more labels were added.

## New visual strategy

Use an **object-based visual system** centred on one recurring object:

```text
THE CLAIM OBJECT
```

The claim object represents:

```text
an earned, transferable claim on value
```

The claim object should be the only recurring visual element across 4.04–4.07.

It can:

- emerge from `$400`;
- move toward goods;
- take the spend path;
- take the save path;
- sit inside a carrier shell;
- travel from now to later.

This sequence should feel like one elegant visual sentence:

```text
$400
→ claim
→ spend or save
→ claim inside a carrier
→ carrier preserves claim through time
```

The audience should not need to decode a technical diagram.

The spoken narrative carries the conceptual nuance.

The slides should remain premium, cinematic, restrained and immediately legible.

---

# 3. Required image assets

The user has created the following assets and saved them in the images folder.

Expected paths:

```text
assets/images/spend_now_goods_sneaker.png
assets/images/spend_now_goods_steak.png
assets/images/spend_now_goods_wine.png
assets/images/spend_now_goods_triptych.png
```

Use the three individual images as the primary assets:

```text
spend_now_goods_sneaker.png
spend_now_goods_steak.png
spend_now_goods_wine.png
```

The triptych exists only as a backup. Do not use it unless one of the individual images is missing or technically unusable.

Expected exports in `src/assets.js`:

```js
spendNowGoodsSneaker
spendNowGoodsSteak
spendNowGoodsWine
spendNowGoodsTriptych
```

Before editing:

1. verify which of the four assets exist;
2. verify the three individual assets load correctly;
3. inspect their dimensions and transparency/background treatment;
4. use the individual assets if all three are usable;
5. do not create substitute CSS line icons;
6. do not hotlink external images;
7. do not generate new assets in code.

If one individual asset is missing, report it before proceeding rather than silently replacing it with a generic icon.

---

# 4. Canonical claim-object design

Create one reusable claim-object component for slides 4.04–4.07.

Suggested component name:

```text
ClaimObject
```

The claim object must not look like:

- a coin;
- a Bitcoin logo;
- a banknote;
- a battery;
- a pill;
- a crypto-token badge;
- a progress indicator;
- a glowing orb;
- a generic circular button.

## Preferred geometry

Use a small premium abstract marker with:

- a horizontally oriented rounded lozenge or softly faceted capsule-like silhouette;
- but avoid making it look medicinal or like a UI pill;
- a warm Bitcoin-orange body;
- subtle internal line, notch, cut or contour that gives it identity;
- restrained depth;
- a gentle highlight;
- no text inside it;
- no currency symbol;
- no heavy glow.

Alternative accepted geometry:

- a compact faceted claim marker;
- a short rounded rectangle with one distinctive inset;
- a minimal abstract certificate marker.

The object should be recognisable at small scale and still feel refined when enlarged.

## Behaviour

The same component must support:

- appearing from `$400`;
- being positioned centrally;
- moving along a branch;
- sitting inside the carrier shell;
- moving along a restrained time path;
- deterministic reset at every build;
- reduced-motion mode.

The component API should remain narrow.

Example conceptual API:

```js
<ClaimObject
  state="neutral | spend | save | carried"
  scale={...}
  emphasis={...}
/>
```

Do not over-engineer a general scene system.

---

# 5. Canonical carrier-shell design

Create one minimal reusable carrier-shell component for slides 4.06–4.07.

Suggested component name:

```text
CarrierShell
```

The shell must:

- form around the claim object;
- visually distinguish body from essence;
- remain open enough that the claim object is fully visible;
- feel refined and structural;
- use a neutral warm-grey or subtle metallic outline;
- contain no text inside it;
- contain no lock, shield or vault motif;
- avoid looking like a battery, capsule, box, wallet, safe or sci-fi pod.

Preferred form:

- a thin, elegant, asymmetrical contour;
- softly faceted or architecturally framed;
- subtle depth;
- slight open seams or breaks so it does not look like a literal container.

The shell should not dominate the claim object.

The claim remains orange.

The shell remains neutral.

---

# 6. Shared visual principles across 4.04–4.07

## Use restraint

Each slide should have:

- one main idea;
- one dominant visual;
- minimal supporting text;
- generous black space;
- no decorative clutter.

## Use images where they add quality

Use:

- the existing surgeon image from 4.03 as continuity into 4.04;
- the three premium goods images on 4.04 and 4.05.

Do not add:

- AI-generated market scenes;
- economy collages;
- extra stock imagery;
- literal people icons;
- dense world maps;
- decorative network diagrams.

## Use no persistent arc diagram

The old orange arc is not the new recurring metaphor.

Do not recreate it in another form.

## Use no large annotation system

Avoid persistent labels such as:

- `VALUE PROVIDED`;
- `COMPLETE`;
- `FINAL COUNTER-VALUE`;
- `PENDING`;
- `TRANSFERABLE CLAIM`.

The spoken explanation carries this logic.

## Keep continuity

The claim object must feel like the same object across every slide.

Transitions should feel coherent, but reliability is more important than shared-DOM cleverness.

---

# 7. Slide 4.04 — What the $400 represents

## 7.1 Purpose

This slide answers the question from 4.03:

```text
What did he actually receive?
```

It must establish:

1. The surgeon received `$400`.
2. He did not receive the final goods or services he ultimately wants.
3. The money is not the final value itself.
4. What he received is an earned, transferable claim on value.

Do not yet explain spend versus save.

Do not yet explain carrier versus claim.

Do not yet define a store of value.

## 7.2 Speaker notes

Use this script closely:

> At first glance, the surgeon received four hundred dollars.
>
> But he has not received the final goods or services he ultimately wants.
>
> He has not received the shoes, the meal, the wine, the housing, the travel or any other final good or service he may later choose.
>
> If those final goods had been delivered directly in exchange for the surgery, that would have been barter.
>
> Instead, he receives money.
>
> So what does that four hundred dollars actually represent?
>
> It represents an earned, transferable claim on value.
>
> He has already provided the service. But he has not yet taken the final goods or services he wants in return.
>
> Because the money is standardised and widely accepted, the claim is no longer tied to the patient. It can be taken back to the wider market and exchanged with anyone willing to accept it.

End with:

> Once he holds that claim, he has two basic choices: redeem it now, or carry it forward.

Do not include the formal counterclaim definition on screen.

Do not introduce market dots or a market diagram.

## 7.3 Visible text

The slide may display only:

### Kicker

```text
THE UNFINISHED EXCHANGE
```

### Question

```text
What does the $400 actually represent?
```

### Final reveal

```text
AN EARNED, TRANSFERABLE
CLAIM ON VALUE
```

Do not display any other explanatory sentence.

## 7.4 Composition

### Initial composition

Use a visual relationship derived from 4.03:

- surgeon image on the left;
- `$400` large and orange in the central-right region;
- goods images on the far right.

The goods images should form a premium editorial cluster:

- sneaker;
- steak;
- wine.

Use the three individual assets.

Recommended treatment:

- crop or mask each into a clean editorial vignette;
- avoid three rigid cards;
- use varying but controlled sizes;
- use subtle overlapping depth only if it remains clean;
- integrate with soft black falloff;
- keep the goods visually subordinate to `$400`;
- preserve recognisability at presentation scale.

Do not place labels under the images.

### Final composition

The surgeon image and goods recede.

The question fades.

The `$400` transforms into or gives way to the claim object.

Reveal:

```text
AN EARNED, TRANSFERABLE
CLAIM ON VALUE
```

Recommended hierarchy:

- first line white;
- second line orange;
- claim object below or beside the second line;
- large amount of untouched black space.

The final frame should be dramatically simpler than the opening frame.

## 7.5 Builds

Implement exactly five cumulative builds: `0` through `4`.

### Build 0 — Continue from 4.03

Visible:

- kicker;
- dimmed surgeon image;
- `$400`;
- no goods yet;
- no question yet;
- no claim object.

### Build 1 — Ask the question

Reveal:

```text
What does the $400 actually represent?
```

Keep:

- surgeon image;
- `$400`.

### Build 2 — Show the final goods not yet received

Reveal the three goods images.

Requirements:

- one staggered entrance;
- no labels;
- no line icons;
- no crosses;
- no red `not received` mark;
- no market dots.

The spoken narration explains that these are examples of final goods not yet received.

### Build 3 — Clear the final goods

Fade or drift the goods back into darkness.

Dim the surgeon image further.

Keep `$400` briefly dominant.

### Build 4 — Reveal the claim

Transform or dissolve `$400` into the claim object.

Reveal:

```text
AN EARNED, TRANSFERABLE
CLAIM ON VALUE
```

Final state:

- claim object visible;
- final headline visible;
- goods no longer visible;
- surgeon image no longer dominant;
- no technical diagram.

---

# 8. Slide 4.05 — Spend now or save for later

## 8.1 Purpose

This slide shows the two possible paths for the same claim:

1. Spend now:
   - redeem the claim;
   - receive final goods or services;
   - close the exchange.

2. Save for later:
   - defer redemption;
   - carry the claim forward;
   - keep the exchange open.

It must land:

```text
Spending closes the exchange.
Saving keeps it open.
```

The final state must remain on the save path.

## 8.2 Speaker notes

Use this script closely:

> Once the surgeon holds the claim, he has two basic choices.
>
> He can spend it now.
>
> In that case, he returns to the market and exchanges the claim for the final goods or services he wants. The claim is redeemed and the exchange closes.
>
> Or he can save it.
>
> If he saves, he does not redeem the claim yet. He carries it forward so that he—or someone else who rightfully receives it—can exercise it later.
>
> Saving is therefore the decision to defer the final exchange.
>
> Spending closes the exchange. Saving keeps it open.

End with:

> But an abstract claim cannot travel through people, places and time on its own. It still needs a body capable of carrying it.

Do not introduce investing or yield.

Do not introduce the store-of-value definition.

## 8.3 Visible text

The slide may display only:

### Kicker

```text
SPEND OR SAVE
```

### Branch headings

```text
SPEND NOW
SAVE FOR LATER
```

### Spend support

```text
Redeem the claim now
Exchange closed
```

### Save support

```text
Carry the claim forward
Exchange remains open
```

### Final takeaway

```text
Spending closes the exchange.
Saving keeps it open.
```

Do not display persistent `COMPLETE / PENDING` labels.

## 8.4 Composition

Use one central claim object.

Do not duplicate it permanently.

From the central claim object, reveal two elegant branches:

### Left branch — spend

- heading `SPEND NOW`;
- short path left;
- goods image cluster;
- support text beneath.

### Right branch — save

- heading `SAVE FOR LATER`;
- short path right;
- restrained continuation line toward `LATER`;
- support text beneath.

Use the three goods images again on the spend branch.

Recommended goods treatment:

- smaller than on 4.04;
- arranged as a compact premium cluster;
- no cards;
- no generic line icons.

## 8.5 Builds

Implement exactly six cumulative builds: `0` through `5`.

### Build 0 — Claim object only

Visible:

- kicker;
- claim object centred;
- no branches;
- no headings;
- no goods.

### Build 1 — Reveal the two choices

Reveal:

```text
SPEND NOW
SAVE FOR LATER
```

Both neutral.

### Build 2 — Demonstrate spend

Activate `SPEND NOW`.

Dim `SAVE FOR LATER`.

Animate the claim object left along the spend branch.

Reveal:

- goods image cluster;
- `Redeem the claim now`;
- `Exchange closed`.

The claim may visually merge into the goods cluster or fade as it is redeemed.

Do not use:

- checkmarks;
- success cards;
- locks;
- completed-node diagrams.

### Build 3 — Reset to the decision point

Return the same claim object to centre deterministically.

Fade goods and spend-support text.

Both branch headings return briefly to neutral.

### Build 4 — Demonstrate save

Activate `SAVE FOR LATER`.

Dim `SPEND NOW`.

Animate the claim object right along a restrained forward path.

Reveal:

- `Carry the claim forward`;
- `Exchange remains open`;
- small `NOW` and `LATER` markers only if needed.

Do not show:

- years;
- 2126;
- clocks;
- calendars;
- carrier shell.

### Build 5 — Land the takeaway

Keep save path active.

Reveal:

```text
Spending closes the exchange.
Saving keeps it open.
```

Preferred emphasis:

- first line white or subdued;
- second line orange.

The final frame should clearly show:

- one claim object carried forward;
- save branch active;
- no goods;
- no technical diagram.

---

# 9. Slide 4.06 — The claim and its carrier

## 9.1 Purpose

This slide distinguishes:

- the claim on value as the essence;
- the monetary asset as the carrier.

It must establish:

1. Saving carries an unredeemed claim forward.
2. An abstract claim cannot travel through people, places and time without embodiment.
3. The monetary medium is the carrier.
4. Different monetary carriers have existed historically.
5. The claim is the essence.
6. The monetary asset is the carrier.

Do not yet define the full store-of-value function.

## 9.2 Speaker notes

Use this script closely:

> Saving keeps the claim open and carries it forward.
>
> But an abstract claim cannot travel through people, places and time entirely on its own.
>
> The claim on value is the essence of money. But that abstract claim still needs a body—something capable of carrying it.
>
> That body is the monetary medium: the carrier.
>
> Throughout history, societies have embodied monetary claims in different things: shells, precious metals, paper notes, bank ledgers and now digitally native monetary assets such as Bitcoin.
>
> The body can change. The underlying monetary function remains recognisable.
>
> The claim is the essence. The monetary asset is the carrier.

End with:

> Once we separate the claim from its carrier, the store-of-value question becomes much more precise: what must that carrier preserve?

Do not include a long history-of-money detour.

Do not rank carriers.

## 9.3 Visible text

The slide may display only:

### Kicker

```text
THE CLAIM AND ITS CARRIER
```

### Opening statement

```text
The claim on value is the essence of money.
```

### Need for embodiment

```text
But an abstract claim still needs a body—
something capable of carrying it across people, places and time.
```

### Carrier reveal

```text
THE MONETARY MEDIUM
THE CARRIER
```

### Historical lineage

```text
SHELLS
GOLD
PAPER
BANK LEDGERS
BITCOIN
```

### Final statement

```text
The claim is the essence.
The monetary asset is the carrier.
```

## 9.4 Composition

Start with the claim object from the save path.

Then form the carrier shell around it.

The shell must remain clean and minimal.

Below the object, reveal the historical carrier lineage in one quiet row.

Do not create large icons.

Small coded glyphs are allowed only if:

- they share one line weight;
- they remain subdued;
- they do not become the main visual;
- they look more refined than the current icons.

Text-only lineage is acceptable and preferred over weak icons.

## 9.5 Builds

Implement exactly six cumulative builds: `0` through `5`.

### Build 0 — Carry the claim forward

Visible:

- kicker;
- claim object;
- short residual forward path from 4.05;
- no shell;
- no lineage.

### Build 1 — Name the essence

Fade the time path.

Reveal:

```text
The claim on value is the essence of money.
```

Give the claim object restrained emphasis.

### Build 2 — Establish the need for a body

Reveal:

```text
But an abstract claim still needs a body—
something capable of carrying it across people, places and time.
```

Keep the claim object visible.

No shell yet.

### Build 3 — Reveal the carrier

Form the carrier shell around the claim object.

Reveal:

```text
THE MONETARY MEDIUM
THE CARRIER
```

Preferred hierarchy:

- first line small and quiet;
- second line larger and orange.

### Build 4 — Show historical embodiments

Reveal:

```text
SHELLS   GOLD   PAPER   BANK LEDGERS   BITCOIN
```

Requirements:

- quiet one-line lineage;
- no large icon wall;
- no unique Bitcoin highlight;
- no ranking;
- claim object remains the same;
- shell remains the main outer body.

### Build 5 — Land the distinction

Dim the lineage.

Reveal:

```text
The claim is the essence.
The monetary asset is the carrier.
```

Preferred emphasis:

- `essence` orange;
- `carrier` orange.

Final frame:

- claim object inside carrier shell;
- lineage subdued;
- final statement dominant.

---

# 10. Slide 4.07 — The store-of-value function

## 10.1 Purpose

This slide defines the store-of-value function precisely.

The carrier must preserve:

1. integrity;
2. usability;
3. through time.

The final definition is:

```text
A store of value is a monetary carrier that preserves
the integrity and usability of an unredeemed claim through time.
```

Do not yet introduce dilution numerically.

Do not introduce the 100-Year Test.

## 10.2 Speaker notes

Use this script closely:

> Now that we have separated the claim from the carrier, we can define the store-of-value function much more precisely.
>
> A carrier does not succeed merely because it continues to exist.
>
> It has to preserve two things.
>
> First, the integrity of the claim. The claim must remain intact rather than being arbitrarily diluted, altered, destroyed or subordinated.
>
> Second, its usability. The future holder must still be able to access it, verify it, transfer it and exchange it.
>
> A claim can remain notionally intact but become impossible to use. Or it can remain easy to use while its purchasing power is gradually diluted. Either way, the store-of-value function has failed.
>
> So a store of value is a monetary carrier that preserves the integrity and usability of an unredeemed claim through time.

End with:

> The first threat we now need to examine is dilution.

## 10.3 Visible text

The slide may display only:

### Kicker

```text
THE STORE-OF-VALUE FUNCTION
```

### Opening question

```text
What must the carrier actually preserve?
```

### Integrity

```text
INTEGRITY
The claim remains intact.
```

### Usability

```text
USABILITY
The future holder can still exercise it.
```

### Final definition

```text
A store of value is a monetary carrier that preserves
the integrity and usability of an unredeemed claim through time.
```

## 10.4 Composition

Carry forward the claim object inside its carrier shell.

Add a restrained `NOW → LATER` path.

Use one object.

Do not create two cards.

Place:

- `INTEGRITY` near the inner claim object;
- `USABILITY` near the future-facing side of the carrier.

Optional supporting visual for usability:

- two or three tiny neutral future endpoints;
- only if immediately understandable;
- no dense market dots;
- no ambiguous constellation.

If the endpoints do not add clarity, omit them entirely.

The slide can rely on text and the now-to-later movement.

## 10.5 Builds

Implement exactly six cumulative builds: `0` through `5`.

### Build 0 — Carry forward claim and carrier

Visible:

- kicker;
- claim object inside carrier shell;
- no lineage;
- no question;
- no time path.

### Build 1 — Ask the question

Reveal:

```text
What must the carrier actually preserve?
```

### Build 2 — Introduce time

Reveal restrained:

```text
NOW ───────────────── LATER
```

The carrier may move subtly forward.

Do not show years.

### Build 3 — Reveal integrity

Reveal:

```text
INTEGRITY
The claim remains intact.
```

Give the inner claim restrained emphasis.

No shield or lock.

### Build 4 — Reveal usability

Reveal:

```text
USABILITY
The future holder can still exercise it.
```

Give the future-facing side of the carrier subtle emphasis.

Optional endpoints only if clean.

No marketplace imagery.

### Build 5 — Land the definition

Dim the opening question.

Reveal:

```text
A store of value is a monetary carrier that preserves
the integrity and usability of an unredeemed claim through time.
```

Highlight:

```text
integrity and usability
```

in orange.

Final frame:

- carrier and claim still visible;
- definition dominant;
- no clutter;
- no later concepts.

---

# 11. Cross-slide transitions

## 4.03 → 4.04

Preserve 4.03.

Preferred transition:

1. capability labels fade;
2. surgery headline fades;
3. final question fades;
4. surgeon image remains;
5. `$400` remains or is closely matched;
6. 4.04 kicker and question appear;
7. goods images enter later.

Do not modify 4.03 merely to force shared-DOM continuation.

## 4.04 → 4.05

Preferred transition:

1. final claim headline fades;
2. claim object remains;
3. claim object moves to the centre;
4. 4.05 kicker appears;
5. branch labels appear.

## 4.05 → 4.06

Preferred transition:

1. spend/save branch labels fade;
2. final takeaway fades;
3. claim object remains on the save path;
4. time line recedes;
5. claim object moves to the centre;
6. 4.06 opening statement appears.

## 4.06 → 4.07

Preferred transition:

1. historical lineage fades;
2. final distinction fades;
3. claim object inside carrier shell remains;
4. 4.07 kicker and question appear;
5. now-to-later path begins.

Use matching geometry and clean fades where continuation is fragile.

---

# 12. Layout and typography standards

## Safe zones

Respect existing 1920×1080 logical stage and projection safe zones.

## Kicker

Use the approved Section 4 kicker style:

- short orange line;
- uppercase;
- restrained tracking;
- same placement as 4.03.

## Display hierarchy

Main conceptual headlines:

- large;
- clean;
- no decorative box;
- no excessive tracking;
- no more than two lines.

Supporting lines:

- concise;
- smaller;
- avoid paragraphs.

## Orange usage

Use orange for:

- claim object;
- one important phrase;
- active branch;
- key conclusion.

Do not turn every label orange.

## Black space

Preserve generous empty space.

The subsection should feel more like a premium keynote than an educational infographic.

---

# 13. Motion standards

Allowed:

- opacity;
- restrained translation;
- subtle scale;
- one-time path drawing;
- soft image drift;
- claim-object movement;
- shell formation.

Avoid:

- particles;
- large glows;
- looping animation;
- spinning;
- bouncing;
- springy UI motion;
- letter scattering;
- card flips;
- heavy blur;
- complex simultaneous motion.

Suggested timing:

- normal reveal: 350–500 ms;
- claim movement: 500–700 ms;
- shell formation: 550–750 ms;
- image cluster stagger: total under 700 ms.

Respect `prefers-reduced-motion`.

Every build must still display its complete state instantly.

---

# 14. Deterministic build requirements

For every slide:

- every build must reconstruct the complete target state;
- do not rely on prior build mutations;
- backwards navigation must restore correctly;
- refresh at a nonzero build step must restore correctly;
- force-next and force-previous must work;
- GSAP timelines and delayed calls must be cleaned up;
- no stale transforms may persist.

---

# 15. Implementation scope

Modify only:

- slide 4.04 module;
- slide 4.05 module;
- slide 4.06 module;
- slide 4.07 module;
- slide-specific CSS for those slides;
- speaker notes for those slides;
- `src/assets.js` to export the supplied goods assets;
- a narrowly scoped `ClaimObject` component;
- a narrowly scoped `CarrierShell` component;
- minimal shared helpers required by this sequence.

Do not:

- modify slide 4.01;
- modify slide 4.02;
- modify slide 4.03;
- implement slide 4.08;
- alter global typography;
- modify the slide engine;
- add dependencies;
- run `npm audit fix`;
- create a general scene framework;
- retain the old Open Claim Circuit if it is no longer used;
- leave old unused goods icons;
- add placeholder assets;
- hotlink external images.

---

# 16. Required self-review

Before reporting completion, verify the following.

## Overall sequence

1. Does 4.04–4.07 feel like one coherent visual sequence?
2. Is the claim object recognisably the same object throughout?
3. Is every slide cleaner than the rejected diagram-based version?
4. Is every intermediate build screenshot-ready?
5. Is no slide dependent on ambiguous market dots?
6. Are the old large arc and node labels fully removed?
7. Are the individual sneaker, steak and wine images used cleanly?
8. Is no weak line icon still active?
9. Does each slide have one dominant idea?
10. Is the spoken narrative doing the heavy conceptual work rather than on-screen labels?

## Slide 4.04

11. Is the surgeon → `$400` → goods → claim progression immediately understandable?
12. Are the goods images premium and visually integrated?
13. Does the final frame become simpler rather than busier?
14. Is the phrase `AN EARNED, TRANSFERABLE / CLAIM ON VALUE` the final focal point?

## Slide 4.05

15. Is there clearly one claim and two possible paths?
16. Does spend lead to the goods images?
17. Does save lead forward without a carrier shell yet?
18. Is the final save state visually dominant?
19. Is `Spending closes the exchange. Saving keeps it open.` clear and elegant?

## Slide 4.06

20. Is the claim/carrier distinction immediately obvious?
21. Does the carrier shell avoid looking like a box, battery, vault or pill?
22. Is the historical lineage quiet and secondary?
23. Is Bitcoin not prematurely highlighted?

## Slide 4.07

24. Are integrity and usability clear without cards?
25. Is the time path restrained?
26. Are there no ambiguous market dots?
27. Does the final definition land cleanly?
28. Is the final frame ready for the later dilution slide?

## Preservation

29. Is slide 4.03 visually unchanged?
30. Are slides 4.01–4.02 visually unchanged?
31. Are Sections 1–3 unchanged?
32. Is slide 4.08 untouched?

Correct any failure before reporting completion.

---

# 17. Validation

After implementation:

1. Run `npm run build`.
2. Run `git diff --check`.
3. Inspect the complete diff for every changed file.
4. Open slide 4.04 directly.
5. Inspect every build of 4.04 at 1920×1080.
6. Open slide 4.05 directly.
7. Inspect every build of 4.05 at 1920×1080.
8. Open slide 4.06 directly.
9. Inspect every build of 4.06 at 1920×1080.
10. Open slide 4.07 directly.
11. Inspect every build of 4.07 at 1920×1080.
12. Inspect all final states at the actual recording viewport.
13. Test forward and backward builds on all four slides.
14. Refresh each slide at multiple nonzero build states.
15. Test force-next and force-previous.
16. Test reduced-motion mode.
17. Verify notes overlay.
18. Verify second-window notes.
19. Navigate 4.03 → 4.04 → 4.05 → 4.06 → 4.07 and back repeatedly.
20. Confirm slide 4.03 and all earlier slides are visually unchanged.
21. Keep the browser console open and confirm no errors.
22. Search source and CSS for:
    - old arc selectors;
    - old node labels;
    - market-dot implementation;
    - old goods line icons;
    - duplicate claim components;
    - unused carrier frames;
    - obsolete `L1:` notes;
    - accidental slide 4.08 changes.

Stop after 4.04–4.07 are complete.

Do not proceed to any later slide.

---

# 18. Completion report

Report:

## Implemented

- concise summary of the new object-based visual system;
- slide-by-slide summary for 4.04–4.07;
- confirmation that slide 4.03 and earlier slides were not redesigned.

## Files changed

- file-by-file list;
- exact `ClaimObject` component path;
- exact `CarrierShell` component path;
- exact asset exports added;
- confirmation that the old arc/circuit code was removed if no longer used.

## Asset status

Report exact paths used:

```text
assets/images/spend_now_goods_sneaker.png
assets/images/spend_now_goods_steak.png
assets/images/spend_now_goods_wine.png
```

Also state whether the triptych was used. The expected answer is no unless required.

## Validation

- commands actually run;
- build result;
- console result;
- reduced-motion result;
- notes result;
- backward-navigation result;
- refresh/restoration result.

## Review access

Provide:

- exact direct URL/deep link for 4.04;
- exact direct URL/deep link for 4.05;
- exact direct URL/deep link for 4.06;
- exact direct URL/deep link for 4.07;
- instructions for viewing each build state.

## Remaining judgment calls

List only issues that genuinely need human visual judgment.

End with one recommended next action only.
