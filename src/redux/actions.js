import * as Types from './actionTypes'

export const isLoginView = (isLogin) => ({
  type: Types.IS_LOGIN,
  isLogin
})

export const closeSideBar = () => ({
  type: Types.CLOSE_SIDE_BAR
})

export const openSideBar = () => ({
  type: Types.OPEN_SIDE_BAR
})

export const getSessionId = () =>
  async function (dispatch, getState, api) {
    try {
      const Authorization = getState().authProps.token
      const response = await window.fetch(`${api}/assistant/create/session`, {
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
