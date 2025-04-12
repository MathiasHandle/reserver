import validateCreateEvent from './validateCreateEvent'
import validateEditEvent from './validateEditEvent'
import validateEventIdInPath from './validateEventIdInPath'
import validateGetAllEvents from './validateGetAllEvents'
import validateGetEventDetail from './validateGetEventDetail'
import validateGetEventCategories from './validateGetEventsCategories'
import validateJoinEvent from './validateJoinEvent'

const eventsValidator = {
  validateGetAllEvents,
  validateGetEventCategories,
  validateGetEventDetail,
  validateCreateEvent,
  validateEventIdInPath,
  validateJoinEvent,
  validateEditEvent,
}

export default eventsValidator
