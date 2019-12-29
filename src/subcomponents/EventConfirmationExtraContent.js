import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import { confirmEvent } from '../redux/EventActions'
import { connect } from 'react-redux'

const EventConfirmationExtraContent = ({ inviteId, confirmEvent }) => {
  return (
    <Grid container columns={2}>
      <Grid.Column textAlign='center'>
        <Icon bordered name='checkmark' color='green' onClick={() => confirmEvent(true, inviteId)} />
      </Grid.Column>
      <Grid.Column textAlign='center'>
        <Icon bordered name='x' color='red' onClick={() => confirmEvent(false, inviteId)} />
      </Grid.Column>
    </Grid>
  )
}

export default connect(null, { confirmEvent })(EventConfirmationExtraContent)
