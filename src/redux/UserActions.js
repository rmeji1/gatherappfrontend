import * as Type from './actionTypes'
import { addInvitations } from './InvitationActions'
import UserService from '../services/UserService'

export const saveUser = (user) => ({
  type: Type.SHOW_USER,
  user
})

export const showUser = () =>
  async function (dispatch, getState, api) {
    const authProps = getState().authProps
    const response = await fetch(`${api}/users/${authProps.user_id}`, { //eslint-disable-line 
      headers: {
        Authorization: authProps.token,
        Accept: 'application/json'
      }
    })
    const user = await response.json()
    dispatch(saveUser(user))
    dispatch(addInvitations(user.invitations))
  }

export const addAuthProps = (authProps) => ({
  type: Type.ADD_AUTH_PROPS,
  authProps
})

export const logout = () => ({
  type: Type.LOGOUT_USER
})

export const addCreateUserErrors = (errors) => ({
  type: Type.CREATE_USER_ERROR,
  errors
})

export const createNewUser = (user) => async function (dispatch, getState, api) {
  try {
    const service = new UserService(`${api}/user`)
    const authProps = await service.createUser(user)
    window.localStorage.setItem('authProps', JSON.stringify(authProps))
    dispatch(addAuthProps(authProps))
  } catch (e) {
    console.log(e)
    dispatch(addCreateUserErrors(e.errors))
  }
}

export const loginUser = (user) => async function (dispatch, getState, api) {
  try {
    const service = new UserService(`${api}/login`)
    const authProps = await service.loginUser(user)
    window.localStorage.setItem('authProps', JSON.stringify(authProps))
    dispatch(addAuthProps(authProps))
  } catch (e) {
    dispatch(addCreateUserErrors(['Unable to sign in, please try again.']))
  }
}
