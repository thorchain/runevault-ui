import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import TokenManagement, { crypto } from '@binance-chain/javascript-sdk'

import { Context } from '../../context'
import Binance from "../../clients/binance"

import { Row, Form, Col, Modal, Input, message } from 'antd'
import { H1, Button, Text, Coin, WalletAddress} from "../Components"

// RUNE-B1A
const SYMBOL = "RUNE-B1A"

const Stake = (props) => {
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [balances, setBalances] = useState(null)
  const [mode, setMode] = useState("stake")
  const [loadingBalances, setLoadingBalancer] = useState(false)

  // confirmation modal variables
  const [visible, setVisible] = useState(false)
  const [sending, setSending] = useState(false)

  const context = useContext(Context)

  const getBalances = () => {
    if (context.wallet && context.wallet.address) {
      setLoadingBalancer(true)
      Binance.getBalances(context.wallet.address)
        .then((response) => {
          console.log("Balances:", response)
          const b = (response || []).map((bal) => (
            {
              "icon": bal.symbol === "BNB" ? "coin-bnb": "coin-rune",
              "ticker": bal.symbol,
              "free": parseFloat(bal.free),
              "frozen": parseFloat(bal.frozen),
              "locked": parseFloat(bal.locked),
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
  }

  useEffect(() => {
    if (context.wallet && context.wallet.address) {
      setLoadingBalancer(true)
      Binance.getBalances(context.wallet.address)
        .then((response) => {
          console.log("Balances:", response)
          const b = (response || []).map((bal) => (
            {
              "icon": bal.symbol === "BNB" ? "coin-bnb": "coin-rune",
              "ticker": bal.symbol,
              "free": parseFloat(bal.free),
              "frozen": parseFloat(bal.frozen),
              "locked": parseFloat(bal.locked),
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

  const confirmation = (mode) => {
    setMode(mode)
    setVisible(true)
  }

  const handleOk = async (values) => {
    // Send coins!
    if (!context.wallet || !context.wallet.keystore || !context.wallet.address) {
      return
    }

    setSending(true)

    try {
      const privateKey = crypto.getPrivateKeyFromKeyStore(
        context.wallet.keystore,
        values.password
      )
      Binance.setPrivateKey(privateKey)
      const manager = window.manager = new TokenManagement(Binance.bnbClient).tokens
      var results
      if (mode === "stake") {
        results = await manager.freeze(context.wallet.address, selectedCoin, values.amount)
      } else if (mode === "destake") {
        results = await manager.unfreeze(context.wallet.address, selectedCoin, values.amount)
      } else {
        throw new Error("invalid mode")
      }
      Binance.clearPrivateKey()
      setSending(false)
      if (results.result[0].ok) {
        const txURL = Binance.txURL(results.result[0].hash)
        message.success(<Text>Sent. <a target="_blank" rel="noopener noreferrer" href={txURL}>See transaction</a>.</Text>)
        setVisible(false)
        getBalances()
      }
    } catch(err) {
      Binance.clearPrivateKey()
      window.err = err
      console.error("Validating keystore error:", err)
      message.error(err.message)
      setSending(false)
    }

  }

  const handleCancel = () => {
    setVisible(false)
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

      {selectedCoin && selectedCoin === SYMBOL && 
      <Row>
        <Col xs={24} sm={24} md={24} lg={16}>
          <Row style={{paddingRight: 5}}>
            <Col span={24}>
              <Button 
                style={{height:30, width:200}}
                onClick={() => { confirmation('stake') }}
                loading={sending}
              >
                STAKE ({balances.find((b) => {
                  console.log(b)
                  return b.ticker === SYMBOL
                }).frozen})
              </Button>
              <Button 
                style={{height:30, width:200, marginLeft: 10}}
                onClick={() => { confirmation('destake') }}
                loading={sending}
              >
                WITHDRAW
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      }

      <Modal
        title={mode.charAt(0).toUpperCase() + mode.slice(1)}
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        bodyStyle={{backgroundColor: "#101921", paddingBottom: 10}} 
        headStyle={{backgroundColor: "#2B3947", color: "#fff"}} 
      >
        <WrappedStakeForm button={mode} onSubmit={handleOk} onCancel={handleCancel} loading={sending} />
      </Modal>
    </div>
  )
}

const StakeForm = (props) => {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (props.onSubmit) {
          props.onSubmit(values)
        }
        props.form.resetFields()
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item >
        {getFieldDecorator('amount', {
          rules: [{ required: true, message: 'Please input an amount of tokens!' }],
        })(
          <Input
            placeholder="Amount: ie 1.9938"
          />,
        )}
      </Form.Item>
      <Form.Item >
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            type="password"
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <div style={{float: "right"}}>
          <Button onClick={props.onCancel} >Cancel</Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            onClick={handleSubmit}
            loading={props.loading}
            style={{marginLeft: 10}}
          >
            {props.button.charAt(0).toUpperCase() + props.button.slice(1)}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

const WrappedStakeForm = Form.create({ name: 'staking' })(StakeForm);

export default Stake
