const queryKeys = {
  users: {
    all: () => ['users'] as const,

    userDetail: () => [...queryKeys.users.all(), 'userDetail'] as const,
  },
}

export default queryKeys
