import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, RotateCcw } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import type { AchievementId, EasterEggId, Language } from '../types/app';

interface AchievementsDrawerProps {
  open: boolean;
  onClose: () => void;
  lang: Language;
  unlockedAchievements: AchievementId[];
  foundEasterEggs: EasterEggId[];
  onResetAll: () => void;
}

const ALL_ACHIEVEMENTS: AchievementId[] = [
  'first_click',
  'compliment_collector',
  'certified_raccoon',
  'quiz_master',
  'roulette_survivor',
  'secret_finder',
  'reasons_100',
  'final_boss',
];

export const AchievementsDrawer: React.FC<AchievementsDrawerProps> = ({
  open,
  onClose,
  lang,
  unlockedAchievements,
  foundEasterEggs,
  onResetAll,
}) => {
  const t = TRANSLATIONS[lang].achievements;
  const te = TRANSLATIONS[lang].easterEggs;
  const [confirmReset, setConfirmReset] = useState(false);

  const handleResetClick = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      window.setTimeout(() => setConfirmReset(false), 3500);
      return;
    }
    setConfirmReset(false);
    onResetAll();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1a0b2e]/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative z-10 w-full sm:max-w-lg max-h-[85dvh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl border border-pink-200"
          >
            {/* Mobile drag handle visual */}
            <div className="w-10 h-1.5 bg-purple-200 rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#2d1b3d] flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-pink-500" />
                  <span>{t.drawerTitle}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#6b4d82] mt-0.5">{t.drawerSubtitle}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="min-w-[44px] min-h-[44px] rounded-xl bg-purple-50 hover:bg-purple-100 text-[#2d1b3d] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#5b3d72] pb-3 mb-4 border-b border-purple-100">
              <span>
                {t.unlockedCount}:{' '}
                <strong className="font-mono-nums text-pink-600">
                  {unlockedAchievements.length} / {ALL_ACHIEVEMENTS.length}
                </strong>
              </span>
              <span>
                {te.counterLabel}:{' '}
                <strong className="font-mono-nums text-purple-600">
                  {foundEasterEggs.length} / 6
                </strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ALL_ACHIEVEMENTS.map((id) => {
                const isUnlocked = unlockedAchievements.includes(id);
                const info = t.items[id];
                return (
                  <div
                    key={id}
                    className={`rounded-2xl p-3.5 border transition-colors ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200'
                        : 'bg-slate-50/70 border-slate-200/70 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl leading-none shrink-0" aria-hidden="true">
                        {isUnlocked ? info.icon : '🔒'}
                      </span>
                      <div className="space-y-0.5 min-w-0">
                        <div className="font-display font-bold text-sm text-[#2d1b3d]">
                          {info.title}
                        </div>
                        <p className="text-xs text-[#5b3d72] leading-snug">{info.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-purple-100 flex justify-center">
              <button
                type="button"
                onClick={handleResetClick}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                  confirmReset
                    ? 'bg-rose-500 text-white'
                    : 'text-[#7e5e96] hover:text-rose-600 hover:bg-rose-50'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{confirmReset ? t.resetConfirm : t.resetProgress}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
