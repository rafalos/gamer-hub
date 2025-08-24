CREATE TABLE "platforms" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"games_count" integer,
	"image_background" text,
	"image" text,
	"year_start" integer,
	"year_end" integer
);
