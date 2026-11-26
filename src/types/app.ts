export type Language = 'en' | 'ru';

export type LocalizedText = {
  en: string;
  ru: string;
};

export type DuduBubuMood =
  | 'welcome'
  | 'compliment'
  | 'happy'
  | 'confused'
  | 'laughing'
  | 'crying'
  | 'sleepy'
  | 'angry'
  | 'hug'
  | 'kiss'
  | 'celebration'
  | 'final'
  | 'running'
  | 'peeking'
  | 'dizzy'
  | 'shocked';

export type SectionId =
  | 'welcome'
  | 'compliments'
  | 'quiz'
  | 'raccoon'
  | 'dudu_chaos'
  | 'charlie'
  | 'brain'
  | 'roulette'
  | 'fate'
  | 'mood'
  | 'reasons'
  | 'final';

export type AchievementId =
  | 'first_click'
  | 'compliment_collector'
  | 'certified_raccoon'
  | 'quiz_master'
  | 'roulette_survivor'
  | 'secret_finder'
  | 'reasons_100'
  | 'final_boss';

export type EasterEggId =
  | 'tiny_star'
  | 'dudu_boop'
  | 'long_press_heart'
  | 'logo_inspector'
  | 'do_not_press'
  | 'secret_corner_heart';

export type ComplimentCategory =
  | 'cute'
  | 'romantic'
  | 'flirty'
  | 'spicy'
  | 'funny'
  | 'princess'
  | 'raccoon'
  | 'soft';

export type MoodOptionId =
  | 'sad'
  | 'tired'
  | 'bored'
  | 'angry'
  | 'affection'
  | 'raccoon';

export interface AppProgress {
  enteredWorld: boolean;
  activeSection: SectionId;
  completedSections: SectionId[];
  complimentCount: number;
  quizBestScore: number | null;
  quizCompleted: boolean;
  raccoonWins: number;
  duduHits: number;
  duduSlaps: number;
  brainScans: number;
  rouletteSpins: number;
  legendaryUnlocked: boolean;
  openedDoors: number[];
  rescuedMoods: MoodOptionId[];
  unlockedReasonsCount: number;
  unlockedAchievements: AchievementId[];
  foundEasterEggs: EasterEggId[];
  finalBossDefeated: boolean;
}
