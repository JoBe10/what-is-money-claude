// Scene 7 — Claims on Gold: Portability Through Trust (5 beats).
//
// Gold's weight, answered by architecture — and answered ON THE RAIL. The
// scene morphs in from Scene 6 by playing that scene's return seam: the mass
// state clears, the record comes back, and gold's dependency note lands at its
// station. Then COINAGE arrives — photographic for the first time, its study
// gated and ingested at the r2 session — and takes the mint's terms as its
// annotation before the fleet problem writes its limit beneath it.
//
// THE VAULT FOLDS INTO THE RAIL (r2.4). There is no standalone vault overlay
// any more; it is retired to file, banked. Beat 3 is the act's signature
// motion, restaged: CLAIM ON GOLD arrives as a station, and the dependency arc
// draws BACK from the certificate to the gold — through the corridor between
// the band and the line that the traveler vacated when the claim stepped off
// the rail (r2.3) — in Act I's own service-path grammar. It went, and it still
// owes. The arc persists in the record from that beat onward; the sentence
// that landed at full voice condenses into the station's own row; and the
// trade is named honestly over the receded record.
//
// Landed states — the approved r2 cells, by construction: s7-b1 … s7-b5.

import { gsap } from 'gsap';
import { makeSceneModule } from './_sceneModule.js';
import { railReturn } from './06-gold-scarcity-in-matter.js';

const ID = 'claims-on-gold';

// COINAGE arrives: the camera opens right to the new head, the line extends,
// the station comes up, and the mint's terms land at it.
function arriveCoinage(mod, stage, tl, at = 0) {
  const st = stage.states[ID][0];
  stage.railTo(tl, st.rail, { at, grow: true });
  stage.railBlock(tl, stage.railLandEls[0], () => stage.railLanding(st), at + 2.0);
}

function entry(mod, stage) {
  const tl = stage.timeline();
  arriveCoinage(mod, stage, tl, 0);
  tl.add(() => stage.applyState(ID, 0), 3.1);
}

// The morph from Scene 6: the idea persists, so the world does not cut. Scene
// 6's own return seam plays first — the counted load clears and the rail comes
// back carrying gold's dependency note — and COINAGE arrives out of it.
function morphIn(mod, stage) {
  stage.applyState('scarcity-in-matter', 8);
  const tl = stage.timeline();
  const after = railReturn(stage, tl, 0);
  arriveCoinage(mod, stage, tl, after);
  tl.add(() => stage.applyState(ID, 0), after + 3.1);
}

const transitions = {
  // beat 2 — the fleet problem, spoken over the rail. The mint's terms leave
  // the stage register and the station's limit takes its place in the record
  // beneath, at full voice — the wound row's own 900ms landing.
  1: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.railLandEls[0], { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, 0);
    stage.railTo(tl, stage.states[ID][1].rail, {
      at: 0.2, land: [['coinage', 'row64']], arriveAt: 0
    });
    tl.add(() => stage.applyState(ID, 1), 2.2);
  },

  // beat 3 — THE VAULT FOLDS INTO THE RAIL. The camera opens to the new head,
  // CLAIM ON GOLD arrives with the certificate in the band, the dependency arc
  // draws back from it to the gold that has not moved, and the vault line
  // lands as the featured line at full voice.
  2: (mod, stage) => {
    const st = stage.states[ID][2];
    const tl = stage.timeline();
    stage.railTo(tl, st.rail, { at: 0, grow: true });
    stage.railDrawDep(tl, 2.0, 0.9);
    stage.railBlock(tl, stage.railLandEls[0], () => stage.railLanding(st), 2.7);
    tl.add(() => stage.applyState(ID, 2), 3.9);
  },

  // beat 4 — the sentence condenses into the record. What was landed at full
  // voice a beat ago becomes the station's own row, in the rail's register,
  // where the record keeps it; the arc stays drawn.
  3: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.railLandEls[0], { opacity: 0, duration: 0.45, ease: 'power1.inOut' }, 0);
    stage.railTo(tl, stage.states[ID][3].rail, {
      at: 0.3, camera: false, land: [['claim', 'row64']], arriveAt: 0
    });
    tl.add(() => stage.applyState(ID, 3), 2.2);
  },

  // beat 5 — the trade named honestly, over the receded record: the gold
  // stayed, the claim moved; portability improved, trust moved to the issuer.
  // The arc still hangs in the record behind the words, which is why the
  // second sentence is not an opinion.
  4: (mod, stage) => {
    const st = stage.states[ID][4];
    const tl = stage.timeline();
    stage.railTo(tl, st.rail, { at: 0 });
    stage.railBlock(tl, stage.stmtEls[0], () => stage.railStatement(st, 0), 1.5, { rise: 10 });
    stage.railBlock(tl, stage.stmtEls[1], () => stage.railStatement(st, 1), 2.05, { rise: 10 });
    tl.add(() => stage.applyState(ID, 4), 3.2);
  }
};

export default makeSceneModule({
  id: ID,
  number: 7,
  title: 'Claims on Gold: Portability Through Trust',
  entry,
  morphIn,
  transitions,
  notes: `[→] So why isn't there gold in your pocket? Because winning the properties contest didn't cure gold's weaknesses. It's heavy. It's hard to verify — bite marks and touchstones only get you so far. And moving a fortune in it is an invitation to lose one.

[→] So people built upward. Stamp the metal into standard coins and you've solved verification and division at a stroke — every coin the same weight, the same purity, the same stamp — as long as you trust the mint.

[→] But coins solve the market stall, not the merchant fleet. Move a fortune in coin and you're back to weight, guards, and dangerous roads. And most gold ended up resting in vaults for safekeeping anyway. So: leave the gold where it's safe, and trade the *receipt* — a claim on gold in a vault, light as air, divisible by the stroke of a pen, good across any distance the issuer's name can travel. As long as you trust the vault.

[→] Look at what your claim just did. The gold stayed. The claim moved.

[→] That's the trade, named honestly: portability improved — and trust moved to the issuer. For a long time, that exchange rate looked like a bargain. Now watch what happens when the trust gets stretched to breaking.`
});
