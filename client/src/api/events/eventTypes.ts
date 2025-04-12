import { ApiEmptyResponse } from '@/services/fetch'

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
  // sorting by participants count
  sort?: 'asc' | 'desc'
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

type CreateEventRequestBody = {
  name: string
  date: string
  maxCapacity: number
  description: string
  categoryId: number
}

type CreateEventResponse = Event

type GetEventsByUserResponse = {
  events: Event[]
}

type JoinEventPathParams = {
  eventId: number
}

type JoinEventResponse = ApiEmptyResponse

type GetJoinedEventsResponse = {
  events: Event[]
}

export type {
  CreateEventRequestBody,
  CreateEventResponse,
  Event,
  EventCategory,
  EventCategoryWithEventCount,
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
