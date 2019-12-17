import React, { Component } from 'react'
import { createNewUser, loginUser, isLoginView } from './redux/actions'
import { connect } from 'react-redux'
import { Form, Grid, Header, Image, Message, Segment, Menu, Container, Responsive } from 'semantic-ui-react'
import LoginButton from './subcomponents/LoginButton'
import { Link, Redirect } from 'react-router-dom'

class AuthContainer extends Component{
  state = { //eslint-ignore-line
    username : '',
    password: '',
    loginMenuHeight: 0
  }

  handleOnChange = (event) => this.setState({ [event.target.name]: event.target.value })
  handleIsLoginClick = (event) => this.setState({ isLogin: !this.state.isLogin })
  handleSubmit = (event) => {
    const {username, password } = this.state
    const {isLogin} = this.props
    const {createNewUser, loginUser} = this.props
    isLogin ? loginUser({ username, password }) : createNewUser({ username, password })
  }

  render () {
    const { username, password } = this.state
    const { loginErrors, isLoginView, isLogin, userId } = this.props
    const headerMessage = "Oops! Looks like something went wrong!"
    return (
      <>
        {userId ? <Redirect to='/dashboard' /> : null} 
        <Container fluid>
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          <Menu id='login-menu'>
            <Link to='/'><Menu.Item header content="Gather" /></Link>
          </Menu>
        </Responsive>
        <Responsive minWidth={Responsive.onlyMobile.maxWidth}>
          <Menu id='login-menu'>
            <Link to='/'><Menu.Item header content="Gather" /></Link>
          </Menu>
        </Responsive>
        <Grid className='login-grid' textAlign='center' verticalAlign='middle'>
          <Grid.Column className='login-screen-grid-column'>
            <Header as='h2' textAlign='center'>
              <Image src='/logo_without.png' /> {isLogin ? 'Log-in to your account' : 'Sign up and Gather!'}
            </Header>
            <Form size='large'>
              <Segment stacked >
                {loginErrors.length > 0 ? <Message header={headerMessage} color='red' list={loginErrors} /> : null }
                <Form.Input
                  fluid
                  name='username'
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  value={username}
                  onChange={this.handleOnChange}
                />
                <Form.Input
                  fluid
                  name='password'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  value={password}
                  onChange={this.handleOnChange}
                />
                <LoginButton isLogin={isLogin} handleSubmit={this.handleSubmit}/>
              </Segment>
            </Form>
            <Message>
              {!isLogin ? 'Already have an account? ' : 'New to us? '}
              {
                isLogin ? 
                  <Link onClick={e => isLoginView(false)} to='/signup'>Sign Up</Link> : 
                  <Link to='/login' onClick={e => isLoginView(true)}>Login</Link> 
              }
            </Message>
          </Grid.Column>
        </Grid>
      </Container>
      </>
    )
  }

 
}
const mapStateToProps = (state) => {
  const {authProps, isLogin, loginErrors } = state
  return {
    userId: authProps ? authProps.user_id : null,
    userToken: authProps ? authProps.token : null,
    isLogin: isLogin,
    loginErrors: loginErrors
  }
}

export default connect(mapStateToProps, { createNewUser, loginUser, isLoginView })(AuthContainer)
