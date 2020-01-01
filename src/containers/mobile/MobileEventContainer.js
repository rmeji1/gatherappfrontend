import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import MobileSideBar from '../../subcomponents/MobileSideBar'
import { Container, Card, Menu, Segment } from 'semantic-ui-react'
import { mapEventToCard } from '../../Helpers/HelpFunctions'
import SearchExampleCategory from '../../subcomponents/SearchCategory'
import EventListsContainer from '../parents/EventListsContainer'
import InviteListCard from '../../subcomponents/InviteListCard'

const EventContainer = ({ events, eventsLists, contacts }) => {
  const [activeItem, handleItemClick] = useState('add events')
  const { id } = useParams()
  const event = events.find(event => parseInt(event.id) === parseInt(id))
  if (!event) return null
  const cardInfo = mapEventToCard(event)
  const eventsList = eventsLists.find(list => list.eventId === event.id)

  return (
    <MobileSideBar>
      <Container style={{ minHeight: '95vh' }}>
        <Card
          header={cardInfo.header}
          description={cardInfo.description}
          meta={cardInfo.meta}
          fluid={cardInfo.fluid}
        />
        <Menu attached='top' tabular widths={3} style={{ backgroundColor: 'grey' }}>
          <Menu.Item
            name='add events'
            active={activeItem === 'add events'}
            onClick={() => handleItemClick('add events')}
          />
          <Menu.Item
            name='invite'
            active={activeItem === 'invite'}
            onClick={() => handleItemClick('invite')}
          />
          <Menu.Item
            name='gather i.t.'
            active={activeItem === 'gather i.t.'}
            onClick={() => handleItemClick('gather i.t.')}
          />
        </Menu>
        <Segment attached='bottom'>
          {activeItem === 'add events' ? <SearchExampleCategory id={id} /> : null}
          {activeItem === 'gather i.t.' ? <EventListsContainer eventsList={eventsList} /> : null}
          {activeItem === 'invite' ? <InviteListCard eventId={id} contacts={contacts} invitees={event.invitations.map(invite => invite.user_id)} /> : null}
        </Segment>
      </Container>
    </MobileSideBar>
  )
}

export default EventContainer
