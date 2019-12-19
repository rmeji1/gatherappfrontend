import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Search } from 'semantic-ui-react'
import _ from 'lodash'

const initialState = { isLoading: false, results: [], value: '' }

export class SearchForUsers extends Component {
  state = initialState

  handleResultSelect = (event, { result, value }) => {
    this.setState({ value: result.title, isLoading: true })
    try {
      this.props.addContactRemote(result.id)
      this.setState({ isLoading: false, value: '' })
    } catch (e) {
      console.log('error')
    }
  }

  handleSearchChange = (e, { value }) => {
    console.log(this.props.user)
    this.setState({ isLoading: true, value })
    setTimeout(async () => {
      const response = await fetch(`http://localhost:3000/users?query=${value}`, { headers: { "Authorization": this.props.token } })
      const results = await response.json()
      const contacts = this.props.user.contacts.map((contact) => contact.id)
      const mappedResults = results.filter((result) => result.id !== this.props.user.id && !contacts.includes(result.id)).map((result) => ({ title: result.username, id: result.id }))
      this.setState({ isLoading: false, results: mappedResults })
    }, 300)
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
          leading: true,
        })}
        results={results}
        value={value}
        {...this.props}
      />
    )
  }
}


export default connect((state) => ({ token: state.authProps.token, user: state.user }))(SearchForUsers)
