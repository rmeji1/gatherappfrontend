import React from 'react'
import { Grid, Card } from 'semantic-ui-react'
import 'react-chat-widget/lib/styles.css'
import MobileSideBar from '../../subcomponents/MobileSideBar'
import { mapEventsToCardItems } from '../../Helpers/HelpFunctions'

class MobileDashboardContainer extends React.Component {
  render () {
    return (
      <MobileSideBar>
        <Grid columns={2} stackable>
          <Grid.Column>
            <Card.Group centered items={mapEventsToCardItems(this.props.events)} />
          </Grid.Column>
        </Grid>
      </MobileSideBar>
    )
  }
}

export default MobileDashboardContainer
