// The periodic elimination of 2.5 — a stylized periodic table (symbol-only,
// monochrome) run through the salability competition in staged waves:
// gases drift off, the reactive and corroding metals dim in a corrosion
// sweep, the radioactive elements pulse out, the merely impractical settle
// dim — and Au and Ag remain lit, alone.
//
// DOM cells with CSS-driven exits: every wave animates opacity/transform
// only, so 118 cells hold 60fps trivially. Each wave is one visual gesture,
// auto-timed internally via per-cell delays (the pacing rule reserves
// auto-timing for exactly this). `applyState(step, { live })` reconstructs
// any step from scratch: `live` lets the current wave’s transitions play;
// otherwise the data-snap attribute lands every cell on its exact end state
// instantly. Reduced motion always snaps.
//
// The element classes are a stylization, not a chemistry lecture: each
// element carries the fate its family earns in the script’s five cuts.
// Elimination steps: 0 = all lit · 1 = gases gone · 2 = + corroded ·
// 3 = + radioactive gone · 4 = + the shapeless settled · 5 = + the noble
// metals the furnace could not reach, survivors alone.
//
// R4.1 (ruling R-03): step 4 used to carry both cuts at once, which let the
// slide say chemistry alone leaves silver and gold. It does not — chemistry
// leaves the noble family, and it is melting point (plus, for two of them,
// not having been discovered yet) that takes the rest. Splitting the wave
// makes the audience *see* the noble metals survive chemistry and then lose
// to the furnace, which is also what slide 3.5 needs to be true about
// palladium.
//
// Layout: standard 18-column periodic table; the lanthanide and actinide
// rows sit below with a visual gap (rows 8 and 9, columns 4–17).
// Fates: g = gas · r = reactive/corroding · x = radioactive · i = will not
// hold a shape (pours, or no fire of the age could work it) · n = noble but
// unmeltable in a pre-modern furnace · s = survivor.

const ELEMENTS = [
  ['H', 1, 1, 'g'], ['He', 18, 1, 'g'],
  ['Li', 1, 2, 'r'], ['Be', 2, 2, 'r'], ['B', 13, 2, 'r'], ['C', 14, 2, 'r'],
  ['N', 15, 2, 'g'], ['O', 16, 2, 'g'], ['F', 17, 2, 'g'], ['Ne', 18, 2, 'g'],
  ['Na', 1, 3, 'r'], ['Mg', 2, 3, 'r'], ['Al', 13, 3, 'r'], ['Si', 14, 3, 'r'],
  ['P', 15, 3, 'r'], ['S', 16, 3, 'r'], ['Cl', 17, 3, 'g'], ['Ar', 18, 3, 'g'],
  ['K', 1, 4, 'r'], ['Ca', 2, 4, 'r'], ['Sc', 3, 4, 'r'], ['Ti', 4, 4, 'r'],
  ['V', 5, 4, 'r'], ['Cr', 6, 4, 'r'], ['Mn', 7, 4, 'r'], ['Fe', 8, 4, 'r'],
  ['Co', 9, 4, 'r'], ['Ni', 10, 4, 'r'], ['Cu', 11, 4, 'r'], ['Zn', 12, 4, 'r'],
  ['Ga', 13, 4, 'r'], ['Ge', 14, 4, 'r'], ['As', 15, 4, 'r'], ['Se', 16, 4, 'r'],
  ['Br', 17, 4, 'r'], ['Kr', 18, 4, 'g'],
  ['Rb', 1, 5, 'r'], ['Sr', 2, 5, 'r'], ['Y', 3, 5, 'r'], ['Zr', 4, 5, 'r'],
  ['Nb', 5, 5, 'r'], ['Mo', 6, 5, 'r'], ['Tc', 7, 5, 'x'], ['Ru', 8, 5, 'n'],
  ['Rh', 9, 5, 'n'], ['Pd', 10, 5, 'n'], ['Ag', 11, 5, 's'], ['Cd', 12, 5, 'r'],
  ['In', 13, 5, 'r'], ['Sn', 14, 5, 'r'], ['Sb', 15, 5, 'r'], ['Te', 16, 5, 'r'],
  ['I', 17, 5, 'r'], ['Xe', 18, 5, 'g'],
  ['Cs', 1, 6, 'r'], ['Ba', 2, 6, 'r'], ['La', 3, 6, 'r'], ['Hf', 4, 6, 'r'],
  ['Ta', 5, 6, 'r'], ['W', 6, 6, 'i'], ['Re', 7, 6, 'i'], ['Os', 8, 6, 'n'],
  ['Ir', 9, 6, 'n'], ['Pt', 10, 6, 'n'], ['Au', 11, 6, 's'], ['Hg', 12, 6, 'i'],
  ['Tl', 13, 6, 'r'], ['Pb', 14, 6, 'r'], ['Bi', 15, 6, 'r'], ['Po', 16, 6, 'x'],
  ['At', 17, 6, 'x'], ['Rn', 18, 6, 'g'],
  ['Fr', 1, 7, 'x'], ['Ra', 2, 7, 'x'], ['Ac', 3, 7, 'x'], ['Rf', 4, 7, 'x'],
  ['Db', 5, 7, 'x'], ['Sg', 6, 7, 'x'], ['Bh', 7, 7, 'x'], ['Hs', 8, 7, 'x'],
  ['Mt', 9, 7, 'x'], ['Ds', 10, 7, 'x'], ['Rg', 11, 7, 'x'], ['Cn', 12, 7, 'x'],
  ['Nh', 13, 7, 'x'], ['Fl', 14, 7, 'x'], ['Mc', 15, 7, 'x'], ['Lv', 16, 7, 'x'],
  ['Ts', 17, 7, 'x'], ['Og', 18, 7, 'x'],
  ['Ce', 4, 8, 'r'], ['Pr', 5, 8, 'r'], ['Nd', 6, 8, 'r'], ['Pm', 7, 8, 'x'],
  ['Sm', 8, 8, 'r'], ['Eu', 9, 8, 'r'], ['Gd', 10, 8, 'r'], ['Tb', 11, 8, 'r'],
  ['Dy', 12, 8, 'r'], ['Ho', 13, 8, 'r'], ['Er', 14, 8, 'r'], ['Tm', 15, 8, 'r'],
  ['Yb', 16, 8, 'r'], ['Lu', 17, 8, 'r'],
  ['Th', 4, 9, 'x'], ['Pa', 5, 9, 'x'], ['U', 6, 9, 'x'], ['Np', 7, 9, 'x'],
  ['Pu', 8, 9, 'x'], ['Am', 9, 9, 'x'], ['Cm', 10, 9, 'x'], ['Bk', 11, 9, 'x'],
  ['Cf', 12, 9, 'x'], ['Es', 13, 9, 'x'], ['Fm', 14, 9, 'x'], ['Md', 15, 9, 'x'],
  ['No', 16, 9, 'x'], ['Lr', 17, 9, 'x']
];

// Which fates have resolved at each elimination step.
const FATE_AT_STEP = {
  g: 1,  // gases drift off
  r: 2,  // corrosion wave
  x: 3,  // radioactive pulse-out
  i: 4,  // the shapeless settle dim: mercury pours, tungsten and rhenium
         // cannot be worked at all
  n: 5   // the furnace wave: the noble metals that melt above a pre-modern
         // fire (Ru, Rh, Pd, Os, Ir, Pt) settle out, leaving Ag and Au
};

const PITCH = 62;
const F_BLOCK_GAP = 26;

export function ElementGrid() {
  const el = document.createElement('div');
  el.className = 's2o-elements';
  el.style.width = `${18 * PITCH}px`;
  el.style.height = `${9 * PITCH + F_BLOCK_GAP}px`;

  const cells = ELEMENTS.map(([symbol, col, row, fate]) => {
    const cell = document.createElement('div');
    cell.className = 's2o-elements__cell';
    cell.dataset.fate = fate;
    cell.textContent = symbol;
    cell.style.left = `${(col - 1) * PITCH}px`;
    cell.style.top = `${(row - 1) * PITCH + (row >= 8 ? F_BLOCK_GAP : 0)}px`;
    // Per-cell organic variation for the exit gestures: drift direction and
    // spin for the gases, stagger delays for every wave.
    cell.style.setProperty('--dx', `${((Math.random() - 0.5) * 60).toFixed(1)}px`);
    cell.style.setProperty('--rot', `${((Math.random() - 0.5) * 34).toFixed(1)}deg`);
    cell.style.setProperty('--d', `${Math.round(Math.random() * 800)}ms`);
    // The corrosion wave sweeps diagonally across the table.
    cell.style.setProperty('--sweep', `${Math.round((col + row) * 46)}ms`);
    el.appendChild(cell);
    return cell;
  });

  // Full-state reconstruction. step 0..5; `live` lets the newly-resolved
  // wave’s transitions play, everything already resolved snaps regardless.
  function applyState(step, { live = false } = {}) {
    const n = Math.max(0, Math.min(5, Number(step) || 0));
    const snap = !live ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (snap) el.dataset.snap = 'true';

    el.dataset.step = String(n);
    // The radioactive pulse keyframes are gated to the live wave only —
    // reconstruction must land the end state without a replay.
    el.dataset.stepLive = snap ? '' : String(n);
    cells.forEach((cell) => {
      const resolved = n >= FATE_AT_STEP[cell.dataset.fate];
      cell.dataset.state = cell.dataset.fate === 's'
        ? (n >= 5 ? 'alone' : 'lit')
        : (resolved ? 'out' : 'lit');
    });

    if (snap) {
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        delete el.dataset.snap;
      }));
    }
  }

  function destroy() {
    el.remove();
  }

  return { el, applyState, destroy };
}

export default ElementGrid;
