import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { DuduBubu } from './DuduBubu';
import { COMPLIMENTS, COMPLIMENT_LOADING_SEQUENCES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import type { ComplimentCategory, DuduBubuMood, Language } from '../types/app';

interface ComplimentMachineProps {
  lang: Language;
  count: number;
  onDispense: () => void;
  onBurst: (type: 'hearts' | 'confetti' | 'raccoon') => void;
  onBoop: () => void;
}

const CATEGORIES: Array<'all' | ComplimentCategory> = [
  'all',
  'spicy',
  'flirty',
  'romantic',
  'cute',
  'soft',
  'princess',
  'raccoon',
  'funny',
];

export const ComplimentMachine: React.FC<ComplimentMachineProps> = ({
  lang,
  count,
  onDispense,
  onBurst,
  onBoop,
}) => {
  const t = TRANSLATIONS[lang].compliments;
  const [selectedCat, setSelectedCat] = useState<'all' | ComplimentCategory>('all');
  const [currentText, setCurrentText] = useState<string | null>(null);
  const [currentCat, setCurrentCat] = useState<ComplimentCategory | null>(null);
  const [dispenseTick, setDispenseTick] = useState(0);
  const [systemStatus, setSystemStatus] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [mood, setMood] = useState<DuduBubuMood>('compliment');
  const lastIndexRef = useRef<number>(-1);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const handlePress = () => {
    if (isScanning) return;
    clearTimers();

    // ~24% chance of showing a funny fake system diagnostic sequence when on 'all'
    const triggerFakeScan = selectedCat === 'all' && Math.random() < 0.24;

    if (triggerFakeScan) {
      setIsScanning(true);
      setMood('confused');
      const seq =
        COMPLIMENT_LOADING_SEQUENCES[
          Math.floor(Math.random() * COMPLIMENT_LOADING_SEQUENCES.length)
        ];

      setSystemStatus(seq[0][lang]);

      const t1 = window.setTimeout(() => {
        setSystemStatus(seq[1][lang]);
        setMood('shocked');
      }, 600);

      const t2 = window.setTimeout(() => {
        setSystemStatus(null);
        setCurrentText(seq[2][lang]);
        setCurrentCat('spicy');
        setDispenseTick((v) => v + 1);
        setMood('kiss');
        setIsScanning(false);
        onDispense();
        onBurst('hearts');
      }, 1250);

      timersRef.current.push(t1, t2);
      return;
    }

    const pool =
      selectedCat === 'all'
        ? COMPLIMENTS
        : COMPLIMENTS.filter((c) => c.category === selectedCat);

    let nextIdx = Math.floor(Math.random() * pool.length);
    if (pool.length > 1 && nextIdx === lastIndexRef.current) {
      nextIdx = (nextIdx + 1) % pool.length;
    }
    lastIndexRef.current = nextIdx;

    const picked = pool[nextIdx];
    setCurrentText(picked.text[lang]);
    setCurrentCat(picked.category);
    setDispenseTick((v) => v + 1);
    setMood(
      picked.category === 'funny' || picked.category === 'raccoon'
        ? 'laughing'
        : picked.category === 'spicy' || picked.category === 'flirty'
        ? 'kiss'
        : 'compliment'
    );
    onDispense();
    onBurst('hearts');
  };

  return (
    <div className="glass-card rounded-[32px] p-5 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left/Top: Character + Counter */}
        <div className="lg:col-span-5 flex flex-col items-center text-center gap-4">
          <DuduBubu mood={mood} size="lg" onBoop={onBoop} />
          <div className="text-xs sm:text-sm text-[#6b4d82] font-medium flex items-center gap-2">
            <span>{t.countLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-nums font-bold text-pink-600">{count}</span>
          </div>
        </div>

        {/* Right/Bottom: Interactive Machine */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="space-y-1.5 text-center lg:text-left">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2d1b3d] text-balance">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-[#5b3d72]">{t.subtitle}</p>
          </div>

          {/* Category filter segmented buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = selectedCat === cat;
              const label = cat === 'all' ? t.categoryAll : t.categories[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCat(cat);
                    lastIndexRef.current = -1;
                  }}
                  className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? cat === 'spicy'
                        ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-sm'
                        : 'bg-[#2d1b3d] text-white shadow-sm'
                      : cat === 'spicy'
                      ? 'bg-rose-100/80 text-rose-700 hover:bg-rose-200/80'
                      : 'bg-purple-100/70 text-[#4b2d63] hover:bg-purple-200/70'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Display screen */}
          <div
            className={`min-h-[144px] rounded-2xl border p-5 flex flex-col justify-center items-center text-center relative overflow-hidden transition-colors ${
              currentCat === 'spicy' && !isScanning
                ? 'bg-gradient-to-br from-rose-50/95 via-pink-50/90 to-fuchsia-50/85 border-rose-300/80'
                : 'bg-gradient-to-br from-white/90 via-pink-50/70 to-purple-50/80 border-pink-200/70'
            }`}
          >
            {isScanning && systemStatus ? (
              <motion.div
                key={systemStatus}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-purple-500 animate-spin" />
                <p className="font-mono-nums text-sm sm:text-base font-semibold text-purple-700">
                  {systemStatus}
                </p>
              </motion.div>
            ) : currentText ? (
              <motion.div
                key={`${dispenseTick}-${lang}`}
                initial={{ opacity: 0, scale: 0.95, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                {currentCat && (
                  <div
                    className={`text-xs font-semibold ${
                      currentCat === 'spicy' ? 'text-rose-600' : 'text-pink-600'
                    }`}
                  >
                    {t.categories[currentCat]}
                  </div>
                )}
                <p className="font-display text-lg sm:text-xl font-bold text-[#2d1b3d] leading-snug">
                  “{currentText}”
                </p>
              </motion.div>
            ) : (
              <p className="text-sm sm:text-base text-[#7e5e96]">{t.initialPrompt}</p>
            )}
          </div>

          {/* Big tactile button */}
          <motion.button
            type="button"
            onClick={handlePress}
            disabled={isScanning}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
            className="w-full min-h-[56px] px-6 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-display font-extrabold text-sm sm:text-base tracking-wide shadow-[0_12px_30px_-8px_rgba(236,72,153,0.5)] hover:shadow-[0_16px_36px_-8px_rgba(236,72,153,0.65)] disabled:opacity-75 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-current shrink-0" />
            <span className="text-center leading-snug">{t.cta}</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
