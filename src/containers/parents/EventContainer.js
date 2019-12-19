import React, { Component } from 'react'
import MobileEventContainer from './mobile/MobileEventContainer'
import { fetchEventsFor } from '../redux/EventActions'
import { connect } from 'react-redux'
import DesktopEventContainer from './desktop/DesktopEventContainer'
import { withRouter } from 'react-router-dom'

export class EventContainer extends Component {
  componentDidMount () {
    const { events, getEvents, userId, token, shouldGetUser } = this.props
    if (events.length === 0) getEvents(userId, token)
    // TODO: I NEED CALL FCN TO GET USER.
    if (shouldGetUser) console.log('get user')
  }

  render = () => <ResponsiveContainer {...this.props} />
}

const mapStateToProps = state => ({
  events: state.events,
  userId: state.authProps.user_id,
  token: state.authProps.token,
  yelpItems: state.yelpItems,
  shouldGetUser: !state.user,
  contacts: state.user ? state.user.contacts : []
})

const mapDispatchToProps = dispatch => ({
  getEvents: (userId, token) => dispatch(fetchEventsFor(userId, token))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventContainer))

const ResponsiveContainer = (props) => (
  <div>
    <MobileEventContainer {...props} />
    <DesktopEventContainer {...props} />
  </div>
)
