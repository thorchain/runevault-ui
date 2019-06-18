import React from 'react'
import { Link } from "react-router-dom"
import { List } from 'antd';

import { Icon, Text } from '../Components'

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
      title: 'NON-INTERACTIVE MULTI-SIGNATURE MODULE',
      description: 'This module using Cosmos multi-key store to persist state about the wallets on-chain and is non-interactive since signers don’t need to be online at the same time. Signatures and public keys are recorded on-chain, as opposed to off-chain. This functions similar to Ethereum’s Gnosis Multi- sig contract, where the wallet is set up first before it can be used.',
    },
    {
      icon: 'escrow-active',
      link: 'escrow',
      title: 'ESCROW MODULE',
      description: 'This module is a simple escrow module that allows members to register funds in an escrow that must be paid out in accordance with the set up. It is an adapted non-interactive multi-signature module that places enforceable restrictions on how the transaction is paid out.',
    },
    {
      icon: 'hedge-escrow-active',
      link: 'hedge-escrow',
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
      title: 'CONTINUOUS LIQUIDITY POOL MODULE',
      description: 'This module allows users to stake assets and BNB in on-chain pools, and then perform trustless swaps across pools. The module features always-on liquidity and fair market-based prices that are resistant to manipulation. Stakers earn fees when staking assets, and users can instantly swap assets in a single transaction. This module is exciting because it will drive staking demand for BNB and BinanceChain assets, and solve liquidity problems for the ecosystem since it has the correct incentives to stake assets and earn fees. Developers can add a swap widget in their apps to instantly convert assets at market prices trustlessly with no counter-party.',
    }
  ];

  return (
    <div style={{margin: 20}}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Link to={item.link}>
              <List.Item.Meta
                avatar={<Icon icon={item.icon} />}
                title={<Text size={18} bold>{item.title}</Text>}
                description={<Text>{item.description}</Text>}
              />
            </Link>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Home
