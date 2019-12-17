class EventService {
  constructor (userId, token, url) {
    this.userId = userId
    this.token = token
    this.url = url
  }

  async fetchAllEvents () {
    const response = await window.fetch(`${this.url}/users/${this.userId}/events`, {
      headers: { Authorization: this.token }
    })
    if (!response.ok) throw await response.json()
    return response.json()
  }

  async createNewEvent (event) {
    console.log(event)
    console.log(`${this.url}/users/${this.userId}/events`)
    const response = await window.fetch(`${this.url}/users/${this.userId}/events`, {
      method: 'POST',
      headers: {
        Authorization: this.token,
        'Content-Type': 'application/json',
        Accept: 'applcication/json'
      },
      body: JSON.stringify({ event })
    })
    if (!response.ok) throw await response.json()
    return response.json()
  }
}

export default EventService
