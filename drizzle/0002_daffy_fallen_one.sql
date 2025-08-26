CREATE TABLE "games_to_users" (
	"game_id" integer NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "games_to_users_game_id_user_id_pk" PRIMARY KEY("game_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "games_to_users" ADD CONSTRAINT "games_to_users_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games_to_users" ADD CONSTRAINT "games_to_users_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;