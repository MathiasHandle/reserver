import type { eventCategoriesSchema } from '@/model/eventCategories'
import type { eventsSchema } from '@/model/events'

type EventCategory = typeof eventCategoriesSchema.$inferSelect

type Event = Omit<typeof eventsSchema.$inferSelect, 'categoryId'> & {
  // the null is bug in drizzle
  // https://github.com/drizzle-team/drizzle-orm/issues/2157
  eventCategory: EventCategory | null
  participantsCount: number
}

type GetAllEventsQueryParams = {
  limit?: number
  offset?: number
  categoryId?: number
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

export type {
  Event,
  GetAllEventsQueryParams,
  GetAllEventsResponse,
  GetEventCategoriesQueryParams,
  GetEventCategoriesResponse,
  GetEventDetailPathParams,
  GetEventDetailResponse,
}
