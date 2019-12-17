import React from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
const EventContainer = ({ events }) => {
  const { id } = useParams()
  const event = events.find(event => parseInt(event.id) === parseInt(id))
  return (
    <div>
      {event.title}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    events: state.events
  }
}
export default connect(mapStateToProps)(EventContainer)
