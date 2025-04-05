import createUser from './users/createUser'
import getAllUsers from './users/getAllUsers'
import getUser from './users/getUser'
import loginUser from './users/loginUser'
import logoutUser from './users/logoutUser'

const api = {
  users: {
    getAllUsers,
    createUser,
    loginUser,
    getUser,
    logoutUser,
  },
}

export { api }
