import * as Types from './actionTypes'
import EventService from '../services/EventService'
import { InviteService } from '../services/InviteService'

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

export const appendToEventLists = (eventsListItem) => ({
  type: Types.APPEND_TO_EVENTS_LISTS,
  eventsListItem
})

export const userHasNoEvents = (hasNoEvents) => ({
  type: Types.NO_EVENTS,
  hasNoEvents
})

export const addInvite = (invite) => ({
  type: Types.INVITE_USER,
  invite
})

export const inviteUser = (eventId, contactId) =>
  async function (dispatch, getState, api) {
    try {
      const token = getState().token
      const service = new InviteService(api, token)
      const invite = await service.inviteUser(eventId, contactId)
      dispatch(addInvite(invite))
    } catch (e) {
      console.log(e)
    }
}

export const fetchEventsFor = () =>
  async function (dispatch, getState, api) {
    const authProps = getState().authProps
    const service = new EventService(authProps.user_id, authProps.token, api)
    try {
      const events = await service.fetchAllEvents()
      const eventsList = events.map((event) => ({
        eventId: event.id,
        items: event.events_lists
      }))
      dispatch(addEventLists(eventsList))
      dispatch(saveAllEvents(events))
      if (events.length === 0) dispatch(userHasNoEvents(true))
    } catch (e) {
      console.log(e)
    }
  }

export const createNewEventFor = (event) => console.log('in here') ||
  async function (dispatch, getState, api) {
    const authProps = getState().authProps
    const service = new EventService(authProps.user_id, authProps.token, api)
    const createdEvent = await service.createNewEvent(event)
    dispatch(addCreatedEvent(createdEvent))
    dispatch(appendToEventLists({
      eventId: createdEvent.id,
      items: createdEvent.events_lists
    }))
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
  async function (dispatch, _, api) {
    const limit = 12
    const response = await fetch(`${api}/yelp/index?offset=${offset}&limit=${limit}&categories=${categories}&location=${location}`, { headers: {Authorization}}) //eslint-disable-line
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
  async function (dispatch, getState, api) {
    try {
      const authProps = getState().authProps
      const response = await fetch(`${api}/invitations/${invitationId}`, { //eslint-disable-line 
        method: 'PATCH',
        headers: {
          Authorization: authProps.token,
          'content-type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ invitation: { confirmed } })
      })
      if (!response.ok) throw await response.json()
      const invitation = await response.json()
      if (invitation.confirmed) {
        dispatch(addCreatedEvent(invitation.event))
        console.log(invitation.event)
        dispatch(appendToEventLists({
          eventId: invitation.event.id,
          items: invitation.event.events_lists
        }))
      }
      delete invitation.event
      dispatch(updateInvite(invitation))
    } catch (e) {
      console.log(e)
    }
  }

export const addToEventsList = (yelpItem, start_time, end_time, eventId) => //eslint-disable-line
  async function (dispatch, getState, api) {
    try {
      const token = getState().authProps.token
      const service = new EventService(null, token, api)
      const newEventListItem = await service.addToEventsList(yelpItem, start_time, end_time, eventId)
      dispatch(updateEventLists(newEventListItem))
    } catch (e) {
      console.log(e)
    }
  }
