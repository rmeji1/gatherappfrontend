import React from 'react'
import { Segment, Header, Card } from 'semantic-ui-react'
const EventListsContainer = ({ eventsList }) => {
  return (
    <Segment.Group>
      <Segment textAlign='center'>
        <Header as='h3' content='Gather I.T' />
        {
          eventsList.items.map((item) => (
            <Card key={`event-list-item${item.id}`}>
              <Card.Content>
                <Card.Header>{item.name}</Card.Header>
                <Card.Description>{item.address}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                {item.start_time} - {item.end_time}
              </Card.Content>
            </Card>
          ))
        }
      </Segment>
    </Segment.Group>
  )
}

export default EventListsContainer;
