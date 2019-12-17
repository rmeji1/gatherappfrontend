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
