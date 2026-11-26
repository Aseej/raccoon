import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Sparkles, RotateCcw } from 'lucide-react';
import { DuduBubu } from './DuduBubu';
import { FINAL_BOSS_LINES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../types/app';

interface FinalBossProps {
  lang: Language;
  unlocked: boolean;
  completedCount: number;
  neededCount: number;
  onDefeat: () => void;
  onRestartWorld: () => void;
  onBurst: (type: 'hearts' | 'confetti' | 'raccoon') => void;
  onBoop: () => void;
}

export const FinalBoss: React.FC<FinalBossProps> = ({
  lang,
  unlocked,
  completedCount,
  neededCount,
  onDefeat,
  onRestartWorld,
  onBurst,
  onBoop,
}) => {
  const t = TRANSLATIONS[lang].final;
  const [started, setStarted] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const handleReady = () => {
    if (started) return;
    setStarted(true);
    setVisibleLines(1);
    onBurst('hearts');

    FINAL_BOSS_LINES.forEach((_, idx) => {
      if (idx === 0) return;
      const id = window.setTimeout(() => {
        setVisibleLines(idx + 1);
        if (idx === FINAL_BOSS_LINES.length - 1) {
          onDefeat();
          onBurst('confetti');
        }
      }, idx * 1450);
      timersRef.current.push(id);
    });
  };

  if (!unlocked) {
    return (
      <div className="glass-card rounded-[32px] p-6 sm:p-10 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2d1b3d]">
            {t.lockedTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#5b3d72]">{t.lockedSubtitle}</p>
        </div>
        <div className="font-mono-nums text-sm font-bold text-pink-600">
          {t.lockedProgress
            .replace('{done}', String(completedCount))
            .replace('{needed}', String(neededCount))}
        </div>
        <p className="text-xs sm:text-sm text-[#7e5e96] max-w-md mx-auto">{t.unlockTip}</p>
      </div>
    );
  }

  const allRevealed = visibleLines >= FINAL_BOSS_LINES.length;

  return (
    <div className="glass-card-dark rounded-[32px] p-6 sm:p-10 text-center text-purple-50 relative overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
        <DuduBubu mood={allRevealed ? 'celebration' : 'final'} size="lg" nightMode onBoop={onBoop} />

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-pink-300">
            <Sparkles className="w-4 h-4" />
            <span>{t.title}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white text-balance">
            {t.subtitle}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {!started ? (
            <motion.button
              key="ready"
              type="button"
              onClick={handleReady}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto min-h-[56px] px-10 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-display font-extrabold text-base sm:text-lg shadow-[0_0_32px_rgba(236,72,153,0.6)] cursor-pointer"
            >
              {t.readyButton}
            </motion.button>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full space-y-4 pt-2"
            >
              {FINAL_BOSS_LINES.slice(0, visibleLines).map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`leading-relaxed ${
                    idx === FINAL_BOSS_LINES.length - 1
                      ? 'font-display text-lg sm:text-xl font-bold text-pink-200 pt-2'
                      : 'text-base sm:text-lg text-purple-100/95'
                  }`}
                >
                  {line[lang]}
                </motion.p>
              ))}

              {allRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 space-y-4 border-t border-purple-400/20"
                >
                  <div className="font-display text-xl sm:text-2xl font-extrabold text-white">
                    {t.theEnd}
                  </div>
                  <button
                    type="button"
                    onClick={onRestartWorld}
                    className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-2xl bg-white text-[#2d1b3d] font-display font-extrabold text-sm sm:text-base inline-flex items-center justify-center gap-2 shadow-lg hover:bg-pink-50 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{t.restartButton}</span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
