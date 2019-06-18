import React, { useState } from "react"
import { Row, Col, Button as AntButton, Form, Input } from 'antd'
import { H1, Icon, Button, Center, Text, PillText } from "../Components"

const Coin = ({onClick, icon, ticker, amount, border}) => {
  let styles = {width: "100%", paddingLeft: 30, cursor: "pointer"}
  if (border) {
    styles.border = "1px solid #F0B90B"
    styles.borderRadius = 6
  }
  return (
    <Center>
      <div style={styles} onClick={() => {onClick(ticker)}}>
        <Icon icon={icon} />
        <span style={{margin: "0px 10px"}}>
          {ticker}
        </span>
        <span style={{marginLeft: 10}}>
          {amount.toLocaleString()}
        </span>
      </div>
    </Center>
  )
}
Coin.defaultProps = {
  border: false,
}

const Transfer = (props) => {
  const { getFieldDecorator, getFieldError, isFieldTouched } = props.form;

  // Only show error after a field is touched.
  const addressError = isFieldTouched('address') && getFieldError('address');
  const memoError = isFieldTouched('memo') && getFieldError('memo');
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
      <Col span={2}>
        <H1>{props.index + 1}.</H1>
      </Col>
      <Col>
        <Row>
      <Form layout="inline" onChange={onChange} onSubmit={props.handleSubmit}>
        <Col span={8}>
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
          <div><Text size={14}>Memo</Text></div>
          <Form.Item className="form-100" style={{width: "100%"}} validateStatus={memoError ? 'error' : ''} help={memoError || ''}>
            {getFieldDecorator('memo', {
              rules: [{ required: true, message: 'Please input your memo!' }],
            })(
              <Input
                style={{width: "100%"}}
                placeholder="hello!"
              />,
            )}
          </Form.Item>
        </Col>
        <Col span={4}>
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
const WrappedTransferLine = Form.create({ name: 'transfer_line' })(Transfer);


const MultiSend = (props) => {
  const [transfers, setTransfers] = useState([{}])
  const [total, setTotal] = useState(0)
  const [selectedCoin, setSelectedCoin] = useState(null)

  const addTransfer = (transfer) => {
    setTransfers([...transfers, {}])
  }

  const updateTransfer = (index, transfer) => {
    transfers[index] = transfer
    setTransfers(transfers)
    setTotal(transfers.reduce((a,b) => a + (b.amount || 0), 0))
  }

  const sendCoins = () => {
    alert("TODO: send coins")
  }

  const coins = [
    {"icon": "coin-bnb", "ticker": "BNM", "amount": 23.45},
    {"icon": "coin-bep", "ticker": "CAN", "amount": 2300},
  ]

  // styling
  const coinSpan = 6
  const coinRowStyle = {margin: "10px 0px"}

  return (
    <div style={{margin: 10}}>
      <div>
        <H1>Multi-Sending Tool</H1>
      </div>
      <div>
        <Text>
          Easily send transactions to multiple addresses using Binance Chain batched transactions feature.
        </Text>
      </div>
      <div style={{margin: "30px 20px"}}>
        <Row style={coinRowStyle}>
          <Col span={coinSpan}>
            <PillText>
              bnba1b2c3d4g5h6a1b2c3d4g5h6
            </PillText>
          </Col>
        </Row>
        {coins.map((coin) => (
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
        <Col span={18}>
          {transfers.map((transfer, i) => (
            <WrappedTransferLine key={i} index={i} onChange={updateTransfer} ticker={selectedCoin} {...transfer} />
          ))
          }
          <Row>
            <Col span={10}>
              <AntButton onClick={() => { addTransfer({})}} shape="circle" style={{border: "none"}}>
                <Icon icon="plus" />
              </AntButton>
            </Col>
            <Col span={12}>
              <Row>
                <div style={{textAlign: "right"}}>
                  <Text size={14} bold>Total:</Text>&nbsp;&nbsp;
                  <Text size={14} bold>{total}</Text> <Text size={14}>{selectedCoin}</Text>
                </div>
              </Row>
              <Row>
                <div style={{textAlign: "right"}}>
                  <Text size={14} bold>Fee:</Text>&nbsp;&nbsp;
                  <Text size={14} bold>0.1</Text> <Text size={14}>BNB</Text>
                </div>
              </Row>
              <Row>
                <div style={{float: "right"}}>
                  <Button onClick={sendCoins} style={{padding: "0px 10px", fontSize: 14}} bold={true} fill={true}>Send</Button>
                </div>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          csv upload
        </Col>
      </Row>
      }
    </div>
  )
}

export default MultiSend
