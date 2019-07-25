import React from 'react'
import { Row, Col, Tabs } from 'antd'

import { Center, H1, Text } from '../../Components'
import Mnemonic from "./Mnemonic"
import Keystore from "./Keystore"
import Ledger from "./Ledger"

const { TabPane } = Tabs;

const Unlock = (props) => {
  return (
    <div style={{margin: 20}}>
      <div>
        <Row style={{margin:20}}>
          <Center><H1>Unlock Your Wallet</H1></Center>
        </Row>
        <Row style={{margin:20}}>
          <Center>
            <Text color='#EE5366'><i><b>Important!</b></i></Text>&nbsp;<Text>Please check that you are visiting <i>https://www.thorchain.com</i>
            </Text>
          </Center>
        </Row>
      </div>
      <Row>
        <Col offset={3} span={18}>
          <p>
            <Text size={16} bold>Select how you would like to unlock</Text>
          </p>
          <Tabs defaultActiveKey="3" tabPosition={"left"}>
            <TabPane tab={<Text size={16}><i>WalletConnect</i></Text>} key="1">
              <Center><Text style={{marginTop: 90}}>Coming soon...</Text></Center>
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
        </Col>
      </Row>
    </div>
  )
}

export default Unlock
