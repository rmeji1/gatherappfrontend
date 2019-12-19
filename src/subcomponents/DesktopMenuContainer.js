import React from 'react'
import { Container, Menu, Responsive } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { openNewEventModal } from '../redux/EventActions'
import { openAddContactModal } from '../redux/ContactActions'

const DesktopMenuContainer = (props) => {
  console.log(Responsive.onlyMobile.minWidth)
  console.log(Responsive.onlyMobile.maxWidth)
  
  console.log(Responsive.onlyTablet.minWidth)
  console.log(Responsive.onlyTablet.maxWidth)

  console.log(Responsive.onlyComputer.minWidth)
  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Container fluid>
        <Menu id='login-menu'>
          <Menu.Item header as={Link} to='/' content='Gather' />
          <Menu.Menu position='right'>
            <Menu.Item name='Dashboard' as={NavLink} to='/dashboard'></Menu.Item>
            <Menu.Item name='add event' onClick={() => props.openNewEventModal()}></Menu.Item>
            <Menu.Item name='my contacts' onClick={() => props.openAddContactModal()} />
            <Menu.Item name='Log out'></Menu.Item>
          </Menu.Menu>
        </Menu>
        <Container>
          {props.children}
        </Container>
      </Container>
    </Responsive>
  )
}

const mapStateToProps = (state) => ({
  isContactModalHidden: state.isContactModalHidden
})

const mapDispatchToProps = (dispatch) => ({
  openAddContactModal: () => dispatch(openAddContactModal()),
  openNewEventModal: () => dispatch(openNewEventModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(DesktopMenuContainer)

const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}