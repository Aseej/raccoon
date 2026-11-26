import type { DuduBubuMood } from '../types/app';

/**
 * DUDU & BUBU GIF / ANIMATION CONFIGURATION
 * -----------------------------------------------------------------------------
 * To use your own Dudu & Bubu GIF URLs or local files (e.g. "/gifs/welcome.gif"),
 * simply replace any empty string ("") below with the GIF path or URL.
 *
 * When a slot is left as "" (empty), the app automatically renders an expressive,
 * custom-animated SVG Dudu & Bubu duo matching that exact mood—so nothing ever
 * looks broken or missing!
 */
export const DUDU_BUBU_ASSETS: Record<DuduBubuMood, string> = {
  welcome: '',      // Dudu & Bubu waving / welcoming Eva
  compliment: '',   // Dudu/Bubu blowing kisses or showering affection
  happy: '',        // Cheerful bouncing Dudu & Bubu
  confused: '',     // Head-tilted / question-mark reaction (wrong quiz answers)
  laughing: '',     // Giggling / teasing Dudu & Bubu
  crying: '',       // Cute dramatic puppy-eyes reaction
  sleepy: '',       // Cozy sleepy Dudu & Bubu (Tired mood rescue)
  angry: '',        // Tiny cute grumpy cheeks (Angry mood rescue)
  hug: '',          // Warm comforting bear hug (Sad / Lonely mood rescue)
  kiss: '',         // Shy cheek kiss / hearts (Need affection)
  celebration: '',  // Confetti / party celebration (Quiz right answer & milestones)
  final: '',        // Dreamy romantic finale under the night sky
  running: '',      // Chasing / sprinting Dudu & Bubu (Raccoon Escape)
  peeking: '',      // Peeking out curiously (Choose Your Fate doors)
  dizzy: '',        // Spinning / stars around head (Compliment Roulette)
  shocked: '',      // Overloaded shocked reaction (Brain Scanner)
};
