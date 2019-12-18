import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Search, Grid, Card, Responsive } from 'semantic-ui-react'
import categories from '../containers/categories.json'
import { mapYelpToCardItems } from '../Helpers/HelpFunctions'
import { updateYelpItemsThunk } from '../redux/EventActions'

const initialState = { isLoading: false, results: [], value: '' }

class SearchExampleCategory extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => {
    if (this.state.value !== result.title){
      this.setState({ value: result.title })
      
      const offset = 0
      const location = 'Brooklyn, NY'
      this.props.updateYelpItemsThunk(result.alias, offset, location)
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
        results: _.filter(categories, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid stackable centered>
        <Grid.Row centered stretched>
        <Grid.Column >
          <Search
            aligned='right'
            size='large'
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <Grid.Column float='left'>
        <Responsive getWidth={getWidth} maxWidth={Responsive.onlyTablet.minWidth} >
          <Card.Group items={mapYelpToCardItems(this.props.items)} />
          </Responsive>
        </Grid.Column>
        </Grid.Row>
       
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.yelpItems
})

export default connect(mapStateToProps, { updateYelpItemsThunk })(SearchExampleCategory)

const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}