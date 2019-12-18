import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Segment, Grid, Card, Header } from 'semantic-ui-react'
import DesktopMenuContainer from '../../subcomponents/DesktopMenuContainer'
import SearchCategory from '../../subcomponents/SearchCategory'
import { mapYelpToCardItems, mapEventToCard } from '../../Helpers/HelpFunctions'

export class DesktopEventContainer extends Component {
  render () {
    const { id } = this.props.match.params
    const { events } = this.props
    const event = events.find(event => parseInt(event.id) === parseInt(id))
    if (!event) return null
    const cardInfo = mapEventToCard(event)
    return (
      <DesktopMenuContainer>
        <Grid columns={3} divided centered textAlign='center'>
          <Grid.Row>
            <Grid.Column width={3}>
              <Segment.Group>
                <Segment>
                  <Card
                    header={cardInfo.header}
                    description={cardInfo.description}
                    meta={cardInfo.meta}
                    fluid={cardInfo.fluid}
                  />
                </Segment>
                <Segment textAlign='center'>
                  <Header as='h3' content='Gather I.L.' />
                </Segment>
              </Segment.Group>
            </Grid.Column>
            <Grid.Column width={10}>
              <Segment.Group raised>
                <Segment>
                  <SearchCategory />
                </Segment>
                <Segment>
                  <Card.Group itemsPerRow={3} items={mapYelpToCardItems(this.props.yelpItems)} />
                </Segment>
              </Segment.Group>
            </Grid.Column>
            <Grid.Column width={3}>
              <Segment.Group>
                <Segment textAlign='center'>
                  <Header as='h3' content='Gather I.T' />
                </Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </DesktopMenuContainer>

    )
  }
}
const mapStateToProps = (state) => ({
  yelpItems: state.yelpItems,
  events: state.events
})

export default withRouter(connect(mapStateToProps)(DesktopEventContainer))
