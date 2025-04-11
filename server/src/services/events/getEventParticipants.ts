import httpCodes from '@/constants/httpCodes'
import { userEventsSchema } from '@/model/userEvents'
import { usersSchema } from '@/model/users'
import { eq, getTableColumns } from 'drizzle-orm'
import { db } from '../database'
import { NotFoundError } from '../error'
import getEventById from './getEventById'

async function getEventParticipants(eventId: number) {
  try {
    const event = await getEventById(eventId)
    if (!event) {
      throw new NotFoundError({
        detail: null,
        message: 'Event not found',
        status: httpCodes.UNPROCESSABLE_ENTITY,
      })
    }

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
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err
    }

    console.log('getEventParticipants: ', err)
    throw err
  }
}

export default getEventParticipants
