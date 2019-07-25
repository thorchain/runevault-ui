import React, { useEffect, useState, useContext } from 'react'
// import { Link } from "react-router-dom"

import { Row, Col } from 'antd'

import { Context } from '../../../context'
import Binance from "../../../clients/binance"
import { H1, Text, Button, Coin } from "../../Components"

const Wallet = props => {
  const context = useContext(Context)

  const [loadingBalances, setLoadingBalancer] = useState(false)
  const [balances, setBalances] = useState(null)

  useEffect(() => {
    if (context.wallet && context.wallet.address) {
      setLoadingBalancer(true)
      Binance.getBalances(context.wallet.address)
        .then((response) => {
          const b = (response || []).map((bal) => (
            {
              "icon": "coin-bnb",
              "ticker": bal.symbol,
              "amount": parseFloat(bal.free),
            }
          ))
          setBalances([...b])
          setLoadingBalancer(false)
        })
        .catch((error) => {
          setLoadingBalancer(false)
        })
    } else {
      props.history.push("/wallet/unlock")
    }
    // eslint-disable-next-line
  }, [context.wallet])

  const forgetWallet = () => {
    context.forgetWallet()
    props.history.push("/")
  }


  const rowStyle = {margin: "10px 0px"}
  const coinSpan = 6

  return (
    <div style={{margin: 10}}>
      <H1>Wallet</H1>
      <Row style={rowStyle}>
        <Text size={18} bold>Balances</Text>
      </Row>
      {!loadingBalances && (balances || []).map((coin) => (
        <Row key={coin.ticker} style={rowStyle}>
          <Col span={coinSpan}>
            <Coin {...coin} />
          </Col>
        </Row>
      ))
      }
      <Row style={rowStyle}>
        <div style={{marginTop: 20}}>
          <Button onClick={forgetWallet}>Forget Wallet</Button>
        </div>
      </Row>
    </div>
  )
}

export default Wallet
