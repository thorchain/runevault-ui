import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { Layout, Row, Col} from 'antd';


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
            <Col xs={24} sm={24} md={4}>
              <Link to="/">
                <Icon icon="runelogo" style={{width:"100"}} />
              </Link>
            </Col>

            <Col xs={24} sm={24} md={16}>
              <Center><span>STAKE AND EARN RUNE</span></Center>
            </Col>
            <Col xs={24} sm={24} md={4}>
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
