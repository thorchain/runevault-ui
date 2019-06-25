import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { FilePicker } from 'react-file-picker'
import { crypto } from '@binance-chain/javascript-sdk'

import { Context } from '../../context'
import Binance from "../../clients/binance"

import { Row, Icon as AntIcon, Col, Modal, Button as AntButton, Form, Input, message } from 'antd'
import { H1, Icon, Button, Center, Text, Coin, WalletAddress} from "../Components"

const Transfer = (props) => {
  const { getFieldDecorator, getFieldError, isFieldTouched } = props.form;

  useEffect(() => {
    props.form.setFieldsValue({
      "ticker": props.ticker,
      "address": props.address,
      "amount": props.amount || 0,
    })
    // eslint-disable-next-line
  }, [props.ticker, props.address, props.amount])

  // const context = useContext(Context)

  // Only show error after a field is touched.
  const addressError = isFieldTouched('address') && getFieldError('address');
  const amountError = isFieldTouched('amount') && getFieldError('amount');

  const onChange = () => {
    if (props.onChange) {
      let values = props.form.getFieldsValue()
      values.ticker = props.ticker
      values.amount = parseFloat(values.amount)
      props.onChange(props.index, values)
    }
  }

  return (
    <Row>
      <Col span={3}>
        <H1>{props.index + 1}.</H1>
      </Col>
      <Col>
        <Row>
          <Form layout="inline" onChange={onChange} onSubmit={props.handleSubmit}>
            <Col span={13}>
              <div><Text size={14}>Address</Text></div>
              <Form.Item className="form-100" style={{width: "100%"}} validateStatus={addressError ? 'error' : ''} help={addressError || ''}>
                {getFieldDecorator('address', {
                  rules: [{ required: true, message: 'Please input your address!' }],
                })(
                  <Input 
                    style={{width: "100%"}}
                    placeholder="bnba1b2c3d4g5h6a1b2c3d4g5h6"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <div><Text size={14}>Amount</Text></div>
              <Form.Item className="form-100" style={{width: "100%"}} validateStatus={amountError ? 'error' : ''} help={amountError || ''}>
                {getFieldDecorator('amount', {
                  rules: [{ required: true, message: 'Please input your amount!' }],
                })(
                  <Input
                    style={{width: "100%"}}
                    placeholder="23.456"
                    addonAfter=<Text size={12}>{props.ticker}</Text>
                  />,
                )}
              </Form.Item>
            </Col>
          </Form>
        </Row>
      </Col>
    </Row>
  )
}
const WrappedTransferLine = Form.create()(Transfer);


const MultiSend = (props) => {
  const [transfers, setTransfers] = useState([{}])
  const [total, setTotal] = useState(0)
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [balances, setBalances] = useState(null)
  const [loadingBalances, setLoadingBalancer] = useState(false)
  const [multiFee, setMultiFee] = useState(null)
  const [loadingCSV, setLoadingCSV] = useState(false)

  // confirmation modal variables
  const [visible, setVisible] = useState(false)
  const [password, setPassword] = useState(null)
  const [memo, setMemo] = useState("")
  const [sending, setSending] = useState(false)
  
  const context = useContext(Context)

  useEffect(() => {
    if (context.wallet && context.wallet.address) {
      setLoadingBalancer(true)
      Binance.getBalances(context.wallet.address)
        .then((response) => {
          const b = (response || []).map((bal) => (
            {
              "icon": "coin-bep",
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
    }
    Binance.fees()
      .then((response) => {
        for (let msg of response.data) {
          if (msg.multi_transfer_fee) {
            setMultiFee(Binance.calculateFee(msg.multi_transfer_fee))
          }
        }
      })
      .catch((error) => {
        console.error(error)
      })
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
    setLoadingCSV(false)
  }

  const addTransfer = (transfer) => {
    setTransfers([...transfers, {}])
  }

  const updateTransfer = (index, transfer) => {
    transfers[index] = transfer
    setTransfers(transfers)
    setTotal(transfers.reduce((a,b) => a + (b.amount || 0), 0))
  }

  const confirmation = () => {
    setPassword("")
    setVisible(true)
  }

  const uploadCsv = (f) => {
    setLoadingCSV(true)
    reader.readAsText(f);
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
        "to": transfer.address,
        "coins": [{
          "denom": transfer.ticker,
          "amount": transfer.amount,
        }]
      }
    ))

    try {
      const privateKey = crypto.getPrivateKeyFromKeyStore(
        context.wallet.keystore,
        password
      )
      setPassword(null) // clear password
      const results = window.results = await Binance.multiSend(privateKey, context.wallet.address, transactions, memo)
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
    <div style={{margin: 10}}>
      <div>
        <H1>Multi-Sending Tool</H1>
      </div>
      <div>
        <Text size={18}>
          Easily send transactions to multiple addresses using Binance Chain batched transactions feature.
        </Text>
      </div>
      <div style={{margin: "30px 20px"}}>
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
          <Text><Link to="/wallet/unlock">Unlock your wallet</Link> to send coins to multiple recipients</Text>
          }
          {!loadingBalances && context.wallet && (balances || []).length === 0 &&
          <Text>No coins available</Text>
          }
          {!loadingBalances && context.wallet && (balances || []).length > 0 &&
          <Text>Select a coin below</Text>
          }
        </Row>
        {!loadingBalances && (balances || []).map((coin) => (
          <Row key={coin.ticker} style={coinRowStyle}>
            <Col span={coinSpan}>
              <Coin {...coin} onClick={setSelectedCoin} border={selectedCoin === coin.ticker}/>
            </Col>
          </Row>
        ))
        }
      </div>
      {selectedCoin &&
      <Row>
        <Col span={16}>
          {transfers.map((transfer, i) => (
            <WrappedTransferLine key={i} index={i} onChange={updateTransfer} ticker={selectedCoin} {...transfer} />
          ))
          }
          <Row style={{paddingRight: 5}}>
            <Col span={12}>
              <AntButton onClick={() => { addTransfer({})}} shape="circle" style={{border: "none", marginTop: 10}}>
                <Icon icon="plus" />
              </AntButton>
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
                    <Text size={14} bold>{multiFee * transfers.length}</Text> <Text size={14}>BNB</Text>
                  </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <div style={{float: "right"}}>
                  <Button 
                    disabled={transfers.length < 2} 
                    onClick={confirmation} 
                    loading={sending}
                    style={{padding: "0px 10px", fontSize: 14}} bold={true} fill={true}
                  >
                    Next
                  </Button>
                </div>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row style={coinRowStyle}>
            <Center>
              <H1>OR</H1>
            </Center>
          </Row>
          <Row style={coinRowStyle}>
            <Center>
              <Text>Upload a CSV file with in the following format:</Text>
            </Center>
          </Row>
          <Row style={coinRowStyle}>
            <Center>
              <Text bold>ADDRESS | AMOUNT</Text>
            </Center>
          </Row>
          <Row style={coinRowStyle}>
            <Center>
              <FilePicker
                extensions={['csv']}
                onChange={f => (uploadCsv(f))}
                onError={err => (console.error(err))}
              >
                <Button 
                  style={{padding: "0px 20px", fontSize: 14}}
                  loading={loadingCSV}
                  bold={true} 
                  fill={false}>
                  <AntIcon type="upload" /> Upload
                </Button>
              </FilePicker>
            </Center>
          </Row>
        </Col>
      </Row>
      }
      <Modal
        title="Confirmation"
        visible={visible}
        onOk={handleOk}
        okText={"Send Coins"}
        onCancel={handleCancel}
      >
        <div>
          Please verify and confirm addresses and amounts are EXACTLY correct!
          {transfers.map((item, i) => {
            return (
              <Row key={i} style={{margin: 20}}>
                <Text>{i+1}) {item.amount} {item.ticker} <AntIcon type="arrow-right" /> {item.address}</Text>
              </Row>
          )
          })
          }
          <div style={{margin: 20}}>
            <Input
              allowClear
              onChange={(e) => {setMemo(e.target.value || "")}}
              value={memo}
              placeholder="Enter your memo (optional)."
            />
          </div>
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

export default MultiSend
