// components/types.ts
export type AnimeTitle = {
  romaji: string;
  english: string;
  native: string;
};

export type CoverImage = {
  large: string;
  medium: string;
};

export type Anime = {
  id: number;
  title: AnimeTitle;
  coverImage: CoverImage;
};
