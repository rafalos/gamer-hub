import { user, session } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export type Game = {
  id: number;
  name: string;
  description: string | null;
  metacritic_score: number | null;
  released: string | null;
  background_image: string | null;
  rawg_id: string;
};

export type Screenshot = {
  id: number;
  url: string;
  width: number | null;
  height: number | null;
};

export type User = InferSelectModel<typeof user>;
export type Session = InferSelectModel<typeof session>;
