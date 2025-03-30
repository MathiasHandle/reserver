import createUser from './users/createUser'
import getAllUsers from './users/getAllUsers'

const api = {
  users: {
    getAllUsers,
    createUser,
  },
}

export { api }
