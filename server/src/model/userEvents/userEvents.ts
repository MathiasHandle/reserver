import { int } from 'drizzle-orm/sqlite-core'
import { sqliteTable, primaryKey } from 'drizzle-orm/sqlite-core'
import { usersSchema } from '../users'
import { eventsSchema } from '../events'

const userEvents = sqliteTable(
  'user_events',
  {
    participantId: int('participant_id').references(() => usersSchema.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
    eventId: int('event_id').references(() => eventsSchema.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.eventId, table.eventId] }),
    }
  }
)

export default userEvents
