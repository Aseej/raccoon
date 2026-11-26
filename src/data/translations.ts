import type { AchievementId, EasterEggId, Language, SectionId } from '../types/app';

export interface TranslationsShape {
  brand: string;
  nav: {
    progressLabel: string;
    achievements: string;
    chapters: string;
    nextSurprise: string;
    backToHub: string;
    lockedFinalHint: string;
  };
  sections: Record<SectionId, { short: string; title: string; emoji: string }>;
  welcome: {
    title: string;
    subtitle: string;
    cta: string;
    helper: string;
  };
  compliments: {
    title: string;
    subtitle: string;
    cta: string;
    countLabel: string;
    categoryAll: string;
    categories: {
      cute: string;
      romantic: string;
      flirty: string;
      spicy: string;
      funny: string;
      princess: string;
      raccoon: string;
      soft: string;
    };
    initialPrompt: string;
  };
  quiz: {
    title: string;
    subtitle: string;
    questionPrefix: string;
    scoreLabel: string;
    nextQuestion: string;
    seeResult: string;
    playAgain: string;
    finalResultHeading: string;
    youPicked: string;
  };
  raccoon: {
    title: string;
    subtitle: string;
    movesLabel: string;
    statusEscaping: string;
    winTitle: string;
    winMessage: string;
    playAgain: string;
    swipeHint: string;
    reset: string;
  };
  duduChaos: {
    title: string;
    subtitle: string;
    shootTab: string;
    slapTab: string;
    shootIntro: string;
    slapIntro: string;
    hitsLabel: string;
    slapsLabel: string;
    missText: string;
    slapButtonHint: string;
    bubuComment: string;
    fallenText: string;
  };
  charlie: {
    title: string;
    subtitle: string;
    peaceCaption: string;
    survivalCaption: string;
    stopBtn: string;
    treatBtn: string;
    ignoreBtn: string;
    stopResult: string;
    treatSolved: string;
    treatCallout: string;
    winsHeading: string;
    evaScore: string;
    charlieScore: string;
    runAgain: string;
    charliePlease: string;
    skipIntro: string;
    tryAllThreeHint: string;
  };
  brain: {
    title: string;
    subtitle: string;
    scanButton: string;
    scanningLabel: string;
    evaThoughtsLabel: string;
    criticalTitle: string;
    criticalBody: string;
    remainingBody: string;
    rescan: string;
    idleHint: string;
  };
  roulette: {
    title: string;
    subtitle: string;
    spinButton: string;
    spinningButton: string;
    legendaryTag: string;
    normalTag: string;
    spinsLabel: string;
  };
  fate: {
    title: string;
    subtitle: string;
    openDoor: string;
    closeDoor: string;
    anotherOne: string;
    openedBadge: string;
  };
  mood: {
    title: string;
    subtitle: string;
    makeBetter: string;
    choosePrompt: string;
    options: {
      sad: string;
      tired: string;
      bored: string;
      angry: string;
      affection: string;
      raccoon: string;
    };
  };
  reasons: {
    title: string;
    subtitle: string;
    unlockButton: string;
    unlockedLabel: string;
    milestoneTitle: string;
    completeTitle: string;
    completeBody: string;
    tapToStart: string;
    recentTitle: string;
  };
  final: {
    lockedTitle: string;
    lockedSubtitle: string;
    lockedProgress: string;
    unlockTip: string;
    title: string;
    subtitle: string;
    readyButton: string;
    theEnd: string;
    restartButton: string;
  };
  achievements: {
    drawerTitle: string;
    drawerSubtitle: string;
    unlockedCount: string;
    toastPrefix: string;
    resetProgress: string;
    resetConfirm: string;
    items: Record<AchievementId, { title: string; description: string; icon: string }>;
  };
  easterEggs: {
    discoveredTitle: string;
    counterLabel: string;
    items: Record<EasterEggId, { title: string; message: string }>;
  };
}

export const TRANSLATIONS: Record<Language, TranslationsShape> = {
  en: {
    brand: "Eva's World 🦝",
    nav: {
      progressLabel: 'Explored',
      achievements: 'Badges',
      chapters: 'World Map',
      nextSurprise: 'Next surprise',
      backToHub: 'All surprises',
      lockedFinalHint: 'Complete {remaining} more to unlock',
    },
    sections: {
      welcome: { short: 'Start', title: 'Welcome', emoji: '🌸' },
      compliments: { short: 'Machine', title: 'Compliment Machine', emoji: '💕' },
      quiz: { short: 'Quiz', title: 'Eva vs Aakash', emoji: '🎮' },
      raccoon: { short: 'Escape', title: 'Raccoon Escape', emoji: '🦝' },
      dudu_chaos: { short: 'Dudu Game', title: 'Shoot or Slap Dudu', emoji: '🎯' },
      charlie: { short: 'Charlie', title: "Charlie's Chaos", emoji: '🐕‍⬛' },
      brain: { short: 'Brain', title: 'Brain Scanner', emoji: '🧠' },
      roulette: { short: 'Wheel', title: 'Compliment Roulette', emoji: '🎡' },
      fate: { short: 'Doors', title: 'Choose Your Fate', emoji: '🚪' },
      mood: { short: 'Rescue', title: 'Mood Rescue', emoji: '🫂' },
      reasons: { short: '100 Reasons', title: '100 Little Reasons', emoji: '💯' },
      final: { short: 'Final', title: 'Final Boss', emoji: '👑' },
    },
    welcome: {
      title: 'HEY, LITTLE RACCOON 🦝',
      subtitle: 'I made you a tiny world. Unfortunately, escaping is not an option.',
      cta: 'ENTER MY CHAOS 💗',
      helper: 'Tap Dudu & Bubu anytime · Secrets are hidden everywhere',
    },
    compliments: {
      title: 'COMPLIMENT MACHINE 3000',
      subtitle: 'Because apparently one compliment is never enough.',
      cta: 'PRESS FOR SCIENTIFICALLY UNNECESSARY AFFECTION',
      countLabel: 'Dispensations',
      categoryAll: 'Surprise me',
      categories: {
        cute: 'Cute',
        romantic: 'Romantic',
        flirty: 'Flirty',
        spicy: 'Spicy 🔥',
        funny: 'Funny',
        princess: 'Princess',
        raccoon: 'Raccoon',
        soft: 'Soft',
      },
      initialPrompt: 'Tap the big glowing button below to begin cute calibration.',
    },
    quiz: {
      title: 'EVA VS AAKASH — ULTIMATE QUIZ',
      subtitle: 'Scientific research into who is actually the chaotic one.',
      questionPrefix: 'Question',
      scoreLabel: 'Chaos Points',
      nextQuestion: 'Next Question',
      seeResult: 'See Verdict',
      playAgain: 'Play Quiz Again',
      finalResultHeading: 'OFFICIAL VERDICT',
      youPicked: 'Your answer',
    },
    raccoon: {
      title: 'RACCOON ESCAPE',
      subtitle: 'Navigate the maze to reach the heart. Aakash is trying to catch you with hugs.',
      movesLabel: 'Steps',
      statusEscaping: 'Little raccoon is on the loose...',
      winTitle: 'MISSION FAILED SUCCESSFULLY',
      winMessage: 'You escaped… unfortunately I still love you. ❤️',
      playAgain: 'Escape Again',
      swipeHint: 'Swipe the maze or tap arrows below',
      reset: 'Reset Maze',
    },
    duduChaos: {
      title: 'BULLY DUDU ARENA (COMEDY EDITION)',
      subtitle: 'Feeling playful? Choose your weapon of mild chaos against poor Dudu.',
      shootTab: '🎯 Shoot Dudu',
      slapTab: "👋 Slap Dudu's Butt",
      shootIntro: 'Dudu is dodging around! Tap him to snipe him with love darts and prove your elite aim.',
      slapIntro: "Tap Dudu's chubby butt to slap it and watch him panic, sprint around, and wipe out!",
      hitsLabel: 'Direct Hits',
      slapsLabel: 'Butt Slaps',
      missText: 'WHOOSH! Dudu dodged!',
      slapButtonHint: 'Tap his butt!! 🍑',
      bubuComment: 'Bubu: lmao do it again 👀',
      fallenText: 'Dudu tripped and wiped out!! 💀💫',
    },
    charlie: {
      title: "CHARLIE'S “LEAVE ME ALONE” ANIMATION",
      subtitle: 'Based on 100% true peaceful moments interrupted by a tiny black menace.',
      peaceCaption: 'Eva finally got some peace.',
      survivalCaption: 'They have chosen survival.',
      stopBtn: '🗣️ “CHARLIE, STOP!”',
      treatBtn: '🦴 “GIVE HIM A TREAT”',
      ignoreBtn: '😭 “IGNORE HIM”',
      stopResult: 'He has respectfully ignored your request.',
      treatSolved: 'Problem solved.',
      treatCallout: 'YOU JUST GOT A TREAT.',
      winsHeading: '😂 CHARLIE WINS',
      evaScore: 'Eva: 0',
      charlieScore: 'Charlie: 1',
      runAgain: 'RUN IT AGAIN',
      charliePlease: 'CHARLIE, PLEASE 😭',
      skipIntro: 'Skip to buttons',
      tryAllThreeHint: 'Try all 3 responses below to unlock the finale!',
    },
    brain: {
      title: "WHAT DOES AAKASH'S BRAIN THINK?",
      subtitle: 'Unauthorized live diagnostic scan of available neural storage.',
      scanButton: "SCAN AAKASH'S BRAIN",
      scanningLabel: 'Reading brainwaves...',
      evaThoughtsLabel: 'Eva thoughts',
      criticalTitle: 'CRITICAL ERROR',
      criticalBody: 'Eva has occupied approximately 97% of available brain storage.',
      remainingBody: 'The remaining 3% is currently being used to think about food.',
      rescan: 'Scan Again (Just To Be Sure)',
      idleHint: 'Press scan to inspect current brain activity.',
    },
    roulette: {
      title: 'COMPLIMENT ROULETTE',
      subtitle: 'Spin the wheel of questionable judgment and high affection.',
      spinButton: 'SPIN',
      spinningButton: 'SPINNING...',
      legendaryTag: 'LEGENDARY COMPLIMENT UNLOCKED',
      normalTag: 'Wheel Verdict',
      spinsLabel: 'Spins',
    },
    fate: {
      title: 'CHOOSE YOUR FATE',
      subtitle: 'Three mysterious glowing doors. Dudu & Bubu are definitely eavesdropping.',
      openDoor: 'Open Door',
      closeDoor: 'Pick Another Door',
      anotherOne: 'Give Me Another',
      openedBadge: 'Peeked inside',
    },
    mood: {
      title: 'LITTLE RACCOON MOOD RESCUE CENTER',
      subtitle: 'Select your current condition for immediate boyfriend dispatch.',
      makeBetter: 'MAKE ME FEEL BETTER',
      choosePrompt: 'Tap how you are feeling right now:',
      options: {
        sad: '🥺 Sad',
        tired: '😴 Tired',
        bored: '😐 Bored',
        angry: '😤 Angry',
        affection: '🫂 Need affection',
        raccoon: '🦝 Maximum raccoon mode',
      },
    },
    reasons: {
      title: '100 LITTLE REASONS I LIKE YOU',
      subtitle: 'One tap at a time. No skipping ahead, curious raccoon.',
      unlockButton: 'UNLOCK NEXT REASON 💗',
      unlockedLabel: 'Unlocked',
      milestoneTitle: 'MILESTONE CELEBRATION!',
      completeTitle: '100/100 UNLOCKED.',
      completeBody: 'And somehow this list still isn’t finished.',
      tapToStart: 'Tap the glowing heart to unlock reason #1.',
      recentTitle: 'Recently unlocked',
    },
    final: {
      lockedTitle: 'FINAL BOSS LOCKED',
      lockedSubtitle: 'Explore a few more surprises first before facing the final level.',
      lockedProgress: 'Progress: {done} / {needed} surprises explored',
      unlockTip: 'Try the Compliment Machine, Quiz, Raccoon Escape, Brain Scan, or Roulette!',
      title: 'FINAL BOSS',
      subtitle: 'Can you handle this much love?',
      readyButton: "I'M READY",
      theEnd: 'THE END?',
      restartButton: 'NOPE. START AGAIN 🦝',
    },
    achievements: {
      drawerTitle: 'Your Little Badges',
      drawerSubtitle: 'Collected by being adorable and clicking everything.',
      unlockedCount: 'Unlocked',
      toastPrefix: 'Badge Unlocked',
      resetProgress: 'Reset all progress',
      resetConfirm: 'Tap again to confirm reset',
      items: {
        first_click: {
          title: 'First Click',
          description: 'Entered the chaos willingly (good luck).',
          icon: '🏆',
        },
        compliment_collector: {
          title: 'Compliment Collector',
          description: 'Pressed the Compliment Machine 5 times.',
          icon: '💕',
        },
        certified_raccoon: {
          title: 'Certified Raccoon',
          description: 'Escaped the maze and stole the heart.',
          icon: '🦝',
        },
        quiz_master: {
          title: 'Quiz Master',
          description: 'Survived Eva vs Aakash without blushing too hard.',
          icon: '🎮',
        },
        roulette_survivor: {
          title: 'Roulette Survivor',
          description: 'Spun the wheel of chaos and lived.',
          icon: '🎡',
        },
        secret_finder: {
          title: 'Secret Finder',
          description: 'Found a hidden Easter egg tucked inside the world.',
          icon: '🥚',
        },
        reasons_100: {
          title: '100 Reasons',
          description: 'Unlocked all 100 little reasons I like you.',
          icon: '💯',
        },
        final_boss: {
          title: 'Final Boss Defeated',
          description: 'Handled all of this love like a pro.',
          icon: '👑',
        },
      },
    },
    easterEggs: {
      discoveredTitle: 'SECRET UNLOCKED 👀',
      counterLabel: 'Secrets found',
      items: {
        tiny_star: {
          title: 'Stargazer Raccoon',
          message: 'YOU FOUND ME 👀 Okay, little raccoon. You are officially too curious.',
        },
        dudu_boop: {
          title: 'Serial Nose Booper',
          message: 'Secret affection unlocked! Dudu & Bubu demand 100 forehead kisses as payment.',
        },
        long_press_heart: {
          title: 'Patient Heart',
          message: 'Achievement: Secret Patience. You held on — just like I am holding onto you.',
        },
        logo_inspector: {
          title: 'Inspector Raccoon',
          message: 'Okay inspector raccoon, calm down 🦝🔍 There are no flaws in the code, only you being cute.',
        },
        do_not_press: {
          title: 'Zero Impulse Control',
          message: 'I literally wrote "do not press". Classic little raccoon behavior.',
        },
        secret_corner_heart: {
          title: 'Pocket Love Note',
          message: 'Tiny secret: You are my favorite notification every single day.',
        },
      },
    },
  },
  ru: {
    brand: 'Мир Евы 🦝',
    nav: {
      progressLabel: 'Открыто',
      achievements: 'Награды',
      chapters: 'Карта мира',
      nextSurprise: 'Дальше',
      backToHub: 'Все сюрпризы',
      lockedFinalHint: 'Открой ещё {remaining}, чтобы разблокировать',
    },
    sections: {
      welcome: { short: 'Старт', title: 'Приветствие', emoji: '🌸' },
      compliments: { short: 'Автомат', title: 'Генератор нежности', emoji: '💕' },
      quiz: { short: 'Квиз', title: 'Ева против Аакаша', emoji: '🎮' },
      raccoon: { short: 'Побег', title: 'Побег енотика', emoji: '🦝' },
      dudu_chaos: { short: 'Дуду-тир', title: 'Стреляй или шлёпни Дуду', emoji: '🎯' },
      charlie: { short: 'Чарли', title: 'Хаос от Чарли', emoji: '🐕‍⬛' },
      brain: { short: 'Мозг', title: 'Сканер мозга', emoji: '🧠' },
      roulette: { short: 'Рулетка', title: 'Рулетка комплиментов', emoji: '🎡' },
      fate: { short: 'Двери', title: 'Выбери свою судьбу', emoji: '🚪' },
      mood: { short: 'Спасение', title: 'Скорая помощь настроению', emoji: '🫂' },
      reasons: { short: '100 причин', title: '100 маленьких причин', emoji: '💯' },
      final: { short: 'Финал', title: 'Финальный босс', emoji: '👑' },
    },
    welcome: {
      title: 'ПРИВЕТ, МАЛЕНЬКИЙ ЕНОТИК 🦝',
      subtitle: 'Я сделал для тебя крошечный мир. К сожалению, сбежать отсюда нельзя.',
      cta: 'ВОЙТИ В МОЙ ХАОС 💗',
      helper: 'Нажимай на Дуду и Бубу · Внутри спрятаны секреты',
    },
    compliments: {
      title: 'АВТОМАТ КОМПЛИМЕНТОВ 3000',
      subtitle: 'Потому что одного комплимента тебе всегда мало.',
      cta: 'НАЖМИ ДЛЯ НАУЧНО НЕОБЯЗАТЕЛЬНОЙ ЛЮБВИ',
      countLabel: 'Выдано порций',
      categoryAll: 'Удиви меня',
      categories: {
        cute: 'Милое',
        romantic: 'Романтика',
        flirty: 'Флирт',
        spicy: 'С огоньком 🔥',
        funny: 'Смешное',
        princess: 'Принцессе',
        raccoon: 'Про енотика',
        soft: 'Нежное',
      },
      initialPrompt: 'Нажми на большую кнопку снизу, чтобы запустить калибровку милоты.',
    },
    quiz: {
      title: 'ЕВА ПРОТИВ ААКАША — СУПЕРКВИЗ',
      subtitle: 'Научное исследование того, кто из нас на самом деле более хаотичный.',
      questionPrefix: 'Вопрос',
      scoreLabel: 'Очки хаоса',
      nextQuestion: 'Следующий вопрос',
      seeResult: 'Узнать вердикт',
      playAgain: 'Пройти ещё раз',
      finalResultHeading: 'ОФИЦИАЛЬНЫЙ ВЕРДИКТ',
      youPicked: 'Твой ответ',
    },
    raccoon: {
      title: 'ПОБЕГ ЕНОТИКА',
      subtitle: 'Проведи енотика через лабиринт к сердечку. Аакаш уже бежит обниматься.',
      movesLabel: 'Шаги',
      statusEscaping: 'Маленький енотик на свободе...',
      winTitle: 'ПОБЕГ УДАЛСЯ (ПОЧТИ)',
      winMessage: 'Ты сбежала… но я всё равно тебя люблю. ❤️',
      playAgain: 'Сбежать ещё раз',
      swipeHint: 'Свайпай по полю или жми на стрелки снизу',
      reset: 'Сбросить лабиринт',
    },
    duduChaos: {
      title: 'АРЕНА ХАОСА ПРОТИВ ДУДУ',
      subtitle: 'Игривое настроение? Выбери способ весёлого издевательства над бедным Дуду.',
      shootTab: '🎯 Попади в Дуду',
      slapTab: '👋 Шлёпни по попке',
      shootIntro: 'Дуду уворачивается! Жми прямо по нему, чтобы попасть сердечком и показать свою меткость.',
      slapIntro: 'Шлёпни пухленькую попку Дуду и смотри, как он в панике бегает кругами и падает!',
      hitsLabel: 'Точных попаданий',
      slapsLabel: 'Шлепков',
      missText: 'МИМО! Дуду увернулся!',
      slapButtonHint: 'Шлёпай по попке!! 🍑',
      bubuComment: 'Бубу: хахаха давай ещё раз 👀',
      fallenText: 'Дуду споткнулся и грохнулся!! 💀💫',
    },
    charlie: {
      title: 'Чарли: «ОСТАВЬ МЕНЯ В ПОКОЕ»',
      subtitle: 'Основано на абсолютно реальных минутах тишины, уничтоженных маленьким чёрным врединой.',
      peaceCaption: 'Ева наконец-то обрела покой.',
      survivalCaption: 'Они выбрали выживание.',
      stopBtn: '🗣️ «ЧАРЛИ, СТОП!»',
      treatBtn: '🦴 «ДАТЬ ВКУСНЯШКУ»',
      ignoreBtn: '😭 «ИГНОРИРОВАТЬ»',
      stopResult: 'Он с уважением проигнорировал твою просьбу.',
      treatSolved: 'Проблема решена.',
      treatCallout: 'ТЫ ТОЛЬКО ЧТО ПОЛУЧИЛ ВКУСНЯШКУ.',
      winsHeading: '😂 ЧАРЛИ ПОБЕДИЛ',
      evaScore: 'Ева: 0',
      charlieScore: 'Чарли: 1',
      runAgain: 'ЗАПУСТИТЬ СНОВА',
      charliePlease: 'ЧАРЛИ, ПОЖАЛУЙСТА 😭',
      skipIntro: 'К кнопкам',
      tryAllThreeHint: 'Нажми все 3 реакции ниже, чтобы увидеть финал!',
    },
    brain: {
      title: 'ЧТО ПРОИСХОДИТ В ГОЛОВЕ У ААКАША?',
      subtitle: 'Несанкционированное сканирование доступной памяти мозга.',
      scanButton: 'СКАНИРОВАТЬ МОЗГ ААКАША',
      scanningLabel: 'Читаем нейронные волны...',
      evaThoughtsLabel: 'Мысли о Еве',
      criticalTitle: 'КРИТИЧЕСКАЯ ОШИБКА',
      criticalBody: 'Ева заняла примерно 97% всей доступной памяти мозга.',
      remainingBody: 'Оставшиеся 3% прямо сейчас используются, чтобы думать о еде.',
      rescan: 'Просканировать ещё раз',
      idleHint: 'Нажми на кнопку, чтобы проверить активность мозга.',
    },
    roulette: {
      title: 'РУЛЕТКА КОМПЛИМЕНТОВ',
      subtitle: 'Крути колесо сомнительной объективности и огромной нежности.',
      spinButton: 'КРУТИТЬ',
      spinningButton: 'КРУТИМ...',
      legendaryTag: 'ЛЕГЕНДАРНЫЙ КОМПЛИМЕНТ ОТКРЫТ',
      normalTag: 'Вердикт колеса',
      spinsLabel: 'Вращений',
    },
    fate: {
      title: 'ВЫБЕРИ СВОЮ СУДЬБУ',
      subtitle: 'Три загадочные светящиеся двери. Дуду и Бубу явно подсматривают.',
      openDoor: 'Открыть дверь',
      closeDoor: 'Выбрать другую дверь',
      anotherOne: 'Хочу ещё одно',
      openedBadge: 'Уже заглянула',
    },
    mood: {
      title: 'СЛУЖБА СПАСЕНИЯ МАЛЕНЬКОГО ЕНОТИКА',
      subtitle: 'Выбери своё текущее состояние для экстренной поддержки.',
      makeBetter: 'СДЕЛАЙ МНЕ ЛУЧШЕ',
      choosePrompt: 'Нажми, как ты себя чувствуешь прямо сейчас:',
      options: {
        sad: '🥺 Грустно',
        tired: '😴 Устала',
        bored: '😐 Скучно',
        angry: '😤 Злюсь',
        affection: '🫂 Хочу обнимашек',
        raccoon: '🦝 Режим супер-енота',
      },
    },
    reasons: {
      title: '100 МАЛЕНЬКИХ ПРИЧИН, ПОЧЕМУ ТЫ МНЕ НРАВИШЬСЯ',
      subtitle: 'Открывай по одной. Без подглядывания вперёд, любопытный енотик.',
      unlockButton: 'ОТКРЫТЬ СЛЕДУЮЩУЮ ПРИЧИНУ 💗',
      unlockedLabel: 'Открыто',
      milestoneTitle: 'ЮБИЛЕЙНАЯ ОТМЕТКА!',
      completeTitle: '100/100 ОТКРЫТО.',
      completeBody: 'И почему-то этот список всё равно не заканчивается.',
      tapToStart: 'Нажми на сердечко, чтобы открыть причину №1.',
      recentTitle: 'Недавно открыто',
    },
    final: {
      lockedTitle: 'ФИНАЛЬНЫЙ БОСС ЗАБЛОКИРОВАН',
      lockedSubtitle: 'Сначала открой ещё немного сюрпризов, прежде чем идти к финалу.',
      lockedProgress: 'Прогресс: {done} / {needed} сюрпризов изучено',
      unlockTip: 'Загляни в Автомат комплиментов, Квиз, Побег енотика, Сканер или Рулетку!',
      title: 'ФИНАЛЬНЫЙ БОСС',
      subtitle: 'Выдержишь столько любви?',
      readyButton: 'Я ГОТОВА',
      theEnd: 'КОНЕЦ?',
      restartButton: 'НЕ-А. НАЧАТЬ СНАЧАЛА 🦝',
    },
    achievements: {
      drawerTitle: 'Твои маленькие награды',
      drawerSubtitle: 'Собраны за очаровательность и любопытство.',
      unlockedCount: 'Открыто',
      toastPrefix: 'Награда открыта',
      resetProgress: 'Сбросить весь прогресс',
      resetConfirm: 'Нажми ещё раз для подтверждения',
      items: {
        first_click: {
          title: 'Первый клик',
          description: 'Добровольно вошла в мой хаос (удачи).',
          icon: '🏆',
        },
        compliment_collector: {
          title: 'Коллекционер нежности',
          description: 'Нажала на Автомат комплиментов 5 раз.',
          icon: '💕',
        },
        certified_raccoon: {
          title: 'Сертифицированный енотик',
          description: 'Прошла лабиринт и украла сердечко.',
          icon: '🦝',
        },
        quiz_master: {
          title: 'Мастер квиза',
          description: 'Прошла квиз и почти не смутилась.',
          icon: '🎮',
        },
        roulette_survivor: {
          title: 'Выжившая в рулетке',
          description: 'Покрутила колесо хаоса и осталась жива.',
          icon: '🎡',
        },
        secret_finder: {
          title: 'Искательница секретов',
          description: 'Нашла спрятанную пасхалку в этом мире.',
          icon: '🥚',
        },
        reasons_100: {
          title: '100 причин',
          description: 'Открыла все 100 маленьких причин.',
          icon: '💯',
        },
        final_boss: {
          title: 'Финальный босс побеждён',
          description: 'Справилась со всей этой любовью на отлично.',
          icon: '👑',
        },
      },
    },
    easterEggs: {
      discoveredTitle: 'СЕКРЕТ НАЙДЕН 👀',
      counterLabel: 'Найдено секретов',
      items: {
        tiny_star: {
          title: 'Любопытный звездочёт',
          message: 'ТЫ МЕНЯ НАШЛА 👀 Ладно, маленький енотик, ты официально слишком любопытная.',
        },
        dudu_boop: {
          title: 'Профессиональный тыкальщик носиков',
          message: 'Секретная нежность открыта! Дуду и Бубу требуют 100 поцелуев в лобик.',
        },
        long_press_heart: {
          title: 'Терпеливое сердечко',
          message: 'Секретное терпение открыто. Ты не отпустила — прямо как я не отпускаю тебя.',
        },
        logo_inspector: {
          title: 'Инспектор енотик',
          message: 'Спокойно, инспектор енотик 🦝🔍 В коде ошибок нет — только ты слишком милая.',
        },
        do_not_press: {
          title: 'Ноль самоконтроля',
          message: 'Я буквально написал «не нажимать». Классический маленький енотик.',
        },
        secret_corner_heart: {
          title: 'Карманная записка',
          message: 'Маленький секрет: твоё сообщение — моё любимое уведомление каждый день.',
        },
      },
    },
  },
};
