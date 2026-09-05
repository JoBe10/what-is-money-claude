// Scene 11 — Three Familiar Jobs (5 beats, the legacy pacing).
//
// The act's home frame. The disc returns to the screen at beat 1 — the
// triad's center, literally 1.2's luminous token by its own classes (the r2
// thread ruling) — and the three jobs radiate from it in `3-01`'s own builds:
// STORE OF VALUE left, MEDIUM OF EXCHANGE right, UNIT OF ACCOUNT beneath,
// each spoke drawing out as its entry rises, the neutral job object arriving
// with its entry (the r2 neutral-marks ruling: the hourglass, the hand-off,
// the balance scale in the rails-law band form). Beat 5 is the retrospective
// landing: the continuity line, verbatim from the legacy slide — the
// competition's three dimensions, seen from the inside.
//
// MOTION IS TRANSCRIBED, NOT RE-AUTHORED. The legacy `3-01` animates by
// dataset choreography — setVisible on the token, the spokes and the
// entries, with the legacy stylesheet carrying every duration (the token's
// 1100/1500ms arrival, the spokes' 1100ms draw, the entries' 800/900ms
// rise). This module performs exactly those flips; the timelines only
// schedule them and snap to the approved settled state at the end.
//
// Landed states — the approved cells s11-b1 … s11-b5, by construction.

import { makeSceneModule } from './_sceneModule.js';
import { setVisible, hideInstantly } from './_jobsStage.js';

const ID = 'three-familiar-jobs';
const JOB_KEYS = ['sov', 'moe', 'uoa'];

// The token's legacy arrival: hidden instantly at the launch point, then its
// own CSS transition carries it in (opacity 1100ms, scale 1500ms).
function revealToken(stage) {
  hideInstantly(stage.token, () => setVisible(stage.token, false));
  requestAnimationFrame(() => setVisible(stage.token, true));
}

// Cold entry at beat 1: the go-between good returns center, alone.
function entry(mod, stage) {
  stage.applyState(ID, 0);
  const tl = stage.timeline();
  tl.add(() => revealToken(stage), 0.12);
  tl.add(() => stage.applyState(ID, 0), 1.9);
}

// S11 is the act's first scene; a within-group forward handoff into it does
// not exist (S10 → S11 is a group boundary — the engine's crossfade, with
// the entry gesture as its language). Kept as the entry for safety.
const morphIn = entry;

// One job radiates: the spoke draws from the token as the entry rises with
// its object — the legacy build's own dataset flip, the stylesheet's timing.
const jobStep = (n) => (mod, stage) => {
  const key = JOB_KEYS[n - 1];
  const tl = stage.timeline();
  tl.add(() => {
    setVisible(stage.spokes[key], true);
    setVisible(stage.fns[key], true);
  }, 0.12);
  tl.add(() => stage.applyState(ID, n), 1.7);
};

const transitions = {
  1: jobStep(1),
  2: jobStep(2),
  3: jobStep(3),

  // beat 5 — the retrospective landing: the continuity line rises under the
  // whole triad, the legacy slide's own reveal.
  4: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => setVisible(stage.continuity, true), 0.12);
    tl.add(() => stage.applyState(ID, 4), 1.2);
  }
};

export default makeSceneModule({
  id: ID,
  number: 11,
  title: 'Three Familiar Jobs',
  entry,
  morphIn,
  transitions,
  notes: `[→] Better for what job — so let's name the jobs. Here is the go-between good again: the thing every trade in the world now has on one side of it. Watch what it's actually being asked to do.

[→] First: hold value between the moment you earn and the moment you spend. A money is a store of value — it moves value *through time*. Sometimes an afternoon. Sometimes a working life.

[→] Second: be the thing both sides of a trade will take. A money is a medium of exchange — it moves value *between people*, across any distance the trade can reach.

[→] Third, the quiet one: once everything trades against the same good, everything gets *priced* in it. A money is a unit of account — the measuring stick of value itself.

[→] And notice — you've seen these three before. Survives across time. Across space. Across scale. The dimensions that decided the competition you just watched — shells against cattle, gold against everything — are exactly the three jobs, seen from the inside. The market wasn't selecting arbitrarily. It was selecting for the job.`
});
