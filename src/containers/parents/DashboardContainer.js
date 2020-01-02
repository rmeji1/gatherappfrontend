import React from 'react'
import MobileDashboardContainer from '../mobile/MobileDashboardContainer'
import { connect } from 'react-redux'
import DesktopDashboardContainer from '../desktop/DesktopDashboardContainer'
import { createNewEventFor, closeNewEventModal, fetchEventsFor } from '../../redux/EventActions'
import { openSideBar, closeSideBar, getSessionId } from '../../redux/actions'
import { addContactRemote, closeAddContactModal } from '../../redux/ContactActions'
import { Redirect } from 'react-router-dom'
import { Widget, addResponseMessage, toggleWidget } from 'react-chat-widget'
import MyContactsModal from '../modals/MyContactsModal'
import NewEventModal from '../modals/NewEventModal'

class DashboardContainer extends React.Component {
  state = {
    title: '',
    description: '',
    savedMessage: '',
    widgetOpen: false
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


  handleNewUserMessage = async (newMessage) => {
    const { sessionId, getSessionId, token } = this.props
    try {
      if (!sessionId) {
        this.setState({ savedMessage: newMessage }, () => getSessionId(token))
        return
      }
      const response = await fetch('https://gatherapp-flatiron.herokuapp.com/assistant/create', { //eslint-disable-line
        method: 'POST',
        headers: {
          Authorization: token,
          Accepts: 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: newMessage
        })
      })
      if (!response.ok) throw await response.json()
      const messages = await response.json()
      messages.message.output.generic.forEach(message => {
        addResponseMessage(message.text)
        if (message.text === 'Please wait while we create this event for you!') {
          const title = messages.message.context.skills['main skill'].user_defined.title
          const description = messages.message.context.skills['main skill'].user_defined.description || ''
          this.props.createNewEventFor({ title, description })
        }
      })
    } catch (e) {
      if (e.need_new_session) this.setState({ savedMessage: newMessage }, () => getSessionId(token))
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.hasNoEvents && !this.state.widgetOpen) {
      toggleWidget()
      addResponseMessage("Hey, looks like you don't have any Gatherings yet.")
      addResponseMessage('I can help you with that. Just type something like:')
      addResponseMessage('I would like to create an event.')
      this.setState({ widgetOpen: true })
    }
    if (prevProps.sessionId !== this.props.sessionId) {
      this.handleNewUserMessage(this.state.savedMessage)
    }
  }

  componentDidMount = () => this.props.fetchEventsFor()
  render = () => {
    const { isNewEventModalShown, closeNewEventModal, closeAddContactModal, isContactModalHidden, addContactRemote, user } = this.props
    const { title, description } = this.state
    return (
      <> 
        <Widget
          title='Your assistant'
          subtitle='Hi, I am Watson! Ask me to create an event.'
          handleNewUserMessage={this.handleNewUserMessage}  //eslint-disable-line
        />
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
        <ResponsiveContainer {...this.props} />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.authProps.user_id,
    token: state.authProps.token,
    events: state.events,
    isNewEventModalShown: state.isNewEventModalShown,
    isContactModalHidden: state.isContactModalHidden,
    user: state.user,
    sessionId: state.sessionId,
    hasNoEvents: state.hasNoEvents
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSessionId: (token) => dispatch(getSessionId(token)),
    createNewEventFor: (event) => dispatch(createNewEventFor(event)),
    closeSideBar: () => dispatch(closeSideBar()),
    openSideBar: () => dispatch(openSideBar()),
    closeNewEventModal: () => {
      dispatch(closeNewEventModal())
      dispatch(closeSideBar())
    },
    fetchEventsFor: () => dispatch(fetchEventsFor()),
    addContactRemote: (userId) => dispatch(addContactRemote(userId)),
    closeAddContactModal: () => dispatch(closeAddContactModal())
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
