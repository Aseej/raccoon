import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface BurstEvent {
  id: number;
  type: 'hearts' | 'confetti' | 'raccoon';
}

interface AmbientBackdropProps {
  nightMode: boolean;
  onStarTap: () => void;
  starFound: boolean;
}

const FLOATING_SPECKS = [
  { id: 1, left: '6%', top: '14%', char: '✦', delay: 0, size: 'text-xs', color: 'text-pink-300/70' },
  { id: 2, left: '88%', top: '18%', char: '♡', delay: 1.1, size: 'text-sm', color: 'text-purple-300/65' },
  { id: 3, left: '14%', top: '68%', char: '♡', delay: 2.0, size: 'text-base', color: 'text-rose-300/60' },
  { id: 4, left: '92%', top: '72%', char: '✧', delay: 0.7, size: 'text-xs', color: 'text-fuchsia-300/70' },
  { id: 5, left: '48%', top: '10%', char: '✦', delay: 1.6, size: 'text-[10px]', color: 'text-purple-300/60' },
  { id: 6, left: '76%', top: '88%', char: '♡', delay: 2.4, size: 'text-xs', color: 'text-pink-300/60' },
  { id: 7, left: '24%', top: '86%', char: '✧', delay: 0.4, size: 'text-xs', color: 'text-violet-300/65' },
];

export const AmbientBackdrop: React.FC<AmbientBackdropProps> = ({
  nightMode,
  onStarTap,
  starFound,
}) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dreamy gradient mesh */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          nightMode
            ? 'bg-[radial-gradient(circle_at_20%_20%,#3b1963_0%,#1c0b33_45%,#0d051a_100%)]'
            : 'bg-[radial-gradient(circle_at_15%_12%,#ffe4f2_0%,#f6ecff_46%,#fff7fb_100%)]'
        }`}
      />

      {/* Soft glowing orbs */}
      <div
        className={`absolute -top-24 -left-20 w-80 h-80 rounded-full blur-3xl transition-opacity duration-700 ${
          nightMode ? 'bg-fuchsia-600/20' : 'bg-pink-300/35'
        }`}
      />
      <div
        className={`absolute top-1/3 -right-24 w-96 h-96 rounded-full blur-3xl transition-opacity duration-700 ${
          nightMode ? 'bg-indigo-500/20' : 'bg-purple-300/30'
        }`}
      />
      <div
        className={`absolute -bottom-24 left-1/4 w-80 h-80 rounded-full blur-3xl transition-opacity duration-700 ${
          nightMode ? 'bg-pink-500/15' : 'bg-rose-200/35'
        }`}
      />

      {/* Night sky moon in Final Boss */}
      {nightMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="absolute top-16 right-8 sm:right-20 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-100 via-rose-100 to-purple-200 shadow-[0_0_60px_rgba(253,230,138,0.45)] opacity-90"
        />
      )}

      {/* Ambient floating specks */}
      {FLOATING_SPECKS.map((speck) => (
        <span
          key={speck.id}
          style={{ left: speck.left, top: speck.top, animationDelay: `${speck.delay}s` }}
          className={`absolute animate-float-slow select-none ${speck.size} ${
            nightMode ? 'text-purple-200/55' : speck.color
          }`}
        >
          {speck.char}
        </span>
      ))}

      {/* Easter Egg #1: Interactive clickable tiny twinkling star */}
      <button
        type="button"
        onClick={onStarTap}
        aria-label="Tiny twinkling star"
        className={`pointer-events-auto fixed top-20 right-4 sm:right-8 z-20 w-11 h-11 flex items-center justify-center rounded-full cursor-pointer transition-transform active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
          starFound ? 'opacity-90' : 'opacity-65 hover:opacity-100'
        }`}
      >
        <span
          className={`animate-twinkle text-lg sm:text-xl select-none ${
            starFound
              ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]'
              : nightMode
              ? 'text-amber-200'
              : 'text-purple-400'
          }`}
        >
          ★
        </span>
      </button>
    </div>
  );
};

interface ParticleBurstProps {
  bursts: BurstEvent[];
}

const BURST_PARTICLES = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2;
  const dist = 65 + (i % 4) * 28;
  return {
    id: i,
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist - 20,
    rotate: (i * 42) % 360,
  };
});

export const ParticleBurstOverlay: React.FC<ParticleBurstProps> = ({ bursts }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {bursts.map((burst) => {
          const emojis =
            burst.type === 'hearts'
              ? ['💗', '💖', '💕', '✨', '🌸']
              : burst.type === 'raccoon'
              ? ['🦝', '💗', '✨', '💜', '🌸']
              : ['🎉', '💖', '✨', '⭐', '💜', '🌸'];
          return (
            <div key={burst.id} className="absolute inset-0 flex items-center justify-center">
              {BURST_PARTICLES.map((p) => (
                <motion.span
                  key={p.id}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 0.4, rotate: 0 }}
                  animate={{
                    opacity: 0,
                    x: p.x * 1.45,
                    y: p.y * 1.45,
                    scale: 1.15,
                    rotate: p.rotate,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute text-xl sm:text-2xl select-none"
                >
                  {emojis[p.id % emojis.length]}
                </motion.span>
              ))}
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
