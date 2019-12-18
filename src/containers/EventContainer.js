import React, { Component } from 'react'
import MobileEventContainer from './mobile/MobileEventContainer'
import { fetchEventsFor } from '../redux/EventActions'
import { connect } from 'react-redux'
import DesktopEventContainer from './desktop/DesktopEventContainer'

export class EventContainer extends Component {
  componentDidMount () {
    const { events, getEvents, userId, token } = this.props
    if (events.length === 0) {
      getEvents(userId, token)
    }
  }

  render () {
    return (
      <ResponsiveContainer>
        Hello from event!
      </ResponsiveContainer>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events,
  userId: state.authProps.user_id,
  token: state.authProps.token
})

const mapDispatchToProps = dispatch => ({
  getEvents: (userId, token) => dispatch(fetchEventsFor(userId, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer)

const ResponsiveContainer = ({ children }) => (
  <div>
    <MobileEventContainer>{children}</MobileEventContainer>
    <DesktopEventContainer>{children}</DesktopEventContainer>
  </div>
)
