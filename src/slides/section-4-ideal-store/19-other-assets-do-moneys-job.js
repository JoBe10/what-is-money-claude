import { ComparisonAssetHeader } from '../../components/section-4/ComparisonAssetHeader.js';
import { COMPARISON_ASSETS } from './_comparison-data.js';
import { beginBuild, clampStep, markReconstruct } from '../_snapFrame.js';

const MAX_STEP = 5;

const ROLE_DEFINITIONS = [
  {
    id: 'property',
    statement: 'REAL ESTATE SHELTERS.',
    functionLabel: 'SHELTERS'
  },
  {
    id: 'shares',
    statement: 'COMPANIES PRODUCE.',
    functionLabel: 'PRODUCES'
  },
  {
    id: 'gold',
    statement: 'GOLD HAS LONG CARRIED MONETARY VALUE.',
    functionLabel: 'MONETARY COMMODITY'
  },
  {
    id: 'bitcoin',
    statement: "BITCOIN’S UTILITY IS MONETARY.",
    functionLabel: 'MONETARY UTILITY',
    emphasis: 'MONETARY'
  }
];

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

function getAsset(id) {
  const asset = COMPARISON_ASSETS.find((candidate) => candidate.id === id);
  if (!asset) throw new Error(`Unknown comparison asset: ${id}`);
  return asset;
}

function createStatement(text, emphasis) {
  const statement = document.createElement('p');
  statement.className = 's4-roles__statement';
  const line = document.createElement('span');

  if (!emphasis) {
    line.textContent = text;
    statement.appendChild(line);
    return statement;
  }

  const start = text.indexOf(emphasis);
  line.append(text.slice(0, start));
  const strong = document.createElement('strong');
  strong.textContent = emphasis;
  line.append(strong, text.slice(start + emphasis.length));
  statement.appendChild(line);
  return statement;
}

function createRole(definition) {
  const asset = getAsset(definition.id);
  const role = document.createElement('div');
  role.className = `s4-roles__role s4-roles__role--${definition.id}`;
  role.dataset.visible = 'false';

  const statement = createStatement(definition.statement, definition.emphasis);
  role.appendChild(statement);

  const view = ComparisonAssetHeader({ asset });
  view.classList.add('s4-roles__asset');
  role.appendChild(view);

  const functionLabel = document.createElement('p');
  functionLabel.className = 's4-roles__function';
  functionLabel.textContent = definition.functionLabel;
  role.appendChild(functionLabel);

  return role;
}

export default {
  id: '4-19-other-assets-do-moneys-job',
  section: 'ideal-store',
  number: 40,
  title: "When Other Assets Do Money’s Job",
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's4-opening s4-roles';
    // Display-scale candidates render on the dark-field register (§9.4.9, R7.4 §B).
    root.dataset.register = 'mixed';

    const roles = ROLE_DEFINITIONS.map((definition) => {
      const role = createRole(definition);
      root.appendChild(role);
      return role;
    });

    const finalLine = document.createElement('p');
    finalLine.className = 's4-roles__final';
    finalLine.textContent = 'It competes for the monetary premium attached elsewhere.';
    root.appendChild(finalLine);

    container.appendChild(root);

    this._refs = {
      root,
      roles,
      finalLine,
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

    // Each of the four roles is its own spoken sentence, so each gets its own
    // advance. (Real estate used to stand at build 0, unspoken.)
    const n = clampStep(step, MAX_STEP);
    beginBuild(refs, n);

    refs.roles.forEach((role, index) => setVisible(role, n >= index + 1));
    setVisible(refs.finalLine, n >= MAX_STEP);
  },

  notes: `[→] Real estate shelters people. That is what it is for, and it is very good at it.

[→] Companies produce. They make things, employ people, earn profits, and sometimes hand some of them back.

[→] Gold has carried monetary value for thousands of years, and it also sits in jewelry and in industry. But when the dominant money is not trusted to preserve purchasing power, all three of these are asked to do a second job on the side: absorb the savings demand the money is failing to satisfy.

[→] Bitcoin is different, and I want to state the difference precisely rather than flatteringly. It has no separate productive, consumptive or aesthetic function. Its utility is monetary — to carry and transfer value under rules that cannot be changed unilaterally. Now, people usually raise yield at exactly this point, so let me take it head-on. Yield is compensation — for capital, liquidity, time, balance-sheet capacity, insurance, or accepted risk — and it always has a source. The absence of native yield is not the advantage. The absence of a *required yield-producing counterparty* is: no tenant, no borrower, no management team has to succeed for the claim to stay whole.

[→] And that cuts both ways, which I am not going to hide. An asset with no non-monetary use also has no floor of non-monetary demand. Gold’s jewelry and industrial demand is a cushion Bitcoin does not have. Bitcoin’s value rests entirely on its monetary function — and that is the source of both its strength and its risk. So it is not another productive asset with a monetary premium attached. It is a monetary asset competing for the premium attached to everything else. Which reframes the question. It is not whether Bitcoin eliminates a building’s reason to exist. It is how much monetary demand these assets keep absorbing.`
};
