import React from 'react'
import { Link } from "react-router-dom"
import { Layout } from 'antd';

import { Icon, PillText } from '../Components'

const Header = (props) => {
  return (
    <Layout.Header className="header-container">
      <Link to="/">
        <Icon icon="logo" />
      </Link>
      <div style={{float: "right"}}>
        <PillText>
          bnba1b2c3d4g5h6a1b2c3d4g5h6
        </PillText>
      </div>
    </Layout.Header>
  )
}

export default Header
