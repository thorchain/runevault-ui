import React from 'react'
import { Row, Col, Tabs } from 'antd'

import { Center, H1, Text } from '../../Components'
import Mnemonic from "./Mnemonic"
import Keystore from "./Keystore"

const { TabPane } = Tabs;

const Wallet = (props) => {
  return (
    <div style={{margin: 20}}>
      <div>
        <Row>
          <Center><H1>Unlock Your Wallet</H1></Center>
        </Row>
        <Row>
          <Center>
            <Text>
              Please check that you are visiting <i>https://www.binancetools.org</i>
            </Text>
          </Center>
        </Row>
      </div>
      <Row>
        <Col offset={3} span={18}>
          <p>
            <Text size={16} bold>Select how you would like to unlock</Text>
          </p>
          <Tabs defaultActiveKey="1" tabPosition={"left"}>
            <TabPane tab={"WalletConnect"} key="1">
              <Center>Coming soon</Center>
            </TabPane>
            <TabPane tab={"Ledger Device"} key="2">
              <Center>Coming soon</Center>
            </TabPane>
            <TabPane tab={"Keystore File"} key="3">
              <Keystore {...props} />
            </TabPane>
            <TabPane tab={"Mnemonic Phrase"} key="4">
              <Mnemonic {...props} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  )
}

export default Wallet
