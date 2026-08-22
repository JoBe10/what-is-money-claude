// The reusable section-boundary device (rebuild brief §9.3), debuting at
// R3's Section 3 boundaries: the method line from 1.5 returns — the same
// geometry, labels, and line-language 1.5 left behind — with per-waypoint
// states. `completed` waypoints are settled and visibly done (solid dot at
// low warmth); the `active` waypoint carries the full §9.3 ignition
// standard (the 1.5 Build 6 reference implementation: ~2× marker, accent
// with bloom halo, one slow ~1.2s pulse, label at warm white); `upcoming`
// waypoints stay dim. Future section boundaries (R7) inherit this
// component unchanged.
//
// API: setState({ visible, completed: [1..3], active: n }, { live }) —
// full reconstruction from any state; the ignition pulse is gated to live
// applies (data-live) so back-navigation and direct entry never replay it.
// Reduced motion lands every state instantly (global collapse + the
// pulse’s explicit animation kill in slides.css).

const WAYPOINT_LABELS = [
  'Ask where it came from.',
  'Ask what it must do.',
  'Ask how you would judge anything that tries to be it.'
];

export function WaypointInterstitial() {
  const el = document.createElement('div');
  el.className = 'wayline';
  el.dataset.visible = 'false';

  const line = document.createElement('div');
  line.className = 'wayline__line';
  el.appendChild(line);

  const waypoints = WAYPOINT_LABELS.map((copy, index) => {
    const wp = document.createElement('div');
    wp.className = 'wayline__wp';
    wp.dataset.index = String(index);
    wp.dataset.state = 'upcoming';

    const dot = document.createElement('div');
    dot.className = 'wayline__dot';
    wp.appendChild(dot);

    const text = document.createElement('p');
    text.className = 'wayline__text';
    text.textContent = copy;
    wp.appendChild(text);

    el.appendChild(wp);
    return wp;
  });

  function setState(state = {}, { live = false } = {}) {
    const completed = state.completed || [];
    const active = state.active || 0;
    el.dataset.visible = String(state.visible !== false);
    el.dataset.live = String(Boolean(live));
    el.dataset.hasActive = String(active > 0);
    waypoints.forEach((wp, index) => {
      const n = index + 1;
      wp.dataset.state =
        n === active ? 'active' : completed.includes(n) ? 'completed' : 'upcoming';
    });
  }

  return { el, setState };
}

export default WaypointInterstitial;
