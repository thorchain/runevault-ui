import React from 'react'

import ComingSoon from './ComingSoon'

const MultiSig = (props) => {
  const title = "DAO MODULE"
  const icon = "dao-active"
  const description = "This module is a simple staking, election and voting module that allows members to stake assets that can only be unlocked after a period of time, start elections in communities and cast votes that represent on-chain governance."
  return (
    <ComingSoon title={title} description={description} icon={icon} />
  )
}

export default MultiSig
