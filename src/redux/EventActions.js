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

export const addEventLists = (eventsList) => ({
  type: Types.ADD_EVENTS_LISTS,
  eventsList
})

export const updateEventLists = (eventsListItem) => ({
  type: Types.UPDATE_EVENTS_LISTS,
  eventsListItem
})

export const fetchEventsFor = (userId, token) => (
  async function (dispatch) {
    const service = new EventService(userId, token, 'http://localhost:3000')
    try {
      const events = await service.fetchAllEvents()
      const eventsList = events.map((event) => ({
        eventId: event.id,
        items: event.events_lists
      }))
      dispatch(addEventLists(eventsList))
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

export const updateYelpItemsTotalCount = (yelpItemsTotalCount) => ({
  type: Types.YELP_ITEMS_COUNT_TOTAL,
  yelpItemsTotalCount
})

export const updateYelpItemsThunk = (categories, offset, location, Authorization) =>
  async function (dispatch) {
    const limit = 12
    const response = await fetch(`http://localhost:3000/yelp/index?offset=${offset}&limit=${limit}&categories=${categories}&location=${location}`, { headers: {Authorization}}) //eslint-disable-line
    const items = await response.json()
    dispatch(updateYelpItems(items.businesses))
    dispatch(updateYelpItemsTotalCount(items.total))
  }

export const changeActivePageTo = (activePage) => ({
  type: Types.CHANGE_EVENTS_ACTIVE_PAGE,
  activePage
})

export const updateInvite = (invitation) => ({
  type: Types.UPDATE_INVITE,
  invitation
})

export const confirmEvent = (confirmed, invitationId) =>
  async function (dispatch) {
    try {
      const response = await fetch(`http://localhost:3000/invitations/${invitationId}`, { //eslint-disable-line 
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ invitation: { confirmed } })
      })
      if (!response.ok) throw await response.json()
      const invitation = await response.json()
      if (invitation.confirmed) dispatch(addCreatedEvent(invitation.event))
      delete invitation.event
      dispatch(updateInvite(invitation))
    } catch (e) {
      console.log(e)
    }
  }

export const addToEventsList = (yelpItem, start_time, end_time, eventId, token) => //eslint-disable-line
  async function (dispatch) {
    try {
      const service = new EventService(null, token, 'http://localhost:3000')
      const newEventListItem = await service.addToEventsList(yelpItem, start_time, end_time, eventId)
      dispatch(updateEventLists(newEventListItem))
    } catch (e) {
      console.log(e)
    }
  }
