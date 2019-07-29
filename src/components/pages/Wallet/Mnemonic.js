import React from 'react'
import { Icon, Row } from 'antd'

import { Button, Text } from '../../Components'


const Mnemonic = props => {

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
