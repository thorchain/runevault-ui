import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { Layout } from 'antd';

import { Context } from '../../context'

import { Icon, Button, PillText } from '../Components'

const Header = (props) => {

  const context = window.context = useContext(Context)

  return (
    <Layout.Header className="header-container">
      <Link to="/">
        <Icon icon="logo" />
      </Link>
      <div style={{float: "right"}}>
        {context.wallet ? 
        <PillText>
          bnba1b2c3d4g5h6a1b2c3d4g5h6
        </PillText>
            :
            <Link to="/wallet">
              <Button>
                Connect Wallet
              </Button>
            </Link>
        }
      </div>
    </Layout.Header>
  )
}

export default Header
