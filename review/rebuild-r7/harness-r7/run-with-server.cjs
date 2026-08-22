// Starts the Vite dev server, waits for it to answer, runs a harness script
// against it, and stops the server again — so a verification run is one
// process tree with no orphaned server and no external readiness wait.
//
// Usage: node run-with-server.cjs [--port 4312] -- <script.cjs> [args...]
const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const argv = process.argv.slice(2);
const sep = argv.indexOf('--');
const own = sep > -1 ? argv.slice(0, sep) : argv;
const rest = sep > -1 ? argv.slice(sep + 1) : [];
const portIdx = own.indexOf('--port');
const PORT = portIdx > -1 ? own[portIdx + 1] : '4312';
const REPO = path.join(__dirname, '..', '..', '..');

if (!rest.length) {
  console.error('nothing to run: pass -- <script.cjs> [args...]');
  process.exit(2);
}

const ping = () => new Promise((resolve) => {
  const req = http.get({ host: 'localhost', port: Number(PORT), path: '/', timeout: 2500 }, (res) => {
    res.resume();
    resolve(res.statusCode === 200);
  });
  req.on('error', () => resolve(false));
  req.on('timeout', () => { req.destroy(); resolve(false); });
});

const waitFor = async (ms) => {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    if (await ping()) return true;
    await new Promise((r) => setTimeout(r, 600));
  }
  return false;
};

(async () => {
  const alreadyUp = await ping();
  let server = null;

  if (!alreadyUp) {
    // Vite's JS entry directly, not the npm .cmd shim: Node 24 refuses to
    // spawn .cmd without a shell, and a direct child is one PID to stop.
    server = spawn(process.execPath, [
      path.join(REPO, 'node_modules', 'vite', 'bin', 'vite.js'),
      '--port', PORT, '--strictPort'
    ], { cwd: REPO, stdio: 'ignore', windowsHide: true });
    if (!(await waitFor(90000))) {
      console.error('server did not come up');
      try { server.kill(); } catch { /* already gone */ }
      process.exit(1);
    }
    console.log(`server up on ${PORT}`);
  } else {
    console.log(`server already up on ${PORT}`);
  }

  const stop = () => {
    if (!server) return;
    try { server.kill(); } catch { /* nothing to stop */ }
    server = null;
  };
  process.on('exit', stop);

  let code = 0;
  for (const script of splitRuns(rest)) {
    console.log(`\n=== ${script.join(' ')} ===`);
    const r = await run(script);
    if (r !== 0) code = r;
  }
  stop();
  process.exit(code);
})();

// Multiple scripts may be chained with a bare `+` between them.
function splitRuns(list) {
  const runs = [[]];
  list.forEach((a) => (a === '+' ? runs.push([]) : runs[runs.length - 1].push(a)));
  return runs.filter((r) => r.length);
}

function run([script, ...args]) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [path.join(__dirname, script), ...args], {
      cwd: REPO, stdio: 'inherit'
    });
    child.on('exit', (c) => resolve(c == null ? 1 : c));
  });
}
