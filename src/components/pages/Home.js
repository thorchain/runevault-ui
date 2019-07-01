import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Card } from 'antd';

import { Center, Icon, Text, PillText } from '../Components'

const { Meta } = Card;

const FeatureCard = ({item}) => {
  const [hover, setHover] = useState(false)

  const styles = {
    border: "none",
    position: 'relative',
    zIndex: 10,
    padding: 10,
    borderRadius: 10,
    boxShadow: "0 2px 16px 0 rgba(0,0,0,0.04)",
    width: 260,
    height: 400,
  }
  if (hover) {
    styles.boxShadow = "0 2px 24px 0 rgba(0,0,0,0.12)"
  }

  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={6} style={{marginTop: 20}}>
      <Center>
      <Link to={item.link}>
        <Card
          cover={<Center><Icon style={{width: 40}} icon={item.icon} /></Center> }
          style={styles}
          onMouseEnter={() => { setHover(true) }}
          onMouseLeave={() => { setHover(false) }}
        >
          <Meta
            title={<Center><Text size={18} bold>{item.title}</Text></Center>}
            description={<Text>{item.description}</Text>}
          />
        </Card>
      </Link>
      </Center>
      </Col>
  )
}

const Home = (props) => {
  const data = [
    {
      icon: 'multi-send-active',
      link: 'multi-send',
      title: 'MULTI-SENDER',
      description: 'This tool uses the Binance Chain batched transaction feature to send assets to multiple addresses easily. Users can manually add addresses, memos and amounts, or alternatively upload from a CSV file to send large amounts of transactions. Users pay the Batch Transaction fee.',
    },
    {
      icon: 'multi-sig-active',
      link: 'multi-sig',
      title: 'MULTI-SIGNATURE',
      description: 'This tool uses Binance Chain multi-key store to persist state about multi-signature wallets on-chain and is non-interactive since signers don’t need to be online at the same time. Users first set up the wallet by specifying the threshold and maximum number of signatures (such as a 2 of 3 wallet), and then sign in turn to send transactions from the wallet.',
    },
    {
      icon: 'escrow-active',
      link: 'escrow',
      title: 'ESCROW',
      description: 'This tool is an adapted multi-signature module that places restrictions on how funds can be spent between parties. Users set up details about how the payment should be made, and once both parties are happy, funds are released to the correct recipient. The third-party can step in to process disputes and charges a small escrow fee.',
    },
    {
      icon: 'hedged-escrow-active',
      link: 'hedged-escrow',
      title: 'HEDGED-ESCROW',
      description: 'This tool is an adapted escrow module that allows a float to be maintained, and an external price reference to be added (such as paying in BNB priced in USD). Users specify payment amounts in the price of the external asset such that price volatility risk is removed whilst the asset is escrowed. The float in the escrow underwrites payments and as such is very useful for marketplaces.',
    },
    {
      icon: 'dao-active',
      link: 'dao',
      title: 'DAO MODULE',
      description: 'This tool allows developers to add staking, election and voting logic to their dApps. Users can stake assets on their wallets with a designated un-bonding period. They can then create elections that require minimum stake participation with designated outcomes. Votes can be tallied uses 1p1v or more elaborate schemes such as quadratic voting to determine an outcome.',
    },
    {
      icon: 'swap-active',
      link: 'swap',
      title: 'LIQUIDITY POOLS',
      description: 'This module allows users to stake assets and BNB in on-chain pools, and then perform trustless swaps across pools. The module features always-on liquidity and fair market-based prices that are resistant to manipulation. Stakers earn fees when staking assets, and users can instantly swap assets in a single transaction.',
    }
  ];

  return (
    <div>
      <Row style={{margin: 40, marginTop: 40}} gutter={24}>
        {data.slice(0,6).map((item) => (
          <FeatureCard key={item.title} item={item} />
        ))}
      </Row>
    </div>
  )
}

export default Home
