import { int, text } from 'drizzle-orm/sqlite-core'
import { sqliteTable } from 'drizzle-orm/sqlite-core'
import { usersSchema } from '../users'

const eventsSchema = sqliteTable('events', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  date: text('date').notNull(),
  maxCapacity: int('max_capacity').notNull(),
  hostId: int('host_id').references(() => usersSchema.id),
})

type Event = typeof eventsSchema.$inferSelect
type EventsInsert = typeof eventsSchema.$inferInsert

export default eventsSchema

export type { Event, EventsInsert }
