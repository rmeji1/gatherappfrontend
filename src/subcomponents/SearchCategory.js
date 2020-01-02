import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Search, Grid, Card, Responsive, Pagination } from 'semantic-ui-react'
import categories from '../containers/categories.json'
import { mapYelpToCardItems } from '../Helpers/HelpFunctions'
import { updateYelpItemsThunk, changeActivePageTo } from '../redux/EventActions'
import TimeModal from './TimeModal'

const initialState = { isLoading: false, results: [], value: '', alias: '', isVisible: false, yelpId: '' }
const onPageChange = (event, { activePage }, changeActivePageTo) => {
  changeActivePageTo(activePage)
  console.log(activePage)
}

class SearchExampleCategory extends Component {
  state = initialState // eslint-disable-line

  setVisible = (isVisible) => this.setState({ isVisible })
  setYelpId = (yelpId) => this.setState({ yelpId })

  componentDidUpdate (prevProps, prevState) {
    if (this.props.activePage !== prevProps.activePage) {
      const location = 'Brooklyn, NY'
      console.log(this.state.value)
      this.props.updateYelpItemsThunk(this.state.alias, (this.props.activePage - 1) * 12, location, this.props.token)
    }
  }

  handleResultSelect = (e, { result }) => {
    if (this.state.value !== result.alias) {
      this.setState({ value: result.title, alias: result.alias })
      const location = 'Brooklyn, NY'
      this.props.updateYelpItemsThunk(result.alias, (this.props.activePage - 1) * 12, location, this.props.token)
    }
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.alias)

      this.setState({
        isLoading: false,
        results: _.filter(categories, isMatch)
      })
    }, 300)
  }

  render () {
    const { isLoading, value, results } = this.state

    return (
      <>
        <Grid stackable>
          <Grid.Row stretched>
            <Grid.Column width='16' textAlign='center'>
              <Search
                aligned='right'
                size={this.props.size}
                loading={isLoading}
                onResultSelect={(event, result) => this.handleResultSelect(event, result)}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                results={results}
                value={value}
              />
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Grid.Column verticalAlign='middle' width={8}>
              <Responsive maxWidth={767}>
                  <Pagination
                    boundaryRange={0}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1}
                    totalPages={this.props.yelpItemsTotalCount / 12}
                    onPageChange={(event, data) => onPageChange(event, data, this.props.changeActivePageTo)}
                  />
                </Responsive>
              </Grid.Column>
            </Grid.Column>

            <Grid.Column float='left'>
              <Responsive getWidth={getWidth} maxWidth={430}>
                <Card.Group
                  items={mapYelpToCardItems(this.props.items, (yelpId) => {
                    this.setYelpId(yelpId)
                    this.setVisible(true)
                  })}
                />
              </Responsive>
              <Responsive getWidth={getWidth} minWidth={431} maxWidth={Responsive.onlyMobile.maxWidth}>
                <Card.Group
                  itemsPerRow={2}
                  items={mapYelpToCardItems(this.props.items, (yelpId) => {
                    this.setYelpId(yelpId)
                    this.setVisible(true)
                  })}
                />
              </Responsive>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <TimeModal
          open={this.state.isVisible}
          onClose={() => this.setVisible(false)}
          yelpItem={this.props.items.find((item) => item.id === this.state.yelpId)}
          eventId={this.props.id}
        />
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  items: state.yelpItems,
  activePage: state.activePage,
  token: state.authProps.token,
  yelpItemsTotalCount: state.yelpItemsTotalCount
})

const mapDispatchToProps = (dispatch) => ({
  updateYelpItemsThunk: (value, offset, location, token) => dispatch(updateYelpItemsThunk(value, offset, location, token)),
  changeActivePageTo: (newPage) => dispatch(changeActivePageTo(newPage))
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchExampleCategory)

const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}
