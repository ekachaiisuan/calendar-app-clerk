import { DAY_OF_WEEK_IN_ORDER } from '@/constants';
import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const EventTable = pgTable(
  'event',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description'),
    durationInMinutes: integer('duration_in_minutes').notNull(),
    clerkUserId: text('clerk_user_id').notNull(),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('clerkUserIdIndex').on(table.clerkUserId)],
);

export const ScheduleTable = pgTable('schedules', {
  id: uuid('id').primaryKey().defaultRandom(),
  timezone: text('timezone').notNull(),
  clerkUserId: text('clerk_user_id').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const scheduleDayofWeekEnum = pgEnum('day',DAY_OF_WEEK_IN_ORDER);

export const ScheduleAvailabilityTable = pgTable(
  'scheduleAvailability',{
    id: uuid('id').primaryKey().defaultRandom(),
    scheduleId: uuid('scheduleId').notNull().references(() => ScheduleTable.id,{onDelete:"cascade"}),
    startTime: text('start_time').notNull(),
    endTime: text('end_time').notNull(),
    dayOfWeek: scheduleDayofWeekEnum('dayOfWeek').notNull(),
  },
  table => [index('scheduleIdIndex').on(table.scheduleId)]
)

export const scheduleRelations = relations(ScheduleTable, ({ many }) => ({
 availabilities: many(ScheduleAvailabilityTable),
}));

export const ScheduleAvailabilityRelations = relations(
  ScheduleAvailabilityTable,
  ({ one }) => ({
    schedule: one(ScheduleTable, {
      fields: [ScheduleAvailabilityTable.scheduleId],
      references: [ScheduleTable.id],
    }),
  }),
);