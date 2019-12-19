import React from 'react'
import { Modal, Form, Button } from 'semantic-ui-react'
const NewEventModal = ({ isNewEventModalShown, title, description, closeNewEventModal, onHandleChange, onHandleGatherSubmission }) =>
  <Modal size='small' open={isNewEventModalShown}>
    <Modal.Header>New Gathering</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Input
          fluid
          label='Title'
          placeholder='Enter title'
          value={title}
          name='title'
          onChange={onHandleChange}
        />
        <Form.TextArea
          label='Description'
          name='description'
          placeholder='Enter description'
          value={description}
          onChange={onHandleChange}
        />
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button color='red' onClick={() => closeNewEventModal()}>
        Cancel
      </Button>
      <Button primary onClick={onHandleGatherSubmission}>
        Create
      </Button>
    </Modal.Actions>
  </Modal>
export default NewEventModal
