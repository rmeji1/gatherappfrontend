import React from 'react'
import { Button } from 'semantic-ui-react'

const LoginButton = ({ isLogin, onHandleSubmit }) => {
  return (
    <Button primary fluid size='large' onClick={onHandleSubmit} content={isLogin ? 'Login' : 'Signup'} />
  )
}

export default LoginButton
