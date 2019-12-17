import * as Types from './actionTypes'
import UserService from '../services/UserService'

export const addUserId = (userId) => ({
  type: Types.ADD_USER_ID,
  userId
})

export const addUserToken = (userToken) => ({
  type: Types.ADD_USER_TOKEN,
  userToken
})

export const addCreateUserErrors = (errors) => ({
  type: Types.CREATE_USER_ERROR,
  errors
})

export const isLoginView = (isLogin) => ({
  type: Types.IS_LOGIN,
  isLogin
})

export const addAuthProps = (authProps) => ({
  type: Types.ADD_AUTH_PROPS,
  authProps
})

export const closeSideBar =  () => ({
  type: Types.CLOSE_SIDE_BAR
})

export const openSideBar = () => ({
  type: Types.OPEN_SIDE_BAR
})

export const createNewUser = (user) => async function (dispatch) {
  try {
    const service = new UserService('http://localhost:3000/user')
    const authProps = await service.createUser(user)
    window.localStorage.setItem('authProps', JSON.stringify(authProps))
    dispatch(addAuthProps(authProps))
  } catch (e) {
    console.log(e)
    dispatch(addCreateUserErrors(e.errors))
  }
}

export const loginUser = (user) => async function (dispatch) {
  try {
    const service = new UserService('http://localhost:3000/login')
    const authProps = await service.loginUser(user)
    window.localStorage.setItem('authProps', JSON.stringify(authProps))
    dispatch(addAuthProps(authProps))
  } catch (e) {
    console.log(e)
    dispatch(addCreateUserErrors(['Unable to sign in, please try again.']))
  }
}
