import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DoorOpen, RefreshCw } from 'lucide-react';
import { DuduBubu } from './DuduBubu';
import { FATE_DOORS } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../types/app';

interface FateDoorsProps {
  lang: Language;
  openedDoors: number[];
  onOpenDoor: (doorId: number) => void;
  onBurst: (type: 'hearts' | 'confetti' | 'raccoon') => void;
  onBoop: () => void;
}

export const FateDoors: React.FC<FateDoorsProps> = ({
  lang,
  openedDoors,
  onOpenDoor,
  onBurst,
  onBoop,
}) => {
  const t = TRANSLATIONS[lang].fate;
  const [activeDoorId, setActiveDoorId] = useState<number | null>(null);
  const [outcomeIndex, setOutcomeIndex] = useState(0);

  const activeDoor = FATE_DOORS.find((d) => d.id === activeDoorId) ?? null;

  const handleOpen = (doorId: number) => {
    setActiveDoorId(doorId);
    setOutcomeIndex(0);
    onOpenDoor(doorId);
    onBurst(doorId === 2 ? 'raccoon' : 'hearts');
  };

  const handleCycleOutcome = () => {
    if (!activeDoor) return;
    setOutcomeIndex((prev) => (prev + 1) % activeDoor.outcomes.length);
    onBurst('hearts');
  };

  return (
    <div className="glass-card rounded-[32px] p-5 sm:p-8 lg:p-10 space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="space-y-1.5">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2d1b3d]">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#5b3d72]">{t.subtitle}</p>
        </div>
        <DuduBubu
          mood={activeDoor ? activeDoor.mood : 'peeking'}
          size="sm"
          onBoop={onBoop}
        />
      </div>

      <AnimatePresence mode="wait">
        {!activeDoor ? (
          <motion.div
            key="doors-grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-2"
          >
            {FATE_DOORS.map((door) => {
              const wasOpened = openedDoors.includes(door.id);
              return (
                <motion.button
                  key={door.id}
                  type="button"
                  onClick={() => handleOpen(door.id)}
                  whileHover={{ y: -4, scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative rounded-t-[48px] rounded-b-3xl bg-white/85 border-2 border-purple-200/80 hover:border-pink-400 p-6 min-h-[210px] flex flex-col items-center justify-between text-center shadow-sm hover:shadow-[0_14px_32px_-10px_rgba(236,72,153,0.35)] transition-all cursor-pointer overflow-hidden"
                >
                  {/* Glowing arch header */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${door.accentGradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <DoorOpen className="w-7 h-7" />
                  </div>

                  <div className="space-y-1.5 my-3">
                    <div className="text-xs font-extrabold tracking-wider text-purple-600">
                      {door.title[lang]}
                    </div>
                    <p className="font-display text-base sm:text-lg font-bold text-[#2d1b3d] leading-snug">
                      {door.prompt[lang]}
                    </p>
                  </div>

                  <div className="text-xs font-semibold text-pink-600 flex items-center gap-1.5">
                    <span>{t.openDoor}</span>
                    {wasOpened && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#7e5e96]">{t.openedBadge}</span>
                      </>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key={`opened-${activeDoor.id}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="rounded-3xl bg-gradient-to-br from-white/95 via-pink-50/80 to-purple-50/90 border border-pink-200 p-6 sm:p-8 space-y-5 text-center"
          >
            <div className="space-y-1">
              <div className="text-xs font-extrabold uppercase tracking-wider text-pink-600">
                {activeDoor.title[lang]} · {activeDoor.tag[lang]}
              </div>
              <p className="font-display text-lg sm:text-2xl font-bold text-[#2d1b3d] leading-relaxed max-w-2xl mx-auto pt-2">
                {activeDoor.outcomes[outcomeIndex][lang]}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCycleOutcome}
                className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-display font-bold text-sm sm:text-base inline-flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t.anotherOne}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveDoorId(null)}
                className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-2xl bg-purple-100/80 hover:bg-purple-200/80 text-[#2d1b3d] font-display font-bold text-sm sm:text-base cursor-pointer"
              >
                {t.closeDoor}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
