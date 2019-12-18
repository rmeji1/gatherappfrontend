import React from 'react'
import { Route, Redirect } from 'react-router'
import { isLoginView } from '../redux/actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  const { authProps } = state
  return {
    userId: authProps ? authProps.user_id : null,
    userToken: authProps ? authProps.token : null
  }
}

const redirectToLoginView = (location) => {
  return <Redirect to={{ pathname: '/login', state: { from: location } }} />
}

const PrivateRoute = ({ children, userId, userToken, dispatch, ...rest }) => {
  dispatch(isLoginView(true))
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userToken && userId ? children : redirectToLoginView(location)}
    />
  )
}
export default connect(mapStateToProps)(PrivateRoute)
