import React from 'react'
import MobileDashboardContainer from '../mobile/MobileDashboardContainer'
import { connect } from 'react-redux'
import DesktopDashboardContainer from '../desktop/DesktopDashboardContainer'
import { createNewEventFor, closeNewEventModal, fetchEventsFor } from '../../redux/EventActions'
import { openSideBar, closeSideBar, getSessionId } from '../../redux/actions'
import { addContactRemote, closeAddContactModal } from '../../redux/ContactActions'
import { Redirect } from 'react-router-dom'

class DashboardContainer extends React.Component {
  componentDidMount = () => this.props.fetchEventsFor(this.props.userId, this.props.token)
  render = () => <ResponsiveContainer {...this.props} />
}

const mapStateToProps = (state) => {
  return {
    userId: state.authProps.user_id,
    token: state.authProps.token,
    events: state.events,
    isNewEventModalShown: state.isNewEventModalShown,
    isContactModalHidden: state.isContactModalHidden,
    user: state.user,
    sessionId: state.sessionId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSessionId: (token) => dispatch(getSessionId(token)),
    createNewEventFor: (userId, token, event) => dispatch(createNewEventFor(userId, token, event)),
    closeSideBar: () => dispatch(closeSideBar()),
    openSideBar: () => dispatch(openSideBar()),
    closeNewEventModal: () => {
      dispatch(closeNewEventModal())
      dispatch(closeSideBar())
    },
    fetchEventsFor: (userId, token) => dispatch(fetchEventsFor(userId, token)),
    addContactRemote: (userId, ownerId, token) => dispatch(addContactRemote(userId, ownerId, token)),
    closeAddContactModal: () => dispatch(closeAddContactModal()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)

const ResponsiveContainer = (props) => (
  <div>
    {!props.userId ? <Redirect to='/' /> : null}
    <MobileDashboardContainer {...props} />
    <DesktopDashboardContainer {...props} />
  </div>
)
