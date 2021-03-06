import React, { Component } from 'react'
import { Responsive, Sidebar, Menu, Segment, Container, Icon } from 'semantic-ui-react'
import HomepageHeading from '../../subcomponents/HomepageHeading'
import { Link } from 'react-router-dom'
const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render () {
    const { children } = this.props
    const { sidebarOpened } = this.state

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
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        />

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            className='background-image-set'
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Link to='/'><Menu.Item header content='Gather' /></Link>
                <Menu.Item position='right' onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}
export default MobileContainer
