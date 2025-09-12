export interface RawgResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type GamesResponse = RawgResponse<Game>;
export type PlatformResponse = RawgResponse<Platform>;
export type GenresResponse = RawgResponse<Genre>;
export type ScreenshotsResponse = RawgResponse<Screenshot>;

export interface Screenshot {
  id: number;
  image: string;
  width: number;
  height: number;
  is_deleted: boolean;
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  description: string;
  tba: boolean;
  background_image: string | null;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: string | null;
  added: number;
  added_by_status: Record<string, number>;
  metacritic: number | null;
  playtime: number;
  suggestions_count: number;
  updated: string;
  esrb_rating: EsrbRating | null;
  platforms: PlatformEntry[];
  genres: Genre[];
}

export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface EsrbRating {
  id: number;
  slug: string;
  name: string;
}

export interface PlatformEntry {
  platform: GamePlatform;
  released_at: string | null;
  requirements: PlatformRequirements | null;
}

export interface GamePlatform {
  id: number;
  slug: string;
  name: string;
}

export interface PlatformRequirements {
  minimum: string | null;
  recommended: string | null;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
  year_start?: number | null;
  year_end?: number | null;
  games_count?: number | null;
  released_at?: string | null;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
