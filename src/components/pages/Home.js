import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Card } from 'antd';

import { Center, Icon, Text } from '../Components'

const { Meta } = Card;

const FeatureCard = ({item}) => {
  const [hover, setHover] = useState(false)

  const styles = {
    border: "none",
    position: 'relative',
    zIndex: 10,
    padding: 10,
  }
  if (hover) {
    styles.boxShadow = "0 2px 16px 0 rgba(0,0,0,0.09)"
  }

  return (
    <Col span={8}>
      <Link to={item.link}>
        <Card
          cover={<Center><Icon style={{height: 100, width:100}} icon={item.icon} /></Center> }
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
    </Col>

  )
}

const Home = (props) => {
  const data = [
    {
      icon: 'multi-send-active',
      link: 'multi-send',
      title: 'MULTI-SEND TOOL',
      description: 'Easily send transactions to multiple addresses using Binance Chain batched transactions feature.'
    },
    {
      icon: 'multi-sig-active',
      link: 'multi-sig',
      title: 'MULTI-SIGNATURE MODULE',
      description: 'This module using Cosmos multi-key store to persist state about the wallets on-chain and is non-interactive since signers don’t need to be online at the same time. Signatures and public keys are recorded on-chain, as opposed to off-chain. This functions similar to Ethereum’s Gnosis Multi- sig contract, where the wallet is set up first before it can be used.',
    },
    {
      icon: 'escrow-active',
      link: 'escrow',
      title: 'ESCROW MODULE',
      description: 'This module is a simple escrow module that allows members to register funds in an escrow that must be paid out in accordance with the set up. It is an adapted non-interactive multi-signature module that places enforceable restrictions on how the transaction is paid out.',
    },
    {
      icon: 'hedged-escrow-active',
      link: 'hedged-escrow',
      title: 'HEDGED ESCROW MODULE',
      description: "This module implements a price hedge into the escrow so that an external value can be specified in the payment and the payout correctly paid at all times. This allows escrows to pay out funds in an externally priced asset (such as paying BNB for a transaction that is priced in USD) and removes volatility risks to escrows. The hedged escrow has already been implemented successfully in the CanWork platform.",
    },
    {
      icon: 'dao-active',
      link: 'dao',
      title: 'DAO MODULE',
      description: 'This module is a simple staking, election and voting module that allows members to stake assets that can only be unlocked after a period of time, start elections in communities and cast votes that represent on-chain governance.',
    },
    {
      icon: 'swap-active',
      link: 'swap',
      title: 'LIQUIDITY POOL MODULE',
      description: 'This module allows users to stake assets and BNB in on-chain pools, and then perform trustless swaps across pools. The module features always-on liquidity and fair market-based prices that are resistant to manipulation. Stakers earn fees when staking assets, and users can instantly swap assets in a single transaction. This module is exciting because it will drive staking demand for BNB and BinanceChain assets, and solve liquidity problems for the ecosystem since it has the correct incentives to stake assets and earn fees. Developers can add a swap widget in their apps to instantly convert assets at market prices trustlessly with no counter-party.',
    }
  ];

  return (
    <div style={{margin: 20}}>
      <Row gutter={24}>
        {data.slice(0,3).map((item) => (
          <FeatureCard key={item.title} item={item} />
        ))
        }
      </Row>
      <Row style={{marginTop: 20}} gutter={24}>
        {data.slice(3,6).map((item) => (
          <FeatureCard key={item.title} item={item} />
        ))
        }
      </Row>

    </div>
  )
}

export default Home
