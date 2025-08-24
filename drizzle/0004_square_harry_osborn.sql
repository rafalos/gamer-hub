CREATE TABLE "games_to_genres" (
	"id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "games_to_platforms" (
	"id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "games_to_genres" ADD CONSTRAINT "games_to_genres_id_games_id_fk" FOREIGN KEY ("id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games_to_genres" ADD CONSTRAINT "games_to_genres_id_genres_id_fk" FOREIGN KEY ("id") REFERENCES "public"."genres"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games_to_platforms" ADD CONSTRAINT "games_to_platforms_id_games_id_fk" FOREIGN KEY ("id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games_to_platforms" ADD CONSTRAINT "games_to_platforms_id_platforms_id_fk" FOREIGN KEY ("id") REFERENCES "public"."platforms"("id") ON DELETE no action ON UPDATE no action;