import React, { useState } from 'react'
import { Grid, Card, Segment, Header } from 'semantic-ui-react'
import { mapYelpToCardItems } from '../../Helpers/HelpFunctions'
import InviteListCard from '../../subcomponents/InviteListCard'
import SearchCategory from '../../subcomponents/SearchCategory'
import TimeModal from '../../subcomponents/TimeModal'

export const OnlyDesktopGrid = ({ cardInfo, contacts, yelpItems, id, invitees, eventsList }) => {
  const [isVisible, setVisible] = useState(false)
  const [yelpId, setYelpId] = useState('')
  return (
    <>
      <Grid columns={3} divided centered textAlign='center'>
        <Grid.Row columns={3}>
          <Grid.Column width={3}>
            <Segment.Group>
              <Card
                header={cardInfo.header}
                description={cardInfo.description}
                meta={cardInfo.meta}
                fluid={cardInfo.fluid}
              />
              {/* <Segment.Group style={{ marginTop: '1em' }}> */}
              <Segment>
                <Header as='h3' textAlign='center' content='Gather I.L.' />
                <InviteListCard eventId={id} contacts={contacts} invitees={invitees} />
              </Segment>
            </Segment.Group>
            {/* </Segment.Group> */}
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment.Group raised>
              <Segment>
                <SearchCategory size='large' />
              </Segment>
              <Segment>
                <Card.Group
                  itemsPerRow={3}
                  items={mapYelpToCardItems(yelpItems, (yelpId) => {
                    setYelpId(yelpId)
                    setVisible(true)
                  })}
                />
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column width={3}>
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <TimeModal
        open={isVisible}
        onClose={() => setVisible(false)}
        yelpItem={yelpItems.find((item) => item.id === yelpId)}
        eventId={id}
      />
    </>
  )
}

export default OnlyDesktopGrid
