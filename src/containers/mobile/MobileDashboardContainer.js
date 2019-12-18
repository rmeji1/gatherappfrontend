import React from 'react'
import { Grid, Button, Card, Modal, Form } from 'semantic-ui-react'
import { Widget } from 'react-chat-widget'
import { createNewEventFor, closeNewEventModal } from '../../redux/EventActions'
import { openSideBar, closeSideBar } from '../../redux/actions'
import 'react-chat-widget/lib/styles.css'
import { connect } from 'react-redux'
import MobileSideBar from '../../subcomponents/MobileSideBar'
import { mapEventsToCardItems } from '../../Helpers/HelpFunctions'

class MobileDashboardContainer extends React.Component {
  state = {
    title: '',
    description: ''
  }

  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })
  handlGatherSubmission = () => {
    const { userId, token, closeNewEventModal, createNewEventFor } = this.props.props
    const { title, description } = this.state
    closeNewEventModal()
    createNewEventFor(userId, token, { title, description })
    this.setState({ title: '', description: '' })
  }
  
  render() {
    const { title, description } = this.state
    const { events, closeNewEventModal } = this.props.props
    return (
      <MobileSideBar>
        <Grid columns={2} stackable>
          <Grid.Column>
            <Card.Group centered items={mapEventsToCardItems(events)} />
          </Grid.Column>
        </Grid>
        <Widget fullScreenMode={false} />
        <Modal size='fullscreen' open={this.props.props.isNewEventModalShown}>
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
      </MobileSideBar>
    )
  }
}

export default MobileDashboardContainer
