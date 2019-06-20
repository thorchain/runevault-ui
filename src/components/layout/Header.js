import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { Layout } from 'antd';

import { Context } from '../../context'

import { Icon, Button, WalletAddress } from '../Components'

const Header = (props) => {

  const context = useContext(Context)

  return (
    <Layout.Header className="header-container">
      <Link to="/">
        <Icon icon="logo" />
      </Link>
      <div style={{float: "right"}}>
        {context.wallet ? 
        <WalletAddress />
            :
            <Link to="/wallet/unlock">
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
