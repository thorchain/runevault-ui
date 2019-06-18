import React from 'react'

import ComingSoon from './ComingSoon'

const MultiSig = (props) => {
  const title = "CONTINUOUS LIQUIDITY POOL MODULE"
  const icon = "swap-active"
  // eslint-disable-next-line
  const description = "This module allows users to stake assets and BNB in on-chain pools, and then perform trustless swaps across pools. The module features always-on liquidity and fair market-based prices that are resistant to manipulation. Stakers earn fees when staking assets, and users can instantly swap assets in a single transaction. This module is exciting because it will drive staking demand for BNB and BinanceChain assets, and solve liquidity problems for the ecosystem since it has the correct incentives to stake assets and earn fees. Developers can add a swap widget in their apps to instantly convert assets at market prices trustlessly with no counter-party. "
  return (
    <ComingSoon title={title} description={description} icon={icon} />
  )
}

export default MultiSig
