import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'

const EventConfirmationExtraContent = () => {
  return (
    <Grid container columns={2}>
      <Grid.Column textAlign='center'>
        <Icon bordered name='checkmark' color='green' />
      </Grid.Column>
      <Grid.Column textAlign='center'>
        <Icon bordered name='x' color='red' />
      </Grid.Column>
    </Grid>
  )
}

export default EventConfirmationExtraContent
