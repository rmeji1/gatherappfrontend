import React from 'react'
import { Container, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { isLoginView } from '../redux/actions'
import { connect } from 'react-redux'

const HomepageHeading = ({ mobile, isLoginView }) => (
  <Container text>
    <Header
      as='h1'
      content='Let us Gather.'
      inverted
      className='homepage-header1'
    />
    <Header
      as='h2'
      content='Making it convienent to link.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em'
      }}
    />
    <Link to='/signup'><Button size='huge' secondary onClick={() => isLoginView(false)} content='Sign Up' /></Link>
    <Link to='/login'><Button size='huge' primary onClick={() => isLoginView(true)}>Login</Button></Link>
  </Container>
)

export default connect(null, { isLoginView })(HomepageHeading)
