import React from 'react'
import { Responsive, Pagination, Grid } from 'semantic-ui-react'
import DesktopMenuContainer from '../../subcomponents/DesktopMenuContainer'
import { mapEventToCard } from '../../Helpers/HelpFunctions'
import { OnlyTabletGrid } from '../tablet/OnlyTabletGrid'
import { OnlyDesktopGrid } from './OnlyDesktopGrid'

const onPageChange = (event, { activePage }, changeActivePageTo) => {
  changeActivePageTo(activePage)
  console.log(activePage)
}
const DesktopEventContainer = (props) => {
  const { id } = props.match.params
  const { events, contacts, yelpItems } = props
  const event = events.find(event => parseInt(event.id) === parseInt(id))
  if (!event) return null
  const cardInfo = mapEventToCard(event)

  return (
    <DesktopMenuContainer>
      <Grid centered>
        <Grid.Column verticalAlign='middle' width={8}>
          <Pagination
            boundaryRange={0}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={props.yelpItemsTotalCount / 12}
            onPageChange={(event, data) => onPageChange(event, data, props.changeActivePageTo)}
          />
        </Grid.Column>
      </Grid>

      <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
        {console.log(event)}
        <OnlyTabletGrid
          cardInfo={cardInfo}
          contacts={contacts}
          yelpItems={yelpItems}
          id={event.id}
          invitees={event.invitations.map(invite => invite.user_id)}
        />
      </Responsive>
      <Responsive minWidth={Responsive.onlyComputer.minWidth}>
        <OnlyDesktopGrid
          cardInfo={cardInfo}
          contacts={contacts}
          yelpItems={yelpItems}
          id={event.id}
          invitees={event.invitations.map(invite => invite.user_id)}
        />
      </Responsive>
    </DesktopMenuContainer>
  )
}

export default DesktopEventContainer
