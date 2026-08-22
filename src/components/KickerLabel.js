// Uppercase Bitcoin-orange caption with a short leading rule.
// Used at the top of most slides. Returns a DOM element.

export function KickerLabel(text, { className = '' } = {}) {
  const el = document.createElement('div');
  el.className = `kicker ${className}`.trim();
  el.textContent = text;
  return el;
}

export default KickerLabel;
