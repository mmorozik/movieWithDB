import React, { Component } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import './Spiner.css'

export default class Spiner extends Component {
  render() {
    const antIcon = (
      <LoadingOutlined
        style={{
          fontSize: 300,
        }}
        spin
      />
    )
    return (
      <div className="spiner">
        <Spin indicator={antIcon} />
      </div>
    )
  }
}
