import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { Layout, Row, Col} from 'antd';

import Breakpoint from 'react-socks';

import { Context } from '../../context'

import { Center, Icon, Button, WalletAddrShort } from '../Components'

const Header = (props) => {

  const context = useContext(Context)

  const styles = {
    position: 'fixed',
    zIndex: 1,
    width: '100%',
    backgroundColor:"#2B3947",
  }

  return (

        <Layout.Header className="header-container" style={styles} >
          <Row>
            <Breakpoint medium up>
            <Col xs={12} sm={8} md={4}>
              <Link to="/">
                <Icon icon="runelogo" style={{width:"100"}} />
              </Link>
            </Col>
            </Breakpoint>

            <Breakpoint small down>
            <Col xs={8}>
              <Link to="/">
                <Icon icon="runelogo" style={{width:"80"}} />
              </Link>
            </Col>
            </Breakpoint>

            <Breakpoint medium up>
            <Col sm={8} md={16}>
              <Center><span>STAKE AND EARN RUNE</span></Center>
            </Col>
            </Breakpoint>

          

            <Breakpoint medium up>
            <Col xs={12} sm={8} md={4}>
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
            </Breakpoint>

          </Row>
      </Layout.Header>



)
}

export default Header
