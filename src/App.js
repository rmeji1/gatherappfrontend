import React, { useEffect } from 'react'
import './App.css'
import { connect } from 'react-redux'
import AuthContainer from './AuthContainer'
import LandingContainer from './LandingContainer'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './subcomponents/PrivateRoute'
import DashboardContainer from './containers/parents/DashboardContainer'
import EventContainer from './containers/parents/EventContainer'
import { showUser } from './redux/userActionCreator'

function App ({ userId, showUser, userToken, shouldShowUser }) {
  useEffect(() => {
    showUser(userId, userToken)
  }, [shouldShowUser, showUser, userToken, userId])
  return (
    <>
      <Switch>
        <Route exact path='/signup' component={AuthContainer} />
        <Route exact path='/login' component={AuthContainer} />
        <Route exact path='/' component={LandingContainer} />
        <PrivateRoute path='/dashboard'><DashboardContainer /></PrivateRoute>
        <PrivateRoute path='/event/:id'><EventContainer /></PrivateRoute>
      </Switch>
    </>
  )
}

const mapStateToProps = state => {
  const { authProps } = state
  return {
    userId: authProps ? authProps.user_id : null,
    userToken: authProps ? authProps.token : null,
    shouldShowUser: !state.user
  }
}

export default connect(mapStateToProps, { showUser })(App)
