import React, { Fragment, useContext } from 'react'
import PropTypes from "prop-types";
import { Button as AntButton } from "antd"

import { Context } from '../context'
import { AmounttoString } from '../utility'

export const WalletAddress = props => {
  const context = useContext(Context)
  if (context.wallet && context.wallet.address) {
    return (
      <PillText>{context.wallet.address}</PillText>
    )
  }
  return <Fragment />
}

export const WalletAddrShort = props => {
  const context = useContext(Context)
  if (context.wallet && context.wallet.address) {
    const address = context.wallet.address
    const addr = address.substring(0,7).concat('...')
    const addrShort = addr.concat(address.substring(address.length - 4, address.length))
    return (
      <PillTextOrng>{addrShort}</PillTextOrng>
    )
  }
  return <Fragment />
}

const defaultStyles = {
  fontFamily: "Open Sans",
  fontSize: "14px",
  color: "#FFFFFF",
  letterSpacing: 0,
}

export const H1 = (props) => {
  let styles = {...defaultStyles, ...props.style || {}}
  styles.fontFamily = "Exo 2"
  styles.fontSize = "42px"
  return (
    <span style={styles}>
      {props.children}
    </span>
  )
}

export const Text = (props) => {
  let styles = {...defaultStyles, ...props.style || {}}
  if (props.bold) {
    styles.fontFamily = "Exo 2"
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

export const PillText = (props) => {
  let styles = {...defaultStyles, ...props.style || {}}
  styles.backgroundColor = "#4FE1C4"
  styles.borderRadius = 28
  styles.padding = "8px 20px"
  styles.fontSize = "14px"
  return (
    <span style={styles}>
      {props.children}
    </span>
  )
}

export const PillTextOrng = (props) => {
  let styles = {...defaultStyles, ...props.style || {}}
  styles.backgroundColor = "#4FE1C4"
  styles.borderColor = "#33CCFF"
  styles.borderRadius = 28
  styles.padding = "8px 20px"
  styles.fontSize = "14px"
  styles.color = "#FFF"
  return (
    <span style={styles}>
      {props.children}
    </span>
  )
}

export const Icon = (props) => {
  const lookup = {
    "plus": "Asset-plus-grey.svg",
    "coin-rune": "Coin-RUNE.svg",
    "coin-bep": "Coin-BEP2.svg",
    "coin-bnb": "Coin-BNB.svg",
    "runelogo": "Logo-RuneVault.svg",
    "logo": "THORChain-white.svg",
    "rune": "rune.svg",
    "step1": "step1.svg",
    "step2": "step2.svg",
    "openapp": "ledger-app.svg",
    "pincode": "ledger-pin.svg",
    "qrcode" : "qr-code.svg",
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
  let styles = {...defaultStyles, ...props.style || {}}
  styles.borderRadius = 9
  if (props.bold || props.bold === "true") {
    styles.fontFamily = "Exo 2"
  }
  if (props.fill) {
    styles.color = "#fff"
    styles.backgroundColor = "#4FE1C4"
    styles.borderColor = "#33CCFF"
  } else if (props.secondary) {
    styles.color = "#fff"
    styles.backgroundColor = "#1C2731"
    styles.borderColor = "#4E6376"
  } else {
    styles.color = "#fff"
    styles.backgroundColor = "#000000"
    styles.border = "1px solid #4FE1C4"
    styles.borderColor = "#4FE1C4"
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

const Coin = ({onClick, icon, ticker, free, frozen, border}) => {
  let styles = {width: "100%", paddingLeft: 30, cursor: "pointer", padding: 5}
  if (border) {
    styles.border = "1px solid #50E3C2"
    styles.borderRadius = 6
  }
  return (
    <Center>
      <div style={styles} onClick={() => { if (onClick) { onClick(ticker) } }}>
        <Icon icon={icon} />
        <span style={{margin: "0px 10px"}}>
          {ticker}
        </span>
        <span style={{marginLeft: 10, float: 'right'}}>
          {AmounttoString(frozen + free)}
        </span>
      </div>
    </Center>
  )
}
Coin.defaultProps = {
  border: false,
}

export {
  Button,
  Coin,
}
