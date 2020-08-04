import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { crypto } from '@binance-chain/javascript-sdk'
import base64js from 'base64-js'

import { connect } from 'react-redux';

import { Context } from '../../context'
import Binance from "../../clients/binance"
import { CHAIN_ID } from '../../env'
import { Row, Form, Col, Modal, Input, message } from 'antd'
import { H1, Button, Text, Icon, Center } from "../Components"

// RUNE-B1A
const NETWORK_ID = 714
const ADDRESS = 'bnb1z7kmwvvldnq2s2lxtwhcq7h5qjekpj6dr680ue'

const Stake = (props) => {

  const [fee, setFee] = useState(null)

  // confirmation modal variables
  const [visible, setVisible] = useState(false)
  const [sending, setSending] = useState(false)

  const context = useContext(Context)


  useEffect(() => {
    setFee('0.00037500')
  }, [])



  const confirmation = () => {
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
    if (context.wallet.walletconnect) {
      Binance.getAccount(context.wallet.address)
        .then((response) => {
          const account = response.result
          console.log("AccountInfo:", account)
          const tx = window.tx = {
            accountNumber: account.account_number.toString(),
            chainId: CHAIN_ID,
            sequence: account.sequence.toString(),
            memo: values.address
          };

          tx.send_order = {
            inputs: {
              "address": base64js.fromByteArray(crypto.decodeAddress(context.wallet.address)),
              "coins": {
                "denom": "BNB",
                "amount": '1',
              }
            },
            outputs: {
              "address": base64js.fromByteArray(crypto.decodeAddress(ADDRESS)),
              "coins": {
                "denom": "BNB",
                "amount": '1',
              }
            }
          }

          window.mywall = context.wallet.walletconnect
          context.wallet.walletconnect
            .trustSignTransaction(NETWORK_ID, tx)
            .then(result => {
              // Returns transaction signed in json or encoded format
              window.result = result
              console.log("Successfully signed msg:", result);
              binance.bnbClient.sendRawTransaction(result, true)
                .then((response) => {
                  console.log("Response", response)
                  message.success(<Text color={'#000'}>Registered! You do not need to do this again.</Text>, 10)
                  setSending(false)
                  setVisible(false)
                })
                .catch((error) => {
                  message.error(error.message)
                  setSending(false)
                  setVisible(false)
                  console.error(error)
                })
            })
            .catch(error => {
              // Error returned when rejected
              console.error(error);
              message.error(error.message)
              setSending(false)
              setVisible(false)
            });
          return
        })
        .catch((error) => {
          window.err = error
          message.error(error.message)
          setSending(false)
          setVisible(false)
          console.error(error)
          return
        })
    } else {

      if (context.wallet.keystore) {
        try {
          const privateKey = crypto.getPrivateKeyFromKeyStore(
            context.wallet.keystore,
            values.password
          )
          binance.setPrivateKey(privateKey)

        } catch (err) {
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
      } else {
        throw new Error("no wallet detected")
      }

      try {
        await Binance.bnbClient.transfer(
          context.wallet.address,
          ADDRESS,
          '0.00000001',
          'BNB',
          values.address)

        setSending(false)
        setVisible(false)
        message.success(<Text color={'#000'}>Registered! You do not need to do this again.</Text>, 10)
      } catch (err) {
        window.err = err
        console.error("Staking error:", err)
        message.error(err.message)
        setSending(false)
        setVisible(false)
      }
      binance.clearPrivateKey()

    }

  }


  const handleCancel = () => {
    setVisible(false)
  }

  const passwordRequired = context.wallet && 'keystore' in context.wallet

  return (

    <div style={{ marginTop: 20, marginLeft: 5 }}>

      <Row>

        <Col xs={24} sm={24} md={1} lg={2}>
        </Col>

        <Col xs={24} sm={24} md={22} lg={20}>
          <div>
            <H1>THORCHAIN COLLECTIBLES</H1>
          </div>

          <div>
            <Text size={18}>
              Register to earn a unique THORChain Collectible.
          </Text>
          </div>

          <div style={{ marginTop: "20px" }}>

            <Row style={{ marginTop: "40px" }}>

              {!context.wallet &&
                <Link to="/wallet/unlock"><Button fill>CONNECT WALLET</Button></Link>
              }
              {context.wallet &&
                <Button
                  style={{ height: 40, width: 200, marginTop: 10 }}
                  onClick={() => { confirmation() }}
                  loading={sending}
                >REGISTER</Button>
              }

            </Row>

            <Row style={{ marginTop: "40px" }}>

              <Col>
                <h4 style={{ color: "#848E9C" }}><span>COLLECTIBLES WILL BE DISTRIBUTED SOON, VIA THE FOLLOWING METHODS:</span></h4>
                <br></br>
                <p>1) Distributed based on lottery format, weighted with date of first staking transaction.</p>
                <p>2) Distributed based on amount of stake.</p>
                <p>3) Distributed based on exemplary community contributions.</p>
                <p>4) Other campaigns in the future.</p>
                <br></br>
                <p style={{ fontSize: 14, color: "#848E9C" }}>THORChain Collectibles are still undergoing development, but they will span the full 9 worlds, featuring all of the Norse characters.</p>
                <br></br><br></br>
                <Center>
                  <Icon icon="collectible" style={{ width: 1024 }} />
                </Center>

              </Col>

            </Row>

          </div>

          <Modal
            title={"REGISTER"}
            visible={visible}
            footer={null}
            onCancel={handleCancel}
            bodyStyle={{ backgroundColor: "#101921", paddingBottom: 0 }}
            headStyle={{ backgroundColor: "#2B3947", color: "#fff" }}
          >
            <WrappedStakeForm fee={fee} password={passwordRequired} button={'REGISTER'} onSubmit={handleOk} onCancel={handleCancel} loading={sending} />
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
        {getFieldDecorator('address', {
          rules: [{ required: true, message: 'Please input the ethereum address you wish to receive your collectibles at:' }],
        })(
          <Input
            placeholder="Enter your ethereum address to receive collectibles at:"
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
        <div style={{ float: "right" }}>
          <Button onClick={props.onCancel} >Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
            loading={props.loading}
            style={{ marginLeft: 10 }}
          >
            {props.button.charAt(0).toUpperCase() + props.button.slice(1)}
          </Button>
          <div style={{ padding: 0, margin: 0 }}>
            <Text style={{ float: "right" }} size={12} color="#EE5366">Network Fee: {props.fee} BNB</Text>
          </div>
        </div>
      </Form.Item>
    </Form>
  );
}

const WrappedStakeForm = Form.create({ name: 'staking' })(StakeForm);

function mapStateToProps(state) {
  return {
    stake: state.stake,
  };
}

export default connect(mapStateToProps)(Stake)
