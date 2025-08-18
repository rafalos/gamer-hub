export interface GamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string | null;
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
  platform: Platform;
  released_at: string | null;
  requirements: PlatformRequirements | null;
}

export interface Platform {
  id: number;
  slug: string;
  name: string;
}

export interface PlatformRequirements {
  minimum: string | null;
  recommended: string | null;
}
