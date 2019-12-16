import { ADD_USER_ID, ADD_USER_TOKEN, CREATE_USER_ERROR, IS_LOGIN } from './actionTypes'
import { combineReducers } from 'redux'

const initialState = {
  userId: window.localStorage.userId ? window.localStorage.userId : null,
  userToken: localStorage.userToken ? localStorage.userToken : null,
  loginErrors: [],
  isLogin: false
}

const isLogin = (state = initialState.isLogin, action) => {
  console.log('dispatcher calling is login')
  
  switch (action.type) {
    case IS_LOGIN:
      return action.isLogin
    default:
      return state
  }
}

const userId = (state = initialState.userId, action) => {
  switch (action.type) {
    case ADD_USER_ID:
      return action.userId
    default:
      return state
  }
}

const userToken = (state = initialState.userToken, action) => {
  switch (action.type) {
    case ADD_USER_TOKEN:
      return action.userToken
    default:
      return state
  }
}

const loginErrors = (state = initialState.loginErrors, action) => {
  switch (action.type) {
    case CREATE_USER_ERROR:
      return action.errors
    default:
      return state
  }
}

export default combineReducers({
  userId,
  userToken,
  loginErrors,
  isLogin
})
