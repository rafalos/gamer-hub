ALTER TABLE "games_to_genres" RENAME COLUMN "id" TO "game_id";--> statement-breakpoint
ALTER TABLE "games_to_platforms" RENAME COLUMN "id" TO "game_id";--> statement-breakpoint
ALTER TABLE "games_to_genres" DROP CONSTRAINT "games_to_genres_id_games_rawg_id_fk";
--> statement-breakpoint
ALTER TABLE "games_to_genres" DROP CONSTRAINT "games_to_genres_id_genres_id_fk";
--> statement-breakpoint
ALTER TABLE "games_to_platforms" DROP CONSTRAINT "games_to_platforms_id_games_rawg_id_fk";
--> statement-breakpoint
ALTER TABLE "games_to_platforms" DROP CONSTRAINT "games_to_platforms_id_platforms_id_fk";
--> statement-breakpoint
ALTER TABLE "games_to_genres" ADD COLUMN "genre_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "games_to_platforms" ADD COLUMN "platform_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "games_to_genres" ADD CONSTRAINT "games_to_genres_game_id_games_rawg_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("rawg_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games_to_genres" ADD CONSTRAINT "games_to_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games_to_platforms" ADD CONSTRAINT "games_to_platforms_game_id_games_rawg_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("rawg_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games_to_platforms" ADD CONSTRAINT "games_to_platforms_platform_id_platforms_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."platforms"("id") ON DELETE no action ON UPDATE no action;