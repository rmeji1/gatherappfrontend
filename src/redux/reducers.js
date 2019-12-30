import * as Types from './actionTypes'
import { combineReducers } from 'redux'

const initialState = {
  authProps: JSON.parse(window.localStorage.getItem('authProps')),
  loginErrors: [],
  isLogin: false,
  events: [],
  isHiddenSidebar: true,
  isNewEventModalShown: false,
  yelpItems: [],
  isContactModalHidden: true,
  user: null,
  activePage: 1,
  yelpItemsTotalCount: 0,
  invitations: [],
  eventsList: []
}

const isLogin = (state = initialState.isLogin, action) => {
  switch (action.type) {
    case Types.IS_LOGIN:
      return action.isLogin
    default:
      return state
  }
}

const authProps = (state = initialState.authProps, action) => {
  switch (action.type) {
    case Types.ADD_AUTH_PROPS:
      return action.authProps
    case Types.LOGOUT_USER:
      window.localStorage.removeItem('authProps')
      return null
    default:
      return state
  }
}

const loginErrors = (state = initialState.loginErrors, action) => {
  switch (action.type) {
    case Types.CREATE_USER_ERROR:
      return action.errors
    default:
      return state
  }
}

const events = (state = initialState.events, action) => {
  switch (action.type) {
    case Types.SAVE_EVENTS:
      return action.events
    case Types.ADD_EVENT:
      const event = state.find(event => event.id === action.event.id)
      if (event) return state
      return [...state, action.event]
    case Types.INVITE_USER:
      return state.map(event => event.id === action.invite.event.id ? action.invite.event : event) 
    default:
      return state
  }
}

const isHiddenSidebar = (state = initialState.isHiddenSidebar, action) => {
  switch (action.type) {
    case Types.CLOSE_SIDE_BAR:
      return true
    case Types.OPEN_SIDE_BAR:
      return false
    default:
      return state
  }
}

const isNewEventModalShown = (state = initialState.isNewEventModalShown, action) => {
  switch (action.type) {
    case Types.OPEN_NEW_EVENT_MODAL:
      return true
    case Types.CLOSE_NEW_EVENT_MODAL:
      return false
    default:
      return state
  }
}

const yelpItems = (state = initialState.yelpItems, action) => {
  switch (action.type) {
    case Types.UPDATE_YELP_ITEMS:
      return action.yelpItems
    default:
      return state
  }
}

const isContactModalHidden = (state = initialState.isContactModalHidden, action) => {
  switch (action.type) {
    case Types.OPEN_ADD_CONTACT_MODAL:
      return false
    case Types.CLOSE_ADD_CONTACT_MODAL:
      return true
    default:
      return state
  }
}

const user = (state = initialState.user, action) => {
  switch (action.type) {
    case Types.SHOW_USER:
      return action.user
    case Types.ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.contact]
      }
    default:
      return state
  }
}

const activePage = (state = initialState.activePage, action) => {
  switch (action.type) {
    case Types.CHANGE_EVENTS_ACTIVE_PAGE:
      return action.activePage
    default:
      return state
  }
}

const yelpItemsTotalCount = (state = initialState.yelpItemsTotalCount, action) => {
  switch (action.type) {
    case Types.YELP_ITEMS_COUNT_TOTAL:
      return action.yelpItemsTotalCount
    default:
      return state
  }
}

const invitations = (state = initialState.invitations, action) => {
  switch (action.type) {
    case Types.ADD_INVITATIONS:
      return action.invitations
    case Types.ADD_INVITATION:
      return state.find(invitation => invitation.id === action.invitation.id)
                ? state : [...state, action.invitation]
    case Types.UPDATE_INVITE:
      return state.map(invite => invite.id === action.invitation.id ? action.invitation : invite)
    default:
      return state
  }
}

const eventsList = (state = initialState.eventsList, action) => {
  switch (action.type) {
    case Types.ADD_EVENTS_LISTS:
      return action.eventsList
    case Types.UPDATE_EVENTS_LISTS:
      return state.map((eventsList) => {
        if (eventsList.eventId === action.eventsListItem.event_id) {
          return {
            ...eventsList,
            items: [...eventsList.items, action.eventsListItem]
          }
        }
        return eventsList
      })
    default:
      return state
  }
}

export default combineReducers({
  loginErrors,
  isLogin,
  authProps,
  events,
  isHiddenSidebar,
  isNewEventModalShown,
  yelpItems,
  isContactModalHidden,
  user,
  activePage,
  yelpItemsTotalCount,
  invitations,
  eventsList
})
