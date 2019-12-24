import React from 'react'
import MobileDashboardContainer from '../mobile/MobileDashboardContainer'
import { connect } from 'react-redux'
import DesktopDashboardContainer from '../desktop/DesktopDashboardContainer'
import { createNewEventFor, closeNewEventModal, fetchEventsFor } from '../../redux/EventActions'
import { openSideBar, closeSideBar } from '../../redux/actions'
import { addContactRemote, closeAddContactModal } from '../../redux/ContactActions'
import { showUser } from '../../redux/userActionCreator'
import { subscribeUser } from '../../subscription'
import { Redirect } from 'react-router-dom'

class DashboardContainer extends React.Component {
  componentDidMount () {
    this.props.fetchEventsFor(this.props.userId, this.props.token)
    this.props.showUser(this.props.userId, this.props.token)
    subscribeUser(this.props.userId)
  }
  render = () => <ResponsiveContainer {...this.props} />
}

const mapStateToProps = (state) => {
  return {
    userId: state.authProps.user_id,
    token: state.authProps.token,
    events: state.events,
    isNewEventModalShown: state.isNewEventModalShown,
    isContactModalHidden: state.isContactModalHidden,
    user: state.user
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
    fetchEventsFor: (userId, token) => dispatch(fetchEventsFor(userId, token)),
    addContactRemote: (userId, ownerId, token) => dispatch(addContactRemote(userId, ownerId, token)),
    closeAddContactModal: () => dispatch(closeAddContactModal()),
    showUser: (userId, userToken) => dispatch(showUser(userId, userToken))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)

const ResponsiveContainer = (props) => (
  <div>
    {!props.userId ? <Redirect to="/" /> : null}
    <MobileDashboardContainer {...props} />
    <DesktopDashboardContainer  {...props} />
  </div>
)
