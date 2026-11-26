import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { DuduBubu } from './DuduBubu';
import { MOOD_RESCUE_DATA } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import type { Language, MoodOptionId } from '../types/app';

interface MoodRescueProps {
  lang: Language;
  onSelectMood: (moodId: MoodOptionId) => void;
  onBurst: (type: 'hearts' | 'confetti' | 'raccoon') => void;
  onBoop: () => void;
  onTriggerDoNotPress: () => void;
}

const MOOD_KEYS: MoodOptionId[] = ['sad', 'tired', 'bored', 'angry', 'affection', 'raccoon'];

export const MoodRescue: React.FC<MoodRescueProps> = ({
  lang,
  onSelectMood,
  onBurst,
  onBoop,
  onTriggerDoNotPress,
}) => {
  const t = TRANSLATIONS[lang].mood;
  const [selected, setSelected] = useState<MoodOptionId | null>(null);
  const [responseIndex, setResponseIndex] = useState(0);

  const activeConfig = selected ? MOOD_RESCUE_DATA[selected] : null;

  const handleChoose = (moodId: MoodOptionId) => {
    setSelected(moodId);
    setResponseIndex(0);
    onSelectMood(moodId);
    onBurst(moodId === 'raccoon' ? 'raccoon' : 'hearts');
  };

  const handleMakeBetter = () => {
    if (!activeConfig) return;
    setResponseIndex((prev) => (prev + 1) % activeConfig.responses.length);
    onBurst(activeConfig.id === 'raccoon' ? 'confetti' : 'hearts');
  };

  return (
    <div className="glass-card rounded-[32px] p-5 sm:p-8 lg:p-10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Character reaction column */}
        <div className="lg:col-span-5 flex flex-col items-center text-center gap-4">
          <DuduBubu
            mood={activeConfig ? activeConfig.mood : 'happy'}
            size="lg"
            onBoop={onBoop}
          />
          <div className="space-y-1">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2d1b3d] text-balance">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-[#5b3d72]">{t.subtitle}</p>
          </div>
        </div>

        {/* Mood buttons & Rescue message */}
        <div className="lg:col-span-7 space-y-5">
          <p className="text-sm font-semibold text-[#6b4d82] text-center lg:text-left">
            {t.choosePrompt}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {MOOD_KEYS.map((key) => {
              const isActive = selected === key;
              return (
                <motion.button
                  key={key}
                  type="button"
                  onClick={() => handleChoose(key)}
                  whileTap={{ scale: 0.96 }}
                  className={`min-h-[52px] px-3 py-3 rounded-2xl font-display font-bold text-sm sm:text-base transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-[#2d1b3d] text-white border-[#2d1b3d] shadow-md'
                      : 'bg-white/85 text-[#2d1b3d] border-purple-200 hover:border-pink-400 hover:bg-pink-50/70'
                  }`}
                >
                  {t.options[key]}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {activeConfig && (
              <motion.div
                key={`${activeConfig.id}-${responseIndex}`}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`rounded-3xl bg-gradient-to-br ${activeConfig.accent} border border-pink-200/80 p-5 sm:p-6 space-y-4 ${
                  activeConfig.id === 'raccoon' ? 'animate-shake-soft' : ''
                }`}
              >
                <p className="font-display text-base sm:text-lg font-bold text-[#2d1b3d] leading-relaxed">
                  {activeConfig.responses[responseIndex][lang]}
                </p>
                <button
                  type="button"
                  onClick={handleMakeBetter}
                  className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-display font-extrabold text-sm inline-flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.makeBetter}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Easter Egg #5: Tiny suspicious 'do not press' speck */}
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={onTriggerDoNotPress}
              className="text-[11px] text-[#9b7fb0] hover:text-pink-600 underline decoration-dotted cursor-pointer py-2 px-2"
            >
              {lang === 'ru' ? 'не нажимать' : 'do not press'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
