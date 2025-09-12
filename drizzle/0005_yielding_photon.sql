CREATE TABLE "screenshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"width" integer,
	"height" integer,
	"game_id" integer NOT NULL,
	CONSTRAINT "screenshots_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "screenshots" ADD CONSTRAINT "screenshots_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;