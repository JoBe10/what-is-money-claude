// R7 dynamic verification.
//
// The spine of the suite is a signature comparison: every build of every
// changed slide is walked live, then entered cold via ?slide= + a seeded
// deck-state + a reload, and the two signatures must agree. That is the actual
// claim the reconstruction snap makes — what a live advance settles on is what
// a refresh lands on — and it checks all of it rather than a hand-picked
// attribute per slide. Named assertions on top cover the states whose meaning
// a signature cannot see.
//
// Usage: node verify-r7.cjs [--part=traversal|direct|rm|settle] [--port 4312]
//
// `rm` is the whole suite under reduced motion; `settle` is its last block
// alone — the settle gate — for when only that has changed and re-running the
// 112-state matrix would prove nothing new.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i > -1 ? args[i + 1] : fallback;
};
const PART = (args.find((a) => a.startsWith('--part=')) || '--part=all').split('=')[1];
const PORT = flag('--port', '4312');
const BASE = `http://localhost:${PORT}`;
// Scope and motion variant are independent axes: `--part=rm` is the whole
// suite reduced, but any part can be run reduced with `--reduced`, which is how
// the reduced-motion matrix is covered inside the runner's time ceiling.
const REDUCED = args.includes('--reduced') || PART === 'rm' || PART === 'settle';
const TAG = PART.replace(/,/g, '+') + (REDUCED && PART !== 'rm' && PART !== 'settle' ? '-rm' : '');

// `--part` takes a list: the reconstruction checks compare a live signature
// captured during traversal against a cold direct entry, so those two parts
// must run in one process or 112 comparisons silently do not happen.
const PARTS = new Set(PART.split(',').map((s) => s.trim()));
const runsPart = (name) => PARTS.has('all') || PARTS.has('rm') || PARTS.has(name);
const OUT = path.join(__dirname, '..');

// Every slide R7 touched, plus the two Section 3 slides at the seam, plus the
// two Section 2 slides R7.2 touched (the contenders' register switch and the
// flagged gold arrival), plus the eight Sections 2–3 slides R7.3 touched.
//
// R7.3 widened this list to every slide the brightness work reaches, which is
// the whole point of widening it: the two rules are state rules, and a state
// rule that is not walked forward, backward and cold is a rule that holds until
// someone navigates.
const CHANGED = [
  '2-02-the-discovery', '2-03-the-convergence',
  '2-04-the-competition-record', '2-05-two-survivors',
  '2-06-the-abstraction-ladder', '2-07-the-severance', '2-08-the-pattern',
  '3-01-the-three-functions', '3-02-the-functions-separate',
  '4-01-define-the-job', '4-03-simple-exchange', '4-04-unfinished-exchange',
  '4-05-spend-or-save', '4-06-claim-and-carrier', '4-07-store-of-value-function',
  '4-08-100-year-test', '4-09-future-is-unknowable', '4-10-invert-the-question',
  '4-11-carrier-failures-i', '4-12-carrier-failures-ii', '4-13-failure-to-requirement',
  '4-14-ten-properties', '4-15-framework-to-comparison', '4-16-the-comparison',
  '4-17-store-of-value-function-migrates', '4-18-monetary-premium',
  '4-19-other-assets-do-moneys-job', '4-20-bitcoin-does-not-replace-everything',
  '4-21-marginal-store-of-value-decision',
  '4-22-fixed-supply-reprices-at-margin', '4-23-investment-case-from-first-principles',
  '5-01-thank-you'
];

// Slides whose slowest choreography outruns the changed-build clock below.
// Each entry is the gesture's own duration plus its arrival, not a guess.
const SLOW_BUILDS = {
  // Murmuration: 5200ms convergence, token resolved at 78% (4056ms).
  '2-03-the-convergence': 4600
};

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  if (!ok) console.log(`FAIL  ${name} :: ${detail}`);
}

// The state signature of the active slide: every reveal-bearing attribute, plus
// the visible text. data-live, data-snap and data-step-live are excluded — they
// describe how the frame arrived, not what it is.
//
// data-step-live joined the list at R7.2. It is the same kind of attribute as
// data-live — Section 2's grid and triad set it to the step number on a live
// advance and to '' on a reconstruction, to gate one-shot choreography — and it
// was missing from the exclusion only because no slide carrying it had ever
// been in CHANGED. Widening CHANGED to the two Section 2 slides this phase
// touches surfaced it as five reconstruction "failures" whose entire content
// was that attribute. The frames themselves were identical.
const signatureInPage = () => {
  // Declared inside: this function is serialized into the page, so it cannot
  // close over anything in this file.
  const SIGNATURE_IGNORES = new Set(['data-live', 'data-snap', 'data-step-live']);
  const root = document.querySelector('.deck-slide[data-active="true"]') ||
    document.querySelector('.deck-slide');
  if (!root) return null;
  const parts = [];
  root.querySelectorAll('*').forEach((el) => {
    // An overlay the scene-group handoff has marked `data-exiting` is at
    // opacity 0 the instant it is marked and is removed 650ms later
    // (slides/section-2-origin/_railScene.js). It is not part of the incoming
    // frame's state at any wait time.
    //
    // Corrected at R7.2, because the signature's two halves disagreed about
    // it: the visible-text half already ignored it (an opacity-0 parent fails
    // the visibility walk) and the attribute half did not. Under reduced
    // motion, where changed builds are sampled at 420ms, the walk was
    // capturing 2.04's departing text layer as part of 2.05 b0 and reporting
    // it as a reconstruction mismatch. Aligning the two halves is a
    // correction, not a loosening — nothing that is on screen is dropped.
    if (el.closest('[data-exiting="true"]')) return;
    const attrs = [...el.attributes]
      .filter((a) => a.name.startsWith('data-') && !SIGNATURE_IGNORES.has(a.name))
      .map((a) => `${a.name}=${a.value}`)
      .sort()
      .join(',');
    if (attrs) parts.push(`${el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className}|${attrs}`);
  });
  const visibleText = [...root.querySelectorAll('*')]
    .filter((el) => {
      if (el.children.length) return false;
      const cs = getComputedStyle(el);
      if (Number(cs.opacity) < 0.05 || cs.visibility === 'hidden' || cs.display === 'none') return false;
      let p = el.parentElement;
      while (p && p !== root) {
        const pcs = getComputedStyle(p);
        if (Number(pcs.opacity) < 0.05 || pcs.visibility === 'hidden' || pcs.display === 'none') return false;
        p = p.parentElement;
      }
      return (el.textContent || '').trim().length > 0;
    })
    .map((el) => el.textContent.trim())
    .join(' | ');
  return { attrs: parts.join('\n'), text: visibleText };
};

const litFractionInPage = () => {
  const root = document.querySelector('.deck-canvas');
  if (!root) return null;
  return null;
};

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    reducedMotion: REDUCED ? 'reduce' : 'no-preference'
  });
  const consoleLines = [];
  const wire = (p) => {
    p.on('console', (m) => {
      if ((m.type() === 'error' || m.type() === 'warning') && !m.text().startsWith('[vite]')) {
        consoleLines.push(`[${m.type()}] ${m.text()}`);
      }
    });
    p.on('pageerror', (e) => consoleLines.push(`[pageerror] ${e.message}`));
    return p;
  };
  let page = wire(await context.newPage());

  // This rig runs out of Chromium's budget partway through a long suite (the
  // R3.1 observation), so the renderer is recycled every RECYCLE_EVERY
  // navigations. Nothing about the deck survives a navigation, so this changes
  // what is measured not at all.
  // The ceiling shows up as net::ERR_INSUFFICIENT_RESOURCES, and a frame that
  // loses a resource is a frame that can miss its signature — which is what the
  // two transient failures in this phase turned out to be. Reduced motion
  // reaches it soonest (every settle capped at 420ms is roughly four times the
  // navigation rate), but the standard variant reaches it too over a long
  // enough run, so both recycle at 12.
  const RECYCLE_EVERY = 12;
  let navCount = 0;
  const recycleIfDue = async () => {
    navCount += 1;
    if (navCount % RECYCLE_EVERY) return;
    const old = page;
    page = wire(await context.newPage());
    await old.close();
  };

  const ready = () => page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  const state = () => page.evaluate(() => ({
    id: window.__deck.slides[window.__deck.index].id,
    index: window.__deck.index,
    build: window.__deck.buildStep,
    total: window.__deck.slides[window.__deck.index].totalBuildSteps || 0,
    containers: document.querySelectorAll('.deck-slide').length,
    active: document.querySelectorAll('.deck-slide[data-active="true"]').length
  }));
  const settle = (ms) => page.waitForTimeout(REDUCED ? Math.min(ms, 420) : ms);

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await ready();
  const manifest = await page.evaluate(() => window.__deck.slides.map((s, i) => ({
    n: i + 1, id: s.id, builds: s.totalBuildSteps || 0
  })));
  const byId = Object.fromEntries(manifest.map((s) => [s.id, s]));

  const enterOnce = async (id, build) => {
    const meta = byId[id];
    await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(({ n, k }) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
    }, { n: meta.n, k: build });
    await page.reload({ waitUntil: 'networkidle' });
    await ready();
  };
  // One retry on a fresh renderer, then let it fail loudly.
  const enter = async (id, build) => {
    await recycleIfDue();
    try {
      await enterOnce(id, build);
    } catch (err) {
      const old = page;
      page = wire(await context.newPage());
      await old.close().catch(() => {});
      await enterOnce(id, build);
    }
  };

  // The live signatures captured by the traversal pass. They can be written out
  // and read back so the two halves of the suite fit inside a runner's time
  // ceiling without dropping the 112 reconstruction comparisons that need both
  // — `--emit-live` on the traversal run, `--use-live` on the direct one. Only
  // valid within one session: they describe the tree as it was walked.
  const LIVE_FILE = path.join(OUT, `verify-r7-live${REDUCED ? '-rm' : ''}.json`);
  const liveSignatures = new Map();
  if (args.includes('--use-live') && !runsPart('traversal') && fs.existsSync(LIVE_FILE)) {
    const saved = JSON.parse(fs.readFileSync(LIVE_FILE, 'utf8'));
    Object.entries(saved).forEach(([k, v]) => liveSignatures.set(k, v));
    console.log(`loaded ${liveSignatures.size} live signatures from a previous traversal pass`);
  }

  // ------------------------------------------------------------- TRAVERSAL
  if (runsPart('traversal')) {
    await page.goto(`${BASE}/?slide=1`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(() => sessionStorage.removeItem('deck-state'));
    await page.reload({ waitUntil: 'networkidle' });
    await ready();
    await settle(900);

    let steps = 0;
    let structureOk = true;
    let structureDetail = '';
    for (;;) {
      const st = await state();
      if (st.containers !== 1 || st.active !== 1) {
        structureOk = false;
        structureDetail = `${st.id} b${st.build}: containers=${st.containers} active=${st.active}`;
        break;
      }
      if (CHANGED.includes(st.id)) {
        const sig = await page.evaluate(signatureInPage);
        liveSignatures.set(`${st.id}:${st.build}`, sig);
      }
      if (st.index === manifest.length - 1 && st.build === st.total) break;
      await page.keyboard.press('ArrowRight');
      steps += 1;
      // A changed build is sampled only once its slowest choreography has
      // settled — a signature taken mid-arrival compares a transient against a
      // reconstruction and reports a difference that is not there.
      //
      // Raised from 1800 to 2700 at R7.2. Widening CHANGED to Section 2
      // brought in two gestures longer than anything in Section 4: the
      // element grid's gas drift is `opacity 1700ms` on a per-cell random
      // delay of up to 800ms (2500ms worst case), and the rail's camera tween
      // is 1700ms. At 1800ms the walk was sampling four noble-gas cells still
      // in flight, which showed up as a reconstruction mismatch on 2.05 b2
      // whose entire content was "O / Ne / Kr / Rn are still faintly visible".
      // The frames were identical; the clock was wrong.
      //
      // R7.3 widened CHANGED again and brought in one gesture longer than
      // anything the 2700 was set for: 2.3's murmuration converges over 5200ms
      // and resolves its token at 78% of that — 4056ms — so the walk was
      // sampling a frame in which the token had legitimately not arrived and
      // comparing it against a reconstruction where it simply is. Same
      // correction as R7.2's, one gesture further out, and a per-slide number
      // rather than a global one this time: raising the global clock would
      // cost 130 builds two seconds each to fix one slide.
      await page.waitForTimeout(160);
      const next = await state();
      await settle(SLOW_BUILDS[next.id] || (CHANGED.includes(next.id) ? 2700 : 500));
      if (steps > 300) break;
    }
    check('traversal: forward walk holds one mounted, one active container at every build',
      structureOk, structureDetail);
    const end = await state();
    check('traversal: the forward walk ends on the close’s final build',
      end.id === '5-01-thank-you' && end.build === end.total, `${end.id} b${end.build}`);
    check('traversal: every changed build probed live', liveSignatures.size >= 80,
      `${liveSignatures.size} live signatures`);

    // Backward, all the way to the cold open.
    let backOk = true;
    let backDetail = '';
    for (let i = 0; i < 320; i += 1) {
      const st = await state();
      if (st.index === 0 && st.build === 0) break;
      await page.keyboard.press('ArrowLeft');
      await settle(420);
      const after = await state();
      if (after.containers !== 1) { backOk = false; backDetail = `${after.id} containers=${after.containers}`; break; }
    }
    const home = await state();
    check('traversal: backward walk reaches 1.1 build 0 with one container',
      backOk && home.index === 0 && home.build === 0, backDetail || `${home.id} b${home.build}`);

    // Fast re-forward through Section 4 — animation cancellation, no stale overlays.
    await enter('4-01-define-the-job', 0);
    for (let i = 0; i < 60; i += 1) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(70);
    }
    await settle(1400);
    const fast = await state();
    check('traversal: fast re-forward through Section 4 leaves one container, no stale overlay',
      fast.containers === 1 && fast.active === 1, `${fast.id} b${fast.build} containers=${fast.containers}`);

    if (args.includes('--emit-live')) {
      fs.writeFileSync(LIVE_FILE, JSON.stringify(Object.fromEntries(liveSignatures), null, 2));
      console.log(`wrote ${liveSignatures.size} live signatures to ${path.basename(LIVE_FILE)}`);
    }
  }

  // ------------------------------------------------- DIRECT ENTRY + RECONSTRUCTION
  if (runsPart('direct')) {
    for (const id of CHANGED) {
      const meta = byId[id];
      for (let b = 0; b <= meta.builds; b += 1) {
        await enter(id, b);
        await settle(1700);
        const st = await state();
        check(`direct entry: ${id} b${b} lands exactly`,
          st.id === id && st.build === b && st.containers === 1,
          `${st.id} b${st.build} containers=${st.containers}`);
        const sig = await page.evaluate(signatureInPage);
        const live = liveSignatures.get(`${id}:${b}`);
        if (live) {
          // Report the difference, not two truncated prefixes of the same
          // string: a mismatch 200 characters in is invisible otherwise.
          const describe = () => {
            if (live.attrs !== sig.attrs) {
              const a = live.attrs.split('\n');
              const z = sig.attrs.split('\n');
              const moved = z.filter((x, i) => x !== a[i]).slice(0, 2);
              return `attributes differ: ${moved.join(' ; ') || '(count changed)'}`;
            }
            const liveParts = live.text.split(' | ');
            const coldParts = sig.text.split(' | ');
            const onlyCold = coldParts.filter((t) => !liveParts.includes(t));
            const onlyLive = liveParts.filter((t) => !coldParts.includes(t));
            return `text differs — only cold: [${onlyCold.join(' / ').slice(0, 120)}] · only live: [${onlyLive.join(' / ').slice(0, 120)}]`;
          };
          check(`reconstruction: ${id} b${b} matches the live end state`,
            live.attrs === sig.attrs && live.text === sig.text, describe());
        }
      }
    }
  }

  // ------------------------------------------------------- NAMED ASSERTIONS
  if (runsPart('direct')) {
    // The optional second argument is R7.3's: two assertions run the same probe
    // against two different selectors, and passing the selector in beats
    // writing the probe twice.
    const probe = (fn, arg) => page.evaluate(fn, arg);

    await enter('4-01-define-the-job', 0);
    await settle(1200);
    check('4.01 b0 is the authored black beat the waypoint dissolves into',
      (await page.evaluate(signatureInPage)).text === '', 'no visible text');

    await enter('4-16-the-comparison', 1);
    await settle(1600);
    check('4.16 b1 scores the first five properties only',
      await probe(() => document.querySelector('.s4-comparison-table').dataset.rowsRevealed === '5'), '');
    await enter('4-16-the-comparison', 2);
    await settle(1600);
    check('4.16 b2 completes all ten rows',
      await probe(() => document.querySelector('.s4-comparison-table').dataset.rowsRevealed === '10'), '');
    await enter('4-16-the-comparison', 3);
    await settle(1600);
    check('4.16 b3 lands "Don’t trust. Verify." — the deck’s first of exactly two',
      await probe(() => {
        const el = document.querySelector('.s4-comparison__final');
        const span = el.querySelector('span');
        const strong = el.querySelector('strong');
        return el.dataset.visible === 'true'
          && span.textContent === 'Don’t trust.'
          && strong.textContent === 'Verify.';
      }), await probe(() => document.querySelector('.s4-comparison__final').textContent));

    // R7.4 §D.4: the falsifiability slide is deleted and the deck's second
    // "Don't trust. Verify." went with it. The line now appears once, at the
    // table, and the assertion that used to prove the callback proves the
    // retirement instead — on stage exactly once, deck-wide.
    check('the deck says "Don’t trust. Verify." on stage exactly once, at the table',
      await probe(() => document.querySelectorAll('.s4-falsifiability__verify').length === 0), 'the callback is retired');

    // R7.1 §C2 restaged the stability module from three builds to four, so the
    // settled frame is b8 and each element now dims as the next lands. The
    // assertion follows the new build map: at b8 everything above the closing
    // pair is present but quiet, and the pair is the only bright text.
    await enter('4-20-bitcoin-does-not-replace-everything', 8);
    await settle(1700);
    check('4.20 b8: the coexistence frame has cleared and the closing pair stands alone',
      await probe(() => {
        const assets = [...document.querySelectorAll('.s4-coexistence__asset')];
        const word = document.querySelector('.s4-coexistence__bisection-word');
        const split = document.querySelector('.s4-coexistence__bisection-split');
        const resolution = document.querySelector('.s4-coexistence__resolution');
        const price = document.querySelector('.s4-coexistence__price');
        return assets.every((a) => a.dataset.visible === 'false')
          && word.dataset.quiet === 'true'
          && split.dataset.quiet === 'true'
          && resolution.dataset.quiet === 'true'
          && price.dataset.visible === 'true'
          && price.dataset.quiet !== 'true';
      }), '');

    await enter('4-22-fixed-supply-reprices-at-margin', 3);
    await settle(1900);
    check('4.22 b3: the shared UnitGrid is repriced, 35 units, margin column brightest',
      await probe(() => {
        const field = document.querySelector('.s4-fixed-supply-field');
        const units = [...document.querySelectorAll('.s4-fixed-supply-field .unit-field-grid__unit')];
        const margin = units.filter((u) => u.dataset.available === 'true');
        const held = units.filter((u) => u.dataset.available !== 'true');
        const alpha = (el) => {
          const m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
          return m ? Number(m[3] ?? 1) : 0;
        };
        return field.dataset.repriced === 'true' && units.length === 35 && margin.length === 5
          && alpha(margin[0]) > alpha(held[0]);
      }), '');
    check('4.22: the unit box comes from the shared grammar (84×46 on a 102×62 pitch)',
      await probe(() => {
        const u = document.querySelector('.s4-fixed-supply-field .unit-field-grid__unit');
        const g = document.querySelector('.s4-fixed-supply-field .unit-field-grid');
        const cs = getComputedStyle(u);
        const gs = getComputedStyle(g);
        return cs.width === '84px' && cs.height === '46px'
          && gs.columnGap === '18px' && gs.rowGap === '16px';
      }), await probe(() => {
        const u = document.querySelector('.s4-fixed-supply-field .unit-field-grid__unit');
        const g = document.querySelector('.s4-fixed-supply-field .unit-field-grid');
        return `${getComputedStyle(u).width}/${getComputedStyle(u).height} gap ${getComputedStyle(g).columnGap}/${getComputedStyle(g).rowGap}`;
      }));

    await enter('5-01-thank-you', 1);
    await settle(1800);
    check('the close b1: the road returns with all three waypoints completed',
      await probe(() => {
        const wps = [...document.querySelectorAll('.wayline__wp')];
        return document.querySelector('.wayline').dataset.visible === 'true'
          && wps.length === 3 && wps.every((w) => w.dataset.state === 'completed');
      }), '');
    await enter('5-01-thank-you', 2);
    await settle(1800);
    check('the close b2: the line dissolves and the retained frame stands alone',
      await probe(() => {
        const thanks = document.querySelector('.s5c__thanks');
        return document.querySelector('.wayline').dataset.visible === 'false'
          && thanks.dataset.visible === 'true'
          && thanks.textContent === 'Thank you.'
          && getComputedStyle(thanks).fontSize === '132px';
      }), '');

    // The asset glyphs, at their two shipping sizes.
    await enter('4-16-the-comparison', 0);
    await settle(1300);
    check('the table header renders five drawn marks, no images',
      await probe(() => {
        const marks = [...document.querySelectorAll('.s4-comparison-table__asset-heading .s4-comparison-asset__mark svg')];
        const imgs = document.querySelectorAll('.s4-comparison-table img');
        return marks.length === 5 && imgs.length === 0;
      }), '');
    // R7.2 amends this assertion rather than leaving it passing against a rule
    // that no longer exists. It read "five drawn marks, no images" — the R7.1
    // form of §9.4.3. Under the two-register ruling the lineup is the one place
    // in the claim/carrier run that speaks dark-field, so the assertion now
    // says what is actually true and still fails if the row goes mixed by
    // accident: five renders, all present, none stubbed, no glyph fallback.
    await enter('4-06-claim-and-carrier', 2);
    await settle(1600);
    check('the 4.06 lineage renders five dark-field carriers, all present',
      await probe(() => {
        const items = [...document.querySelectorAll('.s4-claim-carrier__lineage-visual')];
        const imgs = document.querySelectorAll('.s4-claim-carrier__lineage .df-image');
        const pending = document.querySelectorAll('.s4-claim-carrier__lineage [data-pending="true"]');
        const glyphs = document.querySelectorAll('.s4-claim-carrier__lineage-visual--glyph');
        return items.length === 5 && imgs.length === 5 && pending.length === 0 && glyphs.length === 0;
      }), await probe(() => {
        const imgs = document.querySelectorAll('.s4-claim-carrier__lineage .df-image').length;
        const pending = document.querySelectorAll('.s4-claim-carrier__lineage [data-pending="true"]').length;
        return `${imgs} renders, ${pending} pending`;
      }));

    // ----- R7.2 named assertions -----

    // 4.03 is the dark-field anchor and holds no node-scene: the abstraction
    // moved to 4.04, and the register switch between the two slides is the
    // argument's first move.
    await enter('4-03-simple-exchange', 0);
    await settle(1400);
    check('4.03 is the dark-field anchor, and the node-scene has left it',
      await probe(() => {
        const root = document.querySelector('.s4-simple-exchange');
        const df = document.querySelectorAll('.s4-simple-exchange .df');
        const scene = document.querySelectorAll('.s4-simple-exchange .s4-exchange__svg, .s4-simple-exchange .s4-exchange__node');
        return root.dataset.register === 'dark-field' && df.length === 1 && scene.length === 0;
      }), await probe(() => {
        const root = document.querySelector('.s4-simple-exchange');
        return `register=${root?.dataset.register} df=${document.querySelectorAll('.s4-simple-exchange .df').length} scene=${document.querySelectorAll('.s4-simple-exchange .s4-exchange__node').length}`;
      }));

    // The R7.1 occlusion. At b2 the claim rested on the surgeon's slot and the
    // definition ran underneath it, so the deck's central sentence rendered as
    // "AN EA●ED, TRANSFERABLE CLAIM ON VALUE". Asserted geometrically so it
    // cannot come back by a layout change nobody screenshot.
    await enter('4-04-unfinished-exchange', 2);
    await settle(1700);
    check('4.04 b2: the claim does not overlap the definition',
      await probe(() => {
        const disc = document.querySelector('.s4-unfinished__claim');
        const line = document.querySelector('.s4-unfinished__headline');
        if (!disc || !line) return false;
        const a = disc.getBoundingClientRect();
        const r = document.createRange();
        r.selectNodeContents(line);
        const b = r.getBoundingClientRect();
        r.detach();
        return a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom;
      }), await probe(() => {
        const a = document.querySelector('.s4-unfinished__claim').getBoundingClientRect();
        const b = document.querySelector('.s4-unfinished__headline').getBoundingClientRect();
        return `claim ${Math.round(a.top)}–${Math.round(a.bottom)} vs line ${Math.round(b.top)}–${Math.round(b.bottom)}`;
      }));

    // The register switch at 2.4: renders while the row is a row, marks once
    // the line draws through it. Both halves asserted, on the two builds the
    // switch happens between.
    await enter('2-04-the-competition-record', 5);
    await settle(1800);
    check('2.4 b5: the contenders stand on the dark-field register, no line drawn',
      await probe(() => {
        const rail = document.querySelector('.s2o-rail');
        const shown = [...document.querySelectorAll('.s2o-rail__render')]
          .filter((el) => Number(getComputedStyle(el).opacity) > 0.06);
        return rail.dataset.renders === 'true' && rail.dataset.line === 'false' && shown.length === 4;
      }), await probe(() => {
        const rail = document.querySelector('.s2o-rail');
        return `renders=${rail.dataset.renders} line=${rail.dataset.line}`;
      }));
    await enter('2-04-the-competition-record', 6);
    await settle(2200);
    check('2.4 b6: the line is drawn and every render has become its mark',
      await probe(() => {
        const rail = document.querySelector('.s2o-rail');
        const shown = [...document.querySelectorAll('.s2o-rail__render')]
          .filter((el) => Number(getComputedStyle(el).opacity) > 0.06);
        const marks = [...document.querySelectorAll('.s2o-rail__stop[data-stop="cattle"] .s2o-rail__glyph')]
          .filter((el) => Number(getComputedStyle(el).opacity) > 0.06);
        return rail.dataset.renders === 'false' && rail.dataset.line === 'true'
          && shown.length === 0 && marks.length === 1;
      }), await probe(() => {
        const rail = document.querySelector('.s2o-rail');
        const shown = [...document.querySelectorAll('.s2o-rail__render')]
          .filter((el) => Number(getComputedStyle(el).opacity) > 0.06).length;
        return `renders=${rail.dataset.renders} line=${rail.dataset.line} visible=${shown}`;
      }));

    // ----- R7.3 named assertions -----

    // The contender row is one shoot. Four renders, all from the R7.3 portrait
    // set — the point of `cowrie_shells` having its own key is that the row
    // holds together, and a silent fall back to the first shoot's landscape
    // `shells` would look almost right and be exactly the defect the framing
    // rule exists to catch.
    await enter('2-04-the-competition-record', 0);
    await settle(1800);
    check('2.4 b0: four contender renders, all from the R7.3 shoot',
      await probe(() => {
        const subjects = [...document.querySelectorAll('.s2o-rail__render .df')]
          .map((el) => el.dataset.subject).sort();
        const pending = document.querySelectorAll('.s2o-rail__render [data-pending="true"]').length;
        return pending === 0 &&
          JSON.stringify(subjects) === JSON.stringify(['cattle', 'cowrie_shells', 'iron', 'salt']);
      }), await probe(() => [...document.querySelectorAll('.s2o-rail__render .df')]
        .map((el) => `${el.dataset.subject}${el.dataset.pending === 'true' ? '(pending)' : ''}`).join(', ')));

    // The last-lit invariant at the beat it was written for: on the build the
    // shell receipt lands, it is the sentence being spoken and the three wounds
    // beside it have receded. Asserted as measured alpha, not as a class name,
    // because the rule is about what the eye gets.
    await enter('2-04-the-competition-record', 7);
    await settle(2200);
    check('2.4 b7: the receipt speaks and the other three wounds have receded',
      await probe(() => {
        const alpha = (el) => {
          const m = /rgba?\(([^)]+)\)/.exec(getComputedStyle(el).color);
          const p = m ? m[1].split(',').map(Number) : [0, 0, 0, 1];
          let a = p.length > 3 ? p[3] : 1;
          let n = el;
          while (n && n !== document.body) { a *= Number(getComputedStyle(n).opacity); n = n.parentElement; }
          return a;
        };
        const receipt = document.querySelector('.s2o-rail__stop[data-stop="shells"] .s2o-rail__receipt');
        const others = ['cattle', 'salt', 'iron']
          .map((id) => document.querySelector(`.s2o-rail__stop[data-stop="${id}"] .s2o-rail__wound`));
        return alpha(receipt) >= 0.92 && others.every((el) => alpha(el) >= 0.55 && alpha(el) <= 0.7);
      }), await probe(() => {
        const el = document.querySelector('.s2o-rail__stop[data-stop="shells"] .s2o-rail__receipt');
        return `receipt color ${getComputedStyle(el).color}`;
      }));

    // The pattern's end state (R7.3 §3): the closing thesis line at full
    // brightness with the two before it cleared, the entrant's description
    // receded one step, and the limitation holding bright beside the line.
    await enter('2-08-the-pattern', 6);
    await settle(2200);
    check('2.8 b6: the closing line and the limitation hold the frame alone',
      await probe(() => {
        const vis = (el) => el && Number(getComputedStyle(el).opacity) > 0.06;
        const lines = [...document.querySelectorAll('.s2o-pattern__thesisline')];
        const closing = lines[2];
        const limitation = document.querySelector('.s2o-rail__limitation');
        const entrantLine = document.querySelector('.s2o-rail__entrantline');
        const alphaOf = (el) => {
          const m = /rgba?\(([^)]+)\)/.exec(getComputedStyle(el).color);
          const p = m ? m[1].split(',').map(Number) : [0, 0, 0, 1];
          return p.length > 3 ? p[3] : 1;
        };
        return !vis(lines[0]) && !vis(lines[1]) &&
          Number(getComputedStyle(closing).opacity) > 0.92 &&
          alphaOf(limitation) > 0.92 &&
          alphaOf(entrantLine) > 0.5 && alphaOf(entrantLine) < 0.7;
      }), await probe(() => {
        const lines = [...document.querySelectorAll('.s2o-pattern__thesisline')]
          .map((el) => Number(getComputedStyle(el).opacity).toFixed(2)).join('/');
        return `thesis opacities ${lines}, limitation ${getComputedStyle(document.querySelector('.s2o-rail__limitation')).color}`;
      }));

    // §5.1: the three functions radiate from the deck's one render of stored
    // value. The class was lost at the R7.1 disc migration and the slide shipped
    // with a bare glow at its center — every check passed and the frame was
    // wrong, which is the class of defect only a named assertion catches.
    for (const [id, sel] of [['3-01-the-three-functions', '.s3f-functions__token'],
      ['2-03-the-convergence', '.s2o-convergence__token']]) {
      await enter(id, 2);
      await settle(1400);
      check(`${id}: the token is literally the shared luminous disc`,
        await probe((s) => {
          const el = document.querySelector(s);
          if (!el || !el.classList.contains('luminous-disc')) return false;
          const cs = getComputedStyle(el);
          return cs.backgroundImage.includes('radial-gradient') &&
            parseFloat(cs.width) > 100 && cs.borderRadius.startsWith('50%');
        }, sel), await probe((s) => {
          const el = document.querySelector(s);
          const cs = el ? getComputedStyle(el) : null;
          return el ? `${el.className} — ${cs.width}×${cs.height}` : 'missing';
        }, sel));
    }
  }

  // -------------------------------------------------- MID-ANIMATION REFRESH
  if (runsPart('direct')) {
    const midCases = [
      ['4-08-100-year-test', 1, 'mid statement stagger'],
      ['4-14-ten-properties', 2, 'mid column stagger'],
      ['4-16-the-comparison', 2, 'mid score reveal'],
      ['4-22-fixed-supply-reprices-at-margin', 3, 'mid repricing sweep'],
      ['4-20-bitcoin-does-not-replace-everything', 5, 'mid frame clear'],
      ['5-01-thank-you', 1, 'mid warmth pulse'],
      // R7.2: the register switch is the deck's longest single gesture — a
      // 1.7s camera tween, the line drawing, and four crossfades at once. A
      // refresh through the middle of it is the state most likely to strand.
      ['2-04-the-competition-record', 6, 'mid register switch']
    ];
    for (const [id, build, why] of midCases) {
      await enter(id, build === 0 ? 0 : build - 1);
      await settle(1400);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(180); // interrupt the choreography
      await page.reload({ waitUntil: 'networkidle' });
      await ready();
      await settle(1700);
      const st = await state();
      const sig = await page.evaluate(signatureInPage);
      const cold = liveSignatures.get(`${id}:${build}`);
      check(`mid-animation refresh (${why}): ${id} b${build} reconstructs exactly`,
        st.id === id && st.build === build && (!cold || cold.attrs === sig.attrs),
        `${st.id} b${st.build}`);
    }
  }

  // ------------------------------------------------ REDUCED MOTION SETTLING
  if (PARTS.has('rm') || PARTS.has('settle')) {
    // Every slide R7 gives a live-gated stagger or a delayed reveal to. 4.08 and
    // 4.14 are here because they are the staggers: 4.08's four statements at
    // 260ms apart and 4.14's ten properties by column. They are the slides the
    // delay-suppression defect actually showed up on, so they are the slides
    // this check has to name.
    // 2.04 joins at R7.2: the register switch is the deck's longest live
    // gesture and the one most likely to leave something arriving after the
    // reduced-motion budget.
    for (const id of ['2-04-the-competition-record', '4-01-define-the-job', '4-08-100-year-test',
      '4-14-ten-properties', '4-16-the-comparison', '4-20-bitcoin-does-not-replace-everything',
      '4-20b-what-would-change-these-scores', '4-22-fixed-supply-reprices-at-margin', '5-01-thank-you']) {
      const meta = byId[id];
      await enter(id, 0);
      // This block measures whether a frame lands within 420ms, so it has to
      // start from a quiescent page: a cold renderer on the first slide is
      // still resolving Vite's module graph and swapping webfonts, and a text
      // reveal sampled through that reads as "still arriving" when the CSS is
      // in fact instant. Wait for fonts and two clean frames, not a guess.
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      await page.waitForTimeout(500);
      for (let b = 1; b <= meta.builds; b += 1) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(420);
        const sig = await page.evaluate(signatureInPage);
        const st = await state();
        const settledSig = await (async () => {
          await page.waitForTimeout(1400);
          return page.evaluate(signatureInPage);
        })();
        // Say what moved, not just that something did — a settle failure is
        // useless evidence if it cannot name the element that was still
        // arriving.
        const delta = () => {
          if (st.build !== b) return `landed on b${st.build}, expected b${b}`;
          if (sig.attrs !== settledSig.attrs) {
            const a = sig.attrs.split('|');
            const z = settledSig.attrs.split('|');
            const moved = z.filter((x, i) => x !== a[i]).slice(0, 3);
            return `attrs moved after 420ms: ${moved.join(' ; ') || '(length changed)'}`;
          }
          if (sig.text !== settledSig.text) {
            const a = new Set(sig.text.split(' | '));
            const late = settledSig.text.split(' | ').filter((t) => !a.has(t));
            return `text arrived late: ${late.join(' / ').slice(0, 160)}`;
          }
          return `b${st.build}`;
        };
        check(`reduced motion: ${id} b${b} fully settled within 420ms of the keypress`,
          st.build === b && sig.attrs === settledSig.attrs && sig.text === settledSig.text,
          delta());
      }
    }
    // The sweep only exists at `.s5c[data-live="true"][data-step="1"]`, so this
    // has to be asserted standing on that exact frame after a live advance —
    // anywhere else the selector cannot match and the check proves nothing.
    // Assert the preconditions first, then the suppression.
    await enter('5-01-thank-you', 0);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);
    const warmth = await page.evaluate(() => {
      const root = document.querySelector('.s5c');
      const line = document.querySelector('.s5c .wayline__line');
      if (!root || !line) return { reached: false };
      const cs = getComputedStyle(line, '::after');
      return {
        reached: root.dataset.live === 'true' && root.dataset.step === '1',
        live: root.dataset.live,
        step: root.dataset.step,
        animationName: cs.animationName,
        content: cs.content
      };
    });
    check('reduced motion: the close stands on the frame the sweep is gated to',
      warmth.reached, `live=${warmth.live} step=${warmth.step}`);
    check('reduced motion: the close’s warmth pulse is suppressed on that frame',
      warmth.reached && (warmth.content === 'none' || warmth.animationName === 'none'),
      `content=${warmth.content} animation=${warmth.animationName}`);
  }

  void litFractionInPage;

  const failures = results.filter((r) => !r.ok);
  const summary = {
    phase: 'R7',
    suite: `dynamic:${PART}`,
    variant: REDUCED ? 'reduced-motion' : 'standard',
    checks: results.length,
    failures: failures.length,
    consoleLines,
    results
  };
  fs.writeFileSync(path.join(OUT, `verify-r7-${TAG}.json`), JSON.stringify(summary, null, 2));
  fs.appendFileSync(path.join(OUT, 'console-log-r7.txt'), consoleLines.join('\n') + (consoleLines.length ? '\n' : ''));
  console.log(`\nR7 verify (${TAG}): ${results.length} checks, ${failures.length} failures, console ${consoleLines.length}`);
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
