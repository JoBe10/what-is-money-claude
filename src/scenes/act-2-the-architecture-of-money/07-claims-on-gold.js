// Scene 7 — Claims on Gold: Portability Through Trust (5 beats).
//
// Gold's weight, answered by architecture. The scene morphs in from Scene 6
// — the idea persists (the mass state's sentence becomes the weakness list)
// — with the through-line composition returning under gold's own recorded
// wound. The carrier renames to COINAGE with the claim never blinking; the
// vault study lands; and then the act's signature new motion: THE
// CERTIFICATE TRAVEL — the vault settles into custody, the certificate
// leaves its orbit and travels outward across the boundary, and the
// dependency line draws BACK from the claim to the vault, dot-terminated, in
// Act I's own service-path grammar. It went, and it still owes. The trade is
// then named honestly on cleared black.
//
// Landed states — approved cells, by construction: s7-b1 … s7-b5, with b4
// the presenter-selected custody-boundary logic restaged photographically
// (approved with the post-§1 record, 31 August 2026).

import { gsap } from 'gsap';
import { GEOM, COPY, setVisible, hideInstantly } from './_architectureStage.js';
import { makeSceneModule } from './_sceneModule.js';

const ID = 'claims-on-gold';

function entry(mod, stage) {
  stage.applyState(ID, 0);
  const tl = stage.timeline();
  tl.add(() => {
    hideInstantly(stage.shell.el, () => stage.shell.applyState({ visible: false }));
    hideInstantly(stage.claim.el, () => stage.claim.applyState({ visible: false }));
    gsap.set([stage.claimLabelEl, stage.stmtEls[0]], { opacity: 0 });
  }, 0);
  tl.add(() => stage.claim.applyState({ visible: true }), 0.2);
  tl.add(() => stage.shell.applyState({ visible: true }), 0.4);
  tl.to(stage.claimLabelEl, { opacity: 1, duration: 0.5, ease: 'power1.out' }, 0.7);
  tl.to(stage.stmtEls[0], { opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.0);
  tl.add(() => stage.applyState(ID, 0), 1.8);
}

// The morph from Scene 6: the mass diagram recedes and the composition it
// interrupted returns — the same claim, the same body, its weaknesses now
// named on it. The idea persists; the world does not cut.
function morphIn(mod, stage) {
  stage.applyState('scarcity-in-matter', 8);
  const tl = stage.timeline();
  tl.to([stage.diagSvg, stage.diagEls, stage.stmtEls[0]],
    { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0.05);
  tl.add(() => stage.claim.applyState({ visible: true }), 0.5);
  tl.add(() => stage.shell.applyState({ visible: true }), 0.7);
  tl.add(() => {
    stage.setText(stage.claimLabelEl, 'GOLD', GEOM.claimLabel(1));
    gsap.set(stage.claimLabelEl, { opacity: 0 });
  }, 0.75);
  tl.to(stage.claimLabelEl, { opacity: 1, duration: 0.5, ease: 'power1.out' }, 0.8);
  tl.add(() => {
    const [copy, styles] = GEOM.statement(COPY.goldWound, 812, 40, 1);
    stage.setText(stage.stmtEls[0], copy, styles);
    gsap.set(stage.stmtEls[0], { opacity: 0, y: 12 });
  }, 1.2);
  tl.to(stage.stmtEls[0], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.25);
  tl.add(() => stage.applyState(ID, 0), 2.1);
}

const transitions = {
  // beat 2 — the body becomes the coin: the claim never blinks; only the
  // carrier's name and the trade's terms change hands.
  1: (mod, stage) => {
    const tl = stage.timeline();
    tl.to([stage.claimLabelEl, stage.stmtEls[0]],
      { opacity: 0, duration: 0.3, ease: 'power1.in' }, 0.05);
    tl.add(() => {
      stage.setText(stage.claimLabelEl, 'COINAGE', GEOM.claimLabel(1));
      gsap.set(stage.claimLabelEl, { opacity: 0 });
      const [copy, styles] = GEOM.statement(COPY.mint, 812, 40, 1);
      stage.setText(stage.stmtEls[0], copy, styles);
      gsap.set(stage.stmtEls[0], { opacity: 0, y: 8 });
    }, 0.4);
    tl.to(stage.claimLabelEl, { opacity: 1, duration: 0.45, ease: 'power1.out' }, 0.45);
    tl.to(stage.stmtEls[0], { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.55);
    tl.add(() => stage.applyState(ID, 1), 1.3);
  },

  // beat 3 — custody: the composition clears and the vault study lands,
  // the register's own reveal, the statement over it.
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => {
      stage.shell.applyState({ visible: false });
      stage.claim.applyState({ visible: false });
    }, 0.05);
    tl.to([stage.claimLabelEl, stage.stmtEls[0]],
      { opacity: 0, duration: 0.45, ease: 'power1.inOut' }, 0.05);
    tl.add(() => setVisible(stage.vaultStudy, true), 0.5);
    tl.add(() => {
      const [copy, styles] = GEOM.studyStatement(COPY.goldStops);
      stage.setText(stage.studyStmtEl, copy, styles);
      gsap.set(stage.studyStmtEl, { opacity: 0, y: 8 });
    }, 1.0);
    tl.to(stage.studyStmtEl, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.05);
    tl.add(() => stage.applyState(ID, 2), 1.9);
  },

  // beat 4 — THE CERTIFICATE TRAVEL. The study becomes the photograph
  // mid-frame (a same-pixel swap); the vault settles into its custody
  // position — the heavy thing that stays — while the certificate leaves
  // its orbit and travels outward across the boundary; the dependency line
  // draws BACK from the claim to the vault in the service path's exact
  // grammar; the protected phrase lands.
  3: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.studyStmtEl, { opacity: 0, duration: 0.35, ease: 'power1.in' }, 0.05);
    tl.add(() => {
      stage.setBox(stage.vaultPhoto, GEOM.studyBox);
      stage.vaultPhoto.style.opacity = '1';
      stage.vaultStudy.style.display = 'none';
    }, 0.1);
    tl.to(stage.vaultPhoto, {
      left: `${GEOM.vaultPhoto[0]}px`, top: `${GEOM.vaultPhoto[1]}px`,
      width: `${GEOM.vaultPhoto[2]}px`, height: `${GEOM.vaultPhoto[3]}px`,
      duration: 1.2, ease: 'power2.inOut'
    }, 0.2);
    tl.add(() => {
      stage.setBox(stage.certPhoto, [632, 345, 136, 170]);
      stage.certPhoto.style.opacity = '0';
    }, 0.7);
    tl.to(stage.certPhoto, { opacity: 1, duration: 0.35, ease: 'power1.out' }, 0.8);
    tl.to(stage.certPhoto, {
      left: `${GEOM.certPhoto[0]}px`, top: `${GEOM.certPhoto[1]}px`,
      width: `${GEOM.certPhoto[2]}px`, height: `${GEOM.certPhoto[3]}px`,
      duration: 1.35, ease: 'power2.inOut'
    }, 0.85);
    tl.add(() => stage.setDot(stage.depDotEls[1], 1180, 428, 3.5, 0.7), 2.3);
    stage.drawSeg(tl, stage.depLineEl, 2.4, 0.7, 'power2.out', [1180, 428, 890, 512, 0.35, 1.5]);
    tl.add(() => stage.setDot(stage.depDotEls[0], 890, 512, 3.5, 0.7), 3.15);
    tl.add(() => {
      const [copy, styles] = GEOM.statement(COPY.claimOnGold, 866, 46, 1);
      stage.setText(stage.stmtEls[0], copy, styles);
      gsap.set(stage.stmtEls[0], { opacity: 0, y: 12 });
    }, 3.25);
    tl.to(stage.stmtEls[0], { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, 3.3);
    tl.add(() => stage.applyState(ID, 3), 4.15);
  },

  // beat 5 — the trade named honestly: the detachment clears, and the pair
  // lands sequenced on the black it leaves.
  4: (mod, stage) => {
    const tl = stage.timeline();
    tl.to([stage.vaultPhoto, stage.certPhoto],
      { opacity: 0, duration: 0.55, ease: 'power1.inOut' }, 0.05);
    tl.to([stage.depLineEl, ...stage.depDotEls],
      { attr: { opacity: 0 }, duration: 0.4, ease: 'power1.inOut' }, 0.05);
    tl.to(stage.stmtEls[0], { opacity: 0, duration: 0.4, ease: 'power1.in' }, 0.1);
    tl.add(() => {
      const a = GEOM.statement(COPY.portability, 452, 54, 1);
      stage.setText(stage.stmtEls[0], a[0], a[1]);
      gsap.set(stage.stmtEls[0], { opacity: 0, y: 10 });
      const b = GEOM.statement(COPY.trust, 560, 54, 1);
      stage.setText(stage.stmtEls[1], b[0], b[1]);
      gsap.set(stage.stmtEls[1], { opacity: 0, y: 10 });
    }, 0.65);
    tl.to(stage.stmtEls[0], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.7);
    tl.to(stage.stmtEls[1], { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, 1.25);
    tl.add(() => stage.applyState(ID, 4), 2.1);
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
