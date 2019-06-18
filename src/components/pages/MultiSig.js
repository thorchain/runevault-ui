import React from 'react'

import ComingSoon from './ComingSoon'

const MultiSig = (props) => {
  const title = "NON-INTERACTIVE MULTI-SIGNATURE MODULE"
  const icon = "multi-sig-active"
  const description = "This module using Cosmos multi-key store to persist state about the wallets on-chain and is non-interactive since signers don’t need to be online at the same time. Signatures and public keys are recorded on-chain, as opposed to off-chain. This functions similar to Ethereum’s Gnosis Multi- sig contract, where the wallet is set up first before it can be used."
  return (
    <ComingSoon title={title} description={description} icon={icon} />
  )
}

export default MultiSig
