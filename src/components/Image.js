import React from 'react'

const images = {
  "plus": "Asset-plus-grey.svg",
  "swap-active": "CLP-active.svg",
  "swap-inactive": "CLP-grey.svg",
  "coin-bep": "Coin-BEP2.svg",
  "coin-bnb": "Coin-BNB.svg",
  "dao-active": "DAO-active.svg",
  "dao-inactive": "DAO-grey.svg",
  "escrow-active": "Escrow-active.svg",
  "escrow-inactive": "Escrow-grey.svg",
  "hedge-escrow-active": "HEscrow-active.svg",
  "hedge-escrow-inactive": "HEscrow-grey.svg",
  "logo": "Logo-BinanceTools.svg",
  "multi-send-active": "Multi-sender-active.svg",
  "multi-send-inactive": "Multi-sender-grey.svg",
  "multi-sig-active": "Multi-sig-active.svg",
  "multi-sig-inactive": "Multi-sig-grey.svg",
}

const Image = (props) => {
  return (
    <img src={"/images/" + images[props.img]} alt={props.img} {...props} />
  )
}

export default Image
