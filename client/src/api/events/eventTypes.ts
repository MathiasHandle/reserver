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
  maxCapacity: number
  description: string
  eventCategory: EventCategory
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

export type {
  Event,
  EventCategoryWithEventCount,
  GetAllEventsQueryParams,
  GetAllEventsResponse,
  GetEventCategoriesQueryParams,
  GetEventCategoriesResponse,
}
