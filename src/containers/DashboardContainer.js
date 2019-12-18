import React from 'react'
import MobileDashboardContainer from './mobile/MobileDashboardContainer'
import { connect } from 'react-redux'
import DesktopDashboardContainer from './desktop/DesktopDashboardContainer'
import { createNewEventFor, closeNewEventModal, fetchEventsFor } from '../redux/EventActions'
import { openSideBar, closeSideBar } from '../redux/actions'

class DashboardContainer extends React.Component {
  componentDidMount () {
    this.props.fetchEventsFor(this.props.userId, this.props.token)
  }

  render () {
    return (
      <ResponsiveContainer props={this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.authProps.user_id,
    token: state.authProps.token,
    events: state.events,
    isNewEventModalShown: state.isNewEventModalShown,
    isContactModalHidden: state.isContactModalHidden
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewEventFor: (userId, token, event) => dispatch(createNewEventFor(userId, token, event)),
    closeSideBar: () => dispatch(closeSideBar()),
    openSideBar: () => dispatch(openSideBar()),
    closeNewEventModal: () => {
      dispatch(closeNewEventModal())
      dispatch(closeSideBar())
    },
    fetchEventsFor: (userId, token) => dispatch(fetchEventsFor(userId, token))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)

const ResponsiveContainer = (props) => (
  <div>
    <MobileDashboardContainer props={props.props} />
    <DesktopDashboardContainer props={props.props} />
  </div>
)
