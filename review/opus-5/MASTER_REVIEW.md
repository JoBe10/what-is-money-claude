# Claude Opus 5 — Whole-Deck Review
## *What Is Money? — And How Does Bitcoin Fit In?*

**Reviewer:** Claude Opus 5
**Date:** 26 July 2026
**Branch:** `worktree-opus-5-review` · **HEAD:** `b6aebdc1aacc420d0088cb83837ef5846eb8093b` · **Git status at start:** clean
**Scope:** Review only. No production slide, component, style, asset, note or engine file was modified. No commits were made.

---

## 0. Method and disclosures

### What I actually did

| Step | Result |
|---|---|
| Read `AGENTS.md`, `README.md`, `package.json`, `docs/what-is-money-presentation-master-document.md`, `docs/opus-5-whole-deck-review-prompt.md` | Done |
| Read `src/slides/manifest.js` and **all 56 active slide modules** with their complete speaker notes | Done |
| Read `src/main.js`, `src/assets.js`, all 5 files in `src/engine/`, all Section-4 components, and the shared legacy components | Done |
| Read `src/styles/globals.css` (385 lines) and `src/styles/slides.css` (3,769 lines) | Done |
| `npm run build` | **Passed** — built in 10.80 s, 41 MB `dist/` |
| Lint / tests | **Not run — no such scripts exist.** `package.json` defines only `dev`, `build`, `preview`. `AGENTS.md` §2 confirms this. I make no claim about lint or test status. |
| Ran the deck and walked **all 144 build states** forward, capturing a screenshot and the *actually-painted* text at each | Done |
| Full backward walk (56 states), second-pass traversal probes, direct-entry probes, refresh-at-build probes | Done |
| Full 144-state capture under `prefers-reduced-motion: reduce` | Done |
| Notes overlay, second-window notes, overview grid, help overlay, fullscreen control | Done |
| Viewports 1920×1080, 2560×1440, 1440×900, 1366×768 | Done |

### Two disclosures

**1. Dependency install.** `node_modules` was absent in this worktree. The review prompt contradicts itself: §3 says *"Do not: … install dependencies"*, while §4 says *"Install dependencies only if they are not already installed and the repository instructions permit it."* I resolved this the least invasive way available — I created a filesystem **junction** to the main checkout's existing, already-installed `node_modules` rather than running `npm install`. Nothing was downloaded, no lockfile was touched, and `node_modules/` is gitignored. Flagging rather than silently reconciling, per the instruction.

**2. Browser tooling.** The Claude-in-Chrome extension was not connected in this session. Rather than skip the browser phase, I drove **headless Chrome directly over the Chrome DevTools Protocol** using a throwaway Node script (no new dependencies — Node 24 has a global `WebSocket`). This turned out to be *better* evidence than manual clicking: every claim about on-screen content below is backed by a programmatic extraction of text that is genuinely painted (walking every text node and rejecting any with a `display:none`, `visibility:hidden`, or cumulative-opacity ≤ 0.04 ancestor), not by reading source or eyeballing.

### Evidence artefacts

```text
review/opus-5/MASTER_REVIEW.md            this document
review/opus-5/screenshots/INDEX.html      labelled contact sheet, all 144 states
review/opus-5/screenshots/1920x1080/      144 PNGs, forward walk
review/opus-5/screenshots/reduced-motion/ 144 PNGs, prefers-reduced-motion
review/opus-5/screenshots/regression/     second-pass repro + log
review/opus-5/screenshots/overlays/       notes, overview, help + log
review/opus-5/screenshots/viewports/      1440x900, 1366x768, 2560x1440
review/opus-5/screenshots/walk-forward-*.json   per-state painted text + overflow
review/opus-5/screenshots/console-*.txt   console capture
```

**Console is clean.** Zero errors, warnings or exceptions across the entire forward walk, backward walk, all regression probes and all viewport checks.

---

## 1. Executive judgment

### The short version

**Section 4 is genuinely excellent and close to recordable. The deck around it is not, and one defect will visibly break the talk.**

The rebuilt Section 4 does what the master document set out to do. It earns its framework instead of asserting it, the claim/carrier distinction is a real intellectual contribution rather than a repackaged slogan, the comparison table is presented with unusual honesty for a Bitcoin deck, and the ending lands without a price chart or a rocket. It is also, measurably, the only part of the deck that is technically correct: **zero** of the 12 reduced-motion content failures are in Section 4, and every one of its 23 slides reconstructs its state deterministically from a single integer.

Sections 1–3 are a different, older presentation. That is not an aesthetic judgment — it is visible in the instrumentation. Section 4 holds 76 of the deck's 88 build steps; Sections 1–3 hold 12 across 32 slides. Section 4 reveals ideas; Sections 1–3 mostly reveal *slides*, on `setTimeout` cascades that ignore the user's reduced-motion preference and leak their timers.

### Strongest aspects

1. **The claim/carrier hinge (4.04–4.07).** The single best idea in the deck. It converts "store of value" from a vague virtue into a job description with a testable failure surface, and it is the thing that makes the ten properties feel derived rather than imported.
2. **Inversion before enumeration (4.10–4.14).** Deriving the properties from failure modes is both intellectually stronger and more memorable than listing them. This is the deck's most defensible originality claim.
3. **The comparison table (4.16).** No total, no winner badge, no Bitcoin-column highlight, and an explicit "Don't trust the table. Verify every score." Institutional readers will notice and credit this.
4. **4.21 — the marginal decision.** The cleanest single frame in the deck. Symmetrical, neutral, five equal connectors, one claim at the decision point. It makes the argument without asserting the conclusion.
5. **Section 4's technical discipline.** `_applyBuild(n)` fully reconstructs target state from `n` in every one of the 23 slides. Forward, backward, direct entry and refresh-at-build all verified correct.
6. **Restraint at the end.** 4.23 drops every recurring visual and closes on typography. That was the right call.

### Weakest aspects

1. **A confirmed, reproducible rendering failure** that blanks five consecutive Section 2 slides and corrupts four Section 3 slides on any second traversal (F-01). This is not theoretical; I have before/after screenshots.
2. **The closing slide actively contradicts the deck's own guardrails** (F-02) — it reintroduces the explicitly banned "engineered" framing, delivers unqualified investment advice, and ends a first-principles argument on a Bitcoin-Twitter slogan.
3. **Reduced motion is half-implemented** (F-03) — honoured in CSS, ignored by the JS timers that actually gate content in the legacy sections.
4. **The presenter cannot read their own notes** on the deck's densest slide (F-04).
5. **Bitcoin is the only monetary form in Section 2 exempted from a stated weakness** (F-06). In the section whose job is to establish analytical credibility, this is the clearest tell that the deck is arguing rather than examining.

### Is the deck ready to record?

**No — but it is close, and the gap is mostly repair, not redesign.**

Nothing in Section 4's *argument* blocks recording. What blocks recording is: one rendering bug that will produce blank slides if you ever navigate backward and forward again; a closing slide that undoes the credibility the preceding 22 slides bought; and a set of factual errors (the 2008/2009 whitepaper date, two mutually confusing dollar-debasement baselines, the El Salvador example) that a knowledgeable audience member will catch on camera.

My estimate: **2–3 days of focused work** clears everything in the "must fix" tier. None of it requires touching Section 4's narrative.

### The single most important improvement

**Fix F-01 (the stale-scene bug).** Everything else on this list degrades the deck. This one breaks it, silently, with no console error, in exactly the situation a live talk creates — a presenter going back to re-explain something. The fix is two lines per file across 11 files: invert the lookup precedence and null the cached reference unconditionally on exit.

### Expected benefit

- **F-01 + F-04:** the deck becomes safe to present live and to navigate freely during Q&A.
- **F-02 + F-06 + the factual set:** removes every currently-identifiable place where a sceptic can say "this is advocacy, not analysis" — which is precisely the charge the deck is architected to defeat.
- **F-03:** makes the deck correct for viewers who need reduced motion, and removes 0.4–1.6 s of dead air per legacy slide for everyone else.
- **Section 1–3 build-step work (optional tier):** the highest-leverage *discretionary* change, because it is what makes the first 32 slides feel like they belong to the same presentation as the last 24.

### Runtime

| Section | Slides | Build steps | Clicks | Note words | ≈ minutes @140 wpm |
|---|---:|---:|---:|---:|---:|
| 1 — Opening | 7 | 7 | 14 | 457 | 3.3 |
| 2 — History | 15 | 2 | 17 | 1,685 | 12.0 |
| 3 — Functions | 10 | 3 | 13 | 1,387 | 9.9 |
| 4 — Ideal Store | 23 | 76 | 99 | 3,114 | 22.2 |
| 5 — Close | 1 | 0 | 1 | 86 | 0.6 |
| **Total** | **56** | **88** | **143** | **6,729** | **≈48** |

At a realistic delivery pace with the pauses the notes themselves call for, this is a **55–70 minute talk**. If the target is a 45-minute conference slot, roughly 15 minutes has to come out, and Section 2 is where it should come from (12 minutes for 15 slides carrying 2 build steps).

---

## 2. Top ten findings

Ranked by impact, not by ease of repair.

---

### F-01 — Continuation chains render stale or blank content on any second traversal

```text
ID:                   F-01
Severity:             Critical
Confidence:           High (reproduced programmatically, before/after screenshots)
Section / slide:      2.08-2.13 (Evolution walk), 3.07-3.10 (Monetisation stages)
Files:                src/slides/section-2-history/{09-barter,10-collectibles,11-precious-metals,
                        12-gold-backed,13-fiat,14-bitcoin}.js
                      src/slides/section-3-functions/{07-stage-collectible,08-stage-store-of-value,
                        09-stage-medium-of-exchange,10-stage-unit-of-account,11-where-is-bitcoin}.js
                      src/components/EvolutionScene.js, src/components/MonetisationScene.js
                      src/engine/SlideEngine.js:314-331, 372-377
```

**Observation.** Slide modules are ES-module singletons. Each continuation slide caches its scene API on `this._scene`, but `onExit` only clears it when the exit is *non-continuous*. On a linear pass every exit within the chain **is** continuous, so the cached reference is never released. On any subsequent traversal the engine builds a **new** container, but `onEnter` resolves `this._scene ?? ctx.container?.__evolution` — the stale reference wins, and the slide mutates a detached DOM tree while the live container never updates.

**Evidence.** Isolated reproduction, `review/opus-5/screenshots/regression/STALE-SCENE-REPRO.txt`:

```text
########## EvolutionScene (Section 2) ##########
  SLIDE                     PASS 1 (first traversal)              PASS 2 (second traversal)
X 2-08-barter               Prehistory / Barter                   (empty)
X 2-09-collectibles         ~100,000 BCE onwards / Collectibles   (empty)
X 2-10-precious-metals      ~600 BCE onwards / Precious Metals    (empty)
X 2-11-gold-backed          1700s - 1971 / Gold-Backed            (empty)
X 2-12-fiat                 1971 - today / Fiat                   (empty)
  >>> 5 of 7 slides render DIFFERENT content on the second traversal

########## MonetisationScene (Section 3) ##########
X 3-07-stage-collectible    The first stage / Collectible      Every monetary good in history...
X 3-08-stage-store-of-value The second stage / Store of Value  Every monetary good in history...
X 3-09-stage-medium-of-...  The third stage / Medium of Exch.  Every monetary good in history...
X 3-10-stage-unit-of-...    The final stage / Unit of Account  Every monetary good in history...
  >>> 4 of 6 slides render DIFFERENT content on the second traversal
```

Screenshots: `stale-EvolutionScene-pass1-2-09-collectibles.png` (full slide, correct) versus `stale-EvolutionScene-pass2-2-09-collectibles.png` — **the entire content area, image and all copy are gone, and the active pill is not even highlighted.** Only the title bar and the dim pill rail remain.

Only the *last* slide of each chain survives, because it is the only one whose `onExit` ever fires non-continuously.

**Why it matters.** This is the failure mode a live talk manufactures. Any of these trigger it: going back to re-explain a slide and advancing again; jumping via the overview grid; a rehearsal pass followed by the real talk in the same tab. The result is five consecutive slides of the Evolution of Money — the spine of Section 2 — rendering as an empty rail, with **no console error** to warn the presenter. It fails silently and looks like a crash on stage.

**Recommendation.** Two changes per file:
1. Invert the precedence so the live container always wins: `const api = ctx.container?.__evolution ?? this._scene;`
2. Clear the cache unconditionally: `onExit() { this._scene = null; }` (keep the `cleanup()` call gated on `!ctx.continuous`).

**Alternative.** Stop caching on the module entirely and read `ctx.container.__evolution` only. Slightly more invasive, strictly more correct — the container *is* the single source of truth, and the module-level cache buys nothing.

**Trade-off.** None. The cache has no performance role; `__evolution` is a direct property read.

**Estimated effort.** ~30 minutes for 11 files plus a re-run of the second-pass probe. The same latent pattern exists in the five *inactive* `__problemSolving` modules; fix or delete them together (F-08).

---

### F-02 — The closing slide contradicts the deck's own intellectual guardrails

```text
ID:                   F-02
Severity:             High
Confidence:           High
Section / slide:      5.01 - Thank you (deck position 56)
Files:                src/slides/section-5-close/01-thank-you.js
```

**Observation.** Four separate problems, all in the last thing the audience hears.

**Evidence.** Verbatim from `01-thank-you.js:104-114`:

> "Thank you for your time tonight. I hope this gave you a clearer mental model for what money is and why Bitcoin is **engineered** to be a good one.
>
> Stay humble — none of us have all the answers. ...
>
> And stack sats. Whatever the price is on any given day, **the strategy that's worked for every other monetary good in history is: accumulate slowly, hold patiently, ignore the noise.**
>
> Happy to take questions."

On screen: `Thank you.` / `Stay humble, and stack sats.` (88 px, accent orange).

1. **"engineered"** is the one surviving instance of the framework the master document explicitly bans. Section 15: *"Do not reintroduce: ... repurposed versus purpose-built; perfect engineered solution."* `AGENTS.md` section 14 lists "perfect engineered solution" as a required search-and-destroy term. I swept all active files: **this is the only hit in the deck.** The rebuild cleaned Sections 1-4 and missed the close.
2. **"the strategy that's worked for every other monetary good in history"** is false, and the deck itself proves it false 35 slides earlier. Section 2 teaches that cowries were inflated to worthlessness and that fiat lost most of its purchasing power. Patient accumulation of those monetary goods was ruinous. This sentence contradicts the deck's own central lesson.
3. **"stack sats ... whatever the price is on any given day"** is unqualified investment advice, and it directly negates master document section 2, which disclaims *"Bitcoin is attractive at every price."*
4. **Transcript artifacts** — the notes are wrapped in literal quotation marks and hard-wrapped mid-sentence, which `AGENTS.md` section 11 prohibits. "tonight" also hard-codes an evening event.

Separately: the deck's only disclaimer (*"this is not investment advice and is purely for educational purposes only"*) appears on slide **8**, and nowhere near slide 56 where the actionable financial exhortation actually sits.

**Why it matters.** Slides 4.01-4.23 spend twenty-two slides carefully bounding every claim — no price forecast, no total score, no winner badge, "the scores are judgements", "don't trust the table". Then the final frame throws it away. An institutional viewer's last impression is a slogan and an unqualified accumulation strategy. This is the highest-leverage credibility fix in the deck because it costs almost nothing and is the last thing anyone remembers.

**Recommendation.** Rewrite the notes to remove "engineered", the universal-history claim and the price-independent advice. Replace the on-screen second line. Move or duplicate the disclaimer here.

**Alternative (my preference).** Make **4.23 the true final frame** and reduce 5.01 to a silent `Thank you.` hold on black. The master document section 11 already invites exactly this question. 4.23 ends on *"It only needs to become the preferred place to store the next unit of value."* — a far stronger last image than a bitcoin-symbol watermark and a slogan.

**Trade-off.** "Stay humble, stack sats" will land warmly with a Bitcoin-native audience; dropping it costs a small in-group applause moment. Given the deck's stated audience includes finance professionals, institutional investors and sceptics, I judge the trade clearly worth it — but this is the presenter's call, not mine.

**Estimated effort.** 30 minutes for the notes rewrite; 1 hour if the slide is restructured.

---

### F-03 — prefers-reduced-motion is honoured in CSS but ignored by the JS timers that gate content

```text
ID:                   F-03
Severity:             High
Confidence:           High (144-state capture under forced reduced motion)
Section / slide:      1.4, 2.01, 2.02, 2.03, 2.05, 2.06, 2.07, 2.14, 3.01, 3.04, 3.05, 5.01
Files:                src/styles/globals.css:378-385 (the global override)
                      12 legacy slide modules + src/components/SectionOpener.js
```

**Observation.** `globals.css` collapses `transition-duration` and `animation-duration` globally under `prefers-reduced-motion: reduce`, and Section 4 adds thorough per-block `transition-delay: 0ms` overrides. But in Sections 1-3 and 5, content visibility is gated by **JavaScript `setTimeout` cascades**, which no CSS media query can touch.

**Evidence.** I captured all 144 states with Chrome launched under `--force-prefers-reduced-motion`, sampling 260 ms after each transition settled, and diffed the painted text against the normal run:

```text
  slide  4 b0  05-matrix              missing: "Once you see it, you can't unsee it."
  slide  8 b0  2-01-section-opener    missing: "Where money came from", "A brief history of humanity's..."
  slide  9 b0  2-02-the-problem       missing: "Before money, there was barter. And barter had a fatal flaw."
  slide 12 b0  2-04-the-solution      missing: "Not by design. Not by decree.", "By spontaneous market consensus."
  slide 13 b0  2-05-insight-emerged   missing: entire body copy (both paragraphs)
  slide 14 b0  2-06-insight-iteration missing: "Every monetary form we'll see was an improvement..."
  slide 22 b0  2-14-transition-out    missing: "Next question: what does money actually do?"
  slide 23 b0  3-01-section-opener    missing: "The three functions every money must perform"
  slide 25 b0  3-04-fiat-fails        missing: "Shares", "Art", "Bitcoin" (3 of 5 substitute tiles)
  slide 26 b0  3-05-foundation        missing: the bitcoin glyph, "Store of Value", and its whole description
  slide 56 b0  5-01-thank-you         missing: "Stay humble, and stack sats."

  TOTAL states with reduced-motion content gaps: 12 of 144
```

**Not one of the 12 is in Section 4.** Section 4's 23 slides are fully reduced-motion correct — they use `data-*` attributes plus CSS state and contain no timers at all.

Worst cases: slide 26 (`3-05-foundation`) withholds the entire Store-of-Value column — the punchline of the slide — behind a 990 ms JS timeout *plus* a 600 ms CSS `transition-delay` that the global override does not reset. Slide 13 withholds all body copy behind 1,100 ms.

**Why it matters.** Two distinct harms. For a viewer who has set reduced motion — often for vestibular or migraine reasons — the deck silently ignores the preference for the content that matters most. For *everyone*, these are 0.4-1.6 s of dead air per slide during which the presenter is talking to a title and blank space. `AGENTS.md` section 8 requires "respect `prefers-reduced-motion`" and "ensure the final state is clear even when motion is disabled".

**Recommendation.** Adopt Section 4's pattern in the legacy slides: read `prefersReducedMotion()` in `onEnter` and apply the end state synchronously instead of scheduling it. The helper already exists — it is declared three separate times (`06-insight-emerged.js`, `15-transition-out.js`, `SlideEngine.js`); promote one to a shared module.

**Alternative.** Cheaper interim fix: keep the timers but multiply every delay by `prefersReducedMotion() ? 0 : 1`. Mechanical, low-risk, ~2 hours for all 12 slides. Does not fix the leaked-timer problem (F-09), but fully fixes this one.

**Trade-off.** The staged reveals are genuinely handsome at full motion; making them instant under reduced motion is exactly the intended behaviour, so nothing is lost.

**Estimated effort.** 2 hours (interim) to half a day (full port to the Section 4 pattern).

---

### F-04 — The speaker-notes overlay clips long notes with no way to scroll

```text
ID:                   F-04
Severity:             High
Confidence:           High (measured DOM geometry + screenshot)
Section / slide:      Engine-wide; worst on 4.16 (2,352-char notes) and 4.15 (1,773)
Files:                src/engine/NotesOverlay.js, src/styles/globals.css (.notes-card, .notes-card__body)
```

**Observation.** The notes card is sized by content with `overflow-y: visible` and is vertically centred. When the notes exceed the viewport, the card grows past both edges and the overflow is simply unreachable — there is no scrollbar and no keyboard scroll.

**Evidence.** Measured on slide 4.16 at 1920x1080:

```json
{"cardHeight":1688,"cardTop":-304,"cardBottom":1384,"viewportH":1080,
 "bodyOverflowY":"visible","cardOverflowY":"visible","clipped":true}
```

The card is 1,688 px tall in a 1,080 px viewport. 304 px is cut off the top and 304 px off the bottom. Screenshot `overlays/notes-overlay-4-16.png` confirms the visible window begins mid-note at *"The point is to make each structural trade-off visible."* — the first three paragraphs, the slide title and the section kicker are all above the frame. At the bottom it stops mid-sentence at *"...this table compares architecture, not valuation."*, cutting off the remaining paragraphs **including the bridge into the next slide** (*"So where does that monetary demand currently go?"*).

The card footer is also off-screen, which means the **"Open in second window" and "Copy slide URL" buttons are unclickable** on exactly the slides where the second window is most needed.

**Why it matters.** 4.16 is the deck's most content-dense and most challengeable slide — ten rows of scores the presenter has to defend live. It is the single worst slide on which to lose the framing at the top and the transition at the bottom. And the documented workaround (pop the notes into a second window) is unreachable because its button is off-screen.

**Recommendation.** Cap the card at `max-height: calc(100vh - 80px)`, give `.notes-card__body` `overflow-y: auto`, and pin the footer so the buttons always remain in view.

**Alternative.** Additionally split notes over 1,500 characters across the slide's build steps, so the presenter sees only what is relevant to the current state. Better ergonomics, materially more work, and it changes the notes data shape.

**Trade-off.** A scrollbar inside the overlay is slightly less clean visually. Irrelevant — this surface is presenter-facing only and never recorded.

**Estimated effort.** 30 minutes for the CSS fix.

---

### F-05 — Two mutually confusing dollar-debasement baselines, plus a wrong Bitcoin date

```text
ID:                   F-05
Severity:             High
Confidence:           High
Section / slide:      2.13 (fiat), 2.14 (bitcoin), 3.04 (fiat fails)
Files:                src/slides/section-2-history/13-fiat.js, 14-bitcoin.js
                      src/slides/section-3-functions/04-fiat-fails.js
```

**Observation.** Three distinct factual problems in adjacent parts of the argument.

**Evidence.**

1. **Two baselines, four slides apart.**
   - `13-fiat.js` notes (deck slide 20): *"The U.S. dollar has lost over 96% of its purchasing power since 1913."*
   - `04-fiat-fails.js:58`, **on screen** (deck slide 25): *"The US dollar has lost over 85% of its purchasing power since 1971."*

   Both figures are individually defensible (roughly 96-97% from 1913 CPI-U; roughly 87% from 1971). But they are delivered about five minutes apart with no acknowledgement, and an attentive listener hears a contradiction. Worse, the 1913 figure is spoken **inside the slide labelled "Fiat — 1971 — today"**, attributing to the post-1971 fiat era a number that includes 58 years of gold-standard and Bretton Woods history. That is an analytical error, not just a presentational one.

2. **The whitepaper date is wrong.** `14-bitcoin.js` notes: *"2009: an anonymous developer publishes a paper and a working implementation."* The whitepaper was published **31 October 2008**; only the implementation and genesis block are 2009. "Anonymous" should also be "pseudonymous", and the singular asserts something unknown.

3. **"sendable anywhere instantly"** (same notes) is wrong for on-chain Bitcoin, which targets roughly 10-minute blocks with multiple confirmations typically recommended. The deck never mentions Lightning in this section, so nothing rescues the claim.

Also in the same notes: *"Gold's scarcity (capped supply, impossible to inflate)"*. The 21 M cap is real, but issuance continues for over a century and the cap is a consensus rule, not a physical law. **The number 21 million is never stated anywhere in Section 2** — the deck's central scarcity claim is made without its number.

**Why it matters.** These are the errors a knowledgeable audience member corrects out loud, on camera. The whitepaper date in particular is checkable in five seconds and is the kind of slip that makes an audience discount everything else. It is also gratuitous — the correct facts are just as rhetorically strong.

**Recommendation.** Pick **one** baseline (1971 is the honest one for a fiat-era claim) and use it in both places, with the index and date cited. Correct to *"October 2008: a pseudonymous author publishes the whitepaper. January 2009: the network goes live."* Replace "instantly" with "in minutes, without permission". Replace "impossible to inflate" with "capped at 21 million and disinflating on a fixed schedule" — and say the number.

**Alternative.** Keep the 1913 figure but move it to the gold-backed slide where it belongs chronologically, and explicitly narrate the two regimes.

**Trade-off.** "96%" is rhetorically bigger than "87%". Using the smaller, correct-for-the-claim number costs a little punch and buys immunity from the objection.

**Estimated effort.** 1 hour.

---

### F-06 — Bitcoin is the only monetary form in Section 2 exempted from a stated weakness

```text
ID:                   F-06
Severity:             High
Confidence:           High
Section / slide:      2.14 - Evolution - Bitcoin (deck position 21)
Files:                src/slides/section-2-history/14-bitcoin.js
```

**Observation.** The Evolution walk establishes a rigid, teaching-effective pattern: each stage gets bullets describing what it solved, then a red `BUT —` row naming what it failed at. Barter, Collectibles, Precious Metals, Gold-Backed and Fiat all receive one. **Bitcoin receives none.**

**Evidence.** `14-bitcoin.js` supplies `bullets` but no `painPoint`/`painPoints` key — verified against the five sibling modules, all of which supply one. Screenshot `s21-b0-2-13-bitcoin.png` shows the resulting layout: two bullets, then empty space where every previous slide had a red row.

**Why it matters.** This is the most damaging structural tell in the deck, and it sits in the section whose job is to establish that the presenter reasons rather than advocates. The pattern has been drilled into the audience five times; its absence on the sixth is loud. A sceptic reads it as: *the analysis was a setup.*

It also makes Section 2 **less honest about Bitcoin than Section 4 is** — Section 4 openly gives Bitcoin 2/5 on track record and 4/5 on fungibility, and says so out loud. Section 2 gives it a clean sheet.

**Recommendation.** Add a `BUT —` row consistent with what Section 4 already concedes. Drawing only on the deck's own later admissions, for example:

> `BUT —` *Short history. Volatile. Its guarantees rest on continued network security, on holders managing their own keys, and on rules enforced by consensus rather than physics.*

**Alternative.** A softer `OPEN QUESTION —` row in a neutral colour rather than the red used for established failures, preserving the "we do not know yet" stance without implying a proven flaw. This may fit the `?` symbol the timeline already deliberately keeps between Fiat and Bitcoin.

**Trade-off.** It slightly deflates the section's climax. It buys far more than it costs: the presenter can then say "we named a weakness for every single form, including this one" — a strong line to be able to deliver.

**Estimated effort.** 30 minutes, plus a notes sentence.

---

### F-07 — Slide 1.7's notes promise five sections; the deck has three

```text
ID:                   F-07
Severity:             High
Confidence:           High
Section / slide:      1.7 - The Path Forward (deck position 7)
Files:                src/slides/section-1-opening/08-path-forward.js
```

**Observation.** The on-screen roadmap lists three destinations. The spoken notes promise five, two of which do not exist.

**Evidence.** On screen (`08-path-forward.js:4-6`): `Where money came from` / `What money does` / `What makes money good`.

Notes: *"We'll trace where money came from..., look at what money does..., **dig into what money is at its core — the essence —** ask what makes one form of money better than another, and **zoom out at the end to what all of this means for civilization itself.**"*

There is no "essence of money" section and no "civilization" section. `manifest.js` ends `section5 = [s5_01]` — a thank-you slide. A source comment at `08-path-forward.js:10-11` confirms the reduction from five steps to three was deliberate; the notes were never updated.

**Why it matters.** This is the deck's promise to the audience, delivered in the first three minutes. Two unfulfilled promises create a low-grade sense that something was cut — and one of them ("the essence") names the presenter's *separate planned future presentation*, which master document section 3 explicitly lists as a non-goal of this deck.

There is a related, subtler mismatch: `3-02-three-roles.js` notes end *"they don't tell us what money IS. That's the question we'll answer in the next section."* Section 4 answers what a **store of value** is. The "what money is" promise is made twice and paid off only obliquely — 4.04's "an earned, transferable claim on value" does answer it, but the deck never announces that it has.

**Recommendation.** Rewrite the 1.7 notes to describe exactly the three beats on screen. Then either (a) drop the "what money IS" promise from 3.02, or better (b) have 4.04 explicitly cash it: *"That is the answer to the question I posed at the start: money is an earned, transferable claim on value."* A strong callback that costs one sentence.

**Alternative.** Add a fourth roadmap row. Not recommended — the deck does not deliver a fourth section, and lengthening the opening runs against the pacing problem.

**Trade-off.** None.

**Estimated effort.** 20 minutes.

---

### F-08 — Thirteen orphaned Section 4 modules still carry the explicitly rejected framework

```text
ID:                   F-08
Severity:             Medium
Confidence:           High
Section / slide:      n/a - dead files
Files:                src/slides/section-4-ideal-store/{01-transition, 02-section-opener,
                        03-thought-experiment, 04-properties, 05-comparison, 06-objection-volatility,
                        07-objection-cashflow, 08-dont-trust-verify, 09-problem-solving-intro,
                        10-example-light, 11-example-communication, 12-example-food,
                        13-bitcoin-solution}.js, _problem-solving-rows.js
                      src/components/ProblemSolvingScene.js
```

**Observation.** Thirteen slide modules and their supporting component/data files remain on disk, absent from the manifest. They contain precisely the narrative master document section 15 forbids reintroducing: the evolution-of-problem-solving sequence, the lighting / communication / refrigeration examples, and repurposed-versus-purpose-built framing.

**Evidence.** `manifest.js` imports 23 Section 4 modules; `src/slides/section-4-ideal-store/` contains 36 `.js` files. The orphans carry `number:` values 35-47 that collide extensively with the active set. `assets.js` still imports and bundles their icons (`iconSolutionLightbulb`, `iconSolutionRefrigerator`, `iconMisuseFire`, `iconRepurposedSolution`, and others) with comments referencing slide numbers that no longer exist.

My sweep for banned terms across all **active** files came back clean except for the single "engineered" in F-02 — the rebuild did its job. The risk is entirely about what happens next.

**Why it matters.** Two harms. First, a future agent or collaborator reading `src/slides/section-4-ideal-store/` sees 36 files, cannot tell which 23 are live, and may well "restore" rejected content in good faith. `AGENTS.md` section 9 explicitly says "Do not leave dead code, alternate copy, or abandoned prototypes." Second, the dead icons ship in the production bundle.

**Recommendation.** Delete the 13 modules, `_problem-solving-rows.js`, `ProblemSolvingScene.js`, and the now-unused imports in `assets.js`. Git history preserves them. If deletion feels premature, move them to `docs/archive/` with a README stating they are rejected.

**Alternative.** Leave them and add a header comment to each. Weaker — comments are not read before files are.

**Trade-off.** Deleting removes the easiest path back to prior work. Given the master document is emphatic that this framework must not return, that is a feature.

**Estimated effort.** 1 hour including an `assets.js` cleanup and a rebuild.

---

### F-09 — Uncancelled timers and RAF handles across ~15 legacy slides; one global side effect at import time

```text
ID:                   F-09
Severity:             Medium
Confidence:           High
Section / slide:      Sections 1, 2, 3, 5 (Section 4 is clean)
Files:                ~15 legacy modules, src/components/SectionOpener.js
                      src/slides/section-2-history/07-insight-iteration.js:228-238
                      src/components/{AmbientCrystal,EvolutionScene,MonetisationScene}.js
```

**Observation.** Roughly 45 `setTimeout` calls across the legacy sections are scheduled without storing a handle, and the corresponding `onExit` is `{}`. `AGENTS.md` section 8 requires cleanup of "`setTimeout`, `setInterval`, GSAP timelines, listeners, observers, and injected styles".

Two sub-issues are worth separating:

1. **Import-time global mutation.** `07-insight-iteration.js:228-238` appends `<style id="iter-pulse-kf">` to `document.head` in a module-scope IIFE — that is, the moment `manifest.js` is imported, on app boot, for every viewer, whether or not the slide is ever shown. Nothing removes it. `AmbientCrystal.js:131` does the same on first use.
2. **`cleanup()` does not clean up.** Both `EvolutionScene.cleanup()` and `MonetisationScene.cleanup()` consist of a single `delete container.__evolution` / `__monetisation`. They cancel no timers and detach no DOM. The name actively misleads — and it is a contributing factor to F-01.

**Evidence.** Verified by grep and by reading each `onExit`. Both `Murmuration` consumers (2.05, 2.14) *do* correctly `cancelAnimationFrame` and null the handle — credit where due; those two are the exception, not the rule.

**Why it matters.** Today the practical impact is bounded: the engine removes the container, so orphaned callbacks write to detached nodes and are garbage-collected. It is not currently causing a visible bug. But it is the substrate that makes F-01 possible, it will bite the moment anyone adds a listener or an interval, and the import-time style injection is a genuine correctness smell for a deck that may later be embedded elsewhere.

**Recommendation.** Store handles in a slide-local array and clear them in `onExit`. Move the two keyframe injections into `slides.css`, where every other keyframe already lives (`particle-drift` is already there) — this removes the `document.head` mutation entirely rather than managing it. Rename `cleanup()` to something honest, or make it actually tear down.

**Alternative.** A small shared timer-registry helper used by all legacy slides. Cleaner long-term; more churn now.

**Trade-off.** ~15 files touched for no user-visible change today. Justified mainly as the precondition for fixing F-01 and F-03 properly — do it in the same pass.

**Estimated effort.** Half a day, largely overlapping with F-03.

---

### F-10 — slide.number is dead metadata, wrong on 32 of 56 slides, and duplicated

```text
ID:                   F-10
Severity:             Medium
Confidence:           High
Section / slide:      All of Sections 1-3
Files:                every module in sections 1-3, src/engine/NotesOverlay.js:57-59
```

**Observation.** Two slides were deleted (`section-1-opening/04-what-is-money.js` and `section-3-functions/03-real-world.js`) and the surviving modules were never renumbered. Section 4 and Section 5 *were* renumbered during the rebuild, so the two schemes now overlap.

**Evidence.**

| Range | `number` versus true manifest index |
|---|---|
| Slides 1-3 | correct |
| Slides 4-22 (1.4 to 2.15) | **+1** |
| Slides 23-24 (3.01-3.02) | **+1** |
| Slides 25-32 (3.03 to 3.11) | **+2** |
| Slides 33-56 (Section 4 + close) | correct |

Duplicates among **active** slides: `number: 33` on both `3-10-stage-unit-of-account` and `4-01-ideal-store-of-value`; `number: 34` on both `3-11-where-is-bitcoin` and `4-02-define-the-job`. `AGENTS.md` section 10: *"Do not leave two slides with the same ID or number."*

The semantic IDs drifted the same way: `03-barter-works.js` yields `2-03-barter-works` and `04-double-coincidence.js` yields `2-03-double-coincidence` — both prefixed `2-03`. Every Section 2 ID from there on trails its filename by one.

**Why it matters.** Nothing user-visible — I verified this directly. `SlideEngine._updateChrome()` uses `index + 1`, and `NotesOverlay.setSlide()` takes the engine's number and normalises it *before* broadcasting, so even the second-window notes show the correct figure. `NotesOverlay.js:57-59` documents the decision explicitly. So the field is **dead** — which is exactly why it is dangerous: it is wrong in 32 files, invisible at runtime, and will mislead the next person who tries to use it.

**Recommendation.** Delete the `number` field from all 56 modules. It is unused, and the manifest is already the single source of truth for ordering.

**Alternative.** Regenerate it from the manifest at boot: `slides.forEach((s, i) => { s.number = i + 1; })` in `main.js`. Keeps the field for anyone who wants it and makes drift structurally impossible.

**Trade-off.** Deleting touches every slide file. The alternative is a one-line change and strictly safer. I recommend the alternative.

**Estimated effort.** 15 minutes for the alternative; 1 hour for full deletion.

---

## 3. Narrative review

### 3.1 Whole deck

**The central thesis** — reconstructed from the implemented deck, not the master document:

> An asset whose monetary rules cannot be changed unilaterally may win a growing share of the recurring decision about where to carry deferred purchasing power through time.

**When does it first become clear?** Not until **slide 49 of 56** (4.17, "When the Store-of-Value Function Migrates"). Everything before that is scaffolding: money is a claim, claims need carriers, carriers can fail, here are the properties, here is the table. Those are all *inputs*. The investment thesis proper starts at 4.17 and completes at 4.22.

This is a deliberate and, I think, correct choice — the master document's whole argument is that the conclusion must be earned. But it has a consequence the deck does not currently manage: **for the first 48 slides the audience does not know what they are being asked to decide.** The opening promises "why should we care" and "Bitcoin is money", then spends 40 minutes on prerequisites.

**Where is it repeated unnecessarily?** The closing movement restates itself four times:

- 4.19: *"It is a monetary asset competing for the premium attached to everything else."*
- 4.20: *"Bitcoin competes with their monetary function — not their reason to exist."*
- 4.22: *"Marginal flows can reprice the entire stock."*
- 4.23: *"Bitcoin does not need to replace everything."*

4.19 and 4.20 are close to the same slide. 4.19 says Bitcoin's utility is monetary, so it competes for the premium; 4.20 says the other assets keep their primary functions, so Bitcoin competes only for the premium. That is one idea stated from two sides. The master document treats them as distinct beats; in the running deck, watching them back to back, the second feels like a restatement rather than an advance.

**Where is it insufficiently supported?** The weakest joint in the whole argument is between 4.16 (the table) and 4.17 (migration). The table establishes *architecture*. 4.17 asserts that savers do not trust fiat over long periods and that demand therefore migrates. That empirical premise — the load-bearing one for the entire investment thesis — receives **no evidence anywhere in Section 4**. The supporting data exists back on slide 25 (`3-04-fiat-fails`: the 85%-since-1971 figure and the substitute-asset tiles), 24 slides earlier. By the time the claim is used, its support has been forgotten.

**Structurally indispensable slides.** 4.03-4.04 (the surgeon and the unfinished exchange), 4.06 (claim and carrier), 4.07 (the definition), 4.10 (inversion), 4.13-4.14 (failures to properties), 4.16 (the table), 4.18 (monetary premium), 4.21 (marginal decision), 4.23 (conclusion). Remove any one and the chain breaks.

**Candidates for compression.**

| Slides | Observation |
|---|---|
| 4.19 + 4.20 | One idea, two slides. Merge, or make 4.19 purely about Bitcoin's *difference* and 4.20 purely about *coexistence*. |
| 4.08 + 4.09 | 4.08 sends the claim to 2126; 4.09 says we do not know 2126. Nine build steps between them for a single premise. |
| 2.02-2.04 | Three slides (the problem / barter works / double coincidence) to establish one idea. 2.03 exists mainly to set up 2.04's reversal — effective, but expensive at this runtime. |
| 2.06 + 2.07 | Two "Key Insight" slides back to back with no build steps. Both are statements, not developments. |
| 3.07-3.10 | Four slides, one per monetisation stage, zero build steps, ~40 words each. This is the single most compressible run in the deck: it could be one slide with four build steps and would gain from the progressive reveal. |

**Weak or unearned transitions.**

1. **3.11 into 4.01** is the weakest in the deck. 3.11's notes end on a backward-looking rebuttal of fiat (*"Fiat is the one that skipped the order — and that's why it's failing."*) with **no forward reference at all**. 4.01's notes then have to cold-recap all three prior sections from scratch. The bridge sentence that should be here (*"This sets up everything that follows: what an ideal store of value would actually look like"*) is stranded four slides earlier on 3.04.
2. **4.14 into 4.15** jumps from "here are the ten properties" straight to "let us apply them to five assets" without ever justifying *why those five*. The justification exists in 4.15's notes but not in its visible copy or its transition.
3. **1.3 into 1.4** — the deleted slide left a seam. `03-why-care` ends on the orange punch line *"Bitcoin is money."* and the next slide opens on the Matrix pill image. The connective tissue that presumably lived in the deleted `04-what-is-money.js` is gone.

**Where a sceptical viewer can mentally exit.**

- **Slide 3 (`03-why-care`, build 4):** *"Bitcoin is money."* asserted in 56 px orange with no support. The notes acknowledge this and defer, which is honest, but a sceptic's first impression is now "advocacy deck".
- **Slide 21 (Bitcoin gets no `BUT —`):** F-06. The clearest structural tell.
- **Slide 26 (`3-05-foundation`):** *"Store of value is what makes the other two functions possible."* is presented as settled fact. It is a specific (broadly Austrian) position; the mainstream reading treats medium of exchange as primary. Stating a contested claim as settled, in the slide that justifies the whole rest of the deck, is where a monetary economist stops listening.
- **Slide 32 (`3-11`):** *"Bitcoin isn't supposed to be a medium of exchange yet"* — a normative "supposed to" stated as fact, in tension with the whitepaper's own subtitle.
- **Slide 56:** F-02.

**Where does the deck feel promotional rather than analytical?** Almost exclusively in Sections 1-3 and the close. Section 4 is consistently analytical — it concedes, qualifies, invites disagreement and refuses to declare a winner. The promotional register lives in: slide 3's bare assertion, slide 21's missing weakness, slide 25's Bitcoin tile enlarged and orange-labelled while the accompanying copy pointedly omits Bitcoin from the list, and slide 56's slogan.

This is worth stating plainly: **the deck's rebuilt heart is more intellectually disciplined than its inherited frame.** The credibility risk is entirely front-loaded and back-loaded.

**Does the ending resolve the opening?** Partially. The opening asks "What is money?" The ending answers "which carrier wins the next unit of savings" — a different question. 4.23's first summary line (*"Money is a claim on value."*) does resolve it, but it is one of four lines, is on screen for a few seconds, and is then removed. See the F-07 recommendation: making 4.04 explicitly cash the opening question would close this loop properly.

**Does each section create the need for the next?** Sections 1 → 2 → 3, yes. Section 3 → 4, weakly (see above). Section 4 → 5, no — the close arrives as an interruption rather than a release.

---

### 3.2 Section 1 — Opening (7 slides, 14 clicks, ~3.3 min)

**What works.** It is short. At 3.3 minutes for 7 slides it is the most economical section in the deck, and that is right for an opening. `08-path-forward` is a genuinely good slide — the growing rail, the numeral treatment and the three-beat roadmap read clearly and reconstruct state correctly on backward navigation.

**What does not.**

- **The orange-pill device.** The master document asks directly whether it "still feels premium or dated". My assessment: the *concept* is fine and audience-appropriate; the *execution* is the problem. Both 1.5 and 1.6 render their entire content as a baked PNG — the five ingredient labels exist only as pixels. They cannot be proof-read, spell-checked, restyled, translated or re-flowed, they carry no accessible text beyond one `alt` string, and any copy change requires a PowerPoint re-export. Two 700 KB PNGs are also both mounted simultaneously and cross-faded, so the slide loads 1.4 MB to show one image. That is the strongest argument for rebuilding this pair in DOM, independent of any aesthetic view.
- **A title mismatch.** Slide 1.6's module declares `title: 'Orange Pill Focus'`, but the shared component hard-codes the on-screen title as `Ingredients of the Orange Pill`. The notes overlay and overview grid therefore label the slide differently from what the audience sees.
- **Visual maturity versus Section 4.** Yes, it reads as older. Concretely: 4 of 7 slides have empty `onExit` with live timers; 4 of 7 use timer-gated reveals that break under reduced motion; the section uses four distinct hard-coded white-alpha values (0.65, 0.7, 0.72, 0.78) where three tokens already exist; and two different "subtitle" treatments coexist (slide 1.1 uses the `.subtitle` class then overrides its colour inline; slide 1.4 bypasses the class entirely).
- **Typography inconsistency.** Slide 1.3 uses an ASCII apostrophe in `can't`; slide 1.4 uses a typographic apostrophe in `can't`. Small, but this is a deck whose stated standard is "premium".

**Does the opening create enough curiosity?** Yes — slide 1.2 (`The Most Important Question Nobody Asks` over the question-mark image) is a strong hook and the strongest frame in the section. My reservation is the opposite of insufficient curiosity: slide 1.3 pays the curiosity off too early with a bare assertion.

---

### 3.3 Section 2 — History (15 slides, 17 clicks, ~12.0 min)

**What works.** The six-stage Evolution walk is the best-designed *system* outside Section 4: a persistent rail, a moving active state, a shared content scaffold, and the deliberate `?` between Fiat and Bitcoin that is never resolved into a bitcoin symbol. That last detail is a genuinely good piece of restraint and I would protect it.

`04-double-coincidence` is the best-taught idea in the legacy sections — showing barter working, then breaking it, then breaking the repair, is real pedagogy.

**What does not.**

- **F-01 breaks five of the six walk slides on any second pass.** This is the section's dominant problem.
- **F-06 — Bitcoin gets no weakness.**
- **Length.** 12 minutes and 15 slides carrying 2 build steps between them. If the talk needs to fit 45 minutes, this is where the time is.
- **Two on-screen self-contradictions.**
  - 2.11 (Precious Metals) asserts `Durable, divisible, hard to inflate.` and then, on the same screen, `BUT — ... Difficult to subdivide for small transactions.` The notes reconcile it (coins versus slivers); the screen does not.
  - 2.12 (Gold-Backed) notes say *"The dotted line under Gold-Backed and Fiat"*. The bracket drawn by `EvolutionScene.js:86-99` is **solid** — `stroke-width: 1.5`, no dash array. The presenter will point at a solid line and call it dotted.
- **A category error in the bracket itself.** The `GOVERNMENT-ISSUED` bracket spans Gold-Backed **and** Fiat across "1700s — 1971". For most of that span, gold-redeemable notes were issued by *private* banks — London goldsmiths, Scottish free banking, US National Bank notes before 1913. This is not a quibble: the bracket is the visual on which the deck's "trust changes hands" argument rests.
- **Content overflow on 2.14.** Measured: the Bitcoin image box runs to y=1141 against a 1080 stage — 61 px clipped. Visible in `s21-b0-2-13-bitcoin.png` as a cut-off sphere. It is the only Evolution slide whose image is clipped, so it reads as a mistake rather than a bleed.
- **Two "Key Insight" slides (2.05, 2.06) in a row**, both static statements. The murmuration on 2.05 is lovely and conceptually apt (spontaneous order, no leader) — but 2.06's six-circle diagram is decorative rather than explanatory, and its infinite pulse animation runs on a slide with no build steps.

---

### 3.4 Section 3 — Functions (10 slides, 13 clicks, ~9.9 min)

**What works.** The three functions are cleanly separated, and the coffee objection is handled head-on rather than avoided. Positioning Bitcoin between collectible and store of value is the honest answer and the deck gives it.

**What does not.**

- **F-01 corrupts four of the six monetisation slides on a second pass.**
- **A dead first click.** `3-02-three-roles` declares `totalBuildSteps: 3`, but `onEnter` already calls `reveal(1)` and build step 1 calls `reveal(Math.max(1, 1))` — the same state. The presenter's first press does nothing. Retreating to step 0 also cannot hide column 1, so steps 0 and 1 are visually identical in both directions.
- **The pill rail carries no information on the slide where state is the point.** On 3.11 (`s32-b0-3-11-where-is-bitcoin.png`) all four stage pills render in the same dim treatment. The bitcoin marker between COLLECTIBLE and STORE OF VALUE does all the work; the pills themselves communicate nothing about what has been passed and what is ahead. On the payoff slide of a four-stage sequence, the four-stage graphic should be doing more.
- **An unattributed framework.** The four stages of monetisation are Vijay Boyapati's ("The Bullish Case for Bitcoin", 2018). The deck presents them with `Every monetary good in history that emerged organically followed this pattern.` and credits no one. Given that master document section 15 shows acute sensitivity about originality and provenance elsewhere, this omission is inconsistent with the deck's own standard.
- **The most careful sentence in the section is invisible.** 3.06's notes say *"the stages overlap significantly... The framework describes the DOMINANT function... not strict gates that must be cleared."* Nothing on screen conveys this, and the four-pill-with-arrows graphic actively implies strict sequential gates. That qualification deserves to be visible.
- **Numbering schemes contradict on screen.** `s23-b0-3-01-section-opener.png` shows `SECTION 03` directly above `PART TWO`. Slide 2.01 shows `SECTION 02` above `Part One`. Section 4's opener uses a third scheme, `SECTION 4`. Three conventions, all visible to the audience.
- **A duplicated claim 300 px apart.** 3.05 shows *"Bitcoin is currently emerging as the new store of value of the digital age."* in the column and *"Bitcoin is emerging as the new store of value of the digital age."* in the caption, simultaneously.

---

### 3.5 Section 4 — The Ideal Store of Value (23 slides, 99 clicks, ~22.2 min)

This is the deck. It is well built, and most of my criticism is refinement rather than repair.

**The causal chain, as implemented, holds.** I traced every slide's inherited question, delivered answer and created tension. There are no logical gaps in 4.01 → 4.16. The derivation genuinely earns the ten properties, and the table genuinely follows from the derivation.

**The one real structural weakness** is the 4.16 → 4.17 joint described in 3.1: the migration premise arrives unsupported. Everything downstream of it inherits that softness.

**Pacing.** 99 clicks in 22 minutes is roughly one click every 13 seconds. That is brisk but appropriate — each one does a job. Two exceptions:

- **4.02** uses four build steps to deliver two sentences (`STORE OF VALUE` → emphasise `VALUE` → clear → question → prompt). Build 2 clears the screen entirely; there is a state in this slide where the canvas is empty except the kicker. It is a deliberate breath, but four clicks is a lot for it.
- **4.08/4.09** spend nine build steps establishing "we do not know the future".

**Where the argument is strongest:** 4.10-4.14. The inversion move is the deck's best original contribution and it is executed cleanly.

**Where it is weakest:** 4.19/4.20 redundancy (3.1), and 4.22's visual failing to carry its concept (see section 5).

**A conceptual mismatch worth naming.** 4.01 opens on a photographic glass display case containing gold, coins and a bitcoin, on a vault. 4.02 then argues that *"value is not some objective substance — a unit that can simply be placed inside a container."* The opening image asserts precisely the mental model the next slide dismantles. That may be intentional setup, but nothing in either slide's notes acknowledges the move, so it currently reads as an inconsistency rather than a rhetorical device. Naming it in 4.02's notes — *"that image on the last slide is how most people picture storing value, and it is wrong"* — would convert a weakness into a strength for the price of one sentence.

---

### 3.6 The close

Covered in F-02. Structurally: 4.23 completes the argument, and then a 56th slide adds a slogan. The master document itself asks whether 4.23 should be the true final frame. My answer is yes — or, if the thank-you is kept for practical reasons (Q&A hold, applause), it should carry nothing but `Thank you.` The current second line and its notes actively subtract from the deck.

---

## 4. Intellectual review

### 4.1 Definitions

| Term | Verdict |
|---|---|
| **"An earned, transferable claim on value"** | **Sound, and the deck's best idea.** It avoids the labour-theory trap (4.03 explicitly prices the *service*, not the hour), it is framed economically rather than legally, and 4.04's notes correctly say the claim "is no longer tied to the patient". Holds up. |
| **"Earned"** | **The weakest word in the framing**, and the master document flags it. A claim that is inherited, gifted, won or received as a transfer payment is not "earned" by its holder. The deck's own 4.08 depends on inheritance (*"Your descendants receive it in 2126"*), so the deck itself breaks the adjective four slides after introducing it. Recommend: keep "earned" in 4.04 where it describes *origination*, and drop it thereafter — the claim is created by an unfinished exchange, then simply transferable. One word in 4.04's notes fixes it: *"earned once, then transferable indefinitely."* |
| **Claim versus carrier** | **Sound and genuinely clarifying.** The distinction does real work across eight subsequent slides. Protect it. |
| **Store of value = "preserves purchasing power of an unredeemed claim and keeps that claim redeemable through time"** | **Good.** Two-part definition is better than the usual one-part. The redeemability half is the deck's own addition and it is what makes the 100-Year Test bite. |
| **"Monetary premium"** | Correctly flagged in 4.18's notes as conceptual and not directly measurable. Appropriately bounded. |
| **"Value is subjective"** | Asserted in 4.02 (*"value is not some objective substance"*) but never developed. An Austrian reviewer will want it; a general audience will not miss it. Fine as-is. |

### 4.2 Causal claims

The chain 4.02 → 4.16 is sound. Three claims downstream carry more weight than their support:

1. **"Many savers do not trust fiat to preserve purchasing power over long periods"** (4.17). This is the empirical hinge of the entire investment thesis and Section 4 offers no support for it. Its evidence lives 24 slides back on 3.04. **Recommend surfacing one concrete number on 4.17** — the same 1971 purchasing-power figure used in Section 3, or the observation that household savings have shifted toward equities and property over the period. Without it, an investment committee marks the thesis "assumed, not shown".
2. **"Bitcoin has no separate productive, consumptive or aesthetic function"** (4.19). True and correctly stated as a *difference*, not an advantage. But the deck never engages the obvious counter: an asset with no non-monetary use has no floor of non-monetary demand. Gold's jewellery and industrial demand is a genuine downside cushion Bitcoin lacks. The deck presents monetary-purity as unambiguously favourable; it is a genuine trade-off. **This is the single strongest objection an institutional sceptic will raise, and the deck has no answer prepared for it.**
3. **"Marginal flows can reprice the entire stock"** (4.22). Correctly hedged in the notes (*"That does not give us a mechanical price formula"*). The mechanism is real but symmetric — the deck never says that the same microstructure amplifies drawdowns exactly as it amplifies rallies. Adding one sentence would cost nothing and would substantially raise credibility with the audience most likely to notice.

### 4.3 Qualifications — present and missing

**Present and creditable:** no total score; scores as judgements; architecture ≠ valuation; monetary premium not measurable; fixed supply ≠ price formula; 100-Year Test as reasoning aid; Bitcoin scored 2/5 on track record and 4/5 on fungibility; "reasonable people can disagree".

This is a materially more honest presentation than most Bitcoin decks and it should be protected.

**Missing:**

| Missing qualification | Where it belongs |
|---|---|
| Marginal repricing is symmetric — it amplifies downside too | 4.22 notes |
| No non-monetary demand floor is a *cost* as well as a difference | 4.19 notes |
| Self-custody transfers custodial risk to the holder; the 5/5 on resistance to control assumes competent key management | 4.15 assumptions or 4.16 notes |
| Bitcoin's supply cap is enforced by consensus, not physics | 4.16 notes (the phrasing at 4.16 is already careful — "no person or authority can unilaterally create" — but the distinction is never made explicit) |
| The 100-Year Test's own logic applies to Bitcoin's network continuity | 4.16, durability row — see 4.5 |

### 4.4 The ten properties

**Completeness.** As a set for a *monetary carrier*, this is a good list. It maps cleanly to the standard salability framework and the derivation from failure modes makes it feel discovered rather than borrowed.

**Redundancy.** Two overlaps are real but tolerable:
- *Liquidity* and *Divisibility* both concern exchangeability; a highly divisible but illiquid carrier is coherent, so they are separable. Fine.
- *Durability* and *Track record* both concern survival through time — one physical/technical, one evidential. Separable. Fine.
- *Resistance to control* and *No supply inflation* overlap more than the deck admits: unilateral issuance **is** a form of control. The deck's own fiat scores (1 and 1) show the correlation. Not a flaw, but it means the ten properties are not ten independent dimensions, which slightly weakens any implicit "Bitcoin wins 7 of 10" reading. The deck's refusal to total the table already handles this correctly.

**One genuinely missing dimension: counterparty and custody risk.** It is currently split across *resistance to control* and *verifiability* and never named. For an institutional audience this is *the* familiar frame — it is how they think about every asset. Naming it explicitly would cost one row and would speak directly to the deck's hardest audience. This is a reasonable disagreement, not a defect: the current ten are defensible.

**"No carrying costs" is the most idealised property** — the master document asks about this directly. My view: the *property* is fine, but the scoring is where the idealisation shows. See below.

### 4.5 The fifty scores

I assessed all fifty. The great majority are defensible, and several are notably self-critical (Bitcoin 2 on track record, 4 on fungibility, 4 on liquidity, 4 on carrying costs). Six deserve challenge:

| Row / column | Score | Challenge | Class |
|---|---|---|---|
| **Durability — Bitcoin** | **5** | **The strongest objection in the table, and it is internal.** Gold's 5 rests on chemical inertness: the atom survives regardless of institutions. Bitcoin's carrier is a ledger entry whose redeemability requires a network that is still operating and key material that has survived. 4.08-4.09 *explicitly refuse* to assume institutional, technological or political continuity to 2126 — and then 4.16 scores Bitcoin 5/5 on durability, which requires exactly that assumption. Either the 100-Year Test's scepticism should apply here (score 4), or the slide must explain why network continuity is a different kind of assumption from institutional continuity. As it stands the deck contradicts itself. | **High-impact fixable issue** |
| **No supply inflation — Shares** | **2** | Harsher than Property's 3. For a diversified listed portfolio, net share count in major markets has been roughly flat or shrinking for decades as buybacks offset issuance. A defence exists (new listings expand the aggregate), but it is not stated, and shares scoring *below* property here is counter-intuitive enough to invite challenge. | Reasonable disagreement |
| **Resistance to control — Gold** | **4** | Generous next to Bitcoin's 5, given that the deck's own Section 2 could cite 1933 US confiscation. Physical gold in personal possession resists rule changes well but is heavy, detectable and seizable. | Reasonable disagreement |
| **Fungibility — Gold** | **5** | Slightly generous. Good-delivery status, serial numbers, assay requirements and provenance concerns (conflict gold) all mean bars are not perfectly interchangeable. 4 would be more consistent with Bitcoin's 4-for-surveillance. | Subjective preference |
| **Portability — Shares** | **4** | Shares transfer easily *within* a jurisdiction and market infrastructure; moving a brokerage account across borders is genuinely hard, and the deck's own definition of portability is *"can it move across distance and jurisdiction"*. 3 fits the stated definition better. | Reasonable disagreement |
| **No carrying costs — Bitcoin** | **4** | Correctly not 5, and the deck deserves credit. But the notes never say *why* it is 4 — the reason (hardware, backups, inheritance planning, ongoing security discipline) is exactly the self-custody burden an institutional audience worries about. An unexplained 4 looks like modesty; an explained 4 looks like rigour. | Missing qualification |

**On the no-total presentation.** Correct call, well justified in the notes, and it is the single thing that most distinguishes this from a promotional deck. **Protect it.** One tension worth noting: the table gives all ten rows identical visual weight, which encodes equal importance — precisely what the notes deny. This is a design/argument mismatch rather than an error; see section 8 for a proposed treatment.

### 4.6 Adversarial lenses

**A — General-audience viewer.** The claim/carrier idea lands. Two friction points: "monetary premium" (4.18) is introduced as an equation before it is intuited, and "at the margin" (4.21-4.22) is finance vocabulary that the deck uses without defining. 4.21's *"Every new unit of savings creates a new carrier decision"* does the work of a definition, but it arrives after the term. Consider defining "at the margin" in plain words once.

**B — Institutional investor.** They will accept the architecture framing and press on: (1) no valuation framework at all — the deck says architecture ≠ valuation and then never returns to valuation, so the honest boundary reads as an evasion at the moment of the ask; (2) custody and operational risk under-treated relative to the 5/5 control score; (3) regulatory risk is absent from the deck entirely — it appears in no property, no score and no note; (4) the missing downside symmetry on 4.22; (5) the absent non-monetary-demand floor (4.2, item 2). Items 3 and 5 are the ones I would prepare answers for.

**C — Austrian critic.** Broadly friendly territory. Two objections: the "claim on value" framing is not standard Austrian vocabulary and could be read as edging toward a claim-on-output model the deck elsewhere disclaims — 4.04's notes handle this, but only in the notes. And 3.05's *"Store of value is what makes the other two functions possible"* inverts Menger's own ordering, in which salability as a medium of exchange is primary. The deck states the minority position as settled.

**D — Bitcoin protocol expert.** The governance language is careful and correct throughout Section 4 (*"no person or authority can unilaterally create additional valid units"* — exactly the formulation the master document prescribes). Weak points are all in Section 2: the 2009 whitepaper date, "sendable anywhere instantly", "impossible to inflate", and "trustless" used without qualification. Section 4's 4/5 fungibility score with the surveillance rationale is the kind of detail this reader will respect.

**E — Mainstream monetary economist.** The most hostile lens. Objections: barter-origin history is conjectural and contested by the anthropological record (three separate slides state it as fact); *"Money has never had to come from the government — in fact, until recently it never did"* (2.05, **on screen**) is not sustainable against Lydian coinage or Mesopotamian silver standards; *"Persistent inflation is now a permanent feature of every fiat currency on earth"* has a clean counterexample in Japan; and the deck treats fiat's elasticity purely as a defect, never engaging the stabilisation case for it. Section 4 is much more careful here than Sections 2-3 — 4.17 explicitly grants that fiat is "extremely effective as a medium of exchange and unit of account".

**F — Narrative editor.** Covered in section 3. Headline: the thesis arrives at slide 49; 4.19/4.20 restate one idea; the 3→4 transition has no bridge; the ending is resolved at 4.23 and then unresolved at 5.01.

**G — Art director / H — Motion designer.** See section 5.

**I — Frontend engineer.** See section 6.

**J — Originality reviewer.** **The rebuild succeeded.** I swept every active file for the rejected fingerprint — evolution of problem solving, repurposed versus purpose-built, lighting / communication / refrigeration analogies, engineered perfect solution, 90% or 99% convergence, full-market-cap absorption. **Zero hits in active Sections 1-4.** The only survivor is the single word "engineered" in the close slide's notes (F-02), and 13 dead files that still contain the whole rejected sequence (F-08).

The replacement chain — claim → carrier → saving → 100-Year Test → inversion → failure-derived requirements → transparent comparison → migration → premium → marginal decision → fixed-supply repricing — does **not** read as derived from the rejected framework. The inversion move in particular is a real differentiator: most Bitcoin property lists are asserted, and this one is derived. My honest assessment is that Section 4's structure is more original than most published treatments of this argument.

Two smaller provenance notes: the four-stage monetisation model (3.06-3.11) is Boyapati's and is uncredited; and inversion is credited to Munger in the notes, which is appropriate.

---

## 5. Visual and motion review

All observations below are from the 144 captured states, not from source. Screenshot filenames are given so every claim can be checked.

### 5.1 Whole-deck visual system

**What is working.** The black/orange identity is disciplined and consistent — orange is used for the claim object, active states and selected key phrases, and is genuinely restrained. Negative space is used as a material rather than left over. Typography is strong: Inter at display weights with tight tracking reads cleanly at 1920×1080 and at 1366×768. The 16:9 canvas letterboxes correctly at every viewport tested (0.711× at 1366×768, 0.75× at 1440×900, 1.333× at 2560×1440) with no layout divergence — this is a genuinely well-built stage.

**Three system-level problems.**

**(a) Two asset renders are visually interchangeable.** `carrierPaper` (used for FIAT) and `comparisonShares` (used for SHARES) are both light tan/white paper rectangles at similar scale. They appear together on 4.15, 4.16, 4.17 and 4.21. On 4.17 (`s49-b3-...png`) this is actively harmful: the slide's argument is that savings demand flees *from* fiat *into* other assets, and one of the three destinations looks like the thing being fled. On 4.16 an audience scanning the header row must read the labels to tell column 2 from column 5.

**(b) Bitcoin is rendered as a physical gold coin throughout.** `carrierBitcoin` on 4.06, 4.15, 4.16, 4.20, 4.21 and inside the 4.01 display case is a photographic three-dimensional coin with an embossed bitcoin symbol. This contradicts the deck's own thesis at two points: 4.15's assumptions specify *"native BTC held in self-custody on the Bitcoin network"*, and 2.14 credits Bitcoin with *"digital scarcity"*. The physical-coin trope is also the most recognisable visual cliché in Bitcoin communication — the master document's own anti-slop test asks "would a Bitcoiner spot this as AI slop?", and a physical bitcoin is the canonical example. This is the deck's largest single gap between visual and argument.

**(c) A terminology collision inside the comparison table.** The first column header reads `PROPERTY` (meaning "criterion"); the fourth asset column also reads `PROPERTY` (meaning real estate). Same word, same table, two meanings, both in header position. See `s48-b2-4-16-the-comparison.png`.

**Orthographic inconsistency.** Active on-screen copy mixes British and American spelling: `decentralization` and `recognized` (2.14, 2.09) against `monetisation`, `specialised`, `optimised` (3.06, 4.03, 4.16). Within Section 4 alone, 4.03 renders `Professional judgment` while 4.15 renders `The scores are judgements.` For a deck whose stated standard is premium, pick one and sweep.

### 5.2 Section consistency — is Section 4 a newer deck bolted to an older one?

**Yes, and it is measurable rather than merely felt.**

| Signal | Sections 1-3 | Section 4 |
|---|---|---|
| Build steps | 12 across 32 slides | 76 across 23 slides |
| Slides with reduced-motion content gaps | 11 | **0** |
| Reveal mechanism | JS `setTimeout` cascades | `data-*` attributes + CSS state |
| State reconstruction | ad hoc; two slides cannot reverse correctly | `_applyBuild(n)` reconstructs from `n` in all 23 |
| Uncancelled timers | ~45 | 0 |
| Copy stored as rasterised pixels | 2 slides (1.5, 1.6) | 0 |

The visible consequence is rhythm. Section 4 reveals *ideas*; Sections 1-3 mostly reveal *slides*. A viewer will not diagnose the cause, but they will feel that the last third of the talk is more considered.

**I do not recommend redesigning Sections 1-3.** The content is sound and much of the art is good. What I recommend is porting Section 4's *mechanism* — see the plan in section 10. That alone closes most of the gap, because most of what reads as "older" is timing, not styling.

### 5.3 Slide-by-slide notes on the frames that matter

**1.2 — The Most Important Question Nobody Asks.** Strongest frame in Section 1. The scrim gradient over the question-mark image handles the text/image overlap well.

**1.5 / 1.6 — Orange pill.** Concept fine; execution is a baked PNG (section 3.2). Both variants mount simultaneously — 1.4 MB to display one image.

**2.09 — Collectibles.** `s18-b0-...png`. Best-composed slide in Section 2: image left, era/title/bullets right, the red `BUT —` row closing it. The content column is near its ceiling (~536 px against a 540 px area); any copy edit will overflow.

**2.11 — Gold-Backed.** Heaviest content layer in the deck: three bullets plus two pain points. Measured close to overflowing its 540 px area with `align-items: center`, so it spills roughly evenly above and below. It renders acceptably today but has zero headroom.

**2.14 — Bitcoin.** `s21-b0-...png`. Image box runs to y=1141 against the 1080 stage — 61 px clipped, and the sphere is visibly cut. Only Evolution slide whose image is clipped. Plus the empty region where every sibling has a `BUT —` row (F-06), which makes the bottom-right quadrant read as unfinished.

**3.11 — Where is Bitcoin.** `s32-b0-...png`. The four stage pills all render in the same dim state, so the rail carries no progress information on the one slide where progress *is* the content. The bitcoin marker between COLLECTIBLE and STORE OF VALUE does all the work. The closing caption is 28 px and ends on an orphaned word (`ends.` alone on the last line).

**4.01 — Section opener.** `s33-b3-...png`. Genuinely premium — the best photographic frame in the deck. Conceptual tension with 4.02 noted in section 3.5. The image intentionally bleeds ~13 px past the stage on three sides; that reads as deliberate and is fine.

**4.05 — Spend or Save, build 2.** `s37-b2-...png`. The weakest composition in Section 4. Everything sits in the lower-left quadrant; roughly the right half of the canvas is empty black apart from a dim `SAVE FOR LATER` label. The `spendNowGoodsSneaker` asset is a black sneaker on black and is very nearly invisible. The "save" route line is drawn so dark it barely registers. On the `redeemed` state: the master document's final implementation note says the claim *"disappears completely"* when the SPEND NOW goods are established, but the CSS implements `opacity: 0.1` (`slides.css:610`) rather than `0`. In the capture it is effectively invisible against black, so the *intent* is met — but the implementation and the document disagree, and at 10% opacity behind brighter artwork it could become a faint ghost on a calibrated projector. Flagging rather than reconciling.

**4.16 — The Comparison.** `s48-b2-...png`. Strong. The five-dot rating with dim empties is legible at full size; the family divider between BITCOIN and PROPERTY is a good touch; no total, no highlight. Two concerns: the `PROPERTY`/`PROPERTY` collision (5.1c), and the asset icons sit at inconsistent optical weight — the gold bar is large and bright, the house is small and dark, so the header row does not scan as a set.

**4.17 — Migration.** `s49-b3-...png`. Executes the master document's brief accurately: lower corridor, three risers, claims centred beneath each destination, nothing crossing an asset. Two issues: (i) the lane begins at x≈418 while FIAT sits at x≈280 with a vertical gap, so the lane does not visually originate *from* fiat — the causal link is asserted by layout adjacency alone; (ii) roughly 750 px of empty canvas between FIAT and GOLD leaves a hole in the middle-left.

**4.21 — Marginal decision.** `s53-b2-...png`. **The best frame in the deck.** Symmetrical, neutral, five equal connectors, one claim at the decision point, no winner treatment, and it matches the master document exactly. Protect without changes.

**4.22 — Fixed supply.** `s54-b1/b2-...png`. Concept good, execution weakest in Section 4. (i) The whole stage spans x≈400-1215, centring at x≈807 rather than 960 — a visible 153 px left shift with a large empty right side. (ii) `PRICE DISCOVERED HERE`, `AVAILABLE AT THE MARGIN` and `FIXED OUTSTANDING STOCK` are ~13 px grey — too small and too low-contrast to survive video compression. (iii) The repricing propagation *is* implemented (comparing b1 to b2, the 30 non-margin units shift from near-black to amber) but it is subtle enough that the slide's core claim — marginal price applies to the whole stock — may not read on first viewing. (iv) The three incoming claims are the ClaimObject scaled small and squat; at that size they read as capsules rather than as the recurring claim, weakening the motif's continuity.

**4.23 — Conclusion.** `s55-b4-...png`. Right instinct, imperfect execution. The conclusion sits in the upper third with roughly 380 px of dead space below it. More importantly, the kicker at top-left reads `THE CASE FOR BITCOIN — FROM FIRST PRINCIPLES` and the dim line at the bottom reads `The case for Bitcoin—from first principles.` — **the same sentence twice on the deck's final frame.** For a slide whose whole design premise is distillation, that is a redundancy worth cutting.

### 5.4 Motion

**Does motion explain?** In Section 4, largely yes — the claim moves along a save path, migrates up risers, sits at a decision point, approaches a supply edge. Motion carries transfer and causality, which is what the master document asks for. There are no looping pulses, particles, rockets or green arrows in Section 4.

In Sections 1-3, motion mostly *reveals* rather than explains. The staggered fade-ups are handsome but interchangeable — the same 200/400/800 ms cascade appears on 1.1, 1.2, 1.4, 2.02, 2.04, 2.05, 2.06, 2.14. `AGENTS.md` section 8 explicitly says "Avoid identical fade-up timing on every slide"; this is the one design rule the legacy sections break most consistently.

**Two ambient animations run with no narrative job:** the 14-particle drift on 1.7 and the infinite `iter-pulse` ring on 2.06. Both are decorative. The murmurations on 2.05 and 2.14 are the opposite — the flock *is* the argument (spontaneous order, no leader), and they are correctly disabled under reduced motion with a static substitute. Good work; keep.

**Is motion coherent under fast navigation?** Mostly. One real defect: `04-double-coincidence.js` schedules connector redraws on a 320 ms timer with no cancellation token. Arriving at the slide via force-previous (`ArrowUp` from the next slide, which triggers `jumpToEnd`) causes `onEnter` to schedule state-0 connectors and `buildStep(2)` to schedule state-2 connectors in the same frame; both fire at +320 ms and an orphaned red state-0 line is left drawn over the state-2 diagram. Narrow trigger, but it is a genuine visual corruption reachable with one keystroke.

**Is reduced motion complete?** Section 4, yes. Everywhere else, no — F-03.

### 5.5 Recording suitability

**Screenshot quality.** 132 of 144 states are screenshot-ready — legible, composed and self-explanatory. The exceptions are the deliberate transitional states (4.02 build 2 clears the canvas to near-empty; 4.05 builds 0-1 are mid-diagram) plus 4.22's small labels.

**Title-safe.** Nothing infringes a conventional 5% title-safe margin except 2.14's clipped image and 4.01's intentional bleed. The claim object on 4.05 build 5 sits at x≈1530 with its glow reaching ~1620 — inside safe, but it is the closest element to a frame edge in Section 4.

**Compression risk.** Two treatments will suffer at typical streaming bitrates: 4.22's ~13 px grey labels, and the unfilled dots in the comparison table, which are low-contrast dark grey on black. Consider raising the empty-dot contrast slightly for the recording — the distinction between a 4 and a 5 is currently carried by a single dim dot.

---

## 6. Technical review

### 6.1 Repository and architecture audit (Phase 1 results)

```text
Branch            worktree-opus-5-review
HEAD              b6aebdc1aacc420d0088cb83837ef5846eb8093b
Git status        clean at start; only review/opus-5/** added
Scripts           dev, build, preview        (no lint, no test — not run, not claimed)
Build             npm run build -> PASS, 10.80 s, dist/ = 41 MB
Console           0 errors / 0 warnings / 0 exceptions across every probe
Active slides     56  (7 + 15 + 10 + 23 + 1)
Build steps       88   ->  144 total states, 143 clicks end to end
continuesFrom     13 continuation relationships, all resolving to valid IDs
Duplicate IDs     none
Duplicate numbers 2  (33 and 34 each used twice)  -> F-10
Orphan modules    13 in section-4-ideal-store + 1 data file + 1 component -> F-08
Unused asset      orangePillIngredients (imported, exported, referenced by no slide)
Dead export       images.iconArt = null  (source file is .emf, unrenderable in browsers)
```

**Continuation map (all verified valid):** `07-orange-pill-focus` ← `06-orange-pill-ingredients`; `2-08` ← `2-07` ← ... ← `2-13` (6 links); `3-07` ← `3-06` ← ... ← `3-11` (5 links).

### 6.2 Bugs (ranked)

| # | Bug | Severity | Verified how |
|---|---|---|---|
| 1 | Stale-scene corruption on second traversal (F-01) | Critical | Programmatic repro + screenshots |
| 2 | Notes overlay clips long notes, footer buttons unreachable (F-04) | High | DOM geometry + screenshot |
| 3 | Reduced-motion content gaps in 12 states (F-03) | High | 144-state forced-reduced-motion capture |
| 4 | 2.14 image overflows stage bottom by 61 px, visibly clipped | Medium | Bounding-box sweep + screenshot |
| 5 | `04-double-coincidence` connector race on force-previous | Medium | Code trace (not reproduced live) |
| 6 | `3-02-three-roles` dead first click; steps 0 and 1 identical | Medium | Build-state capture |
| 7 | Duplicate `number` values 33, 34 (F-10) | Medium | Metadata sweep |
| 8 | Import-time `<style>` injection into `document.head`, never removed (F-09) | Low | Code |
| 9 | `07-orange-pill-focus` lacks the `?? this._capsule` fallback its twin has — a missing expando fails silently, leaving the previous slide's artwork on screen rather than erroring | Low | Code |
| 10 | `_animateIn(container, initial)` called with two args, declared with one | Trivial | Code |

### 6.3 Architecture

**The engine is sound.** `SlideEngine` is small, readable and does the right things: URL-then-sessionStorage precedence with a documented rationale, debounced `history.replaceState`, an explicit `transitioning` guard, and a continuous-transition path that is genuinely useful. The 1920×1080 logical stage with uniform letterbox scaling is the right choice for a recorded deck and behaves correctly at every viewport I tested.

**The slide contract is good and Section 4 honours it exactly.** All 23 Section 4 modules implement `_applyBuild(n)` as a pure function of `n` that sets every relevant `data-*` attribute on every relevant element — no diffing, no assumed prior state. That is why forward, backward, direct-entry and refresh-at-build all pass for Section 4. This pattern should be the repository standard and is worth writing into `AGENTS.md`.

**The main architectural weakness is the shared-DOM continuation mechanism.** It relies on three implicit conventions: a non-standard expando (`container.__evolution`), a module-level singleton cache, and each slide knowing that the engine skips `render()` on continuous transitions. None is typed, asserted or documented in the module. Every one of F-01's symptoms flows from that. The `render()` path in continuation slides is also dead on the normal linear route — it exists only for deep links and overview jumps — so each of those 11 slides has two construction paths, only one of which a rehearsal exercises. That is the classic "works in rehearsal, breaks on stage" shape, and it is exactly what happened.

**Recommendation:** make the container the single source of truth (F-01), and add a one-line invariant check in `onEnter` that throws if the API is missing, so the failure is loud rather than silent.

### 6.4 Deterministic state — test results

| Test | Result |
|---|---|
| Forward walk, all 144 states | **Pass** — every state renders its intended content |
| Backward walk, end to start (56 states) | **Pass** — no empty or corrupted states |
| Second traversal of continuation chains | **FAIL** — F-01 |
| Direct entry to all 13 continuation slides (fresh load, `?slide=<id>`) | **Pass** — all 13 render correct standalone content |
| Refresh at non-zero build (`4-11` b3, `4-05` b4, `03-why-care` b2) | **Pass** — build step and painted content identical before and after reload |
| Numeric deep links (`?slide=48`) and semantic (`?slide=4-16-the-comparison`) | **Pass** |
| Overview grid (56 tiles, `overflow-y: auto`, scrolls correctly) | **Pass** |
| Help overlay, fullscreen control, jump-to-slide (`g` digits Enter) | **Pass** |
| Second-window notes | **Pass** — `BroadcastChannel` sync works; the window correctly receives the engine's index, not the stale `slide.number` |

Direct entry passing for all 13 continuation slides is a genuinely good result and worth noting explicitly: the fallback `render()` paths are correct. The bug is specifically in the *re-entry* path.

### 6.5 Cleanup and performance

**Cleanup.** Section 4: complete — every component exposes `destroy()` and every slide calls it. Sections 1-3 and 5: ~45 uncancelled timers, two `document.head` style injections, and two `cleanup()` methods that do not clean up (F-09). Both `Murmuration` consumers correctly cancel their RAF loops.

**Performance.**

- **`dist/` is 41 MB, essentially all images.** 43 PNGs, several over 2 MB (`gold_backed_certificate` 2.6 MB, `marketplace` 2.6 MB, `essence_of_money` 2.4 MB). No WebP/AVIF, no responsive sizes, no preloading of the next slide's asset. `assetsInlineLimit: 0` in `vite.config.js` correctly prevents inlining. For a local presentation this is harmless; for any web-hosted version it is a first-load problem, and even locally there is pop-in risk on the Evolution walk where large images cross-fade.
- **At least one asset ships unused** (`orange_pill_ingredients.png`, 1.3 MB) plus the icon set for the 13 dead modules.
- **`Murmuration` on 2.05 runs an O(n²) neighbour loop over 140 boids** — ~19,600 distance tests per frame, ~1.2 M/second at 60 fps on the main thread. It runs fine on a modern laptop, but it is the deck's only real CPU load and it sits on a slide with no build steps. Correctly skipped under reduced motion.
- **1.5/1.6 mount both 700 KB pill PNGs simultaneously** to cross-fade between them.

**Recommendation:** run the 43 PNGs through a lossy optimiser and emit WebP with PNG fallback. A 60-75% reduction is realistic with no visible quality change at 1920×1080. Delete the unused assets with F-08.

### 6.6 Accessibility

Better than typical for a deck of this kind, and Section 4 is clearly where the attention went: `role="img"` with descriptive `aria-label` on the claim object, carrier shell, dot ratings and supply field; `aria-hidden` correctly applied to decorative SVG; `setVisible()` maintains `aria-hidden` in step with `data-visible` throughout Section 4; the comparison table uses real `<table>` semantics with `scope="col"`, `scope="row"` and `scope="colgroup"`, and each `DotRating` carries `aria-label="N out of 5"`.

Gaps:

- **Keyboard focus is never managed.** Opening the notes or overview overlay does not move focus into it, and neither traps focus. The overview grid's 56 tiles are `<div>`s with click handlers — not reachable or activatable by keyboard at all.
- **The fullscreen button is the only real control** and it has an `aria-label`; fine.
- **Sections 1-3 carry almost no ARIA.** Meaningful content in `EvolutionScene` and `MonetisationScene` is plain `<div>` text with no landmark or list semantics.
- **Two slides encode all their copy as pixels** (1.5, 1.6) with one `alt` string between them.
- **No `lang`-level or per-slide live region**, so a screen-reader user gets no announcement when the slide changes.

For a presenter-driven deck the practical impact is low, but the overview grid being keyboard-inaccessible is a real gap if the deck is ever published for self-navigation.

### 6.7 External dependencies at runtime

`index.html` loads **Inter from Google Fonts** and the **Tabler icon webfont from jsDelivr**. Both are hard runtime dependencies of the rendered output:

- Without them the deck falls back to a system sans (changing every measured line-break in the deck) and **every Tabler glyph disappears** — which silently removes the HAS/WANTS icons on 2.03/2.04, the three function icons on 3.02/3.05, the stage icons on 3.07-3.10, and the Art tile icon on 3.04.
- A venue with no internet, a captive portal, or a corporate network that blocks CDNs will produce this failure *during the talk*, with no warning.

This is a genuine production risk for a deck explicitly designed to be projected and recorded. **Recommend self-hosting both** — Inter as woff2 and either the Tabler subset or inline SVGs for the ~10 glyphs actually used. This is a half-day of work and removes the deck's only external point of failure.

### 6.8 CSS

`slides.css` is 3,769 lines and organised by section with clear comment banners. Selectors are well-namespaced (`s4-*` for Section 4) and I found no cross-slide collisions. Two observations:

- **Two document-global SVG filter IDs** (`path-glow`, `tick-glow` on 1.7; `iter-glow` on 2.06). Currently unique, but `url(#id)` resolves document-wide, so a future duplicate would silently cross-wire.
- **Token discipline is weak in the legacy sections.** `rgba(247, 147, 26, ...)` — the literal decomposition of `--accent` — appears 17 times in `EvolutionScene.js` alone, plus 7 in `07-insight-iteration.js` and 6 in `CharacterCard.js`. Four distinct white-alpha values (0.65, 0.7, 0.72, 0.78) are used where `--text-secondary` (0.75), `--text-muted` (0.5) and `--text-dim` (0.3) exist. Section 4 is markedly better but not perfect. A `--accent-rgb: 247, 147, 26` channel token would let every alpha variant be expressed as `rgba(var(--accent-rgb), a)` and would eliminate the whole class.
- **Reduced-motion coverage in Section 4's CSS is thorough and well-targeted** — five separate blocks zeroing both `transition-duration` and `transition-delay` for the specific selectors that use delays. That is careful work.

---

## 7. Factual audit

**Scope note and honesty caveat.** I extracted every time-sensitive, numerical, historical, institutional, regulatory, technical and market claim from the active slides and notes. I did **not** have web access in this session, so I have **not** independently re-verified any of them against a primary source. What follows is a prioritised verification worklist with my assessment of where the risk lies. Where I am confident from general knowledge I say so; where the presenter must check before recording, I say that instead. **Nothing here should be treated as a verified correction — treat it as a list of things to check.**

**Sourcing status across the deck: zero claims are sourced.** No slide and no note cites an index, a dataset, a date of retrieval or a document. For a deck aiming at "credible under institutional scrutiny", that is the single biggest gap in this category.

### 7.1 Must verify before recording

| # | Claim (verbatim) | Location | Visible? | Issue | Action |
|---|---|---|---|---|---|
| 1 | *"2009: an anonymous developer publishes a paper and a working implementation."* | 2.14 notes | Notes | **Believed wrong.** The whitepaper is dated 31 Oct 2008; the implementation and genesis block are Jan 2009. "Anonymous" should be "pseudonymous"; the singular asserts what is unknown. | Correct to two dates. High confidence this is an error. |
| 2 | *"The U.S. dollar has lost over 96% of its purchasing power since 1913."* | 2.13 notes | Notes | Figure plausible for a 1913 CPI baseline, but it is spoken **inside a slide labelled "1971 — today"**, attributing a 112-year number to a 55-year era. | Verify against BLS CPI-U and either re-baseline to 1971 or state both eras. |
| 3 | *"The US dollar has lost over 85% of its purchasing power since 1971."* | 3.04 bullet | **On screen** | Plausible, but combined with #2 the audience hears a contradiction. Also monotonically drifting — it will need re-checking each year the deck is used. | Verify; align baselines with #2; add "(CPI-U, as of <date>)". |
| 4 | *"look at El Salvador"* as live evidence of medium-of-exchange adoption | 3.11 notes | Notes | **Highest decay risk in the deck.** El Salvador's Bitcoin legal-tender regime was materially amended in early 2025 under an IMF programme. Delivering this unqualified in mid-2026 invites an on-camera correction. | Verify current status. Consider narrating the reversal instead — it arguably *supports* the deck's "store of value must come first" thesis. |
| 5 | *"Increasingly held by institutions, corporations, and even nation-states."* | 3.11 bullet | **On screen** | "Institutions" and "corporations" are well-supported. "nation-states" (plural) rests on a small and changing set. No number, no date, no source. | Verify or soften to "and, in a small number of cases, states". |
| 6 | *"Persistent inflation is now a permanent feature of every fiat currency on earth."* | 2.13 notes | Notes | Universal quantifier with a clean counterexample (Japan's multi-year deflation; Swiss negative prints). | Soften to "nearly every". |
| 7 | *"sendable anywhere instantly"* | 2.14 notes | Notes | Wrong for on-chain Bitcoin (~10-min blocks, multiple confirmations). Lightning is not mentioned in this section. | Replace with "in minutes, without permission". |
| 8 | *"capped supply, impossible to inflate"* | 2.14 notes | Notes | Imprecise: issuance continues for over a century; the cap is a consensus rule. **21 million is never stated anywhere in Section 2.** | Restate as "capped at 21 million and disinflating on a fixed schedule" — and say the number. |

### 7.2 Historical claims that should be narrowed or sourced

| # | Claim | Location | Assessment |
|---|---|---|---|
| 9 | *"Money has never had to come from the government — in fact, until recently it never did."* | 2.05, **on screen** | The strongest single overreach in the deck. Lydian state-stamped coinage (~600 BCE) and Mesopotamian institutional silver standards are hard counterexamples. The Mengerian position is legitimate; "until recently it never did" is not. **Recommend:** *"Money has never *needed* to come from the government — and for most of history, market adoption came first."* |
| 10 | Era label `~100,000 BCE onwards` for Collectibles | 2.09, **on screen** | Oldest shell beads are older still, but as *ornaments* — there is no evidence they functioned as money. The usual proto-money framing places this in the Upper Palaeolithic (~40,000 BCE). It also contradicts slide 2.02's own *"the next ten thousand years"*. Source it or move it. |
| 11 | Era label `~600 BCE onwards` for Precious Metals | 2.10, **on screen** | Correct for *coinage*, but the slide's own bullet describes pre-coinage metal money ("emerged through global trade competition"). Understates by ~2,400 years. |
| 12 | Era label `1700s — 1971` for Gold-Backed | 2.11, **on screen** | Start is late (Song-dynasty paper, 1660s goldsmith notes, 1694 Bank of England). End compresses three regimes: classical gold standard to 1914-31, US domestic convertibility ending 1933, Bretton Woods 1944-71. |
| 13 | `GOVERNMENT-ISSUED` bracket spanning Gold-Backed **and** Fiat | 2.11-2.12, **on screen** | Inaccurate for most of the gold-backed span, when notes were largely privately issued. This is the visual carrying the deck's "trust changes hands" argument. |
| 14 | The cowrie / glass-bead inflation story | 2.09 notes | Conflates two narratives. West African cowries were imported (from the Maldives), not locally harvested; the documented inflation is usually attributed to a cheaper East African species from the mid-19th century. The "Europeans bought Africa with glass beads" trope is separately contested. **Recommend:** keep the cowrie supply-shock story, source it, drop the glass-bead clause. |
| 15 | *"Before money, there was barter."* (and two restatements) | 2.02, 2.03 notes | The Smith/Menger conjectural history. Standard as a *teaching device*; contested as literal history by the anthropological record. Stated as fact three times. **Recommend:** frame once as "the standard economic account" rather than as established history. Cheap, and it inoculates against the strongest mainstream objection. |
| 16 | *"Every monetary good in history that emerged organically followed this pattern."* | 3.06, **on screen** | Universal quantifier, unfalsifiable as written, and the framework (four stages of monetisation) is Boyapati's and uncredited. Add attribution; soften the quantifier. |
| 17 | *"every civilization that traded across borders converged on them"* (precious metals) | 2.10 notes | Counterexamples: Chinese bronze/paper, West African cowries, Ethiopian salt bars, wampum. Soften. |
| 18 | *"the last 50 years"* / *"Argentinian retirees today"* | 1.3 notes | Both unanchored and ageing. From a 1971 baseline the figure is now 55 years. Re-anchor to "since 1971" and date the Argentina reference. |
| 19 | *"This worked for ~250 years"* | 2.11 notes | Internally consistent with the 1700s start date and inherits its problem. |

### 7.3 Contested framings presented as settled

| # | Claim | Location | Note |
|---|---|---|---|
| 20 | *"Store of value is what makes the other two functions possible."* | 3.05, **on screen** | Minority position stated as fact; the mainstream and Menger's own account treat medium of exchange as primary. This sentence justifies the entire Section 4 focus, so it is load-bearing. Frame as a position, not a fact. |
| 21 | *"Bitcoin isn't supposed to be a medium of exchange yet"* | 3.11, **on screen** | Normative "supposed to" as fact; in tension with the whitepaper's own framing. |
| 22 | *"Monetary debasement is the most successful confiscation mechanism ever devised"* | 1.3 notes | Unfalsifiable superlative. Fine as rhetoric; flag as such. |
| 23 | *"Money is the most-used and least-understood human institution"* + *"including professional economists"* | 1.2 notes | Unsourced superlative and an unsupported claim about a profession. |
| 24 | *"Technologically, Bitcoin can become a medium of exchange through the Lightning Network easily."* | 3.05 notes | "easily" elides liquidity, routing and custody trade-offs. Most likely point of technical pushback in Sections 1-3. |
| 25 | *"the fact that it doesn't have intrinsic value or cash flows"* | 3.05 notes | Concedes "intrinsic value" as a coherent category — inconsistent with the deck's own subjective-value stance in 4.02. |
| 26 | *"the strategy that's worked for every other monetary good in history"* | 5.01 notes | False universal, contradicted by the deck's own Section 2. See F-02. |

### 7.4 Internal numerical consistency

| Check | Result |
|---|---|
| "three functions" (1.7) versus Section 3 delivering three | Consistent |
| "five ingredients" (1.5 notes) versus the artwork | **Unverifiable** — the labels are rasterised into the PNG |
| Ten failure modes → ten properties → ten table rows | Consistent; verified against `_failure-property-data.js` and `_comparison-data.js` |
| Five assets in 4.15 assumptions, 4.16 table, 4.21 candidates | Consistent |
| `2126` on 4.08/4.09 versus "one hundred years" from 2026 | Consistent |
| All 50 dot ratings render the score in `_comparison-data.js` | Verified — `DotRating` throws on any non-integer outside 1-5, and the build passes |

### 7.5 Recommended sourcing standard

The deck currently cites nothing. It does not need footnotes on screen — that would damage the design — but it does need the presenter to be able to answer "where is that from?" instantly. Minimum viable standard:

1. Every numerical claim in the notes carries its source and retrieval date in parentheses, e.g. *"(BLS CPI-U, 1971=40.5 → 2026 = X; retrieved <date>)"*.
2. Every era label on the Evolution walk carries a one-line justification in the notes.
3. The two attributions the deck currently omits — Boyapati for the four stages, and whatever source underlies the cowrie story — are added to the notes.
4. A short `docs/SOURCES.md` mapping each claim to its reference, so the deck can be re-verified annually without re-deriving everything.

---

## 8. Proposed visual alternatives

Five proposals only. I have deliberately not proposed a redesign for every slide — most of Section 4 should be left alone (section 9). Each is specified to the level the review prompt asks for.

---

### V-1 — Replace the physical-coin Bitcoin render across Section 4

1. **Slide and build.** System-level: `carrierBitcoin` as used on 4.06 (lineage), 4.15, 4.16 (table header), 4.20, 4.21, and the coin inside the 4.01 display case.
2. **Concept to communicate.** Bitcoin is a *digitally native* bearer asset — the one carrier in the set with no physical instantiation. That is the deck's own claim in 4.15's assumptions and 2.14's copy.
3. **Current visual.** A photographic 3D gold coin with an embossed bitcoin symbol, lit like the gold bar beside it.
4. **Proposed visual.** A rendered object in the same photographic family as the other four assets — same lighting, same pedestal-free isolation, same optical weight — but unmistakably **not** a coin. My preferred direction: a small monolithic slab of dark, faintly luminous material with the orange bitcoin glyph rendered as an *internal* light source rather than an embossed surface, so it reads as "an entry in a ledger" rather than "a metal disc". Keep it in the same 3D render idiom so it sits correctly beside gold, paper, house and certificates; change only what it depicts.
5. **Exact 16:9 composition.** No layout change anywhere. The asset occupies the identical `s4-comparison-asset__image-frame` box on every slide it appears in; only the source PNG changes.
6. **Visual hierarchy.** Unchanged. Critically, the new render must **not** be brighter or larger than the other four, or it becomes the winner-highlight the deck deliberately refuses.
7. **Progressive-build logic.** Unchanged.
8. **Transition in / 9. Transition out.** Unchanged.
10. **Why it is better.** It removes the deck's largest visual/argument contradiction. Right now the slide that says "native BTC held in self-custody on the Bitcoin network" is illustrated with a gold coin. It also removes the single most recognisable Bitcoin visual cliché from a deck whose own anti-slop test names exactly this failure mode. Highest ratio of credibility gained to work done of anything in this list.
11. **What could be lost.** Instant recognisability. A gold coin with a bitcoin symbol is understood in 200 ms by anyone; an abstract slab needs a label. Mitigated by the fact that every appearance already carries a `BITCOIN` caption.
12. **Implementation difficulty.** Low in code (one asset swap in `assets.js`), moderate in art direction — the new render must match the existing lighting and scale conventions or it will look pasted in.
13. **New asset required.** Yes — one, replacing `carrier_bitcoin.png`. The 4.01 hero image would need a re-render or a targeted edit, which is more work; that one could be deferred.
14. **Preserves black/orange identity.** Yes — orange as internal emission is arguably a *purer* expression of the identity than orange-as-metal.

---

### V-2 — Recompose 4.22 so the repricing actually reads

1. **Slide and build.** 4.22, builds 1 and 2.
2. **Concept.** Only a fraction of the stock is offered at any moment; price is discovered there; that price then applies to the entire outstanding stock.
3. **Current visual.** A 7×5 grid at x≈400-1130, a highlighted right-hand column, three small claims approaching from the right, and ~700 px of empty canvas to the right of everything. Labels at ~13 px grey. At build 2 the 30 background units warm from near-black to amber — correct in principle, too subtle to read.
4. **Proposed visual.** Three changes, no new concept:
   - **Centre the stage.** Shift the whole group right by ~150 px so the composition centres on x=960. The empty right-hand region disappears and the slide gains symmetry.
   - **Make the propagation directional and visible.** At build 2, instead of warming all 30 units at once, run the emphasis **right-to-left across the field** using the `--reprice-order` variable that is already in the code (`slides.css:3500` already stages a 58 ms per-column delay — it simply is not visible enough). Raise the end-state brightness of the repriced units to roughly 55-60% of the margin column's, so the field clearly changes state while the margin stays the brightest point.
   - **Promote the labels.** `PRICE DISCOVERED HERE` from ~13 px grey to ~18 px in accent orange, positioned directly beneath the margin column. The other two labels to ~16 px at `--text-muted`.
5. **Exact 16:9 composition.** Kicker top-left as now. Two statement lines centred, y≈170-260. Stage centred on x=960: grid occupies x≈550-1200, margin column x≈1200-1270, incoming claims x≈1300-1390. `FIXED OUTSTANDING STOCK` above the grid left-aligned to it; `AVAILABLE AT THE MARGIN` above the margin column; `PRICE DISCOVERED HERE` in orange below it. Final line centred at y≈880.
6. **Visual hierarchy.** Margin column brightest at all times → incoming claims → repriced field → labels → statements.
7. **Progressive-build logic.** Build 0: grid neutral, no margin emphasis, no claims. Build 1: margin column brightens, bracket and label appear, three claims arrive at the contact point and stop. Build 2: emphasis propagates right-to-left across the field; `PRICE DISCOVERED HERE` appears; final line appears.
8. **Transition in.** Unchanged fade from 4.21.
9. **Transition out.** Unchanged.
10. **Why it is better.** The slide currently states its thesis in text and only whispers it in the visual. Directional propagation makes the causal claim — *this* price, discovered *here*, applied to *all of that* — legible in one viewing, which is what the master document asks the visual to do. Centring fixes the only significant balance error in Section 4.
11. **What could be lost.** A staged sweep is slightly more "animated" than the current instant warm; done at 58 ms per column the whole sweep is ~350 ms, which stays well inside the deck's restrained motion vocabulary. Must remain instant under reduced motion — the existing reduced-motion block already covers `.s4-fixed-supply-field__unit`.
12. **Implementation difficulty.** Low. Position offsets plus two CSS values plus one label restyle. The propagation machinery already exists.
13. **New asset required.** No.
14. **Preserves identity.** Yes.

---

### V-3 — Rebalance 4.05 build 2 and fix the invisible sneaker

1. **Slide and build.** 4.05, build 2 (`SPEND NOW` active).
2. **Concept.** Redeeming the claim closes the exchange — the claim is consumed and the goods are received.
3. **Current visual.** Goods cluster in the lower-left quadrant; roughly the right half of the canvas empty but for a dim `SAVE FOR LATER` label and a nearly invisible route line. The `spendNowGoodsSneaker` asset is a black sneaker on a black background and effectively disappears.
4. **Proposed visual.** Two changes:
   - **Move the goods cluster toward the centre-left** (centre around x≈620 rather than x≈470) and raise the `SAVE FOR LATER` route line's opacity so the unchosen path is visibly *present but dormant* rather than absent. The point of the slide is a fork; both tines should be visible even when one is inactive.
   - **Replace or relight the sneaker.** Either swap `spend_now_goods_sneaker.png` for a lighter colourway, or add a subtle rim light so its silhouette separates from the background. Currently the triptych reads as two objects, not three, which quietly weakens the "final goods and services" idea that 4.04 set up with three examples.
5. **Exact 16:9 composition.** Kicker top-left. `SPEND NOW` at x≈460 y≈228, `SAVE FOR LATER` at x≈1460 y≈228. Route lines meeting at a visible fork around x≈960 y≈545. Goods cluster centred x≈620, occupying y≈430-760. Support text beneath at y≈815/855.
6. **Visual hierarchy.** Active choice label → goods → support text → dormant route → dormant label.
7. **Progressive-build logic.** Unchanged (5 builds).
8. **Transition in.** Unchanged.
9. **Transition out.** At build 4 the claim travels the save path; unchanged.
10. **Why it is better.** It repairs the only badly unbalanced composition in Section 4 and restores the third good. It also makes the fork legible as a fork, which is the slide's entire structure.
11. **What could be lost.** Nothing material. Brightening the dormant route slightly reduces the contrast between chosen and unchosen; keep the delta clear.
12. **Implementation difficulty.** Low for the layout; low-to-moderate for the asset depending on whether it is relit or replaced.
13. **New asset required.** Possibly one (sneaker).
14. **Preserves identity.** Yes.

---

### V-4 — Make 4.23 the strongest frame in the deck

1. **Slide and build.** 4.23, build 4 (the conclusion state).
2. **Concept.** The distilled thesis, with nothing else on screen.
3. **Current visual.** Kicker top-left reading `THE CASE FOR BITCOIN — FROM FIRST PRINCIPLES`; three-line conclusion at y≈310-490; a dim grey line at y≈810 reading `The case for Bitcoin—from first principles.` — the same sentence as the kicker. Roughly 380 px of dead space below.
4. **Proposed visual.** Remove one of the two duplicate sentences and centre the conclusion.
   - **Preferred:** drop the bottom line entirely. Keep the kicker (it establishes the frame at build 0 and persists through the summary), and let the conclusion be the only thing in the lower two-thirds, optically centred at y≈540.
   - **Alternative:** drop the *kicker* at build 4 and keep the bottom line as the closing signature, so the frame ends on a single centred statement above a single quiet line.
   Either way: one statement of that sentence, not two.
5. **Exact 16:9 composition.** Conclusion set in three lines, centred, optical centre y≈540, max width ~1200 px so the line breaks stay exactly where they are now (`…replace everything.` / `…the preferred place` / `…next unit of value.`). Nothing else on the canvas below y≈700.
6. **Visual hierarchy.** One object. That is the point.
7. **Progressive-build logic.** Builds 0-3 reveal the four summary lines as now; build 4 clears them fully and lands the conclusion. Unchanged except for the removed duplicate.
8. **Transition in.** The existing full clear of the summary is the right move — keep it, and consider extending the gap slightly so there is a beat of pure black before the conclusion appears. On a recording that beat is worth more than any animation.
9. **Transition out.** Into the close. See F-02 — my recommendation is that this frame simply holds.
10. **Why it is better.** The deck's final frame currently says the same thing twice and sits off-centre. For a slide whose entire design premise is distillation, saying it once and placing it centrally is the whole job. This is the image that will be screenshotted and shared.
11. **What could be lost.** The bottom line currently acts as a signature/sign-off. If the presenter values that, take the alternative and drop the kicker instead.
12. **Implementation difficulty.** Trivial — one element removed, one vertical offset.
13. **New asset required.** No.
14. **Preserves identity.** Yes — it is pure typography on black, which is the identity at its most concentrated.

---

### V-5 — Resolve the comparison table's two legibility problems

1. **Slide and build.** 4.16, builds 1-2.
2. **Concept.** Ten criteria, five candidates, transparent judgements, no winner.
3. **Current visual.** Ten rows, five columns, five-dot ratings, family divider before PROPERTY. First column header reads `PROPERTY`; fourth asset column also reads `PROPERTY`.
4. **Proposed visual.** Two targeted changes, no restructure:
   - **Rename the row-header column** from `PROPERTY` to `CRITERION` (or `REQUIREMENT`, which ties back to 4.13's "From Failure to Requirement" and reinforces the derivation). This removes the collision at zero cost.
   - **Normalise the asset-header renders** to consistent optical weight. Currently the gold bar is large and bright while the house is small and dark, so the header row does not scan as a set. Match apparent size and luminance across all five; this pairs naturally with V-1.
   - **Optional, for recording only:** raise unfilled-dot opacity from its current near-black to roughly `rgba(255,255,255,0.18)` so a 4 and a 5 remain distinguishable after video compression.
5. **Exact 16:9 composition.** Unchanged — the table geometry is good and the family divider is well judged.
6. **Visual hierarchy.** Property names → dots → asset headers → group labels. Unchanged.
7. **Progressive-build logic.** Unchanged (build 1 reveals scores, build 2 the challenge line).
8. **Transition in / 9. Transition out.** Unchanged.
10. **Why it is better.** Both are pure legibility wins with no argumentative cost. `CRITERION` additionally strengthens the link back to the derivation the audience just watched, which is free reinforcement.
11. **What could be lost.** Nothing.
12. **Implementation difficulty.** Trivial for the rename and the dot opacity; moderate for the render normalisation (art, not code).
13. **New asset required.** Only if the renders are re-shot; pair with V-1.
14. **Preserves identity.** Yes.

---

### Considered and rejected

- **Adding a weighting mechanic to 4.16** (letting the viewer see which properties matter most). Tempting — it would resolve the tension between "no total" and "all rows equal weight". Rejected: any weighting UI implies a total, which is precisely what the deck correctly refuses. The notes already handle it.
- **A recurring visual for the ClaimObject on 4.23.** Rejected: the master document is right that removing it is the stronger move, and the captured frame confirms it.
- **Redesigning the Evolution walk's visual system.** Rejected: it works, and the problem there is mechanism (F-01) and one missing row (F-06), not design.

---

## 9. Changes not recommended — protect these

The review prompt asks me not to reject strong work merely to be novel. These are the decisions I would actively defend against future revision.

| Decision | Why it should not change |
|---|---|
| **No total score on the comparison table** | The single most credibility-positive choice in the deck. It is also intellectually correct — the properties are neither equally weighted nor fully independent (4.4). Any future "Bitcoin scores 44/50" treatment would destroy more than it adds. |
| **No winner badge, no Bitcoin-column highlight** | Same reason. The table lets the audience reach the conclusion; the deck does not reach it for them. Verified absent in the captured frame. |
| **"Don't trust the table. Verify every score."** | Earns more goodwill than any additional argument could. Keep the wording. |
| **Bitcoin scored 2/5 on track record and 4/5 on fungibility, with reasons in the notes** | Self-critical scoring in a Bitcoin deck is rare and is exactly what makes the other 48 scores believable. |
| **The inversion method (4.10) and failure-derived properties (4.11-4.14)** | The deck's strongest original contribution and the reason the framework feels earned. Do not replace with a conventional property list. |
| **The claim/carrier distinction** | The conceptual hinge. Everything downstream depends on it and it does real work on eight slides. |
| **4.21 — the marginal decision frame** | The best composition in the deck: symmetrical, neutral, five equal connectors, no winner treatment. Change nothing. |
| **4.23 closing through pure typography, with ClaimObject/CarrierShell deliberately absent** | The right instinct, confirmed by the capture. My V-4 proposal touches only the duplicate sentence and the vertical centring — the *strategy* is correct. |
| **The `?` between FIAT and BITCOIN on the Evolution rail, never resolved into a bitcoin symbol** | A deliberate, well-judged restraint (`EvolutionScene._applyNextSymbol` always renders `?`). It is the one place in Sections 1-3 that refuses to assert the conclusion. Keep it. |
| **The murmuration on 2.05** | The rare case where an ambient visual *is* the argument — spontaneous order with no leader. Also correctly disabled under reduced motion with a static substitute. |
| **Section 4's `_applyBuild(n)` pattern** | Full state reconstruction from a single integer, in all 23 slides. It is why Section 4 passed every navigation test. This should become the documented repository standard, not be softened. |
| **The 1920×1080 logical stage with uniform letterbox scaling** | Verified correct at 1366×768, 1440×900, 1920×1080 and 2560×1440 with zero layout divergence. Do not make it responsive. |
| **Section 4's reduced-motion CSS blocks** | Five well-targeted blocks zeroing both duration and delay. Thorough work; extend this pattern outward rather than replacing it. |
| **The spoken-only line "The monetary competition is decided at the margin." (4.21)** | Correctly kept out of the visible copy per the master document. Resist the temptation to put it on screen. |
| **Explicit holding assumptions on 4.15** (bullion not ETF, self-custody not wrapper, unlevered property) | Precisely the kind of precision institutional readers look for. |

---

## 10. Contradictions register

The review prompt requires that contradictions be reported rather than silently reconciled. These are the ones I found between the running slide, its notes, the master document and the code.

| # | Contradiction | Authority resolution |
|---|---|---|
| 1 | Master document 10.1 says on 4.05 the claim *"disappears completely"* when the SPEND NOW goods are established. `slides.css:610` implements `opacity: 0.1`, not `0`. | Running deck is authoritative for what is implemented; in the capture it is effectively invisible, so intent is met. **Flagging the numeric discrepancy — do not silently reconcile.** |
| 2 | Master document 4.11 gives the dilution explanation as *"Additional claims can weaken the purchasing power of existing claims."* The code (`_failure-property-data.js`) reads *"Additional carrier units can dilute the claim embodied in existing units."* | Code wins per the authority order, and the code's wording is more precise. Master document should be updated. |
| 3 | Master document titles 4.09 *"We Know the Date, Not the World"*; the module's `title` is `'The Future Is Unknowable'`. The core line matches. | Cosmetic; code wins. |
| 4 | Master document 4.15 core line: *"The scores are judgments."* Implemented as *"judgements."* And 4.03 uses American *"judgment"* while 4.15 uses British *"judgements"* — inconsistent **within Section 4**. | Pick one orthography deck-wide. |
| 5 | 4.19's notes say *"Art provides cultural and aesthetic value"* and 4.20's say *"Art can still provide cultural and aesthetic value"*, but **no art appears on either slide** — `ROLE_DEFINITIONS` contains property, shares, gold, bitcoin only, and `images.iconArt` is `null` (the source file is an unrenderable `.emf`). | Notes reference a category the visual does not carry. `AGENTS.md` section 11 requires notes to match the visible slide. Either add art or drop the references. |
| 6 | 1.6's module declares `title: 'Orange Pill Focus'`; the shared component hard-codes the on-screen title as `Ingredients of the Orange Pill`. | Overview grid and notes overlay disagree with the screen. |
| 7 | 2.11's notes describe *"The dotted line under Gold-Backed and Fiat"*; the rendered bracket is solid. | Notes describe a visual that does not exist. |
| 8 | 1.7's notes promise five journey beats; the slide shows three; two of the promised sections do not exist. (F-07) | Notes are stale relative to a deliberate content reduction. |
| 9 | 3.01 renders `SECTION 03` and `Part Two` simultaneously; 2.01 renders `SECTION 02` and `Part One`; 4.01 renders `SECTION 4`. | Three numbering conventions, all audience-visible. |
| 10 | Master document section 15 and `AGENTS.md` section 14 forbid "engineered solution" language; 5.01's notes say Bitcoin *"is engineered to be a good one"*. (F-02) | Guardrail violation; the only surviving instance in the deck. |
| 11 | Review prompt section 3 forbids installing dependencies; section 4 permits it when they are absent. | Disclosed in section 0; resolved by junctioning existing `node_modules` rather than installing. |
| 12 | `AGENTS.md` section 3 describes the approved Section 4 as *"seventeen slides"*; the implemented and approved Section 4 is **23 slides**. | Master document (newer) and running deck win. `AGENTS.md` is stale. |

---

## 11. Prioritised improvement plan

### Must fix before recording

| Item | Finding | Effort |
|---|---|---|
| 1. Stale-scene corruption on second traversal | F-01 | 0.5 h |
| 2. Rewrite the close: remove "engineered", the false universal, the price-independent advice; add/duplicate the disclaimer | F-02 | 0.5 h |
| 3. Correct the Bitcoin whitepaper date, "instantly", and "impossible to inflate"; state 21 million | F-05 | 0.5 h |
| 4. Resolve the two dollar-debasement baselines into one | F-05 | 0.5 h |
| 5. Verify or replace the El Salvador reference | 7.1 #4 | 0.5 h |
| 6. Add a `BUT —` row to the Bitcoin evolution slide | F-06 | 0.5 h |
| 7. Fix 1.7's notes to match the three-beat roadmap | F-07 | 0.3 h |
| 8. Make the notes overlay scroll and keep its footer reachable | F-04 | 0.5 h |
| 9. Fix the 2.14 image overflow (61 px clipped) | 6.2 #4 | 0.3 h |
| 10. Self-host Inter and the Tabler glyphs | 6.7 | 3 h |

**Subtotal: roughly one focused day.** Items 1, 2 and 10 are the ones that prevent a visible failure during the talk.

### High-value refinements (before recording if time allows)

| Item | Finding | Effort |
|---|---|---|
| 11. Port Section 4's reduced-motion pattern to the 12 affected legacy states | F-03 | 0.5 d |
| 12. Cancel timers / remove import-time style injection while doing 11 | F-09 | (same pass) |
| 13. Replace the physical-coin Bitcoin render | V-1 | 0.5 d + art |
| 14. Rename the table's row-header column to `CRITERION`; raise empty-dot contrast | V-5 | 0.3 h |
| 15. Recompose 4.22 (centre; directional propagation; larger labels) | V-2 | 2 h |
| 16. De-duplicate the sentence on 4.23 and centre the conclusion | V-4 | 0.3 h |
| 17. Add one supporting number to 4.17 so the migration premise is evidenced | 4.2 | 0.5 h |
| 18. Add the three missing qualifications (downside symmetry on 4.22; no non-monetary floor on 4.19; self-custody burden on 4.16) | 4.3 | 1 h |
| 19. Reconsider the Bitcoin durability 5/5 against the 100-Year Test's own logic | 4.5 | decision, then 0.2 h |
| 20. Write a forward-looking bridge into 3.11's notes | 3.1 | 0.3 h |
| 21. Attribute the four-stage model; soften the "every monetary good" quantifier | 7.2 #16 | 0.3 h |
| 22. Delete the 13 orphaned modules and unused assets | F-08 | 1 h |
| 23. Normalise `number` from the manifest at boot | F-10 | 0.2 h |
| 24. Rebalance 4.05 build 2 and fix the invisible sneaker | V-3 | 2 h |
| 25. Sweep orthography (`-ise`/`-ize`, `judgment`/`judgement`) | 5.1 | 0.5 h |

**Subtotal: roughly two days.**

### Optional experiments (post-recording)

- Compress the four monetisation-stage slides (3.07-3.10) into one slide with four build steps — the single most compressible run in the deck, and it would gain from progressive reveal.
- Merge or sharply differentiate 4.19 and 4.20.
- Rebuild the orange-pill pair (1.5/1.6) in DOM so the copy stops being pixels.
- Add build steps to the Evolution walk so Section 2 has Section 4's rhythm.
- Optimise the 41 MB image payload to WebP.
- Add a `docs/SOURCES.md` and cite every numerical claim in the notes.
- Make the overview grid keyboard-navigable.
- Consider a named counterparty/custody-risk property as an eleventh row.

### Do not change

See section 9. In particular: the no-total table, the inversion derivation, the claim/carrier hinge, 4.21's composition, the `?` on the Evolution rail, and Section 4's `_applyBuild(n)` state pattern.

---

## 12. Closing assessment

The rebuild of Section 4 achieved what it set out to achieve. It is more original than most published treatments of this argument, it is measurably better engineered than the sections around it, and it makes a strong case while conceding more than it needed to. The refusal to total the table, the 2/5 on track record and the explicit "verify every score" are the reasons a sceptic will keep listening — those choices are doing more work than any additional argument would.

The deck's problem is not its thesis. It is that the thesis is currently wrapped in an older presentation that undercuts it at both ends: a Section 2 that exempts Bitcoin from the very scrutiny it applies to every other monetary form, and a closing slide that trades twenty-two slides of earned credibility for a slogan. Fix those two, fix the rendering bug that will otherwise blank five slides mid-talk, and this is ready to record.

One further observation, offered as disagreement rather than defect. The deck's greatest intellectual strength — deriving requirements from failure modes — is applied rigorously to *carriers in general* and then applied to Bitcoin only through a table. The inversion is never turned on the thesis itself. The strongest version of this deck would spend sixty seconds somewhere after 4.22 asking "how could **this argument** fail?" — what would have to be true for the marginal-flows thesis to be wrong. The deck already has the intellectual machinery to do it, and it would be the most disarming minute in the presentation. That is a suggestion, not a finding.
