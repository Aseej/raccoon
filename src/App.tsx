import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Lock, Trophy } from 'lucide-react';
import { AmbientBackdrop, ParticleBurstOverlay, type BurstEvent } from './components/ParticleEffects';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ComplimentMachine } from './components/ComplimentMachine';
import { Quiz } from './components/Quiz';
import { RaccoonGame } from './components/RaccoonGame';
import { DuduChaosGame } from './components/DuduChaosGame';
import { CharlieCartoon } from './components/CharlieCartoon';
import { BrainScanner } from './components/BrainScanner';
import { ComplimentRoulette } from './components/ComplimentRoulette';
import { FateDoors } from './components/FateDoors';
import { MoodRescue } from './components/MoodRescue';
import { Reasons100 } from './components/Reasons100';
import { FinalBoss } from './components/FinalBoss';
import { AchievementsDrawer } from './components/Achievements';
import { SecretFooter, ToastBanner, type ToastNotice } from './components/EasterEggs';
import { TRANSLATIONS } from './data/translations';
import { REASONS_100 } from './data/content';
import type {
  AchievementId,
  AppProgress,
  EasterEggId,
  Language,
  MoodOptionId,
  SectionId,
} from './types/app';

const STORAGE_KEY_PROGRESS = 'eva_chaos_world_progress_v1';
const STORAGE_KEY_LANG = 'eva_chaos_world_lang_v1';
const NEEDED_FOR_FINAL = 4;

const EXPERIENCE_ORDER: SectionId[] = [
  'compliments',
  'quiz',
  'raccoon',
  'dudu_chaos',
  'charlie',
  'brain',
  'roulette',
  'fate',
  'mood',
  'reasons',
  'final',
];

const DEFAULT_PROGRESS: AppProgress = {
  enteredWorld: false,
  activeSection: 'compliments',
  completedSections: [],
  complimentCount: 0,
  quizBestScore: null,
  quizCompleted: false,
  raccoonWins: 0,
  duduHits: 0,
  duduSlaps: 0,
  brainScans: 0,
  rouletteSpins: 0,
  legendaryUnlocked: false,
  openedDoors: [],
  rescuedMoods: [],
  unlockedReasonsCount: 0,
  unlockedAchievements: [],
  foundEasterEggs: [],
  finalBossDefeated: false,
};

function loadInitialProgress(): AppProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<AppProgress>;
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function loadInitialLang(): Language {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_LANG);
    return raw === 'ru' ? 'ru' : 'en';
  } catch {
    return 'en';
  }
}

export default function App() {
  const [lang, setLang] = useState<Language>(loadInitialLang);
  const [progress, setProgress] = useState<AppProgress>(loadInitialProgress);
  const [bursts, setBursts] = useState<BurstEvent[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState<ToastNotice | null>(null);

  const starTapRef = useRef(0);
  const boopTapRef = useRef(0);
  const logoTapRef = useRef(0);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_LANG, lang);
    } catch {
      // Ignore storage quota errors
    }
  }, [lang]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showToast = useCallback((notice: Omit<ToastNotice, 'id'>) => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToast({ ...notice, id: Date.now() });
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
    }, 4200);
  }, []);

  const triggerBurst = useCallback((type: 'hearts' | 'confetti' | 'raccoon') => {
    const id = Date.now() + Math.random();
    setBursts((prev) => [...prev.slice(-3), { id, type }]);
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1100);
  }, []);

  const unlockAchievement = useCallback(
    (id: AchievementId) => {
      setProgress((prev) => {
        if (prev.unlockedAchievements.includes(id)) return prev;
        const tAch = TRANSLATIONS[lang].achievements;
        const item = tAch.items[id];
        showToast({
          title: tAch.toastPrefix,
          message: `${item.title} — ${item.description}`,
          icon: item.icon,
        });
        return {
          ...prev,
          unlockedAchievements: [...prev.unlockedAchievements, id],
        };
      });
    },
    [lang, showToast]
  );

  const markSectionComplete = useCallback((section: SectionId) => {
    setProgress((prev) => {
      if (prev.completedSections.includes(section)) return prev;
      return {
        ...prev,
        completedSections: [...prev.completedSections, section],
      };
    });
  }, []);

  const triggerEasterEgg = useCallback(
    (eggId: EasterEggId) => {
      const te = TRANSLATIONS[lang].easterEggs;
      const item = te.items[eggId];
      showToast({
        title: `${te.discoveredTitle} · ${item.title}`,
        message: item.message,
        icon: '🥚',
      });
      triggerBurst('hearts');

      setProgress((prev) => {
        const nextEggs = prev.foundEasterEggs.includes(eggId)
          ? prev.foundEasterEggs
          : [...prev.foundEasterEggs, eggId];
        const nextAch = prev.unlockedAchievements.includes('secret_finder')
          ? prev.unlockedAchievements
          : [...prev.unlockedAchievements, 'secret_finder' as AchievementId];
        return {
          ...prev,
          foundEasterEggs: nextEggs,
          unlockedAchievements: nextAch,
        };
      });
    },
    [lang, showToast, triggerBurst]
  );

  const handleStarTap = () => {
    starTapRef.current += 1;
    if (starTapRef.current >= 5) {
      starTapRef.current = 0;
      triggerEasterEgg('tiny_star');
    } else {
      triggerBurst('hearts');
    }
  };

  const handleDuduBoop = () => {
    boopTapRef.current += 1;
    if (boopTapRef.current >= 7) {
      boopTapRef.current = 0;
      triggerEasterEgg('dudu_boop');
    }
  };

  const handleLogoTap = () => {
    logoTapRef.current += 1;
    if (logoTapRef.current >= 5) {
      logoTapRef.current = 0;
      triggerEasterEgg('logo_inspector');
    } else if (progress.enteredWorld) {
      setProgress((prev) => ({ ...prev, activeSection: 'compliments' }));
    }
  };

  const handleEnterWorld = () => {
    triggerBurst('hearts');
    setProgress((prev) => ({
      ...prev,
      enteredWorld: true,
      activeSection: 'compliments',
    }));
    unlockAchievement('first_click');
  };

  const handleComplimentDispense = useCallback(() => {
    setProgress((prev) => {
      const nextCount = prev.complimentCount + 1;
      const nextCompleted = prev.completedSections.includes('compliments')
        ? prev.completedSections
        : [...prev.completedSections, 'compliments' as SectionId];
      return {
        ...prev,
        complimentCount: nextCount,
        completedSections: nextCompleted,
      };
    });
  }, []);

  const handleQuizComplete = (score: number) => {
    markSectionComplete('quiz');
    setProgress((prev) => ({
      ...prev,
      quizCompleted: true,
      quizBestScore: prev.quizBestScore === null ? score : Math.max(prev.quizBestScore, score),
    }));
    unlockAchievement('quiz_master');
  };

  const handleRaccoonWin = () => {
    markSectionComplete('raccoon');
    setProgress((prev) => ({
      ...prev,
      raccoonWins: prev.raccoonWins + 1,
    }));
    unlockAchievement('certified_raccoon');
  };

  const handleDuduShootHit = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      duduHits: prev.duduHits + 1,
      completedSections: prev.completedSections.includes('dudu_chaos')
        ? prev.completedSections
        : [...prev.completedSections, 'dudu_chaos' as SectionId],
    }));
  }, []);

  const handleDuduButtSlap = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      duduSlaps: prev.duduSlaps + 1,
      completedSections: prev.completedSections.includes('dudu_chaos')
        ? prev.completedSections
        : [...prev.completedSections, 'dudu_chaos' as SectionId],
    }));
  }, []);

  const handleBrainScan = () => {
    markSectionComplete('brain');
    setProgress((prev) => ({
      ...prev,
      brainScans: prev.brainScans + 1,
    }));
  };

  const handleRouletteComplete = (isLegendary: boolean) => {
    markSectionComplete('roulette');
    setProgress((prev) => ({
      ...prev,
      rouletteSpins: prev.rouletteSpins + 1,
      legendaryUnlocked: prev.legendaryUnlocked || isLegendary,
    }));
    unlockAchievement('roulette_survivor');
  };

  const handleOpenDoor = (doorId: number) => {
    markSectionComplete('fate');
    setProgress((prev) => ({
      ...prev,
      openedDoors: prev.openedDoors.includes(doorId)
        ? prev.openedDoors
        : [...prev.openedDoors, doorId],
    }));
  };

  const handleSelectMood = (moodId: MoodOptionId) => {
    markSectionComplete('mood');
    setProgress((prev) => ({
      ...prev,
      rescuedMoods: prev.rescuedMoods.includes(moodId)
        ? prev.rescuedMoods
        : [...prev.rescuedMoods, moodId],
    }));
  };

  const handleUnlockReason = useCallback(() => {
    setProgress((prev) => {
      const next = Math.min(prev.unlockedReasonsCount + 1, REASONS_100.length);
      const nextCompleted =
        next >= 5 && !prev.completedSections.includes('reasons')
          ? [...prev.completedSections, 'reasons' as SectionId]
          : prev.completedSections;
      return {
        ...prev,
        unlockedReasonsCount: next,
        completedSections: nextCompleted,
      };
    });
  }, []);

  useEffect(() => {
    if (progress.complimentCount >= 5) {
      unlockAchievement('compliment_collector');
    }
  }, [progress.complimentCount, unlockAchievement]);

  useEffect(() => {
    if (progress.unlockedReasonsCount >= REASONS_100.length) {
      unlockAchievement('reasons_100');
    }
  }, [progress.unlockedReasonsCount, unlockAchievement]);

  const handleFinalDefeat = () => {
    markSectionComplete('final');
    setProgress((prev) => ({
      ...prev,
      finalBossDefeated: true,
    }));
    unlockAchievement('final_boss');
  };

  const handleRestartWorld = () => {
    triggerBurst('confetti');
    setProgress((prev) => ({
      ...prev,
      enteredWorld: false,
      activeSection: 'compliments',
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetAll = () => {
    setProgress(DEFAULT_PROGRESS);
    window.localStorage.removeItem(STORAGE_KEY_PROGRESS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completedCoreCount = progress.completedSections.filter((s) => s !== 'final').length;
  const finalUnlocked = completedCoreCount >= NEEDED_FOR_FINAL;
  const isNightMode = progress.enteredWorld && progress.activeSection === 'final' && finalUnlocked;

  const t = TRANSLATIONS[lang];
  const currentIdx = EXPERIENCE_ORDER.indexOf(progress.activeSection);
  const nextSection =
    currentIdx >= 0 && currentIdx + 1 < EXPERIENCE_ORDER.length
      ? EXPERIENCE_ORDER[currentIdx + 1]
      : null;

  const selectSection = (section: SectionId) => {
    setProgress((prev) => ({ ...prev, activeSection: section }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-[100dvh] relative flex flex-col transition-colors duration-700 ${
        isNightMode ? 'text-purple-50' : 'text-[#2d1b3d]'
      }`}
    >
      <AmbientBackdrop
        nightMode={isNightMode}
        onStarTap={handleStarTap}
        starFound={progress.foundEasterEggs.includes('tiny_star')}
      />

      <ParticleBurstOverlay bursts={bursts} />

      {/* Compact Sticky Top Bar (well under 15% mobile viewport height) */}
      <header
        className={`sticky top-0 z-30 h-14 px-3 sm:px-6 flex items-center justify-between gap-2 backdrop-blur-md border-b transition-colors ${
          isNightMode
            ? 'bg-[#17092b]/75 border-purple-400/20'
            : 'bg-white/75 border-pink-200/70'
        }`}
      >
        <button
          type="button"
          onClick={handleLogoTap}
          className="font-display font-extrabold text-base sm:text-lg tracking-tight whitespace-nowrap shrink-0 cursor-pointer py-2 px-1"
        >
          {t.brand}
        </button>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {progress.enteredWorld && (
            <>
              <span
                className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold ${
                  isNightMode ? 'text-purple-200' : 'text-[#6b4d82]'
                }`}
              >
                <span>{t.nav.progressLabel}</span>
                <span className="font-mono-nums font-bold text-pink-500">
                  {Math.min(completedCoreCount, 10)}/10
                </span>
              </span>

              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                  isNightMode
                    ? 'bg-purple-800/60 hover:bg-purple-700/70 text-white'
                    : 'bg-pink-100/80 hover:bg-pink-200/80 text-[#2d1b3d]'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-pink-500" />
                <span className="font-mono-nums">
                  {progress.unlockedAchievements.length}/8
                </span>
              </button>
            </>
          )}

          {/* EN | RU toggle */}
          <div
            className={`inline-flex items-center p-0.5 rounded-xl border ${
              isNightMode
                ? 'bg-purple-950/80 border-purple-400/30'
                : 'bg-purple-100/80 border-purple-200/80'
            }`}
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`min-h-[34px] px-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                lang === 'en'
                  ? 'bg-white text-[#2d1b3d] shadow-sm'
                  : isNightMode
                  ? 'text-purple-200 hover:text-white'
                  : 'text-[#6b4d82] hover:text-[#2d1b3d]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('ru')}
              className={`min-h-[34px] px-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                lang === 'ru'
                  ? 'bg-white text-[#2d1b3d] shadow-sm'
                  : isNightMode
                  ? 'text-purple-200 hover:text-white'
                  : 'text-[#6b4d82] hover:text-[#2d1b3d]'
              }`}
            >
              RU
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 pt-4 pb-8">
        <AnimatePresence mode="wait">
          {!progress.enteredWorld ? (
            <motion.div
              key="welcome-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
            >
              <WelcomeScreen
                lang={lang}
                onEnter={handleEnterWorld}
                onBoop={handleDuduBoop}
              />
            </motion.div>
          ) : (
            <motion.div
              key="world-stage"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-5 sm:space-y-6"
            >
              {/* Chapter Rail: Single-line horizontal touch-friendly navigation */}
              <nav
                aria-label={t.nav.chapters}
                className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
              >
                {EXPERIENCE_ORDER.map((sectionId) => {
                  const info = t.sections[sectionId];
                  const isActive = progress.activeSection === sectionId;
                  const isDone = progress.completedSections.includes(sectionId);
                  const isLockedFinal = sectionId === 'final' && !finalUnlocked;

                  return (
                    <button
                      key={sectionId}
                      type="button"
                      onClick={() => selectSection(sectionId)}
                      className={`min-h-[44px] px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-display font-bold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                        isActive
                          ? isNightMode
                            ? 'bg-pink-500 text-white border-pink-400 shadow-md'
                            : 'bg-[#2d1b3d] text-white border-[#2d1b3d] shadow-md'
                          : isNightMode
                          ? 'bg-purple-900/50 text-purple-100 border-purple-400/20 hover:bg-purple-800/60'
                          : 'bg-white/75 text-[#4b2d63] border-purple-200/70 hover:bg-white'
                      }`}
                    >
                      <span aria-hidden="true">{info.emoji}</span>
                      <span>{info.short}</span>
                      {isLockedFinal ? (
                        <Lock className="w-3 h-3 opacity-70" />
                      ) : isDone ? (
                        <Check className="w-3.5 h-3.5 text-pink-400" />
                      ) : null}
                    </button>
                  );
                })}
              </nav>

              {/* Active Scene */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={progress.activeSection}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  {progress.activeSection === 'compliments' && (
                    <ComplimentMachine
                      lang={lang}
                      count={progress.complimentCount}
                      onDispense={handleComplimentDispense}
                      onBurst={triggerBurst}
                      onBoop={handleDuduBoop}
                    />
                  )}
                  {progress.activeSection === 'quiz' && (
                    <Quiz
                      lang={lang}
                      onComplete={handleQuizComplete}
                      onBurst={triggerBurst}
                      onBoop={handleDuduBoop}
                    />
                  )}
                  {progress.activeSection === 'raccoon' && (
                    <RaccoonGame
                      lang={lang}
                      onWin={handleRaccoonWin}
                      onBurst={triggerBurst}
                      onBoop={handleDuduBoop}
                    />
                  )}
                  {progress.activeSection === 'dudu_chaos' && (
                    <DuduChaosGame
                      lang={lang}
                      hits={progress.duduHits}
                      slaps={progress.duduSlaps}
                      onShootHit={handleDuduShootHit}
                      onButtSlap={handleDuduButtSlap}
                      onBurst={triggerBurst}
                    />
                  )}
                  {progress.activeSection === 'charlie' && (
                    <CharlieCartoon
                      lang={lang}
                      onComplete={() => markSectionComplete('charlie')}
                      onBurst={triggerBurst}
                    />
                  )}
                  {progress.activeSection === 'brain' && (
                    <BrainScanner
                      lang={lang}
                      onScanned={handleBrainScan}
                      onBurst={triggerBurst}
                      onBoop={handleDuduBoop}
                    />
                  )}
                  {progress.activeSection === 'roulette' && (
                    <ComplimentRoulette
                      lang={lang}
                      spins={progress.rouletteSpins}
                      onSpinComplete={handleRouletteComplete}
                      onBurst={triggerBurst}
                      onBoop={handleDuduBoop}
                    />
                  )}
                  {progress.activeSection === 'fate' && (
                    <FateDoors
                      lang={lang}
                      openedDoors={progress.openedDoors}
                      onOpenDoor={handleOpenDoor}
                      onBurst={triggerBurst}
                      onBoop={handleDuduBoop}
                    />
                  )}
                  {progress.activeSection === 'mood' && (
                    <MoodRescue
                      lang={lang}
                      onSelectMood={handleSelectMood}
                      onBurst={triggerBurst}
                      onBoop={handleDuduBoop}
                      onTriggerDoNotPress={() => triggerEasterEgg('do_not_press')}
                    />
                  )}
                  {progress.activeSection === 'reasons' && (
                    <Reasons100
                      lang={lang}
                      unlockedCount={progress.unlockedReasonsCount}
                      onUnlockNext={handleUnlockReason}
                      onBurst={triggerBurst}
                      onBoop={handleDuduBoop}
                    />
                  )}
                  {progress.activeSection === 'final' && (
                    <FinalBoss
                      lang={lang}
                      unlocked={finalUnlocked}
                      completedCount={completedCoreCount}
                      neededCount={NEEDED_FOR_FINAL}
                      onDefeat={handleFinalDefeat}
                      onRestartWorld={handleRestartWorld}
                      onBurst={triggerBurst}
                      onBoop={handleDuduBoop}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Fluid Next Surprise Link */}
              {nextSection && (
                <div className="flex justify-center sm:justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => selectSection(nextSection)}
                    className={`min-h-[46px] px-5 py-2.5 rounded-2xl font-display font-bold text-sm inline-flex items-center gap-2 transition-all cursor-pointer ${
                      isNightMode
                        ? 'bg-purple-800/60 text-purple-100 hover:bg-purple-700/70'
                        : 'bg-white/80 text-[#2d1b3d] border border-purple-200/80 hover:border-pink-400 shadow-sm'
                    }`}
                  >
                    <span>
                      {t.nav.nextSurprise}: {t.sections[nextSection].emoji}{' '}
                      {t.sections[nextSection].title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-pink-500" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <SecretFooter
          lang={lang}
          foundIds={progress.foundEasterEggs}
          onTriggerEgg={triggerEasterEgg}
          nightMode={isNightMode}
        />
      </main>

      <AchievementsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        lang={lang}
        unlockedAchievements={progress.unlockedAchievements}
        foundEasterEggs={progress.foundEasterEggs}
        onResetAll={handleResetAll}
      />

      <ToastBanner toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
