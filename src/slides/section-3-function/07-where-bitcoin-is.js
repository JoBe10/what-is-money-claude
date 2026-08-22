// 3.7 — where Bitcoin is. The ladder returns resolved (a cold mount — the
// layer tower stands between this slide and the ladder group, so this
// instance is its own); the bitcoin glyph is placed at the store-of-value
// stage, descriptively, in the same neutral register as 2.8 — the caption
// beneath, the two literacy lines and the honesty line in the clear sky
// above the early stages, no accent anywhere. Then the frame clears and
// the handoff stands alone. Build 0 is the authored black beat before the
// ladder returns.

import { StageLadder } from '../../components/section-3/StageLadder.js';

const CAPTION =
  'Collectible, 2009–. Now visibly in the store-of-value stage: held by individuals, funds, institutions, states. Not a medium of exchange or unit of account at scale.';
const LITERACY_ONE = 'Supply: 21,000,000 units — fixed by the protocol’s rules.';
const LITERACY_TWO = 'Can be held directly, with no counterparty — like a bearer asset.';
const HONESTY =
  'Early in a process that history shows can stall. Candidates have died mid-climb before.';
const HANDOFF =
  'So how do you tell — for this candidate or any other — whether it deserves the foundation role?';

const STAGES_RESOLVED = {
  collectible: 'revealed', sov: 'revealed', moe: 'revealed', uoa: 'revealed'
};
// The ladder returns resolved — every threshold stated (R3.1 §B1).
const GATES_LIT = { g1: 'bright', g2: 'bright', g3: 'bright' };
const ENTITY = { glyph: 'bitcoin', at: 'sov' };

const LADDER_STATES = [
  { line: false, stages: {}, gates: {} },
  { line: true, stages: STAGES_RESOLVED, gates: GATES_LIT },
  { line: true, stages: STAGES_RESOLVED, gates: GATES_LIT, entity: ENTITY },
  { line: true, stages: STAGES_RESOLVED, gates: GATES_LIT, entity: ENTITY },
  { line: true, stages: STAGES_RESOLVED, gates: GATES_LIT, entity: ENTITY },
  { line: true, stages: STAGES_RESOLVED, gates: GATES_LIT, entity: ENTITY }
];

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '3-07-where-bitcoin-is',
  section: 'function',
  number: 21,
  title: 'Where Bitcoin Is',
  totalBuildSteps: 5,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's3f s3f-bitcoin';

    const world = document.createElement('div');
    world.className = 's3f-bitcoin__world';

    const ladder = StageLadder();
    world.appendChild(ladder.el);

    const caption = document.createElement('p');
    caption.className = 's3f-bitcoin__caption';
    caption.textContent = CAPTION;
    world.appendChild(caption);

    const literacyOne = document.createElement('p');
    literacyOne.className = 's3f-bitcoin__literacy';
    literacyOne.dataset.line = '1';
    literacyOne.textContent = LITERACY_ONE;
    world.appendChild(literacyOne);

    const literacyTwo = document.createElement('p');
    literacyTwo.className = 's3f-bitcoin__literacy';
    literacyTwo.dataset.line = '2';
    literacyTwo.textContent = LITERACY_TWO;
    world.appendChild(literacyTwo);

    const honesty = document.createElement('p');
    honesty.className = 's3f-bitcoin__honesty';
    honesty.textContent = HONESTY;
    world.appendChild(honesty);

    root.appendChild(world);

    const handoff = document.createElement('p');
    handoff.className = 's3f-bitcoin__handoff';
    handoff.textContent = HANDOFF;
    root.appendChild(handoff);

    container.appendChild(root);

    this._refs = {
      root, ladder, caption, literacyOne, literacyTwo, honesty, handoff,
      appliedStep: 0, reconstruct: false
    };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    if (this._refs && (ctx?.targetBuildStep || 0) > 0) this._refs.reconstruct = true;
  },

  onExit() {
    if (this._refs) this._refs.ladder.destroy();
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    const n = Math.max(0, Math.min(5, Number(step) || 0));
    const live = !refs.reconstruct && n === refs.appliedStep + 1;
    refs.reconstruct = false;
    refs.appliedStep = n;
    refs.root.dataset.step = String(n);
    refs.root.dataset.live = String(live);
    if (!live) {
      refs.root.dataset.snap = 'true';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        delete refs.root.dataset.snap;
      }));
    }

    refs.ladder.applyState(LADDER_STATES[n], { live });

    setVisible(refs.caption, n >= 2 && n <= 4);
    setVisible(refs.literacyOne, n >= 3 && n <= 4);
    setVisible(refs.literacyTwo, n >= 3 && n <= 4);
    setVisible(refs.honesty, n === 4);
    setVisible(refs.handoff, n >= 5);
  },

  notes: `[→] So where does the newest mark on our rail sit on this ladder? Let’s place it — descriptively, same neutral register as before.

[→] Bitcoin spent its first years as a pure collectible — held by cryptographers and the curious, for their own strange reasons, exactly where every monetary good starts. Today it is visibly in the store-of-value stage: held by individuals, by funds, and lately by institutions and states — I’m stating adoption as fact, not as applause. It is not a medium of exchange at scale. It is not a unit of account. On the ladder’s own logic, that’s not damning — that’s the expected position for its age. But position isn’t destiny.

[→] Two facts complete the description — you’ll need both later. Its supply: twenty-one million units, fixed by the protocol’s own rules — not a promise from an issuer; a property of the thing. And it can be held *directly*, with no counterparty — like a bearer asset. Keep that one especially in mind; you now know, from the tower we just looked at, why how you hold something matters as much as what it is.

[→] And the honest line, in the same breath: it is early in a process that history shows can stall. Candidates have died mid-climb before. Nothing on this ladder guarantees the next rung.

[→] So how do you tell — for this candidate, or any other — whether it deserves the foundation role? Not by anyone’s opinion. Not mine either. By a judgment you can build from first principles. That’s the third question on our line. And it’s where we’re going right now.`
};
