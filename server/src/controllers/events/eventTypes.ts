import type { eventCategoriesSchema } from '@/model/eventCategories'
import type { eventsSchema } from '@/model/events'

type EventCategory = typeof eventCategoriesSchema.$inferSelect

type EventWithCategory = Omit<typeof eventsSchema.$inferSelect, 'categoryId' | 'hostId'> & {
  // the null is bug in drizzle
  // https://github.com/drizzle-team/drizzle-orm/issues/2157
  eventCategory: EventCategory | null
}

type GetAllEventsQueryParams = {
  limit?: number
  offset?: number
  categoryId?: number
}

type GetAllEventsResponse = {
  events: EventWithCategory[]
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
  event: EventWithCategory
}

export type {
  EventWithCategory,
  GetAllEventsQueryParams,
  GetAllEventsResponse,
  GetEventCategoriesQueryParams,
  GetEventCategoriesResponse,
  GetEventDetailPathParams,
  GetEventDetailResponse,
}
