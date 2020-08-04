import React, { useContext } from 'react'

import WalletConnect from "@trustwallet/walletconnect";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";

import { Text, Button } from '../../Components'
import { Row, Col, Icon as AntIcon } from 'antd'

import { Context } from '../../../context'
import { crypto } from '@binance-chain/javascript-sdk'


const WalletConnectPane = props => {

  const context = useContext(Context)

  const walletConnect = async () => {
    const walletConnector = window.mywallet = new WalletConnect({
      bridge: "https://bridge.walletconnect.org" // Required
    });

    walletConnector.killSession()

    // Check if connection is already established
    if (!walletConnector.connected) {
      console.log("Creating session")
      // create new session
      walletConnector.createSession().then(() => {
        // get uri for QR Code modal
        const uri = walletConnector.uri;
        // display QR Code modal
        WalletConnectQRCodeModal.open(uri, () => {
          console.log("QR Code Modal closed");
        })
      })
    }

    // Subscribe to connection events
    walletConnector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Close QR Code Modal
      WalletConnectQRCodeModal.close();

      // Get provided accounts and chainId
      // const { accounts, chainId } = payload.params[0];

      walletConnector.getAccounts().then(result => {
        // Returns the accounts
        const account = result.find((account) => account.network === 714);
        console.log("ACCOUNT:", account)
        console.log("WALLET CONNECT ACCOUNTS RESULTS " + account.address);
        console.log("ADDR:", crypto.decodeAddress(account.address))
        context.setContext({
          "wallet": {
            "walletconnect": walletConnector,
            "address": account.address,
            "account": account,
          }
        }, () => {
          props.history.push("/")
        })
      })
        .catch(error => {
          // Error returned when rejected
          console.error(error);
        })
    })

    walletConnector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      // const { accounts, chainId } = payload.params[0];
    })

    walletConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Delete walletConnector
      context.forgetWallet()
    })

  }

  return (
    <div>

      <Row  style={{bottom: 5}}>
        <Text size={18}>Click to scan a QR code and link your mobile wallet using WalletConnect.</Text>
      </Row>

      
      <Row>
      <Col span={12}>

        <Button
                onClick={() => walletConnect()}
                fill={true}
                style={{marginTop:24, marginLeft:0}}
              >
                Connect <AntIcon type="arrow-right" />
              </Button>
              </Col>

      </Row>

    </div>
  )
}

export default WalletConnectPane
