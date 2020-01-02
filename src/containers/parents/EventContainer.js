import React from 'react'
import MobileEventContainer from '../mobile/MobileEventContainer'
import { fetchEventsFor, changeActivePageTo, createNewEventFor, closeNewEventModal } from '../../redux/EventActions'
import { closeSideBar } from '../../redux/actions'
import { addContactRemote, closeAddContactModal } from '../../redux/ContactActions'
import { connect } from 'react-redux'
import DesktopEventContainer from '../desktop/DesktopEventContainer'
import { withRouter } from 'react-router-dom'
import MyContactsModal from '../modals/MyContactsModal'
import NewEventModal from '../modals/NewEventModal'
import { showUser } from '../../redux/UserActions'

class EventContainer extends React.Component {
  state = {
    title: '',
    description: ''
  } 

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  handleGatherSubmission = () => {
    const { title, description } = this.state
    this.props.closeNewEventModal()
    this.props.createNewEventFor({ title, description })
    this.setState({ title: '', description: '' })
  }

  contactsIfNullOrEmpty = () => {
    if (this.props.user) {
      if (this.props.user.contacts && this.props.user.contacts.length !== 0) {
        return this.props.user.contacts.map(contact => ({ header: contact.username }))
      }
    }
    return [{ header: 'Please use search to add...' }]
  }

  componentDidMount = () => {
    if (!this.props.user) this.props.showUser()
    const { getEvents, userId, token } = this.props
    getEvents(userId, token) // eslint-disable-next-line
  }

  render = () => {
    const { isNewEventModalShown, closeNewEventModal, closeAddContactModal, isContactModalHidden, addContactRemote, user } = this.props
    const { title, description } = this.state
    return (
      <>
        <ResponsiveContainer {...this.props} />
        <NewEventModal
          isNewEventModalShown={isNewEventModalShown}
          title={title}
          description={description}
          closeNewEventModal={closeNewEventModal}
          onHandleChange={this.handleChange}
          onHandleGatherSubmission={this.handleGatherSubmission}
        />
        <MyContactsModal
          user={user}
          isContactModalHidden={isContactModalHidden}
          addContactRemote={addContactRemote}
          contacts={this.contactsIfNullOrEmpty()}
          closeAddContactModal={closeAddContactModal}
          userId={this.props.userId}
          token={this.props.token}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events,
  userId: state.authProps.user_id,
  token: state.authProps.token,
  yelpItems: state.yelpItems,
  contacts: state.user ? state.user.contacts : [],
  activePage: state.activePage,
  yelpItemsTotalCount: state.yelpItemsTotalCount,
  eventsLists: state.eventsList,
  user: state.user,
  isNewEventModalShown: state.isNewEventModalShown,
  isContactModalHidden: state.isContactModalHidden
})

const mapDispatchToProps = dispatch => ({
  getEvents: () => dispatch(fetchEventsFor()),
  changeActivePageTo: (newPage) => dispatch(changeActivePageTo(newPage)),
  closeNewEventModal: () => {
    dispatch(closeNewEventModal())
    dispatch(closeSideBar())
  },
  closeAddContactModal: () => dispatch(closeAddContactModal()),
  addContactRemote: (userId) => dispatch(addContactRemote(userId)),
  createNewEventFor: (event) => dispatch(createNewEventFor(event)),
  showUser: () => dispatch(showUser())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventContainer))

const ResponsiveContainer = (props) =>
  <>
    <MobileEventContainer {...props} />
    <DesktopEventContainer {...props} />
  </>
