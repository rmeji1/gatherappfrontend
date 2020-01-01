import React, { useEffect } from 'react'
import MobileEventContainer from '../mobile/MobileEventContainer'
import { fetchEventsFor, changeActivePageTo } from '../../redux/EventActions'
import { connect } from 'react-redux'
import DesktopEventContainer from '../desktop/DesktopEventContainer'
import { withRouter } from 'react-router-dom'

const EventContainer = (props) => {
  useEffect(() => {
    const { getEvents, userId, token } = props
    getEvents(userId, token) // eslint-disable-next-line
  }, [])
  return <ResponsiveContainer {...props} />
}

const mapStateToProps = state => ({
  events: state.events,
  userId: state.authProps.user_id,
  token: state.authProps.token,
  yelpItems: state.yelpItems,
  contacts: state.user ? state.user.contacts : [],
  activePage: state.activePage,
  yelpItemsTotalCount: state.yelpItemsTotalCount,
  eventsLists: state.eventsList
})

const mapDispatchToProps = dispatch => ({
  getEvents: () => dispatch(fetchEventsFor()),
  changeActivePageTo: (newPage) => dispatch(changeActivePageTo(newPage))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventContainer))

const ResponsiveContainer = (props) =>
  <>
    <MobileEventContainer {...props} />
    <DesktopEventContainer {...props} />
  </>
