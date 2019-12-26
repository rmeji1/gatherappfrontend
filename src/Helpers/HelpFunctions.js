import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

export const mapEventsToCardItems = (events) => events.map(event => ({
  header: event.title,
  description: event.description,
  meta: `Created by: ${event.creator_name}`,
  fluid: true,
  as: Link,
  to: `/event/${event.id}`
}))

export const mapEventToCard = (event) => ({
  header: event.title,
  description: event.description,
  meta: `Created by: ${event.creator_name}`,
  fluid: true
})

export const mapYelpToCardItems = (items, handleOnClick) => console.log(items[0]) || items.map(item => ({
  header: item.name,
  image: item.image_url,
  description: item.description,
  meta: `Rating: ${item.rating}, Price: ${item.price}`,
  fluid: true,
  extra: <Button floated='right' primary onClick={event => handleOnClick(item.id)}>Add to I.T.</Button>
}))
