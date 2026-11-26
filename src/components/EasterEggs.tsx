import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';
import type { EasterEggId, Language } from '../types/app';
import { TRANSLATIONS } from '../data/translations';

export interface ToastNotice {
  id: number;
  title: string;
  message: string;
  icon: string;
}

interface ToastBannerProps {
  toast: ToastNotice | null;
  onDismiss: () => void;
}

export const ToastBanner: React.FC<ToastBannerProps> = ({ toast, onDismiss }) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 pointer-events-none flex justify-center sm:justify-end">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="pointer-events-auto w-full max-w-sm rounded-2xl bg-[#2d1b3d]/95 text-white border border-pink-400/40 p-4 shadow-2xl backdrop-blur-md flex items-start gap-3"
          >
            <span className="text-2xl leading-none shrink-0">{toast.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold text-xs uppercase tracking-wider text-pink-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{toast.title}</span>
              </div>
              <p className="text-sm text-purple-50 mt-0.5 leading-snug">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss"
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SecretFooterProps {
  lang: Language;
  foundIds: EasterEggId[];
  onTriggerEgg: (id: EasterEggId) => void;
  nightMode: boolean;
}

export const SecretFooter: React.FC<SecretFooterProps> = ({
  lang,
  foundIds,
  onTriggerEgg,
  nightMode,
}) => {
  const te = TRANSLATIONS[lang].easterEggs;
  const pressTimerRef = useRef<number | null>(null);

  const startHold = () => {
    if (pressTimerRef.current) window.clearTimeout(pressTimerRef.current);
    pressTimerRef.current = window.setTimeout(() => {
      onTriggerEgg('long_press_heart');
    }, 750);
  };

  const endHold = () => {
    if (pressTimerRef.current) {
      window.clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  return (
    <footer
      className={`mt-8 pb-8 pt-4 px-4 text-center text-xs flex flex-wrap items-center justify-center gap-3 ${
        nightMode ? 'text-purple-200/75' : 'text-[#7e5e96]'
      }`}
    >
      {/* Easter Egg #3: Long-press heart */}
      <button
        type="button"
        onPointerDown={startHold}
        onPointerUp={endHold}
        onPointerLeave={endHold}
        onPointerCancel={endHold}
        onContextMenu={(e) => e.preventDefault()}
        className="min-h-[44px] px-3 inline-flex items-center gap-1.5 rounded-xl hover:bg-pink-500/10 select-none cursor-pointer transition-colors"
      >
        <span className="text-pink-500">♥</span>
        <span>
          {lang === 'ru'
            ? 'Удерживай сердечко ради секрета'
            : 'Hold this heart for a secret'}
        </span>
      </button>

      <span aria-hidden="true">·</span>

      <span>
        {te.counterLabel}: <strong className="font-mono-nums">{foundIds.length}/6</strong>
      </span>

      <span aria-hidden="true">·</span>

      {/* Easter Egg #6: Tiny hidden corner heart */}
      <button
        type="button"
        onClick={() => onTriggerEgg('secret_corner_heart')}
        aria-label="Pocket love note"
        className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl hover:scale-125 transition-transform cursor-pointer text-sm text-pink-400 hover:text-pink-500"
      >
        ♡
      </button>
    </footer>
  );
};
