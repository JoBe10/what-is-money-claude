// 1.3 — the question nobody can answer, and the title as its punchline.
// Build 1 is a held frame designed for recorded silence: the question, then
// nothing, until the presenter advances. Each fact is its own build (the
// pacing rule: one advance per spoken beat), so the presenter speaks each
// line over its appearance.

const FACTS = [
  'It is one side of nearly every trade on Earth.',
  'It is the most used good in human civilization.',
  'There is not one hour of school on what it actually is.'
];

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '1-03-what-is-money',
  section: 'question',
  number: 3,
  title: 'What Is Money?',
  totalBuildSteps: 5,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's1q s1q-what';

    // The token, smaller — the residue of 1.2.
    const token = document.createElement('div');
    token.className = 'luminous-disc s1q-token s1q-token--small s1q-what__token';
    root.appendChild(token);

    const question = document.createElement('p');
    question.className = 's1q-what__question';
    question.textContent = 'Without saying what it does — can you say what money is?';
    root.appendChild(question);

    const facts = document.createElement('div');
    facts.className = 's1q-what__facts';
    const factLines = FACTS.map((copy) => {
      const fact = document.createElement('p');
      fact.className = 's1q-what__fact';
      fact.textContent = copy;
      facts.appendChild(fact);
      return fact;
    });
    root.appendChild(facts);

    const title = document.createElement('h1');
    title.className = 's1q-what__title';
    title.textContent = 'WHAT IS MONEY?';
    root.appendChild(title);

    container.appendChild(root);

    this._refs = {
      root,
      token,
      question,
      factLines,
      title,
      appliedStep: 0,
      reconstruct: false
    };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    if (this._refs && (ctx?.targetBuildStep || 0) > 0) this._refs.reconstruct = true;
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

    const n = Math.max(0, Math.min(5, Number(step) || 0));
    const live = !refs.reconstruct && n === refs.appliedStep + 1;
    refs.reconstruct = false;
    refs.appliedStep = n;
    refs.root.dataset.step = String(n);
    refs.root.dataset.live = String(live);

    // Builds 2–4 land the facts one per advance. The title frame (build 5)
    // clears everything else to black first; the token is cut from the final
    // frame so nothing competes with the title.
    setVisible(refs.token, n <= 4);
    setVisible(refs.question, n >= 1 && n <= 4);
    refs.factLines.forEach((fact, index) => setVisible(fact, n >= index + 2 && n <= 4));
    setVisible(refs.title, n >= 5);
  },

  notes: `[→] Without saying what it *does* — can you say what money *is*?

*[hold — let the silence sit]*

Everyone knows what it does. It buys groceries. It pays rent. But that’s not what I asked. I asked what it *is*. And if you’re drawing a blank right now, you’re in good company — almost everyone does.

Which is strange. Because think about what this thing is:

[→] It is one side of nearly every trade on Earth. Almost every exchange between human beings, anywhere, has money on one side of it.

[→] It is the most used good in human civilization. Used more than any tool, any machine, any technology we have ever built.

[→] And there is not one hour of school — anywhere — on what it actually is. We are taught the parts of a cell. We are taught the capitals of countries. The thing every one of us trades our life’s hours for? Not one lesson.

[→] So that is the question. What is money?`
};
