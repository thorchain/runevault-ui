import React, { useState, useContext } from 'react'
import { Icon, Row, Input } from 'antd'
import { crypto } from '@binance-chain/javascript-sdk'

import { Context } from '../../../context'
import { Button, Text } from '../../Components'

const { TextArea } = Input;

const OkIcon = ({bool}) => {
  const ty = bool ? "check" : "close"
  const clr = bool ? "#2ECC40" : "#FF4136"
  return (
    <Icon type={ty} style={{color: clr}}/>
  )
}

const Mnemonic = props => {
  const context = useContext(Context)
  const [mnemonic, setMnemonic] = useState(null)
  const [password, setPassword] = useState(null)

  const [isMin, setIsMin] = useState(false)
  const [hasSpecial, setHasSpecial] = useState(false)
  const [hasUppercase, setHasUppercase] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)

  const onMnemonicChange = value => {
    const mnemonic = value.target.value
    if (crypto.generateMnemonic(mnemonic)) {
      setMnemonic(value.target.value)
    } 
  }

  const onSessionPasswordChange = value => {
    const passwd = value.target.value
    setPassword(passwd)
    setIsMin(passwd.length >= 8)
    setHasSpecial(passwd.match(/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/))
    setHasUppercase(passwd.match(/[A-Z]/))
    setHasNumber(passwd.match(/[0-9]/))
  }

  const unlock = () => {
    const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    const keyStore = crypto.generateKeyStore(privateKey, password)
    const address = crypto.getAddressFromPrivateKey(privateKey)
    context.setContext({
      "wallet": {
        "keystore": keyStore,
        "address": address,
      }
    }, () => {
      props.history.push("/")
    })
  }

  return (
    <>
      <Row style={{marginBottom: 10}}>
        <div>
          <Text color='#FF4136' size={16} bold>This option restores a lost keystore file or password, or imports a seed from another wallet app.</Text>
        </div>
        <div>
          <Text size={12}><i>Warning! Entering your seed phrase or private key on any website is very dangerous. If you have malicious extensions installed in your browser or accidentally visit a phishing website, your assets can be stolen.</i></Text>
        </div>
      </Row>
      <Row style={{marginBottom: 10}}>
        <Text>Please enter your 24 word phrase</Text>
      </Row>
      <Row style={{marginBottom: 20}}>
        <TextArea rows={4} onChange={onMnemonicChange} />
        <Text>Please separate each word with a space.</Text>
      </Row>
      <Row style={{marginBottom: 10}}>
        <Input.Password
          allowClear
          onChange={onSessionPasswordChange}
          placeholder="Temporary session password"
        />
        <div styles={{background: '#F8F8F8', border: "1px solid #848E9C", borderRadius: 8, fontFamily: 'Helvetica', fontSize: 18, color: '#848E9C', letterSpacing: 0, lineHeight: 23, marginBottom: 10}}
        >
          <ul style={{listStyle: 'none'}}>
            <li><OkIcon bool={isMin} /> Minimum of 8 characters</li>
            <li><OkIcon bool={hasSpecial} /> Contains at least one special character</li>
            <li><OkIcon bool={hasUppercase} /> Contains at least one uppercase character</li>
            <li><OkIcon bool={hasNumber} /> Contains at least one number</li>
          </ul>
        </div>
      </Row>
      <Row style={{marginBottom: 10}}>
        <Button 
          disabled={isMin && hasNumber && hasSpecial && hasUppercase}
          onClick={unlock} 
          style={{float: "right"}}
        >
          Unlock Wallet Now
        </Button>
      </Row>
    </>
  )
}

export default Mnemonic
