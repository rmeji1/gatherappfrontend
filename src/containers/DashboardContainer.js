import React from 'react'
import MobileDashboardContainer from './MobileDashboardContainer'
import { fetchEventsFor } from '../redux/EventActions'
import { connect } from 'react-redux'

class DashboardContainer extends React.Component {
  componentDidMount () {
    this.props.fetchEventsFor(this.props.userId, this.props.token)
  }

  render () {
    return (
      <ResponsiveContainer>
        Hello from the dash!
      </ResponsiveContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    userId: state.authProps.user_id,
    token: state.authProps.token
  }
}

export default connect(mapStateToProps, { fetchEventsFor })(DashboardContainer)

const ResponsiveContainer = ({ children }) => (
  <div>
    <MobileDashboardContainer>{children}</MobileDashboardContainer>
    {/* <>{children}</> */}
  </div>
)
