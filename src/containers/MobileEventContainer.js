import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import MobileSideBar from './MobileSideBar'
import { Container, Card, Menu, Segment } from 'semantic-ui-react'
import { mapEventToCard } from '../Helpers/HelpFunctions'
import SearchExampleCategory from './SearchCategory'

const EventContainer = ({ events }) => {
  const [activeItem, handleItemClick] = useState('add events')
  const { id } = useParams()
  const event = events.find(event => parseInt(event.id) === parseInt(id))
  if (!event) return null
  const cardInfo = mapEventToCard(event)
  return (
    <MobileSideBar>
      <Container style={{ minHeight: '95vh' }}>
        <Card
          header={cardInfo.header}
          description={cardInfo.description}
          meta={cardInfo.meta}
          fluid={cardInfo.fluid}
        />
        <Menu attached='top' tabular style={{ backgroundColor: 'grey' }}>
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
        </Menu>
        <Segment attached='bottom'>
          <SearchExampleCategory />
        </Segment>
      </Container>
    </MobileSideBar>
  )
}

const mapStateToProps = state => {
  return {
    events: state.events
  }
}
export default connect(mapStateToProps)(EventContainer)
