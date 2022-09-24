import { debounce } from 'lodash'
import React, { Component } from 'react'

import './SearchBar.css'

export default class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      searchValue: '',
    }
    this.searchDebounce = debounce((value) => {
      if (value) this.props.searchFn(value)
    }, 500)
  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value })
    this.searchDebounce(event.target.value)
  }
  render() {
    return (
      <input
        className="search-bar"
        placeholder="Type to search..."
        value={this.state.searchValue}
        onChange={this.handleChange.bind(this)}
      />
    )
  }
}
