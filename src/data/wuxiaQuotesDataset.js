/**
 * Chinese Wuxia, Xianxia & Cultivation Novel Sayings & Idioms Dataset
 * Migrated Schema: cn, pinyin, en, sense, path, seal, sourceType, source, tags
 */

export const MOOD_CATEGORIES = [
  { id: 'shi', label: 'Power & Hierarchy', seal: '势' },
  { id: 'ming', label: 'Destiny & Fate', seal: '命' },
  { id: 'mou', label: 'Strategy & Caution', seal: '谋' },
  { id: 'xing', label: 'Action & Cultivation', seal: '行' },
  { id: 'yin', label: 'Solitude & Dao', seal: '隐' },
  { id: 'qing', label: 'Emotion & Bonds', seal: '情' }
];

export const INITIAL_QUOTES = [
  // --- 1. MING (命) — Destiny, Fatalism, Transience ---
  {
    id: 'f1',
    cn: '善恶到头终有报',
    pinyin: 'shàn è dào tóu zhōng yǒu bào',
    en: 'Good meets with good, and evil meets with evil. If there is no retribution yet, it is only because the time has not arrived.',
    sense: 'Karmic reciprocation, early or late — resigned fatalism.',
    path: 'ming',
    seal: '命',
    sourceType: 'idiom',
    source: { text: 'Traditional Proverb', author: null },
    tags: ['karma', 'fate', 'retribution']
  },
  {
    id: 'f2',
    cn: '造化弄人',
    pinyin: 'zào huà nòng rén',
    en: 'Fate makes fools of people; even a hero meets a tragic end when destiny commands it.',
    sense: 'Tragic fatalism; ultimate powerlessness against destiny.',
    path: 'ming',
    seal: '命',
    sourceType: 'idiom',
    source: { text: 'Classic Wuxia Saying', author: null },
    tags: ['fate', 'tragedy', 'heroism']
  },
  {
    id: 'f3',
    cn: '天下没有不散的宴席',
    pinyin: 'tiān xià méi yǒu bù sàn de yàn xí',
    en: 'Under heaven, there is no banquet that does not end. Every gathering must eventually part.',
    sense: 'Bittersweet acceptance of transience and inevitable parting.',
    path: 'ming',
    seal: '命',
    sourceType: 'idiom',
    source: { text: 'Traditional Saying', author: null },
    tags: ['transience', 'parting', 'bittersweet']
  },
  {
    id: 'f4',
    cn: '落花有意，流水无情',
    pinyin: 'luò huā yǒu yì, liú shuǐ wú qíng',
    en: 'The falling flowers have intent to linger, but the flowing water streams heartlessly onward.',
    sense: 'Melancholic endurance of unrequited nature and passing time.',
    path: 'ming',
    seal: '命',
    sourceType: 'classical',
    source: { text: 'Traditional Poetic Proverb', author: null },
    tags: ['melancholy', 'unrequited', 'endurance']
  },
  {
    id: 'f7',
    cn: '去年的雪不是今年的雪',
    pinyin: 'qù nián de xuě bù shì jīn nián de xuě',
    en: 'The snow of last year is not this year\'s snow, but every single falling snowflake is her.',
    sense: 'Tender grief and enduring consolation across time and loss.',
    path: 'ming',
    seal: '命',
    sourceType: 'novel',
    source: { title: 'Way of Choices (Ze Tian Ji)', translator: 'Gravity Tales' },
    tags: ['grief', 'longing', 'consolation']
  },
  {
    id: 'w13',
    cn: '树大招风',
    pinyin: 'shù dà zhāo fēng',
    en: 'Tall trees attract the fierce wind.',
    sense: 'Prominence and supreme success naturally invite envy and adversity.',
    path: 'ming',
    seal: '命',
    sourceType: 'idiom',
    source: { text: 'Traditional Proverb', author: null },
    tags: ['weather', 'prominence', 'warning']
  },
  {
    id: 'w7',
    cn: '沧海桑田',
    pinyin: 'cāng hǎi sāng tián',
    en: 'The blue sea turns into mulberry fields.',
    sense: 'The colossal, unstoppable transformations brought by immense spans of time.',
    path: 'ming',
    seal: '命',
    sourceType: 'idiom',
    source: { text: 'Shenxian Zhuan', author: 'Ge Hong' },
    tags: ['time', 'change', 'transience']
  },
  {
    id: 'w4',
    cn: '谋事在人，成事在天',
    pinyin: 'móu shì zài rén, chéng shì zài tiān',
    en: 'Man proposes the plan, but heaven disposes the final outcome.',
    sense: 'Even the most brilliant schemes remain subject to the whims of destiny.',
    path: 'ming',
    seal: '命',
    sourceType: 'idiom',
    source: { text: 'Romance of the Three Kingdoms', author: 'Luo Guanzhong' },
    tags: ['fate', 'strategy', 'outcome']
  },

  // --- 2. SHI (势) — Power, Status, Hierarchy & Awe ---
  {
    id: 'pw1',
    cn: '弱肉强食',
    pinyin: 'ruò ròu qiáng shí',
    en: 'The weak are prey to the strong.',
    sense: 'The brutal law of the jungle governing the cultivation world.',
    path: 'shi',
    seal: '势',
    sourceType: 'idiom',
    source: { text: 'Han Yu / Wuxia Precept', author: null },
    tags: ['might', 'power', 'hierarchy']
  },
  {
    id: 'pw2',
    cn: '有眼不识泰山',
    pinyin: 'yǒu yǎn bù shí tài shān',
    en: 'To have eyes but fail to recognize Mount Tai.',
    sense: 'Failing to recognize supreme status or formidable hidden power.',
    path: 'shi',
    seal: '势',
    sourceType: 'idiom',
    source: { text: 'Water Margin (Shui Hu Zhuan)', author: 'Shi Nai\'an' },
    tags: ['arrogance', 'mount tai', 'status']
  },
  {
    id: 'pw5',
    cn: '摧枯拉朽',
    pinyin: 'cuī kū lā xiǔ',
    en: 'Crushing dry weeds and smashing rotten wood.',
    sense: 'The absolute ease with which a master crushes inferior opposition.',
    path: 'shi',
    seal: '势',
    sourceType: 'idiom',
    source: { text: 'Book of Han', author: 'Ban Gu' },
    tags: ['overwhelming', 'ease', 'power']
  },
  {
    id: 'pw6',
    cn: '天下无敌',
    pinyin: 'tiān xià wú dí',
    en: 'Unrivaled and invincible beneath the vast heavens.',
    sense: 'Reaching the supreme apex of martial mastery.',
    path: 'shi',
    seal: '势',
    sourceType: 'idiom',
    source: { text: 'Mencius', author: 'Mencius' },
    tags: ['invincible', 'number one', 'apex']
  },
  {
    id: 'pw8',
    cn: '天外有天，人外有人',
    pinyin: 'tiān wài yǒu tiān, rén wài yǒu rén',
    en: 'There are heavens beyond the heavens, and people beyond people.',
    sense: 'No matter how strong one becomes, there is always a higher master.',
    path: 'shi',
    seal: '势',
    sourceType: 'idiom',
    source: { text: 'Traditional Saying', author: null },
    tags: ['humility', 'mastery', 'heavens']
  },
  {
    id: 'pw15',
    cn: '人中之龙',
    pinyin: 'rén zhōng zhī lóng',
    en: 'A dragon among men.',
    sense: 'An exceptional, legendary talent standing far above common mortals.',
    path: 'shi',
    seal: '势',
    sourceType: 'idiom',
    source: { text: 'Classic Compliment', author: null },
    tags: ['dragon', 'talent', 'excellence']
  },
  {
    id: 'pw17',
    cn: '瘦死的骆驼比马大',
    pinyin: 'shòu sǐ de luò tuó bǐ mǎ dà',
    en: 'Even a starved, weakened camel is still bigger than a healthy horse.',
    sense: 'Even a fallen titan retains formidable residual power.',
    path: 'shi',
    seal: '势',
    sourceType: 'idiom',
    source: { text: 'Dream of the Red Chamber', author: 'Cao Xueqin' },
    tags: ['titan', 'strength', 'hierarchy']
  },
  {
    id: 'a1',
    cn: '天发杀机，移星易宿',
    pinyin: 'tiān fā shā jī, yí xīng yì xiù',
    en: 'When the heavens plot demise, the constellations shift position.',
    sense: 'Apocalyptic celestial dread and cosmic force.',
    path: 'shi',
    seal: '势',
    sourceType: 'classical',
    source: { text: 'Yinfujing (Scripture of Hidden Harmonies)', author: null },
    tags: ['dread', 'celestial', 'apocalypse']
  },

  // --- 3. MOU (谋) — Strategy, Cynicism, Caution & Conflict ---
  {
    id: 'c1',
    cn: '吃人的嘴短，拿人的手短',
    pinyin: 'chī rén de zuǐ duǎn, ná rén de shǒu duǎn',
    en: 'When you eat someone\'s food, your mouth becomes soft; when you take someone\'s gifts, your hands become short.',
    sense: 'Knowing cynicism about debt, gifts, and subtle obligation.',
    path: 'mou',
    seal: '谋',
    sourceType: 'idiom',
    source: { text: 'Folk Proverb', author: null },
    tags: ['obligation', 'cynicism', 'caution']
  },
  {
    id: 'c3',
    cn: '狡兔三窟',
    pinyin: 'jiǎo tù sān kū',
    en: 'A crafty rabbit always prepares three burrows.',
    sense: 'Shrewd self-preservation and mandatory contingency planning.',
    path: 'mou',
    seal: '谋',
    sourceType: 'idiom',
    source: { text: 'Strategies of the Warring States (Zhan Guo Ce)', author: null },
    tags: ['preservation', 'strategy', 'caution']
  },
  {
    id: 'c8',
    cn: '水能载舟，亦能覆舟',
    pinyin: 'shuǐ néng zǎi zhōu, yì néng fù zhōu',
    en: 'The water that carries the boat is the very same water that swallows it whole.',
    sense: 'Sober warning about the dangerous, fickle nature of power.',
    path: 'mou',
    seal: '谋',
    sourceType: 'classical',
    source: { text: 'Xunzi', author: 'Xun Kuang' },
    tags: ['power', 'warning', 'statecraft']
  },
  {
    id: 'g8',
    cn: '螳螂捕蝉，黄雀在后',
    pinyin: 'táng láng bǔ chán, huáng què zài hòu',
    en: 'The mantis stalks the cicada, unaware of the hungry oriole waiting behind.',
    sense: 'Pursuing immediate gain while remaining blind to deadly hidden predators.',
    path: 'mou',
    seal: '谋',
    sourceType: 'idiom',
    source: { text: 'Garden of Stories (Shuo Yuan)', author: 'Liu Xiang' },
    tags: ['blindness', 'mantis', 'oriole']
  },
  {
    id: 'd15',
    cn: '打草惊蛇',
    pinyin: 'dǎ cǎo jīng shé',
    en: 'Beating the grass and scaring the snake.',
    sense: 'Inadvertently alerting an enemy through premature action.',
    path: 'mou',
    seal: '谋',
    sourceType: 'idiom',
    source: { text: 'Thirty-Six Stratagems', author: null },
    tags: ['alert', 'snake', 'strategy']
  },
  {
    id: 'd17',
    cn: '调虎离山',
    pinyin: 'diào hǔ lí shān',
    en: 'Luring the tiger away from its native mountain.',
    sense: 'Drawing a formidable adversary out of their fortified territory.',
    path: 'mou',
    seal: '谋',
    sourceType: 'idiom',
    source: { text: 'Thirty-Six Stratagems', author: null },
    tags: ['lure', 'territory', 'tiger']
  },
  {
    id: 'g6',
    cn: '匹夫无罪，怀璧其罪',
    pinyin: 'pǐ fū wú zuì, huái bì qí zuì',
    en: 'An innocent man becomes a criminal simply by holding a precious jade ring.',
    sense: 'Possessing supreme wealth or cultivation artifacts invites mortal greed.',
    path: 'mou',
    seal: '谋',
    sourceType: 'classical',
    source: { text: 'Zuo Zhuan', author: 'Zuo Qiuming' },
    tags: ['treasure', 'greed', 'jade']
  },
  {
    id: 'a4',
    cn: '建国后不许成精',
    pinyin: 'jiàn guó hòu bù xǔ chéng jīng',
    en: 'After the founding of the nation, non-human entities are no longer permitted to attain sentience.',
    sense: 'Comedic modern internet satire regarding media censorship guidelines.',
    path: 'mou',
    seal: '谋',
    sourceType: 'idiom',
    source: { text: 'Modern Internet Meme / Satire', author: null },
    tags: ['satire', 'modern', 'meme']
  },

  // --- 4. XING (行) — Action, Effort, Cultivation & Resilience ---
  {
    id: 'r1',
    cn: '物极必反',
    pinyin: 'wù jí bì fǎn',
    en: 'When things reach their absolute limit, reversal must occur.',
    sense: 'Hopeful pragmatism derived from ancient cyclic logic.',
    path: 'xing',
    seal: '行',
    sourceType: 'classical',
    source: { text: 'I Ching Tradition', author: null },
    tags: ['resilience', 'reversal', 'hope']
  },
  {
    id: 'e5',
    cn: '神挡杀神，佛挡杀佛',
    pinyin: 'shén dǎng shā shén, fó dǎng shā fó',
    en: 'If Gods block my path, kill the Gods; if Buddhas block my path, kill the Buddhas!',
    sense: 'Unstoppable, demonic resolve to shatter any obstacle.',
    path: 'xing',
    seal: '行',
    sourceType: 'novel',
    source: { title: 'Cultivation Genre Trope', translator: 'Webnovel Lore' },
    tags: ['resolve', 'unstoppable', 'cultivation']
  },
  {
    id: 'e7',
    cn: '千里之行，始于足下',
    pinyin: 'qiān lǐ zhī xíng, shǐ yú zú xià',
    en: 'A journey of a thousand miles begins with a single step.',
    sense: 'Supreme mastery and immortality are built step by step.',
    path: 'xing',
    seal: '行',
    sourceType: 'classical',
    source: { text: 'Dao De Jing', author: 'Laozi' },
    tags: ['patience', 'journey', 'progress']
  },
  {
    id: 'e8',
    cn: '鲤鱼跳龙门',
    pinyin: 'lǐ yú tiào lóng mén',
    en: 'Like a carp leaping through the Dragon Gate to become a divine dragon.',
    sense: 'Breakthrough transformation through relentless trial.',
    path: 'xing',
    seal: '行',
    sourceType: 'idiom',
    source: { text: 'Traditional Legend', author: null },
    tags: ['transformation', 'breakthrough', 'dragon']
  },
  {
    id: 'e6',
    cn: '一步登天',
    pinyin: 'yī bù dēng tiān',
    en: 'Attaining heaven in a single bound.',
    sense: 'Attaining instant success; often subverted in cultivation as a warning against skipping steps.',
    path: 'xing',
    seal: '行',
    sourceType: 'idiom',
    source: { text: 'Classic Proverb', author: null },
    tags: ['instant', 'warning', 'cultivation']
  },
  {
    id: 'e12',
    cn: '行云流水',
    pinyin: 'xíng yún liú shuǐ',
    en: 'Movements as natural as floating clouds and flowing water.',
    sense: 'Effortless martial skill achieved when art becomes instinct.',
    path: 'xing',
    seal: '行',
    sourceType: 'classical',
    source: { text: 'Su Shi Essay', author: 'Su Shi' },
    tags: ['flow', 'skill', 'artistry']
  },
  {
    id: 'd2',
    cn: '九死一生',
    pinyin: 'jiǔ sǐ yī shēng',
    en: 'Nine deaths, one life — a narrow escape from near-certain death.',
    sense: 'Surviving extreme cultivation peril against terrifying odds.',
    path: 'xing',
    seal: '行',
    sourceType: 'classical',
    source: { text: 'Li Sao', author: 'Qu Yuan' },
    tags: ['peril', 'survival', 'escape']
  },
  {
    id: 'd10',
    cn: '风驰电掣',
    pinyin: 'fēng chí diàn chè',
    en: 'Passing like thunder and galloping at lightning speed.',
    sense: 'High-velocity movement across vast distances.',
    path: 'xing',
    seal: '行',
    sourceType: 'classical',
    source: { text: 'Book of Sui', author: null },
    tags: ['speed', 'lightning', 'movement']
  },

  // --- 5. YIN (隐) — Solitude, Philosophy & Dao ---
  {
    id: 'p1',
    cn: '大道无形',
    pinyin: 'dà dào wú xíng',
    en: 'The Grand Dao has no shape, no name, and no fixed principle.',
    sense: 'Reverent insight into the ultimate formless nature of reality.',
    path: 'yin',
    seal: '隐',
    sourceType: 'classical',
    source: { text: 'Qingjing Jing (Scripture of Purity and Tranquility)', author: 'Daoist Canon' },
    tags: ['dao', 'formless', 'transcendence']
  },
  {
    id: 'p3',
    cn: '朝闻道，夕死可矣',
    pinyin: 'zhāo wén dào, xī sǐ kě yǐ',
    en: 'If one hears the truth of the Dao in the morning, one can die content in the evening.',
    sense: 'Devotional fulfillment in comprehending ultimate truth.',
    path: 'yin',
    seal: '隐',
    sourceType: 'classical',
    source: { text: 'Analects of Confucius', author: 'Confucius' },
    tags: ['wisdom', 'truth', 'fulfillment']
  },
  {
    id: 'p4',
    cn: '夏虫不可语冰',
    pinyin: 'xià chóng bù kě yǔ bīng',
    en: 'You cannot discuss ice with a summer bug, nor the ocean with a well frog.',
    sense: 'Compassionate recognition of inherently limited mortal perspectives.',
    path: 'yin',
    seal: '隐',
    sourceType: 'classical',
    source: { text: 'Zhuangzi (Autumn Waters)', author: 'Zhuang Zhou' },
    tags: ['perspective', 'zhuangzi', 'wisdom']
  },
  {
    id: 'p6',
    cn: '善恶皆是自我',
    pinyin: 'shàn è jiē shì zì wǒ',
    en: 'Good and evil are merely the expansion and contraction of the self across the cosmic singularity.',
    sense: 'Contemplative cosmic view transcending mortal dualities.',
    path: 'yin',
    seal: '隐',
    sourceType: 'novel',
    source: { title: 'Renegade Immortal (Xian Ni)', author: 'Er Gen' },
    tags: ['cosmology', 'er gen', 'morality']
  },
  {
    id: 'p8',
    cn: '画圈而行',
    pinyin: 'huà quān ér xíng',
    en: 'Wisdom lies in walking around the circle of life, rather than remaining trapped standing in a single spot.',
    sense: 'Humble, flexible clarity navigating mortal existence.',
    path: 'yin',
    seal: '隐',
    sourceType: 'novel',
    source: { title: 'Dao of the Bizarre Immortal', author: 'Foxing' },
    tags: ['wisdom', 'circle', 'flexibility']
  },
  {
    id: 'i3',
    cn: '纸上得来终觉浅，绝知此事要躬行',
    pinyin: 'zhǐ shàng dé lái zhōng jué qiǎn, jué zhī cǐ shì yào gōng xíng',
    en: 'What is learned from paper will always feel shallow; true knowledge requires personal practice.',
    sense: 'Humbling call to personal cultivation and experience.',
    path: 'yin',
    seal: '隐',
    sourceType: 'classical',
    source: { text: 'Winter Night Reading', author: 'Lu You' },
    tags: ['practice', 'knowledge', 'humility']
  },

  // --- 6. QING (情) — Emotion, Longing & Bonds ---
  {
    id: 't1',
    cn: '化身石桥',
    pinyin: 'huà shēn shí qiáo',
    en: 'I am willing to turn into a stone bridge, enduring 500 years of wind, sun, and rain, just for you to walk across.',
    sense: 'Unwavering, selfless devotion enduring across centuries.',
    path: 'qing',
    seal: '情',
    sourceType: 'classical',
    source: { text: 'Ananda\'s Vow', author: 'Buddhist Canon' },
    tags: ['devotion', 'love', 'endurance']
  },
  {
    id: 't3',
    cn: '仙人抚我顶，结发授长生',
    pinyin: 'xiān rén fǔ wǒ dǐng, jié fà shòu cháng shēng',
    en: 'An immortal patted my head, bound my hair, and bestowed upon me the secret of eternal life.',
    sense: 'Whimsical warmth and romantic immortal mentorship.',
    path: 'qing',
    seal: '情',
    sourceType: 'classical',
    source: { text: 'To my Nephew', author: 'Li Bai' },
    tags: ['immortality', 'whimsy', 'li bai']
  },
  {
    id: 'j1',
    cn: '人在江湖，身不由己',
    pinyin: 'rén zài jiāng hú, shēn bù yóu jǐ',
    en: 'When your feet are planted in the Jianghu, one cannot move as one pleases.',
    sense: 'The bittersweet compromises and unwritten codes governing mortal relationships.',
    path: 'qing',
    seal: '情',
    sourceType: 'novel',
    source: { title: 'Attributed to Gu Long', author: 'Gu Long' },
    tags: ['jianghu', 'compromise', 'gu long']
  },
  {
    id: 'j2',
    cn: '一日为师，终行为父',
    pinyin: 'yī rì wéi shī, zhōng xíng wéi fù',
    en: 'A mentor for a single day is revered as a father for an entire lifetime.',
    sense: 'Deep reverence for mentorship and sacred martial bonds.',
    path: 'qing',
    seal: '情',
    sourceType: 'idiom',
    source: { text: 'Traditional Precept', author: null },
    tags: ['mentorship', 'honor', 'respect']
  },
  {
    id: 'i2',
    cn: '男心动志，女心动情',
    pinyin: 'nán xīn dòng zhì, nǚ xīn dòng qíng',
    en: 'A restless mind in a man portends grand ambitions; in a woman, worldly affairs.',
    sense: 'A traditional saying whose self-undercutting irony highlights societal bias.',
    path: 'qing',
    seal: '情',
    sourceType: 'idiom',
    source: { text: 'Traditional Saying', author: null },
    tags: ['irony', 'observation', 'tradition']
  }
];

const LOCAL_STORAGE_CUSTOM_KEY = 'custom_wuxia_quotes_v2';

/**
 * Gets all quotes combining default quotes and custom user-submitted quotes
 */
export function getAllQuotes() {
  let customQuotes = [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CUSTOM_KEY);
    if (raw) {
      customQuotes = JSON.parse(raw);
    }
  } catch (e) {}

  return [...INITIAL_QUOTES, ...customQuotes];
}

/**
 * Saves a new custom user quote into localStorage
 */
export function addCustomQuote(newQuote) {
  const quoteObj = {
    id: 'custom_' + Date.now(),
    cn: newQuote.cn || '心存高远',
    pinyin: newQuote.pinyin || 'xīn cún gāo yuǎn',
    en: newQuote.en || newQuote.quote,
    sense: newQuote.sense || newQuote.meaning || 'Community contribution',
    path: newQuote.path || 'yin',
    seal: newQuote.seal || '隐',
    sourceType: 'unknown',
    source: { text: newQuote.source || 'Reader Contribution', author: null },
    tags: ['custom', 'community'],
    isCustom: true
  };

  try {
    const current = getAllQuotes().filter(q => q.isCustom);
    const updated = [quoteObj, ...current];
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_KEY, JSON.stringify(updated));
  } catch (e) {}

  return quoteObj;
}
