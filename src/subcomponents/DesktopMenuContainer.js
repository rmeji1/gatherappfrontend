import React from 'react'
import { Container, Menu, Responsive, Image } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/actions'
import { openNewEventModal } from '../redux/EventActions'
import { openAddContactModal } from '../redux/ContactActions'

const DesktopMenuContainer = props =>
  <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
    <Container fluid>
      <Menu id='login-menu'>
        <Menu.Item header as={Link} to='/'><Image src='/logo_without.png' size='mini' /> </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item name='Dashboard' as={NavLink} to='/dashboard'></Menu.Item>
          <Menu.Item name='add event' onClick={() => props.openNewEventModal()}></Menu.Item>
          <Menu.Item name='my contacts' onClick={() => props.openAddContactModal()} />
          <Menu.Item name='Log out' onClick={()=> props.logout()} ></Menu.Item>
        </Menu.Menu>
      </Menu>
      <Container>
        {props.children}
      </Container>
    </Container>
  </Responsive>

const mapStateToProps = (state) => ({
  isContactModalHidden: state.isContactModalHidden
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  openAddContactModal: () => dispatch(openAddContactModal()),
  openNewEventModal: () => dispatch(openNewEventModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(DesktopMenuContainer)

const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}
