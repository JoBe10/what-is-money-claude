// 4.03 — the simple exchange, on the dark-field register (R7.2 §C1).
//
// The register assignment: DARK-FIELD. This is the one beat in Section 4 where
// sensory concreteness *is* the argument (§9.4.9). Everything after it is
// structure — the claim, the carrier, the test, the properties, the table — and
// structure is drawn. But the section opens on a human being's hour, and an
// hour of a person's life is not a diagram. R7.1 drew it as a node-scene and
// the drawing was correct and cold: two dots and an edge state that an exchange
// occurred, which is precisely what the *next* slide needs to say and not what
// this one does. This one needs the viewer to feel the weight of the thing
// being sold before the argument abstracts it.
//
// So the photograph returns, and the node-scene moves to 4.04 where it belongs
// — the abstraction of the scene the viewer has just been shown, which makes
// the register switch itself a designed moment rather than an inconsistency.
//
// Restaged to §9.4 density, which is what the old photographic slide never was:
// the image holds one half of the frame and the argument stacks in the other,
// one element per build, with the capabilities landing as the single
// accumulating element §9.4.1 names (the frozen script gives the whole sentence
// one [→]) and clearing when the receipt lands. Four builds, four [→], script
// untouched.

import { DarkFieldImage } from '../../components/DarkField.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 4;

const CAPABILITIES = [
  'Specialized skill',
  'Scarce knowledge',
  'Years of training',
  'Professional judgment',
  'Dexterity',
  'Responsibility'
];

export default {
  id: '4-03-simple-exchange',
  section: 'ideal-store',
  number: 24,
  title: 'A Simple Example',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-simple-exchange';
    // The register audit reads this: a dark-field slide may hold a .df-image,
    // a line slide may not.
    root.dataset.register = 'dark-field';

    // DARK-FIELD PENDING — `surgeon` is listed in docs/dark-field-manifest.md
    // §3.1. The restored render failed the grade gate (an operating theater is
    // an environment: corner patches 33.17 against a limit of 6), so the beat
    // stands on its grammar mark until the regenerated render lands in
    // assets/dark-field/. Nothing else on this slide changes when it does.
    const portrait = DarkFieldImage({
      name: 'surgeon',
      width: 620,
      height: 827,
      alt: 'A surgeon at work, lit by a single warm light',
      className: 's4-simple-exchange__portrait'
    });
    root.appendChild(portrait.el);

    // The one bright statement: what the hour actually was.
    const headline = document.createElement('p');
    headline.className = 's4-simple-exchange__headline';
    const lead = document.createElement('span');
    lead.className = 's4-simple-exchange__lead';
    lead.textContent = '1 HOUR OF ';
    // The word's trailing space belongs to the word, not to what follows it.
    // The emphasis collapses to zero width before it ignites, and with the
    // space on the *tail* the plain frame read "1 HOUR OF  SURGERY" — two
    // spaces, because the hidden span sits between two text nodes and stops
    // the browser collapsing them. Shipped that way since R7.1.
    const emphasis = document.createElement('span');
    emphasis.className = 's4-simple-exchange__emphasis';
    emphasis.textContent = 'SPECIALIZED ';
    const tail = document.createElement('span');
    tail.className = 's4-simple-exchange__tail';
    tail.textContent = 'SURGERY';
    headline.append(lead, emphasis, tail);
    root.appendChild(headline);

    // What that hour contained. One accumulating element (§9.4.1), held at
    // label scale so six lines read as an inventory rather than six statements.
    const capabilityList = document.createElement('div');
    capabilityList.className = 's4-simple-exchange__capabilities';
    const capabilityEls = CAPABILITIES.map((text, index) => {
      const label = document.createElement('p');
      label.className = 's4-simple-exchange__capability';
      label.style.setProperty('--capability-index', String(index));
      label.textContent = text;
      capabilityList.appendChild(label);
      return label;
    });
    root.appendChild(capabilityList);

    // The receipt. Orange and display scale because it is argument, not chrome —
    // and it lands in the space the capabilities vacate, so the frame never
    // carries both.
    const amount = document.createElement('p');
    amount.className = 's4-exchange-receipt s4-simple-exchange__amount';
    amount.textContent = '$400';
    root.appendChild(amount);

    const question = document.createElement('p');
    question.className = 's4-simple-exchange__question';
    question.textContent = 'What did he actually receive?';
    root.appendChild(question);

    container.appendChild(root);

    this._refs = {
      root,
      portrait,
      headline,
      emphasis,
      capabilityEls,
      amount,
      question,
      appliedStep: 0,
      reconstruct: false
    };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    markReconstruct(this._refs, ctx);
  },

  onExit() {
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    // 0 the surgeon and the hour · 1 the hour is named as specialized · 2 what
    // that hour contained · 3 the receipt · 4 the question the rest of the
    // section answers.
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    refs.portrait.el.dataset.visible = 'true';

    refs.headline.dataset.visible = 'true';
    refs.headline.dataset.state = n >= 1 ? 'specialized' : 'plain';
    refs.headline.dataset.quiet = String(n >= 4);

    // §9.4.1: when the receipt lands, the capabilities clear rather than
    // linger. They have done their work, and two stacked blocks of text beside
    // one photograph is exactly the density this phase exists to remove.
    refs.capabilityEls.forEach((label) => {
      label.dataset.visible = String(n === 2);
    });

    refs.amount.dataset.visible = String(n >= 3);
    refs.amount.dataset.quiet = String(n >= 4);
    refs.question.dataset.visible = String(n >= 4);
  },

  notes: `A surgeon. One hour of surgery.

[→] And what the market paid for there was not the passage of an hour. Nobody has ever paid anybody for an hour. It paid for the specialized service delivered inside it — which is the guard I planted right at the start of the evening: the market doesn’t price your hours, it prices what you make with them.

[→] A rare combination of things, in fact: specialized skill, scarce knowledge, years of training, professional judgment, physical dexterity — and responsibility, because there is a person on the table.

[→] And for that hour, he receives four hundred dollars.

[→] So now look at what he actually received. Because I don’t think the answer is “four hundred dollars,” and the whole rest of this section turns on why. Start with what he did *not* receive.`
};
