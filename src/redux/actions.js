import * as Types from './actionTypes'
import { InviteService } from '../services/InviteService'

export const isLoginView = (isLogin) => ({
  type: Types.IS_LOGIN,
  isLogin
})

export const closeSideBar =  () => ({
  type: Types.CLOSE_SIDE_BAR
})

export const openSideBar = () => ({
  type: Types.OPEN_SIDE_BAR
})

export const addInvite = (invite) => ({
  type: Types.INVITE_USER,
  invite
})

export const inviteUser = (eventId, userId, token) => async function (dispatch) {
  try {
    const service = new InviteService('http://localhost:3000', token)
    const invite = await service.inviteUser(eventId, userId)
    dispatch(addInvite(invite))
  } catch (e) {
    console.log(e)
  }
}

export const getSessionId = (Authorization) =>
  async function (dispatch) {
    try {
      const response = await window.fetch('http://localhost:3000/assistant/create/session', {
        headers: { Authorization }
      })
      if (!response.ok) throw await response.json()
      const session = await response.json()
      window.localStorage.setItem('sessionId', session.session_id)
      dispatch(addSessionId(session.session_id))
    } catch (e) {
      console.log(e)
    }
  }

export const addSessionId = (sessionId) => ({
  type: Types.ADD_SESSION_ID,
  sessionId
})
