import React, { useContext, useEffect } from 'react'
import { Link } from "react-router-dom"
import { Layout, Row, Col } from 'antd';

import Breakpoint from 'react-socks';

import { Context } from '../../context'

import { Text, Icon, Button, WalletAddrShort } from '../Components'

const Header = (props) => {

  const context = useContext(Context)

  useEffect(() => {
  },[])
  
  const styles = {
    position: 'fixed',
    zIndex: 1,
    width: '100%',
    backgroundColor: "#2B3947",
  }

  return (

    <Layout.Header className="header-container" style={styles} >
      <Row>
        <Breakpoint medium up>

          <Col sm={6} lg={5}>
            <Link to="/">
              <Icon icon="runelogo" style={{ height: 40 }} />
            </Link>
          </Col>

          <Col sm={14} lg={13}>
            <span><Link to="/stake"><Text color={'#4FE1C4'} size={20} bold={true}>WITHDRAW RUNE</Text></Link></span>
            {/* <span style={{marginLeft:20}}><Link to="/collectibles"><Text color={'#4FE1C4'} size={20} bold={true}>COLLECTIBLES</Text></Link></span> */}
            {/* <span style={{marginLeft:20}}><Link to="/leaderboard"><Text color={'#4FE1C4'} size={20} bold={true}>LEADERBOARD</Text></Link></span> */}
          </Col>

          <Col sm={4} lg={6}>
            
            <div style={{ float: "right" }}>
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

        <Breakpoint small down>
          <Col xs={24}>
            <Link to="/">
              <Icon icon="runelogo" style={{ height: 30 }} />
            </Link>
          </Col>
        </Breakpoint>


      </Row>
    </Layout.Header>



  )
}

export default Header
