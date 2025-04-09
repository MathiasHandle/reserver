import { GetEventCategoriesQueryParams } from '@/api/events/eventTypes'

const queryKeys = {
  users: {
    all: () => ['users'] as const,

    userDetail: () => [...queryKeys.users.all(), 'userDetail'] as const,
  },

  events: {
    all: () => ['events'] as const,

    eventList: () => [...queryKeys.events.all(), 'list'] as const,

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
