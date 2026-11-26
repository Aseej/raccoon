import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { DuduBubu } from './DuduBubu';
import { QUIZ_QUESTIONS, QUIZ_VERDICTS } from '../data/content';
import { TRANSLATIONS } from '../data/translations';
import type { DuduBubuMood, Language } from '../types/app';

interface QuizProps {
  lang: Language;
  onComplete: (score: number) => void;
  onBurst: (type: 'hearts' | 'confetti' | 'raccoon') => void;
  onBoop: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ lang, onComplete, onBurst, onBoop }) => {
  const t = TRANSLATIONS[lang].quiz;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const selectedOption = selectedIdx !== null ? currentQuestion.options[selectedIdx] : null;

  const currentMood: DuduBubuMood = finished
    ? 'celebration'
    : selectedOption
    ? selectedOption.isCorrectFeel
      ? 'celebration'
      : 'confused'
    : 'happy';

  const handleSelectOption = (idx: number) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(idx);
    const chosen = currentQuestion.options[idx];
    setScore((prev) => prev + chosen.points);
    if (chosen.isCorrectFeel) {
      onBurst('hearts');
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIdx(null);
    } else {
      setFinished(true);
      onComplete(score);
      onBurst('confetti');
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedIdx(null);
    setFinished(false);
  };

  const verdict =
    QUIZ_VERDICTS.find((v) => score >= v.minScore) ?? QUIZ_VERDICTS[QUIZ_VERDICTS.length - 1];

  return (
    <div className="glass-card rounded-[32px] p-5 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Character + Progress */}
        <div className="lg:col-span-5 flex flex-col items-center text-center gap-4">
          <DuduBubu mood={currentMood} size="lg" onBoop={onBoop} />
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6b4d82]">
            <span>
              {t.questionPrefix} {Math.min(currentIndex + 1, QUIZ_QUESTIONS.length)} /{' '}
              {QUIZ_QUESTIONS.length}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {t.scoreLabel}: <strong className="font-mono-nums text-pink-600">{score}</strong>
            </span>
          </div>
          {/* Minimal progress bar */}
          <div className="w-full max-w-[240px] h-2 rounded-full bg-purple-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
              style={{
                width: `${
                  finished ? 100 : ((currentIndex + (selectedIdx !== null ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Question or Final Result */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2d1b3d]">
                    {t.title}
                  </h2>
                  <p className="text-sm text-[#6b4d82]">{t.subtitle}</p>
                </div>

                <p className="font-display text-lg sm:text-xl font-bold text-[#2d1b3d] leading-snug pt-2">
                  {currentQuestion.question[lang]}
                </p>

                <div className="space-y-2.5">
                  {currentQuestion.options.map((opt, idx) => {
                    const isPicked = selectedIdx === idx;
                    const isDisabled = selectedIdx !== null;
                    return (
                      <motion.button
                        key={idx}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => handleSelectOption(idx)}
                        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
                        className={`w-full min-h-[50px] px-4 py-3 rounded-2xl text-left font-medium text-sm sm:text-base transition-all border cursor-pointer ${
                          isPicked
                            ? opt.isCorrectFeel
                              ? 'bg-pink-500 text-white border-pink-500 shadow-md'
                              : 'bg-purple-600 text-white border-purple-600 shadow-md'
                            : isDisabled
                            ? 'bg-white/50 text-[#7e5e96] border-purple-100 opacity-65'
                            : 'bg-white/85 text-[#2d1b3d] border-purple-200/80 hover:border-pink-400 hover:bg-pink-50/70'
                        }`}
                      >
                        {opt.label[lang]}
                      </motion.button>
                    );
                  })}
                </div>

                {selectedOption && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 p-4 space-y-3"
                  >
                    <p className="text-sm sm:text-base font-medium text-[#2d1b3d] leading-relaxed">
                      {selectedOption.feedback[lang]}
                    </p>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full sm:w-auto min-h-[46px] px-6 py-2.5 rounded-xl bg-[#2d1b3d] text-white font-display font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#3f2656] transition-colors cursor-pointer"
                    >
                      <span>
                        {currentIndex + 1 < QUIZ_QUESTIONS.length ? t.nextQuestion : t.seeResult}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5 text-center lg:text-left"
              >
                <div className="text-xs font-bold tracking-wider uppercase text-pink-600">
                  {t.finalResultHeading}
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-[#2d1b3d]">
                  {verdict.title[lang]}
                </h3>
                <p className="text-base text-[#5b3d72] leading-relaxed">
                  {verdict.description[lang]}
                </p>
                <div className="text-sm text-[#6b4d82]">
                  {t.scoreLabel}:{' '}
                  <span className="font-mono-nums font-bold text-pink-600">{score}</span>
                </div>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-display font-bold text-sm sm:text-base inline-flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.playAgain}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
