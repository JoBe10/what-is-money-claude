// 1.5 — the promise and the map. The method question, then three waypoints
// along a single faint horizontal line — the quiet visual ancestor of
// Section 2's Evolution Rail: same line-language, not the rail itself.
// This is method, not an agenda; the waypoints are never numbered or labeled
// with section names.
//
// Build 6 (R2.1 §B): the first waypoint ignites — the first orange in the
// presentation. This is the reference implementation of the waypoint
// ignition standard (rebuild brief §9.3): the active marker scales to ~2×
// the inactive markers, full accent with a soft bloom halo, a single slow
// ignition pulse (~1.2s) as it lights; its label rises to warm white; the
// other two labels and markers dim a step further. Reduced motion lands the
// end state instantly. The pulse is gated to the live advance (data-live),
// so reconstruction and back-navigation never replay it.

const WAYPOINTS = [
  'Ask where it came from.',
  'Ask what it must do.',
  'Ask how you would judge anything that tries to be it.'
];

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '1-05-the-promise',
  section: 'question',
  number: 5,
  title: 'The Promise',
  totalBuildSteps: 6,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's1q s1q-promise';

    const question = document.createElement('p');
    question.className = 's1q-promise__question';
    question.textContent = 'How do you understand anything mysterious?';
    root.appendChild(question);

    const rail = document.createElement('div');
    rail.className = 's1q-promise__rail';

    const railLine = document.createElement('div');
    railLine.className = 's1q-promise__railline';
    rail.appendChild(railLine);

    const waypoints = WAYPOINTS.map((copy, index) => {
      const wp = document.createElement('div');
      wp.className = 's1q-promise__wp';
      wp.dataset.index = String(index);

      const dot = document.createElement('div');
      dot.className = 's1q-promise__dot';
      wp.appendChild(dot);

      const text = document.createElement('p');
      text.className = 's1q-promise__wptext';
      text.textContent = copy;
      wp.appendChild(text);

      rail.appendChild(wp);
      return wp;
    });

    root.appendChild(rail);
    container.appendChild(root);

    this._refs = {
      root,
      question,
      railLine,
      waypoints,
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

    const n = Math.max(0, Math.min(6, Number(step) || 0));
    const live = !refs.reconstruct && n === refs.appliedStep + 1;
    refs.reconstruct = false;
    refs.appliedStep = n;
    refs.root.dataset.step = String(n);
    refs.root.dataset.live = String(live);

    setVisible(refs.question, n >= 1);
    // The line enters with the first waypoint; waypoints land left to right.
    setVisible(refs.railLine, n >= 2);
    refs.waypoints.forEach((wp, index) => setVisible(wp, n >= index + 2));
    // Build 5: the waypoints settle — the question yields the frame and the
    // completed line holds. No closing text on screen; the covenant is spoken.
    // Build 6: the first waypoint ignites — pure CSS keyed on data-step (the
    // ignition pulse additionally on data-live, so it plays exactly once).
  },

  notes: `[→] So how do we answer a question like this? The same way you’d come to understand anything mysterious.

[→] Ask where it came from.

[→] Ask what it must do.

[→] Ask how you would judge anything that tries to be it.

[→] That’s the whole plan, and it’s the whole inquiry. First, the history: where money actually comes from — because its origin tells you what it is. Then, the job: what a money has to do, and in what order. And then — the part I think you’ll remember — we build a way to judge *any* candidate for the role. Including the money in your bank account. Including the ones in the news.

One promise before we start. By the end you’ll have a framework — not my conclusions, a framework you can check for yourself. Nothing here is financial advice; it’s an education in a thing you were never taught. And you shouldn’t take anyone’s word on money anyway. By the end, you’ll see why that’s rather the point.

[→] So — first question. Where does money come from? Not who prints it, not whose face is on it — where the *phenomenon* comes from. Because if you want to know what something is, the single most revealing thing you can do is watch it be born. So let’s take money away — completely — and watch what happens.`
};
