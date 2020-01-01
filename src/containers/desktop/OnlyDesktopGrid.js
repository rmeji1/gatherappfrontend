import React, { useState } from 'react'
import { Grid, Card, Segment, Header } from 'semantic-ui-react'
import { mapYelpToCardItems } from '../../Helpers/HelpFunctions'
import InviteListCard from '../../subcomponents/InviteListCard'
import SearchCategory from '../../subcomponents/SearchCategory'
import TimeModal from '../../subcomponents/TimeModal'
import EventListsContainer from '../parents/EventListsContainer'
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
              <Segment>
                <Header as='h3' textAlign='center' content='Gather I.L.' />
                <InviteListCard eventId={id} contacts={contacts} invitees={invitees} />
              </Segment>
            </Segment.Group>
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
            <EventListsContainer eventsList={eventsList} />
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
