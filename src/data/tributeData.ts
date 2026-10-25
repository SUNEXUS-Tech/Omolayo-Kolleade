import { CarePillar, ImageConfig, LetterData, SongData } from '../types/tribute';

export const SITE_METADATA = {
  title: 'Omolayo Kolleade: A Legacy of Love',
  honoree: 'Omolayo Kolleade Adesola',
  nickname: 'Big Mummy',
  creator: 'Uthman Adesola',
  creatorRole: 'Creative Director SUNEXUS',
  songCredit: 'Music by SUNEXUS, made with SUNO',
  fullCredit: 'Created with love by Uthman Adesola, Creative Director SUNEXUS',
  dedicationIntro: 'A webpage developed by Uthman Adesola to wish Omolayo Kolleade a HAPPY BIRTHDAY.',
};

export const IMAGES: Record<string, ImageConfig> = {
  opening: {
    src: '/assets/aistudio/Opening_2caa6ffc.webp',
    alt: 'Photograph 01 — Dignified portrait of Omolayo Kolleade Adesola (Big Mummy) in an elegant textured patterned jacket and sunglasses',
    focalPoint: '50% 20%',
    mobileFocalPoint: '50% 15%',
    label: 'Photograph 01 · Opening',
    caption: 'Quiet confidence, maternal dignity, and the timeless presence of Big Mummy.',
  },
  identity: {
    src: '/assets/aistudio/Identity_2ece2015.webp',
    alt: 'Photograph 02 — Serene, regal portrait of Big Mummy in an emerald green sequined dress with ornate gold leaf necklace',
    focalPoint: '50% 25%',
    mobileFocalPoint: '50% 20%',
    label: 'Photograph 02 · Identity',
    caption: 'Living the true family meaning of Omolayo — peace, elegance, and deep inner joy.',
  },
  care: {
    src: '/assets/aistudio/care_6782e707.webp',
    alt: 'Photograph 03 — Big Mummy smiling warmly in a golden-green floral peplum attire with gold clutch and necklace',
    focalPoint: '50% 18%',
    mobileFocalPoint: '50% 15%',
    label: 'Photograph 03 · Care',
    caption: 'Hands that heal and a heart that holds the family together in steady devotion.',
  },
  roots: {
    src: '/assets/aistudio/roots_28640720.webp',
    alt: 'Photograph 04 — Big Mummy in a chic black and crystal evening gown with silver medallion necklace and clutch',
    focalPoint: '50% 20%',
    mobileFocalPoint: '50% 15%',
    label: 'Photograph 04 · Roots',
    caption: 'Rooted in heritage as the daughter of Olumini Adesola — building a home of crown.',
  },
  olumini: {
    src: '/assets/aistudio/Olumini_daf45d9e.webp',
    alt: 'Photograph 05 — Official cover art for the birthday anthem OLUMINI: Omolayo Kolleade, presented by SUNEXUS and Uthman Adesola',
    focalPoint: '50% 25%',
    mobileFocalPoint: '50% 20%',
    label: 'Photograph 05 · Song Anchor',
    caption: 'The official cover for the commemorative birthday anthem OLUMINI.',
  },
  letter: {
    src: '/assets/aistudio/letter_658a06b2.webp',
    alt: 'Photograph 06 — Radiant portrait of Big Mummy smiling in a royal purple headpiece and gold-trimmed lavender gown',
    focalPoint: '50% 18%',
    mobileFocalPoint: '50% 15%',
    label: 'Photograph 06 · Nephew’s Letter',
    caption: 'A radiant smile for a blessed milestone — forever honored and deeply loved.',
  },
};

export const CARE_PILLARS: CarePillar[] = [
  {
    trait: 'Caring & Compassionate',
    description:
      'Approaching every human encounter with intuitive empathy, patience, and an open heart that comforts distress without hesitation.',
  },
  {
    trait: 'Loving & Maternal',
    description:
      'A boundless sanctuary of warmth for children, siblings, and extended kin alike, greeting everyone with unconditional love.',
  },
  {
    trait: 'Industrious & Resilient',
    description:
      'Steadfast dedication and quiet discipline in both healthcare and household, pursuing excellence without seeking the spotlight.',
  },
  {
    trait: 'Virtuous & Faithful',
    description:
      'Grounded in steadfast moral integrity, prayerful wisdom, and timeless principles that inspire generation after generation.',
  },
  {
    trait: 'Family Pillar',
    description:
      'A constant source of encouragement and practical support across decades, keeping relatives united through every transition.',
  },
];

export const SONG_DATA: SongData = {
  title: 'OLUMINI',
  kicker: 'The Birthday Tribute Song',
  audioFile: '/assets/aistudio/OLUMINI_f6b974fa.mp3',
  credit: 'Music by SUNEXUS, made with SUNO',
  fullCredit: 'Music by SUNEXUS, made with SUNO',
  dedication:
    'Specially composed in honor of Big Mummy’s birthday, celebrating her roots as the daughter of Olumini Adesola, her selfless heart as a caring nurse, and the joy she radiates across the family.',
  lyricsSnippet: [
    "Today na celebration, everybody come around, it's Big Mummy's day!",
    "From the house of Olumini, we have a special woman to celebrate — Omolayo Kolleade",
    "Daughter of Olumini, carrying love and dignity",
    "Omolayo your name says joy, and today na your joy we come enjoy",
    "A caring nurse with a heart that gives, touching lives through the work she lives",
    "A woman of purpose, a woman of grace, bringing warmth and kindness into every space",
    "Kolleade... with a crown in the story, a home built with love, a life filled with glory!",
  ],
};

export const LETTER_DATA: LetterData = {
  salutation: 'To my dearest Big Mummy,',
  paragraphs: [
    'On this special birthday, words struggle to encompass the depth of gratitude and admiration I carry for you. You have not just been an aunt to me; you have been a pillar of unshakeable strength, maternal warmth, and moral clarity.',
    'Your life as a registered nurse and as the heart of our family reflects a calling far beyond duty — it is love made visible. Every sacrifice, every quiet prayer, every word of encouragement has left an indelible mark on my life and on everyone who knows you.',
    'You wear the name Omolayo with divine elegance. In you, joy is never temporary or conditional; it is a steady beacon that lifts every burden and brightens every room. And in the proud lineage of Olumini Adesola, you carry our heritage with profound grace and dignity.',
    'Thank you for teaching us by example what it means to be industrious, kind, virtuous, and fiercely supportive of family. May this milestone birthday shower you with the same boundless peace, laughter, radiant health, and celebration you have given so freely to us all.',
  ],
  signOff: 'With endless love, deepest honor, and eternal admiration,',
  author: 'Uthman Adesola',
  authorTitle: 'Creative Director SUNEXUS',
  birthdayWish: 'Happy Birthday, Big Mummy! May your legacy of love continue to flourish across generations.',
};

export const NAV_ITEMS = [
  { id: 'opening', label: 'Legacy of Love' },
  { id: 'identity', label: 'Meaning of Joy' },
  { id: 'care', label: 'A Life of Care' },
  { id: 'roots', label: 'Roots & Lineage' },
  { id: 'song', label: 'OLUMINI Track' },
  { id: 'letter', label: 'Letter from Uthman' },
];
