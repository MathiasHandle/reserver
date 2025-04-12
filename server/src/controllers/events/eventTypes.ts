import type { eventCategoriesSchema } from '@/model/eventCategories'
import type { EventsInsert, eventsSchema } from '@/model/events'
import type { APIEmptyResponse } from '@/types/sharedTypes'

type EventCategory = typeof eventCategoriesSchema.$inferSelect

type Event = Omit<typeof eventsSchema.$inferSelect, 'categoryId'> & {
  // the null is bug in drizzle
  // https://github.com/drizzle-team/drizzle-orm/issues/2157
  eventCategory: EventCategory | null
  participantsCount: number
}

type EventInsert = typeof eventsSchema.$inferInsert

type GetAllEventsQueryParams = {
  limit?: number
  offset?: number
  categoryId?: number
  sort?: 'asc' | 'desc'
}

type GetAllEventsResponse = {
  events: Event[]
}

type GetEventCategoriesQueryParams = {
  sort?: 'asc' | 'desc'
  limit?: number
}

type EventCategoryWithEventCount = EventCategory & {
  eventCount: number
}

type GetEventCategoriesResponse = {
  categories: EventCategoryWithEventCount[]
}

type GetEventDetailPathParams = {
  eventId: number
}

type GetEventDetailResponse = {
  event: Event
}

type CreateEventRequest = Omit<EventsInsert, 'categoryId'> & {
  categoryId: number
}

type CreateEventResponse = {
  event: Event
}

type GetEventsByUserResponse = {
  events: Event[]
}

type JoinEventPathParams = {
  eventId: string
}

type JoinEventResponse = APIEmptyResponse

type GetJoinedEventsResponse = {
  events: Event[]
}

type EditEventPathParams = {
  eventId: string
}

type EditEventRequest = Omit<EventInsert, 'hostId' | 'id' | 'categoryId'> & {
  id: number
  categoryId: number
}

export type {
  CreateEventRequest,
  CreateEventResponse,
  EditEventPathParams,
  EditEventRequest,
  Event,
  GetAllEventsQueryParams,
  GetAllEventsResponse,
  GetEventCategoriesQueryParams,
  GetEventCategoriesResponse,
  GetEventDetailPathParams,
  GetEventDetailResponse,
  GetEventsByUserResponse,
  GetJoinedEventsResponse,
  JoinEventPathParams,
  JoinEventResponse,
}
