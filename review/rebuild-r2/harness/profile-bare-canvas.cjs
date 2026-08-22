// Is the ~40fps cap the environment's full-canvas presentation cost, or this
// deck's code? A bare data-URL page: 1920×1080 canvas, clearRect + 2,200
// sprite blits per frame, nothing else.
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('about:blank');
  const out = await page.evaluate(() => new Promise((resolve) => {
    document.body.style.cssText = 'margin:0;background:#000;';
    const canvas = document.createElement('canvas');
    canvas.width = 1920; canvas.height = 1080;
    canvas.style.cssText = 'width:100vw;height:100vh;display:block;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const atlas = document.createElement('canvas');
    atlas.width = 16 * 24; atlas.height = 16 * 4;
    const a = atlas.getContext('2d');
    a.fillStyle = 'rgba(255,255,255,0.6)';
    for (let i = 0; i < 24; i += 1) {
      a.beginPath();
      a.moveTo(i * 16 + 12, 8); a.lineTo(i * 16 + 4, 4); a.lineTo(i * 16 + 4, 12);
      a.fill();
    }
    const N = 2200;
    const xs = new Float32Array(N), ys = new Float32Array(N), dx = new Float32Array(N), dy = new Float32Array(N);
    for (let i = 0; i < N; i += 1) {
      xs[i] = Math.random() * 1920; ys[i] = Math.random() * 1080;
      dx[i] = (Math.random() - 0.5) * 4; dy[i] = (Math.random() - 0.5) * 4;
    }
    const deltas = [];
    let last = performance.now(); const start = last;
    function tick(now) {
      deltas.push(now - last); last = now;
      ctx.clearRect(0, 0, 1920, 1080);
      for (let i = 0; i < N; i += 1) {
        xs[i] = (xs[i] + dx[i] + 1920) % 1920;
        ys[i] = (ys[i] + dy[i] + 1080) % 1080;
        ctx.drawImage(atlas, (i % 24) * 16, 0, 16, 16, xs[i] | 0, ys[i] | 0, 16, 16);
      }
      if (now - start < 4000) requestAnimationFrame(tick);
      else {
        deltas.shift();
        const total = deltas.reduce((s, d) => s + d, 0);
        const sorted = [...deltas].sort((p, q) => p - q);
        resolve({
          avgFps: +(1000 / (total / deltas.length)).toFixed(1),
          p95: +sorted[Math.floor(sorted.length * 0.95)].toFixed(1),
          gpu: (() => { try { const c = document.createElement('canvas').getContext('webgl'); const d = c.getExtension('WEBGL_debug_renderer_info'); return c.getParameter(d.UNMASKED_RENDERER_WEBGL); } catch (e) { return 'n/a'; } })()
        });
      }
    }
    requestAnimationFrame(tick);
  }));
  console.log(JSON.stringify(out));
  await browser.close();
})();
