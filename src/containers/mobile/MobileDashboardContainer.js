import React from 'react'
import { Grid, Card } from 'semantic-ui-react'
import { Widget } from 'react-chat-widget'
import 'react-chat-widget/lib/styles.css'
import MobileSideBar from '../../subcomponents/MobileSideBar'
import { mapEventsToCardItems } from '../../Helpers/HelpFunctions'
import NewEventModal from '../modals/NewEventModal'
import MyContactsModal from '../modals/MyContactsModal'

class MobileDashboardContainer extends React.Component {
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
    const { title, description } = this.state
    const { events, isNewEventModalShown, closeNewEventModal, closeAddContactModal, isContactModalHidden, addContactRemote, user, token } = this.props

    return (
      <MobileSideBar>
        <Grid columns={2} stackable>
          <Grid.Column>
            <Card.Group centered items={mapEventsToCardItems(events)} />
          </Grid.Column>
        </Grid>
        <Widget fullScreenMode={false} />
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
          token={token}
          isContactModalHidden={isContactModalHidden}
          addContactRemote={addContactRemote}
          contacts={this.contactsIfNullOrEmpty()}
          closeAddContactModal={closeAddContactModal}
        />
        {/* <MyContactsModal isContactModalHidden={isContactModalHidden} addContactRemote={addContactRemote} contacts={this.contactsIfNullOrEmpty()} closeAddContactModal={closeAddContactModal} /> */}

      </MobileSideBar>
    )
  }
}

export default MobileDashboardContainer
