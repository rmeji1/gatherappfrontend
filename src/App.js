import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import AuthContainer from './AuthContainer'
import LandingContainer from './LandingContainer'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './subcomponents/PrivateRoute'
import DashboardContainer from './containers/parents/DashboardContainer'
import EventContainer from './containers/parents/EventContainer'
import { showUser } from './redux/UserActions'
import { subscribeUser } from './subscription'

// import { addCreatedEvent } from './redux/EventActions'
class App extends Component {
  componentDidMount () {
    if (navigator.serviceWorker) navigator.serviceWorker.addEventListener('message', this.handleMessage)
    const { userId, userToken } = this.props
    if (userId && userToken) {
      this.props.showUser()
      subscribeUser(userId)
    }
  }

  handleMessage = (event) => {
    if (event.origin !== 'http://localhost:3001') return
    const action = JSON.parse(event.data)
    console.log(action)
    const { userId } = this.props
    if (action.creator_id === userId && action.type === 'ADD_Event') this.props.dispatch(action)
    else if (action.type === 'ADD_INVITATION' && action.invitation.user_id === userId) this.props.dispatch(action)
  }

  render = () =>
    <>
      <Switch>
        <Route exact path='/signup' component={AuthContainer} />
        <Route exact path='/login' component={AuthContainer} />
        <Route exact path='/' component={LandingContainer} />
        <PrivateRoute path='/dashboard'><DashboardContainer /></PrivateRoute>
        <PrivateRoute path='/event/:id'><EventContainer /></PrivateRoute>
      </Switch>
    </>
}

const mapStateToProps = state => {
  const { authProps } = state
  return {
    userId: authProps ? authProps.user_id : null,
    userToken: authProps ? authProps.token : null
  }
}

const mapDispatchToState = dispatch => ({
  showUser: () => dispatch(showUser()),
  dispatch
})

export default connect(mapStateToProps, mapDispatchToState)(App)
