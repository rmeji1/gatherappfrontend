import React, { Component } from 'react'
import { Card, Transition } from 'semantic-ui-react'
import { mapEventsToCardItems } from '../../Helpers/HelpFunctions'
import DesktopMenuContainer from '../../subcomponents/DesktopMenuContainer'
import { Link } from 'react-router-dom'

export class DesktopDashboardContainer extends Component {
  render () {
    return (
      <DesktopMenuContainer>
        <Transition.Group as={Card.Group} centered itemsPerRow={4} animation='fly left'>
          {mapEventsToCardItems(this.props.events).map(event =>
            <Card
              fluid
              color={event.creatorId === this.props.userId ? 'yellow' : 'red'}
              as={Link} to={event.to} key={`card-${event.header}`} header={event.header} description={event.description} 
              meta={event.meta} />)}
        </Transition.Group>
      </DesktopMenuContainer>
    )
  }
}

export default DesktopDashboardContainer
