import * as Types from './actionTypes'

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

export const createNewUser = (user) => console.log(user) ||
  async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/users', { //eslint-disable-line 
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ user })
      })
      if (!response.ok) throw await response.json()
      const data = await response.json()
      dispatch(addUserId(data.user_id))
      dispatch(addUserToken(data.token))
    } catch (e) {
      console.log(e)
      dispatch(addCreateUserErrors(e.errors))
    }
  }

export const loginUser = (user) => console.log('logging user in', user) ||
  async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/login', { //eslint-disable-line 
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ user })
      })
      if (!response.ok) throw await response.json()
      const data = await response.json()
      dispatch(addUserId(data.user_id))
      dispatch(addUserToken(data.token))
    } catch (e) {
      dispatch(addCreateUserErrors(e.errors))
    }
  }
