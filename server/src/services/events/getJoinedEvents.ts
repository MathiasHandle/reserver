import type { Event } from '@/controllers/events/eventTypes'
import { eventCategoriesSchema } from '@/model/eventCategories'
import { eventsSchema } from '@/model/events'
import { userEventsSchema } from '@/model/userEvents'
import { usersSchema } from '@/model/users'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from '../database'

async function getJoinedEvents(userId: number): Promise<Event[] | undefined> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categoryId, ...event } = getTableColumns(eventsSchema)
    const eventCategory = getTableColumns(eventCategoriesSchema)

    const events = await db
      .select({
        ...event,
        eventCategory,
        participantsCount: sql<number>`(
          SELECT COUNT(*) FROM ${userEventsSchema}
          WHERE ${userEventsSchema.eventId} = ${eventsSchema.id}
        )`.as('participantsCount'),
      })
      .from(userEventsSchema)
      .leftJoin(usersSchema, eq(usersSchema.id, userEventsSchema.participantId))
      .leftJoin(eventsSchema, eq(eventsSchema.id, userEventsSchema.eventId))
      .leftJoin(eventCategoriesSchema, eq(eventCategoriesSchema.id, eventsSchema.categoryId))
      .where(eq(usersSchema.id, userId))

    // FIXME find out why its infering properties as nullable
    //@ts-expect-error fix this later
    return events
  } catch (err) {
    console.log('getJoinedEvents: ', err)
    throw err
  }
}

/* 
SELECT
  *
FROM
  user_events
  LEFT JOIN users ON users.id = user_events.participant_id
  LEFT JOIN events ON events.id = user_events.event_id
  LEFT JOIN event_categories ON event_categories.id = events.category_id
WHERE
  users.id = 2;
*/

export default getJoinedEvents
