import createEvent from './events/createEvent'
import getEventCategories from './events/getEventCategories'
import getAllEvents from './events/getEvents'
import getJoinedEvents from './events/getJoinedEvents'
import getUserCreatedEvents from './events/getUserCreatedEvents'
import joinEvent from './events/joinEvent'
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
    joinEvent,
    getJoinedEvents,
  },
}

export { api }
