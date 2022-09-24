import React from 'react'
import { WifiOutlined } from '@ant-design/icons'

import './OfflinePage.css'

const OfflinePage = () => {
  return (
    <div className="offline-page">
      <div className="offline-page__content">
        <WifiOutlined style={{ fontSize: 200, color: 'gray' }} className="icon" />
        <h1>Нет подключения к сети.</h1>
      </div>
    </div>
  )
}

export default OfflinePage
