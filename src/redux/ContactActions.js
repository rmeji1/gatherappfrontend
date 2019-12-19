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

export const addContactRemote = (userId, ownerId, token) =>
  async function (dispatch) {
    const response = await fetch(`http://localhost:3000/contacts`, { //eslint-disable-line 
      method: 'POST',
      headers: {
        Authorization: token,
        'content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        owner_id: ownerId
      })
    })
    if (!response.ok) throw await response.json()
    dispatch(addContact(await response.json()))
  }
