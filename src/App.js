import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import AuthContainer from './AuthContainer'
import LandingContainer from './LandingContainer'
import { Switch, Route } from 'react-router-dom'
function App ({ userId }) {
  return (
    <>
      <Switch>
        <Route exact path='/signup' component={AuthContainer} />
        <Route exact path='/login' component={AuthContainer} />
        <Route exact path='/' component={LandingContainer} />
      </Switch>
    </>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.userId,
    userToken: state.userToken
  }
}

export default connect(mapStateToProps)(App)
