import React from 'react'
import { Container, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { isLoginView } from '../redux/actions'
import { connect } from 'react-redux'

const HomepageHeading = ({ mobile, isLoginView }) => (
  <Container text>
    <Header
      as='h1'
      content="Let's Gather."
      inverted
      className='homepage-header1'
    />
    <Header
      as='h2'
      className='homepage-header2'
      content='Making it convienent to link.'
      inverted
    />
    <Link to='/signup'><Button size='huge' primary onClick={() => isLoginView(false)} content='Sign Up' /></Link>
    <Link to='/login'><Button size='huge' color='grey' onClick={() => isLoginView(true)}>Login</Button></Link>
  </Container>
)

export default connect(null, { isLoginView })(HomepageHeading)
