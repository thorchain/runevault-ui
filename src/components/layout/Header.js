import React from 'react'
import { Layout } from 'antd';

import Image from '../Image'

const Header = (props) => {
  return (
    <Layout.Header className="header-container">
      <Image img="logo" />
    </Layout.Header>
  )
}

export default Header
