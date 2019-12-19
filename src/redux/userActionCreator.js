import * as Type from './actionTypes'

export const saveUser = (user) => ({
  type: Type.SHOW_USER,
  user
})

export const showUser = (id, token) =>
  async function (dispatch) {
    const response = await fetch(`http://localhost:3000/users/${id}`, { //eslint-disable-line 
      headers: {
        Authorization: token,
        Accept: 'application/json'
      }
    })
    const user = await response.json()
    dispatch(saveUser(user))
  }
