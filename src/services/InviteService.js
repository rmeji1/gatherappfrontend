export class InviteService {
  constructor (url, token) {
    this.url = url
    this.token = token
  }

  async inviteUser (eventId, userId) {
    const response = await fetch(`${this.url}/events/${eventId}/invitations`, { //eslint-disable-line 
      method: 'POST',
      headers: {
        Authorization: this.token,
        'content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ invitation: { user_id: userId } })
    })
    if (!response.ok) throw await response.json()
    return response.json()
  }
}