/**
 * Chinese Wuxia, Xianxia & Cultivation Novel Sayings & Idioms Dataset
 * Complete list of 110+ sayings, idioms, proverbs, and cultivation lore categorized by mood/theme.
 */

export const MOOD_CATEGORIES = [
  { id: 'all', label: 'All Sayings', color: '#ffcb05', seal: '道' },
  { id: 'fatalism', label: 'Fatalism & Acceptance', color: '#a855f7', seal: '命' },
  { id: 'resilience', label: 'Endurance & Resilience', color: '#ef4444', seal: '忍' },
  { id: 'cynicism', label: 'Cynicism & Caution', color: '#f97316', seal: '谋' },
  { id: 'moral', label: 'Moral Conviction', color: '#3b82f6', seal: '正' },
  { id: 'leadership', label: 'Leadership & Governance', color: '#eab308', seal: '主' },
  { id: 'philosophy', label: 'Philosophy & Dao', color: '#10b981', seal: '悟' },
  { id: 'menace', label: 'Awe & Menace', color: '#dc2626', seal: '威' },
  { id: 'tenderness', label: 'Longing & Tenderness', color: '#ec4899', seal: '情' },
  { id: 'observation', label: 'Irony & Observation', color: '#8b5cf6', seal: '观' },
  { id: 'power', label: 'Power & Hierarchy', color: '#f59e0b', seal: '霸' },
  { id: 'time', label: 'Spans of Time', color: '#6366f1', seal: '时' },
  { id: 'effort', label: 'Effort & Cultivation', color: '#06b6d4', seal: '修' },
  { id: 'world', label: 'Fate & Red Dust', color: '#84cc16', seal: '尘' },
  { id: 'danger', label: 'Conflict & Scheming', color: '#b91c1c', seal: '杀' },
  { id: 'greed', label: 'Opportunism & Greed', color: '#d97706', seal: '贪' },
  { id: 'limitation', label: 'Perspective & Limits', color: '#0284c7', seal: '眼' },
  { id: 'body', label: 'Body & Reactions', color: '#ea580c', seal: '血' },
  { id: 'beauty', label: 'Beauty & Refinement', color: '#f472b6', seal: '雅' },
  { id: 'jianghu', label: 'Martial World', color: '#14b8a6', seal: '侠' }
];

export const INITIAL_QUOTES = [
  // 1. Fatalism & Acceptance
  {
    id: 'f1',
    category: 'fatalism',
    title: 'Karmic Reciprocation',
    quote: "Good meets with good, and evil meets with evil. If there is no retribution yet, it is only because the time has not arrived.",
    source: "Chinese Proverb / Cultivation Canon (善恶到头终有报)",
    meaning: "Karmic reciprocation, early or late — resigned fatalism.",
    tags: ["Karma", "Fate", "Retribution"]
  },
  {
    id: 'f2',
    category: 'fatalism',
    title: 'Fate Makes Fools of Heroes',
    quote: "Fate makes fools of people; even the greatest hero meets their tragic end when destiny commands it.",
    source: "Wuxia Classics",
    meaning: "Tragic fatalism; powerlessness against destiny.",
    tags: ["Fate", "Tragedy", "Heroism"]
  },
  {
    id: 'f3',
    category: 'fatalism',
    title: 'No Banquet Lasts Forever',
    quote: "Under heaven, there is no banquet that does not end. Every gathering must eventually part.",
    source: "Traditional Saying (天下没有不散的宴席)",
    meaning: "Bittersweet acceptance of transience and parting.",
    tags: ["Transience", "Parting", "Bittersweet"]
  },
  {
    id: 'f4',
    category: 'fatalism',
    title: 'Falling Flowers and Flowing Water',
    quote: "The falling flowers have intent to linger, but the flowing water streams heartlessly onward.",
    source: "Poetic Proverb (落花有意，流水无情)",
    meaning: "Melancholic endurance of unrequited nature.",
    tags: ["Melancholy", "Endurance", "Unrequited"]
  },
  {
    id: 'f5',
    category: 'fatalism',
    title: 'Night of Festivities, Dawn of Death',
    quote: "The night was full of laughter and festivities, but the dawn brought only death and silence.",
    source: "Xianxia Tragedy",
    meaning: "Bleak, whiplash tragedy.",
    tags: ["Tragedy", "Sudden", "Fate"]
  },
  {
    id: 'f6',
    category: 'fatalism',
    title: 'Fortune vs Freedom',
    quote: "A hero may gain supreme fortune under heaven, yet lose the simple freedom of his own life.",
    source: "Wuxia Solitude",
    meaning: "Wistful powerlessness despite power.",
    tags: ["Powerlessness", "Freedom", "Wistful"]
  },
  {
    id: 'f7',
    category: 'fatalism',
    title: 'Snow of Last Year',
    quote: "The snow of last year is not this year's snow, but every single falling snowflake is her.",
    source: "Xianxia Romance",
    meaning: "Tender grief, enduring consolation across time.",
    tags: ["Grief", "Longing", "Consolation"]
  },

  // 2. Endurance & Resilience
  {
    id: 'r1',
    category: 'resilience',
    title: 'Extreme Leads to Change',
    quote: "When things reach their absolute limit, change must occur; when change occurs, solutions open.",
    source: "I Ching / Wuxia Philosophy (物极必反)",
    meaning: "Hopeful pragmatism during severe trials.",
    tags: ["Resilience", "Hope", "Pragmatism"]
  },
  {
    id: 'r2',
    category: 'resilience',
    title: 'Rock Bottom Reversal',
    quote: "Reaching rock bottom leads to change, change leads to reversal, and reversal brings supreme prosperity.",
    source: "Cultivation Classic (否极泰来)",
    meaning: "Triumphant perseverance through darkest times.",
    tags: ["Perseverance", "Triumph", "Reversal"]
  },
  {
    id: 'r3',
    category: 'resilience',
    title: 'Tuition Fee of Suffering',
    quote: "Suffering and losing are merely the tuition fee paid to master the ruthless ways of the world.",
    source: "Jianghu Encouragement",
    meaning: "Rueful encouragement to learn from defeat.",
    tags: ["Encouragement", "Learning", "Suffering"]
  },
  {
    id: 'r4',
    category: 'resilience',
    title: 'Whisper of Wind & Glorious Death',
    quote: "Listen to the whisper of the wind, and fight for a glorious death rather than living on your knees!",
    source: "Xianxia War Lore",
    meaning: "Defiant courage against impossible odds.",
    tags: ["Courage", "Defiance", "Honor"]
  },
  {
    id: 'r5',
    category: 'resilience',
    title: 'Raging Storm & Good Drink',
    quote: "As the storm rages across the wilderness, the people endure — better to pour a good drink and keep walking.",
    source: "Jianghu Wanderer Lore",
    meaning: "World-weary wry humor and grit.",
    tags: ["Grit", "Jianghu", "Endurance"]
  },
  {
    id: 'r6',
    category: 'resilience',
    title: 'Covered with Lice',
    quote: "When you are already covered with lice, you stop feeling the bites; when debt is too high, you stop worrying.",
    source: "Proverb (债多不愁，虱多不痒)",
    meaning: "Numb resignation to hardship.",
    tags: ["Resignation", "Hardship", "Numbness"]
  },

  // 3. Cynicism & Caution
  {
    id: 'c1',
    category: 'cynicism',
    title: 'Soft Mouth After Eating',
    quote: "When you eat someone's food, your mouth becomes soft; when you take someone's gifts, your hands become short.",
    source: "Proverb (吃人的嘴短，拿人的手短)",
    meaning: "Knowing cynicism about debt and obligation.",
    tags: ["Obligation", "Cynicism", "Worldly"]
  },
  {
    id: 'c2',
    category: 'cynicism',
    title: 'Bandits Never Leave Empty-Handed',
    quote: "Bandits never walk away empty-handed; even if they find nothing, they will rip away the door frame.",
    source: "Jianghu Maxim (贼不空手)",
    meaning: "Grim humor about greedy predators.",
    tags: ["Predators", "Grim Humor", "Jianghu"]
  },
  {
    id: 'c3',
    category: 'cynicism',
    title: 'Crafty Rabbit Has Three Burrows',
    quote: "A crafty rabbit always prepares three burrows to survive the hunter.",
    source: "Idiom (狡兔三窟)",
    meaning: "Shrewd self-preservation and contingency planning.",
    tags: ["Preservation", "Strategy", "Caution"]
  },
  {
    id: 'c4',
    category: 'cynicism',
    title: 'Two Kinds of Philanthropists',
    quote: "There are only two kinds of philanthropic people in the world: those seeking a name, and those plotting a deeper trap.",
    source: "Cultivation World Realism",
    meaning: "Wary suspicion of unearned kindness.",
    tags: ["Suspicion", "Realism", "Motive"]
  },
  {
    id: 'c5',
    category: 'cynicism',
    title: 'Help Too Much Earns Hated',
    quote: "Help a little and you win a loyal friend; help too much and you earn a bitter enemy.",
    source: "Jianghu Wisdom (升米恩，斗米仇)",
    meaning: "Bitter pragmatism about human ingratitude.",
    tags: ["Pragmatism", "Human Nature", "Caution"]
  },
  {
    id: 'c6',
    category: 'cynicism',
    title: 'Law Violated by Many',
    quote: "When a law is violated by everyone, it ceases to be enforced.",
    source: "Legal Realism (法不责众)",
    meaning: "Dry institutional realism.",
    tags: ["Law", "Realism", "Society"]
  },
  {
    id: 'c7',
    category: 'cynicism',
    title: 'Snake Swallowing an Elephant',
    quote: "A man whose heart is never content is like a snake trying to swallow an elephant whole.",
    source: "Idiom (人心不足蛇吞象)",
    meaning: "Cautionary contempt for endless greed.",
    tags: ["Greed", "Caution", "Contentment"]
  },
  {
    id: 'c8',
    category: 'cynicism',
    title: 'Water Bears and Swallows',
    quote: "The water that carries the boat is the very same water that swallows it whole.",
    source: "Xunzi / Statecraft (水能载舟，亦能覆舟)",
    meaning: "Sober warning about the fickle nature of power.",
    tags: ["Power", "Warning", "Statecraft"]
  },

  // 4. Moral Conviction & Integrity
  {
    id: 'm1',
    category: 'moral',
    title: 'No Guilt Under Heaven',
    quote: "With no guilt toward heaven above, no shame toward earth below, and no deceit toward the heart within.",
    source: "Wuxia Righteous Code (仰不愧于天，俯不怍于地)",
    meaning: "Upright pride and unblemished integrity.",
    tags: ["Integrity", "Honor", "Conscience"]
  },
  {
    id: 'm2',
    category: 'moral',
    title: 'All Laws Equal',
    quote: "All laws under heaven are equal; prince or commoner, all must obey regardless of status.",
    source: "Legalist & Wuxia Precept (王子犯法与庶民同罪)",
    meaning: "Principled, egalitarian conviction.",
    tags: ["Justice", "Equality", "Law"]
  },
  {
    id: 'm3',
    category: 'moral',
    title: 'Heart Reflecting the World',
    quote: "How my heart views the world is how the world should view me. I answer to none but my own conscience.",
    source: "Xianxia Cultivator Creed",
    meaning: "Self-accountable moral idealism.",
    tags: ["Idealism", "Dao Heart", "Self-mastery"]
  },
  {
    id: 'm4',
    category: 'moral',
    title: 'Lenient to Others, Strict to Oneself',
    quote: "Treat others with lenience and benevolence, but demand strict perfection from oneself.",
    source: "Confucian Precept (严以律己，宽以待人)",
    meaning: "Moral generosity and personal discipline.",
    tags: ["Generosity", "Discipline", "Morality"]
  },
  {
    id: 'm5',
    category: 'moral',
    title: 'Demand More from Yourself',
    quote: "Demand more from yourself each day, and the world will eventually demand more from you.",
    source: "Cultivator Discipline",
    meaning: "Stern self-discipline.",
    tags: ["Discipline", "Growth", "Standards"]
  },
  {
    id: 'm6',
    category: 'moral',
    title: 'Wine Doesn\'t Intoxicate',
    quote: "Wine does not intoxicate a man; a man intoxicates himself.",
    source: "Idiom (酒不醉人人自醉)",
    meaning: "Dry insistence on personal responsibility.",
    tags: ["Responsibility", "Intoxication", "Self-control"]
  },
  {
    id: 'm7',
    category: 'moral',
    title: 'Deeds Over Records',
    quote: "True worth lies in deeds performed in the shadows, not in whether your name is recorded in golden scrolls.",
    source: "Wuxia Sage Lore",
    meaning: "Quiet dignity and selfless virtue.",
    tags: ["Dignity", "Virtue", "Humility"]
  },
  {
    id: 'm8',
    category: 'moral',
    title: 'Uncaring Heart',
    quote: "There is no tragedy under heaven worse than an uncaring, numb heart.",
    source: "Moral Judgment (心死胜于身死)",
    meaning: "Sorrowful moral judgment on apathy.",
    tags: ["Apathy", "Heart", "Tragedy"]
  },

  // 5. Leadership & Governance
  {
    id: 'l1',
    category: 'leadership',
    title: 'Leader Needs Support and Restriction',
    quote: "A true leader needs subordinates who support them, but also advisors who dare to restrict them.",
    source: "Statecraft Precept",
    meaning: "Sober, mature leadership.",
    tags: ["Leadership", "Governance", "Advisors"]
  },
  {
    id: 'l2',
    category: 'leadership',
    title: 'Steadiness Over Speed',
    quote: "Governing a large faction requires steadiness over speed; haste leads to sudden collapse.",
    source: "Sect Governance (欲速则不达)",
    meaning: "Patient caution in governance.",
    tags: ["Caution", "Governance", "Patience"]
  },
  {
    id: 'l3',
    category: 'leadership',
    title: 'Emperor as the Trunk',
    quote: "The emperor is like the trunk of a giant tree; he cannot shake the dust off every single falling leaf.",
    source: "Imperial Realism",
    meaning: "Resigned realism about the limits of authority.",
    tags: ["Authority", "Limits", "Statecraft"]
  },
  {
    id: 'l4',
    category: 'leadership',
    title: 'Same Rice Raises Different People',
    quote: "No single principle fits every situation; the same grain of rice raises a hundred different kinds of people.",
    source: "Proverb (一样米养百样人)",
    meaning: "Humane skepticism of rigid dogma.",
    tags: ["Diversity", "Humanity", "Dogma"]
  },
  {
    id: 'l5',
    category: 'leadership',
    title: 'Sages Draw Mentality to Best Sector',
    quote: "Sages do not try to make everyone identical; they guide each mind to excel in its own proper realm.",
    source: "Sage Leadership",
    meaning: "Pragmatic, compassionate leadership.",
    tags: ["Guidance", "Talent", "Wisdom"]
  },

  // 6. Philosophy & Transcendence
  {
    id: 'p1',
    category: 'philosophy',
    title: 'Grand Dao Has No Form',
    quote: "The Grand Dao has no shape, no name, and no fixed principle — it lives purely within the Dao Heart.",
    source: "Daoist Classic / Er Gen Universe (大道无形)",
    meaning: "Reverent insight into supreme reality.",
    tags: ["Dao", "Transcendence", "Cultivation"]
  },
  {
    id: 'p2',
    category: 'philosophy',
    title: 'Heart Certain All is Dao',
    quote: "If the heart is certain and unwavering, all things under heaven become part of the Dao.",
    source: "Dao Heart Conviction",
    meaning: "Steadying conviction in spiritual path.",
    tags: ["Conviction", "Dao Heart", "Certainty"]
  },
  {
    id: 'p3',
    category: 'philosophy',
    title: 'Hear the Dao in Morning',
    quote: "If one hears the truth of the Dao in the morning, one can die content in the evening without regret.",
    source: "Analects of Confucius (朝闻道，夕死可矣)",
    meaning: "Devotional fulfillment in truth.",
    tags: ["Wisdom", "Truth", "Fulfillment"]
  },
  {
    id: 'p4',
    category: 'philosophy',
    title: 'Summer Bug & Well Frog',
    quote: "You cannot discuss ice with a summer bug, nor the ocean with a well frog; yet even they have their place in the Dao.",
    source: "Zhuangzi (夏虫不可语冰)",
    meaning: "Compassionate consolation for limited perspectives.",
    tags: ["Perspective", "Dao", "Consolation"]
  },
  {
    id: 'p5',
    category: 'philosophy',
    title: 'Without Darkness No Light',
    quote: "Without the profound darkness of night, how can there be any true appreciation of light?",
    source: "Dualistic Dao Lore",
    meaning: "Reconciling dualities of existence.",
    tags: ["Yin Yang", "Light", "Balance"]
  },
  {
    id: 'p6',
    category: 'philosophy',
    title: 'Good and Evil Singularity',
    quote: "Good and evil are merely the expansion and contraction of the self across the cosmic singularity.",
    source: "Xianxia Cosmology",
    meaning: "Contemplative, cosmic view of morality.",
    tags: ["Cosmology", "Morality", "Self"]
  },
  {
    id: 'p7',
    category: 'philosophy',
    title: 'All is Well, All is Free',
    quote: "All is well under heaven, and all spirits are fundamentally free.",
    source: "Zen Cultivator Saying",
    meaning: "Serene release from worldly bonds.",
    tags: ["Serenity", "Freedom", "Release"]
  },
  {
    id: 'p8',
    category: 'philosophy',
    title: 'Walking Around the Circle',
    quote: "Wisdom lies in walking around the circle of life, rather than remaining trapped standing in a single spot.",
    source: "Daoist Insight",
    meaning: "Humble, clear-eyed flexibility.",
    tags: ["Wisdom", "Movement", "Clarity"]
  },

  // 7. Awe & Menace
  {
    id: 'a1',
    category: 'menace',
    title: 'Heavens Plot Your Demise',
    quote: "When the heavens plot your demise, the constellations shift and earth turns to blood!",
    source: "Apocalyptic Xianxia Lore (天发杀机，移星易宿)",
    meaning: "Apocalyptic dread and celestial power.",
    tags: ["Dread", "Celestial", "Apocalypse"]
  },
  {
    id: 'a2',
    category: 'menace',
    title: 'Escalating Anger',
    quote: "A common man's anger lays two bodies low; an emperor's anger buries millions; a dragon's anger shakes heaven and earth!",
    source: "Classic War Maxim (天子之怒，伏尸百万)",
    meaning: "Escalating awe and terrifying wrath.",
    tags: ["Wrath", "Power", "Awe"]
  },
  {
    id: 'a3',
    category: 'menace',
    title: 'Wild Heavens & Wild People',
    quote: "Wild heavens bring torrents of rain; wild people bring apocalyptic calamity.",
    source: "Moral Foreboding Lore",
    meaning: "Foreboding warning of human hubris.",
    tags: ["Hubris", "Warning", "Calamity"]
  },
  {
    id: 'a4',
    category: 'menace',
    title: 'No Sentience Post-Civilization',
    quote: "After the founding of civilization, non-human things are no longer permitted to attain sentience!",
    source: "Modern Urban Xianxia Rule (建国后不许成精)",
    meaning: "Cold, ominous decree of law.",
    tags: ["Decree", "Ominous", "Law"]
  },

  // 8. Longing & Tenderness
  {
    id: 't1',
    category: 'tenderness',
    title: 'Stone Bridge of 500 Years',
    quote: "I am willing to turn into a stone bridge, enduring 500 years of wind, 500 years of sun, and 500 years of rain, just for you to walk across.",
    source: "Buddhist / Xianxia Romance Lore",
    meaning: "Unwavering devotion across centuries.",
    tags: ["Devotion", "Love", "Endurance"]
  },
  {
    id: 't2',
    category: 'tenderness',
    title: 'Hearts of Women Like Poetry',
    quote: "The hearts of women are like ancient poetry — beautiful, deep, and utterly inscrutable.",
    source: "Wuxia Romance",
    meaning: "Wistful bemusement.",
    tags: ["Poetry", "Romance", "Mystery"]
  },
  {
    id: 't3',
    category: 'tenderness',
    title: 'An Immortal Patted My Head',
    quote: "An immortal patted my head, bound my hair, and bestowed upon me the secret of eternal life.",
    source: "Li Bai / Xianxia Poem (仙人抚我顶，结发授长生)",
    meaning: "Whimsical warmth and romantic immortal lore.",
    tags: ["Immortality", "Whimsy", "Warmth"]
  },

  // 9. Irony & Observation
  {
    id: 'i1',
    category: 'observation',
    title: 'Youth Flavor of Worry',
    quote: "When young, one does not know the true flavor of worry, calling it sorrow merely to write new poetry.",
    source: "Xin Qiji Classic Poem (少年不识愁滋味)",
    meaning: "Nostalgic irony about youthful dramatization.",
    tags: ["Youth", "Irony", "Nostalgia"]
  },
  {
    id: 'i2',
    category: 'observation',
    title: 'Restless Mind',
    quote: "A restless mind in a man portends grand ambitions; in a woman, worldly affairs.",
    source: "Wuxia Observation",
    meaning: "Teasing observation of human nature.",
    tags: ["Observation", "Ambition", "Irony"]
  },
  {
    id: 'i3',
    category: 'observation',
    title: 'What You Get from Paper',
    quote: "What is learned from paper will always feel shallow; true knowledge requires personal practice.",
    source: "Lu You Classic Poem (纸上得来终觉浅，绝知此事要躬行)",
    meaning: "Humbling call to real practice.",
    tags: ["Practice", "Knowledge", "Humility"]
  },
  {
    id: 'i4',
    category: 'observation',
    title: 'Outcomes Shape Perception',
    quote: "Outcomes shape all perception — success highlights every virtue, while failure exposes every flaw.",
    source: "Clear-eyed Analytic Lore",
    meaning: "Clear-eyed analysis of bias.",
    tags: ["Perception", "Success", "Bias"]
  },
  {
    id: 'i5',
    category: 'observation',
    title: 'Easier Life Brings Criticism',
    quote: "As life becomes easier, people find more trivial things to criticize.",
    source: "Sardonic Proverb",
    meaning: "Sardonic observation of human behavior.",
    tags: ["Sardonic", "Society", "Behavior"]
  },
  {
    id: 'i6',
    category: 'observation',
    title: 'Ignorance More Pitiable than Death',
    quote: "Living in blind ignorance is far more pitiable than dying.",
    source: "Cultivator Severity",
    meaning: "Pity edged with severity for the ignorant.",
    tags: ["Ignorance", "Pity", "Wisdom"]
  },

  // 10. Power, Status & Hierarchy
  {
    id: 'pw1',
    category: 'power',
    title: 'Weak Are Prey to Strong',
    quote: "The weak are prey to the strong; might makes right under heaven.",
    source: "Cultivation World Mandate (弱肉强食)",
    meaning: "The brutal law of the jungle in cultivation.",
    tags: ["Might Makes Right", "Power", "Hierarchy"]
  },
  {
    id: 'pw2',
    category: 'power',
    title: 'Failed to See Mount Tai',
    quote: "You have eyes but failed to recognize Mount Tai standing right before you!",
    source: "Classic Idiom (有眼不识泰山)",
    meaning: "Failing to recognize supreme status or hidden power.",
    tags: ["Arrogance", "Mount Tai", "Status"]
  },
  {
    id: 'pw3',
    category: 'power',
    title: 'Not Put in One\'s Eyes',
    quote: "They did not even put him in their eyes, regarding him as mere dust.",
    source: "Novel Slang (不放在眼里)",
    meaning: "Disdainful disregard of lesser rivals.",
    tags: ["Disdain", "Arrogance", "Hierarchy"]
  },
  {
    id: 'pw4',
    category: 'power',
    title: 'I, Your Grandfather',
    quote: "I, your grandfather, am standing right here! Who dares approach?",
    source: "Pejorative Xianxia Slang (老子 / 本座)",
    meaning: "Asserting aggressive dominance and seniority.",
    tags: ["Dominance", "Slang", "Aggression"]
  },
  {
    id: 'pw5',
    category: 'power',
    title: 'Crushing Dry Weeds',
    quote: "Crushing dry weeds and smashing rotten wood — accomplished as easily as breathing.",
    source: "Idiom (摧枯拉朽)",
    meaning: "Ease with which the strong crush the weak.",
    tags: ["Overwhelming", "Ease", "Power"]
  },
  {
    id: 'pw6',
    category: 'power',
    title: 'Unrivaled Under Heaven',
    quote: "Number one in the world; invincible and unrivaled beneath the vast heavens.",
    source: "Title Lore (天下无敌)",
    meaning: "Apex martial supremacy.",
    tags: ["Invincible", "Number One", "Apex"]
  },
  {
    id: 'pw7',
    category: 'power',
    title: 'Immensity of Heaven and Earth',
    quote: "You do not know the immensity of heaven and earth, nor the depth of true power!",
    source: "Warning Slang (不知天高地厚)",
    meaning: "Rebuking exaggerated self-opinion.",
    tags: ["Warning", "Arrogance", "Limits"]
  },
  {
    id: 'pw8',
    category: 'power',
    title: 'Heavens Beyond Heavens',
    quote: "There are people beyond people, and heavens beyond the heavens.",
    source: "Idiom (天外有天，人外有人)",
    meaning: "There is always someone stronger.",
    tags: ["Humility", "Mastery", "Heavens"]
  },
  {
    id: 'pw9',
    category: 'power',
    title: 'Rebuke Heaven and Earth',
    quote: "To rebuke heaven and earth and command the storms with a single roar!",
    source: "Xuanhuan Epic (叱咤风云)",
    meaning: "Earth-shattering authority.",
    tags: ["Storms", "Authority", "Supreme"]
  },
  {
    id: 'pw10',
    category: 'power',
    title: 'Produce Clouds and Rain',
    quote: "Produce clouds with one turn of the hand, and rain with another.",
    source: "Idiom (翻手为云，覆手为雨)",
    meaning: "Possessing absolute manipulative power.",
    tags: ["Manipulation", "Control", "Power"]
  },
  {
    id: 'pw11',
    category: 'power',
    title: 'Call Wind & Summon Rain',
    quote: "Calling the wind and summoning the rain with a single wave of the hand.",
    source: "Idiom (呼风唤雨)",
    meaning: "Exercising magical omnipotence.",
    tags: ["Magical", "Omnipotence", "Command"]
  },
  {
    id: 'pw12',
    category: 'power',
    title: 'Move Mountains & Drain Seas',
    quote: "Moving colossal mountains and draining vast seas in an instant.",
    source: "Idiom (移山填海)",
    meaning: "Great display of godlike strength.",
    tags: ["Godlike", "Mountains", "Seas"]
  },
  {
    id: 'pw13',
    category: 'power',
    title: 'Overturning Rivers and Seas',
    quote: "Overturning rivers and seas in an earth-shattering tempest of power.",
    source: "Idiom (翻江倒海)",
    meaning: "Overwhelming, chaotic display of force.",
    tags: ["Tempest", "Force", "Chaos"]
  },
  {
    id: 'pw14',
    category: 'power',
    title: 'Three Heads, Six Arms',
    quote: "Even if you possessed three heads and six arms, you cannot escape today!",
    source: "Asura Reference (三头六臂)",
    meaning: "Formidable mythical power.",
    tags: ["Asura", "Combat", "Formidable"]
  },
  {
    id: 'pw15',
    category: 'power',
    title: 'Dragon Among Men',
    quote: "An exceptional talent standing out as a true dragon among men.",
    source: "Compliment (人中之龙)",
    meaning: "Uniquely talented individual.",
    tags: ["Dragon", "Talent", "Excellence"]
  },
  {
    id: 'pw16',
    category: 'power',
    title: 'Crane Among Chickens',
    quote: "Standing out like a majestic crane among a flock of humble chickens.",
    source: "Idiom (鹤立鸡群)",
    meaning: "Standing out far above lesser peers.",
    tags: ["Excellence", "Peers", "Distinction"]
  },
  {
    id: 'pw17',
    category: 'power',
    title: 'Starved Camel Bigger Than Horse',
    quote: "Even a starved, weakened camel is still far bigger than a healthy horse.",
    source: "Proverb (瘦死的骆驼比马大)",
    meaning: "Even a weakened titan remains formidable.",
    tags: ["Titan", "Strength", "Resilience"]
  },
  {
    id: 'pw18',
    category: 'power',
    title: 'Paper Tiger',
    quote: "Fierce on the outside, but nothing more than a paper tiger within.",
    source: "Idiom (纸老虎)",
    meaning: "Appearing fierce but actually frail.",
    tags: ["Illusion", "Frail", "Tiger"]
  },
  {
    id: 'pw19',
    category: 'power',
    title: 'Tiger Grown Wings',
    quote: "Like a fierce tiger that has grown powerful wings, unstoppable!",
    source: "Idiom (如虎添翼)",
    meaning: "Doubling of formidable strength.",
    tags: ["Powerup", "Tiger", "Unstoppable"]
  },
  {
    id: 'pw20',
    category: 'power',
    title: 'Tiger Father No Dog Son',
    quote: "A tiger father will never beget a dog son!",
    source: "Compliment (虎父无犬子)",
    meaning: "A great predecessor breeds a worthy successor.",
    tags: ["Legacy", "Tiger", "Father"]
  },
  {
    id: 'pw21',
    category: 'power',
    title: 'Dragon Cannot Repress Local Snake',
    quote: "Even a powerful dragon cannot repress a fierce local snake on its home turf.",
    source: "Jianghu Realism (强龙压不过地头蛇)",
    meaning: "Home territory advantage over mighty outsiders.",
    tags: ["Territory", "Dragon", "Snake"]
  },
  {
    id: 'pw22',
    category: 'power',
    title: 'Dog Fierce With Master Present',
    quote: "A dog acting fierce only because its master is standing nearby.",
    source: "Idiom (狗仗人势)",
    meaning: "Bullying others using borrowed authority.",
    tags: ["Bully", "Borrowed Power", "Contempt"]
  },
  {
    id: 'pw23',
    category: 'power',
    title: 'Shrimp Soldiers & Crab Generals',
    quote: "Nothing but useless shrimp soldiers and crab generals!",
    source: "Derogatory Slang (虾兵蟹将)",
    meaning: "Incompetent, low-level fodder troops.",
    tags: ["Fodder", "Incompetent", "Troops"]
  },
  {
    id: 'pw24',
    category: 'power',
    title: 'Side Dish / Piece of Cake',
    quote: "Defeating you is just a small side dish — a total piece of cake!",
    source: "Slang (小菜一碟)",
    meaning: "An easy task performed with trivial effort.",
    tags: ["Easy", "Slang", "Confidence"]
  },

  // 11. Spans of Time
  {
    id: 'tm1',
    category: 'time',
    title: 'Time of an Incense Stick',
    quote: "Defeat them in the span of time it takes an incense stick to burn down.",
    source: "Time Unit (一炷香功夫)",
    meaning: "A short span; roughly 5 to 30 minutes.",
    tags: ["Time", "Incense", "Span"]
  },
  {
    id: 'tm2',
    category: 'time',
    title: 'Time to Drink a Cup of Tea',
    quote: "Wait here for the time it takes to drink a single cup of tea.",
    source: "Time Unit (一盏茶功夫)",
    meaning: "Brief span; roughly 10–15 minutes.",
    tags: ["Time", "Tea", "Span"]
  },
  {
    id: 'tm3',
    category: 'time',
    title: 'Time to Eat a Meal',
    quote: "The battle concluded in the time it takes to finish a meal.",
    source: "Time Unit (一顿饭功夫)",
    meaning: "Span of roughly 30–45 minutes.",
    tags: ["Time", "Meal", "Span"]
  },
  {
    id: 'tm4',
    category: 'time',
    title: 'A Breath of Time',
    quote: "He crossed ten thousand miles in a single breath of time.",
    source: "Time Unit (一呼吸间)",
    meaning: "Ultra-fast span; 1 to 3 seconds.",
    tags: ["Instant", "Breath", "Speed"]
  },
  {
    id: 'tm5',
    category: 'time',
    title: 'Described in Time, Done in Instant',
    quote: "All of this takes time to describe, but actually occurred in a mere instant!",
    source: "Authorial Aside",
    meaning: "Cheeky author note following high-velocity action.",
    tags: ["Instant", "Author Note", "Action"]
  },

  // 12. Effort & Cultivation
  {
    id: 'e1',
    category: 'effort',
    title: 'Twice Results, Half Effort',
    quote: "With the right approach, you achieve twice the results with half the effort.",
    source: "Idiom (事半功倍)",
    meaning: "Wisdom of efficient method.",
    tags: ["Efficiency", "Method", "Wisdom"]
  },
  {
    id: 'e2',
    category: 'effort',
    title: 'Half Results, Twice Effort',
    quote: "The wrong method yields half the results for twice the effort.",
    source: "Idiom (事倍功半)",
    meaning: "Wasteful approach warning.",
    tags: ["Wasteful", "Warning", "Method"]
  },
  {
    id: 'e3',
    category: 'effort',
    title: 'Leaps and Bounds',
    quote: "His cultivation progress advanced by leaps and bounds!",
    source: "Idiom (突飞猛进)",
    meaning: "Rapid, remarkable progress.",
    tags: ["Progress", "Cultivation", "Leaps"]
  },
  {
    id: 'e4',
    category: 'effort',
    title: 'Chop Nails and Sever Iron',
    quote: "Resolute and decisive — chopping nails and severing iron!",
    source: "Idiom (斩钉截铁)",
    meaning: "Unwavering, decisive action.",
    tags: ["Decisive", "Iron", "Resolve"]
  },
  {
    id: 'e5',
    category: 'effort',
    title: 'If Gods Block, Kill Gods',
    quote: "If Gods block my path, I shall slay the Gods; if Buddhas block my path, I shall slay the Buddhas!",
    source: "Xianxia Cultivator Oath (神挡杀神，佛挡杀佛)",
    meaning: "Unstoppable resolve to overcome any barrier.",
    tags: ["Resolve", "Unstoppable", "Cultivation"]
  },
  {
    id: 'e6',
    category: 'effort',
    title: 'Reaching Heaven in a Bound',
    quote: "Attempting to reach heaven in a single bound without building solid foundations.",
    source: "Idiom (一步登天)",
    meaning: "Desire for instant success without foundation.",
    tags: ["Foundation", "Warning", "Success"]
  },
  {
    id: 'e7',
    category: 'effort',
    title: 'Thousand-Mile Journey',
    quote: "A journey of a thousand miles begins with a single step.",
    source: "Laozi / Dao De Jing (千里之行始于足下)",
    meaning: "Great accomplishments built step by step.",
    tags: ["Patience", "Journey", "Progress"]
  },
  {
    id: 'e8',
    category: 'effort',
    title: 'Carp Leaping Dragon Gate',
    quote: "Like a carp leaping through the Dragon Gate to transform into a divine dragon!",
    source: "Legendary Idiom (鲤鱼跳龙门)",
    meaning: "Breakthrough and supreme transformation.",
    tags: ["Transformation", "Breakthrough", "Dragon"]
  },
  {
    id: 'e9',
    category: 'effort',
    title: 'Cleansing Marrow & Tendons',
    quote: "Purifying the body: cleansing the marrow and replacing the tendons.",
    source: "Body Cultivation (洗髓换骨)",
    meaning: "Purifying and strengthening mortal physical form.",
    tags: ["Purification", "Body", "Cultivation"]
  },
  {
    id: 'e10',
    category: 'effort',
    title: 'Shed Mortal Body',
    quote: "Shedding one's mortal body and exchanging mortal bones for immortal form.",
    source: "Immortality (脱胎换骨)",
    meaning: "Total rebirth and ascension.",
    tags: ["Rebirth", "Ascension", "Immortal"]
  },
  {
    id: 'e11',
    category: 'effort',
    title: 'As Easy as Lifting a Hand',
    quote: "Helping you was as easy as lifting a hand or turning a palm.",
    source: "Idiom (举手之劳)",
    meaning: "Task requiring minimal effort.",
    tags: ["Minimal", "Ease", "Help"]
  },
  {
    id: 'e12',
    category: 'effort',
    title: 'Floating Clouds & Flowing Water',
    quote: "Movements as natural and breathtaking as floating clouds and flowing water.",
    source: "Idiom (行云流水)",
    meaning: "Unforced, effortless artistic skill.",
    tags: ["Flow", "Skill", "Artistic"]
  },
  {
    id: 'e13',
    category: 'effort',
    title: 'Chef Ding Carving the Ox',
    quote: "Executing the complex task as effortlessly as Chef Ding carving an ox.",
    source: "Zhuangzi Parable (庖丁解牛)",
    meaning: "Mastery gained through deep experience.",
    tags: ["Mastery", "Ease", "Parable"]
  },
  {
    id: 'e14',
    category: 'effort',
    title: 'Drawing Legs on a Snake',
    quote: "Ruining perfection by drawing unnecessary legs on a snake.",
    source: "Idiom (画蛇添足)",
    meaning: "Wasted effort that ruins something.",
    tags: ["Wasted", "Warning", "Detail"]
  },
  {
    id: 'e15',
    category: 'effort',
    title: 'Dotting Dragon\'s Eyes',
    quote: "Adding the vital dot to the dragon's eyes to bring it to life!",
    source: "Idiom (画龙点睛)",
    meaning: "Crucial finishing touch.",
    tags: ["Touch", "Masterpiece", "Finish"]
  },
  {
    id: 'e16',
    category: 'effort',
    title: 'Lion Uses Full Strength on Rabbit',
    quote: "Even when hunting a humble rabbit, a lion exerts its full strength!",
    source: "Combat Strategy (狮子搏兔亦用全力)",
    meaning: "Never relax even against a weak foe.",
    tags: ["Strategy", "Focus", "Caution"]
  },
  {
    id: 'e17',
    category: 'effort',
    title: 'Play Lute for a Cow',
    quote: "Playing the lute for a cow — speaking wisdom to a fool.",
    source: "Idiom (对牛弹琴)",
    meaning: "Addressing the wrong, unreceptive audience.",
    tags: ["Fool", "Audience", "Irony"]
  },
  {
    id: 'e18',
    category: 'effort',
    title: 'Reap Without Sowing',
    quote: "Expecting to reap a rich harvest without ever sowing seeds.",
    source: "Idiom (不劳而获)",
    meaning: "Desiring rewards without work.",
    tags: ["Greed", "Work", "Warning"]
  },

  // 13. Fate, Change & Red Dust
  {
    id: 'w1',
    category: 'world',
    title: 'Red Dust of Mortals',
    quote: "Wandering through the endless red dust of the mortal world.",
    source: "Buddhist / Daoist Term (红尘)",
    meaning: "Transience of mortal worldly affairs.",
    tags: ["Red Dust", "Mortal", "World"]
  },
  {
    id: 'w2',
    category: 'world',
    title: 'Beneath the Heavens',
    quote: "In all the vast lands beneath the heavens.",
    source: "Realm Lore (天下)",
    meaning: "The mortal world and universe.",
    tags: ["World", "Heavens", "Realm"]
  },
  {
    id: 'w3',
    category: 'world',
    title: 'As Different as Heaven and Earth',
    quote: "A difference between them as vast as heaven and earth.",
    source: "Idiom (天壤之别)",
    meaning: "Tremendous qualitative difference.",
    tags: ["Difference", "Scale", "Realm"]
  },
  {
    id: 'w4',
    category: 'world',
    title: 'Man Proposes, Heaven Disposes',
    quote: "Man proposes the plan, but heaven disposes the final outcome.",
    source: "Idiom (谋事在人，成事在天)",
    meaning: "Best plans subject to fate.",
    tags: ["Fate", "Plans", "Outcome"]
  },
  {
    id: 'w5',
    category: 'world',
    title: 'Heaven\'s Net is Wide',
    quote: "Heaven's net is vast and wide; none can escape its mesh.",
    source: "Laozi (天网恢恢疏而不漏)",
    meaning: "The guilty cannot evade justice forever.",
    tags: ["Justice", "Net", "Fate"]
  },
  {
    id: 'w6',
    category: 'world',
    title: 'Overturning Heaven and Earth',
    quote: "Causing a radical upheaval that overturns heaven and earth!",
    source: "Idiom (翻天覆地)",
    meaning: "Earth-shattering transformation.",
    tags: ["Upheaval", "Change", "Scale"]
  },
  {
    id: 'w7',
    category: 'world',
    title: 'Blue Sea to Mulberry Fields',
    quote: "The blue sea turns into mulberry fields; time brings immense transformations.",
    source: "Idiom (沧海桑田)",
    meaning: "Massive changes brought by time.",
    tags: ["Time", "Transience", "Change"]
  },
  {
    id: 'w8',
    category: 'world',
    title: 'The Rice is Cooked',
    quote: "The raw rice is already cooked; what is done cannot be undone.",
    source: "Proverb (生米煮成熟饭)",
    meaning: "Irreversible reality.",
    tags: ["Reality", "Irreversible", "Proverb"]
  },
  {
    id: 'w9',
    category: 'world',
    title: 'Water Recedes, Rocks Appear',
    quote: "As the water recedes, the hidden rocks appear — truth comes to light.",
    source: "Idiom (水落石出)",
    meaning: "Truth eventually revealed.",
    tags: ["Truth", "Rocks", "Revelation"]
  },
  {
    id: 'w10',
    category: 'world',
    title: 'Dispel Clouds and See Sun',
    quote: "Dispelling the dark clouds to finally see the sun.",
    source: "Idiom (拨云见日)",
    meaning: "Restoring peace after hardship.",
    tags: ["Hope", "Sun", "Hardship"]
  },
  {
    id: 'w11',
    category: 'world',
    title: 'Thunder from Clear Sky',
    quote: "Striking like a sudden bolt of thunder from a clear blue sky!",
    source: "Idiom (晴天霹雳)",
    meaning: "Completely unexpected shock.",
    tags: ["Shock", "Thunder", "Sudden"]
  },
  {
    id: 'w12',
    category: 'world',
    title: 'When Tree Falls, Monkeys Scatter',
    quote: "When the great tree falls, the opportunists scatter like monkeys.",
    source: "Idiom (树倒猢狲散)",
    meaning: "Opportunists abandoning a ruined cause.",
    tags: ["Opportunism", "Scattering", "Tree"]
  },
  {
    id: 'w13',
    category: 'world',
    title: 'Tall Trees Attract Wind',
    quote: "Tall trees attract the fierce wind.",
    source: "Proverb (树大招风)",
    meaning: "Prominence attracts adversity.",
    tags: ["Prominence", "Wind", "Warning"]
  },
  {
    id: 'w14',
    category: 'world',
    title: 'Kite with Cut String',
    quote: "Blown away uncontrollably like a kite with its string cut.",
    source: "Idiom (断线的风筝)",
    meaning: "Gone without recall.",
    tags: ["Kite", "Loss", "Uncontrollable"]
  },
  {
    id: 'w15',
    category: 'world',
    title: 'Clay Ox Entering Sea',
    quote: "Disappearing completely with no hope of return, like a clay ox entering the sea.",
    source: "Idiom (泥牛入海)",
    meaning: "Vanishing without trace.",
    tags: ["Vanishing", "Loss", "Clay Ox"]
  },
  {
    id: 'w16',
    category: 'world',
    title: 'Arrow at End of Flight',
    quote: "A spent force, like an arrow at the very end of its flight.",
    source: "Idiom (强弩之末)",
    meaning: "Waning, nearly exhausted force.",
    tags: ["Exhausted", "Arrow", "Spent"]
  },

  // 14. Danger, Conflict & Scheming
  {
    id: 'd1',
    category: 'danger',
    title: 'Courting Death',
    quote: "You are courting death! You don't know the immensity of heaven and earth!",
    source: "Cultivation Classic Warning (找死)",
    meaning: "Warning against taking fatal risks.",
    tags: ["Warning", "Combat", "Death"]
  },
  {
    id: 'd2',
    category: 'danger',
    title: 'Hovering Between Life and Death',
    quote: "Hovering within an inch of life and death.",
    source: "Idiom (九死一生)",
    meaning: "Surviving extreme peril.",
    tags: ["Peril", "Survival", "Life"]
  },
  {
    id: 'd3',
    category: 'danger',
    title: 'Die a Dog\'s Death',
    quote: "Dying a miserable, dishonorable dog's death in vain.",
    source: "Slang (惨死)",
    meaning: "Dying in vain without glory.",
    tags: ["Death", "Vain", "Miserable"]
  },
  {
    id: 'd4',
    category: 'danger',
    title: 'Mountain of Blades, Sea of Fire',
    quote: "Braving a mountain of blades and a sea of fire without retreating!",
    source: "Wuxia Oath (刀山火海)",
    meaning: "Facing extreme danger.",
    tags: ["Danger", "Bravery", "Oath"]
  },
  {
    id: 'd5',
    category: 'danger',
    title: 'Dragon\'s Pool & Tiger\'s Den',
    quote: "Walking straight into a dragon's pool and tiger's den.",
    source: "Idiom (龙潭虎穴)",
    meaning: "Perilous location.",
    tags: ["Den", "Peril", "Dragon"]
  },
  {
    id: 'd6',
    category: 'danger',
    title: 'Fight Between Dragon and Tiger',
    quote: "A ferocious fight between a dragon and a tiger.",
    source: "Idiom (龙争虎斗)",
    meaning: "Battle between two titans.",
    tags: ["Battle", "Titans", "Tiger"]
  },
  {
    id: 'd7',
    category: 'danger',
    title: 'Swords Drawn, Bows Bent',
    quote: "Hostility with swords drawn and bows bent.",
    source: "Idiom (剑拔弩张)",
    meaning: "Imminent conflict.",
    tags: ["Conflict", "Hostility", "Swords"]
  },
  {
    id: 'd8',
    category: 'danger',
    title: 'Bare Fangs & Brandish Claws',
    quote: "Baring fangs and brandishing claws to intimidate.",
    source: "Idiom (张牙舞爪)",
    meaning: "Threatening gestures.",
    tags: ["Threat", "Intimidation", "Claws"]
  },
  {
    id: 'd9',
    category: 'danger',
    title: 'Impervious to Blades',
    quote: "Invulnerable, impervious to all mortal blades and spears.",
    source: "Cultivation Form (刀枪不入)",
    meaning: "Physical invulnerability.",
    tags: ["Invulnerable", "Form", "Blades"]
  },
  {
    id: 'd10',
    category: 'danger',
    title: 'Pass Like Thunder, Move Like Wind',
    quote: "Passing like thunder and moving like the wind!",
    source: "Idiom (风驰电掣)",
    meaning: "Swift, decisive maneuver.",
    tags: ["Speed", "Thunder", "Wind"]
  },
  {
    id: 'd11',
    category: 'danger',
    title: 'Stake All on One Throw',
    quote: "Staking everything on a single throw of the dice.",
    source: "Idiom (孤注一掷)",
    meaning: "Risking everything in one venture.",
    tags: ["Risk", "Gamble", "Venture"]
  },
  {
    id: 'd12',
    category: 'danger',
    title: 'Throw Oneself Into Net',
    quote: "Willingly throwing oneself into the enemy's net.",
    source: "Idiom (自投罗网)",
    meaning: "Walking into a trap.",
    tags: ["Trap", "Net", "Mistake"]
  },
  {
    id: 'd13',
    category: 'danger',
    title: 'Cannot Live Under Same Sky',
    quote: "Irreconcilable enmity — you and I cannot live under the same sky!",
    source: "Oath (不共戴天)",
    meaning: "Fierce, unyielding blood feud.",
    tags: ["Enmity", "Feud", "Sky"]
  },
  {
    id: 'd14',
    category: 'danger',
    title: 'Fight Poison With Poison',
    quote: "Meeting aggression with aggression — fighting poison with poison.",
    source: "Strategy (以毒攻毒)",
    meaning: "Curing ill with ill.",
    tags: ["Poison", "Aggression", "Strategy"]
  },
  {
    id: 'd15',
    category: 'danger',
    title: 'Beat Grass & Scare Snake',
    quote: "Inadvertently beating the grass and scaring the snake.",
    source: "Strategy (打草惊蛇)",
    meaning: "Alerting enemy accidentally.",
    tags: ["Alert", "Snake", "Caution"]
  },
  {
    id: 'd16',
    category: 'danger',
    title: 'Killing Chicken to Warn Monkey',
    quote: "Killing the chicken to warn the reckless monkey.",
    source: "Strategy (杀鸡儆猴)",
    meaning: "Punishing one to warn others.",
    tags: ["Example", "Warning", "Strategy"]
  },
  {
    id: 'd17',
    category: 'danger',
    title: 'Lure Tiger Away From Mountain',
    quote: "Luring the tiger away from its native mountain.",
    source: "Strategy (调虎离山)",
    meaning: "Luring enemy out of territory.",
    tags: ["Lure", "Territory", "Tiger"]
  },
  {
    id: 'd18',
    category: 'danger',
    title: 'Ride a Tiger, Hard to Dismount',
    quote: "Riding a tiger — once started, it is impossible to dismount halfway.",
    source: "Strategy (骑虎难下)",
    meaning: "Situation difficult to stop.",
    tags: ["Dilemma", "Tiger", "Conflict"]
  },
  {
    id: 'd19',
    category: 'danger',
    title: 'Crouching Tigers, Hidden Dragons',
    quote: "Crouching tigers and hidden dragons concealed among the crowds.",
    source: "Classic Idiom (卧虎藏龙)",
    meaning: "Concealed master talent.",
    tags: ["Hidden", "Master", "Tiger"]
  },
  {
    id: 'd20',
    category: 'danger',
    title: 'Fish Swim With Dragons',
    quote: "A chaotic place where fish swim together with dragons.",
    source: "Idiom (鱼龙混杂)",
    meaning: "Place mixing good and bad.",
    tags: ["Chaos", "Dragons", "Fish"]
  },

  // 15. Opportunism & Greed
  {
    id: 'g1',
    category: 'greed',
    title: 'Add Oil to Fire',
    quote: "Adding oil to an already blazing fire!",
    source: "Idiom (火上浇油)",
    meaning: "Aggravating bad situation.",
    tags: ["Fire", "Aggravate", "Oil"]
  },
  {
    id: 'g2',
    category: 'greed',
    title: 'Loot a Burning House',
    quote: "Looting a burning house while it crumbles.",
    source: "Strategy (趁火打劫)",
    meaning: "Profiting from misfortune.",
    tags: ["Loot", "Misfortune", "Greed"]
  },
  {
    id: 'g3',
    category: 'greed',
    title: 'Fish in Troubled Waters',
    quote: "Fishing in troubled waters to profit from confusion.",
    source: "Strategy (浑水摸鱼)",
    meaning: "Taking advantage of crisis.",
    tags: ["Crisis", "Profit", "Fish"]
  },
  {
    id: 'g4',
    category: 'greed',
    title: 'Throwing Stones Down Well',
    quote: "Throwing heavy stones down a well to crush someone who fell in.",
    source: "Idiom (落井下石)",
    meaning: "Beating someone when down.",
    tags: ["Crush", "Ingratitude", "Well"]
  },
  {
    id: 'g5',
    category: 'greed',
    title: 'Forget Favors, Violate Justice',
    quote: "Forgetting past favors and violating righteousness.",
    source: "Idiom (忘恩负义)",
    meaning: "Ingratitude to benefactor.",
    tags: ["Ingratitude", "Justice", "Betrayal"]
  },
  {
    id: 'g6',
    category: 'greed',
    title: 'Treasuring Jade Ring is Crime',
    quote: "An innocent man becomes a criminal simply by holding a precious jade ring.",
    source: "Idiom (匹夫无罪怀璧其罪)",
    meaning: "Possessing treasure invites greed.",
    tags: ["Treasure", "Greed", "Jade"]
  },
  {
    id: 'g7',
    category: 'greed',
    title: 'Walk Riverside, Shoes Get Wet',
    quote: "If you often walk by the riverside, your shoes will eventually get wet.",
    source: "Proverb (常在河边走哪有不湿鞋)",
    meaning: "Dangerous life has consequences.",
    tags: ["Consequences", "Risk", "Shoes"]
  },
  {
    id: 'g8',
    category: 'greed',
    title: 'Mantis Stalks Cicada, Oriole Behind',
    quote: "The mantis stalks the cicada, unaware of the hungry orioles waiting behind!",
    source: "Idiom (螳螂捕蝉黄雀在后)",
    meaning: "Pursuing small gain while blind to danger.",
    tags: ["Blindness", "Mantis", "Oriole"]
  },
  {
    id: 'g9',
    category: 'greed',
    title: 'Sandpiper & Clam Fight, Fisherman Benefits',
    quote: "When the sandpiper and clam fight, the fisherman reaps the reward.",
    source: "Idiom (鹬蚌相争渔翁得利)",
    meaning: "Third party profiting from conflict.",
    tags: ["Third Party", "Profit", "Conflict"]
  },
  {
    id: 'g10',
    category: 'greed',
    title: 'Fire at City Gates, Fish Suffer',
    quote: "A fire at the city gates brings disaster to the innocent fish in the moat.",
    source: "Idiom (城门失火殃及池鱼)",
    meaning: "Bystanders harmed by conflict.",
    tags: ["Bystanders", "Disaster", "Fish"]
  },
  {
    id: 'g11',
    category: 'greed',
    title: 'Steal Chicken, Lose Bait',
    quote: "Trying to steal a chicken, but losing the handful of grain used as bait.",
    source: "Idiom (偷鸡不成蚀把米)",
    meaning: "Gaining nothing and ending worse.",
    tags: ["Loss", "Greed", "Bait"]
  },
  {
    id: 'g12',
    category: 'greed',
    title: 'Toad Lusting After Swan Flesh',
    quote: "A hideous toad lusting after the tender meat of a soaring swan!",
    source: "Idiom (癞蛤蟆想吃天鹅肉)",
    meaning: "Aspiring for something unworthy of.",
    tags: ["Unworthy", "Toad", "Swan"]
  },
  {
    id: 'g13',
    category: 'greed',
    title: 'Black Belly',
    quote: "Outwardly smiling and kind, but black-bellied and manipulative within.",
    source: "Novel Slang (腹黑)",
    meaning: "Two-faced, scheming character.",
    tags: ["Black Belly", "Scheming", "Two-faced"]
  },

  // 16. Perspective & Limits
  {
    id: 'lim1',
    category: 'limitation',
    title: 'Frog in a Well',
    quote: "A myopic frog viewing the vast sky from the bottom of a narrow well.",
    source: "Idiom (井底之蛙)",
    meaning: "Narrow-minded perspective.",
    tags: ["Frog", "Well", "Myopic"]
  },
  {
    id: 'lim2',
    category: 'limitation',
    title: 'Experts Common as Clouds',
    quote: "Formidable experts standing as common as clouds in the sky!",
    source: "Lore (高手如云)",
    meaning: "Vast number of elite masters.",
    tags: ["Experts", "Clouds", "Masters"]
  },
  {
    id: 'lim3',
    category: 'limitation',
    title: 'Phoenix Feathers & Unicorn Horns',
    quote: "As rare as phoenix feathers and Qilin unicorn horns.",
    source: "Idiom (凤毛麟角)",
    meaning: "Extremely rare, precious things.",
    tags: ["Rare", "Phoenix", "Qilin"]
  },
  {
    id: 'lim4',
    category: 'limitation',
    title: 'Single Hair from Nine Oxen',
    quote: "An insignificant amount — a single hair pulled from nine oxen.",
    source: "Idiom (九牛一毛)",
    meaning: "Insignificant drop in bucket.",
    tags: ["Insignificant", "Oxen", "Drop"]
  },
  {
    id: 'lim5',
    category: 'limitation',
    title: 'Dragon Returning to Sea',
    quote: "Like a dragon returning to the sea — completely in its natural element!",
    source: "Idiom (如鱼得水 / 龙归大海)",
    meaning: "Thriving in proper element.",
    tags: ["Element", "Dragon", "Sea"]
  },

  // 17. Body & Reactions
  {
    id: 'b1',
    category: 'body',
    title: 'Didn\'t Know to Laugh or Cry',
    quote: "Left in an awkward state, not knowing whether to laugh or cry.",
    source: "Idiom (哭笑不得)",
    meaning: "Awkward, humorous dilemma.",
    tags: ["Awkward", "Laugh", "Cry"]
  },
  {
    id: 'b2',
    category: 'body',
    title: 'Coughing Up Blood',
    quote: "Coughing up three mouthfuls of blood from internal backlash and emotional rage!",
    source: "Novel Trope (吐血三升)",
    meaning: "Physical reaction to rage or backlash.",
    tags: ["Blood", "Backlash", "Rage"]
  },
  {
    id: 'b3',
    category: 'body',
    title: 'Blood Flowing in Reverse',
    quote: "Blood flowing in reverse from a devastating cultivation backlash!",
    source: "Cultivation Backlash (气血逆流)",
    meaning: "Severe internal trauma.",
    tags: ["Trauma", "Backlash", "Blood"]
  },
  {
    id: 'b4',
    category: 'body',
    title: 'Injected with Chicken Blood',
    quote: "Energized as if injected with fresh chicken blood!",
    source: "Slang (打鸡血)",
    meaning: "Extreme excitement.",
    tags: ["Excitement", "Slang", "Energy"]
  },
  {
    id: 'b5',
    category: 'body',
    title: 'Gnashing Teeth',
    quote: "Gnashing teeth in intense rage and frustration.",
    source: "Idiom (咬牙切齿)",
    meaning: "Extreme anger.",
    tags: ["Anger", "Teeth", "Rage"]
  },
  {
    id: 'b6',
    category: 'body',
    title: 'Suck in Cold Air',
    quote: "Sucking in a deep breath of cold air in complete shock!",
    source: "Trope (倒吸一口凉气)",
    meaning: "Reaction of shock.",
    tags: ["Shock", "Breath", "Surprise"]
  },
  {
    id: 'b7',
    category: 'body',
    title: 'Flick of a Sleeve',
    quote: "Departing with a grand flick of a long robe sleeve.",
    source: "Trope (甩袖而去)",
    meaning: "Flourish of passion or emphasis.",
    tags: ["Sleeve", "Flourish", "Robe"]
  },
  {
    id: 'b8',
    category: 'body',
    title: 'Intestines Turning Green',
    quote: "Regretting so deeply that one's intestines turn green!",
    source: "Trope (悔得肠子都青了)",
    meaning: "Consumed with utter regret.",
    tags: ["Regret", "Intestines", "Green"]
  },
  {
    id: 'b9',
    category: 'body',
    title: 'Seven Orifices',
    quote: "Bleeding from all seven orifices of the head!",
    source: "Trope (七窍流血)",
    meaning: "Severe head or internal injury.",
    tags: ["Orifices", "Injury", "Head"]
  },
  {
    id: 'b10',
    category: 'body',
    title: 'Five Viscera & Six Bowels',
    quote: "Internal damage to the five viscera and six bowels.",
    source: "TCM Term (五脏六腑)",
    meaning: "Internal organ system.",
    tags: ["Organs", "Viscera", "TCM"]
  },
  {
    id: 'b11',
    category: 'body',
    title: 'Seven Emotions & Six Desires',
    quote: "Bound by the seven human emotions and six worldly desires.",
    source: "Buddhist Term (七情六欲)",
    meaning: "All human desires.",
    tags: ["Emotions", "Desires", "Mortal"]
  },
  {
    id: 'b12',
    category: 'body',
    title: 'Fart / Bullshit',
    quote: "Pure nonsense — nothing but total farting!",
    source: "Slang (放屁)",
    meaning: "Talking nonsense.",
    tags: ["Slang", "Nonsense", "Fart"]
  },
  {
    id: 'b13',
    category: 'body',
    title: 'Wear a Green Hat',
    quote: "Cuckolded in the mortal world.",
    source: "Slang (戴绿帽子)",
    meaning: "Cuckolded by partner.",
    tags: ["Slang", "Hat", "Green"]
  },

  // 18. Beauty & Refinement
  {
    id: 'bt1',
    category: 'beauty',
    title: 'Jade-Like',
    quote: "Refined, flawless, and as smooth as warm, unblemished jade.",
    source: "Descriptor (温润如玉)",
    meaning: "Refined, elegant beauty.",
    tags: ["Jade", "Refined", "Elegant"]
  },
  {
    id: 'bt2',
    category: 'beauty',
    title: 'Clear as Ice, Clean as Jade',
    quote: "Pure and incorruptible — clear as ice and clean as unblemished jade.",
    source: "Idiom (冰清玉洁)",
    meaning: "Spotless, incorruptible purity.",
    tags: ["Purity", "Ice", "Jade"]
  },
  {
    id: 'bt3',
    category: 'beauty',
    title: 'Limpid Autumn Water',
    quote: "Eyes as clear, striking, and deep as limpid autumn waters.",
    source: "Descriptor (秋水盈盈)",
    meaning: "Strikingly beautiful eyes.",
    tags: ["Eyes", "Autumn", "Water"]
  },
  {
    id: 'bt4',
    category: 'beauty',
    title: 'Phoenix Eyes',
    quote: "Striking, beautiful phoenix eyes that pierce the soul.",
    source: "Descriptor (丹凤眼)",
    meaning: "Striking, beautiful eye shape.",
    tags: ["Phoenix", "Eyes", "Beauty"]
  },

  // 19. Martial World / Jianghu
  {
    id: 'j1',
    category: 'jianghu',
    title: 'Cannot Move Freely in Jianghu',
    quote: "When your feet are planted in the Jianghu, even a martial grandmaster cannot act with total freedom.",
    source: "Gu Long Wuxia Classic (人在江湖，身不由己)",
    meaning: "Compromises and unwritten rules of the world.",
    tags: ["Jianghu", "Compromise", "Realism"]
  },
  {
    id: 'j2',
    category: 'jianghu',
    title: 'Teacher for a Day',
    quote: "A mentor for a single day is revered as a father for an entire lifetime.",
    source: "Traditional Wuxia Ethos (一日为师，终身为父)",
    meaning: "Deep reverence for mentorship.",
    tags: ["Mentorship", "Honor", "Respect"]
  },
  {
    id: 'j3',
    category: 'jianghu',
    title: 'Wash Hands in Golden Basin',
    quote: "Washing one's hands in a golden basin to leave the bloodshed of the martial world behind forever.",
    source: "Wuxia Retirement Lore (金盆洗手)",
    meaning: "Retiring from chaos and conflict.",
    tags: ["Retirement", "Peace", "Jianghu"]
  },
  {
    id: 'j4',
    category: 'jianghu',
    title: 'Fly Across Rooftops',
    quote: "Leaping across house ridges and walking across sheer walls with supreme agility.",
    source: "Qinggong Lore (飞檐走壁)",
    meaning: "Superb movement skills of martial artists.",
    tags: ["Qinggong", "Agility", "Rooftops"]
  },
  {
    id: 'j5',
    category: 'jianghu',
    title: 'Wind and Rain',
    quote: "Enduring bitter wind and torrential rain across the martial world.",
    source: "Hardship Lore (风雨飘摇)",
    meaning: "Trials and hardships of life.",
    tags: ["Wind", "Rain", "Hardship"]
  },
  {
    id: 'j6',
    category: 'jianghu',
    title: 'Winds and Waves',
    quote: "Riding the tempestuous winds and breaking through giant waves.",
    source: "Hardship Lore (长风破浪)",
    meaning: "Overcoming tough experiences.",
    tags: ["Waves", "Winds", "Overcoming"]
  }
];

const LOCAL_STORAGE_CUSTOM_KEY = 'custom_wuxia_quotes_v1';

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
    category: newQuote.category || 'philosophy',
    title: newQuote.title || 'User Contributed Saying',
    quote: newQuote.quote,
    source: newQuote.source || 'Reader Contribution',
    meaning: newQuote.meaning || 'User submitted quote',
    tags: newQuote.tags || ['Custom', 'Community'],
    isCustom: true
  };

  try {
    const current = getAllQuotes().filter(q => q.isCustom);
    const updated = [quoteObj, ...current];
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_KEY, JSON.stringify(updated));
  } catch (e) {}

  return quoteObj;
}
