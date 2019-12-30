import React, { useState } from 'react'
import { Modal, Form, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addToEventsList } from '../redux/EventActions'

const TimeModal = ({ open, onClose, yelpItem, token, addToEventsList, eventId }) => {
  const [startTime, setStartTime] = useState('17:00')
  const [endTime, setEndTime] = useState('20:00')
  return (
    <Modal open={open}>
      <Modal.Header>Please enter time frame</Modal.Header>
      <Modal.Content>
        <Form loading={false}>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Start time</label>
              <input type='time' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>End time</label>
              <input type='time' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => onClose()}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button
          color='green'
          onClick={(event) => {
            addToEventsList(yelpItem, startTime, endTime, eventId, token)
            onClose()
          }}
        >
          <Icon name='checkmark' /> Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const mapStateToProps = (state, otherProps) => ({
  ...otherProps,
  token: state.authProps.token,
  yelpItems: state.yelpItems
})
export default connect(mapStateToProps, { addToEventsList })(TimeModal)
