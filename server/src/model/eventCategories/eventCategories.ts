import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const eventNames = [
  'art',
  'culinary',
  'music',
  'outdoors',
  'sports',
  'technology',
  'webinar',
  'workshop',
  'other',
] as const

const eventCategoriesSchema = sqliteTable('event_categories', {
  // FIXME add notNull to id
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name', { enum: eventNames }).notNull(),
})

type EventCategory = typeof eventCategoriesSchema.$inferSelect
type EventCategoryInsert = typeof eventCategoriesSchema.$inferInsert
type EventName = (typeof eventNames)[number]

export default eventCategoriesSchema

export type { EventCategory, EventCategoryInsert, EventName }
