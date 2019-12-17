import React from 'react';
import { connect } from 'react-redux'
import { closeSideBar } from '../redux/actions'
import { Responsive, Sidebar, Menu } from 'semantic-ui-react'
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
        <Menu.Item content='Dashboard' active />
        <Menu.Item content='New Gathering' onClick={() => dispatch(openNewEventModal())} />
        <Menu.Item onClick={() => console.log('pressed logout')} content='Log Out' />
      </Sidebar>
      <Sidebar.Pusher dimmed={!isHidden}>
        {children}
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
