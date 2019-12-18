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
  isContactModalHidden: true
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
      return [...state, action.event]
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
  isContactModalHidden
})
