import createEvent from './events/createEvent'
import getEventCategories from './events/getEventCategories'
import getAllEvents from './events/getEvents'
import getUserCreatedEvents from './events/getUserCreatedEvents'
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
  events: {
    getAllEvents,
    getEventCategories,
    createEvent,
    getUserCreatedEvents,
  },
}

export { api }
