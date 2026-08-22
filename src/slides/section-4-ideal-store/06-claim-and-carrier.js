// 4.06 — the claim and its carrier.
//
// The register assignment: MIXED. The claim-and-shell scene is pure line
// grammar and stays that way — it draws a *distinction* (essence versus body),
// and a distinction has no sensory content to photograph. The carrier lineup
// beneath it is dark-field, because that row is the record made concrete: these
// are the actual objects people's savings lived in, and the sentence it carries
// — "those were never the money; they were carriers" — only lands if the viewer
// registers them as things first.
//
// The glyph twins are untouched everywhere the same carriers appear inside a
// diagram: the comparison table's headers, the Evolution Rail's stops, 4.21's
// decision row. One subject, two registers, each in its own place (§9.4.9).

import { ClaimObject } from '../../components/section-4/ClaimObject.js';
import { CarrierShell } from '../../components/section-4/CarrierShell.js';
import { DarkFieldImage } from '../../components/DarkField.js';
import { glyph } from '../../components/section-2/glyphs.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 4;

// The record's carriers. The fourth column is the register this position
// speaks: 'dark-field' renders the graded photograph, 'glyph' renders the
// grammar mark. Changing one word moves one position between registers.
//
// FLAGGED (docs/dark-field-manifest.md §2): `bitcoin` is a photograph of a
// physical coin. R7 retired exactly that render as defect V-1 — it asserts an
// object 4.15 spends its script denying — and R7.2's brief names it among the
// renders to restore. It is restored because the presenter ruled it, and this
// is the line to change back to 'glyph' if the V-1 reading wins: the other four
// positions are unaffected.
const CARRIERS = [
  ['shells', 'SHELLS', 'shells', 'dark-field'],
  ['gold', 'GOLD', 'gold', 'dark-field'],
  ['paper', 'PAPER', 'paper', 'dark-field'],
  ['bank-ledgers', 'BANK LEDGERS', 'ledger', 'dark-field'],
  ['bitcoin', 'BITCOIN', 'bitcoin', 'dark-field']
];

const CARRIER_GLYPH_SIZE = 76;
const CARRIER_RENDER = { width: 150, height: 112 };

function createCarrierLineage() {
  const lineage = document.createElement('div');
  lineage.className = 's4-claim-carrier__lineage';
  lineage.setAttribute('aria-label', 'Historical monetary carriers');

  CARRIERS.forEach(([id, label, subject, register], index) => {
    const item = document.createElement('div');
    item.className = 's4-claim-carrier__lineage-item';
    item.dataset.carrier = id;
    item.dataset.register = register;
    item.style.setProperty('--carrier-index', index);

    let visual;
    if (register === 'dark-field') {
      // DARK-FIELD PENDING is handled inside the component: a subject whose
      // render is absent falls back to this same grammar mark, marked pending.
      visual = DarkFieldImage({
        name: subject,
        width: CARRIER_RENDER.width,
        height: CARRIER_RENDER.height,
        alt: label.toLowerCase(),
        className: 's4-claim-carrier__lineage-visual'
      }).el;
      visual.dataset.visible = 'true';
    } else {
      visual = document.createElement('div');
      visual.className = 's4-claim-carrier__lineage-visual s4-claim-carrier__lineage-visual--glyph';
      visual.innerHTML = glyph(subject, CARRIER_GLYPH_SIZE);
    }

    const caption = document.createElement('span');
    caption.textContent = label;

    item.append(visual, caption);
    lineage.appendChild(item);
  });

  return lineage;
}

function createFinalStatement() {
  const statement = document.createElement('div');
  statement.className = 's4-claim-carrier__final';

  const essenceLine = document.createElement('span');
  essenceLine.append('The claim is the ');
  const essence = document.createElement('strong');
  essence.textContent = 'essence.';
  essenceLine.appendChild(essence);

  const carrierLine = document.createElement('span');
  carrierLine.append('The monetary asset is the ');
  const carrier = document.createElement('strong');
  carrier.textContent = 'carrier.';
  carrierLine.appendChild(carrier);

  statement.append(essenceLine, carrierLine);
  return statement;
}

export default {
  id: '4-06-claim-and-carrier',
  section: 'ideal-store',
  number: 27,
  title: 'The Claim and Its Carrier',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-claim-carrier';
    root.dataset.register = 'mixed';

    const openingStatement = document.createElement('div');
    openingStatement.className = 's4-claim-carrier__statement s4-claim-carrier__statement--essence';
    openingStatement.append('The claim on value is the ');
    const essence = document.createElement('strong');
    essence.textContent = 'essence of money.';
    openingStatement.appendChild(essence);
    root.appendChild(openingStatement);

    const bodyStatement = document.createElement('div');
    bodyStatement.className = 's4-claim-carrier__statement s4-claim-carrier__statement--body';
    const bodyLine1 = document.createElement('span');
    bodyLine1.textContent = 'But an abstract claim still needs a body—';
    const bodyLine2 = document.createElement('span');
    bodyLine2.textContent = 'something capable of carrying it across people, places and time.';
    bodyStatement.append(bodyLine1, bodyLine2);
    root.appendChild(bodyStatement);

    const carrierTitle = document.createElement('div');
    carrierTitle.className = 's4-claim-carrier__carrier-title';
    const carrierLead = document.createElement('span');
    carrierLead.textContent = 'THE MONETARY MEDIUM';
    const carrierMain = document.createElement('strong');
    carrierMain.textContent = 'THE CARRIER';
    carrierTitle.append(carrierLead, carrierMain);
    root.appendChild(carrierTitle);

    const scene = document.createElement('div');
    scene.className = 's4-claim-carrier__scene';

    const shell = CarrierShell({ className: 's4-claim-carrier__shell' });
    scene.appendChild(shell.el);

    const claimStage = document.createElement('div');
    claimStage.className = 's4-claim-carrier__claim-stage';
    const claim = ClaimObject({ className: 's4-claim-carrier__claim' });
    claimStage.appendChild(claim.el);
    scene.appendChild(claimStage);
    root.appendChild(scene);

    const lineage = createCarrierLineage();
    root.appendChild(lineage);

    const finalStatement = createFinalStatement();
    root.appendChild(finalStatement);

    container.appendChild(root);

    this._refs = {
      root,
      openingStatement,
      bodyStatement,
      carrierTitle,
      scene,
      shell,
      claim,
      lineage,
      finalStatement,
      appliedStep: 0,
      reconstruct: false
    };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    markReconstruct(this._refs, ctx);
  },

  onExit() {
    this._refs?.claim.destroy();
    this._refs?.shell.destroy();
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    // 0 the claim, inherited · 1 it needs a body · 2 the split, and the whole
    // record reorganized into carriers · 3 the bodies recede and the claim
    // does not — the money was always the thing inside · 4 one carrier, one
    // claim, and the question that is left.
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    refs.openingStatement.dataset.visible = String(n === 1);
    refs.openingStatement.dataset.quiet = 'false';
    refs.bodyStatement.dataset.visible = String(n === 1);
    refs.carrierTitle.dataset.visible = String(n >= 2);
    refs.carrierTitle.dataset.quiet = String(n >= 3);
    refs.claim.applyState({
      visible: true,
      emphasis: 'focus'
    });
    refs.shell.applyState({
      visible: n >= 2,
      focus: n >= MAX_STEP ? 'future' : 'none'
    });
    refs.lineage.dataset.visible = String(n >= 2 && n < MAX_STEP);
    refs.lineage.dataset.quiet = String(n >= 3);
    refs.finalStatement.dataset.visible = String(n >= 2);
  },

  notes: `[→] So the claim is the essence of money. But a claim is abstract — and an abstract thing can’t cross a market stall, a border, or a century on its own. It needs a body. Something capable of carrying it across people, places, and time.

[→] The claim is the essence. The monetary asset is the carrier. And the instant you see that split, two things happen. First, all of our history reorganizes itself: the shells, the cattle, the coins, the notes in the vault — those were never the money. They were *carriers*. The money was always the thing inside.

[→] Second — and this is the sentence I most want you to take home — you can finally see what printing actually is. The claim is the money; the unit is just the notation it’s written in. Which means: **you cannot print money. You can only print the units it comes in — and every unit printed drains the ones already earned.** Printing creates no claims, because no value was delivered. It re-divides the existing pool of claims across more units — so every fresh unit arrives carrying purchasing power taken, silently, from every unit somebody worked for. A government can create currency units. It cannot print the purchasing power those units claim. That’s not a counterexample to our definition. That’s the definition, working.

[→] Some carriers preserve the claim faithfully. Some dilute it. Some trap it, degrade, depend on institutions, fail. Which makes our real question precise at last: not *which object should a saver own* — but *which carrier can transport an unredeemed claim most faithfully through time?*`
};
