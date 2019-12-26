
self.addEventListener('push', async event => {
  const data = event.data.json()
  console.log('New notification', data)
  const options = {
    body: data.title,
  }
  // event.waitUntil(
  //   self.registration.showNotification("New event", options)
  //   )
    
  // const client = await clients.get(event.clientId);
  // console.log(client)
  // debugger
  console.log('Sending data')
  self.clients.matchAll().then(clients => clients.map(client => client.postMessage(JSON.stringify(data))))
})

