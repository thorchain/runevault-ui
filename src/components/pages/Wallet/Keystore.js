import React, { useState, useContext } from 'react'
import { Icon, Row, Input } from 'antd'
import { crypto } from '@binance-chain/javascript-sdk'
import { FilePicker } from 'react-file-picker'

import { Context } from '../../../context'
import { Button, Text } from '../../Components'

const Keystore = props => {
  const context = useContext(Context)

  const [keystore, setKeystore] = useState(null)
  const [password, setPassword] = useState(null)

  const [keystoreError, setKeystoreError] = useState(null)

  var reader = new FileReader();
  reader.onload = () => {
    try {
      const key = JSON.parse(reader.result)
      if (!('version' in key) || !('crypto' in key)) {
        setKeystoreError("Not a valid keystore file")
      } else {
        setKeystoreError(null)
        setKeystore(key)
      }
    } catch {
      setKeystoreError("Not a valid json file")
    }
  }

  const uploadKeystore = f => {
    reader.readAsText(f)
  }

  const onPasswordChange = e => {
    setPassword(e.target.value)
  }

  const unlock = () => {
    const privateKey = crypto.getPrivateKeyFromKeyStore(keystore, password)
    const address = crypto.getAddressFromPrivateKey(privateKey)
    context.setContext({
      "wallet": {
        "keystore": keystore,
        "address": address,
      }
    }, () => {
      setPassword(null)
      setKeystore(null)
      props.history.push("/")
    })
  }

  console.log("Keystore", keystore)
  console.log("Password", password)

  return (
    <div>
      <Row style={{marginBottom: 10}}>
        <Text size={18}>Select your keystore file</Text>
      </Row>
      <Row style={{marginBottom: 10}}>
        <FilePicker
          extensions={['txt', 'json']}
          onChange={f => (uploadKeystore(f))}
          onError={err => (console.error(err))}
        >
          <div>
            <Button
              style={{padding: "0px 10px", fontSize: 14}}
              bold={true}
              fill={false}>
              <Icon type="upload" /> Upload keystore file
            </Button>&nbsp;
            {keystore && !keystoreError && 
            <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
            }
          </div>
        </FilePicker>
        {keystoreError &&
        <Text color='#FF4136'>{keystoreError}</Text>
        }
      </Row>
      <Row style={{marginTop: 30, marginBottom: 10}}>
        <Input.Password
          allowClear
          onChange={onPasswordChange}
          placeholder="Enter wallet password"
        />
      </Row>
      <Row style={{marginBottom: 10}}>
        <Button 
          disabled={keystore === null || password === null}
          onClick={unlock} 
          style={{float: "right"}}
          fill={true}
        >
          Unlock Wallet Now <Icon type="arrow-right" />
        </Button>
      </Row>
    </div>
  )
}

export default Keystore
