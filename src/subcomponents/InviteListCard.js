import React from 'react'
import { Card, Grid, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { inviteUser } from '../redux/actions'

const InviteListCard = ({ contacts, inviteUser, eventId, invitees, token }) => {
  console.log(invitees)
  return (
    <Card.Group>
      {contacts.map(contact => (
        <Card textAlign='left' key={contact.username} onClick={() => inviteUser(eventId, contact.id, token)}>
          <Card.Content>
            <Card.Header>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={10}>
                    {contact.username}
                  </Grid.Column>
                  <Grid.Column width={2} textAlign='right'>
                    <Icon name={!invitees.includes(contact.id) ? 'square outline' : 'check square outline'} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Header>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  )
}

const mapStateToProps = (state, ownProps) => console.log(ownProps) || ({
  ...ownProps,
  token: state.authProps.token
})

export default connect(mapStateToProps, { inviteUser })(InviteListCard)
