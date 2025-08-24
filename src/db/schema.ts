import { relations } from 'drizzle-orm';
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text('image'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp('updated_at').$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const genres = pgTable('genres', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
});

export const genresRelations = relations(genres, ({ many }) => ({
  gamesToGenres: many(gamesToGenres),
}));

export const platforms = pgTable('platforms', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  games_count: integer('games_count'),
  image_background: text('image_background'),
  image: text('image'),
  year_start: integer('year_start'),
  year_end: integer('year_end'),
});

export const platformsRelations = relations(platforms, ({ many }) => ({
  gamesToPlatforms: many(gamesToPlatforms),
}));

export const games = pgTable('games', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  metacritic_score: text('metacritic_score'),
  released: text('released'),
  background_image: text('background_image'),
});

export const gamesRelations = relations(games, ({ many }) => ({
  gamesToPlatforms: many(gamesToPlatforms),
  gamesToGenres: many(gamesToGenres),
}));

export const gamesToPlatforms = pgTable('games_to_platforms', {
  game_id: text('id')
    .notNull()
    .references(() => games.id),
  platform_id: text('id')
    .notNull()
    .references(() => platforms.id),
});

export const gamesToPlatformsRelations = relations(
  gamesToPlatforms,
  ({ one }) => ({
    game: one(games, {
      fields: [gamesToPlatforms.game_id],
      references: [games.id],
    }),
    platform: one(platforms, {
      fields: [gamesToPlatforms.platform_id],
      references: [platforms.id],
    }),
  })
);

export const gamesToGenres = pgTable('games_to_genres', {
  game_id: text('id')
    .notNull()
    .references(() => games.id),
  genre_id: text('id')
    .notNull()
    .references(() => genres.id),
});

export const gamesToGenresRelations = relations(gamesToGenres, ({ one }) => ({
  game: one(games, {
    fields: [gamesToGenres.game_id],
    references: [games.id],
  }),
  platform: one(genres, {
    fields: [gamesToGenres.genre_id],
    references: [genres.id],
  }),
}));
