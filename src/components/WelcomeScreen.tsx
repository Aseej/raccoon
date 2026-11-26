import React from 'react';
import { motion } from 'motion/react';
import { DuduBubu } from './DuduBubu';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../types/app';

interface WelcomeScreenProps {
  lang: Language;
  onEnter: () => void;
  onBoop: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ lang, onEnter, onBoop }) => {
  const t = TRANSLATIONS[lang].welcome;

  return (
    <section className="min-h-[calc(100dvh-76px)] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card w-full max-w-2xl rounded-[32px] p-6 sm:p-10 text-center relative overflow-hidden"
      >
        <div className="flex flex-col items-center gap-6">
          <DuduBubu mood="welcome" size="lg" onBoop={onBoop} />

          <div className="space-y-3 max-w-lg mx-auto">
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2d1b3d] leading-tight text-balance">
              {t.title}
            </h1>
            <p className="text-base sm:text-lg text-[#5b3d72] leading-relaxed text-balance">
              {t.subtitle}
            </p>
          </div>

          <motion.button
            type="button"
            onClick={onEnter}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto min-h-[54px] px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white font-display font-bold text-base sm:text-lg shadow-[0_14px_34px_-8px_rgba(236,72,153,0.55)] hover:shadow-[0_18px_40px_-8px_rgba(236,72,153,0.7)] transition-shadow cursor-pointer"
          >
            {t.cta}
          </motion.button>

          <p className="text-xs sm:text-sm text-[#7e5e96]">{t.helper}</p>
        </div>
      </motion.div>
    </section>
  );
};
