import React, { Fragment, useContext } from 'react'
import PropTypes from "prop-types";
import { Button as AntButton } from "antd"

import { Context } from '../context'

export const WalletAddress = props => {
  const context = useContext(Context)
  if (context.wallet && context.wallet.address) {
    return (
      <PillText>{context.wallet.address}</PillText>
    )
  }
  return <Fragment />
}

const defaultStyles = {
  fontFamily: "Helvetica",
  fontSize: "14px",
  color: "#848E9C", 
  letterSpacing: 0,
}

export const H1 = ({children}) => {
  let styles = Object.assign({}, defaultStyles);
  styles.fontFamily = "Helvetica-Light"
  styles.fontSize = "42px"
  return (
    <span style={styles}>
      {children}
    </span>
  )
}

export const Text = (props) => {
  let styles = Object.assign(props.style || {}, defaultStyles);
  if (props.bold) {
    styles.fontFamily = "Helvetica-Bold"
  }
  if (props.color) {
    styles.color = props.color
  }
  if (props.size) {
    styles.fontSize = props.size
  }
  return (
    <span style={styles}>
      {props.children}
    </span>
  )
}

export const PillText = ({children}) => {
  let styles = Object.assign({}, defaultStyles);
  styles.backgroundColor = "#ededed"
  styles.borderRadius = 28
  styles.padding = "8px 20px"
  styles.fontSize = "14px"
  return (
    <span style={styles}>
      {children}
    </span>
  )
}


export const Icon = (props) => {
  const lookup = {
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
  return (
    <img src={"/images/" + lookup[props.icon]} alt={props.img} {...props} />
  )
}

export const Center = (props) => (
  <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
    {props.children}
  </div>
)

const Button = (props) => {
  let styles = Object.assign(props.style || {}, defaultStyles);
  styles.borderRadius = 9
  if (props.bold || props.bold === "true") {
    styles.fontFamily = "Helvetica-Bold"
  }
  if (props.fill) {
    styles.color = "#fff"
    styles.backgroundColor = "#F0B90B"
  } else {
    styles.color = "#F0B90B"
    styles.backgroundColor = "#fff"
    styles.border = "1px solid #F0B90B"
  }
  return (
    <AntButton 
      disabled={props.disabled}
      style={styles} 
      onClick={props.onClick} 
      onChange={props.onChange} 
      type={props.type}
      loading={props.loading}
    >
      {props.children}
    </AntButton>
  )
}
Button.defaultProp = {
  disabled: false,
  fill: false,
  bold: false,
  loading: false,
}
Button.propTypes = {
  fill: PropTypes.bool,
  bold: PropTypes.bool,
  loading: PropTypes.bool,
}

export {
  Button
}
