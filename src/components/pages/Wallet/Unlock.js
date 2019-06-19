import React from 'react'
import { Row, Tabs } from 'antd'

import { Center, H1, Text } from '../../Components'
import Mnemonic from "./Mnemonic"

const { TabPane } = Tabs;

const Wallet = (props) => {
  return (
    <div style={{margin: 20}}>
      <div>
        <Row>
          <Center> <H1> Unlock Your Wallet </H1> </Center>
        </Row>
        <Row>
          <Center>
            <Text>
              Please check that you are visiting <i>https://www.binancetools.org</i>
            </Text>
          </Center>
        </Row>
      </div>
      <div>
        <div>
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
              <Center>Coming soon</Center>
            </TabPane>
            <TabPane tab={"Mnemonic Phrase"} key="4">
              <Mnemonic {...props} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Wallet
