type EventCategory = {
  id: number
  name:
    | 'art'
    | 'culinary'
    | 'music'
    | 'outdoors'
    | 'sports'
    | 'technology'
    | 'webinar'
    | 'workshop'
    | 'other'
}

type Event = {
  id: number
  name: string
  date: string
  hostId: number
  maxCapacity: number
  description: string
  eventCategory: EventCategory
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

type EventCategoryWithEventCount = EventCategory & {
  eventCount: number
}

type GetEventCategoriesQueryParams = {
  sort?: 'asc' | 'desc'
  // negative number is used to get all categories
  limit?: number
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
  EventCategoryWithEventCount,
  GetAllEventsQueryParams,
  GetAllEventsResponse,
  GetEventCategoriesQueryParams,
  GetEventCategoriesResponse,
  GetEventDetailPathParams,
  GetEventDetailResponse,
}
