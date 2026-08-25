> **Build prompt, executed — archived, not authoritative.** ChatGPT/Codex-era working material for the original Section 4 build.
> Superseded by `docs/what-is-money-master.md` and `docs/synthesis-architecture.md` (Stage 0, 25 August 2026). Nothing here governs.

# Codex Prompt — Rebuild Section 4 Opening Sequence (Slides 4.01–4.04)

Read and follow these files first:

- `AGENTS.md`
- `docs/section-4-master-brief.md`
- `PLANS.md`

This prompt overrides the earlier master-brief visual suggestion for slide 4.01 only: **do not place the Open Claim Circuit on the section opener.** The section opener should instead reuse the existing `store_of_value.png` visual so it feels consistent with the other section-opening slides and the original presentation.

Do not begin Milestone 2 or any later Section 4 work. Implement only the new opening sequence:

1. `4.01 — The Ideal Store of Value`
2. `4.02 — Before the Properties, Define the Job`
3. `4.03 — A Simple Exchange`
4. `4.04 — The Unfinished Exchange`

The goal is to rebuild the first four slides of Section 4 exactly according to the narrative and visual specification below. Treat this as a fresh implementation of the opening sequence. Do not preserve any rejected Milestone 1 slide design unless it exactly matches this specification.

---

## Context and intent

Section 4 should begin with a clear chapter-opening slide, then transition into a first-principles analysis of stores of value.

The narrative arc for the first four slides is:

> **Section announced → before judging properties, define the job → money being earned → the unfinished exchange revealed → money as an earned, transferable claim on value**

The opening sequence must make the audience understand:

- a store of value cannot literally store “value” as a physical substance;
- to understand the store-of-value function, we should start where money is earned;
- the surgeon provides a specific, highly specialised service;
- he receives money, not the final goods or services he actually wants;
- money represents an earned, transferable claim on value;
- because money is standardised and widely accepted, the claim is no longer tied to the original person who paid him;
- money turns a person-specific exchange into a transferable claim on the wider market;
- the exchange remains open until the claim is redeemed.

This opening sequence establishes the visual grammar for later slides:
- spending closes the exchange;
- saving keeps the exchange open;
- the claim later needs a carrier;
- the 100-Year Test later asks which carrier can carry that claim through time.

---

## Global visual direction for these four slides

Preserve the existing deck’s premium black/orange style:
- black background;
- Bitcoin orange accent;
- high contrast;
- generous spacing;
- strong title typography;
- restrained cinematic builds;
- no generic dashboard cards;
- no clutter;
- no decorative orange objects without meaning.

Use `store_of_value.png` on slide 4.01:
- locate it through `src/assets.js`;
- if it is already exported as `storeOfValue`, reuse that export;
- if the export was removed during previous rejected work, restore it cleanly;
- do not hotlink or add a new external asset;
- do not replace the image with AI-generated or stock imagery.

Do **not** use the Open Claim Circuit on slide 4.01. The circuit should first be introduced and explained on slide 4.04.

Create the Open Claim Circuit as a clean reusable visual primitive for slide 4.04 and later use. It should not look like:
- a coin;
- a dollar sign;
- a magical energy orb;
- a generic glowing gem;
- a loading indicator.

The circuit represents an unfinished exchange:

```text
VALUE PROVIDED  ●────────○  FINAL COUNTER-VALUE
  COMPLETE                       PENDING
```

Meaning:
- filled left node = value has been provided;
- hollow right node = final goods or services have not yet been received;
- connecting orange path = transferable monetary claim;
- when the right node fills later, the exchange closes;
- when the claim is saved later, the hollow right node remains open and the circuit travels forward.

For now, implement the circuit only as needed for slide 4.04, but structure it cleanly enough that it can be reused in the next group of slides.

---

# Slide 4.01 — The Ideal Store of Value

## Purpose

Clearly announce the beginning of Section 4 and make this feel like a proper new chapter.

This slide should tell the audience:

> We are now going to analyse the ideal store of value from first principles.

It should not yet introduce the surgeon, the Open Claim Circuit, the claim/carrier distinction, or the ten properties.

## Spoken script / speaker notes

Use this as the core note text, polished only for natural delivery:

> So far, we have looked at how Bitcoin fits into the evolution of money, the different functions money performs, and why Bitcoin is currently best understood as an emerging store of value.
>
> Now I want to examine that function more deeply and analyse stores of value from first principles.
>
> What is an ideal store of value? What is it actually supposed to preserve? And which properties would allow it to perform that function as faithfully as possible?

End the notes with a transition:

> Before we ask what properties make a store of value good, we first need to define the job it is supposed to perform.

## Visible text

Kicker:

```text
SECTION 4
```

Main title:

```text
THE IDEAL STORE OF VALUE
```

Subtitle:

```text
A first-principles analysis
```

## Visual composition

Use the existing section-opener style as much as possible.

Recommended layout:
- large title block on the left;
- `store_of_value.png` visual on the right;
- image should feel premium, cinematic and integrated;
- keep the image large enough to be meaningful but not so dominant that the title feels secondary;
- no Open Claim Circuit on this slide.

The image should sit comfortably in the same visual family as other section opener images. If the existing Section 4 opener already has a strong composition using this image, adapt and improve it rather than inventing a completely unrelated opener.

## Progressive builds

Build 0:
- black slide with small orange `SECTION 4`.

Build 1:
- main title appears.

Build 2:
- subtitle appears.

Build 3:
- `store_of_value.png` fades/reveals on the right.

Keep the builds calm and cinematic. No excessive movement.

## Initial and final states

Initial:
- pure black with only the section kicker.

Final:
- title, subtitle and image visible;
- clean section-opener composition.

## Transition into 4.02

As the next slide begins, the title/image should recede cleanly.

The phrase `STORE OF VALUE` should be available visually or conceptually for the next slide. The transition should make the next question feel natural:

> If this is a store of value, what exactly is being stored?

Do not over-engineer a shared-DOM transition if a clean standard transition works better.

---

# Slide 4.02 — Before the Properties, Define the Job

## Purpose

Establish the first-principles method:

> Before deciding what properties a store of value needs, first define what it is supposed to do.

Introduce the conceptual tension:

> “Store of value” sounds like value is some physical substance that can simply be placed inside a container, but that is not what value is.

Then move toward the example:

> Start where money is earned.

## Spoken script / speaker notes

Use this script closely:

> When people discuss stores of value, they normally jump straight into the properties: scarcity, durability, portability and so on.
>
> But before we can decide what makes a store of value good, we first need to understand the job it is supposed to perform.
>
> The phrase “store of value” can make value sound like an objective substance or a physical unit that can simply be placed into a container. But value is not a substance that can be physically stored.
>
> So what exactly are we trying to preserve when we use money as a store of value?
>
> The clearest way to understand that is to start with the moment someone earns money.

Transition:

> Let’s use a simple example.

## Visible text

Opening headline:

```text
BEFORE THE PROPERTIES, DEFINE THE JOB
```

Then:

```text
A store of value…
```

Then emphasize:

```text
VALUE
```

Final question:

```text
What exactly is being stored?
```

Closing prompt:

```text
Start where money is earned.
```

## Visual composition

This slide should be mainly typographic and conceptual.

Visual idea:
- centre the phrase `STORE OF VALUE`;
- make `VALUE` separate slightly from the phrase;
- a thin subtle outline/container may briefly form around `VALUE`;
- then the visual should show that `VALUE` is not a physical substance that can simply be contained.

This should be elegant and restrained:
- no magical explosion;
- no particles that look like “economic energy”;
- no battery;
- no literal container full of value;
- no long philosophical text.

## Progressive builds

Build 0:
- `STORE OF VALUE` appears or is inherited conceptually from 4.01.

Build 1:
- `STORE OF` becomes quieter while `VALUE` remains visually emphasised.

Build 2:
- a subtle outline/container forms around `VALUE`.

Build 3:
- `VALUE` refuses the container metaphor: the word separates, becomes abstract, or visually slips beyond the outline.
- Keep this subtle and premium, not gimmicky.

Build 4:
- the conceptual visual recedes.
- final question appears:

```text
What exactly is being stored?
```

Build 5:
- small closing prompt appears:

```text
Start where money is earned.
```

## Initial and final states

Initial:
- the phrase `STORE OF VALUE`.

Final:
- only the question and the prompt remain prominent.

## Transition into 4.03

The question fades.

A thin orange line remains and becomes the exchange line on the next slide.

At the left end, the abstract surgery scene appears. At the right end, space is reserved for `$400`.

This transition may be standard if shared-DOM would be fragile. The conceptual continuity matters more than the technical morph.

---

# Slide 4.03 — A Simple Exchange

## Purpose

Introduce the concrete example of money being earned.

Show that the surgeon did not simply exchange an hour of generic time. He provided a highly specialised service made up of scarce capabilities the market values highly.

End with the unresolved question:

> What did he actually receive?

Do not answer the question on this slide.

## Spoken script / speaker notes

Use this script closely:

> Imagine that a surgeon performs one hour of surgery and receives four hundred dollars in exchange.
>
> What he provided was not simply one hour of time. It was a highly specific combination of specialised skill, scarce knowledge, years of training, professional judgment, dexterity and responsibility.
>
> It is this particular combination of capabilities that the market values highly, which is why this hour of work is exchanged for four hundred dollars.
>
> But now look at what the surgeon receives in return.
>
> What did he actually receive?

Transition:

> To understand that, notice what he did not receive.

## Visible text

Kicker:

```text
A SIMPLE EXCHANGE
```

Main exchange:

```text
1 HOUR OF SPECIALISED SURGERY
→
$400
```

Capability labels:
- Specialised skill
- Scarce knowledge
- Years of training
- Professional judgment
- Dexterity
- Responsibility

Final question:

```text
What did he actually receive?
```

## Visual composition

Use a premium abstract surgery visual created with DOM/SVG/CSS, not a stock photo and not an identifiable human image.

Suggested composition:
- left side: abstract operating-theatre silhouette or surgical-service symbol;
- around it: the capability labels, positioned as contextual annotations;
- centre/right: thin orange exchange line or arrow;
- right side: `$400` in strong typography.

The slide must not imply:
- one hour of generic labour mechanically equals $400;
- time alone is the source of value;
- money is physical energy emitted from the surgeon.

The capability labels should visually outweigh the `1 HOUR` phrase.

## Progressive builds

Build 0:
- abstract surgical scene;
- text: `1 HOUR OF SURGERY`.

Build 1:
- add `SPECIALISED`, shifting the phrase to:

```text
1 HOUR OF SPECIALISED SURGERY
```

Build 2:
- reveal first capability set:
  - Specialised skill
  - Scarce knowledge
  - Years of training

Build 3:
- reveal second capability set:
  - Professional judgment
  - Dexterity
  - Responsibility

Build 4:
- illuminate exchange line/arrow and reveal `$400`.

Build 5:
- capability labels become quieter;
- final question appears:

```text
What did he actually receive?
```

## Initial and final states

Initial:
- surgical-service context only;
- no money yet.

Final:
- full exchange visible;
- `$400` visible;
- capability labels subdued;
- final question dominates.

## Transition into 4.04

Keep `$400` visually prominent.

Surgical scene and capability labels recede but remain faintly visible on the left.

Faint outlines of possible final goods appear on the far right:
- sneakers;
- steak;
- wine.

The audience should see that these goods have not been received.

Then `$400` begins transforming into the Open Claim Circuit.

This is the strongest visual transition in the opening sequence.

---

# Slide 4.04 — The Unfinished Exchange

## Purpose

Answer the question from 4.03.

Establish:

- the surgeon has not received the final goods or services he actually wants;
- if he had received those directly, it would have been barter;
- instead, he received money;
- money represents an earned, transferable claim on value;
- the claim is no longer tied to the patient because money is standardised and widely accepted;
- he can take the claim back to the broader market and exchange it with anyone willing to accept the money;
- money turns a person-specific exchange into a transferable claim on the wider market;
- the final counter-value is still pending;
- the exchange is still open.

Introduce and explain the Open Claim Circuit.

## Spoken script / speaker notes

Use this script closely:

> He has not received the final goods or services he actually wants.
>
> If he had received sneakers, food, wine or some other final good directly, that would have been barter. Instead, he receives money.
>
> What does that money represent at its core?
>
> It represents an earned, transferable claim on value. The surgeon has provided a service that was exchanged for four hundred dollars, but he has not yet taken the final four hundred dollars of goods or services he wants in return.
>
> Because money is standardised and widely accepted, that claim is no longer tied to the patient. The surgeon can take it back to the broader market and exchange it with anyone willing to accept the money.
>
> Money therefore turns a person-specific exchange into a transferable claim on the wider market.
>
> Or more formally: money is the transferable counterclaim created when value is provided to the market without the final counter-value yet being taken.
>
> The surgeon has completed his side of the exchange. The final counter-value remains pending. The exchange is still open.

Transition:

> And once we see money this way, saving becomes much clearer: spending closes the exchange, while saving keeps it open.

## Visible text

Opening line:

```text
He has not received the final goods or services he actually wants.
```

Core concept:

```text
An earned, transferable claim on value
```

Supporting line:

```text
No longer tied to the patient.
Usable across the wider market.
```

Open Claim Circuit labels:

Left node:

```text
VALUE PROVIDED
COMPLETE
```

Connecting path:

```text
TRANSFERABLE CLAIM
```

Right node:

```text
FINAL COUNTER-VALUE
PENDING
```

Final line:

```text
The exchange is still open.
```

Do not put the entire formal definition on screen. It belongs in the spoken narration and notes.

## Visual composition

The slide should begin with the remains of slide 4.03:
- faint surgical exchange on the left;
- `$400` centre/right;
- possible goods ghosted on the far right.

Then the `$400` transforms into the Open Claim Circuit.

Open Claim Circuit final form:

```text
VALUE PROVIDED                         FINAL COUNTER-VALUE
  COMPLETE          ●────────────○          PENDING
                    TRANSFERABLE CLAIM
```

Prefer a restrained, slightly curved or open-loop path over a rigid straight line. It should feel like an incomplete circuit:
- left side complete;
- right side pending;
- claim bridging the unfinished exchange.

The wider market should be represented subtly:
- faint distributed endpoints;
- restrained constellation/field;
- no dense dashboard network;
- no company logos;
- no consumer-icon clutter.

Example final goods — sneakers, steak, wine — should remain faint and unselected. They show what has not yet been received.

## Progressive builds

Build 0:
- continue from 4.03:
  - surgical context faintly visible;
  - `$400` in centre/right;
  - ghosted final goods on far right.

Build 1:
- opening line appears:

```text
He has not received the final goods or services he actually wants.
```

The goods remain visibly unselected and unreceived.

Build 2:
- `$400` transforms into the Open Claim Circuit.
- left node fills.
- right node remains hollow.

Build 3:
- node labels appear:
  - `VALUE PROVIDED — COMPLETE`
  - `FINAL COUNTER-VALUE — PENDING`

Build 4:
- connecting path activates;
- path label appears:

```text
TRANSFERABLE CLAIM
```

Build 5:
- patient-specific surgical scene contracts or recedes into the filled origin node;
- a restrained wider-market field appears beyond and around the pending node;
- supporting line appears:

```text
No longer tied to the patient.
Usable across the wider market.
```

Build 6:
- main conceptual label appears:

```text
An earned, transferable claim on value
```

Build 7:
- final line appears:

```text
The exchange is still open.
```

## Initial and final states

Initial:
- `$400` and the prior surgical exchange remain visible;
- final goods are ghosted and unreceived.

Final:
- Open Claim Circuit dominates;
- incidental elements are subdued;
- broader market is faintly present;
- final line is visible:

```text
The exchange is still open.
```

This final state becomes the foundational visual grammar for the rest of Section 4.

## Transition into the next slide

Do not implement the next slide yet, but leave 4.04 in a final visual state that can transition naturally into:

```text
Spending closes the exchange.
Saving keeps it open.
```

The next slide will keep only the Open Claim Circuit, remove the surgeon/patient/goods, and introduce the spend/save fork.

---


# Handling of the restored old Section 4

The repository currently contains the original Section 4 again, including the old thought experiment, volatility/cash-flow slides, and the full “evolution of problem solving” sequence. This is expected after the controlled rollback.

For this implementation:

- create and activate only the new slides 4.01–4.04 specified in this prompt;
- remove **all original Section 4 slide imports** from the active manifest for the duration of this review;
- after new slide 4.04, route directly to the existing close slide;
- do not allow any original Section 4 slide to remain reachable through normal deck navigation, overview mode, or deep links generated from the active manifest;
- keep the original Section 4 source files on disk for now as a rollback/reference safety net;
- do not delete those original files during this task;
- do not copy their old narrative, speaker notes, visual language, or terminology into the new slides;
- later, once the complete replacement Section 4 has been implemented and validated, the obsolete original files will be removed in a separate controlled cleanup.

The temporary active deck for this review should therefore be:

> Sections 1–3 → new 4.01 → new 4.02 → new 4.03 → new 4.04 → existing close

This is intentional. The old Section 4 must not appear in the running presentation after this task, even though its files remain in the repository.

# Implementation scope

Create or replace only the files required for these four slides and their minimal supporting components/styles.

Allowed:
- new slide files for 4.01–4.04;
- minimal reusable Open Claim Circuit component;
- minimal abstract surgery visual;
- necessary manifest changes to show only these four new Section 4 slides before the existing close while this group is reviewed;
- necessary CSS scoped to Section 4;
- necessary `src/assets.js` update if `store_of_value.png` is not currently exported.

Do not:
- implement slides 4.05 or later;
- edit the ten-property table;
- edit the comparison table;
- change comparison scores;
- modify Sections 1–3;
- modify the close slide except if absolutely required by temporary numbering;
- add dependencies;
- run `npm audit fix`;
- introduce stock imagery;
- introduce a new global design system.

If previous rejected Milestone 1 files still exist, do not reuse their design unless it matches this prompt. Replace the narrative, visible copy, notes and visual composition as specified here.

---

# Validation

After implementation:

1. Run `npm run build`.
2. Run `git diff --check`.
3. Review every changed file.
4. Verify all baseline slides still render.
5. Verify Section 3 → 4.01 → 4.04 → close works.
6. Inspect every build state of 4.01–4.04 at 1920×1080 and the intended recording viewport.
7. Test keyboard navigation forward and backward.
8. Test force-next and force-previous through all build states.
9. Test direct links to 4.01, 4.02, 4.03 and 4.04.
10. Test refresh/session restoration at a nonzero build step.
11. Test reduced-motion mode.
12. Test notes overlay and second-window notes mode.
13. Confirm no console errors.
14. Search active source for:
    - old thought-experiment wording;
    - German adviser;
    - economic energy as the definition;
    - perfect engineered solution;
    - stale problem-solving examples;
    - `L1:` artifacts.
15. Confirm slide 4.04’s Open Claim Circuit can be reused later.

Stop after reporting the implementation. Do not proceed to slide 4.05 or later.

Completion report must include:
- files changed;
- build result;
- browser validation actually performed;
- any visual judgment calls;
- exact local review URLs/deep links for 4.01–4.04;
- one recommended next action.
