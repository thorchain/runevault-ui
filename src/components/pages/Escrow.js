import React from 'react'

import ComingSoon from './ComingSoon'

const MultiSig = (props) => {
  const title = "ESCROW MODULE"
  const icon = "escrow-active"
  const description = "This module is a simple escrow module that allows members to register funds in an escrow that must be paid out in accordance with the set up. It is an adapted non-interactive multi-signature module that places enforceable restrictions on how the transaction is paid out."
  return (
    <ComingSoon title={title} description={description} icon={icon} />
  )
}

export default MultiSig
