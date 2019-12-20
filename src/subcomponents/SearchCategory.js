import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Search, Grid, Card, Responsive } from 'semantic-ui-react'
import categories from '../containers/categories.json'
import { mapYelpToCardItems } from '../Helpers/HelpFunctions'
import { updateYelpItemsThunk } from '../redux/EventActions'

const initialState = { isLoading: false, results: [], value: '', alias: '' }

class SearchExampleCategory extends Component {
  state = initialState // eslint-disable-line

  componentDidUpdate (prevProps, prevState) {
    if (this.props.activePage !== prevProps.activePage) {
      const location = 'Brooklyn, NY'
      console.log(this.state.value)
      this.props.updateYelpItemsThunk(this.state.alias, (this.props.activePage - 1) * 12, location)
    }
  }

  handleResultSelect = (e, { result }) => {
    if (this.state.value !== result.alias) {
      this.setState({ value: result.title, alias: result.alias })
      const location = 'Brooklyn, NY'
      this.props.updateYelpItemsThunk(result.alias, (this.props.activePage - 1) * 12, location)
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
      <Grid stackable>
        <Grid.Row stretched>
          <Grid.Column width='16' textAlign='right'>
            <Search
              size={this.props.size}
              loading={isLoading}
              onResultSelect={(event, result) => this.handleResultSelect(event, result)}
              onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true
              })}
              results={results}
              value={value}
            />
            {/*...this.props https://reactjs.org/warnings/unknown-prop.html*/}
          </Grid.Column>
          <Grid.Column float='left'>
            <Responsive getWidth={getWidth} maxWidth={430}>
              <Card.Group items={mapYelpToCardItems(this.props.items)} />
            </Responsive>
            <Responsive getWidth={getWidth} minWidth={431} maxWidth={Responsive.onlyMobile.maxWidth}>
              <Card.Group itemsPerRow={2} items={mapYelpToCardItems(this.props.items)} />
            </Responsive>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  items: state.yelpItems,
  activePage: state.activePage
})

const mapDispatchToProps = (dispatch) => ({
  updateYelpItemsThunk: (value, offset, location) => dispatch(updateYelpItemsThunk(value, offset, location))
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchExampleCategory)

const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}
