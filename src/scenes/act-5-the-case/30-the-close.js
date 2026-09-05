// Scene 30 — Close (2 beats). The last scene of the film.
//
// Legacy 5-01, re-homed — the act's ONE ADAPT, with its one ruled change:
//
//   beat 1  SILENCE — black. Nothing on the frame. The advance that leaves the
//           case lands here and the callback is spoken over it. Black is a
//           scripted beat, not a seam (master §3.5), and its own beat by Row 6
//           (ruled A, 4 Sep 2026).
//   beat 2  Thank you. — one line of typography at the film's final register,
//           centered on black. No second line, no watermark, no kicker, no
//           chrome, no waypoint. The frame retained exactly.
//
// THE ONE RULED CHANGE: legacy 5-01's build 1 brought the method line back with
// all three waypoints completed and one slow warmth pulse along it. The
// waypoint device is retired by the structure freeze (architecture Ruling 1),
// so that build is in no state of this scene and is NEVER SHOWN — the beat is
// the black the legacy always started from, with the sentence that named the
// road cut from the script and nothing written in its place. The callback opens
// the beat instead. The ADAPT is therefore a state the legacy already performs,
// not a drawing.
//
// THE ENTRY, AS RULED (master §13, 4 Sep 2026 — the six seams): the case
// dissolves into black. 5-01's build 0 IS black, so the boundary from Scene 29
// is the legacy deck's own crossfade landing on it, and nothing follows —
// which is what "a scripted black beat" means when it is played rather than
// described.
//
// WHY BEAT 2 USES ITS OWN GESTURE. Retiring build 1 leaves a hole in the legacy
// module's own numbering, and its `_snapFrame` contract reads any apply that is
// not `appliedStep + 1` as a reconstruction — which would suppress the
// authored 1000ms fade and POP the film's last words onto the screen. The
// gesture clears that snap in the same task, before style is resolved, so the
// legacy's own fade from black plays exactly as it always did. Nothing else is
// changed: no legacy file, no settled state, no timing.
//
// THE SELF-REFERENCE BAN IS CHECKED HARDEST HERE (master §3.5, §5 rule 13): the
// close names no medium, no sequel, no waypoint. The frame's only visible text
// is "Thank you."
//
// Landed states — the approved cells s30-b1 · s30-b2, by construction.

import { makeSceneModule } from './_sceneModule.js';
import { legacyAdvanceAcrossRetiredBuild, legacyBoundaryTo0, legacyCut } from './_caseStage.js';

const ID = 'the-close';

const entry = legacyCut(ID);
const morphIn = legacyBoundaryTo0(ID, 's423', 's501', 0.9);

const transitions = {
  // beat 2 — Thank you. rises from black over the legacy's own 1000ms fade
  // (5-01 build 2; build 1, the wayline, is retired and never shown).
  1: legacyAdvanceAcrossRetiredBuild(ID, 1, 's501', 2, 1.3)
};

export default makeSceneModule({
  id: ID,
  number: 30,
  title: 'Close',
  entry,
  morphIn,
  transitions,
  notes: `[→] An hour ago I told you something strange: that you’d spend eighty thousand hours of your life earning something you couldn’t define. Now you can define it. You know where it came from. You know what it must do, and in what order. And you know how to judge anything that tries to be it — including everything in your bank account, and everything on the news.

[→] Here’s the last thing I’ll tell you about seeing money this way: you won’t be able to stop. Every headline, every paycheck, every price — you’ll see the claim, the carrier, and the rules underneath. That framework is yours now. Not my conclusions — the framework. Check every score. None of this is investment advice; it’s the education you were never given. What it offers you is a way to ask, about any money you’ll ever hold, one question: can the rules be moved beneath you? Thank you.`
});
