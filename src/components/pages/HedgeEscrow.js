import React from 'react'

import ComingSoon from './ComingSoon'

const MultiSig = (props) => {
  const title = "HEDGED ESCROW MODULE"
  const icon = "hedged-escrow-active"
  const description = "This module implements a price hedge into the escrow so that an external value can be specified in the payment and the payout correctly paid at all times. This allows escrows to pay out funds in an externally priced asset (such as paying BNB for a transaction that is priced in USD) and removes volatility risks to escrows. The hedged escrow has already been implemented successfully in the CanWork platform."
  return (
    <ComingSoon title={title} description={description} icon={icon} />
  )
}

export default MultiSig
