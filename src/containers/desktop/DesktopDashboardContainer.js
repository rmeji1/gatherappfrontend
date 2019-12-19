import React, { Component } from 'react'
import { Card, Modal, Form, Button, Segment, Grid } from 'semantic-ui-react'
import { mapEventsToCardItems } from '../../Helpers/HelpFunctions'
import { connect } from 'react-redux'
import DesktopMenuContainer from '../../subcomponents/DesktopMenuContainer'
import SearchForUsers from '../../subcomponents/SearchForUsers'

export class DesktopDashboardContainer extends Component {
  state = {
    title: '',
    description: ''
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })
  handlGatherSubmission = () => {
    const { userId, token } = this.props.props
    const { title, description } = this.state
    this.props.props.closeNewEventModal()
    this.props.props.createNewEventFor(userId, token, { title, description })
    this.setState({ title: '', description: '' })
  }

  contactsIfNullOrEmpty = () => {
    if (this.props.props.user) {
      if (this.props.props.user.contacts.length !== 0) {
        console.log(this.props.props.user.contacts[0].username)
        return this.props.props.user.contacts.map(contact => ({ header: contact.username }))
      }
    }
    return [{ header: 'Please use search to add...' }]
  }

  render () {
    const { isNewEventModalShown, closeNewEventModal, closeAddContactModal } = this.props.props
    const { title, description } = this.state
    return (
      <DesktopMenuContainer>
        <Card.Group centered itemsPerRow={4} items={mapEventsToCardItems(this.props.props.events)} />
        <Modal size="fullscreen" open={isNewEventModalShown}>
          <Modal.Header>New Gathering</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Input
                fluid
                label='Title'
                placeholder='Enter title'
                value={title}
                name='title'
                onChange={this.handleChange}
              />
              <Form.TextArea
                label='Description'
                name='description'
                placeholder='Enter description'
                value={description}
                onChange={this.handleChange}
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={() => closeNewEventModal()}>
              Cancel
            </Button>
            <Button primary onClick={this.handlGatherSubmission}>
              Create
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal size="fullscreen" open={!this.props.props.isContactModalHidden}>
          <Modal.Header>
            <Grid columns={2}>
              <Grid.Column textAlign='left' width={9} verticalAlign='middle'> 
                My Contacts
              </Grid.Column>
              <Grid.Column textAlign='right' width={7}>
                <SearchForUsers
                  addContactRemote={(userId) => this.props.props.addContactRemote(userId, this.props.props.userId, this.props.props.token)} 
                />
              </Grid.Column>
            </Grid>         
          </Modal.Header>
          <Modal.Content content scrolling>
            <Card.Group items={this.contactsIfNullOrEmpty()} />
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={() => closeAddContactModal()}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </DesktopMenuContainer>
    )
  }
}

export default DesktopDashboardContainer

