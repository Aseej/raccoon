import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crosshair, Hand } from 'lucide-react';
import { DUDU_SHOOT_COMPLIMENTS, DUDU_SLAP_REACTIONS } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../types/app';

interface DuduChaosGameProps {
  lang: Language;
  hits: number;
  slaps: number;
  onShootHit: () => void;
  onButtSlap: () => void;
  onBurst: (type: 'hearts' | 'confetti' | 'raccoon') => void;
}

type ChaosMode = 'shoot' | 'slap';
type SlapPhase = 'idle' | 'slapped' | 'running' | 'fallen';

export const DuduChaosGame: React.FC<DuduChaosGameProps> = ({
  lang,
  hits,
  slaps,
  onShootHit,
  onButtSlap,
  onBurst,
}) => {
  const t = TRANSLATIONS[lang].duduChaos;
  const [mode, setMode] = useState<ChaosMode>('shoot');

  // === Shoot Mode State ===
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [shootHitFlash, setShootHitFlash] = useState(false);
  const [shootBanner, setShootBanner] = useState<string | null>(null);
  const [missMarker, setMissMarker] = useState<{ id: number; x: number; y: number } | null>(null);
  const [hitMarker, setHitMarker] = useState<{ id: number; x: number; y: number } | null>(null);

  // === Slap Mode State ===
  const [slapPhase, setSlapPhase] = useState<SlapPhase>('idle');
  const [slapPos, setSlapPos] = useState({ x: 50, y: 56 });
  const [slapReactionIdx, setSlapReactionIdx] = useState(0);
  const [slapShout, setSlapShout] = useState<string | null>(null);
  const [slapBanner, setSlapBanner] = useState<string | null>(null);
  const [slapFlash, setSlapFlash] = useState(false);

  const slapTimersRef = useRef<number[]>([]);

  const clearSlapTimers = () => {
    slapTimersRef.current.forEach((id) => window.clearTimeout(id));
    slapTimersRef.current = [];
  };

  useEffect(() => {
    return () => clearSlapTimers();
  }, []);

  // Move Dudu smoothly around arena in Shoot mode
  useEffect(() => {
    if (mode !== 'shoot') return;
    const interval = window.setInterval(() => {
      setTargetPos({
        x: 16 + Math.random() * 68,
        y: 22 + Math.random() * 56,
      });
    }, 950);
    return () => window.clearInterval(interval);
  }, [mode]);

  const handleModeSwitch = (nextMode: ChaosMode) => {
    clearSlapTimers();
    setSlapPhase('idle');
    setSlapPos({ x: 50, y: 56 });
    setSlapShout(null);
    setMode(nextMode);
  };

  const handleArenaMiss = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode !== 'shoot') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMissMarker({ id: Date.now(), x, y });
    window.setTimeout(() => setMissMarker(null), 500);
  };

  const handleShootDudu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (mode !== 'shoot') return;

    const parent = e.currentTarget.parentElement;
    if (parent) {
      const rect = parent.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setHitMarker({ id: Date.now(), x, y });
      window.setTimeout(() => setHitMarker(null), 650);
    }

    setShootHitFlash(true);
    window.setTimeout(() => setShootHitFlash(false), 380);

    const nextComp =
      DUDU_SHOOT_COMPLIMENTS[Math.floor(Math.random() * DUDU_SHOOT_COMPLIMENTS.length)][lang];
    setShootBanner(nextComp);

    // Jump Dudu immediately to a new spot
    setTargetPos({
      x: 16 + Math.random() * 68,
      y: 22 + Math.random() * 56,
    });

    onShootHit();
    onBurst('hearts');
  };

  const handleSlapButt = () => {
    if (mode !== 'slap' || slapPhase !== 'idle') return;
    clearSlapTimers();

    const nextIdx = (slapReactionIdx + 1) % DUDU_SLAP_REACTIONS.length;
    setSlapReactionIdx(nextIdx);
    const reaction = DUDU_SLAP_REACTIONS[nextIdx];

    // Step 1: SLAP!
    setSlapPhase('slapped');
    setSlapFlash(true);
    setSlapShout(reaction.slapShout[lang]);
    setSlapBanner(reaction.banner[lang]);
    onButtSlap();
    onBurst('raccoon');

    const tFlash = window.setTimeout(() => setSlapFlash(false), 450);

    // Step 2: Panic and run around wildly here and there!
    const tRun1 = window.setTimeout(() => {
      setSlapPhase('running');
      setSlapShout(reaction.runShout[lang]);
      setSlapPos({ x: 20, y: 34 });
    }, 320);

    const tRun2 = window.setTimeout(() => {
      setSlapPos({ x: 80, y: 28 });
    }, 640);

    const tRun3 = window.setTimeout(() => {
      setSlapPos({ x: 24, y: 74 });
    }, 960);

    const tRun4 = window.setTimeout(() => {
      setSlapPos({ x: 74, y: 66 });
    }, 1280);

    // Step 3: Trips and FALLS flat on the floor!
    const tFall = window.setTimeout(() => {
      setSlapPhase('fallen');
      setSlapPos({ x: 52, y: 72 });
      setSlapShout(t.fallenText);
    }, 1620);

    // Step 4: Wobbles back up ready for another slap
    const tReset = window.setTimeout(() => {
      setSlapPhase('idle');
      setSlapPos({ x: 50, y: 56 });
      setSlapShout(null);
    }, 3300);

    slapTimersRef.current.push(tFlash, tRun1, tRun2, tRun3, tRun4, tFall, tReset);
  };

  return (
    <div className="glass-card rounded-[32px] p-5 sm:p-8 lg:p-10 space-y-6">
      {/* Header + Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2d1b3d]">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#5b3d72]">{t.subtitle}</p>
        </div>

        {/* Interactive mode tabs */}
        <div className="flex items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-purple-100/80 border border-purple-200/70 shrink-0">
          <button
            type="button"
            onClick={() => handleModeSwitch('shoot')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              mode === 'shoot'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm'
                : 'text-[#4b2d63] hover:text-[#2d1b3d]'
            }`}
          >
            <Crosshair className="w-4 h-4" />
            <span>{t.shootTab}</span>
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch('slap')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              mode === 'slap'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm'
                : 'text-[#4b2d63] hover:text-[#2d1b3d]'
            }`}
          >
            <Hand className="w-4 h-4" />
            <span>{t.slapTab}</span>
          </button>
        </div>
      </div>

      {/* Mode instruction + Score row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-[#5b3d72]">
        <p className="font-medium text-center sm:text-left">
          {mode === 'shoot' ? t.shootIntro : t.slapIntro}
        </p>
        <div className="flex items-center justify-center sm:justify-end gap-3 text-xs sm:text-sm font-semibold shrink-0">
          <span>
            {t.hitsLabel}: <strong className="font-mono-nums text-pink-600">{hits}</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {t.slapsLabel}: <strong className="font-mono-nums text-rose-600">{slaps}</strong>
          </span>
        </div>
      </div>

      {/* Interactive Arena */}
      <div
        onClick={handleArenaMiss}
        className={`relative w-full h-[300px] sm:h-[340px] rounded-3xl border-2 overflow-hidden select-none touch-manipulation ${
          mode === 'shoot'
            ? 'bg-gradient-to-br from-purple-50 via-pink-50 to-fuchsia-50 border-pink-200 cursor-crosshair'
            : 'bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 border-rose-200'
        }`}
      >
        {/* Subtle decorative arena grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-35 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(219, 39, 119, 0.16) 1.5px, transparent 1.5px)',
            backgroundSize: '26px 26px',
          }}
        />

        {/* Giggling Bubu spectator in corner */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none flex items-center gap-1.5 rounded-2xl bg-white/85 border border-pink-200/80 px-3 py-1.5 text-xs font-semibold text-[#2d1b3d] shadow-sm">
          <span>🐼</span>
          <span>{t.bubuComment}</span>
        </div>

        {/* SHOOT MODE: Moving Dudu Target */}
        {mode === 'shoot' && (
          <>
            <motion.button
              type="button"
              onClick={handleShootDudu}
              aria-label="Shoot Dudu"
              animate={{
                left: `${targetPos.x}%`,
                top: `${targetPos.y}%`,
                rotate: shootHitFlash ? [0, -14, 14, 0] : [0, -3, 3, 0],
                scale: shootHitFlash ? 1.15 : 1,
              }}
              transition={{
                left: { type: 'spring', stiffness: 190, damping: 18 },
                top: { type: 'spring', stiffness: 190, damping: 18 },
                rotate: { duration: shootHitFlash ? 0.3 : 1.2, repeat: shootHitFlash ? 0 : Infinity },
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 flex flex-col items-center justify-center cursor-crosshair focus:outline-none z-20"
            >
              {/* Target reticle ring */}
              <span
                aria-hidden="true"
                className="absolute inset-1 rounded-full border-2 border-dashed border-pink-400/70 animate-spin"
                style={{ animationDuration: '6s' }}
              />
              {/* Dudu Front Sprite */}
              <svg viewBox="0 0 110 110" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md">
                <circle cx="29" cy="28" r="12" fill="#D9A77A" stroke="#4A3248" strokeWidth="3" />
                <circle cx="29" cy="28" r="6" fill="#FDE2C8" />
                <circle cx="81" cy="28" r="12" fill="#D9A77A" stroke="#4A3248" strokeWidth="3" />
                <circle cx="81" cy="28" r="6" fill="#FDE2C8" />
                <ellipse cx="55" cy="84" rx="25" ry="20" fill="#D9A77A" stroke="#4A3248" strokeWidth="3" />
                <ellipse cx="55" cy="86" rx="14" ry="12" fill="#FDE2C8" />
                <ellipse cx="55" cy="54" rx="30" ry="26" fill="#D9A77A" stroke="#4A3248" strokeWidth="3" />
                <ellipse cx="55" cy="61" rx="13" ry="9" fill="#FDE2C8" />
                {shootHitFlash ? (
                  <>
                    <path d="M38 47 L46 55 M46 47 L38 55" stroke="#4A3248" strokeWidth="2.8" strokeLinecap="round" />
                    <path d="M64 47 L72 55 M72 47 L64 55" stroke="#4A3248" strokeWidth="2.8" strokeLinecap="round" />
                    <circle cx="55" cy="65" r="4" fill="#F472B6" stroke="#4A3248" strokeWidth="2" />
                  </>
                ) : (
                  <>
                    <circle cx="43" cy="50" r="3.8" fill="#4A3248" />
                    <circle cx="67" cy="50" r="3.8" fill="#4A3248" />
                    <path d="M50 63 Q55 68 60 63" fill="none" stroke="#4A3248" strokeWidth="2.5" strokeLinecap="round" />
                  </>
                )}
                <ellipse cx="55" cy="57" rx="3.4" ry="2.4" fill="#4A3248" />
              </svg>
            </motion.button>

            {/* Miss ripple */}
            <AnimatePresence>
              {missMarker && (
                <motion.div
                  key={missMarker.id}
                  initial={{ opacity: 1, scale: 0.7 }}
                  animate={{ opacity: 0, scale: 1.25, y: -16 }}
                  exit={{ opacity: 0 }}
                  style={{ left: `${missMarker.x}%`, top: `${missMarker.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none text-xs font-extrabold text-purple-600 z-30"
                >
                  {t.missText}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hit pop */}
            <AnimatePresence>
              {hitMarker && (
                <motion.div
                  key={hitMarker.id}
                  initial={{ opacity: 1, scale: 0.6 }}
                  animate={{ opacity: 0, scale: 1.45, y: -26 }}
                  exit={{ opacity: 0 }}
                  style={{ left: `${hitMarker.x}%`, top: `${hitMarker.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none text-lg sm:text-xl font-extrabold text-pink-600 z-30"
                >
                  💘 POW!
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* SLAP MODE: Dudu showing his chubby butt -> panic run -> fall! */}
        {mode === 'slap' && (
          <>
            <motion.button
              type="button"
              onClick={handleSlapButt}
              aria-label="Slap Dudu's butt"
              animate={{
                left: `${slapPos.x}%`,
                top: `${slapPos.y}%`,
                rotate:
                  slapPhase === 'fallen'
                    ? 92
                    : slapPhase === 'running'
                    ? [-10, 10, -10, 10]
                    : slapPhase === 'slapped'
                    ? -14
                    : 0,
                scale: slapPhase === 'slapped' ? 1.12 : 1,
              }}
              transition={{
                left: { duration: slapPhase === 'running' ? 0.3 : 0.4, ease: 'easeInOut' },
                top: { duration: slapPhase === 'running' ? 0.3 : 0.4, ease: 'easeInOut' },
                rotate: {
                  duration: slapPhase === 'running' ? 0.25 : 0.35,
                  repeat: slapPhase === 'running' ? Infinity : 0,
                },
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-40 sm:h-40 flex flex-col items-center justify-center cursor-pointer focus:outline-none z-20"
            >
              {/* Speech / Scream Bubble */}
              {slapShout && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-6 whitespace-nowrap rounded-xl bg-white px-2.5 py-1 text-xs font-extrabold text-rose-600 shadow-md border border-rose-200 pointer-events-none"
                  style={slapPhase === 'fallen' ? { transform: 'rotate(-92deg)' } : undefined}
                >
                  {slapShout}
                </motion.div>
              )}

              {/* Spinning stars when fallen */}
              {slapPhase === 'fallen' && (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-1 -left-2 text-xl pointer-events-none"
                >
                  💫
                </motion.span>
              )}

              {/* Running dust puffs */}
              {slapPhase === 'running' && (
                <span className="absolute -left-5 bottom-4 text-xl pointer-events-none">💨</span>
              )}

              {/* SLAP impact burst */}
              {slapFlash && (
                <motion.span
                  initial={{ scale: 0.6, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.42 }}
                  className="absolute right-0 top-1/2 text-3xl pointer-events-none z-30"
                >
                  💥👋
                </motion.span>
              )}

              {/* Dudu Back/Side Chubby-Butt SVG */}
              <svg viewBox="0 0 130 125" className="w-32 h-32 sm:w-36 sm:h-36 drop-shadow-md">
                {/* Shadow */}
                <ellipse cx="64" cy="112" rx="34" ry="7" fill="rgba(168,85,247,0.16)" />

                {/* Ears */}
                <circle cx="38" cy="28" r="11" fill="#D9A77A" stroke="#4A3248" strokeWidth="3" />
                <circle cx="80" cy="28" r="11" fill="#D9A77A" stroke="#4A3248" strokeWidth="3" />

                {/* Head looking slightly back */}
                <ellipse cx="59" cy="46" rx="26" ry="22" fill="#D9A77A" stroke="#4A3248" strokeWidth="3" />
                <ellipse cx="47" cy="48" rx="9" ry="7" fill="#FDE2C8" />
                {slapPhase === 'fallen' ? (
                  <path d="M39 42 L45 48 M45 42 L39 48" stroke="#4A3248" strokeWidth="2.5" strokeLinecap="round" />
                ) : slapPhase === 'slapped' || slapPhase === 'running' ? (
                  <>
                    <circle cx="43" cy="44" r="3.8" fill="#4A3248" />
                    <circle cx="42" cy="43" r="1.2" fill="#FFFFFF" />
                    <ellipse cx="47" cy="53" rx="3" ry="3.5" fill="#F472B6" stroke="#4A3248" strokeWidth="1.8" />
                  </>
                ) : (
                  <>
                    <circle cx="43" cy="44" r="3.2" fill="#4A3248" />
                    <path d="M40 52 Q45 55 50 52" fill="none" stroke="#4A3248" strokeWidth="2.2" strokeLinecap="round" />
                  </>
                )}

                {/* Chubby Body + Prominent Cute Bear Butt on right! */}
                <path
                  d="M36 64 C32 84, 38 104, 58 105 C72 106, 86 104, 93 93 C99 84, 94 69, 80 63 Z"
                  fill="#D9A77A"
                  stroke="#4A3248"
                  strokeWidth="3"
                />
                {/* Cute round butt cheeks line */}
                <path
                  d="M78 80 Q85 88 79 97"
                  fill="none"
                  stroke="#4A3248"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                {/* Little tail */}
                <circle cx="94" cy="78" r="6" fill="#FDE2C8" stroke="#4A3248" strokeWidth="2.6" />

                {/* Red slap blush mark on butt after slapping */}
                {slapPhase !== 'idle' && (
                  <ellipse cx="83" cy="87" rx="8" ry="6" fill="#FB7185" opacity="0.75" />
                )}

                {/* Little legs */}
                <ellipse cx="48" cy="105" rx="8" ry="6" fill="#D9A77A" stroke="#4A3248" strokeWidth="2.8" />
                <ellipse cx="72" cy="105" rx="8" ry="6" fill="#D9A77A" stroke="#4A3248" strokeWidth="2.8" />
              </svg>

              {slapPhase === 'idle' && (
                <span className="mt-0.5 text-xs font-extrabold text-rose-600 bg-white/90 px-2.5 py-0.5 rounded-full border border-rose-200 shadow-xs">
                  {t.slapButtonHint}
                </span>
              )}
            </motion.button>
          </>
        )}
      </div>

      {/* Recognition / Comedy Feedback Banner */}
      <div className="min-h-[72px] rounded-2xl bg-gradient-to-r from-pink-50/90 via-white/90 to-purple-50/90 border border-pink-200/80 px-5 py-4 flex items-center justify-center text-center">
        {mode === 'shoot' ? (
          <p className="font-display text-sm sm:text-base font-bold text-[#2d1b3d]">
            {shootBanner ?? t.shootIntro}
          </p>
        ) : (
          <p className="font-display text-sm sm:text-base font-bold text-[#2d1b3d]">
            {slapBanner ?? t.slapIntro}
          </p>
        )}
      </div>
    </div>
  );
};
