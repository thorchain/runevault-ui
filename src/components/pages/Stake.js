import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import TokenManagement, { crypto } from '@binance-chain/javascript-sdk'

import Breakpoint from 'react-socks';

import { Context } from '../../context'
import Binance from "../../clients/binance"
import { AmounttoString } from '../../utility'

import { Row, Form, Col, Modal, Input, message } from 'antd'
import { H1, Button, Text, Coin, WalletAddress, WalletAddrShort} from "../Components"

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
            "icon": bal.symbol === "RUNE-B1A" ? "coin-rune": "coin-bep",
            "ticker": bal.symbol,
            "free": parseFloat(bal.free),
            "frozen": parseFloat(bal.frozen),
            "locked": parseFloat(bal.locked),
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
            "icon": bal.symbol === "RUNE-B1A" ? "coin-rune": "coin-bep",
            "ticker": bal.symbol,
            "free": parseFloat(bal.free),
            "frozen": parseFloat(bal.frozen),
            "locked": parseFloat(bal.locked),
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
    if (!context.wallet || !context.wallet.address) {
      console.log("No wallet detected!")
      return
    }

    setSending(true)
    const binance = Binance

    // setup binance client for authentication
    if (context.wallet.keystore) {
      try {
        const privateKey = crypto.getPrivateKeyFromKeyStore(
          context.wallet.keystore,
          values.password
        )
        binance.setPrivateKey(privateKey)

      } catch(err) {
        window.err = err
        console.error("Validating keystore error:", err)
        message.error(err.message)
        setSending(false)
        return
      }

    } else if (context.wallet.ledger) {
      binance.useLedgerSigningDelegate(
        context.wallet.ledger,
        null, null, null,
        context.wallet.hdPath,
      )
    }

    try {
      const manager = new TokenManagement(Binance.bnbClient).tokens
      var results
      if (mode === "STAKE RUNE") {
        results = await manager.freeze(context.wallet.address, selectedCoin, values.amount)
      } else if (mode === "WITHDRAW (Caution: time will be reset!)") {
        results = await manager.unfreeze(context.wallet.address, selectedCoin, values.amount)
      } else {
        throw new Error("invalid mode")
      }
      setSending(false)
      if (results.result[0].ok) {
        const txURL = Binance.txURL(results.result[0].hash)
        message.success(<Text>Sent. <a target="_blank" rel="noopener noreferrer" href={txURL}>See transaction</a>.</Text>)
        setVisible(false)
        getBalances()
      }
    } catch(err) {
      window.err = err
      console.error("Validating keystore error:", err)
      message.error(err.message)
      setSending(false)
    }
    binance.clearPrivateKey()

  }

  const handleCancel = () => {
    setVisible(false)
  }

  const passwordRequired = context.wallet && 'keystore' in context.wallet

  // styling
  const coinRowStyle = {
    margin: "10px 0px",
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "20px",
  }

  const paneStyle = {
    backgroundColor: "#48515D",
    marginRight: "20px",
    marginTop: "20px",
    borderRadius: 5,
  }

  return (

    <div style={{marginTop: 20, marginLeft:5}}>

      <Row>

        <Col xs={24} sm={24} md={1} lg={2}>
        </Col>

        <Col xs={24} sm={24} md={22} lg={20}>
          <div>
            <H1>Stake Rune</H1>
          </div>

          <div>
            <Text size={18}>
              Stake RUNE to earn weekly compounding interest until the launch of BEPSwap.
            </Text>
          </div>

          <div style={{marginTop: "20px"}}>

            <Breakpoint small down>
            {!loadingBalances && context.wallet &&
            <Row>
              <Col xs={24} sm={24} md={12} style={{marginTop: "20px"}}>
                <a target="_blank" rel="noopener noreferrer" href={"https://explorer.binance.org/address/" + context.wallet.address}>
                  <WalletAddrShort />
                </a>
              </Col>
            </Row>
          }
          </Breakpoint>

            <Breakpoint medium up>
            {!loadingBalances && context.wallet &&
            <Row>
              <Col xs={24} sm={24} md={12} style={{marginTop: "20px"}}>
                <a target="_blank" rel="noopener noreferrer" href={"https://explorer.binance.org/address/" + context.wallet.address}>
                  <WalletAddress />
                </a>
              </Col>
            </Row>
          }
          </Breakpoint>

          <Row style={{marginTop: "40px"}}>
            {loadingBalances && context.wallet &&
              <Text><i>Loading balances, please wait...</i></Text>
            }

            <Breakpoint small down>
            {!context.wallet &&
              <Text>Sorry, not yet available on mobile. Please visit on desktop.</Text>
            }
            </Breakpoint>

            <Breakpoint medium up>
            {!context.wallet &&
              <Link to="/wallet/unlock"><Button fill>CONNECT WALLET</Button></Link>
            }
            </Breakpoint>

            {!loadingBalances && context.wallet && (balances || []).length === 0 &&
              <Text>No coins available</Text>
            }
          </Row>

          <Row>
            <Col xs={24}>
              {!loadingBalances && context.wallet && (balances || []).length > 0 &&
                <Row style={{marginBottom: "50px"}}>
                  <Col xs={24} sm={6} style={paneStyle}>

                    <Row style={{marginTop: "10px", marginLeft: "10px"}}>
                      <Col xs={24}>
                        <Text size={18}>SELECT RUNE BELOW:</Text>
                      </Col>
                    </Row>


                    {!loadingBalances && (balances || []).map((coin) => (
                      <Row key={coin.ticker} style={coinRowStyle}>
                        <Col xs={24}>
                          <Coin {...coin} onClick={setSelectedCoin} border={selectedCoin === coin.ticker}/>
                        </Col>
                      </Row>
                    ))
                  }
                </Col>

                <Col xs={24} sm={14} style={paneStyle}>

                  {selectedCoin && selectedCoin === SYMBOL &&
                    <Row style={{marginTop: "10px", marginLeft: "10px", marginRight: "10px"}}>
                      <Col xs={24}>

                        <Text size={18}>STAKE RUNE TO EARN REWARDS</Text>
                        <br></br>
                        <Text size={14}>Note: RUNE will be staked on your address securely using the </Text>
                          <a href="https://docs.binance.org/tokens.html#freeze-unfreeze"
                            target="_blank" rel="noopener noreferrer">
                            <Text size={15} style={{fontWeight: 'bold'}}>Binance Chain "freeze" command.</Text>
                          </a>
                        <br></br>
                        <Text size={10}>RUNE will be paid out at the end of the campaign. You can add more, but any withdrawals will reset your holding period.
                          The total earnings is calculated based the balance of your staked RUNE, based on your holding period (in weeks) and </Text>
                          <a href="https://medium.com/thorchain/introducing-runevault-stake-and-earn-rune-87576671d1e4"
                            target="_blank" rel="noopener noreferrer">
                            <Text size={11} style={{fontWeight: 'bold'}}>the earning schedule.</Text>
                          </a>
                        <hr />

                      </Col>
                    </Row>
                  }

                  {selectedCoin && selectedCoin === SYMBOL &&
                    <Row key={SYMBOL} style={coinRowStyle}>
                      <Col xs={12} style={{marginTop: "10px"}}>

                            <span>
                              <Text>TOTAL BALANCE:</Text>
                            </span>
                            <span style={{margin: "0px 20px"}} size={22}>
                              {AmounttoString(balances.find((b) => {
                                return b.ticker === SYMBOL
                              }).free +
                              balances.find((b) => {
                                return b.ticker === SYMBOL
                              }).frozen
                              )}
                            </span>

                          </Col>
                        </Row>
                  }


                  {selectedCoin && selectedCoin === SYMBOL &&
                    <Row key={SYMBOL} style={coinRowStyle}>
                      <Col xs={24} sm={12}>
                        <Row>
                          <Col>
                            <span>
                              <Text>NOT STAKED:</Text>
                            </span>
                            <span style={{margin: "0px 20px"}} size={22}>{balances.find((b) => {
                                return b.ticker === SYMBOL
                              }).free}
                            </span>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button
                              style={{height:30, width:150, marginTop: 10}}
                              onClick={() => { confirmation('STAKE RUNE') }}
                              loading={sending}
                              >
                              STAKE
                            </Button>
                          </Col>
                        </Row>
                        </Col>

                        <Col xs={24} sm={12}>
                          <Row>
                            <Col>
                              <span>
                                <Text>STAKED:</Text>
                              </span>
                              <span style={{margin: "0px 20px"}} size={22}>{balances.find((b) => {
                                  return b.ticker === SYMBOL
                                }).frozen}
                              </span>
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <Button secondary
                                style={{height:30, width:150, marginTop: 10}}
                                onClick={() => { confirmation('WITHDRAW (Caution: time will be reset!)') }}
                                loading={sending}
                                >
                                WITHDRAW
                              </Button>
                              <br></br>

                              <Text>Caution: your time will be reset!</Text>
                            </Col>
                          </Row>



                      </Col>
                    </Row>
                  }

                    {selectedCoin && selectedCoin === SYMBOL &&
                      <Row style={coinRowStyle}>
                        <Col xs={24} style={{marginTop: "10px"}}>

                          <Row>
                            <Col>
                              <span><Text>RUNE EARNED:</Text></span>
                              <span style={{marginLeft: "10px"}}>
                                <i>coming soon</i>
                              </span>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <span><Text>DATE OF LAST PAYOUT:</Text></span>
                              <span style={{marginLeft: "10px"}}>
                                <i>coming soon</i>
                              </span>
                            </Col>
                          </Row>




                        </Col>
                      </Row>
                    }

                </Col>
              </Row>
            }
          </Col>
        </Row>

        </div>

      <Modal
        title={mode.charAt(0).toUpperCase() + mode.slice(1)}
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        bodyStyle={{backgroundColor: "#101921", paddingBottom: 10}}
        headStyle={{backgroundColor: "#2B3947", color: "#fff"}}
        >
        <WrappedStakeForm password={passwordRequired} button={mode} onSubmit={handleOk} onCancel={handleCancel} loading={sending} />
      </Modal>


        </Col>

        <Col xs={24} sm={24} md={1} lg={2}>
        </Col>


      </Row>
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
      {props.password &&
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
      }
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
