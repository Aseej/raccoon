import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, RotateCcw } from 'lucide-react';
import { DuduBubu } from './DuduBubu';
import { RACCOON_CHASE_TAUNTS } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../types/app';

interface RaccoonGameProps {
  lang: Language;
  onWin: () => void;
  onBurst: (type: 'hearts' | 'confetti' | 'raccoon') => void;
  onBoop: () => void;
}

// 7x7 solvable maze: 0 = path, 1 = bush/obstacle
const MAZE_GRID = [
  [0, 0, 1, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 0, 0, 0, 1],
  [0, 0, 1, 1, 1, 0, 0],
  [1, 0, 0, 0, 1, 1, 0],
  [0, 0, 1, 0, 0, 0, 0],
];

const START_POS = { r: 0, c: 0 };
const GOAL_POS = { r: 6, c: 6 };

export const RaccoonGame: React.FC<RaccoonGameProps> = ({ lang, onWin, onBurst, onBoop }) => {
  const t = TRANSLATIONS[lang].raccoon;
  const [pos, setPos] = useState(START_POS);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [bump, setBump] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const move = useCallback(
    (dr: number, dc: number) => {
      if (won) return;
      const nr = pos.r + dr;
      const nc = pos.c + dc;
      if (
        nr < 0 ||
        nr >= MAZE_GRID.length ||
        nc < 0 ||
        nc >= MAZE_GRID[0].length ||
        MAZE_GRID[nr][nc] === 1
      ) {
        setBump(true);
        window.setTimeout(() => setBump(false), 320);
        return;
      }

      const nextMoves = moves + 1;
      setPos({ r: nr, c: nc });
      setMoves(nextMoves);

      if (nr === GOAL_POS.r && nc === GOAL_POS.c) {
        setWon(true);
        onWin();
        onBurst('confetti');
      }
    },
    [pos, moves, won, onWin, onBurst]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        move(-1, 0);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        move(1, 0);
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        move(0, -1);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        move(0, 1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [move]);

  const handleReset = () => {
    setPos(START_POS);
    setMoves(0);
    setWon(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) < 22 && Math.abs(dy) < 22) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      move(0, dx > 0 ? 1 : -1);
    } else {
      move(dy > 0 ? 1 : -1, 0);
    }
  };

  const activeTaunt =
    moves === 0
      ? t.statusEscaping
      : RACCOON_CHASE_TAUNTS[Math.floor((moves - 1) / 2) % RACCOON_CHASE_TAUNTS.length][lang];

  return (
    <div className="glass-card rounded-[32px] p-5 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Info + Dudu & Bubu chasing + Controls */}
        <div className="lg:col-span-5 flex flex-col items-center text-center gap-4">
          <DuduBubu mood={won ? 'celebration' : 'running'} size="md" onBoop={onBoop} />

          <div className="space-y-1.5">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2d1b3d]">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-[#5b3d72]">{t.subtitle}</p>
          </div>

          {/* Live chase message */}
          <div className="w-full rounded-2xl bg-pink-50/90 border border-pink-200/80 px-4 py-3 text-sm font-semibold text-pink-700">
            {won ? t.winMessage : activeTaunt}
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm text-[#6b4d82] font-medium">
            <span>
              {t.movesLabel}: <strong className="font-mono-nums text-[#2d1b3d]">{moves}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-purple-700 hover:text-pink-600 font-semibold cursor-pointer py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.reset}</span>
            </button>
          </div>
        </div>

        {/* Right: Maze Grid + Touch Controls */}
        <div className="lg:col-span-7 flex flex-col items-center gap-5">
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={`w-full max-w-[340px] sm:max-w-[380px] aspect-square rounded-3xl bg-white/85 border-2 border-purple-200/80 p-2.5 sm:p-3 shadow-inner touch-none select-none ${
              bump ? 'animate-shake-soft' : ''
            }`}
          >
            <div className="grid grid-cols-7 grid-rows-7 gap-1.5 w-full h-full">
              {MAZE_GRID.map((row, r) =>
                row.map((cell, c) => {
                  const isPlayer = pos.r === r && pos.c === c;
                  const isGoal = GOAL_POS.r === r && GOAL_POS.c === c;
                  const isWall = cell === 1;

                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`rounded-xl flex items-center justify-center text-lg sm:text-2xl transition-colors ${
                        isWall
                          ? 'bg-purple-200/75 border border-purple-300/60'
                          : isGoal
                          ? 'bg-pink-100 border border-pink-300'
                          : 'bg-pink-50/45'
                      }`}
                    >
                      {isPlayer ? (
                        <motion.span
                          layout
                          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                          className="select-none"
                        >
                          🦝
                        </motion.span>
                      ) : isGoal ? (
                        <span className="animate-heartbeat select-none">❤️</span>
                      ) : isWall ? (
                        <span className="text-sm sm:text-base opacity-80 select-none">🌸</span>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {won ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-3"
            >
              <p className="font-display font-extrabold text-lg text-pink-600">{t.winTitle}</p>
              <button
                type="button"
                onClick={handleReset}
                className="min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-display font-bold text-sm sm:text-base shadow-md cursor-pointer"
              >
                {t.playAgain}
              </button>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-[#7e5e96]">{t.swipeHint}</p>
              {/* Large 1-handed mobile D-pad */}
              <div className="grid grid-cols-3 gap-2 w-[184px]">
                <div />
                <button
                  type="button"
                  onClick={() => move(-1, 0)}
                  aria-label="Move up"
                  className="h-14 rounded-2xl bg-white border border-purple-200 shadow-sm active:scale-90 active:bg-pink-100 flex items-center justify-center text-[#2d1b3d] cursor-pointer"
                >
                  <ArrowUp className="w-6 h-6" />
                </button>
                <div />
                <button
                  type="button"
                  onClick={() => move(0, -1)}
                  aria-label="Move left"
                  className="h-14 rounded-2xl bg-white border border-purple-200 shadow-sm active:scale-90 active:bg-pink-100 flex items-center justify-center text-[#2d1b3d] cursor-pointer"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => move(1, 0)}
                  aria-label="Move down"
                  className="h-14 rounded-2xl bg-white border border-purple-200 shadow-sm active:scale-90 active:bg-pink-100 flex items-center justify-center text-[#2d1b3d] cursor-pointer"
                >
                  <ArrowDown className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => move(0, 1)}
                  aria-label="Move right"
                  className="h-14 rounded-2xl bg-white border border-purple-200 shadow-sm active:scale-90 active:bg-pink-100 flex items-center justify-center text-[#2d1b3d] cursor-pointer"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
