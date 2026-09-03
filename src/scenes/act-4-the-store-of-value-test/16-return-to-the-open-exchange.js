// Scene 16 — Return to the Open Exchange (8 beats).
//
// THE HOMECOMING. The saved frame from Scene 4 reconstructs — the approved
// s4-b4-b, the claim resting on the save road, the terminal dissolved, the
// road drawing on into black — built by the film's own Act I stage through
// its own state law, so beat 1 is the approved cell by construction. Then
// everything recedes but the claim: the disc rises from its rest to the
// fork's apex — the very point it rose to before it took the road — and the
// definition lands over it at display scale, AN EARNED, TRANSFERABLE / CLAIM
// ON VALUE, in legacy 4-04's own frame (builds 3 and 4, the scene gone, the
// claim released). The claim then needs a body: it re-centers to the carrier
// stage and legacy 4-06 takes the frame beneath it — the split, the lineage
// in the dark-field register, the crescendo spoken over the receded bodies,
// and the question one carrier and one claim leave (builds 1–4). The ruled
// map's Row 3 (A) closes the scene here, the crescendo included.
//
// WHAT THIS SESSION AUTHORS, AND FLAGS: the entry — the one authored morph
// the brief names — is the Scene 4 frame reconstructing around the disc
// that appears where Scene 15 leaves its glowing base slab (the Acts III–IV
// final ruling 3, 3 Sep 2026, master §13 — the act exits on the tower, no
// return to the triad), composed from the Act I stage's own vocabulary (Scene 3 → 4's rise to the apex, Scene 4's own road draw-on and
// its b4 travel to rest, the continuation drawing on); at the splice the
// engine's crossfade from Scene 15 carries it, exactly as S10 → S11 did.
// The two travels between the legacy frames (b1 → b2 to the apex; b4 → b5 to
// the carrier stage) are the wiring the approved cells record; everything
// they connect is the legacy's own composition. Every other beat is the
// legacy module's own live advance.
//
// Landed states — the approved cells s16-b1 … s16-b8, by construction.

import { makeSceneModule } from './_sceneModule.js';
import { ACT1_GEOM as G, hideInstantly, legacyAdvance } from './_testStage.js';

const ID = 'return-to-the-open-exchange';

// Where Scene 15 leaves the frame: the tower's glowing base slab — candidate
// A's BASE MONEY slab at left 830, top 498, 260 × 60, centred at (960, 528)
// — with the hinge question beneath it (the Acts III–IV final ruling 3). The
// homecoming begins there: the disc appears at the slab's center at its Act
// III size (the 120px small token) and rises to the fork's apex, while the
// engine's crossfade dissolves the slab into the disc — the base becoming
// the claim. The start point and size are wiring, flagged in the report.
const SLAB_DISC = [960, 528, 120];

// The save road's corners, apex → rest — Scene 4's own polyline, verbatim
// (04-spend-or-save.js RIGHT_WAY); the claim rides a road's own geometry.
const RIGHT_WAY = [[960, 470], [1200, 470], [1420, 630], [1530, 630]];

// Legacy 4-06's carrier stage: the scene at (700, 400) 520 × 240, the claim
// stage at (170, 84) 180 × 72 inside it — the disc centred at (960, 520).
const CARRIER_CENTER = [960, 520];

// The claim rides a road's own polyline: in through the turn, out at the end
// (Scene 4's own helper, transcribed).
function travel(a, tl, atTime, way, durs, eases) {
  let t = atTime;
  way.slice(1).forEach(([x, y], i) => {
    tl.to(a.markWrap, { left: `${x}px`, top: `${y}px`, duration: durs[i], ease: eases[i] }, t);
    t += durs[i];
  });
  return t;
}

// Cold entry, and the language of the seam from Act III's exit question: the
// Scene 4 frame reconstructs around the disc. The disc finds its light where
// the base slab stood, rises to the fork's apex and takes its Act I size, the
// two roads draw out of it at the saved frame's own voices — the spend road
// already told and subdued, the save road at its voice — and the claim takes
// the save road and comes to rest on it, the terminal dissolved, the road
// drawing on past it into time it cannot see.
function entry(mod, stage) {
  const a = stage.act1;
  // The launch point, set synchronously: the approved frame, then everything
  // but the disc off stage and the disc where Scene 15 left its base slab.
  stage.applyState(ID, 0);
  [a.roadL, a.roadR, a.roadDotL, a.roadDotR].forEach((el) => el.setAttribute('opacity', '0'));
  a.setFade(a.fade, null);
  a.setMark(SLAB_DISC[0], SLAB_DISC[1], SLAB_DISC[2], 0);

  const tl = stage.timeline();
  tl.to(a.markWrap, { opacity: 1, duration: 0.7, ease: 'power1.out' }, 0.05);
  tl.to(a.markWrap, {
    left: `${G.markForkB[0]}px`, top: `${G.markForkB[1]}px`,
    duration: 1.0, ease: 'power2.inOut'
  }, 0.55);
  const size = { s: SLAB_DISC[2] };
  tl.to(size, {
    s: G.markForkB[2], duration: 1.0, ease: 'power2.inOut',
    onUpdate: () => a.markDisc.style.setProperty('--disc-size', `${size.s}px`)
  }, 0.55);
  a.drawRoad(tl, a.roadL, 1.45, 0.9, 'power2.inOut', G.roads.save.left);
  a.drawRoad(tl, a.roadR, 1.45, 0.9, 'power2.inOut', G.roads.save.right);
  tl.add(() => {
    const [lx, ly, lr] = G.roadLeftDot;
    a.setDot(a.roadDotL, lx, ly, lr, G.roads.save.leftDot);
    a.roadDotL.setAttribute('opacity', '0');
  }, 2.3);
  tl.to(a.roadDotL, { attr: { opacity: 1 }, duration: 0.3 }, 2.35);
  const arrive = travel(a, tl, 2.5, RIGHT_WAY,
    [0.5, 0.62, 0.42], ['power1.in', 'none', 'power2.out']);
  const fade = a.fadeProxy(a.fade,
    { x1: G.fadeSaveB[0], x2: G.fadeSaveB[0], y: G.fadeSaveB[2], o: G.fadeSaveB[3], w: G.fadeSaveB[4] });
  tl.add(() => fade.write(), arrive - 0.05);
  tl.to(fade, { x2: G.fadeSaveB[1], duration: 1.1, ease: 'power1.inOut', onUpdate: fade.write }, arrive);
  tl.add(() => stage.applyState(ID, 0), arrive + 1.3);
}

// S16 opens the act; a within-group forward handoff into it does not exist
// (S15 → S16 is a group boundary — the engine's crossfade, with the entry
// gesture as its language, the S10 → S11 precedent). Kept as the entry.
const morphIn = entry;

const transitions = {
  // beat 2 — everything recedes but the claim: the roads, the terminal and
  // the continuation dissolve; the claim rises from its rest to the fork's
  // apex, brightening to the claim's focus voice on the way; legacy 4-04's
  // frame takes over beneath it at the same point and size, and the
  // definition lands in its own reveal (the legacy's 520ms rise).
  1: (mod, stage) => {
    const a = stage.act1;
    const tl = stage.timeline();
    tl.to([a.roadL, a.roadR, a.roadDotL, a.fade.line],
      { attr: { opacity: 0 }, duration: 0.6, ease: 'power1.inOut' }, 0.05);
    tl.to(a.markWrap, {
      left: `${G.markForkB[0]}px`, top: `${G.markForkB[1]}px`,
      duration: 1.1, ease: 'power2.inOut'
    }, 0.4);
    const glow = { b: 1 };
    tl.add(() => { a.markWrap.style.filter = 'brightness(1)'; }, 0.4);
    tl.to(glow, {
      b: 1.06, duration: 0.6, ease: 'power1.inOut',
      onUpdate: () => { a.markWrap.style.filter = `brightness(${glow.b})`; }
    }, 0.9);
    const headline = stage.el('s404', '.s4-unfinished__headline');
    tl.add(() => {
      stage.showLayer('s404', 3);
      hideInstantly(headline, () => { headline.dataset.visible = 'false'; });
      stage.hideLayer('act1');
    }, 1.55);
    tl.add(() => { headline.dataset.visible = 'true'; }, 1.7);
    tl.add(() => stage.applyState(ID, 1), 2.5);
  },

  // beat 3 — held: the frame holds while the spoken word does the enlarging
  // (the approved s16-b3 is beat 2's frame); no gesture, the contract's
  // reconstruction lands it.

  // beat 4 — the recognition: legacy 4-04's own build 4 — the claim takes
  // the frame at 176, the definition settles to the dimmed-prior step.
  3: legacyAdvance(ID, 3, 's404', 4, 0.9),

  // beat 5 — the claim needs a body: the definition clears, the claim
  // re-centers to the carrier stage and returns to its shell size — the same
  // drawn disc — and legacy 4-06 takes the frame beneath it with its first
  // build's own landing (the two statements).
  4: (mod, stage) => {
    const tl = stage.timeline();
    const headline = stage.el('s404', '.s4-unfinished__headline');
    const claimStage = stage.el('s404', '.s4-unfinished__claim-stage');
    const disc = stage.el('s404', '.s4-claim-object__disc');
    tl.add(() => { headline.style.transition = 'none'; }, 0);
    tl.to(headline, { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0.05);
    tl.to(claimStage, { top: `${CARRIER_CENTER[1]}px`, duration: 0.8, ease: 'power2.inOut' }, 0.3);
    const size = { s: 176 };
    tl.to(size, {
      s: 116, duration: 0.8, ease: 'power2.inOut',
      onUpdate: () => disc.style.setProperty('--disc-size', `${size.s}px`)
    }, 0.3);
    tl.add(() => {
      stage.showLayer('s406', 0);
      stage.hideLayer('s404');
    }, 1.2);
    tl.add(() => stage.live('s406', 1), 1.3);
    tl.add(() => stage.applyState(ID, 4), 2.1);
  },

  // beat 6 — the split: THE MONETARY MEDIUM / THE CARRIER lands, the
  // banded-wall shell closes around the claim, the five-carrier lineage
  // stands beneath in the dark-field register, the final statement — legacy
  // 4-06's own build 2, its stagger included.
  5: legacyAdvance(ID, 5, 's406', 2, 1.6),

  // beat 7 — the crescendo: the bodies recede and the claim does not — the
  // lineage and the carrier title settle to the quiet step; the protected
  // line is spoken over the frame (4-06's own build 3).
  6: legacyAdvance(ID, 6, 's406', 3, 0.8),

  // beat 8 — one carrier, one claim, and the question: the lineage goes and
  // the shell takes its future focus (4-06's own build 4).
  7: legacyAdvance(ID, 7, 's406', 4, 0.8)
};

export default makeSceneModule({
  id: ID,
  number: 16,
  title: 'Return to the Open Exchange',
  entry,
  morphIn,
  transitions,
  notes: `[→] We left this exchange open. What has to survive until we close it? The surgeon is still holding the claim he accepted that day. And this is the moment to pay a debt — because a few minutes ago I asked you to hold a question: every layer is a claim on the layer below, so what is the bottom layer a claim on? Here is the answer.

[→] Money is an earned, transferable claim on value. The surgeon delivered value — and what he holds now is the *other half of that exchange*, still open, still pending. He has completed his side. He has not yet taken the four hundred dollars of goods and services he’ll ultimately want. The exchange is still open — and money is the thing that holds it open.

[→] And because money is standardized and widely accepted, that claim is no longer tied to the patient. He can present it to anyone, anywhere, who has something to offer. Notice exactly what kind of claim that is — because it’s where the bottom layer differs from every layer above it. Not a *legal* claim on anyone in particular. A *social* claim on everyone in general — enforced not by courts, but by acceptance. And now you can see 1971 properly: cancelling redemption didn’t end money’s claim-nature. It removed the legal anchor from underneath the social one — and the claim kept standing, on acceptance alone.

[→] So money turns a person-specific exchange into a transferable claim on the wider market. That’s what those eighty thousand hours become. That’s what you’ve been holding your whole life without a name for it. The exchange is still open.

[→] So the claim is the essence of money. But a claim is abstract — and an abstract thing can’t cross a market stall, a border, or a century on its own. It needs a body. Something capable of carrying it across people, places, and time.

[→] The claim is the essence. The monetary asset is the carrier. And the instant you see that split, two things happen. First, all of our history reorganizes itself: the shells, the cattle, the coins, the notes in the vault — those were never the money. They were *carriers*. The money was always the thing inside.

[→] Second — and this is the sentence I most want you to take home — you can finally see what printing actually is. The claim is the money; the unit is just the notation it’s written in. Which means: **you cannot print money. You can only print the units it comes in — and every unit printed drains the ones already earned.** Printing creates no claims, because no value was delivered. It re-divides the existing pool of claims across more units — so every fresh unit arrives carrying purchasing power taken, silently, from every unit somebody worked for. A government can create currency units. It cannot print the purchasing power those units claim. That’s not a counterexample to our definition. That’s the definition, working.

[→] Some carriers preserve the claim faithfully. Some dilute it. Some trap it, degrade, depend on institutions, fail. Which makes our real question precise at last: not *which object should a saver own* — but *which carrier can transport an unredeemed claim most faithfully through time?*`
});
