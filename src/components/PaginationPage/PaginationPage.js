import { Pagination } from 'antd'
import React, { Component } from 'react'

import './PaginationPage.css'

export default class PaginationPage extends Component {
  constructor() {
    super()
    this.state = {
      current: 1,
    }
    this.onChange = (page) => {
      this.setState(() => {
        return {
          current: page,
        }
      })
      this.props.onPage(page)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pageNumber !== this.props.pageNumber) {
      this.setState(() => {
        return {
          current: +this.props.pageNumber,
        }
      })
    }
  }
  render() {
    let { totalPages } = this.props
    totalPages = totalPages * 10
    return (
      <Pagination
        defaultCurrent={1}
        className="pagination"
        current={this.state.current}
        onChange={this.onChange}
        total={totalPages}
        showSizeChanger={false}
      />
    )
  }
}
