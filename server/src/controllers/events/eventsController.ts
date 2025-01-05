import httpCodes from '@/constants/httpCodes'
import type { Event } from '@/model/events'
import { getAllEvents, getEventById } from '@/services/events'
import type { Request, Response } from 'express'

type GetAllEventsResponse = {
  events: Event[]
}

type ErrorResponse = {
  message: string
}

async function handleGetAllEvents(_: Request, res: Response<GetAllEventsResponse | ErrorResponse>) {
  try {
    const events = await getAllEvents()

    res.status(httpCodes.OK).json({ events: events ?? [] })
  } catch (err) {
    console.log(err)
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

type GetEventPathParams = {
  eventId: string
}

type GetEventByIdResponse = {
  event: Event | null
}

async function handleGetEventById(
  req: Request<GetEventPathParams>,
  res: Response<GetEventByIdResponse | ErrorResponse>
) {
  try {
    const eventId = parseInt(req.params.eventId)
    const eventData = await getEventById(eventId)

    res.status(httpCodes.OK).json({ event: eventData ?? null })
  } catch (err) {
    console.log(err)
    res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

export default {
  handleGetAllEvents,
  handleGetEventById,
}
