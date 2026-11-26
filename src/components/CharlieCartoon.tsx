import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, FastForward } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../types/app';

interface CharlieCartoonProps {
  lang: Language;
  onComplete: () => void;
  onBurst: (type: 'hearts' | 'confetti' | 'raccoon') => void;
}

type EvaMood = 'peaceful' | 'staring' | 'annoyed' | 'ears_covered' | 'look_away' | 'defeated';
type CharliePose = 'hidden' | 'idle' | 'bark' | 'stare' | 'run' | 'angel' | 'happy';
type DuduCornerState = 'calm' | 'neutral' | 'shocked' | 'crying' | 'headphones' | 'fallen' | 'dead';

type CharlieMiniBehavior =
  | 'bark_once'
  | 'bark_three'
  | 'stare'
  | 'circles'
  | 'angel'
  | 'attention'
  | 'walk_back';

interface SceneVisualState {
  evaMood: EvaMood;
  evaBubble: string | null;
  charliePos: { x: number; y: number };
  charlieFlip: boolean;
  charliePose: CharliePose;
  charlieBubble: string | null;
  floatingBarks: Array<{ id: number; text: string; x: number; y: number }>;
  duduCorner: DuduCornerState;
  caption: string | null;
  sparkles: boolean;
  screenShake: boolean;
  showTreat: boolean;
  frozen: boolean;
}

const INITIAL_SCENE: SceneVisualState = {
  evaMood: 'peaceful',
  evaBubble: null,
  charliePos: { x: -16, y: 74 },
  charlieFlip: false,
  charliePose: 'hidden',
  charlieBubble: null,
  floatingBarks: [],
  duduCorner: 'calm',
  caption: null,
  sparkles: true,
  screenShake: false,
  showTreat: false,
  frozen: false,
};

export const CharlieCartoon: React.FC<CharlieCartoonProps> = ({
  lang,
  onComplete,
  onBurst,
}) => {
  const t = TRANSLATIONS[lang].charlie;

  const [scene, setScene] = useState<SceneVisualState>(INITIAL_SCENE);
  const [phase, setPhase] = useState<'intro' | 'interactive' | 'acting' | 'finale' | 'done'>('intro');
  const [usedActions, setUsedActions] = useState<Array<'stop' | 'treat' | 'ignore'>>([]);
  const [actionResult, setActionResult] = useState<string | null>(null);
  const [blink, setBlink] = useState(false);

  const timersRef = useRef<number[]>([]);
  const barkIdRef = useRef(0);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  const spawnBark = useCallback((text: string, x: number, y: number) => {
    barkIdRef.current += 1;
    const id = barkIdRef.current;
    setScene((prev) => ({
      ...prev,
      floatingBarks: [...prev.floatingBarks.slice(-4), { id, text, x, y }],
    }));
    const tid = window.setTimeout(() => {
      setScene((prev) => ({
        ...prev,
        floatingBarks: prev.floatingBarks.filter((b) => b.id !== id),
      }));
    }, 950);
    timersRef.current.push(tid);
  }, []);

  // Natural blinking loop for Charlie
  useEffect(() => {
    const interval = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 150);
    }, 3100);
    return () => window.clearInterval(interval);
  }, []);

  const runIntroSequence = useCallback(() => {
    clearAllTimers();
    setPhase('intro');
    setUsedActions([]);
    setActionResult(null);
    setScene({
      ...INITIAL_SCENE,
      caption: t.peaceCaption,
    });

    // Beat 1 (2.0s): Charlie slowly walks into the room
    schedule(() => {
      setScene((prev) => ({
        ...prev,
        sparkles: false,
        caption: null,
        charliePose: 'idle',
        charliePos: { x: 24, y: 74 },
        charlieFlip: false,
        evaMood: 'staring',
      }));
    }, 2000);

    // Beat 2 (3.3s): 2-second awkward silence
    schedule(() => {
      setScene((prev) => ({
        ...prev,
        duduCorner: 'neutral',
      }));
    }, 3300);

    // Beat 3 (5.3s): Tiny "Woof." -> Eva annoyed -> "WOOF."
    schedule(() => {
      setScene((prev) => ({
        ...prev,
        charliePose: 'bark',
        charlieBubble: lang === 'ru' ? 'Гав.' : 'Woof.',
      }));
      spawnBark(lang === 'ru' ? 'гав.' : 'Woof.', 28, 48);
    }, 5300);

    schedule(() => {
      setScene((prev) => ({
        ...prev,
        evaMood: 'annoyed',
        charliePose: 'bark',
        charlieBubble: lang === 'ru' ? 'ГАВ.' : 'WOOF.',
      }));
      spawnBark(lang === 'ru' ? 'ГАВ!' : 'WOOF!', 30, 44);
    }, 6400);

    // Beat 4 (7.4s): "Charlie…" -> "WOOF WOOF WOOF!" -> Eva covers ears!
    schedule(() => {
      setScene((prev) => ({
        ...prev,
        evaBubble: lang === 'ru' ? 'Чарли…' : 'Charlie…',
        charlieBubble: null,
        charliePose: 'idle',
      }));
    }, 7400);

    schedule(() => {
      setScene((prev) => ({
        ...prev,
        evaMood: 'ears_covered',
        evaBubble: null,
        charliePose: 'bark',
        charlieBubble: lang === 'ru' ? 'ГАВ ГАВ ГАВ!' : 'WOOF WOOF WOOF!',
        duduCorner: 'shocked',
        screenShake: true,
      }));
      spawnBark(lang === 'ru' ? 'ГАВ!' : 'WOOF!', 22, 42);
      spawnBark(lang === 'ru' ? 'ГАВ!' : 'WOOF!', 34, 38);
    }, 8200);

    // Escalation Phase 1 (9.5s): Charlie stands beside Eva -> "woof." -> "Shhh…" -> 👁️👁️
    schedule(() => {
      setScene((prev) => ({
        ...prev,
        screenShake: false,
        charliePos: { x: 40, y: 74 },
        charliePose: 'bark',
        charlieBubble: lang === 'ru' ? 'гав.' : 'woof.',
        evaMood: 'annoyed',
        evaBubble: lang === 'ru' ? 'Тшшш…' : 'Shhh…',
        duduCorner: 'crying',
      }));
    }, 9500);

    schedule(() => {
      setScene((prev) => ({
        ...prev,
        charliePose: 'stare',
        charlieBubble: '👁️👁️',
      }));
    }, 10600);

    // Escalation Phase 2 (11.6s): Walks to other side -> "WOOF!" -> "Charlie, please." -> "WOOF WOOF!"
    schedule(() => {
      setScene((prev) => ({
        ...prev,
        charliePos: { x: 67, y: 74 },
        charlieFlip: true,
        charliePose: 'bark',
        charlieBubble: lang === 'ru' ? 'ГАВ!' : 'WOOF!',
        evaBubble: lang === 'ru' ? 'Чарли, пожалуйста.' : 'Charlie, please.',
      }));
      spawnBark(lang === 'ru' ? 'ГАВ!' : 'WOOF!', 68, 45);
    }, 11600);

    schedule(() => {
      setScene((prev) => ({
        ...prev,
        evaBubble: null,
        evaMood: 'ears_covered',
        charlieBubble: lang === 'ru' ? 'ГАВ ГАВ!' : 'WOOF WOOF!',
        screenShake: true,
      }));
      spawnBark(lang === 'ru' ? 'ГАВ!' : 'WOOF!', 64, 38);
    }, 12600);

    // Escalation Phase 3 (13.6s): Suddenly runs across the room!
    schedule(() => {
      setScene((prev) => ({
        ...prev,
        screenShake: false,
        charliePose: 'run',
        charlieFlip: false,
        charliePos: { x: 16, y: 76 },
        charlieBubble: '💨💨',
        evaBubble: lang === 'ru' ? 'ЧАРЛИ!' : 'CHARLIE!',
      }));
    }, 13600);

    schedule(() => {
      setScene((prev) => ({
        ...prev,
        charlieFlip: false,
        charliePos: { x: 78, y: 72 },
      }));
    }, 14100);

    schedule(() => {
      setScene((prev) => ({
        ...prev,
        charlieFlip: true,
        charliePos: { x: 30, y: 74 },
        charliePose: 'stare',
        charlieBubble: null,
        evaBubble: null,
        evaMood: 'staring',
      }));
    }, 14650);

    // Tiny pause -> "woof." -> "…I give up." + Dudu headphones + Bubu hides
    schedule(() => {
      setScene((prev) => ({
        ...prev,
        charlieFlip: false,
        charliePose: 'bark',
        charlieBubble: lang === 'ru' ? 'гав.' : 'woof.',
        duduCorner: 'headphones',
        caption: t.survivalCaption,
      }));
      spawnBark(lang === 'ru' ? 'гав.' : 'woof.', 32, 48);
    }, 15450);

    schedule(() => {
      setScene((prev) => ({
        ...prev,
        evaMood: 'defeated',
        evaBubble: lang === 'ru' ? '…я сдаюсь.' : '…I give up.',
        charliePose: 'idle',
        charlieBubble: null,
      }));
      setPhase('interactive');
    }, 16500);
  }, [clearAllTimers, lang, schedule, spawnBark, t.peaceCaption, t.survivalCaption]);

  useEffect(() => {
    runIntroSequence();
    return () => clearAllTimers();
  }, [runIntroSequence, clearAllTimers]);

  const skipToInteractive = () => {
    clearAllTimers();
    setScene({
      ...INITIAL_SCENE,
      sparkles: false,
      evaMood: 'defeated',
      evaBubble: lang === 'ru' ? '…я сдаюсь.' : '…I give up.',
      charliePos: { x: 30, y: 74 },
      charliePose: 'stare',
      duduCorner: 'headphones',
      caption: t.survivalCaption,
    });
    setPhase('interactive');
  };

  const triggerFinale = useCallback(() => {
    setPhase('finale');
    setScene((prev) => ({
      ...prev,
      charliePose: 'idle',
      charlieBubble: null,
      charliePos: { x: -16, y: 74 },
      evaMood: 'peaceful',
      evaBubble: lang === 'ru' ? '…наконец-то.' : '…finally.',
      sparkles: true,
      showTreat: false,
      screenShake: false,
      caption: null,
    }));

    // 3 seconds pass -> Charlie slowly creeps back in
    schedule(() => {
      setScene((prev) => ({
        ...prev,
        sparkles: false,
        evaBubble: null,
        evaMood: 'annoyed',
        charliePos: { x: 20, y: 74 },
        charlieFlip: false,
        charliePose: 'stare',
        charlieBubble: '👁️👁️',
      }));
    }, 3000);

    schedule(() => {
      setScene((prev) => ({
        ...prev,
        evaBubble: lang === 'ru' ? 'Не смей.' : "Don't.",
      }));
    }, 4100);

    schedule(() => {
      setScene((prev) => ({
        ...prev,
        evaBubble: null,
        charliePose: 'bark',
        charlieBubble: lang === 'ru' ? 'ГАВ.' : 'WOOF.',
        duduCorner: 'dead',
        frozen: true,
      }));
      spawnBark(lang === 'ru' ? 'ГАВ.' : 'WOOF.', 24, 44);
      setPhase('done');
      onComplete();
      onBurst('confetti');
    }, 5200);
  }, [lang, onBurst, onComplete, schedule, spawnBark]);

  const registerActionAndCheckFinale = (action: 'stop' | 'treat' | 'ignore', delayMs: number) => {
    const nextUsed = usedActions.includes(action) ? usedActions : [...usedActions, action];
    setUsedActions(nextUsed);

    if (nextUsed.length >= 3) {
      schedule(() => {
        triggerFinale();
      }, delayMs);
    } else {
      schedule(() => {
        setPhase('interactive');
      }, delayMs - 300);
    }
  };

  // Interactive Button 1: "CHARLIE, STOP!"
  const handleStop = () => {
    if (phase !== 'interactive') return;
    setPhase('acting');
    setActionResult(null);

    setScene((prev) => ({
      ...prev,
      evaMood: 'annoyed',
      evaBubble: lang === 'ru' ? 'ЧАРЛИ, СТОП!' : 'CHARLIE, STOP!',
      charliePose: 'stare',
      charlieBubble: null,
      charliePos: { x: 28, y: 74 },
      charlieFlip: false,
    }));

    // Long comedic pause... then "WOOF."
    schedule(() => {
      setScene((prev) => ({
        ...prev,
        evaBubble: null,
        charliePose: 'bark',
        charlieBubble: lang === 'ru' ? 'ГАВ.' : 'WOOF.',
      }));
      spawnBark(lang === 'ru' ? 'ГАВ.' : 'WOOF.', 30, 44);
      setActionResult(t.stopResult);
    }, 1450);

    registerActionAndCheckFinale('stop', 3000);
  };

  // Interactive Button 2: "GIVE HIM A TREAT"
  const handleTreat = () => {
    if (phase !== 'interactive') return;
    setPhase('acting');
    setActionResult(null);

    setScene((prev) => ({
      ...prev,
      evaMood: 'peaceful',
      evaBubble: '🦴✨',
      showTreat: true,
      charliePos: { x: 34, y: 74 },
      charlieFlip: false,
      charliePose: 'angel',
      charlieBubble: '😇',
      caption: t.treatSolved,
    }));
    onBurst('hearts');

    // After 2 seconds: "WOOF." -> "YOU JUST GOT A TREAT." -> 🐕⬛👁️👁️
    schedule(() => {
      setScene((prev) => ({
        ...prev,
        showTreat: false,
        evaBubble: null,
        charliePose: 'bark',
        charlieBubble: lang === 'ru' ? 'ГАВ.' : 'WOOF.',
      }));
      spawnBark(lang === 'ru' ? 'ГАВ.' : 'WOOF.', 36, 44);
    }, 2000);

    schedule(() => {
      setScene((prev) => ({
        ...prev,
        evaMood: 'annoyed',
        evaBubble: t.treatCallout,
        charliePose: 'stare',
        charlieBubble: '👁️👁️',
      }));
      setActionResult(t.treatCallout);
    }, 2900);

    registerActionAndCheckFinale('treat', 4400);
  };

  // Interactive Button 3: "IGNORE HIM"
  const handleIgnore = () => {
    if (phase !== 'interactive') return;
    setPhase('acting');
    setActionResult(null);

    setScene((prev) => ({
      ...prev,
      evaMood: 'look_away',
      evaBubble: null,
      charliePos: { x: 24, y: 74 },
      charlieFlip: false,
      charliePose: 'bark',
      charlieBubble: lang === 'ru' ? 'гав.' : 'woof.',
    }));

    schedule(() => {
      setScene((prev) => ({
        ...prev,
        charliePos: { x: 33, y: 74 },
        charlieBubble: lang === 'ru' ? 'ГАВ.' : 'WOOF.',
      }));
      spawnBark(lang === 'ru' ? 'ГАВ.' : 'WOOF.', 35, 45);
    }, 850);

    schedule(() => {
      setScene((prev) => ({
        ...prev,
        charliePos: { x: 41, y: 74 },
        charlieBubble: lang === 'ru' ? 'ГАВ ГАВ.' : 'WOOF WOOF.',
        evaBubble: '….',
      }));
      spawnBark(lang === 'ru' ? 'ГАВ!' : 'WOOF!', 41, 40);
    }, 1750);

    schedule(() => {
      setScene((prev) => ({
        ...prev,
        evaBubble: null,
        evaMood: 'ears_covered',
        charlieBubble: lang === 'ru' ? 'ГААААААВ!' : 'WOOOOOOOF!',
        screenShake: true,
        duduCorner: 'fallen',
      }));
      spawnBark(lang === 'ru' ? 'ГАААВ!' : 'WOOOOOF!', 36, 34);
      spawnBark('💥', 46, 38);
    }, 2650);

    schedule(() => {
      setScene((prev) => ({
        ...prev,
        screenShake: false,
      }));
    }, 3450);

    registerActionAndCheckFinale('ignore', 4200);
  };

  // Bonus Post-Finale Button: "CHARLIE, PLEASE 😭"
  const handleCharliePlease = () => {
    clearAllTimers();
    setPhase('acting');
    setScene((prev) => ({
      ...prev,
      frozen: false,
      evaMood: 'annoyed',
      evaBubble: null,
      charlieBubble: null,
      caption: null,
      duduCorner: 'headphones',
    }));

    const behaviors: CharlieMiniBehavior[] = [
      'bark_once',
      'bark_three',
      'stare',
      'circles',
      'angel',
      'attention',
      'walk_back',
    ];
    const picked = behaviors[Math.floor(Math.random() * behaviors.length)];

    if (picked === 'bark_once') {
      setScene((prev) => ({
        ...prev,
        charliePos: { x: 30, y: 74 },
        charliePose: 'bark',
        charlieBubble: lang === 'ru' ? 'гав.' : 'woof.',
      }));
      spawnBark(lang === 'ru' ? 'гав.' : 'woof.', 32, 44);
      schedule(() => setPhase('done'), 1200);
    } else if (picked === 'bark_three') {
      setScene((prev) => ({
        ...prev,
        charliePos: { x: 32, y: 74 },
        charliePose: 'bark',
        charlieBubble: lang === 'ru' ? 'ГАВ!' : 'WOOF!',
        screenShake: true,
      }));
      spawnBark(lang === 'ru' ? 'ГАВ!' : 'WOOF!', 28, 42);
      schedule(() => spawnBark(lang === 'ru' ? 'ГАВ!' : 'WOOF!', 36, 38), 320);
      schedule(() => spawnBark(lang === 'ru' ? 'ГАВ!' : 'WOOF!', 31, 34), 640);
      schedule(() => {
        setScene((prev) => ({ ...prev, screenShake: false, charliePose: 'idle' }));
        setPhase('done');
      }, 1250);
    } else if (picked === 'stare') {
      setScene((prev) => ({
        ...prev,
        charliePos: { x: 38, y: 74 },
        charliePose: 'stare',
        charlieBubble: '👁️👁️',
        evaMood: 'staring',
        evaBubble: '…',
      }));
      schedule(() => setPhase('done'), 1600);
    } else if (picked === 'circles') {
      setScene((prev) => ({
        ...prev,
        charliePose: 'run',
        charliePos: { x: 18, y: 74 },
        charlieFlip: false,
        charlieBubble: '💨',
      }));
      schedule(() => setScene((prev) => ({ ...prev, charliePos: { x: 76, y: 72 } })), 300);
      schedule(
        () => setScene((prev) => ({ ...prev, charliePos: { x: 22, y: 75 }, charlieFlip: true })),
        650
      );
      schedule(
        () =>
          setScene((prev) => ({
            ...prev,
            charliePos: { x: 32, y: 74 },
            charlieFlip: false,
            charliePose: 'idle',
            charlieBubble: '😛',
          })),
        1050
      );
      schedule(() => setPhase('done'), 1400);
    } else if (picked === 'angel') {
      setScene((prev) => ({
        ...prev,
        charliePos: { x: 32, y: 74 },
        charliePose: 'angel',
        charlieBubble: '😇✨',
        evaMood: 'peaceful',
      }));
      onBurst('hearts');
      schedule(() => setPhase('done'), 1500);
    } else if (picked === 'attention') {
      setScene((prev) => ({
        ...prev,
        charliePos: { x: 40, y: 74 },
        charliePose: 'bark',
        charlieBubble: lang === 'ru' ? 'ПОГЛАДЬ МЕНЯ! 👀' : 'PET ME! 👀',
        evaMood: 'defeated',
      }));
      schedule(() => setPhase('done'), 1400);
    } else {
      // walk_back
      setScene((prev) => ({
        ...prev,
        charliePose: 'run',
        charliePos: { x: 112, y: 74 },
        charlieFlip: false,
        charlieBubble: null,
        evaMood: 'peaceful',
      }));
      schedule(() => {
        setScene((prev) => ({
          ...prev,
          charliePos: { x: 26, y: 74 },
          charlieFlip: false,
          charliePose: 'stare',
          charlieBubble: lang === 'ru' ? 'сюрприз, гав.' : 'surprise, woof.',
          evaMood: 'annoyed',
        }));
        spawnBark(lang === 'ru' ? 'гав.' : 'woof.', 28, 44);
        setPhase('done');
      }, 900);
    }
  };

  return (
    <div className="glass-card rounded-[32px] p-5 sm:p-8 lg:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
        <div className="space-y-1">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2d1b3d]">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#5b3d72]">{t.subtitle}</p>
        </div>

        {phase === 'intro' && (
          <button
            type="button"
            onClick={skipToInteractive}
            className="min-h-[40px] px-3.5 py-2 rounded-xl bg-purple-100/80 hover:bg-purple-200/80 text-[#4b2d63] text-xs font-bold inline-flex items-center justify-center gap-1.5 self-center sm:self-auto shrink-0 cursor-pointer"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>{t.skipIntro}</span>
          </button>
        )}
      </div>

      {/* Cartoon Living Room Stage */}
      <motion.div
        animate={
          scene.screenShake
            ? { x: [0, -6, 6, -5, 5, -3, 3, 0], y: [0, 3, -3, 2, -2, 0] }
            : { x: 0, y: 0 }
        }
        transition={{ duration: 0.45 }}
        className={`relative w-full h-[300px] sm:h-[360px] rounded-3xl border-2 overflow-hidden select-none ${
          scene.frozen
            ? 'border-pink-400 grayscale-[15%] contrast-110'
            : 'border-purple-200/90'
        }`}
      >
        {/* Cozy Room Illustration Background */}
        <svg
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          {/* Wall & Floor */}
          <rect width="800" height="295" fill="#FDF2F8" />
          <rect y="295" width="800" height="105" fill="#F3E8FF" />
          <line x1="0" y1="295" x2="800" y2="295" stroke="#E9D5FF" strokeWidth="4" />

          {/* Cozy Window */}
          <rect x="65" y="48" width="150" height="145" rx="16" fill="#E0E7FF" stroke="#C084FC" strokeWidth="5" />
          <circle cx="165" cy="95" r="22" fill="#FEF3C7" opacity="0.9" />
          <path d="M85 135 Q115 110 145 135 Q175 115 200 135 L200 185 L85 185 Z" fill="#C4B5FD" opacity="0.5" />
          <line x1="140" y1="48" x2="140" y2="193" stroke="#C084FC" strokeWidth="4" />
          <line x1="65" y1="120" x2="215" y2="120" stroke="#C084FC" strokeWidth="4" />

          {/* Soft Pastel Rug */}
          <ellipse cx="420" cy="340" rx="250" ry="38" fill="#FBCFE8" opacity="0.65" />
          <ellipse cx="420" cy="340" rx="200" ry="26" fill="#FCE7F3" opacity="0.8" />

          {/* Warm Floor Lamp */}
          <line x1="690" y1="140" x2="690" y2="305" stroke="#9333EA" strokeWidth="6" strokeLinecap="round" opacity="0.45" />
          <ellipse cx="690" cy="306" rx="24" ry="7" fill="#A855F7" opacity="0.35" />
          <polygon points="660,145 720,145 706,96 674,96" fill="#FDE68A" stroke="#F59E0B" strokeWidth="3" />

          {/* Cozy Plant */}
          <rect x="612" y="255" width="38" height="40" rx="8" fill="#F472B6" opacity="0.8" />
          <ellipse cx="622" cy="240" rx="10" ry="22" transform="rotate(-22 622 240)" fill="#86EFAC" />
          <ellipse cx="639" cy="238" rx="10" ry="24" transform="rotate(20 639 238)" fill="#4ADE80" />
          <ellipse cx="631" cy="230" rx="9" ry="22" fill="#22C55E" opacity="0.85" />

          {/* Cozy Armchair / Couch for Eva */}
          <rect x="330" y="195" width="160" height="100" rx="28" fill="#F9A8D4" stroke="#BE185D" strokeWidth="3" />
          <rect x="316" y="232" width="32" height="65" rx="14" fill="#F472B6" stroke="#BE185D" strokeWidth="3" />
          <rect x="472" y="232" width="32" height="65" rx="14" fill="#F472B6" stroke="#BE185D" strokeWidth="3" />
          <rect x="344" y="250" width="132" height="36" rx="12" fill="#FBCFE8" />
        </svg>

        {/* Peaceful sparkles */}
        {scene.sparkles && (
          <div className="absolute inset-0 pointer-events-none">
            <span className="absolute left-[38%] top-[24%] text-lg animate-twinkle">✨</span>
            <span
              className="absolute left-[60%] top-[22%] text-base animate-twinkle"
              style={{ animationDelay: '0.5s' }}
            >
              ✨
            </span>
            <span
              className="absolute left-[49%] top-[14%] text-sm animate-twinkle"
              style={{ animationDelay: '1s' }}
            >
              🌸
            </span>
          </div>
        )}

        {/* Caption Pill at Top */}
        <AnimatePresence>
          {scene.caption && (
            <motion.div
              key={scene.caption}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute top-3 left-1/2 -translate-x-1/2 z-30 rounded-2xl bg-[#2d1b3d]/90 text-white px-4 py-1.5 text-xs sm:text-sm font-display font-bold shadow-md whitespace-nowrap"
            >
              {scene.caption}
            </motion.div>
          )}
        </AnimatePresence>

        {/* DUDU & BUBU IN THE CORNER */}
        <div className="absolute top-3 right-3 z-20 flex flex-col items-end pointer-events-none">
          <motion.div
            animate={
              scene.duduCorner === 'fallen'
                ? { rotate: 82, y: 14 }
                : scene.duduCorner === 'shocked'
                ? { scale: [1, 1.08, 1] }
                : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.35 }}
            className="rounded-2xl bg-white/85 border border-purple-200/80 px-2.5 py-2 shadow-sm flex items-center gap-1.5"
          >
            {/* Dudu & Bubu Mini SVG Corner Reaction */}
            <div className="relative flex items-center gap-1">
              {/* Bubu hiding behind Dudu when headphones/fallen */}
              <div
                className={`transition-transform duration-300 ${
                  scene.duduCorner === 'headphones' ? 'translate-x-3 scale-90 opacity-90' : ''
                }`}
              >
                <span className="text-lg sm:text-xl leading-none">
                  {scene.duduCorner === 'fallen'
                    ? '🐼🙉'
                    : scene.duduCorner === 'dead'
                    ? '😭💀'
                    : '🐼'}
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="text-lg sm:text-xl leading-none">🐻</span>
                {scene.duduCorner === 'headphones' && (
                  <span className="ml-0.5 text-sm sm:text-base">🎧</span>
                )}
              </div>
            </div>
            <span className="text-sm sm:text-base leading-none">
              {scene.duduCorner === 'calm'
                ? '🙂'
                : scene.duduCorner === 'neutral'
                ? '😐'
                : scene.duduCorner === 'shocked'
                ? '😳'
                : scene.duduCorner === 'crying'
                ? '😭'
                : scene.duduCorner === 'headphones'
                ? '🎧'
                : scene.duduCorner === 'fallen'
                ? '😵'
                : ''}
            </span>
          </motion.div>
        </div>

        {/* EVA SITTING ON THE COUCH */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[20%] z-10 flex flex-col items-center pointer-events-none">
          {/* Eva speech bubble */}
          <AnimatePresence>
            {scene.evaBubble && (
              <motion.div
                key={scene.evaBubble}
                initial={{ opacity: 0, scale: 0.8, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mb-1 rounded-2xl bg-white px-3 py-1.5 text-xs sm:text-sm font-display font-extrabold text-[#2d1b3d] shadow-md border border-pink-200 whitespace-nowrap"
              >
                {scene.evaBubble}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cute Cartoon Eva SVG */}
          <motion.svg
            viewBox="0 0 110 115"
            className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-sm"
            animate={
              scene.evaMood === 'defeated'
                ? { y: 4, rotate: -3 }
                : scene.evaMood === 'ears_covered'
                ? { x: [-2, 2, -2, 2, 0] }
                : { y: [0, -2, 0] }
            }
            transition={{
              duration: scene.evaMood === 'ears_covered' ? 0.35 : 2.6,
              repeat: scene.evaMood === 'ears_covered' ? Infinity : Infinity,
            }}
          >
            {/* Hair back */}
            <path d="M24 44 Q24 14 55 14 Q86 14 86 44 L89 78 Q55 86 21 78 Z" fill="#4A2C40" />
            {/* Cozy Lavender Sweater */}
            <path d="M30 76 Q55 68 80 76 L84 106 L26 106 Z" fill="#C084FC" stroke="#4A3248" strokeWidth="2.8" />
            {/* Head */}
            <circle cx="55" cy="50" r="24" fill="#FDE2C8" stroke="#4A3248" strokeWidth="2.8" />
            {/* Hair bangs */}
            <path d="M31 44 Q42 22 55 30 Q68 22 79 44 Q67 34 55 38 Q43 34 31 44 Z" fill="#4A2C40" />
            {/* Blush */}
            <ellipse cx="40" cy="55" rx="4.5" ry="2.5" fill="#F472B6" opacity="0.55" />
            <ellipse cx="70" cy="55" rx="4.5" ry="2.5" fill="#F472B6" opacity="0.55" />

            {/* Facial expressions */}
            {scene.evaMood === 'peaceful' ? (
              <>
                <path d="M41 49 Q45 45 49 49" fill="none" stroke="#4A3248" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M61 49 Q65 45 69 49" fill="none" stroke="#4A3248" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M49 58 Q55 63 61 58" fill="none" stroke="#4A3248" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : scene.evaMood === 'ears_covered' ? (
              <>
                <path d="M41 46 L48 50 L41 53" fill="none" stroke="#4A3248" strokeWidth="2.6" strokeLinecap="round" />
                <path d="M69 46 L62 50 L69 53" fill="none" stroke="#4A3248" strokeWidth="2.6" strokeLinecap="round" />
                <ellipse cx="55" cy="60" rx="4" ry="3.2" fill="#FB7185" stroke="#4A3248" strokeWidth="2" />
                {/* Hands over ears */}
                <circle cx="28" cy="51" r="7.5" fill="#FDE2C8" stroke="#4A3248" strokeWidth="2.5" />
                <circle cx="82" cy="51" r="7.5" fill="#FDE2C8" stroke="#4A3248" strokeWidth="2.5" />
              </>
            ) : scene.evaMood === 'look_away' ? (
              <>
                <circle cx="62" cy="49" r="3" fill="#4A3248" />
                <circle cx="72" cy="49" r="3" fill="#4A3248" />
                <line x1="57" y1="59" x2="67" y2="59" stroke="#4A3248" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : scene.evaMood === 'annoyed' ? (
              <>
                <path d="M40 43 L49 46" stroke="#4A3248" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M70 43 L61 46" stroke="#4A3248" strokeWidth="2.4" strokeLinecap="round" />
                <circle cx="45" cy="50" r="3.1" fill="#4A3248" />
                <circle cx="65" cy="50" r="3.1" fill="#4A3248" />
                <path d="M49 60 Q55 57 61 60" fill="none" stroke="#4A3248" strokeWidth="2.4" strokeLinecap="round" />
              </>
            ) : scene.evaMood === 'defeated' ? (
              <>
                <line x1="40" y1="49" x2="49" y2="49" stroke="#4A3248" strokeWidth="2.6" strokeLinecap="round" />
                <line x1="61" y1="49" x2="70" y2="49" stroke="#4A3248" strokeWidth="2.6" strokeLinecap="round" />
                <path d="M49 60 Q55 56 61 60" fill="none" stroke="#4A3248" strokeWidth="2.3" strokeLinecap="round" />
              </>
            ) : (
              /* staring */
              <>
                <circle cx="45" cy="49" r="3.2" fill="#4A3248" />
                <circle cx="65" cy="49" r="3.2" fill="#4A3248" />
                <line x1="50" y1="59" x2="60" y2="59" stroke="#4A3248" strokeWidth="2.4" strokeLinecap="round" />
              </>
            )}
          </motion.svg>
        </div>

        {/* CHARLIE: THE COMPLETELY BLACK MISCHIEVOUS DOG */}
        <motion.div
          animate={{
            left: `${scene.charliePos.x}%`,
            top: `${scene.charliePos.y}%`,
            y:
              scene.charliePose === 'bark'
                ? [0, -10, 0]
                : scene.charliePose === 'run'
                ? [0, -8, 0]
                : 0,
            rotate:
              scene.charliePose === 'run'
                ? [-6, 6, -6]
                : scene.charliePose === 'stare'
                ? -4
                : 0,
          }}
          transition={{
            left: { duration: scene.charliePose === 'run' ? 0.35 : 0.7, ease: 'easeInOut' },
            top: { duration: 0.45 },
            y: {
              duration: scene.charliePose === 'bark' ? 0.35 : 0.25,
              repeat: scene.charliePose === 'bark' || scene.charliePose === 'run' ? Infinity : 0,
            },
            rotate: {
              duration: 0.25,
              repeat: scene.charliePose === 'run' ? Infinity : 0,
            },
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none"
        >
          {/* Charlie speech bubble */}
          <AnimatePresence>
            {scene.charlieBubble && (
              <motion.div
                key={scene.charlieBubble}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="mb-1 rounded-2xl bg-[#111118] text-white px-3 py-1 text-xs sm:text-sm font-display font-extrabold shadow-lg border border-pink-400/50 whitespace-nowrap"
              >
                {scene.charlieBubble}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Angel Halo when given a treat */}
          {scene.charliePose === 'angel' && (
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-10 h-3 rounded-full border-[3px] border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)] -mb-1"
            />
          )}

          {/* Cute Completely Black Dog SVG (Charlie) */}
          <svg
            viewBox="0 0 110 100"
            className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md"
            style={{ transform: scene.charlieFlip ? 'scaleX(-1)' : undefined }}
          >
            {/* Soft ground shadow */}
            <ellipse cx="52" cy="90" rx="28" ry="6" fill="rgba(45,27,61,0.18)" />

            {/* Wagging tail */}
            <motion.path
              d="M25 65 Q10 46 18 35"
              fill="none"
              stroke="#14141B"
              strokeWidth="8"
              strokeLinecap="round"
              animate={{ rotate: [0, 18, -10, 0] }}
              transition={{
                duration: scene.charliePose === 'angel' || scene.charliePose === 'bark' ? 0.35 : 0.8,
                repeat: Infinity,
              }}
              style={{ transformOrigin: '25px 65px' }}
            />

            {/* Completely Black Fluffy Body */}
            <ellipse cx="48" cy="68" rx="23" ry="17" fill="#14141B" />
            {/* Cute glossy fur sheen */}
            <path d="M36 58 Q48 53 60 58" fill="none" stroke="#313142" strokeWidth="2.5" strokeLinecap="round" />

            {/* Paws / Legs */}
            <rect x="31" y="75" width="8" height="14" rx="4" fill="#14141B" />
            <rect x="43" y="76" width="8" height="13" rx="4" fill="#14141B" />
            <rect x="57" y="75" width="8" height="14" rx="4" fill="#14141B" />

            {/* Cute Collar */}
            <path d="M51 54 Q63 59 73 53" fill="none" stroke="#EC4899" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="65" cy="59" r="3" fill="#FDE047" />

            {/* Head */}
            <circle cx="67" cy="40" r="20" fill="#14141B" />

            {/* Floppy Ears */}
            <motion.ellipse
              cx="51"
              cy="34"
              rx="6.5"
              ry="13"
              transform="rotate(20 51 34)"
              fill="#1E1E29"
              animate={scene.charliePose === 'bark' ? { rotate: [20, 8, 20] } : undefined}
              transition={{ duration: 0.35, repeat: Infinity }}
            />
            <motion.ellipse
              cx="83"
              cy="34"
              rx="6.5"
              ry="13"
              transform="rotate(-20 83 34)"
              fill="#1E1E29"
              animate={scene.charliePose === 'bark' ? { rotate: [-20, -8, -20] } : undefined}
              transition={{ duration: 0.35, repeat: Infinity }}
            />

            {/* Expressive Eyes (👁️👁️ wide stare or blinking!) */}
            {blink && scene.charliePose !== 'stare' ? (
              <>
                <line x1="57" y1="38" x2="64" y2="38" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="71" y1="38" x2="78" y2="38" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle
                  cx="60"
                  cy="38"
                  r={scene.charliePose === 'stare' ? 5.2 : 4.1}
                  fill="#FFFFFF"
                />
                <circle
                  cx="75"
                  cy="38"
                  r={scene.charliePose === 'stare' ? 5.2 : 4.1}
                  fill="#FFFFFF"
                />
                <circle
                  cx={scene.charliePose === 'stare' ? 60 : 61}
                  cy="38"
                  r={scene.charliePose === 'stare' ? 2.4 : 2.2}
                  fill="#111118"
                />
                <circle
                  cx={scene.charliePose === 'stare' ? 75 : 76}
                  cy="38"
                  r={scene.charliePose === 'stare' ? 2.4 : 2.2}
                  fill="#111118"
                />
              </>
            )}

            {/* Cute glossy nose */}
            <ellipse cx="68" cy="45" rx="4" ry="2.7" fill="#3B3B4F" />
            <ellipse cx="67" cy="44.2" rx="1.3" ry="0.8" fill="#FFFFFF" opacity="0.5" />

            {/* Mouth (open barking vs cute tiny tongue vs smug smile) */}
            {scene.charliePose === 'bark' ? (
              <ellipse cx="68" cy="51" rx="4.5" ry="4" fill="#FB7185" />
            ) : scene.charliePose === 'angel' ? (
              <>
                <path d="M63 49 Q68 53 73 49" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
                <ellipse cx="68" cy="52.5" rx="2.5" ry="3.2" fill="#F472B6" />
              </>
            ) : (
              <path d="M64 49 Q68 51.5 72 49" fill="none" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>

          {/* Floating Treat Bone when given */}
          {scene.showTreat && (
            <motion.span
              initial={{ y: -30, opacity: 0, scale: 0.7 }}
              animate={{ y: 0, opacity: 1, scale: 1.15 }}
              className="absolute -right-5 bottom-4 text-2xl"
            >
              🦴
            </motion.span>
          )}
        </motion.div>

        {/* Floating Comic-Style "WOOF!" texts */}
        <AnimatePresence>
          {scene.floatingBarks.map((b) => (
            <motion.span
              key={b.id}
              initial={{ opacity: 1, scale: 0.6, y: 0 }}
              animate={{ opacity: 0, scale: 1.35, y: -34 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85 }}
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
              className="absolute -translate-x-1/2 pointer-events-none z-30 font-display font-extrabold text-base sm:text-xl text-pink-600 drop-shadow-[0_2px_0_rgba(255,255,255,0.95)]"
            >
              {b.text}
            </motion.span>
          ))}
        </AnimatePresence>

        {/* FINAL FREEZE-FRAME SCOREBOARD OVERLAY */}
        <AnimatePresence>
          {scene.frozen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="absolute inset-0 z-40 bg-[#1a0b2e]/55 backdrop-blur-[2px] flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl p-5 sm:p-7 text-center shadow-2xl border-2 border-pink-300 max-w-xs w-full space-y-3">
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#2d1b3d]">
                  {t.winsHeading}
                </div>
                <div className="flex items-center justify-center gap-4 text-sm sm:text-base font-bold text-[#5b3d72] font-mono-nums">
                  <span>{t.evaScore}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-pink-600">{t.charlieScore}</span>
                </div>
                <div className="text-2xl">😭💀</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Action Result Banner */}
      {actionResult && (phase === 'interactive' || phase === 'acting') && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-pink-50 border border-pink-200 px-4 py-3 text-center font-display font-bold text-sm sm:text-base text-[#2d1b3d]"
        >
          {actionResult}
        </motion.div>
      )}

      {/* Interactive Controls Section */}
      {(phase === 'interactive' || phase === 'acting') && (
        <div className="space-y-3">
          {usedActions.length < 3 && (
            <p className="text-xs sm:text-sm font-semibold text-center text-[#6b4d82]">
              {t.tryAllThreeHint} ({usedActions.length}/3)
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              disabled={phase !== 'interactive'}
              onClick={handleStop}
              className={`min-h-[54px] px-4 py-3 rounded-2xl font-display font-bold text-sm sm:text-base border transition-all cursor-pointer disabled:opacity-60 ${
                usedActions.includes('stop')
                  ? 'bg-purple-100/80 border-purple-300 text-[#4b2d63]'
                  : 'bg-white border-pink-200 text-[#2d1b3d] hover:border-pink-400 hover:bg-pink-50 shadow-sm'
              }`}
            >
              {t.stopBtn} {usedActions.includes('stop') ? '✓' : ''}
            </button>

            <button
              type="button"
              disabled={phase !== 'interactive'}
              onClick={handleTreat}
              className={`min-h-[54px] px-4 py-3 rounded-2xl font-display font-bold text-sm sm:text-base border transition-all cursor-pointer disabled:opacity-60 ${
                usedActions.includes('treat')
                  ? 'bg-purple-100/80 border-purple-300 text-[#4b2d63]'
                  : 'bg-white border-pink-200 text-[#2d1b3d] hover:border-pink-400 hover:bg-pink-50 shadow-sm'
              }`}
            >
              {t.treatBtn} {usedActions.includes('treat') ? '✓' : ''}
            </button>

            <button
              type="button"
              disabled={phase !== 'interactive'}
              onClick={handleIgnore}
              className={`min-h-[54px] px-4 py-3 rounded-2xl font-display font-bold text-sm sm:text-base border transition-all cursor-pointer disabled:opacity-60 ${
                usedActions.includes('ignore')
                  ? 'bg-purple-100/80 border-purple-300 text-[#4b2d63]'
                  : 'bg-white border-pink-200 text-[#2d1b3d] hover:border-pink-400 hover:bg-pink-50 shadow-sm'
              }`}
            >
              {t.ignoreBtn} {usedActions.includes('ignore') ? '✓' : ''}
            </button>
          </div>
        </div>
      )}

      {/* Post-Finale Buttons: RUN IT AGAIN & CHARLIE, PLEASE 😭 */}
      {(phase === 'done' || phase === 'finale') && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={runIntroSequence}
            className="w-full sm:w-auto min-h-[52px] px-7 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-display font-extrabold text-sm sm:text-base inline-flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.runAgain}</span>
          </button>

          <button
            type="button"
            disabled={phase !== 'done'}
            onClick={handleCharliePlease}
            className="w-full sm:w-auto min-h-[52px] px-7 py-3 rounded-2xl bg-[#2d1b3d] hover:bg-[#3f2656] text-white font-display font-extrabold text-sm sm:text-base inline-flex items-center justify-center gap-2 shadow-md disabled:opacity-60 cursor-pointer"
          >
            <span>{t.charliePlease}</span>
          </button>
        </div>
      )}
    </div>
  );
};
