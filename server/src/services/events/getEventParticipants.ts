import { userEventsSchema } from '@/model/userEvents'
import { usersSchema } from '@/model/users'
import { eq, getTableColumns } from 'drizzle-orm'
import { db } from '../database'
import getEventByIdOrThrow from './getEventByIdOrThrow'

async function getEventParticipants(eventId: number) {
  // Check if event exists
  await getEventByIdOrThrow(eventId)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...usersColumns } = getTableColumns(usersSchema)

  const attendees = await db
    .select({
      ...usersColumns,
    })
    .from(userEventsSchema)
    .leftJoin(usersSchema, eq(userEventsSchema.participantId, usersColumns.id))
    .where(eq(userEventsSchema.eventId, eventId))

  return attendees
}

export default getEventParticipants
