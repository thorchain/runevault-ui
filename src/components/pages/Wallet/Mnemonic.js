import React, { useState, useContext } from 'react'
import { Icon, Row, Input } from 'antd'
import { crypto } from '@binance-chain/javascript-sdk'

import Binance from "../../../clients/binance"
import { Context } from '../../../context'
import { Button, Text } from '../../Components'

const { TextArea } = Input;
const hasUppercaseTest = new RegExp(/[A-Z]/)
const hasNumberTest = new RegExp(/[0-9]/)
const hasSpecialTest = new RegExp(/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/)

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

  const [passwordRequirements, setPasswordRequirements] = useState({
    isMin: false,
    hasSpecial: false,
    hasUppercase: false,
    hasNumber: false,
  })
  const [mnemonicError, setMnemonicError] = useState(null)

  const onMnemonicChange = value => {
    const mnemonic = value.target.value

    if (crypto.validateMnemonic(mnemonic)) {
      setMnemonic(value.target.value)
      setMnemonic(mnemonic)
      setMnemonicError(null)
    } else {
      if (mnemonic.length > 0) {
        setMnemonicError("Invalid mnemonic phrase.")
      } else {
        setMnemonicError(null)
      }
    }
  }

  const onSessionPasswordChange = value => {
    const passwd = value.target.value
    setPassword(passwd)
    setPasswordRequirements({
      isMin: passwd.length >= 8,
      hasSpecial: hasSpecialTest.test(passwd),
      hasUppercase: hasUppercaseTest.test(passwd),
      hasNumber: hasNumberTest.test(passwd),
    })
  }



  const unlock = () => {

    const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    const keyStore = crypto.generateKeyStore(privateKey, password)
    const address = crypto.getAddressFromPrivateKey(privateKey, Binance.getPrefix())
    context.setContext({
      "wallet": {
        "keystore": keyStore,
        "address": address,
      }
    }, () => {
      setMnemonic(null)
      setPassword(null)
      props.history.push("/stake")
    })
  }

  const okPassword = passwordRequirements.isMin && passwordRequirements.hasNumber && passwordRequirements.hasSpecial && passwordRequirements.hasUppercase
  const okMnemonic = mnemonicError === null && (mnemonic || "").length > 0
  const disabled = !okPassword || !okMnemonic

  return (
    <>
      <Row style={{marginBottom: 10}}>
        <div>
          <Text color='#EE5366' size={12}><i><b>Warning!</b> Entering your seed phrase or private key on any website is very dangerous. If you have malicious extensions installed in your browser or accidentally visit a phishing website, your assets can be stolen.</i></Text>
        </div>
      </Row>
      <Row style={{marginBottom: 10}}>
        <Text>Recover your Keystore file instead, since it is password protected.</Text>
      </Row>
      <Row style={{marginBottom: 10}}>
        <a
          href="https://www.binance.org/en/recover"
        rel="noopener noreferrer"
        target="_blank">
          <Button>
            Recover Keystore <Icon type="arrow-right" />
          </Button>
        </a>

      </Row>
    </>
  )
}

export default Mnemonic
