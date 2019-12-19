import React from 'react'
import { Responsive } from 'semantic-ui-react'
import DesktopMenuContainer from '../../subcomponents/DesktopMenuContainer'
import { mapEventToCard } from '../../Helpers/HelpFunctions'
import { OnlyTabletGrid } from '../tablet/OnlyTabletGrid'
import { OnlyDesktopGrid } from './OnlyDesktopGrid'

const DesktopEventContainer = (props) => {
  const { id } = props.match.params
  const { events, contacts, yelpItems } = props
  const event = events.find(event => parseInt(event.id) === parseInt(id))
  if (!event) return null
  const cardInfo = mapEventToCard(event)

  return (
    <DesktopMenuContainer>
      <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
        <OnlyTabletGrid
          cardInfo={cardInfo}
          contacts={contacts}
          yelpItems={yelpItems}
          id={event.id}
          invitees={event.invitations.map(invite => invite.user_id)}
        />
      </Responsive>
      <Responsive minWidth={Responsive.onlyComputer.minWidth}>
        <OnlyDesktopGrid
          cardInfo={cardInfo}
          contacts={contacts}
          yelpItems={yelpItems}
          id={event.id}
          invitees={event.invitations.map(invite => invite.user_id)}
        />
      </Responsive>
    </DesktopMenuContainer>
  )
}

export default DesktopEventContainer
