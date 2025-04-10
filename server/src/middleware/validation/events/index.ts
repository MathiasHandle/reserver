import validateCreateEvent from './validateCreateEvent'
import validateGetAllEvents from './validateGetAllEvents'
import validateGetEventDetail from './validateGetEventDetail'
import validateGetEventCategories from './validateGetEventsCategories'

const eventsValidator = {
  validateGetAllEvents,
  validateGetEventCategories,
  validateGetEventDetail,
  validateCreateEvent,
}

export default eventsValidator
