export function FailureRows({ rows, className = '' } = {}) {
  if (!Array.isArray(rows) || rows.length !== 5) {
    throw new Error('FailureRows requires exactly five rows');
  }

  const el = document.createElement('div');
  el.className = `s4-failure-list ${className}`.trim();
  el.setAttribute('role', 'list');

  const rowElements = rows.map(({ number, failure, explanation }) => {
    const row = document.createElement('div');
    row.className = 's4-failure-list__row';
    row.setAttribute('role', 'listitem');

    const numberLabel = document.createElement('span');
    numberLabel.className = 's4-failure-list__number';
    numberLabel.textContent = String(number).padStart(2, '0');

    const failureLabel = document.createElement('strong');
    failureLabel.className = 's4-failure-list__name';
    failureLabel.textContent = failure;

    const explanationLabel = document.createElement('span');
    explanationLabel.className = 's4-failure-list__explanation';
    explanationLabel.textContent = explanation;

    row.append(numberLabel, failureLabel, explanationLabel);
    el.appendChild(row);
    return row;
  });

  function applyState(step = 0) {
    const visibleCount = Math.max(
      0,
      Math.min(rowElements.length, Number(step) || 0)
    );

    el.dataset.step = String(visibleCount);
    rowElements.forEach((row, index) => {
      const visible = index < visibleCount;
      row.dataset.visible = String(visible);
      row.setAttribute('aria-hidden', String(!visible));
    });
  }

  function destroy() {
    el.remove();
  }

  applyState(0);
  return { el, applyState, destroy };
}

export default FailureRows;
