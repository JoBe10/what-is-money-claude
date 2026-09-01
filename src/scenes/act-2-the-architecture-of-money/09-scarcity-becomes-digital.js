// Scene 9 — Bitcoin: Can Scarcity Become Digital? (5 beats).
//
// THE MESH FORMS OUT OF THE LEDGER STATION (r2.6). This is the beat the whole
// rail was built to make possible. The network no longer arrives as a diagram
// from somewhere else: the record recedes to the legacy's deep dim, the LEDGER
// station ALONE stays lit — the issuer the act has just watched fail — and its
// hub dissolves into the ring, the mesh anchored exactly where the ledger
// stood. The approved system is unchanged in every line, chord and voice; only
// where it stands has moved, and where it stands is the whole argument.
//
// The formation itself is the batch's own, transcribed move for move: the
// institutional shape stands first — the hub at full voice with its spokes out
// to the ring — then the centre steps away while the peer-to-peer chords come
// in over it. Then the rail returns and BITCOIN takes its station BESIDE the
// ledger, its facts landing as an entrant annotation in the deck's most
// neutral register, its three capabilities on their own advance, and the
// honest limitation on its own after them — the legacy entrant treatment's
// whole point, now happening at a station on the record rather than in mid-air.
//
// Landed states — the approved r2 cells, by construction: s9-b1 … s9-b5.

import { makeSceneModule } from './_sceneModule.js';

const ID = 'scarcity-becomes-digital';

// The hub dissolving, at the LEDGER station. Shared by the cold entry and the
// morph so the formation plays the same way either way.
function formNetwork(mod, stage, tl, at = 0) {
  stage.railTo(tl, stage.states[ID][0].rail, { at });
  stage.railMesh(tl, at + 1.6);
}

function entry(mod, stage) {
  const tl = stage.timeline();
  formNetwork(mod, stage, tl, 0);
  tl.add(() => stage.applyState(ID, 0), 4.0);
}

// The morph from Scene 8: "keep your eye on the ledger, because the story
// isn't done with it." The two balance lines clear, and the station the scene
// just measured is the thing that changes shape.
function morphIn(mod, stage) {
  stage.applyState('money-becomes-information', 4);
  const tl = stage.timeline();
  tl.to(stage.stmtEls[0], { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0.05);
  formNetwork(mod, stage, tl, 0.5);
  tl.add(() => stage.applyState(ID, 0), 4.5);
}

const transitions = {
  // beat 2 — the rail returns and BITCOIN takes its station beside the ledger.
  // The mesh releases on the record's own 800ms, the camera opens right one
  // last time, the line extends to the final head, and the facts land.
  1: (mod, stage) => {
    const st = stage.states[ID][1];
    const tl = stage.timeline();
    tl.to(stage.railWorld.meshLayer,
      { opacity: 0, duration: 0.8, ease: 'power1.out' }, 0);
    stage.railTo(tl, st.rail, { at: 0.4, grow: true });
    stage.railBlock(tl, stage.railLandEls[0], () => stage.railLanding(st, 0), 2.5);
    tl.add(() => stage.applyState(ID, 1), 3.6);
  },

  // beat 3 — the three capabilities that had never coexisted land on their own
  // advance, each in the caps register at full voice, while the facts recede
  // to the dimmed-prior step (§9.4 rule 10).
  2: (mod, stage) => {
    const st = stage.states[ID][2];
    const tl = stage.timeline();
    tl.add(() => stage.railLanding(st, 0), 0.05);
    [1, 2, 3].forEach((i) => {
      stage.railBlock(tl, stage.railLandEls[i],
        () => stage.railLanding(st, i), 0.35 + (i - 1) * 0.35, { dur: 0.5, rise: 10 });
    });
    tl.add(() => stage.applyState(ID, 2), 2.4);
  },

  // beat 4 — the honest line, in the same breath. The limitation takes its own
  // advance at full voice while everything above it recedes and settles up.
  3: (mod, stage) => {
    const st = stage.states[ID][3];
    const tl = stage.timeline();
    tl.to(stage.railLandEls[0], { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, 0);
    tl.add(() => [0, 1, 2].forEach((i) => stage.railLanding(st, i)), 0.45);
    stage.railBlock(tl, stage.railLandEls[3], () => stage.railLanding(st, 3), 0.75);
    tl.add(() => stage.applyState(ID, 3), 1.9);
  },

  // beat 5 — the stability distinction, over the receded record: the market's
  // valuation of a young asset and the architecture of the claim are two
  // different questions.
  4: (mod, stage) => {
    const st = stage.states[ID][4];
    const tl = stage.timeline();
    tl.to(stage.railLandEls, { opacity: 0, duration: 0.45, ease: 'power1.inOut' }, 0);
    stage.railTo(tl, st.rail, { at: 0.4, camera: false });
    stage.railBlock(tl, stage.stmtEls[0], () => stage.railStatement(st, 0), 1.1);
    stage.railBlock(tl, stage.stmtEls[1], () => stage.railStatement(st, 1), 1.7, { dur: 0.6 });
    tl.add(() => stage.applyState(ID, 4), 2.8);
  }
};

export default makeSceneModule({
  id: ID,
  number: 9,
  title: 'Bitcoin: Can Scarcity Become Digital?',
  entry,
  morphIn,
  transitions,
  notes: `[→] In 2009, something appeared that had never existed before: a digital good, issued by no state and no company, with a supply fixed by its own rules. Watch what happens to the ledger — the institution at its center steps away, and in its place, a network of independent computers, each holding the whole record, each checking all the others. I'm going to describe this in a strictly neutral register, because describing is all the story has earned so far.

[→] The facts: twenty-one million units — not a promise from an issuer, a property of the thing, fixed by the protocol's own rules. It moves like information, anywhere, at any hour. And it can be held *directly*, with no counterparty — like a bearer asset. Held today by individuals, funds, and lately institutions and states — stated as adoption fact, not as applause.

[→] Three capabilities, then, that had never coexisted: digital mobility. Non-discretionary supply. Independent verification — anyone can check the ledger; no one has to be believed.

[→] And the honest line, in the same breath: it is very young. Its price still swings far more than the monies it would compete with. It is not yet twenty years into a hundred-year question.

[→] One distinction before we go on, because it keeps the thinking clean: the market's valuation of a young asset, and the architecture of the claim itself, are two different questions. Volatility is what the first looks like while adoption is still being decided — a stage, not a verdict. History suggests it can diminish as a monetary good matures; that is an expectation, never a guarantee. The architecture is what the rest of this story knows how to judge.`
});
