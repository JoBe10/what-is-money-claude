export function DotRating({ score } = {}) {
  if (!Number.isInteger(score) || score < 1 || score > 5) {
    throw new RangeError(`DotRating score must be an integer from 1 to 5; received ${score}`);
  }

  const root = document.createElement('div');
  root.className = 's4-dot-rating';
  root.dataset.score = String(score);
  root.dataset.revealed = 'false';
  root.setAttribute('role', 'img');
  root.setAttribute('aria-label', `${score} out of 5`);

  for (let value = 1; value <= 5; value += 1) {
    const dot = document.createElement('span');
    dot.className = 's4-dot-rating__dot';
    dot.dataset.filled = String(value <= score);
    dot.setAttribute('aria-hidden', 'true');
    root.appendChild(dot);
  }

  return root;
}

export default DotRating;

