import * as Types from './actionTypes'
import EventService from '../services/EventService'

export const saveAllEvents = (events) => ({
  type: Types.SAVE_EVENTS,
  events: events
})

export const addCreatedEvent = (event) => ({
  type: Types.ADD_EVENT,
  event
})

export const openNewEventModal = () => ({
  type: Types.OPEN_NEW_EVENT_MODAL
})

export const closeNewEventModal = () => ({
  type: Types.CLOSE_NEW_EVENT_MODAL
})

export const fetchEventsFor = (userId, token) => (
  async function (dispatch) {
    const service = new EventService(userId, token, 'http://localhost:3000')
    try {
      const events = await service.fetchAllEvents()
      dispatch(saveAllEvents(events))
    } catch (e) {
      console.log(e)
    }
  }
)

export const createNewEventFor = (userId, token, event) => console.log('in here') ||
  async function (dispatch) {
    const service = new EventService(userId, token, 'http://localhost:3000')
    const createdEvent = await service.createNewEvent(event)
    dispatch(addCreatedEvent(createdEvent))
  }

export const updateYelpItems = (items) => ({
  type: Types.UPDATE_YELP_ITEMS,
  yelpItems: items
})

export const updateYelpItemsThunk = (categories, offset, location) =>
  async function (dispatch) {
    const limit = 10
    const response = await fetch(`http://localhost:3000/yelp/index?offset=${offset}&limit=${limit}&categories=${categories}&location=${location}`) //eslint-disable-line
    const items = await response.json()
    dispatch(updateYelpItems(items))
  }
