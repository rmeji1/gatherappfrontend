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

  async addToEventsList (yelpItem, start_time, end_time, eventId) {   // eslint-disable-line
    const response = await fetch(`${this.url}/events/${eventId}/events_lists`, { //eslint-disable-line 
      method: 'POST',
      headers: {
        Authorization: this.token,
        'content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        event: {
          yelp_id: yelpItem.id,
          name: yelpItem.name,
          url: yelpItem.url,
          address: `${yelpItem.location.address1} ${yelpItem.location.city} ${yelpItem.location.state}`,
          start_time,
          end_time
        }
      })
    })
    const eventsListItem = await response.json()
    if (!response.ok) throw eventsListItem
    return eventsListItem
  }
}

export default EventService
