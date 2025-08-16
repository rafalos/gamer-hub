import { relations } from 'drizzle-orm';
import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({
    length: 20,
  }).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToGames: many(usersToGames),
}));

export const games = pgTable('games', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  genre: varchar().notNull(),
  platform: varchar().notNull(),
  description: varchar().notNull(),
});

export const gamesRelations = relations(games, ({ many }) => ({
  usersToGames: many(usersToGames),
}));

export const usersToGames = pgTable(
  'users_to_games',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    gameId: integer('game_id')
      .notNull()
      .references(() => games.id),
  },
  (t) => [primaryKey({ columns: [t.userId, t.gameId] })]
);

export const usersToGamesRelations = relations(usersToGames, ({ one }) => ({
  game: one(games, {
    fields: [usersToGames.gameId],
    references: [games.id],
  }),
  user: one(users, {
    fields: [usersToGames.userId],
    references: [users.id],
  }),
}));
