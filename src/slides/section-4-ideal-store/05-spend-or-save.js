// 4.05 — spend or save (R7.1 §C1, completed at R7.2 §C2).
//
// The register assignment: MIXED. The mechanism is line-led — one claim, two
// mutually exclusive roads drawn as thin strokes, the unchosen tine dormant
// rather than absent (V-3), the circuit closing on one road and holding on the
// other. That structure is the slide's argument and it stays abstract.
//
// The goods are dark-field renders at display scale, because the spend road's
// whole force is that redeeming the claim gets you *these*, and a row of small
// marks does not make anyone feel the trade. R7.1 drew them as 72px glyphs
// clustered at the frame's lower left, which put the two roads' outcomes at
// wildly different weights: SAVE resolved into a lit object and SPEND resolved
// into three annotations. The fork only reads as a real fork if both ends of it
// are worth taking.
//
// No render enters the diagram: the roads and the claim are the diagram, the
// goods sit at the road's end as what the road leads to. Saving encloses the
// disc in the carrier shell — the first time the deck shows the claim *inside*
// a carrier, one beat before 4.06 names the distinction, and now with a shell
// that has a wall (R7.2 §C3).

import { ClaimObject } from '../../components/section-4/ClaimObject.js';
import { CarrierShell } from '../../components/section-4/CarrierShell.js';
import { DarkFieldImage } from '../../components/DarkField.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 4;

// The three the script names: "he takes the shoes, the meal, the roof."
const FINAL_GOODS = [
  ['shoe', 'A shoe'],
  ['meal', 'A cooked meal'],
  ['wine', 'A glass of wine']
];

function createGoods() {
  const goods = document.createElement('div');
  goods.className = 's4-spend-save__goods';
  goods.setAttribute('aria-hidden', 'true');
  // DARK-FIELD PENDING — `meal` stubs to its grammar mark until the regenerated
  // render lands (docs/dark-field-manifest.md §3.2).
  const items = FINAL_GOODS.map(([name, alt], index) => {
    const item = DarkFieldImage({
      name,
      width: 210,
      height: 158,
      alt,
      className: 's4-spend-save__good'
    });
    item.el.style.setProperty('--good-index', String(index));
    goods.appendChild(item.el);
    return item.el;
  });
  return { el: goods, items };
}

function createSupport(className, line1, line2) {
  const support = document.createElement('div');
  support.className = `s4-spend-save__support ${className}`;

  const explanation = document.createElement('span');
  explanation.textContent = line1;

  const status = document.createElement('strong');
  status.textContent = line2;

  support.append(explanation, status);
  return support;
}

function createRoutes() {
  const routes = document.createElement('div');
  routes.className = 's4-spend-save__routes';
  routes.setAttribute('aria-hidden', 'true');
  routes.innerHTML = `
    <svg viewBox="0 0 1480 320" focusable="false">
      <defs>
        <path id="s4-spend-save-route-shape" d="M830 120H940L1120 210H1270" />
      </defs>
      <use class="s4-spend-save__route s4-spend-save__route--save"
        href="#s4-spend-save-route-shape" />
      <use class="s4-spend-save__route s4-spend-save__route--spend"
        href="#s4-spend-save-route-shape"
        transform="translate(1480 0) scale(-1 1)" />
    </svg>
  `;
  return routes;
}

export default {
  id: '4-05-spend-or-save',
  section: 'ideal-store',
  number: 26,
  title: 'Spend or Save',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-spend-save';
    root.dataset.register = 'mixed';

    const spendChoice = document.createElement('div');
    spendChoice.className = 's4-spend-save__choice s4-spend-save__choice--spend';
    spendChoice.textContent = 'SPEND NOW';
    root.appendChild(spendChoice);

    const saveChoice = document.createElement('div');
    saveChoice.className = 's4-spend-save__choice s4-spend-save__choice--save';
    saveChoice.textContent = 'SAVE FOR LATER';
    root.appendChild(saveChoice);

    const routes = createRoutes();
    root.appendChild(routes);

    const claimStage = document.createElement('div');
    claimStage.className = 's4-spend-save__claim-stage';
    // The shell sits behind the claim and closes around it only on the save
    // road — the carrier appears exactly when the claim needs a body.
    const shell = CarrierShell({ className: 's4-spend-save__shell' });
    claimStage.appendChild(shell.el);
    const claim = ClaimObject({ className: 's4-spend-save__claim', size: 104 });
    claimStage.appendChild(claim.el);
    root.appendChild(claimStage);

    const goods = createGoods();
    root.appendChild(goods.el);

    const spendSupport = createSupport(
      's4-spend-save__support--spend',
      'Redeem the claim now',
      'Exchange closed'
    );
    root.appendChild(spendSupport);

    const saveSupport = createSupport(
      's4-spend-save__support--save',
      'Carry the claim forward',
      'Exchange remains open'
    );
    root.appendChild(saveSupport);

    const finalStatement = document.createElement('div');
    finalStatement.className = 's4-spend-save__final';
    const spendLine = document.createElement('span');
    spendLine.textContent = 'Spending closes the exchange.';
    const saveLine = document.createElement('strong');
    saveLine.textContent = 'Saving keeps it open.';
    finalStatement.append(spendLine, saveLine);
    root.appendChild(finalStatement);

    container.appendChild(root);

    this._refs = {
      root,
      spendChoice,
      saveChoice,
      routes,
      claimStage,
      claim,
      shell,
      goods,
      spendSupport,
      saveSupport,
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

    // 0 the claim, inherited and centered · 1 the two routes · 2 spend ·
    // 3 save · 4 the law. (R7: the old build 3 returned the stage to neutral
    // between the two choices — a build nobody spoke over. It is gone.)
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    const spendActive = n === 2;
    const saveActive = n >= 3;

    refs.spendChoice.dataset.visible = String(n >= 1);
    refs.saveChoice.dataset.visible = String(n >= 1);
    refs.spendChoice.dataset.state = spendActive ? 'active' : saveActive ? 'subdued' : 'neutral';
    refs.saveChoice.dataset.state = saveActive ? 'active' : spendActive ? 'subdued' : 'neutral';
    refs.routes.dataset.visible = String(n >= 1);
    refs.routes.dataset.active = spendActive ? 'spend' : saveActive ? 'save' : 'neutral';
    refs.claimStage.dataset.position = spendActive ? 'spend' : saveActive ? 'save' : 'centre';
    refs.claim.applyState({
      visible: true,
      emphasis: saveActive ? 'focus' : 'neutral',
      redeemed: spendActive
    });
    // Saving is the road where the claim acquires a body.
    refs.shell.applyState({ visible: saveActive, focus: 'none' });
    refs.goods.el.dataset.visible = String(spendActive);
    refs.goods.items.forEach((item) => {
      item.dataset.visible = String(spendActive);
    });
    refs.spendSupport.dataset.visible = String(spendActive);
    refs.saveSupport.dataset.visible = String(saveActive);
    refs.finalStatement.dataset.visible = String(n >= 4);
  },

  notes: `[→] So he is holding this thing. And from here there are only two roads, for him and for every one of us.

[→] He can spend it now. He goes back to the market, hands the claim over, and takes the shoes, the meal, the roof. The claim is redeemed. The exchange he started in that operating theater finally closes.

[→] Or he can save. And saving is not “not spending” — that is the passive description. Saving is a decision: he does not redeem the claim yet. He carries it forward, so that he, or somebody who rightfully receives it from him, can exercise it later. Saving is the decision to defer the final exchange.

[→] Which is the sentence I want you to hold on to, because everything after this depends on it. Spending closes the exchange. Saving keeps it open. And a claim that is being kept open has to be kept somewhere — it needs a body.`
};
