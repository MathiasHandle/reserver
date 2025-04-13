import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { eventCategoriesSchema } from '../eventCategories'
import { usersSchema } from '../users'

const eventsSchema = sqliteTable('events', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  date: text('date').notNull(),
  maxCapacity: int('max_capacity').notNull(),
  hostId: int('host_id')
    .references(() => usersSchema.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  categoryId: int('category_id').references(() => eventCategoriesSchema.id),
  description: text('description').notNull(),
})

type Event = typeof eventsSchema.$inferSelect
type EventsInsert = typeof eventsSchema.$inferInsert

export default eventsSchema

export type { Event, EventsInsert }
