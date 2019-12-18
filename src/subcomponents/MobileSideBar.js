import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { closeSideBar, openSideBar } from '../redux/actions'
import { Responsive, Sidebar, Menu, Container, Icon } from 'semantic-ui-react'
import { openNewEventModal } from '../redux/EventActions'

const MobileSideBar = ({ isHidden, dispatch, children }) => {
  return (
    <Responsive
      as={Sidebar.Pushable}
      getWidth={getWidth}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <Sidebar
        as={Menu}
        animation='push'
        direction='right'
        onHide={() => dispatch(closeSideBar())}
        vertical
        inverted
        visible={!isHidden}
      >
        <Menu.Item content='Dashboard' as={NavLink} to='/dashboard' />
        <Menu.Item content='New Gathering' onClick={() => dispatch(openNewEventModal())} />
        <Menu.Item onClick={() => console.log('pressed logout')} content='Log Out' />
      </Sidebar>
      <Sidebar.Pusher dimmed={!isHidden}>
        <Container style={{ minHeight: '95vh' }}>
          <Menu>
            <Link to='/'><Menu.Item header content='Gather' /></Link>
            <Menu.Item position='right' onClick={() => dispatch(openSideBar())}>
              <Icon name='sidebar' />
            </Menu.Item>
          </Menu>
          {children}
        </Container>
      </Sidebar.Pusher>
    </Responsive>
  )
}

const mapStateToProps = state => ({
  isHidden: state.isHiddenSidebar
})

const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

export default connect(mapStateToProps)(MobileSideBar)
