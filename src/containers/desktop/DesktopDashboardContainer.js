import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import { mapEventsToCardItems } from '../../Helpers/HelpFunctions'
import DesktopMenuContainer from '../../subcomponents/DesktopMenuContainer'
import MyContactsModal from '../modals/MyContactsModal'
import NewEventModal from '../modals/NewEventModal'

export class DesktopDashboardContainer extends Component {
  state = {
    title: '',
    description: ''
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
    const { isNewEventModalShown, closeNewEventModal, closeAddContactModal, isContactModalHidden, addContactRemote } = this.props
    const { title, description } = this.state
    return (
      <DesktopMenuContainer>
        <Card.Group centered itemsPerRow={4} items={mapEventsToCardItems(this.props.events)} />
        <NewEventModal
          isNewEventModalShown={isNewEventModalShown}
          title={title}
          description={description}
          closeNewEventModal={closeNewEventModal}
          onHandleChange={this.handleChange}
          onHandleGatherSubmission={this.handleGatherSubmission}
        />
        <MyContactsModal
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
