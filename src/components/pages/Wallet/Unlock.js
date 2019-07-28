import React from 'react'
import { Row, Col, Tabs } from 'antd'

import Breakpoint from 'react-socks';

import { Center, H1, Text } from '../../Components'
import Mnemonic from "./Mnemonic"
import Keystore from "./Keystore"
import Ledger from "./Ledger"
import WalletConnectPane from "./WalletConnect"

const { TabPane } = Tabs;

const Unlock = (props) => {
  return (
        <Row style={{marginBottom: "200"}}>

          <Col xs={24} sm={1} md={2}>
          </Col>

          <Col xs={24} sm={22} md={20}>

            <div>
              <Row>
                <Center><H1>Unlock Your Wallet</H1></Center>
              </Row>
              <Row>
                <Center>
                  <Text color='#EE5366'><i><b>Important!</b></i></Text>
                </Center>
              </Row>
              <br></br>
                <Row>
                  <Center>
                <p>Please check that you are visiting <i>https://www.runevault.org</i>
              </p>
            </Center>
          </Row>
            </div>

            <Row style={{marginBottom: "200"}}>
              <Col>
                <p>
                  <Text size={16} bold>Select how you would like to unlock</Text>
                </p>

                <Breakpoint small down>
                <Tabs defaultActiveKey="2" tabPosition={"top"}>
                  <TabPane tab={<Text size={16}><i>WalletConnect</i></Text>} key="1">
                    <WalletConnectPane {...props} />
                  </TabPane>

                  <TabPane tab={<Text size={16}><i>Ledger Device</i></Text>} key="2">
                    <Ledger {...props} />
                  </TabPane>

                  <TabPane tab={<Text size={16}><i>Keystore File</i></Text>} key="3">
                    <Keystore {...props} />
                  </TabPane>
                  <TabPane tab={<Text size={16}><i>Mnemonic Phrase</i></Text>} key="4">
                    <Mnemonic {...props} />
                  </TabPane>
                </Tabs>
                </Breakpoint>

                <Breakpoint medium up>
                <Tabs defaultActiveKey="2" tabPosition={"left"}>
                  <TabPane tab={<Text size={16}><i>WalletConnect</i></Text>} key="1">
                    <WalletConnectPane {...props} />
                  </TabPane>

                  <TabPane tab={<Text size={16}><i>Ledger Device</i></Text>} key="2">
                    <Ledger {...props} />
                  </TabPane>

                  <TabPane tab={<Text size={16}><i>Keystore File</i></Text>} key="3">
                    <Keystore {...props} />
                  </TabPane>
                  <TabPane tab={<Text size={16}><i>Mnemonic Phrase</i></Text>} key="4">
                    <Mnemonic {...props} />
                  </TabPane>
                </Tabs>
                </Breakpoint>

              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={1} md={2}>
          </Col>

        </Row>
  )
}

export default Unlock
