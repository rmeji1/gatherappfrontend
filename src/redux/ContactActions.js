import * as Type from "./actionTypes"

export const addContact = (contact) => ({
  type: Type.ADD_CONTACT,
  contact: contact
})

export const openAddContactModal = () => ({
  type: Type.OPEN_ADD_CONTACT_MODAL
})

export const closeAddContactModal = () => ({
  type: Type.CLOSE_ADD_CONTACT_MODAL
})

export const addContactRemote = (userId) =>
  async function (dispatch, getState, api) {
    const authProps = getState().authProps
    const response = await fetch(`${api}/contacts`, { //eslint-disable-line 
      method: 'POST',
      headers: {
        Authorization: authProps.token,
        'content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        owner_id: authProps.user_id
      })
    })
    if (!response.ok) throw await response.json()
    dispatch(addContact(await response.json()))
  }
