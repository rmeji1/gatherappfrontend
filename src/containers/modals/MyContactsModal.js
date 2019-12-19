import React from 'react'
import { Modal, Grid, Card, Button } from 'semantic-ui-react'
import SearchForUsers from '../../subcomponents/SearchForUsers'

const MyContactsModal = (props) =>
  <Modal size='small' open={!props.isContactModalHidden}>
    <Modal.Header>
      <Grid columns={2} stackable>
        <Grid.Column textAlign='left' width={9} verticalAlign='middle'>
          My Contacts
        </Grid.Column>
        <Grid.Column textAlign='right' width={7}>
          <SearchForUsers
            addContactRemote={(userId) => props.addContactRemote(userId, props.userId, props.token)}
          />
        </Grid.Column>
      </Grid>
    </Modal.Header>
    <Modal.Content scrolling>
      <Card.Group items={props.contacts} />
    </Modal.Content>
    <Modal.Actions>
      <Button color='red' onClick={() => props.closeAddContactModal()}>
        Close
      </Button>
    </Modal.Actions>
  </Modal>

export default MyContactsModal
