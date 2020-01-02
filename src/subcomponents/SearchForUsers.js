import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const initialState = { isLoading: false, results: [], value: '' }

export class SearchForUsers extends Component {
  state = initialState

  handleResultSelect = (event, { result, value }) => {
    this.setState({ value: result.title, isLoading: true })
    console.log(this.props)
    try {
      this.props.addContactRemote(result.id)
      this.setState({ isLoading: false, value: '' })
    } catch (e) {
      console.log('error')
    }
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    setTimeout(async () => {
      const response = await fetch(`https://gatherapp-flatiron.herokuapp.com/users?query=${value}`, { headers: { Authorization: this.props.token } }) //eslint-disable-line
      const results = await response.json()
      const contacts = this.props.user.contacts.map((contact) => contact.id)
      const mappedResults = results.filter((result) => result.id !== this.props.user.id && !contacts.includes(result.id)).map((result) => ({ title: result.username, id: result.id }))
      this.setState({ isLoading: false, results: mappedResults })
    }, 1000)
  }

  render () {
    const { isLoading, value, results } = this.state
    return (
      <Search
        fluid
        size='small'
        placeholder='Find a user...'
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        results={results}
        value={value}
      />
    )
  }
}

export default SearchForUsers
