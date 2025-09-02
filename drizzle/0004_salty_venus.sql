DROP INDEX "rawg_id_idx";--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "rawg_id" SET NOT NULL;