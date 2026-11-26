import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { DuduBubu } from './DuduBubu';
import { MILESTONE_MESSAGES, REASONS_100 } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import type { DuduBubuMood, Language } from '../types/app';

interface Reasons100Props {
  lang: Language;
  unlockedCount: number;
  onUnlockNext: () => void;
  onBurst: (type: 'hearts' | 'confetti' | 'raccoon') => void;
  onBoop: () => void;
}

export const Reasons100: React.FC<Reasons100Props> = ({
  lang,
  unlockedCount,
  onUnlockNext,
  onBurst,
  onBoop,
}) => {
  const t = TRANSLATIONS[lang].reasons;
  const [showList, setShowList] = useState(false);

  const isComplete = unlockedCount >= REASONS_100.length;
  const latestReason = unlockedCount > 0 ? REASONS_100[unlockedCount - 1] : null;
  const isMilestone = unlockedCount > 0 && unlockedCount % 10 === 0;
  const milestoneText = isMilestone ? MILESTONE_MESSAGES[unlockedCount] : null;

  const mood: DuduBubuMood = isComplete
    ? 'final'
    : isMilestone
    ? 'celebration'
    : unlockedCount > 0
    ? 'happy'
    : 'compliment';

  const handleUnlock = () => {
    if (isComplete) return;
    const next = unlockedCount + 1;
    onUnlockNext();
    if (next % 10 === 0 || next === 100) {
      onBurst('confetti');
    } else {
      onBurst('hearts');
    }
  };

  const unlockedSlice = REASONS_100.slice(0, unlockedCount);

  return (
    <div className="glass-card rounded-[32px] p-5 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Character + Progress Ring / Counter */}
        <div className="lg:col-span-5 flex flex-col items-center text-center gap-4">
          <DuduBubu mood={mood} size="lg" onBoop={onBoop} />
          <div className="space-y-2 w-full max-w-[260px]">
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#6b4d82]">
              <span>{t.unlockedLabel}</span>
              <span className="font-mono-nums text-pink-600 font-bold">
                {unlockedCount} / {REASONS_100.length}
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-purple-100 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500"
                animate={{ width: `${(unlockedCount / REASONS_100.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Right: Unlock Card */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-1.5 text-center lg:text-left">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2d1b3d] text-balance">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-[#5b3d72]">{t.subtitle}</p>
          </div>

          <div className="min-h-[168px] rounded-3xl bg-gradient-to-br from-white/95 via-pink-50/75 to-purple-50/80 border border-pink-200 p-6 flex flex-col items-center justify-center text-center">
            {latestReason ? (
              <motion.div
                key={unlockedCount}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2.5"
              >
                <div className="font-mono-nums text-xs font-extrabold text-pink-600">
                  #{unlockedCount}
                </div>
                <p className="font-display text-xl sm:text-2xl font-bold text-[#2d1b3d] leading-snug">
                  {latestReason[lang]}
                </p>
                {milestoneText && (
                  <p className="text-xs sm:text-sm font-bold text-purple-700 pt-1">
                    🎉 {milestoneText[lang]}
                  </p>
                )}
              </motion.div>
            ) : (
              <p className="text-sm sm:text-base text-[#7e5e96]">{t.tapToStart}</p>
            )}
          </div>

          {isComplete ? (
            <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white p-5 text-center space-y-1 shadow-lg">
              <div className="font-display text-xl font-extrabold">{t.completeTitle}</div>
              <p className="text-sm sm:text-base text-pink-50">{t.completeBody}</p>
            </div>
          ) : (
            <motion.button
              type="button"
              onClick={handleUnlock}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full min-h-[56px] px-6 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-display font-extrabold text-sm sm:text-base shadow-[0_12px_30px_-8px_rgba(236,72,153,0.5)] flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-current animate-heartbeat" />
              <span>{t.unlockButton}</span>
            </motion.button>
          )}

          {unlockedCount > 0 && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowList((s) => !s)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple-700 hover:text-pink-600 cursor-pointer py-1"
              >
                {showList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span>
                  {t.recentTitle} ({unlockedCount})
                </span>
              </button>

              <AnimatePresence>
                {showList && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 max-h-56 overflow-y-auto rounded-2xl bg-white/75 border border-purple-100 p-4 space-y-2 text-left">
                      {[...unlockedSlice].reverse().map((reason, idx) => {
                        const num = unlockedCount - idx;
                        return (
                          <div
                            key={num}
                            className="text-sm text-[#2d1b3d] border-b border-purple-100/70 last:border-b-0 pb-1.5 flex items-baseline gap-2.5"
                          >
                            <span className="font-mono-nums text-xs font-bold text-pink-600 shrink-0">
                              {num}.
                            </span>
                            <span>{reason[lang]}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
