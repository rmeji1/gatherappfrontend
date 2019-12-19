import React from 'react'
import { Grid, Segment, Card, Header, Pagination } from 'semantic-ui-react'
import InviteListCard from '../../subcomponents/InviteListCard'
import SearchCategory from '../../subcomponents/SearchCategory'
import { mapYelpToCardItems } from '../../Helpers/HelpFunctions'

export const OnlyTabletGrid = ({ cardInfo, contacts, yelpItems, id, invitees }) => (
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
              <InviteListCard contacts={contacts} eventId={id} invitees={invitees}/>
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
          </Segment>
        </Segment.Group>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)