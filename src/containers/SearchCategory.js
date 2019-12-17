import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Card } from 'semantic-ui-react'
import categories from '../containers/categories.json'
import { mapYelpToCardItems } from '../Helpers/HelpFunctions'
const initialState = { isLoading: false, results: [], value: '', items:[] }

export default class SearchExampleCategory extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title })
    const offset = 0
    const limit = 10
    const categories = result.alias
    const location = 'Brooklyn, NY'
    fetch(`http://localhost:3000/yelp/index?offset=${offset}&limit=${limit}&categories=${categories}&location=${location}`, {
      headers: {offset, limit, categories, location}
    })
    .then(response => response.json())
    .then(items => console.log(items) || this.setState({ items: mapYelpToCardItems(items)}))  
    console.log(result)
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
        <Grid.Column width={8} float='right'>
          <Search
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
        <Grid.Column width={8} float='left'>
            <Card.Group items={this.state.items} />
        </Grid.Column>
      </Grid>
    )
  }
}
