import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { DuduBubu } from './DuduBubu';
import { LEGENDARY_ROULETTE_MESSAGES, ROULETTE_SLICES } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import type { DuduBubuMood, Language } from '../types/app';

interface ComplimentRouletteProps {
  lang: Language;
  spins: number;
  onSpinComplete: (isLegendary: boolean) => void;
  onBurst: (type: 'hearts' | 'confetti' | 'raccoon') => void;
  onBoop: () => void;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function createSlicePath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M',
    cx,
    cy,
    'L',
    start.x,
    start.y,
    'A',
    r,
    r,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    'Z',
  ].join(' ');
}

export const ComplimentRoulette: React.FC<ComplimentRouletteProps> = ({
  lang,
  spins,
  onSpinComplete,
  onBurst,
  onBoop,
}) => {
  const t = TRANSLATIONS[lang].roulette;
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{
    category: string;
    emoji: string;
    message: string;
    legendary: boolean;
  } | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const sliceAngle = 360 / ROULETTE_SLICES.length;

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);

    const targetIndex = Math.floor(Math.random() * ROULETTE_SLICES.length);
    const sliceCenter = targetIndex * sliceAngle + sliceAngle / 2;
    const desiredFinalMod = (360 - sliceCenter) % 360;
    const currentMod = ((rotation % 360) + 360) % 360;
    const deltaMod = (desiredFinalMod - currentMod + 360) % 360;
    const extraTurns = 360 * (5 + Math.floor(Math.random() * 2));
    const jitter = (Math.random() - 0.5) * (sliceAngle * 0.45);
    const nextRotation = rotation + extraTurns + deltaMod + jitter;

    setRotation(nextRotation);

    timerRef.current = window.setTimeout(() => {
      const picked = ROULETTE_SLICES[targetIndex];
      // ~16% chance of rare Legendary Compliment
      const isLegendary = Math.random() < 0.16;
      const msg = isLegendary
        ? LEGENDARY_ROULETTE_MESSAGES[
            Math.floor(Math.random() * LEGENDARY_ROULETTE_MESSAGES.length)
          ][lang]
        : picked.messages[Math.floor(Math.random() * picked.messages.length)][lang];

      setResult({
        category: picked.label[lang],
        emoji: picked.emoji,
        message: msg,
        legendary: isLegendary,
      });
      setSpinning(false);
      onSpinComplete(isLegendary);
      onBurst(isLegendary ? 'confetti' : 'hearts');
    }, 3200);
  };

  const mood: DuduBubuMood = spinning
    ? 'dizzy'
    : result?.legendary
    ? 'celebration'
    : result
    ? 'happy'
    : 'peeking';

  return (
    <div className="glass-card rounded-[32px] p-5 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Wheel Column */}
        <div className="lg:col-span-6 flex flex-col items-center gap-4">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Pointer needle at top */}
            <div
              aria-hidden="true"
              className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-[#2d1b3d] drop-shadow"
            />

            <motion.svg
              viewBox="0 0 260 260"
              animate={{ rotate: rotation }}
              transition={{ duration: 3.2, ease: [0.16, 1, 0.25, 1] }}
              className="w-full h-full drop-shadow-[0_14px_28px_rgba(168,85,247,0.28)]"
            >
              <circle cx="130" cy="130" r="126" fill="#FFFFFF" stroke="#F5D0FE" strokeWidth="4" />
              {ROULETTE_SLICES.map((slice, idx) => {
                const startAngle = idx * sliceAngle;
                const endAngle = startAngle + sliceAngle;
                const midAngle = startAngle + sliceAngle / 2;
                const labelPos = polarToCartesian(130, 130, 82, midAngle);

                return (
                  <g key={slice.id}>
                    <path
                      d={createSlicePath(130, 130, 122, startAngle, endAngle)}
                      fill={slice.color}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      fill={slice.textColor}
                      fontSize="18"
                      textAnchor="middle"
                      dominantBaseline="central"
                      transform={`rotate(${midAngle}, ${labelPos.x}, ${labelPos.y})`}
                    >
                      {slice.emoji}
                    </text>
                  </g>
                );
              })}
              {/* Center hub */}
              <circle cx="130" cy="130" r="24" fill="#FFFFFF" stroke="#2d1b3d" strokeWidth="3.5" />
              <text x="130" y="131" textAnchor="middle" dominantBaseline="central" fontSize="16">
                💗
              </text>
            </motion.svg>
          </div>

          <div className="text-xs sm:text-sm text-[#6b4d82] font-medium">
            {t.spinsLabel}: <strong className="font-mono-nums text-pink-600">{spins}</strong>
          </div>
        </div>

        {/* Right: Title, Character, Spin & Outcome */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-5">
          <DuduBubu mood={mood} size="md" onBoop={onBoop} />

          <div className="space-y-1.5">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2d1b3d]">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-[#5b3d72]">{t.subtitle}</p>
          </div>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result.message}
                initial={{ opacity: 0, scale: 0.94, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`w-full rounded-2xl p-5 border ${
                  result.legendary
                    ? 'bg-gradient-to-br from-amber-100 via-pink-100 to-purple-100 border-amber-400 shadow-[0_0_28px_rgba(251,191,36,0.35)]'
                    : 'bg-white/85 border-pink-200'
                }`}
              >
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-extrabold uppercase tracking-wider mb-1.5">
                  {result.legendary ? (
                    <span className="inline-flex items-center gap-1.5 text-amber-700">
                      <Sparkles className="w-4 h-4" />
                      {t.legendaryTag}
                    </span>
                  ) : (
                    <span className="text-pink-600">
                      {result.emoji} {result.category} · {t.normalTag}
                    </span>
                  )}
                </div>
                <p className="font-display text-base sm:text-lg font-bold text-[#2d1b3d] leading-snug">
                  {result.message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={handleSpin}
            disabled={spinning}
            whileHover={!spinning ? { scale: 1.02 } : undefined}
            whileTap={!spinning ? { scale: 0.96 } : undefined}
            className="w-full min-h-[54px] px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white font-display font-extrabold text-base tracking-wide shadow-lg disabled:opacity-70 cursor-pointer"
          >
            {spinning ? t.spinningButton : t.spinButton}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
