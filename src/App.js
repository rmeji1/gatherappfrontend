import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import AuthContainer from './AuthContainer'
import LandingContainer from './LandingContainer'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './containers/PrivateRoute'
import DashboardContainer from './containers/DashboardContainer'
import EventContainer from './containers/EventContainer'
function App ({ userId }) {
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
    userToken: authProps ? authProps.token : null
  }
}

export default connect(mapStateToProps)(App)
