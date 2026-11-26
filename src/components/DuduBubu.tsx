import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DUDU_BUBU_ASSETS } from '../data/assets';
import type { DuduBubuMood } from '../types/app';

interface DuduBubuProps {
  mood: DuduBubuMood;
  size?: 'sm' | 'md' | 'lg';
  onBoop?: () => void;
  nightMode?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-28 h-24 sm:w-32 sm:h-28',
  md: 'w-44 h-36 sm:w-52 sm:h-40',
  lg: 'w-56 h-44 sm:w-64 sm:h-48',
};

export const DuduBubu: React.FC<DuduBubuProps> = ({
  mood,
  size = 'md',
  onBoop,
  nightMode = false,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const [boopPulse, setBoopPulse] = useState(0);
  const assetUrl = DUDU_BUBU_ASSETS[mood]?.trim();

  const handleTap = () => {
    setBoopPulse((p) => p + 1);
    onBoop?.();
  };

  if (assetUrl && !imgError) {
    return (
      <motion.button
        type="button"
        onClick={handleTap}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.04 }}
        aria-label="Dudu and Bubu"
        className={`relative inline-flex items-center justify-center rounded-3xl overflow-hidden cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${SIZE_MAP[size]} ${className}`}
      >
        <img
          src={assetUrl}
          alt={`Dudu and Bubu ${mood}`}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-contain"
        />
      </motion.button>
    );
  }

  const isBouncing =
    mood === 'celebration' || mood === 'happy' || mood === 'running' || mood === 'welcome';
  const isShaking = mood === 'angry' || mood === 'shocked';
  const isTilted = mood === 'confused' || mood === 'peeking' || mood === 'dizzy';
  const isBlushing =
    mood === 'kiss' || mood === 'compliment' || mood === 'hug' || mood === 'final' || boopPulse > 0;

  return (
    <motion.button
      type="button"
      onClick={handleTap}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      animate={
        isBouncing
          ? { y: [0, -8, 0] }
          : isShaking
          ? { x: [0, -3, 3, -2, 2, 0] }
          : isTilted
          ? { rotate: mood === 'dizzy' ? [0, -6, 6, 0] : [0, -4, 0] }
          : { y: [0, -4, 0] }
      }
      transition={{
        duration: isBouncing ? 1.4 : isShaking ? 0.55 : 2.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-label="Dudu and Bubu"
      className={`relative inline-flex items-center justify-center cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-3xl ${SIZE_MAP[size]} ${className}`}
    >
      {/* Subtle aura glow behind characters */}
      <span
        aria-hidden="true"
        className={`absolute inset-2 rounded-full blur-2xl pointer-events-none ${
          nightMode
            ? 'bg-pink-400/25'
            : 'bg-gradient-to-tr from-pink-300/40 via-purple-200/35 to-rose-200/40'
        }`}
      />

      {/* Boop floating mini-heart */}
      {boopPulse > 0 && (
        <motion.span
          key={boopPulse}
          initial={{ opacity: 1, y: 0, scale: 0.6 }}
          animate={{ opacity: 0, y: -32, scale: 1.3 }}
          transition={{ duration: 0.7 }}
          className="absolute -top-2 z-20 text-lg pointer-events-none"
        >
          💗
        </motion.span>
      )}

      {/* Mood FX indicators */}
      {mood === 'confused' && (
        <motion.span
          animate={{ y: [0, -5, 0], rotate: [-8, 8, -8] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="absolute top-0 right-4 text-xl font-bold text-purple-600 pointer-events-none"
        >
          ?
        </motion.span>
      )}
      {mood === 'sleepy' && (
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4], y: [0, -8, -14] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="absolute -top-1 right-4 text-sm font-bold text-indigo-400 pointer-events-none"
        >
          Zzz
        </motion.span>
      )}
      {mood === 'shocked' && (
        <motion.span
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="absolute -top-1 right-3 text-lg font-extrabold text-rose-500 pointer-events-none"
        >
          !!
        </motion.span>
      )}
      {(mood === 'celebration' || mood === 'final' || mood === 'kiss' || mood === 'compliment') && (
        <motion.span
          animate={{ scale: [0.85, 1.15, 0.85], y: [0, -4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute -top-1 left-1/2 -translate-x-1/2 text-base pointer-events-none"
        >
          {mood === 'celebration' ? '✨💖✨' : mood === 'final' ? '🌙💗' : '💕'}
        </motion.span>
      )}
      {mood === 'angry' && (
        <motion.span
          animate={{ scale: [0.9, 1.2, 0.9] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="absolute top-0 right-4 text-base pointer-events-none"
        >
          💢
        </motion.span>
      )}
      {mood === 'running' && (
        <motion.span
          animate={{ x: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.7, repeat: Infinity }}
          className="absolute left-1 bottom-4 text-base pointer-events-none"
        >
          💨
        </motion.span>
      )}

      {/* Bespoke Expressive Dudu & Bubu Duo SVG */}
      <svg
        viewBox="0 0 220 150"
        className="relative z-10 w-full h-full drop-shadow-sm"
        aria-hidden="true"
      >
        {/* Soft shadow */}
        <ellipse
          cx="110"
          cy="138"
          rx="74"
          ry="9"
          fill={nightMode ? 'rgba(0,0,0,0.35)' : 'rgba(168,85,247,0.14)'}
        />

        {/* === BUBU (White round bear on left) === */}
        <g
          transform={
            mood === 'hug' || mood === 'kiss'
              ? 'translate(8, 0)'
              : mood === 'running'
              ? 'translate(-4, -2) rotate(-6 68 86)'
              : ''
          }
        >
          {/* Ears */}
          <circle cx="44" cy="44" r="14" fill="#FFFFFF" stroke="#4A3248" strokeWidth="3.2" />
          <circle cx="44" cy="44" r="7" fill="#FBCFE8" />
          <circle cx="92" cy="44" r="14" fill="#FFFFFF" stroke="#4A3248" strokeWidth="3.2" />
          <circle cx="92" cy="44" r="7" fill="#FBCFE8" />

          {/* Chubby Body */}
          <ellipse cx="68" cy="112" rx="30" ry="25" fill="#FFFFFF" stroke="#4A3248" strokeWidth="3.2" />

          {/* Head */}
          <ellipse cx="68" cy="74" rx="34" ry="30" fill="#FFFFFF" stroke="#4A3248" strokeWidth="3.2" />

          {/* Blush */}
          <ellipse
            cx="48"
            cy="82"
            rx="7"
            ry="4"
            fill={isBlushing ? '#F472B6' : '#FBCFE8'}
            opacity={isBlushing ? 0.85 : 0.7}
          />
          <ellipse
            cx="88"
            cy="82"
            rx="7"
            ry="4"
            fill={isBlushing ? '#F472B6' : '#FBCFE8'}
            opacity={isBlushing ? 0.85 : 0.7}
          />

          {/* Eyes by mood */}
          {mood === 'sleepy' ? (
            <>
              <path d="M51 73 Q56 77 61 73" fill="none" stroke="#4A3248" strokeWidth="3" strokeLinecap="round" />
              <path d="M75 73 Q80 77 85 73" fill="none" stroke="#4A3248" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : mood === 'laughing' || mood === 'happy' || mood === 'celebration' ? (
            <>
              <path d="M50 74 Q56 67 62 74" fill="none" stroke="#4A3248" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M74 74 Q80 67 86 74" fill="none" stroke="#4A3248" strokeWidth="3.2" strokeLinecap="round" />
            </>
          ) : mood === 'dizzy' ? (
            <>
              <path d="M51 69 L59 77 M59 69 L51 77" stroke="#4A3248" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M77 69 L85 77 M85 69 L77 77" stroke="#4A3248" strokeWidth="2.8" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="56" cy="72" r={mood === 'shocked' ? 5.2 : 4.2} fill="#4A3248" />
              <circle cx="54.5" cy="70.5" r="1.5" fill="#FFFFFF" />
              <circle cx="80" cy="72" r={mood === 'shocked' ? 5.2 : 4.2} fill="#4A3248" />
              <circle cx="78.5" cy="70.5" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Angry eyebrows */}
          {mood === 'angry' && (
            <>
              <path d="M50 64 L61 68" stroke="#4A3248" strokeWidth="3" strokeLinecap="round" />
              <path d="M86 64 L75 68" stroke="#4A3248" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {/* Crying tears */}
          {mood === 'crying' && (
            <>
              <path d="M54 78 Q52 88 55 92" fill="none" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
              <path d="M82 78 Q84 88 81 92" fill="none" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {/* Mouth & nose */}
          <ellipse cx="68" cy="79" rx="3.4" ry="2.4" fill="#4A3248" />
          {mood === 'angry' || mood === 'crying' ? (
            <path d="M62 87 Q68 82 74 87" fill="none" stroke="#4A3248" strokeWidth="2.6" strokeLinecap="round" />
          ) : mood === 'shocked' ? (
            <circle cx="68" cy="86" r="3.5" fill="#F472B6" stroke="#4A3248" strokeWidth="2.2" />
          ) : (
            <path d="M62 84 Q68 89 74 84" fill="none" stroke="#4A3248" strokeWidth="2.6" strokeLinecap="round" />
          )}

          {/* Waving / Hugging arms */}
          <ellipse
            cx={mood === 'welcome' || mood === 'celebration' ? 37 : 44}
            cy={mood === 'welcome' || mood === 'celebration' ? 98 : 110}
            rx="9"
            ry="13"
            transform={mood === 'welcome' ? 'rotate(-35 37 98)' : 'rotate(18 44 110)'}
            fill="#FFFFFF"
            stroke="#4A3248"
            strokeWidth="3"
          />
          <ellipse
            cx="91"
            cy="110"
            rx="9"
            ry="13"
            transform="rotate(-24 91 110)"
            fill="#FFFFFF"
            stroke="#4A3248"
            strokeWidth="3"
          />
        </g>

        {/* === DUDU (Caramel/mocha bear on right) === */}
        <g
          transform={
            mood === 'hug' || mood === 'kiss'
              ? 'translate(-8, 0)'
              : mood === 'running'
              ? 'translate(4, -3) rotate(5 152 86)'
              : ''
          }
        >
          {/* Ears */}
          <circle cx="128" cy="44" r="14" fill="#D9A77A" stroke="#4A3248" strokeWidth="3.2" />
          <circle cx="128" cy="44" r="7" fill="#FDE2C8" />
          <circle cx="176" cy="44" r="14" fill="#D9A77A" stroke="#4A3248" strokeWidth="3.2" />
          <circle cx="176" cy="44" r="7" fill="#FDE2C8" />

          {/* Chubby Body */}
          <ellipse cx="152" cy="112" rx="30" ry="25" fill="#D9A77A" stroke="#4A3248" strokeWidth="3.2" />
          <ellipse cx="152" cy="115" rx="17" ry="15" fill="#FDE2C8" />

          {/* Head */}
          <ellipse cx="152" cy="74" rx="34" ry="30" fill="#D9A77A" stroke="#4A3248" strokeWidth="3.2" />
          {/* Muzzle patch */}
          <ellipse cx="152" cy="83" rx="14" ry="10" fill="#FDE2C8" />

          {/* Blush */}
          <ellipse
            cx="132"
            cy="82"
            rx="7"
            ry="4"
            fill={isBlushing ? '#F472B6' : '#FDA4AF'}
            opacity={isBlushing ? 0.85 : 0.65}
          />
          <ellipse
            cx="172"
            cy="82"
            rx="7"
            ry="4"
            fill={isBlushing ? '#F472B6' : '#FDA4AF'}
            opacity={isBlushing ? 0.85 : 0.65}
          />

          {/* Eyes */}
          {mood === 'sleepy' ? (
            <>
              <path d="M135 73 Q140 77 145 73" fill="none" stroke="#4A3248" strokeWidth="3" strokeLinecap="round" />
              <path d="M159 73 Q164 77 169 73" fill="none" stroke="#4A3248" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : mood === 'laughing' || mood === 'happy' || mood === 'celebration' ? (
            <>
              <path d="M134 74 Q140 67 146 74" fill="none" stroke="#4A3248" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M158 74 Q164 67 170 74" fill="none" stroke="#4A3248" strokeWidth="3.2" strokeLinecap="round" />
            </>
          ) : mood === 'dizzy' ? (
            <>
              <path d="M135 69 L143 77 M143 69 L135 77" stroke="#4A3248" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M161 69 L169 77 M169 69 L161 77" stroke="#4A3248" strokeWidth="2.8" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="140" cy="72" r={mood === 'shocked' ? 5.2 : 4.2} fill="#4A3248" />
              <circle cx="138.5" cy="70.5" r="1.5" fill="#FFFFFF" />
              <circle cx="164" cy="72" r={mood === 'shocked' ? 5.2 : 4.2} fill="#4A3248" />
              <circle cx="162.5" cy="70.5" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {mood === 'angry' && (
            <>
              <path d="M134 64 L145 68" stroke="#4A3248" strokeWidth="3" strokeLinecap="round" />
              <path d="M170 64 L159 68" stroke="#4A3248" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {/* Nose & Mouth */}
          <ellipse cx="152" cy="79" rx="3.6" ry="2.5" fill="#4A3248" />
          {mood === 'angry' || mood === 'crying' ? (
            <path d="M146 87 Q152 82 158 87" fill="none" stroke="#4A3248" strokeWidth="2.6" strokeLinecap="round" />
          ) : mood === 'shocked' ? (
            <circle cx="152" cy="86" r="3.5" fill="#F472B6" stroke="#4A3248" strokeWidth="2.2" />
          ) : (
            <path d="M146 84 Q152 89 158 84" fill="none" stroke="#4A3248" strokeWidth="2.6" strokeLinecap="round" />
          )}

          {/* Arms */}
          <ellipse
            cx="129"
            cy="110"
            rx="9"
            ry="13"
            transform="rotate(24 129 110)"
            fill="#D9A77A"
            stroke="#4A3248"
            strokeWidth="3"
          />
          <ellipse
            cx={mood === 'welcome' || mood === 'celebration' ? 183 : 176}
            cy={mood === 'welcome' || mood === 'celebration' ? 98 : 110}
            rx="9"
            ry="13"
            transform={mood === 'welcome' ? 'rotate(35 183 98)' : 'rotate(-18 176 110)'}
            fill="#D9A77A"
            stroke="#4A3248"
            strokeWidth="3"
          />
        </g>

        {/* Center glowing heart when hugging/kissing/final */}
        {(mood === 'hug' || mood === 'kiss' || mood === 'final' || mood === 'compliment') && (
          <path
            d="M110 108 C110 108 97 98 97 90 C97 85 101 82 105.5 82 C108 82 109.6 83.5 110 85 C110.4 83.5 112 82 114.5 82 C119 82 123 85 123 90 C123 98 110 108 110 108 Z"
            fill="#EC4899"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        )}
      </svg>
    </motion.button>
  );
};
