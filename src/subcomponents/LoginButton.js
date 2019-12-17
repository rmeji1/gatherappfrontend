import React from 'react'
import { Button } from 'semantic-ui-react'

const LoginButton = ({ isLogin, handleSubmit }) => {
  return (
    <Button primary fluid size='large' onClick={handleSubmit} content={isLogin ? 'Login' : 'Signup'} />
  )
}

export default LoginButton
