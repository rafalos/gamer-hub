CREATE TABLE "wishlisted_games" (
	"game_id" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "wishlisted_games" ADD CONSTRAINT "wishlisted_games_game_id_games_rawg_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("rawg_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlisted_games" ADD CONSTRAINT "wishlisted_games_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;