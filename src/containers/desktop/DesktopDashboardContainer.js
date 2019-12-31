import React, { Component } from 'react'
import { Card, Transition } from 'semantic-ui-react'
import { mapEventsToCardItems } from '../../Helpers/HelpFunctions'
import DesktopMenuContainer from '../../subcomponents/DesktopMenuContainer'
import { Link } from 'react-router-dom'
import MyContactsModal from '../modals/MyContactsModal'
import NewEventModal from '../modals/NewEventModal'
import { Widget, addResponseMessage, toggleWidget } from 'react-chat-widget'

export class DesktopDashboardContainer extends Component {
  state = {
    title: '',
    description: '',
    savedMessage: '',
    widgetOpen: false
  }

  componentDidUpdate = (prevProps, prevState) => {
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

  handleNewUserMessage = async (newMessage) => {
    const { sessionId, getSessionId, token, userId } = this.props
    try {
      if (!sessionId) { 
        this.setState({ savedMessage: newMessage }, () => getSessionId(token))
        return
      }
      const response = await fetch('http://localhost:3000/assistant/create', { //eslint-disable-line
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
          this.props.createNewEventFor(userId, token, { title, description })
        }
      })
    } catch (e) {
      if (e.need_new_session) this.setState({ savedMessage: newMessage }, () => getSessionId(token))
    }
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

  handleGatherSubmission = () => {
    const { userId, token } = this.props
    const { title, description } = this.state
    this.props.closeNewEventModal()
    this.props.createNewEventFor(userId, token, { title, description })
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

  render () {
    const { isNewEventModalShown, closeNewEventModal, closeAddContactModal, isContactModalHidden, addContactRemote, user } = this.props
    const { title, description } = this.state
    return (
      <DesktopMenuContainer>
        <Widget
          title='Your assistant'
          subtitle='Hi, I am Watson! Ask me to create an event.'
          handleNewUserMessage={this.handleNewUserMessage}  //eslint-disable-line
        />

        <Transition.Group as={Card.Group} centered itemsPerRow={4} animation='fly left'>
          {mapEventsToCardItems(this.props.events).map(event =>
            <Card fluid as={Link} to={event.to} key={`card-${event.header}`} header={event.header} description={event.description} />)}
        </Transition.Group>
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
      </DesktopMenuContainer>
    )
  }
}

export default DesktopDashboardContainer
