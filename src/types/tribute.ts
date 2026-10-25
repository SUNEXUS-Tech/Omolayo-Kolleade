export interface ImageConfig {
  src: string;
  alt: string;
  focalPoint?: string;
  mobileFocalPoint?: string;
  label: string;
  caption: string;
}

export interface MomentData {
  id: string;
  number: string;
  kicker: string;
  title: string;
  image: ImageConfig;
}

export interface CarePillar {
  trait: string;
  description: string;
}

export interface SongData {
  title: string;
  kicker: string;
  audioFile: string;
  credit: string;
  fullCredit: string;
  dedication: string;
  lyricsSnippet?: string[];
}

export interface LetterData {
  salutation: string;
  paragraphs: string[];
  signOff: string;
  author: string;
  authorTitle: string;
  birthdayWish: string;
}
