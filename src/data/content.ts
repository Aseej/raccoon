import type {
  ComplimentCategory,
  DuduBubuMood,
  LocalizedText,
  MoodOptionId,
} from '../types/app';

export interface ComplimentEntry {
  category: ComplimentCategory;
  text: LocalizedText;
}

export const COMPLIMENT_LOADING_SEQUENCES: LocalizedText[][] = [
  [
    { en: 'Scanning for flaws...', ru: 'Ищу недостатки...' },
    { en: 'Scanning...', ru: 'Сканирую...' },
    {
      en: 'ERROR 404: Flaws not found. System has concluded that you are ridiculously cute.',
      ru: 'ОШИБКА 404: Недостатки не найдены. Система постановила, что ты неприлично милая.',
    },
  ],
  [
    { en: 'Analyzing smile levels...', ru: 'Анализирую уровень улыбки...' },
    { en: 'WARNING: Excessive cuteness.', ru: 'ВНИМАНИЕ: Превышение нормы милоты.' },
    {
      en: 'System overheating. Please stop being this adorable.',
      ru: 'Система перегревается. Пожалуйста, хватит быть настолько очаровательной.',
    },
  ],
  [
    { en: 'Calibrating affection sensors...', ru: 'Калибрую датчики нежности...' },
    { en: 'Searching heart database...', ru: 'Ищу в базе данных сердечка...' },
    {
      en: 'Little raccoon detected. Immediate forehead kisses required.',
      ru: 'Обнаружен маленький енотик. Требуется срочный поцелуй в лобик.',
    },
  ],
  [
    { en: 'Checking blush levels...', ru: 'Измеряю уровень румянца...' },
    { en: 'Heart rate accelerating...', ru: 'Пульс стремительно растёт...' },
    {
      en: 'Result: You have no idea how dangerously irresistible you look when you smile like that.',
      ru: 'Результат: ты даже не представляешь, насколько опасно притягательной выглядишь с этой улыбкой.',
    },
  ],
];

export const COMPLIMENTS: ComplimentEntry[] = [
  {
    category: 'cute',
    text: {
      en: 'Congratulations. You are officially too cute to be left unsupervised.',
      ru: 'Поздравляю. Ты официально слишком милая, чтобы оставлять тебя без присмотра.',
    },
  },
  {
    category: 'funny',
    text: {
      en: 'Scientists have investigated your face. They have requested more funding.',
      ru: 'Учёные изучили твоё милое личико и немедленно запросили дополнительное финансирование.',
    },
  },
  {
    category: 'romantic',
    text: {
      en: 'Your smile is honestly unfair. How am I supposed to focus on anything else?',
      ru: 'Твоя улыбка — это вообще нечестно. Как мне после этого сосредоточиться на чём-то другом?',
    },
  },
  {
    category: 'raccoon',
    text: {
      en: 'Little raccoon detected. Immediate affection and snacks required.',
      ru: 'Обнаружен маленький енотик. Срочно выдать обнимашки и что-нибудь вкусное.',
    },
  },
  {
    category: 'flirty',
    text: {
      en: 'Are you aware that just looking at you ruins my productivity for the day?',
      ru: 'Ты вообще в курсе, что одна мысль о тебе полностью отключает мою продуктивность на весь день?',
    },
  },
  {
    category: 'princess',
    text: {
      en: 'Friendly reminder that you are a certified princess, even when acting like a chaotic gremlin.',
      ru: 'Дружеское напоминание: ты сертифицированная принцесса, даже когда ведёшь себя как маленький хаос.',
    },
  },
  {
    category: 'soft',
    text: {
      en: 'Somehow, talking to you makes even the heaviest day feel lighter.',
      ru: 'Каким-то чудом разговор с тобой делает даже самый тяжёлый день намного легче.',
    },
  },
  {
    category: 'cute',
    text: {
      en: 'Your tiny reactions to things are my favorite form of entertainment.',
      ru: 'Твои маленькие реакции на всякие мелочи — моё любимое зрелище во вселенной.',
    },
  },
  {
    category: 'romantic',
    text: {
      en: 'If I could pick anyone in every possible universe, I would still pick you.',
      ru: 'Если бы я мог выбирать в любой из возможных вселенных, я бы всё равно выбрал тебя.',
    },
  },
  {
    category: 'raccoon',
    text: {
      en: '10/10 little raccoon energy. Would happily let you steal all my hoodies.',
      ru: 'Энергия маленького енотика на 10 из 10. С радостью отдам тебе все свои худи.',
    },
  },
  {
    category: 'flirty',
    text: {
      en: 'Quick question: is it exhausting being the prettiest person in every room?',
      ru: 'Быстрый вопрос: ты не устаёшь быть самой красивой вообще везде, где появляешься?',
    },
  },
  {
    category: 'funny',
    text: {
      en: 'Notice: You have been diagnosed with chronic adorableness. No cure exists.',
      ru: 'Уведомление: у тебя диагностирована хроническая очаровательность. Лечению не поддаётся.',
    },
  },
  {
    category: 'princess',
    text: {
      en: 'Royal decree: Eva gets extra hugs, extra attention, and zero stress today.',
      ru: 'Королевский указ: сегодня Еве положены двойные обнимашки, море внимания и ноль переживаний.',
    },
  },
  {
    category: 'soft',
    text: {
      en: 'You have the kindest heart, even when you pretend to be tough.',
      ru: 'У тебя самое доброе сердце, даже когда ты делаешь вид, что ты грозный енотик.',
    },
  },
  {
    category: 'cute',
    text: {
      en: 'Every time you laugh, my brain forgets whatever it was stressed about.',
      ru: 'Каждый раз, когда ты смеёшься, мой мозг забывает всё, о чём переживал.',
    },
  },
  {
    category: 'romantic',
    text: {
      en: 'You feel like home and an adventure at the exact same time.',
      ru: 'С тобой рядом спокойно как дома и одновременно интересно как в лучшем приключении.',
    },
  },
  {
    category: 'flirty',
    text: {
      en: 'Stop looking that cute in my head, I am trying to be a serious person.',
      ru: 'Хватит выглядеть такой милой у меня в мыслях, я вообще-то пытаюсь быть серьёзным человеком.',
    },
  },
  {
    category: 'raccoon',
    text: {
      en: 'Tiny paws, chaotic thoughts, heart of pure gold. Classic Eva.',
      ru: 'Крошечные лапки, хаотичные мысли и золотое сердце. Классическая Ева.',
    },
  },
  {
    category: 'funny',
    text: {
      en: 'Breaking news: Local boyfriend still not over how cute Eva is.',
      ru: 'Срочные новости: местный парень всё ещё не может прийти в себя от того, какая Ева милая.',
    },
  },
  {
    category: 'soft',
    text: {
      en: 'I genuinely love the way your mind works and how deeply you care.',
      ru: 'Мне искренне нравится, как устроены твои мысли и как глубоко ты умеешь чувствовать.',
    },
  },
  {
    category: 'princess',
    text: {
      en: 'Crown status: permanently secured. Do not attempt to return it.',
      ru: 'Статус короны: закреплена пожизненно. Попытки вернуть её отклоняются.',
    },
  },
  // === Spicy & Blush-Worthy Collection ===
  {
    category: 'spicy',
    text: {
      en: 'Be honest—do you practice looking that effortlessly irresistible, or does it just happen by accident?',
      ru: 'Признавайся, ты специально тренируешься выглядеть так неотразимо, или это у тебя само получается?',
    },
  },
  {
    category: 'spicy',
    text: {
      en: 'The things I think about when you look at me with that little smirk should probably come with a warning label.',
      ru: 'Мысли, которые появляются у меня в голове от твоей хитрой улыбки, давно пора помечать знаком «опасно».',
    },
  },
  {
    category: 'spicy',
    text: {
      en: 'You are dangerously pretty. Like, "forget what I was saying mid-sentence" pretty.',
      ru: 'Ты до безумия красивая. Настолько, что я буквально забываю, что хотел сказать, на полуслове.',
    },
  },
  {
    category: 'spicy',
    text: {
      en: 'Come a little closer and let me show you in person why I can barely keep my hands off you.',
      ru: 'Подойди поближе, и я покажу тебе вживую, почему от тебя просто невозможно оторваться.',
    },
  },
  {
    category: 'spicy',
    text: {
      en: 'Warning: If you keep smiling at your phone like that, I am going to owe you a very long, very slow kiss later.',
      ru: 'Предупреждение: если продолжишь так улыбаться в телефон, я буду должен тебе очень долгий и медленный поцелуй.',
    },
  },
  {
    category: 'spicy',
    text: {
      en: 'You have zero idea how much self-control it takes not to pull you in by the waist every time you stand next to me.',
      ru: 'Ты даже не догадываешься, сколько мне нужно выдержки, чтобы не притянуть тебя за талию каждый раз, когда ты рядом.',
    },
  },
  {
    category: 'spicy',
    text: {
      en: 'Honestly? Making you blush right now is officially my favorite hobby.',
      ru: 'Честно? Заставлять тебя краснеть прямо сейчас — моё новое любимое хобби.',
    },
  },
  {
    category: 'spicy',
    text: {
      en: 'Stop trying to look innocent when we both know exactly how much trouble you cause in my head.',
      ru: 'Хватит строить из себя ангелочка, когда мы оба знаем, какой пожар ты устраиваешь у меня в голове.',
    },
  },
  {
    category: 'spicy',
    text: {
      en: 'My favorite place to be? Close enough to feel your breath right before I kiss you.',
      ru: 'Моё любимое место на свете? Достаточно близко, чтобы чувствовать твоё дыхание за секунду до поцелуя.',
    },
  },
  {
    category: 'spicy',
    text: {
      en: 'Every time you bite your lip or get shy for half a second, my brain completely short-circuits.',
      ru: 'Каждый раз, когда ты прикусываешь губу или смущаешься на долю секунды, у меня полностью отключается мозг.',
    },
  },
  {
    category: 'spicy',
    text: {
      en: 'I don’t think you realize how unfair it is when you look that soft and that stunning at the exact same time.',
      ru: 'Ты, кажется, не понимаешь, как это нечестно — быть одновременно такой нежной и такой сводящей с ума.',
    },
  },
  {
    category: 'spicy',
    text: {
      en: 'If kisses were stars, I’d trace a constellation from your lips right down your neck.',
      ru: 'Если бы поцелуи были звёздами, я бы нарисовал целое созвездие от твоих губ к твоей шее.',
    },
  },
  {
    category: 'spicy',
    text: {
      en: 'Good luck concentrating today—I am claiming full ownership of your thoughts.',
      ru: 'Удачи сегодня сосредоточиться на делах — я официально забираю все твои мысли себе.',
    },
  },
  {
    category: 'spicy',
    text: {
      en: 'You are my favorite craving, my favorite distraction, and my favorite person to tease until you blush.',
      ru: 'Ты — моё любимое искушение, главное отвлечение и любимый человек, которого так приятно смущать.',
    },
  },
  {
    category: 'flirty',
    text: {
      en: 'Even in a room full of a hundred people, my eyes only ever look for you, Eva.',
      ru: 'Даже в комнате, где сто человек, мой взгляд всё равно всегда ищет только тебя, Ева.',
    },
  },
  {
    category: 'flirty',
    text: {
      en: 'You make me smile at my screen like an idiot, and honestly, I am not even trying to hide it anymore.',
      ru: 'Из-за тебя я улыбаюсь в экран как влюблённый дурак, и, честно говоря, даже не пытаюсь это скрывать.',
    },
  },
  {
    category: 'flirty',
    text: {
      en: 'Every time you get slightly shy after I compliment you, you look twice as kissable.',
      ru: 'Каждый раз, когда ты чуть-чуть смущаешься от моих слов, тебя хочется поцеловать ещё сильнее.',
    },
  },
  {
    category: 'flirty',
    text: {
      en: 'Just a heads up: next time I see you, you are not escaping without at least ten extra kisses.',
      ru: 'Просто предупреждаю: в следующий раз при встрече ты от меня не уйдёшь минимум без десяти лишних поцелуев.',
    },
  },
  {
    category: 'romantic',
    text: {
      en: 'If someone asked me what magic looks like in real life, I’d just describe the way your eyes light up.',
      ru: 'Если бы меня спросили, как выглядит магия в реальной жизни, я бы просто описал, как сияют твои глаза.',
    },
  },
  {
    category: 'romantic',
    text: {
      en: 'Being yours feels like winning a lottery I didn’t even know I had a ticket for.',
      ru: 'Быть твоим — это как выиграть в лотерею, на которую я даже не знал, что купил билет.',
    },
  },
  {
    category: 'romantic',
    text: {
      en: 'Somehow, even your voice on a random evening feels better than any favorite song.',
      ru: 'Каким-то образом даже твой голос обычным вечером звучит лучше любой любимой песни.',
    },
  },
  {
    category: 'romantic',
    text: {
      en: 'No matter how loud the world gets, five minutes with you brings everything back into focus.',
      ru: 'Как бы шумно ни было вокруг, пять минут с тобой возвращают весь мир на место.',
    },
  },
  {
    category: 'cute',
    text: {
      en: 'You are so painfully adorable that Dudu & Bubu are filing a copyright complaint.',
      ru: 'Ты настолько невозможно милая, что Дуду и Бубу уже подают жалобу за нарушение авторских прав.',
    },
  },
  {
    category: 'soft',
    text: {
      en: 'You don’t ever have to try too hard with me—just showing up as yourself already makes my day.',
      ru: 'Тебе никогда не нужно притворяться со мной — одно твоё появление уже делает мой день лучше.',
    },
  },
  {
    category: 'raccoon',
    text: {
      en: 'Little raccoon stole my hoodie, my sleep, and my heart. Still giving you 5 stars on Yelp.',
      ru: 'Маленький енотик украл моё худи, мой сон и моё сердце. Всё равно ставлю 5 звёзд из 5.',
    },
  },
  {
    category: 'princess',
    text: {
      en: 'Reminder: You deserve flowers, forehead kisses, iced coffee, and zero stress—every single week.',
      ru: 'Напоминание: ты заслуживаешь цветы, поцелуи в лобик, вкусный кофе и ноль нервов — каждую неделю.',
    },
  },
];

export interface QuizOption {
  label: LocalizedText;
  points: number;
  feedback: LocalizedText;
  isCorrectFeel: boolean;
}

export interface QuizQuestion {
  id: string;
  question: LocalizedText;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'overthink',
    question: {
      en: 'Who is more likely to overthink a tiny 3-word message?',
      ru: 'Кто с большей вероятностью накрутит себя из-за сообщения из трёх слов?',
    },
    options: [
      {
        label: { en: 'Definitely Eva 🦝', ru: 'Точно Ева 🦝' },
        points: 10,
        isCorrectFeel: true,
        feedback: {
          en: 'Truth detected! One period at the end of a sentence and Eva starts writing a whole movie script.',
          ru: 'Чистая правда! Одна точка в конце предложения — и Ева уже сняла целый драматический сериал в голове.',
        },
      },
      {
        label: { en: 'Aakash, secretly', ru: 'Тайком Аакаш' },
        points: 8,
        isCorrectFeel: true,
        feedback: {
          en: 'Okay fair, Aakash definitely reads it 4 times too… just to make sure you’re happy.',
          ru: 'Ладно, справедливо, Аакаш тоже перечитывает 4 раза — просто чтобы убедиться, что у тебя хорошее настроение.',
        },
      },
      {
        label: { en: 'Both of us simultaneously', ru: 'Оба одновременно' },
        points: 10,
        isCorrectFeel: true,
        feedback: {
          en: 'Two overthinkers sharing one single braincell. Iconic.',
          ru: 'Два оверсинкера на одну общую клетку мозга. Легендарный дуэт.',
        },
      },
    ],
  },
  {
    id: 'chaotic',
    question: {
      en: 'Who brings 80% of the chaos into this relationship?',
      ru: 'Кто приносит 80% всего хаоса в эти отношения?',
    },
    options: [
      {
        label: { en: 'Eva (no regrets)', ru: 'Ева (и ни о чём не жалеет)' },
        points: 10,
        isCorrectFeel: true,
        feedback: {
          en: 'Zero hesitation, zero guilt. That is prime little raccoon energy right there.',
          ru: 'Ноль сомнений, ноль сожалений. Вот она, настоящая энергия маленького енотика.',
        },
      },
      {
        label: { en: 'Aakash enables it', ru: 'Аакаш сам это поощряет' },
        points: 9,
        isCorrectFeel: true,
        feedback: {
          en: 'Wait—why is that actually true? I literally built this chaotic website for you.',
          ru: 'Погоди… а ведь это правда. Я буквально сделал целый хаотичный сайт ради тебя.',
        },
      },
      {
        label: { en: 'I am innocent!! 🥺', ru: 'Я вообще невинный ангелочек!! 🥺' },
        points: 4,
        isCorrectFeel: false,
        feedback: {
          en: 'Dudu & Bubu checked the security cameras. Nice try, little raccoon.',
          ru: 'Дуду и Бубу проверили камеры наблюдения. Хорошая попытка, маленький енотик.',
        },
      },
    ],
  },
  {
    id: 'baby',
    question: {
      en: 'Who is secretly the bigger baby when they want attention?',
      ru: 'Кто на самом деле больший малыш, когда хочет внимания?',
    },
    options: [
      {
        label: { en: 'Eva when sleepy/hungry', ru: 'Ева, когда хочет спать или кушать' },
        points: 10,
        isCorrectFeel: true,
        feedback: {
          en: 'And honestly? It is the cutest thing in existence. 100% effective.',
          ru: 'И честно? Это самая милая вещь на свете. Работает безотказно.',
        },
      },
      {
        label: { en: 'Aakash when he misses Eva', ru: 'Аакаш, когда скучает по Еве' },
        points: 10,
        isCorrectFeel: true,
        feedback: {
          en: 'Caught red-handed. Guilty as charged.',
          ru: 'Пойман с поличным. Виновен по всем статьям.',
        },
      },
      {
        label: { en: 'Neither, we are very mature', ru: 'Никто, мы очень взрослые люди' },
        points: 3,
        isCorrectFeel: false,
        feedback: {
          en: 'System error: Statement laughed at by everyone involved.',
          ru: 'Ошибка системы: над этим утверждением посмеялись даже мы сами.',
        },
      },
    ],
  },
  {
    id: 'tease',
    question: {
      en: 'Who is more likely to start teasing first for absolutely no reason?',
      ru: 'Кто первый начнёт дразниться вообще без всякой причины?',
    },
    options: [
      {
        label: { en: 'Aakash (professional menace)', ru: 'Аакаш (профессиональный вредина)' },
        points: 10,
        isCorrectFeel: true,
        feedback: {
          en: 'Look, if I am not mildly annoying you, how would you even know I love you?',
          ru: 'Слушай, если я не буду тебя слегка поддразнивать, как ты вообще поймёшь, что я тебя люблю?',
        },
      },
      {
        label: { en: 'Eva (sneaky edition)', ru: 'Ева (скрытый режим)' },
        points: 9,
        isCorrectFeel: true,
        feedback: {
          en: 'You act innocent and then drop a devastating roast out of nowhere.',
          ru: 'Делаешь невинное лицо, а потом внезапно выдаёшь сокрушительную шутку.',
        },
      },
      {
        label: { en: 'We never tease, pure peace', ru: 'Мы не дразнимся, у нас тишь да гладь' },
        points: 2,
        isCorrectFeel: false,
        feedback: {
          en: 'Wrong timeline! Try Earth-616 again.',
          ru: 'Не та вселенная! Попробуй вернуться в нашу реальность.',
        },
      },
    ],
  },
  {
    id: 'phone',
    question: {
      en: 'Who would survive longer on a desert island without their phone?',
      ru: 'Кто дольше выживет на необитаемом острове без телефона?',
    },
    options: [
      {
        label: { en: 'Aakash (already busy thinking of Eva)', ru: 'Аакаш (он и так думает о Еве)' },
        points: 9,
        isCorrectFeel: true,
        feedback: {
          en: 'True, though I’d build a coconut telegraph immediately just to text you.',
          ru: 'Правда, хотя я бы сразу собрал телеграф из кокосов, чтобы тебе написать.',
        },
      },
      {
        label: { en: 'Eva (befriends the island animals)', ru: 'Ева (подружится со всеми зверями)' },
        points: 10,
        isCorrectFeel: true,
        feedback: {
          en: 'Within 12 minutes you’d be queen of three raccoons and a crab.',
          ru: 'Через 12 минут ты бы уже правила тремя енотами и одним крабом.',
        },
      },
      {
        label: { en: 'Neither, we’d panic by hour 2', ru: 'Никто, через 2 часа начнётся паника' },
        points: 8,
        isCorrectFeel: true,
        feedback: {
          en: 'Mostly because we wouldn’t be able to send each other random updates.',
          ru: 'В основном потому что нельзя будет скинуть друг другу очередную ерунду.',
        },
      },
    ],
  },
  {
    id: 'staring',
    question: {
      en: 'Who wins a serious staring contest without laughing?',
      ru: 'Кто победит в серьёзных гляделках и не засмеётся?',
    },
    options: [
      {
        label: { en: 'Eva folds in 2 seconds', ru: 'Ева расколется через 2 секунды' },
        points: 10,
        isCorrectFeel: true,
        feedback: {
          en: 'Your mouth starts twitching before the countdown even finishes. Adorable.',
          ru: 'Уголки губ начинают дёргаться ещё до старта. Очень мило.',
        },
      },
      {
        label: { en: 'Aakash loses because he stares too fondly', ru: 'Аакаш проиграет, потому что засмотрится' },
        points: 10,
        isCorrectFeel: true,
        feedback: {
          en: 'Wait… you actually caught my weakness. Disqualified for excessive sweetness.',
          ru: 'Постой… ты реально раскрыла мою слабость. Дисквалификация за чрезмерную нежность.',
        },
      },
      {
        label: { en: 'Eva wins with stone-cold focus', ru: 'Ева победит с каменным лицом' },
        points: 5,
        isCorrectFeel: false,
        feedback: {
          en: 'Doubtful. One funny eyebrow raise and you are giggling.',
          ru: 'Сомнительно. Одна смешная бровь — и ты уже хихикаешь.',
        },
      },
    ],
  },
  {
    id: 'attached',
    question: {
      en: 'Who gets emotionally attached to cute animals on the street faster?',
      ru: 'Кто быстрее привязывается к милым зверушкам на улице?',
    },
    options: [
      {
        label: { en: 'Eva. Instantly named them.', ru: 'Ева. Уже дала им имена.' },
        points: 10,
        isCorrectFeel: true,
        feedback: {
          en: 'You’d adopt every stray cat, puppy, and slightly polite raccoon in sight.',
          ru: 'Ты бы усыновила каждого котика, щенка и просто вежливого енота в округе.',
        },
      },
      {
        label: { en: 'Aakash (mostly to Eva)', ru: 'Аакаш (в основном к Еве)' },
        points: 10,
        isCorrectFeel: true,
        feedback: {
          en: 'Cheesy? Maybe. Completely true? Yes.',
          ru: 'Слишком сладко? Возможно. Чистая правда? Да.',
        },
      },
    ],
  },
  {
    id: 'loves_harder',
    question: {
      en: 'Final boss question: Who loves harder?',
      ru: 'Вопрос финального уровня: кто любит сильнее?',
    },
    options: [
      {
        label: { en: 'Aakash (literally built a whole world)', ru: 'Аакаш (буквально построил целый мир)' },
        points: 10,
        isCorrectFeel: true,
        feedback: {
          en: 'I accept this trophy proudly. Wait no—let us call it a tie because I refuse to lose to you in this.',
          ru: 'С гордостью принимаю этот кубок. Хотя нет — давай считать это ничьей, просто я не планирую уступать.',
        },
      },
      {
        label: { en: 'Eva ❤️', ru: 'Ева ❤️' },
        points: 10,
        isCorrectFeel: true,
        feedback: {
          en: 'Okay that made my heart melt a little bit. Still debating you on this though.',
          ru: 'Ладно, от этого сердечко чуть не растаяло. Но я всё равно буду с тобой спорить по этому поводу.',
        },
      },
      {
        label: { en: 'It is a competitive tie', ru: 'Это соревновательная ничья' },
        points: 10,
        isCorrectFeel: true,
        feedback: {
          en: 'The healthiest competition in history. Nobody loses here.',
          ru: 'Самое здоровое соревнование в истории. Проигравших нет.',
        },
      },
    ],
  },
];

export interface QuizVerdict {
  minScore: number;
  title: LocalizedText;
  description: LocalizedText;
}

export const QUIZ_VERDICTS: QuizVerdict[] = [
  {
    minScore: 72,
    title: {
      en: "Aakash's Favorite Person & Chaos Queen 👑",
      ru: 'Любимый человек Аакаша и Королева Хаоса 👑',
    },
    description: {
      en: '100% certified little raccoon energy. You know us dangerously well and somehow make every bit of chaos adorable.',
      ru: '100% сертифицированная энергия маленького енотика. Ты слишком хорошо нас знаешь и умудряешься делать любой хаос очаровательным.',
    },
  },
  {
    minScore: 55,
    title: {
      en: 'Certified Little Raccoon 🦝',
      ru: 'Сертифицированный маленький енотик 🦝',
    },
    description: {
      en: 'Slightly sneaky, very cute, and definitely not as innocent as you claim. Verdict: keep forever.',
      ru: 'Немного хитрая, очень милая и точно не такая невинная, как притворяешься. Вердикт: оставить навсегда.',
    },
  },
  {
    minScore: 0,
    title: {
      en: 'Too Cute To Be Trusted 💗',
      ru: 'Слишком милая, чтобы доверять 💗',
    },
    description: {
      en: 'You tried to plead innocent on half the questions and Dudu & Bubu saw right through you!',
      ru: 'Ты пыталась притвориться ангелочком в половине вопросов, но Дуду и Бубу всё раскусили!',
    },
  },
];

export const RACCOON_CHASE_TAUNTS: LocalizedText[] = [
  { en: 'Why are you running?!', ru: 'Почему ты убегаешь?!' },
  { en: 'Little raccoon has escaped.', ru: 'Маленький енотик сбежал.' },
  { en: 'Aakash is coming with hugs.', ru: 'Аакаш уже бежит с обнимашками.' },
  { en: 'RUN!! 🦝💨', ru: 'БЕГИ!! 🦝💨' },
  { en: 'No snacks until you grab the heart!', ru: 'Никаких вкусняшек, пока не доберёшься до сердечка!' },
];

export interface RouletteSlice {
  id: string;
  label: LocalizedText;
  emoji: string;
  color: string;
  textColor: string;
  messages: LocalizedText[];
}

export const ROULETTE_SLICES: RouletteSlice[] = [
  {
    id: 'cute',
    label: { en: 'Cute', ru: 'Милое' },
    emoji: '💗',
    color: '#F472B6',
    textColor: '#FFFFFF',
    messages: [
      {
        en: 'You could literally just blink and I would still think you are cute.',
        ru: 'Ты можешь просто моргнуть, и я всё равно подумаю, какая ты милая.',
      },
      {
        en: 'Even your grumpy face is dangerously adorable.',
        ru: 'Даже твоё недовольное личико опасно очаровательное.',
      },
    ],
  },
  {
    id: 'flirty',
    label: { en: 'Flirty', ru: 'Флирт' },
    emoji: '🔥',
    color: '#A855F7',
    textColor: '#FFFFFF',
    messages: [
      {
        en: 'Careful, if you keep looking that good, I am going to forget how to act normal.',
        ru: 'Осторожнее, если будешь продолжать так выглядеть, я совсем разучусь вести себя прилично.',
      },
      {
        en: 'My favorite distraction? Definitely you.',
        ru: 'Моё любимое отвлечение от любых дел? Определённо ты.',
      },
    ],
  },
  {
    id: 'roast',
    label: { en: 'Roast', ru: 'Шутка' },
    emoji: '😂',
    color: '#EC4899',
    textColor: '#FFFFFF',
    messages: [
      {
        en: 'You claim to be tough, yet one tiny puppy video ruins you emotionally. Cute.',
        ru: 'Делаешь вид, что ты суровая, но одно видео со щенком эмоционально тебя побеждает. Милота.',
      },
      {
        en: '90% sweet girl, 10% suspicious raccoon plotting snack theft.',
        ru: '90% нежная девочка, 10% подозрительный енот, планирующий кражу вкусняшек.',
      },
    ],
  },
  {
    id: 'princess',
    label: { en: 'Princess', ru: 'Принцесса' },
    emoji: '👑',
    color: '#C084FC',
    textColor: '#2D1B3D',
    messages: [
      {
        en: 'Adjust your crown, Eva. Today everything goes at your pace.',
        ru: 'Поправь корону, Ева. Сегодня весь мир подстраивается под тебя.',
      },
      {
        en: 'Royal treatment is not optional when it comes to you.',
        ru: 'Королевское отношение к тебе вообще не обсуждается — оно по умолчанию.',
      },
    ],
  },
  {
    id: 'raccoon',
    label: { en: 'Raccoon', ru: 'Енотик' },
    emoji: '🦝',
    color: '#FB7185',
    textColor: '#FFFFFF',
    messages: [
      {
        en: 'Certified shiny-object collector and certified thief of my heart.',
        ru: 'Сертифицированный коллекционер блестяшек и официальный похититель моего сердца.',
      },
      {
        en: 'Little raccoon privilege: infinite patience and forehead kisses.',
        ru: 'Привилегия маленького енотика: бесконечное терпение и поцелуи в лобик.',
      },
    ],
  },
  {
    id: 'soft',
    label: { en: 'Soft', ru: 'Нежное' },
    emoji: '🥺',
    color: '#E9D5FF',
    textColor: '#3B0764',
    messages: [
      {
        en: 'I love how safe and warm it feels whenever we just talk about nothing.',
        ru: 'Мне так нравится, как тепло и спокойно становится, когда мы просто болтаем ни о чём.',
      },
      {
        en: 'You are worth every gentle effort, every single day.',
        ru: 'Ты заслуживаешь самой искренней заботы каждый божий день.',
      },
    ],
  },
  {
    id: 'romantic',
    label: { en: 'Romantic', ru: 'Романтика' },
    emoji: '💌',
    color: '#9333EA',
    textColor: '#FFFFFF',
    messages: [
      {
        en: 'Out of every day in the calendar, the best ones always have you in them.',
        ru: 'Из всех дней в календаре самые лучшие всегда те, в которых есть ты.',
      },
      {
        en: 'You are my favorite chapter, and we are just getting started.',
        ru: 'Ты — моя любимая глава, и при этом всё только начинается.',
      },
    ],
  },
];

export const LEGENDARY_ROULETTE_MESSAGES: LocalizedText[] = [
  {
    en: 'LEGENDARY PULL: Even on a chaotic, messy, half-asleep day, you are still the prettiest thing I have ever seen.',
    ru: 'ЛЕГЕНДАРНЫЙ ДРОП: Даже в самый сонный, растрёпанный и хаотичный день ты всё равно самое прекрасное, что я видел в жизни.',
  },
  {
    en: 'MYTHIC PULL: I didn’t know someone could feel like my best friend and my favorite crush at the exact same time until you.',
    ru: 'МИФИЧЕСКИЙ ДРОП: Я и не знал, что один человек может быть лучшим другом и главной любовью одновременно — пока не встретил тебя.',
  },
];

export interface FateDoorConfig {
  id: number;
  title: LocalizedText;
  prompt: LocalizedText;
  tag: LocalizedText;
  mood: DuduBubuMood;
  accentGradient: string;
  outcomes: LocalizedText[];
}

export const FATE_DOORS: FateDoorConfig[] = [
  {
    id: 1,
    title: { en: 'DOOR 1', ru: 'ДВЕРЬ 1' },
    prompt: {
      en: "Open if you're feeling cute.",
      ru: 'Открой, если чувствуешь себя милашкой.',
    },
    tag: { en: 'Sweet Shower', ru: 'Порция нежности' },
    mood: 'kiss',
    accentGradient: 'from-pink-400 via-rose-400 to-pink-500',
    outcomes: [
      {
        en: 'Confirmed: You ARE cute right now. In fact, cuteness levels are illegally high. Have three virtual forehead kisses. 😘😘😘',
        ru: 'Подтверждено: ты прямо сейчас до неприличия милая. Держи три срочных виртуальных поцелуя в лобик. 😘😘😘',
      },
      {
        en: 'Door 1 Verdict: Your eyes, your laugh, your vibe — 100/10. Do not argue with the door.',
        ru: 'Вердикт Первой Двери: твои глаза, твой смех, твой вайб — 100 из 10. С дверью не спорят.',
      },
      {
        en: 'Reminder from behind Door 1: Whenever you smile, you instantly look like sunshine.',
        ru: 'Напоминание из-за Первой Двери: когда ты улыбаешься, всё вокруг становится светлее.',
      },
    ],
  },
  {
    id: 2,
    title: { en: 'DOOR 2', ru: 'ДВЕРЬ 2' },
    prompt: {
      en: "Open if you're feeling chaotic.",
      ru: 'Открой, если хочется хаоса.',
    },
    tag: { en: 'Affectionate Roast', ru: 'Любящий подкол' },
    mood: 'laughing',
    accentGradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
    outcomes: [
      {
        en: 'Welcome to Chaotic Door! Diagnosis: Needs snacks, threatens to bite when sleepy, denies being adorable while acting adorable.',
        ru: 'Добро пожаловать в Дверь Хаоса! Диагноз: требует вкусняшек, грозится кусаться когда хочет спать, отрицает свою милоту, оставаясь милой.',
      },
      {
        en: 'Breaking Alert: Little raccoon caught opening Door 2 looking for trouble. Trouble found: me teasing you forever.',
        ru: 'Тревога: маленький енотик открыл Вторую Дверь в поисках приключений. Наказание: я буду дразнить тебя вечно.',
      },
      {
        en: 'You opened the chaos door and honestly, I expected nothing less from you. Never change.',
        ru: 'Ты выбрала дверь хаоса, и честно — я другого от тебя и не ждал. Никогда не меняйся.',
      },
    ],
  },
  {
    id: 3,
    title: { en: 'DOOR 3', ru: 'ДВЕРЬ 3' },
    prompt: {
      en: 'Open if you want affection.',
      ru: 'Открой, если хочется тепла и любви.',
    },
    tag: { en: 'Secret Love Note', ru: 'Секретное письмо' },
    mood: 'hug',
    accentGradient: 'from-indigo-500 via-purple-500 to-rose-400',
    outcomes: [
      {
        en: 'Come here for a second. Whatever you are carrying on your shoulders today, you do not have to carry it alone. I am always in your corner, Eva.',
        ru: 'Иди сюда на секунду. Что бы ни было у тебя сегодня на душе, тебе не нужно справляться с этим в одиночку. Я всегда на твоей стороне, Ева.',
      },
      {
        en: 'Truth behind Door 3: You make ordinary days feel worth looking forward to. Thank you for just being in my life.',
        ru: 'Правда за Третьей Дверью: благодаря тебе даже самые обычные дни становятся долгожданными. Спасибо, что ты есть в моей жизни.',
      },
      {
        en: 'Sending you the longest, warmest bear hug through the screen right now. Breathe, relax, you are deeply loved.',
        ru: 'Отправляю тебе самые тёплые и долгие обнимашки прямо через экран. Выдохни, расслабься — тебя очень любят.',
      },
    ],
  },
];

export interface MoodRescueContent {
  id: MoodOptionId;
  mood: DuduBubuMood;
  accent: string;
  responses: LocalizedText[];
}

export const MOOD_RESCUE_DATA: Record<MoodOptionId, MoodRescueContent> = {
  sad: {
    id: 'sad',
    mood: 'hug',
    accent: 'from-violet-400/20 to-pink-400/20',
    responses: [
      {
        en: 'Hey, little raccoon. Bad days are temporary, and you never have to pretend you are okay around me. Sending huge Dudu & Bubu hugs.',
        ru: 'Эй, маленький енотик. Плохие дни проходят, и рядом со мной тебе никогда не нужно притворяться, что всё идеально. Крепко тебя обнимаю.',
      },
      {
        en: 'Take a slow breath. Drink some water, wrap yourself in a blanket, and remember that you are genuinely cherished.',
        ru: 'Сделай глубокий вдох. Выпей водички, укутайся в плед и помни, как сильно тебя ценят и любят.',
      },
      {
        en: 'If I were right next to you right now, I would pull you into the warmest hug and let you complain about everything.',
        ru: 'Будь я сейчас рядом, я бы крепко прижал тебя к себе и выслушал всё, что тебя расстроило.',
      },
    ],
  },
  tired: {
    id: 'tired',
    mood: 'sleepy',
    accent: 'from-indigo-400/20 to-purple-400/20',
    responses: [
      {
        en: 'Sleepy little raccoon hours. You worked hard enough today — close your eyes for a bit and let the world wait.',
        ru: 'Время сонного енотика. Ты сегодня уже достаточно постаралась — отдохни, пусть весь мир подождёт.',
      },
      {
        en: 'Official boyfriend permission to do zero productive things for the next two hours. Nap mode: activated.',
        ru: 'Официальное разрешение ничего полезного не делать ближайшие пару часов. Режим отдыха активирован.',
      },
      {
        en: 'Even exhausted, you are still wonderful. Go get cozy, okay?',
        ru: 'Даже уставшая ты всё равно чудесная. Устраивайся поудобнее, хорошо?',
      },
    ],
  },
  bored: {
    id: 'bored',
    mood: 'celebration',
    accent: 'from-fuchsia-400/20 to-rose-400/20',
    responses: [
      {
        en: 'Emergency entertainment protocol! Fact: Raccoons wash cotton candy in water and then look confused when it disappears. Also: text me so I can entertain you.',
        ru: 'Экстренное развлечение! Факт: еноты моют сладкую вату в воде, а потом удивляются, куда она пропала. А ещё — напиши мне, я тебя развлеку.',
      },
      {
        en: 'Bored? Try finding all 6 secret Easter eggs hidden around this website. (Yes, there is a hidden star and a suspicious "do not press".)',
        ru: 'Скучно? Попробуй найти все 6 секретных пасхалок на этом сайте. (Да, тут есть секретная звёздочка и подозрительная кнопка.)',
      },
      {
        en: 'Challenge: Beat Raccoon Escape in under 15 steps. If you do, you get bragging rights forever.',
        ru: 'Челлендж: пройди Побег енотика меньше чем за 15 шагов. Если получится — можешь гордиться этим вечно.',
      },
    ],
  },
  angry: {
    id: 'angry',
    mood: 'angry',
    accent: 'from-rose-400/25 to-orange-300/20',
    responses: [
      {
        en: 'Tiny angry raccoon detected! Who upset you? Tell me their name, Dudu & Bubu are ready to glare aggressively at them.',
        ru: 'Обнаружен маленький сердитый енотик! Кто тебя расстроил? Назови имя, Дуду и Бубу уже готовы грозно на него смотреть.',
      },
      {
        en: 'It is okay to be mad. Tap Dudu & Bubu five times to transfer your rage into cute cheeks.',
        ru: 'Злиться — это нормально. Потыкай в Дуду и Бубу пять раз, чтобы перевести всю злость в милые щёчки.',
      },
      {
        en: 'Deep breath in… punch an imaginary pillow… deep breath out. Better? Still mad? I am bringing imaginary ice cream.',
        ru: 'Глубокий вдох… мысленно стукни подушку… выдох. Полегче? Всё ещё злишься? Несу воображаемое мороженое.',
      },
    ],
  },
  affection: {
    id: 'affection',
    mood: 'kiss',
    accent: 'from-pink-400/25 to-rose-400/25',
    responses: [
      {
        en: 'Affection delivery incoming! One giant hug, ten forehead kisses, and infinite reminders that you mean the world to me.',
        ru: 'Доставка нежности! Одна огромная обнимашка, десять поцелуев в лобик и бесконечное напоминание, как много ты для меня значишь.',
      },
      {
        en: 'You never even have to ask twice. Come here, you deserve all the softest love today.',
        ru: 'Тебе даже не нужно просить дважды. Иди сюда, сегодня вся самая тёплая нежность — только для тебя.',
      },
      {
        en: 'If hugs could travel through Wi-Fi, your phone would be squishing you right now.',
        ru: 'Если бы обнимашки передавались по Wi-Fi, твой телефон бы уже задушил тебя от нежности.',
      },
    ],
  },
  raccoon: {
    id: 'raccoon',
    mood: 'laughing',
    accent: 'from-purple-500/25 to-pink-500/25',
    responses: [
      {
        en: 'MAXIMUM RACCOON MODE ENGAGED! Shiny objects acquired, chaos levels 999%, snacks requested immediately! 🦝✨',
        ru: 'МАКСИМАЛЬНЫЙ РЕЖИМ ЕНОТА АКТИВИРОВАН! Блестяшки собраны, уровень хаоса 999%, срочно требуются вкусняшки! 🦝✨',
      },
      {
        en: 'Warning: Eva has entered full gremlin raccoon mode. Hide all hoodies, prepare for chaotic giggles!',
        ru: 'Внимание: Ева перешла в полный режим хаотичного енотика. Прячьте все худи, готовьтесь к безудержному смеху!',
      },
      {
        en: 'Raccoon protocol says: be weird, be loud, steal fries, and get kissed anyway.',
        ru: 'Протокол енотика гласит: будь смешной, шумной, воруй картошку фри и всё равно получай поцелуи.',
      },
    ],
  },
};

export const REASONS_100: LocalizedText[] = [
  { en: 'Your smile.', ru: 'Твоя улыбка.' },
  { en: 'Your weird little reactions.', ru: 'Твои забавные маленькие реакции.' },
  { en: 'The way you care about animals.', ru: 'То, как ты любишь и жалеешь животных.' },
  { en: 'Your random messages in the middle of the day.', ru: 'Твои внезапные сообщения посреди дня.' },
  { en: 'How cute you look when you are half asleep.', ru: 'То, какая ты милая, когда сонная.' },
  { en: 'The sparkle in your eyes when you get excited.', ru: 'Блеск в твоих глазах, когда ты чему-то радуешься.' },
  { en: 'Your laugh that immediately makes me laugh too.', ru: 'Твой смех, от которого я сам сразу начинаю улыбаться.' },
  { en: 'The way you pretend to be tough for 3 seconds.', ru: 'То, как ты на 3 секунды делаешь вид, что ты грозная.' },
  { en: 'Your little raccoon energy.', ru: 'Твоя энергия маленького енотика.' },
  { en: 'The way you make ordinary conversations feel special.', ru: 'То, как обычные разговоры с тобой становятся особенными.' },
  { en: 'How thoughtful you are with tiny details.', ru: 'Твоя внимательность к маленьким деталям.' },
  { en: 'The sound of your voice.', ru: 'Звук твоего голоса.' },
  { en: 'How soft your heart really is.', ru: 'То, какое у тебя на самом деле нежное сердце.' },
  { en: 'Your chaotic sense of humor.', ru: 'Твоё хаотичное чувство юмора.' },
  { en: 'The dramatic faces you make.', ru: 'Твои драматичные и смешные гримасы.' },
  { en: 'How you make me want to be better without even trying.', ru: 'То, что с тобой хочется становиться лучше.' },
  { en: 'Your honesty.', ru: 'Твоя искренность.' },
  { en: 'The way you get excited about cute things.', ru: 'То, как ты радуешься милым мелочам.' },
  { en: 'Your taste in cozy things.', ru: 'Твоя любовь ко всему уютному.' },
  { en: 'How safe I feel when talking to you.', ru: 'То, как спокойно и надёжно мне с тобой.' },
  { en: 'Your teasing when you think you won an argument.', ru: 'Твои подколы, когда ты уверена, что победила в споре.' },
  { en: 'Your kindness to people who deserve it.', ru: 'Твоя доброта к людям.' },
  { en: 'The way you say my name.', ru: 'То, как ты произносишь моё имя.' },
  { en: 'How expressive you are without even speaking.', ru: 'То, как по твоему лицу сразу всё понятно без слов.' },
  { en: 'Your curiosity about everything.', ru: 'Твоё любопытство ко всему на свете.' },
  { en: 'The comfort of your presence.', ru: 'Уют от одного твоего присутствия.' },
  { en: 'How funny you are when you don’t even mean to be.', ru: 'То, какая ты смешная, даже когда не стараешься.' },
  { en: 'Your resilience on tough days.', ru: 'Твоя стойкость в непростые дни.' },
  { en: 'The little happy dance energy you get.', ru: 'Твоя радостная энергия, когда что-то получилось.' },
  { en: 'The way you look at things you love.', ru: 'Твой взгляд, когда ты смотришь на то, что любишь.' },
  { en: 'Your warmth.', ru: 'Твоё душевное тепло.' },
  { en: 'How easy it is to miss you.', ru: 'То, как быстро я начинаю по тебе скучать.' },
  { en: 'Your adorable stubbornness.', ru: 'Твоё очаровательное упрямство.' },
  { en: 'The way you notice when something is off.', ru: 'То, как ты сразу чувствуешь, если что-то не так.' },
  { en: 'Your late-night thoughts.', ru: 'Твои ночные размышления обо всём на свете.' },
  { en: 'How pretty you are effortlessly.', ru: 'То, какая ты красивая вообще без усилий.' },
  { en: 'Your loyalty.', ru: 'Твоя верность и преданность.' },
  { en: 'The way you get shy for a second after a compliment.', ru: 'То, как ты на секунду смущаешься от комплиментов.' },
  { en: 'Your tiny dramatic sighs.', ru: 'Твои маленькие драматичные вздохи.' },
  { en: 'How much brighter my phone looks when your name pops up.', ru: 'То, как сразу становится радостно, когда на экране твоё имя.' },
  { en: 'Your creativity.', ru: 'Твоя фантазия и креативность.' },
  { en: 'The way you celebrate small wins.', ru: 'То, как ты умеешь радоваться маленьким победам.' },
  { en: 'Your soft side that only a few people get to see.', ru: 'Твоя нежная сторона, которую видят только самые близкие.' },
  { en: 'How genuine your smile is.', ru: 'То, какая настоящая у тебя улыбка.' },
  { en: 'Your playful chaos.', ru: 'Твой игривый хаос.' },
  { en: 'The way you make boring errands sound like adventures.', ru: 'То, как даже скучные дела с тобой звучат как приключение.' },
  { en: 'Your emotional depth.', ru: 'Твоя глубина и чуткость.' },
  { en: 'How you never fail to surprise me.', ru: 'То, как ты всегда умеешь меня удивить.' },
  { en: 'Your cute overthinking moments.', ru: 'Твои милые моменты переживаний из-за мелочей.' },
  { en: 'Because half-way through this list, I’m still smiling just writing it.', ru: 'Потому что на середине этого списка я всё ещё улыбаюсь, пока пишу его.' },
  { en: 'Your gentleness.', ru: 'Твоя мягкость.' },
  { en: 'The way you make me laugh when I am trying to be serious.', ru: 'То, как ты смешишь меня, когда я пытаюсь быть серьёзным.' },
  { en: 'Your unique way of seeing the world.', ru: 'Твой особенный взгляд на этот мир.' },
  { en: 'How deeply you care about the people you love.', ru: 'То, как сильно ты заботишься о тех, кого любишь.' },
  { en: 'Your cute nose scrunch.', ru: 'То, как мило ты морщишь носик.' },
  { en: 'The stories you tell.', ru: 'Истории, которые ты рассказываешь.' },
  { en: 'Your patience with my teasing.', ru: 'Твоё терпение к моим постоянным подколам.' },
  { en: 'How alive the room feels when you are in it.', ru: 'То, как всё вокруг оживает, когда ты рядом.' },
  { en: 'Your softness when you are tired.', ru: 'Твоя трогательная нежность, когда ты устала.' },
  { en: 'The way you remember tiny things I mentioned.', ru: 'То, как ты запоминаешь мелочи, о которых я когда-то сказал.' },
  { en: 'Your adorable grumpy moods.', ru: 'Твоё милое ворчливое настроение.' },
  { en: 'How proud I feel calling you mine.', ru: 'То, как я счастлив, что ты моя.' },
  { en: 'Your courage.', ru: 'Твоя смелость.' },
  { en: 'The little nicknames and inside jokes we share.', ru: 'Наши маленькие прозвища и локальные шутки.' },
  { en: 'Your eyes.', ru: 'Твои глаза.' },
  { en: 'How comforting your reassurance is.', ru: 'То, как сильно успокаивает твоя поддержка.' },
  { en: 'Your sense of style.', ru: 'Твой вкус и стиль.' },
  { en: 'The way you try your best even when you are stressed.', ru: 'То, как ты стараешься, даже когда устала или переживаешь.' },
  { en: 'Your random bursts of energy.', ru: 'Твои внезапные приливы энергии.' },
  { en: 'How every memory with you feels warm.', ru: 'То, как тепло от каждого воспоминания с тобой.' },
  { en: 'Your sincerity.', ru: 'Твоя чистосердечность.' },
  { en: 'The way you fit so naturally into my life.', ru: 'То, как естественно ты стала частью моей жизни.' },
  { en: 'Your little habits.', ru: 'Твои маленькие привычки.' },
  { en: 'How you inspire me.', ru: 'То, как ты меня вдохновляешь.' },
  { en: 'Your sweetness when you want affection.', ru: 'Твоя милота, когда тебе хочется ласки.' },
  { en: 'The fact that you can be both cute and hilarious.', ru: 'То, что ты умеешь быть одновременно милой и невероятно смешной.' },
  { en: 'Your strength.', ru: 'Твоя внутренняя сила.' },
  { en: 'The way you make silence feel comfortable too.', ru: 'То, что с тобой уютно даже просто молчать.' },
  { en: 'Your goofy side.', ru: 'Твоя дурашливая сторона.' },
  { en: 'How much I look forward to tomorrow because of you.', ru: 'То, что из-за тебя я с радостью жду каждого завтрашнего дня.' },
  { en: 'Your kindness to strangers.', ru: 'Твоя вежливость и доброта к незнакомцам.' },
  { en: 'The way you light up around good food.', ru: 'То, как ты сияешь при виде вкусной еды.' },
  { en: 'Your sensitivity.', ru: 'Твоя чуткость.' },
  { en: 'How you make me feel understood.', ru: 'То, что рядом с тобой меня по-настоящему понимают.' },
  { en: 'Your adorable dramatic storytelling.', ru: 'Твоя манера так эмоционально всё пересказывать.' },
  { en: 'The peace I feel knowing you exist.', ru: 'Спокойствие от одной мысли, что ты есть на этом свете.' },
  { en: 'Your playful glare.', ru: 'Твой шутливый грозный взгляд.' },
  { en: 'How cute you are even when you think you look messy.', ru: 'То, какая ты милая, даже когда думаешь, что выглядишь неидеально.' },
  { en: 'Your bright personality.', ru: 'Твой яркий характер.' },
  { en: 'The way you make me want to build cute little worlds like this for you.', ru: 'То, что ради тебя хочется строить вот такие маленькие миры.' },
  { en: 'Your laugh again (it deserves two spots).', ru: 'Снова твой смех (он заслуживает двух пунктов).' },
  { en: 'Your heart.', ru: 'Твоё сердце.' },
  { en: 'How effortlessly you brighten my worst days.', ru: 'То, как легко ты спасаешь мои самые плохие дни.' },
  { en: 'Your dreams and everything you hope for.', ru: 'Твои мечты и всё, к чему ты стремишься.' },
  { en: 'The way you trust me.', ru: 'Твоё доверие ко мне.' },
  { en: 'Every tiny quirk that makes you, you.', ru: 'Каждая маленькая особенность, которая делает тебя собой.' },
  { en: 'How much fun even doing nothing is with you.', ru: 'То, как весело с тобой даже просто ничего не делать.' },
  { en: 'Because life simply feels softer with you around.', ru: 'Потому что с тобой жизнь становится намного теплее.' },
  { en: 'Because you are my favorite little raccoon.', ru: 'Потому что ты — мой любимый маленький енотик.' },
  { en: 'Because you are Eva — and that says everything.', ru: 'Потому что ты — это Ева, и этим всё сказано.' },
];

export const MILESTONE_MESSAGES: Record<number, LocalizedText> = {
  10: {
    en: '10 unlocked! Just warming up, little raccoon.',
    ru: '10 открыто! Мы только разогреваемся, енотик.',
  },
  20: {
    en: '20 unlocked! Still not even close to running out.',
    ru: '20 открыто! И причины даже не думают заканчиваться.',
  },
  30: {
    en: '30 unlocked! Dudu & Bubu approve your dedication.',
    ru: '30 открыто! Дуду и Бубу одобряют твоё упорство.',
  },
  40: {
    en: '40 unlocked! Your finger must be getting tired—take a virtual kiss.',
    ru: '40 открыто! Пальчик, наверное, устал — держи виртуальный поцелуй.',
  },
  50: {
    en: 'Halfway there! 50/100 reasons and every single one is real.',
    ru: 'Половина пройдена! 50/100 причин, и каждая — чистая правда.',
  },
  60: {
    en: '60 unlocked! Official certified reason collector.',
    ru: '60 открыто! Официальный коллекционер причин.',
  },
  70: {
    en: '70 unlocked! Are you blushing yet?',
    ru: '70 открыто! Ты там ещё не покраснела?',
  },
  80: {
    en: '80 unlocked! Almost at the top, princess!',
    ru: '80 открыто! Почти добралась до вершины, принцесса!',
  },
  90: {
    en: '90 unlocked! Just 10 more to go!',
    ru: '90 открыто! Осталось всего 10!',
  },
  100: {
    en: '100/100 UNLOCKED! And somehow this list still isn’t finished.',
    ru: '100/100 ОТКРЫТО! И почему-то этот список всё равно не заканчивается.',
  },
};

export const FINAL_BOSS_LINES: LocalizedText[] = [
  {
    en: "You don't have to be perfect.",
    ru: 'Тебе не нужно быть идеальной.',
  },
  {
    en: "You don't have to always be happy.",
    ru: 'Тебе не нужно всегда улыбаться и быть в настроении.',
  },
  {
    en: "You don't have to have everything figured out.",
    ru: 'Тебе не нужно знать ответы на всё на свете.',
  },
  {
    en: 'You can just be you. And somehow, that is already more than enough for me.',
    ru: 'Ты можешь просто быть собой. И каким-то образом этого уже больше чем достаточно для меня.',
  },
  {
    en: "So yes, little raccoon… you're stuck with someone who is going to keep teasing you, annoying you, making you smile, and reminding you how special you are. ❤️",
    ru: 'Так что да, маленький енотик… ты застряла с человеком, который будет и дальше тебя дразнить, слегка доставать, смешить и каждый день напоминать, какая ты особенная. ❤️',
  },
];

export const DUDU_SHOOT_COMPLIMENTS: LocalizedText[] = [
  {
    en: 'BULLSEYE! Deadshot Eva! Honestly terrifying accuracy, little raccoon. 🎯',
    ru: 'В ЯБЛОЧКО! Снайпер Ева! Пугающая меткость, маленький енотик. 🎯',
  },
  {
    en: '10/10 marksmanship!! You shot Dudu AND stole my heart at the exact same time.',
    ru: 'Меткость 10 из 10!! Ты подстрелила Дуду и заодно моё сердце.',
  },
  {
    en: 'Sniper Queen unlocked! Dudu tried his hardest to dodge and still stood zero chance.',
    ru: 'Королева снайперов! Дуду изо всех сил уворачивался, но шансов у него ноль.',
  },
  {
    en: 'Wait—are you secretly an action-movie hero? That shot was ridiculously clean! 🔥',
    ru: 'Погоди, ты тайный спецагент из боевика? Этот выстрел был просто идеальным! 🔥',
  },
  {
    en: 'BOOM! Elite aim! Remind me never to challenge you in any arcade game ever.',
    ru: 'БУМ! Элитная точность! Напомни мне никогда не спорить с тобой в играх на меткость.',
  },
  {
    en: 'Cupid is literally taking notes from you right now. Incredible shot, princess! 💘',
    ru: 'Амур прямо сейчас записывает за тобой в блокнотик. Потрясающий выстрел, принцесса! 💘',
  },
  {
    en: 'No mercy, pure skill, maximum cuteness. Dudu officially surrenders! 🏳️💗',
    ru: 'Никакой пощады, чистый скилл и максимум милоты. Дуду официально сдаётся! 🏳️💗',
  },
];

export const DUDU_SLAP_REACTIONS: Array<{
  slapShout: LocalizedText;
  runShout: LocalizedText;
  banner: LocalizedText;
}> = [
  {
    slapShout: { en: 'WHEEEEP!! 🍑💥', ru: 'АЙЙЯЙ!! 🍑💥' },
    runShout: { en: 'WHY DID YOU DO THAT?! 💨', ru: 'ЗА ЧТО?! БЕГУУУ! 💨' },
    banner: {
      en: 'CRITICAL SLAP! Dudu panicked, sprinted in 4 directions, tripped on his own paws, and faceplanted!',
      ru: 'КРИТИЧЕСКИЙ ШЛЕПОК! Дуду запаниковал, побежал во все стороны сразу, споткнулся о свои лапки и грохнулся!',
    },
  },
  {
    slapShout: { en: 'MY CHUBBY BUTT!! 😱', ru: 'МОЯ ПУХЛАЯ ПОПКА!! 😱' },
    runShout: { en: 'NO MORE VIOLENCE!! 🏃💨', ru: 'Я БОЛЬШЕ НЕ БУДУ!! 🏃💨' },
    banner: {
      en: '10/10 crisp slap! Dudu ran laps around the room screaming and wiped out dramatically.',
      ru: 'Идеальный шлепок 10/10! Дуду с криками намотал пару кругов и эффектно рухнул на пол.',
    },
  },
  {
    slapShout: { en: 'BONK!! OUCHIE!! 💥', ru: 'ШЛЁП!! ОЙ-ОЙ!! 💥' },
    runShout: { en: 'EVA IS TOO POWERFUL!! 💨', ru: 'ЕВА СЛИШКОМ СИЛЬНАЯ!! 💨' },
    banner: {
      en: 'Direct butt-slap! Dudu zoomed across the arena like a panicked potato and tumbled straight down.',
      ru: 'Прямое попадание по попке! Дуду заметался по арене как испуганный пирожочек и свалился с ног.',
    },
  },
  {
    slapShout: { en: 'SQUEAK!! 🥺🍑', ru: 'ПИСК!! 🥺🍑' },
    runShout: { en: 'SOMEBODY SAVE ME!! 💨', ru: 'СПАСИТЕ ПОМОГИТЕ!! 💨' },
    banner: {
      en: 'Bubu is crying laughing in the corner while Dudu trips over nothing and flops onto the floor!',
      ru: 'Бубу в углу плачет от смеха, пока Дуду спотыкается на ровном месте и падает мордочкой в пол!',
    },
  },
];

