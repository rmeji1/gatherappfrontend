import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Sidebar, Responsive, Menu, Container, Icon, Grid, Segment, Button, Card, Visibility, Modal, Form } from 'semantic-ui-react'
import { Widget } from 'react-chat-widget'
import { createNewEventFor, closeNewEventModal } from '../redux/EventActions'
import { openSideBar, closeSideBar } from '../redux/actions'
import 'react-chat-widget/lib/styles.css'
import { connect } from 'react-redux'
import MobileSideBar from './MobileSideBar'

class MobileDashboardContainer extends React.Component {
  state = {
    title: '',
    description: ''
  }

  items = (events) => events.map((event) => ({
    header: event.title,
    description: event.description,
    meta: `Created by: ${event.creator_name}`,
    fluid: true,
    as: Link,
    to: `/event/${event.id}`
  }))

  setHiddenSidebar = (isHiddenSidebar) => this.setState({ isHiddenSidebar })
  handleChange = (event) => this.setState({ [event.target.name]: event.target.value })
  handlGatherSubmission = (event) => {
    const { userId, token, createNewEventFor, closeNewEventModal } = this.props
    const { title, description } = this.state
    this.props.closeNewEventModal()
    this.props.createNewEventFor(userId, token, { title, description })
    this.setState({ title: '', description: '' })
  }

  render() {
    const { items } = this
    const { title, description } = this.state
    const { events, openSideBar, closeNewEventModal } = this.props
    return (
      <MobileSideBar>
        <Container style={{ minHeight: '95vh' }}>
          <Menu>
            <Link to='/'><Menu.Item header content='Gather' /></Link>
            <Menu.Item position='right' onClick={() => openSideBar()}>
              <Icon name='sidebar' />
            </Menu.Item>
          </Menu>
          <Grid columns={2} stackable>
            <Grid.Column>
              <Card.Group centered items={items(events)} />
            </Grid.Column>
          </Grid>
        </Container>
        <Widget fullScreenMode={false} />
        <Modal size='fullscreen' open={this.props.isNewEventModalShown}>
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

const mapStateToProps = (state) => {
  return {
    userId: state.authProps.user_id,
    token: state.authProps.token,
    events: state.events,
    isNewEventModalShown: state.isNewEventModalShown
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewEventFor: (userId, token, event) => dispatch(createNewEventFor(userId, token, event)),
    openSideBar: () => dispatch(openSideBar()),
    closeSideBar: () => dispatch(closeSideBar()),
    closeNewEventModal: () => {
      dispatch(closeNewEventModal())
      dispatch(closeSideBar())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MobileDashboardContainer)
