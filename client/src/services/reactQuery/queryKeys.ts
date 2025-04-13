import { GetAllEventsQueryParams, GetEventCategoriesQueryParams } from '@/api/events/eventTypes'

const queryKeys = {
  users: {
    all: () => ['users'] as const,

    userDetail: () => [...queryKeys.users.all(), 'userDetail'] as const,
  },

  events: {
    all: () => ['events'] as const,

    // All event lists + filters
    eventList: () => [...queryKeys.events.all(), 'list'] as const,
    eventListWithParams: (options?: GetAllEventsQueryParams) =>
      [...queryKeys.events.eventList(), options] as const,

    // All events that are related to the user
    myEvents: () => [...queryKeys.events.all(), 'my'] as const,
    userCreatedEvents: () => [...queryKeys.events.myEvents(), 'my-created'] as const,
    joinedEvents: () => [...queryKeys.events.myEvents(), 'my-joined'] as const,

    eventDetail: (eventId: number) => [...queryKeys.events.all(), 'detail', eventId] as const,

    eventCategories: (options?: GetEventCategoriesQueryParams) =>
      [
        ...queryKeys.events.all(),
        'categories',
        ...(options?.limit ? [{ limit: options.limit }] : []),
        ...(options?.sort ? [{ sort: options.sort }] : []),
      ] as const,
  },
}

export default queryKeys
