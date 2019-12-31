
self.addEventListener('push', async event => { //eslint-disable-line
  const data = event.data.json()
  if (data.type === 'ADD_INVITATION') {
    const options = { body: data.invitation.event_title }
    event.waitUntil(
      self.registration.showNotification('You got invited!', options) //eslint-disable-line
    )
  }
  self.clients.matchAll().then(clients => clients.map(client => client.postMessage(JSON.stringify(data)))) //eslint-disable-line
})
