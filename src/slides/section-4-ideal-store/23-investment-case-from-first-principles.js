import { KickerLabel } from '../../components/KickerLabel.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 2;

const SUMMARY_LINES = [
  'Money is a claim on value.',
  'A store of value carries that claim through time.',
  'The ten properties let us compare the available carriers.',
  'The key question is which carrier wins the next unit of savings.'
];

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '4-23-investment-case-from-first-principles',
  section: 'ideal-store',
  number: 45,
  title: 'The Case for Bitcoin from First Principles',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-investment-case';

    const kicker = KickerLabel('THE CASE FOR BITCOIN — FROM FIRST PRINCIPLES');
    kicker.classList.add('s4-investment-case__kicker');
    root.appendChild(kicker);

    const summary = document.createElement('div');
    summary.className = 's4-investment-case__summary';
    const summaryLines = SUMMARY_LINES.map((copy, index) => {
      const line = document.createElement('p');
      line.className = 's4-investment-case__summary-line';
      line.style.setProperty('--summary-index', String(index));
      line.textContent = copy;
      summary.appendChild(line);
      return line;
    });
    root.appendChild(summary);

    const conclusion = document.createElement('p');
    conclusion.className = 's4-investment-case__conclusion';
    conclusion.append('Bitcoin does not need to replace everything.');
    conclusion.append(document.createElement('br'));
    conclusion.append('It only needs to become the ');
    const preferred = document.createElement('strong');
    preferred.textContent = 'preferred place';
    conclusion.append(preferred);
    conclusion.append(document.createElement('br'));
    conclusion.append('to store the ');
    const nextUnit = document.createElement('strong');
    nextUnit.textContent = 'next unit of value';
    conclusion.append(nextUnit, '.');
    root.appendChild(conclusion);

    container.appendChild(root);

    // The kicker already states "the case for Bitcoin — from first principles",
    // so the final frame carries the conclusion and nothing else.
    this._refs = {
      root,
      summary,
      summaryLines,
      conclusion,
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

    // The recap is one spoken paragraph — the loop, closed — so its four lines
    // are one build, sequenced inside a single gesture rather than advanced
    // separately. The final frame is unchanged and frozen: the kicker and the
    // conclusion, alone.
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    const summaryVisible = n === 1;
    refs.summary.dataset.visible = String(summaryVisible);
    refs.summary.setAttribute('aria-hidden', String(!summaryVisible));
    refs.summaryLines.forEach((line) => {
      setVisible(line, summaryVisible);
    });
    setVisible(refs.conclusion, n >= MAX_STEP);
  },

  notes: `[→] So let’s close the loop we opened an hour ago. Money is an earned, transferable claim on value — the open half of every exchange your working life completes. A store of value is the carrier that must bring that claim through time intact. The future is unknowable, so we refused to predict it — we inverted, derived the ten ways a carrier fails, and turned each failure into a required property. Then we held five candidates against all ten, in the open, scores you can check.

[→] What emerged is not a promise. It’s a structure. One candidate has a supply no issuer can expand, custody no institution has to grant, verification anyone can run — and seventeen years against a hundred-year question, scored honestly at two out of five. The case is not that the price will behave. Price should be free to move. The monetary rules should be hard to move. That’s the whole case, in eleven words — and it was built from first principles, in front of you.`
};
