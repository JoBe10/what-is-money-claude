// The quiet kicker — the Sections 1–3 register, codified at R7.1 (§9.4.5).
//
// Small, widely tracked, low-warmth, and carrying no rule line: a label that
// names a frame without announcing itself. This is what survives of the
// retired Section 4 header convention (orange 26px caption + 56px accent rule),
// which put a persistent chrome band across twenty-two slides and made the
// accent decorative — the one thing §9.4.6 says orange may never be.
//
// Kickers are rare and earned. Section 4 keeps exactly two: the comparison
// table — the one frame left that must be named, since R7.4 deleted the
// falsifiability beat that was the other. 4.23's
// kicker is frozen and still renders the retired treatment by design.

export function QuietKicker(text, { className = '' } = {}) {
  const el = document.createElement('p');
  el.className = `quiet-kicker ${className}`.trim();
  el.textContent = text;
  return el;
}

export default QuietKicker;
