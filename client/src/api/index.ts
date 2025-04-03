import createUser from './users/createUser'
import getAllUsers from './users/getAllUsers'
import loginUser from './users/loginUser'

const api = {
  users: {
    getAllUsers,
    createUser,
    loginUser,
  },
}

export { api }
