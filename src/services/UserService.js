class UserService {
  constructor (url) {
    this.url = url
  }

  async createUser (user) {
    const response = await fetch(`${this.url}/users`, { //eslint-disable-line 
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ user })
    })
    if (!response.ok) throw await response.json()
    return response.json()
  }

  async loginUser (user) {
    const response = await fetch(this.url, { //eslint-disable-line 
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ user })
    })
    if (!response.ok) throw await response.json()
    return response.json()
  }
}

export default UserService
