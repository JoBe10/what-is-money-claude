// 4.04 — the unfinished exchange (R7.1 §C1, completed at R7.2 §C2).
//
// The register assignment: MIXED, and the mix is the beat. The mechanism is
// line-led — two nodes, one edge, the claim traveling the lane back — because
// what this slide argues is a *structure*: an exchange with one half completed
// and the other half open. The three goods are dark-field renders at display
// scale, because what they argue is a *sensation*: these are the actual things
// a life's savings is for, and the whole force of "he has not received them"
// depends on the viewer wanting them. No render enters the diagram; the
// diagram sits in the upper band and the goods in the lower one, and the empty
// space between them is the open half of the exchange, drawn by not drawing a
// line across it.
//
// The node-scene arrives here now rather than at 4.03. 4.03 photographs the
// hour; this slide abstracts it — which makes the register switch between the
// two slides the argument's own first move, from the thing to the structure of
// the thing.
//
// Two R7.1 states are replaced rather than adjusted. The goods were a column of
// glyphs pinned at the frame's right edge, reading as decoration rather than as
// the objects the argument is about; and at b2 the claim disc sat at the
// surgeon's rest slot directly on top of the definition, so the deck's central
// sentence rendered as "AN EA●ED, TRANSFERABLE CLAIM ON VALUE". Both are gone:
// the goods have their own band and the definition has its own lane, below the
// scene while the scene exists and rising into the vacated middle when it goes.
//
// Four builds, four [→], script untouched.

import { ClaimObject } from '../../components/section-4/ClaimObject.js';
import { DarkFieldImage } from '../../components/DarkField.js';
import { buildExchange, restSlot, travelPath, goodToken } from './_exchangeScene.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 4;

// The order the script names them in: "No shoes, no steak, no wine."
const WANTED = [
  ['shoe', 'A shoe'],
  ['meal', 'A cooked meal'],
  ['wine', 'A glass of wine']
];

export default {
  id: '4-04-unfinished-exchange',
  section: 'ideal-store',
  number: 25,
  title: 'The Unfinished Exchange',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-exchange s4-unfinished';
    root.dataset.register = 'mixed';

    const scene = buildExchange(root);

    // The service, already delivered, resting at the patient's end: the
    // abstraction of the hour 4.03 photographed. It establishes the scene at
    // b0 instead of the slide inheriting a diagram the previous slide no
    // longer draws.
    const service = goodToken('operation', 104);
    service.classList.add('s4-unfinished__service');
    const patientSlot = restSlot('patient');
    service.style.left = `${patientSlot.x}px`;
    service.style.top = `${patientSlot.y}px`;
    root.appendChild(service);

    const amount = document.createElement('p');
    amount.className = 's4-exchange-receipt s4-unfinished__amount';
    amount.textContent = '$400';
    root.appendChild(amount);

    // What he did not receive — the dark-field band. `meal` is currently a
    // DARK-FIELD PENDING stub (docs/dark-field-manifest.md §3.2): the restored
    // steak render sits on a lit stone surface that fills the frame, which the
    // grade gate rejects as an environment.
    const wanted = document.createElement('div');
    wanted.className = 's4-unfinished__wanted';
    const wantedEls = WANTED.map(([name, alt], index) => {
      const item = DarkFieldImage({
        name,
        width: 300,
        height: 225,
        alt,
        className: 's4-unfinished__want'
      });
      item.el.style.setProperty('--want-index', String(index));
      wanted.appendChild(item.el);
      return item.el;
    });
    root.appendChild(wanted);

    const question = document.createElement('p');
    question.className = 's4-unfinished__question';
    question.textContent = 'What does the $400 actually represent?';
    root.appendChild(question);

    const headline = document.createElement('p');
    headline.className = 's4-unfinished__headline';
    // Two lines, stacked, at display scale (R7.4 §F.5): this is the deck's
    // central sentence and it was set at caption weight under the scene.
    const headlineLead = document.createElement('span');
    headlineLead.textContent = 'AN EARNED, TRANSFERABLE';
    const headlineClaim = document.createElement('strong');
    headlineClaim.textContent = 'CLAIM ON VALUE';
    headline.append(headlineLead, headlineClaim);
    root.appendChild(headline);

    // The claim rides the lane back to the surgeon, then is released to stage
    // center when the scene withdraws.
    const claimStage = document.createElement('div');
    claimStage.className = 's4-unfinished__claim-stage';
    claimStage.style.setProperty('--travel', `path('${travelPath('back')}')`);
    const claim = ClaimObject({ className: 's4-unfinished__claim', size: 116 });
    claimStage.appendChild(claim.el);
    root.appendChild(claimStage);

    container.appendChild(root);

    this._refs = {
      root,
      scene,
      service,
      wanted,
      wantedEls,
      amount,
      question,
      headline,
      claimStage,
      claim,
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
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    // 0 the exchange, abstracted from the hour just shown · 1 what he did not
    // receive, and the question · 2 the definition, over the scene that
    // produced it · 3 the scene goes and the claim does not · 4 the claim,
    // released, holding the exchange open.
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    // The scene withdraws once the claim is no longer tied to the patient —
    // the argument of build 3.
    const sceneGone = n >= 3;
    refs.scene.svg.dataset.state = sceneGone ? 'gone' : 'present';
    Object.values(refs.scene.nodes).forEach((node) => {
      node.dataset.state = sceneGone ? 'gone' : 'present';
    });
    refs.service.dataset.visible = String(!sceneGone);

    refs.wanted.dataset.visible = String(n >= 1 && n < 3);
    refs.wantedEls.forEach((el) => {
      el.dataset.visible = String(n >= 1 && n < 3);
    });

    refs.amount.dataset.visible = String(n < 3);
    refs.amount.dataset.quiet = String(n >= 2);
    refs.question.dataset.visible = String(n === 1);

    refs.headline.dataset.visible = String(n >= 2);
    // The statement rises into the middle of the frame as the scene leaves it —
    // the one move on this slide, and it is the build where everything else
    // goes.
    refs.headline.dataset.lane = sceneGone ? 'mid' : 'low';
    refs.headline.dataset.quiet = String(n >= MAX_STEP);

    refs.claimStage.dataset.position = sceneGone ? 'released' : 'held';
    refs.claim.applyState({
      visible: n >= 2,
      emphasis: n >= 2 ? 'focus' : 'neutral'
    });
    refs.claim.setSize(n >= 4 ? 176 : 116);
  },

  notes: `[→] He has not received the final goods or services he actually wants. No shoes, no steak, no wine, no housing — if he’d received those directly, that would have been barter. Instead, he receives money. And this is the moment to pay a debt — because a few minutes ago I asked you to hold a question: every layer is a claim on the layer below, so what is the bottom layer a claim on? Here is the answer.

[→] Money is an earned, transferable claim on value. The surgeon delivered value — and what he holds now is the *other half of that exchange*, still open, still pending. He has completed his side. He has not yet taken the four hundred dollars of goods and services he’ll ultimately want. The exchange is still open — and money is the thing that holds it open.

[→] And because money is standardized and widely accepted, that claim is no longer tied to the patient. He can present it to anyone, anywhere, who has something to offer. Notice exactly what kind of claim that is — because it’s where the bottom layer differs from every layer above it. Not a *legal* claim on anyone in particular. A *social* claim on everyone in general — enforced not by courts, but by acceptance. And now you can see 1971 properly: cancelling redemption didn’t end money’s claim-nature. It removed the legal anchor from underneath the social one — and the claim kept standing, on acceptance alone.

[→] So money turns a person-specific exchange into a transferable claim on the wider market. That’s what those eighty thousand hours become. That’s what you’ve been holding your whole life without a name for it. The exchange is still open.`
};
