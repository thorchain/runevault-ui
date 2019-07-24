import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { crypto } from '@binance-chain/javascript-sdk'

import { Context } from '../../context'
import Binance from "../../clients/binance"

import { Row, Icon as AntIcon, Col, Modal, Input, message } from 'antd'
import { H1, Button, Text, Coin, WalletAddress} from "../Components"

const Stake = (props) => {
  const [transfers, setTransfers] = useState([{}])
  const [total, setTotal] = useState(0)
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [balances, setBalances] = useState(null)
  const [loadingBalances, setLoadingBalancer] = useState(false)

  // confirmation modal variables
  const [visible, setVisible] = useState(false)
  const [password, setPassword] = useState(null)
  const [sending, setSending] = useState(false)

  const context = useContext(Context)

  useEffect(() => {
    if (context.wallet && context.wallet.address) {
      setLoadingBalancer(true)
      Binance.getBalances(context.wallet.address)
        .then((response) => {
          const b = (response || []).map((bal) => (
            {
              "icon": bal.symbol === "BNB" ? "coin-bnb": "coin-rune",
              "ticker": bal.symbol,
              "amount": parseFloat(bal.free),
              "button" : bal.symbol === "RUNE-B1A" ? "STAKE": "none",
            }
          ))
          setBalances([...b])
          setLoadingBalancer(false)
        })
        .catch((error) => {
          setLoadingBalancer(false)
        })
    }
  }, [context.wallet])

  var reader = new FileReader();
  reader.onload = () => {
    var text = reader.result;
    var transactions = []
    const lines = text.split(/\n/)
    for (let l of lines) {
      const parts = l.split(',')
      if (parts.length === 2) {
        transactions.push({
          "address": parts[0],
          "ticker": selectedCoin,
          "amount": parseFloat(parts[1]) || 0,
        })
      } else {
        console.error("Invalid CSV line:", l)
      }
    }
    setTransfers([...transactions])
    setTotal(transactions.reduce((a,b) => a + (b.amount || 0), 0))
  }

  const confirmation = () => {
    setPassword("")
    setVisible(true)
  }

  const handleOk = async () => {
    // Send coins!
    if (!context.wallet || !context.wallet.keystore || !context.wallet.address) {
      setPassword(null) // clear password
      return
    }

    setSending(true)

    const transactions = window.transactions = transfers.map((transfer) => (
      {
        "fromAddress": context.wallet.address,
        "symbol": "RUNE-B1A",
        "amount": transfer.amount,

      }
    ))

    try {
      const privateKey = crypto.getPrivateKeyFromKeyStore(
        context.wallet.keystore,
        password
      )
      setPassword(null) // clear password
      const results = window.results = await Binance.bnbTokens.freeze(privateKey, context.wallet.address, transactions)
      setSending(false)
      if (results.result[0].ok) {
        const txURL = Binance.txURL(results.result[0].hash)
        message.success(<Text>Sent. <a target="_blank" rel="noopener noreferrer" href={txURL}>See transaction</a>.</Text>)
        setVisible(false)
      }
    } catch(err) {
      window.err = err
      console.error("Validating keystore error:", err)
      message.error(err.message)
      setPassword(null) // clear password
      setSending(false)
    }

  }

  const handleCancel = () => {
    setPassword(null)
    setVisible(false)
  }

  const onPasswordChange = (e) => {
    const passwd = e.target.value
    setPassword(passwd)
  }


  // styling
  const coinSpan = 6
  const coinRowStyle = {margin: "10px 0px"}

  return (
    <div style={{marginTop: 20, marginLeft:100}}>
      <div>
        <H1>Stake Rune</H1>
      </div>
      <div>
        <Text size={18}>
          Stake RUNE to earn 1% per week in earnings until BEPSwap launches.
        </Text>
      </div>
      <div style={{marginTop: "20px"}}>
        <Row style={coinRowStyle}>
          <Col span={coinSpan}>
            <WalletAddress />
          </Col>
        </Row>
        <Row>
          {loadingBalances && context.wallet &&
          <Text><i>Loading balances, please wait...</i></Text>
          }
          {!context.wallet &&
          <Text><Link to="/wallet/unlock">Unlock your wallet</Link> first to stake RUNE</Text>
          }
          {!loadingBalances && context.wallet && (balances || []).length === 0 &&
          <Text>No coins available</Text>
          }
          {!loadingBalances && context.wallet && (balances || []).length > 0 &&
          <Text>Select RUNE below</Text>
          }
        </Row>
        {!loadingBalances && (balances || []).map((coin) => (
          <Row key={coin.ticker} style={coinRowStyle}>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <Coin {...coin} onClick={setSelectedCoin} border={selectedCoin === coin.ticker}/>
            </Col>
          </Row>
        ))
        }
      </div>
      {selectedCoin &&
      <Row>
        <Col xs={24} sm={24} md={24} lg={16}>

          <Row style={{paddingRight: 5}}>
            <Col span={12}>
              <Button style={{height:30, width:200}}>STAKE</Button>
            </Col>
            <Col span={12}>
              <Row>
                <Col offset={12} span={3}>
                  <div style={{textAlign: "right"}}>
                    <div>
                      <Text size={14} bold>Total:</Text>
                    </div>
                    <div>
                      <Text size={14} bold>Fee:</Text>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div style={{textAlign: "right"}}>
                    <div>
                      <Text size={14} bold>{total}</Text> <Text size={14}>{selectedCoin}</Text>
                    </div>
                    <div>
                      <Text size={14} bold>{0.005}</Text> <Text size={14}>BNB</Text>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <div style={{float: "right"}}>
                  <Button
                    onClick={confirmation}
                    loading={sending}
                    style={{padding: "0px 10px", fontSize: 14}} bold={true} fill={true}
                  >
                    Next <AntIcon type="arrow-right" />
                  </Button>
                </div>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      }
      <Modal
        title="Confirmation"
        visible={visible}
        onOk={handleOk}
        okText={"Stake RUNE"}
        onCancel={handleCancel}
      >
        <div>
          <div style={{margin: 20}}>
            <Input.Password
              allowClear
              onChange={onPasswordChange}
              value={password}
              placeholder="Enter your password."
            />
          </div>
        </div>
      </Modal>
    </div>
)
}

export default Stake
