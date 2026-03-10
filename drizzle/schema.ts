import { boolean, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const EventTable = pgTable(
    "event",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        name: text("name").notNull(),
        description: text("description"),
        durationInMinutes: integer("duration_in_minutes").notNull(),
        clerkUserId: text("clerk_user_id").notNull(),
        isActive: boolean("is_active").notNull().default(true),
        createdAt: text("created_at").notNull().default(new Date().toISOString()),
        updatedAt: text("updated_at").notNull().default(new Date().toISOString())
    }
);