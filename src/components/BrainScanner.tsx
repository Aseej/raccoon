import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, AlertTriangle } from 'lucide-react';
import { DuduBubu } from './DuduBubu';
import { TRANSLATIONS } from '../data/translations';
import type { DuduBubuMood, Language } from '../types/app';

interface BrainScannerProps {
  lang: Language;
  onScanned: () => void;
  onBurst: (type: 'hearts' | 'confetti' | 'raccoon') => void;
  onBoop: () => void;
}

type ScanStage = 'idle' | 's12' | 's47' | 's83' | 's126' | 'error' | 'complete';

export const BrainScanner: React.FC<BrainScannerProps> = ({
  lang,
  onScanned,
  onBurst,
  onBoop,
}) => {
  const t = TRANSLATIONS[lang].brain;
  const [stage, setStage] = useState<ScanStage>('idle');
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

  const startScan = () => {
    if (stage !== 'idle' && stage !== 'complete') return;
    clearTimers();
    setStage('s12');

    const steps: Array<{ next: ScanStage; delay: number }> = [
      { next: 's47', delay: 550 },
      { next: 's83', delay: 1100 },
      { next: 's126', delay: 1650 },
      { next: 'error', delay: 2250 },
      { next: 'complete', delay: 3000 },
    ];

    steps.forEach(({ next, delay }) => {
      const id = window.setTimeout(() => {
        setStage(next);
        if (next === 'complete') {
          onScanned();
          onBurst('hearts');
        }
      }, delay);
      timersRef.current.push(id);
    });
  };

  const percentDisplay =
    stage === 's12'
      ? '12%'
      : stage === 's47'
      ? '47%'
      : stage === 's83'
      ? '83%'
      : stage === 's126'
      ? '126%'
      : stage === 'error'
      ? 'ERROR'
      : stage === 'complete'
      ? '97%'
      : '0%';

  const barWidth =
    stage === 's12'
      ? '12%'
      : stage === 's47'
      ? '47%'
      : stage === 's83'
      ? '83%'
      : stage === 's126' || stage === 'error'
      ? '100%'
      : stage === 'complete'
      ? '97%'
      : '0%';

  const mood: DuduBubuMood =
    stage === 'error' || stage === 's126'
      ? 'shocked'
      : stage === 's12' || stage === 's47' || stage === 's83'
      ? 'confused'
      : stage === 'complete'
      ? 'laughing'
      : 'peeking';

  const isScanning = stage !== 'idle' && stage !== 'complete';

  return (
    <div className="glass-card rounded-[32px] p-5 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 flex flex-col items-center text-center gap-4">
          <div className="relative">
            <DuduBubu mood={mood} size="lg" onBoop={onBoop} />
            {isScanning && (
              <motion.div
                initial={{ y: -30, opacity: 0.7 }}
                animate={{ y: 80, opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 0.9, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute inset-x-4 top-4 h-1 rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-500 shadow-[0_0_16px_rgba(236,72,153,0.9)] pointer-events-none"
              />
            )}
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-1.5 text-center lg:text-left">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2d1b3d] text-balance">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-[#5b3d72]">{t.subtitle}</p>
          </div>

          {/* Futuristic Brain Monitor Box */}
          <div
            className={`rounded-2xl p-5 border transition-colors ${
              stage === 'error' || stage === 's126'
                ? 'bg-rose-950 text-rose-50 border-rose-500/60 animate-shake-soft'
                : 'bg-[#211233] text-purple-50 border-purple-400/30'
            }`}
          >
            <div className="flex items-center justify-between text-xs sm:text-sm text-purple-200 mb-3">
              <span className="inline-flex items-center gap-2 font-medium">
                <Cpu className="w-4 h-4 text-pink-400" />
                {t.evaThoughtsLabel}
              </span>
              <span
                className={`font-mono-nums font-bold text-base sm:text-lg ${
                  stage === 'error' || stage === 's126' ? 'text-rose-400' : 'text-pink-300'
                }`}
              >
                {percentDisplay}
              </span>
            </div>

            <div className="w-full h-3.5 rounded-full bg-white/10 overflow-hidden mb-4">
              <motion.div
                className={`h-full rounded-full ${
                  stage === 'error' || stage === 's126'
                    ? 'bg-gradient-to-r from-rose-500 to-amber-400'
                    : 'bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400'
                }`}
                animate={{ width: barWidth }}
                transition={{ duration: 0.35 }}
              />
            </div>

            <AnimatePresence mode="wait">
              {stage === 'idle' && (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-purple-200/90"
                >
                  {t.idleHint}
                </motion.p>
              )}

              {isScanning && stage !== 'error' && (
                <motion.p
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono-nums text-sm text-pink-200"
                >
                  {t.scanningLabel} {t.evaThoughtsLabel}: {percentDisplay}
                </motion.p>
              )}

              {stage === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-rose-300 font-display font-bold text-base"
                >
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>{t.criticalTitle} — 126% OVERLOAD</span>
                </motion.div>
              )}

              {stage === 'complete' && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2.5"
                >
                  <div className="inline-flex items-center gap-2 text-pink-300 font-display font-extrabold text-sm sm:text-base">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{t.criticalTitle}</span>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    {t.criticalBody}
                  </p>
                  <p className="text-sm text-purple-200">{t.remainingBody}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="button"
            onClick={startScan}
            disabled={isScanning}
            whileHover={!isScanning ? { scale: 1.02 } : undefined}
            whileTap={!isScanning ? { scale: 0.97 } : undefined}
            className="w-full min-h-[54px] px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 text-white font-display font-extrabold text-sm sm:text-base shadow-lg disabled:opacity-70 cursor-pointer"
          >
            {stage === 'complete' ? t.rescan : t.scanButton}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
