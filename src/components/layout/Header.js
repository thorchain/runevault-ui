import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { Layout, Row, Col} from 'antd';

import { Context } from '../../context'

import { Center, Icon, Button, WalletAddrShort } from '../Components'

const Header = (props) => {

  const context = useContext(Context)

  return (
    <Layout.Header className="header-container" style={{backgroundColor:"#2B3947"}} >

      <Row>
        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
          <Link to="/">
            <Icon icon="runelogo" style={{width:"100"}} />
          </Link>
        </Col>

        <Col xs={16} sm={16} md={16} lg={16} xl={16}>
          <Center><span>STAKE AND EARN RUNE</span></Center>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
          <div style={{float: "right"}}>
            {context.wallet ?
              <Link to="/wallet"><WalletAddrShort /></Link>
              :
              <Link to="/wallet/unlock">
                <Button fill>
                  Connect my Wallet
                </Button>
              </Link>
            }
          </div>
        </Col>
      </Row>

  </Layout.Header>
)
}

export default Header
