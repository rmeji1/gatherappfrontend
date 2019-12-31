import React from 'react'
import { Grid, Segment, Card, Header } from 'semantic-ui-react'
import InviteListCard from '../../subcomponents/InviteListCard'
import SearchCategory from '../../subcomponents/SearchCategory'
import { mapYelpToCardItems } from '../../Helpers/HelpFunctions'

export const OnlyTabletGrid = ({ eventsList, cardInfo, contacts, yelpItems, id, invitees }) => (
  <Grid columns={3} divided centered textAlign='center'>
    <Grid.Row columns={3}>
      <Grid.Column width={4}>
        <Segment.Group>
          <Card
            header={cardInfo.header}
            description={cardInfo.description}
            meta={cardInfo.meta}
            fluid={cardInfo.fluid}
          />
          <Segment.Group style={{ marginTop: '1em' }}>
            <Segment >
              <Header as='h3' textAlign='center' content='Gather I.L.' />
              <InviteListCard contacts={contacts} eventId={id} invitees={invitees} />
            </Segment>
          </Segment.Group>
        </Segment.Group>
      </Grid.Column>
      <Grid.Column width={8}>
        <Segment.Group raised>
          <Segment>
            <SearchCategory size='tiny' aligned='center' />
          </Segment>
          <Segment>
            <Card.Group itemsPerRow={2} items={mapYelpToCardItems(yelpItems)} />
          </Segment>
        </Segment.Group>
      </Grid.Column>
      <Grid.Column width={4}>
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
)
