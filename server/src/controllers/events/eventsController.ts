import httpCodes from '@/constants/httpCodes'
import { eventsSchema } from '@/model/events'
import type { Event, EventsInsert } from '@/model/events'
import { getAllEvents, getEventById } from '@/services/events'
import { createInsertSchema } from 'drizzle-zod'
import { Request, Response } from 'express'

type GetAllEventsResponse = {
  events: Event[]
}

type ErrorResponse = {
  message: string
}

async function handleGetAllEvents(_: Request, res: Response<GetAllEventsResponse | ErrorResponse>) {
  try {
    const events = await getAllEvents()

    res.status(httpCodes.OK).json({ events })
  } catch (err) {
    console.log(err)
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

type GetEventPathParams = {
  eventId: string
}

type GetEventByIdResponse = {
  event: Event
}

async function handleGetEventById(
  req: Request<GetEventPathParams>,
  res: Response<GetEventByIdResponse | ErrorResponse>
) {
  try {
    const eventId = parseInt(req.params.eventId)
    const eventData = await getEventById(eventId)

    res.status(httpCodes.OK).json({ event: eventData })
  } catch (err) {
    console.log(err)
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

export default {
  handleGetAllEvents,
  handleGetEventById,
}
