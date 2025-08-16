import { games } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Game = InferSelectModel<typeof games>
