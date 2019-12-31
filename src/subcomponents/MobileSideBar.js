import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { closeSideBar, openSideBar } from '../redux/actions'
import { Responsive, Sidebar, Menu, Container, Icon, Portal, Segment, Card, Label } from 'semantic-ui-react'
import { openNewEventModal } from '../redux/EventActions'
import { openAddContactModal } from '../redux/ContactActions'

const MobileSideBar = ({ isHidden, dispatch, children, invitations }) => {
  const invites = invitations.filter(invite => invite.confirmed === null)
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
        <Portal
          closeOnPortalMouseLeave
          openOnTriggerClick
          trigger={
            <Menu.Item name='Invitations'>
              Invitations
              {invites.length !== 0 ? <Label attached='top right' color='blue' circular content={invites.length} /> : null}
            </Menu.Item>
          }
        >
          <Segment className='invitations-segment' style={{ height: '80vh', width: '100vw', right: '0px' }}>
            {/* <Card.Group items={mapInvitationsToCardItems(props.invitations.filter(invite => invite.confirmed === null))} /> */}
          </Segment>
        </Portal>
        <Menu.Item content='New Gathering' onClick={() => dispatch(openNewEventModal())} />
        <Menu.Item name='my contacts' onClick={() => dispatch(openAddContactModal())} />
        
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
  isHidden: state.isHiddenSidebar,
  invitations: state.invitations
})

const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

export default connect(mapStateToProps)(MobileSideBar)
