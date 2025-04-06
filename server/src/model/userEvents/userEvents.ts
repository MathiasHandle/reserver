import { int, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core'
import { eventsSchema } from '../events'
import { usersSchema } from '../users'

const userEvents = sqliteTable(
  'user_events',
  {
    participantId: int('participant_id').references(() => usersSchema.id, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }),
    eventId: int('event_id').references(() => eventsSchema.id, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }),
  },
  table => [primaryKey({ columns: [table.participantId, table.eventId] })]
)

export default userEvents
