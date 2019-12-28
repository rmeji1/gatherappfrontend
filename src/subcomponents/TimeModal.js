import React from 'react'
import { Modal } from 'semantic-ui-react'
const TimeModal = ({ open, onClose }) => {
  return (
    <Modal open={open}>
      <Modal.Header>Please enter time frame</Modal.Header>
      <Modal.Content>
        <div class="ui calendar" id="example1">
          <div class="ui input left icon">
            <i class="calendar icon" />
            <input type="text" placeholder="Date/Time" onFocus={() => document.querySelector('#example1').calendar()} />
          </div>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default TimeModal
