import React, { useContext } from 'react'

import WalletConnect from "@trustwallet/walletconnect";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";

import { Text, Button } from '../../Components'
import { Row, Col, Icon as AntIcon } from 'antd'

import { Context } from '../../../context'
import { crypto } from '@binance-chain/javascript-sdk';
import { saveLog } from '../../../services/log.api';


const WalletConnectPane = props => {

  const context = useContext(Context)

  const walletConnect = async () => {
    const walletConnector = window.mywallet = new WalletConnect({
      bridge: "https://bridge.walletconnect.org" // Required
    });

    walletConnector.killSession()

    // Check if connection is already established



    if (!walletConnector.connected) {
      console.log("Creating session");

       try {
           walletConnector.createSession().then(() => {
               // get uri for QR Code modal
               const uri = walletConnector.uri;
               // display QR Code modal
               WalletConnectQRCodeModal.open(uri, () => {
                   console.log("QR Code Modal closed");
               })

           }).catch(error => {
               saveLog("ERROR", error);
           });
       } catch(e) {
           saveLog("ERROR", e);
           console.log('error in creating session', e);
       }



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
        saveLog("INFO", `ACCOUNT: ${account} WALLET CONNECT ACCOUNTS RESULTS ${account.address} ADDR: ${crypto.decodeAddress(account.address)}`);
        context.setContext({
          "wallet": {
            "walletconnect": walletConnector,
            "address": account.address,
            "account": account,
          }
        }, () => {
          props.history.push("/stake")
        })
      })
        .catch(error => {
          // Error returned when rejected
            saveLog("ERROR", error);
            console.error(error);
        })
    })

    walletConnector.on("session_update", (error, payload) => {
      console.log('walletConnector session_update ', payload);
      if (error) {
        saveLog("ERROR", error);
        throw error;
      }

      // Get updated accounts and chainId
      // const { accounts, chainId } = payload.params[0];
    })

    const address =  context.wallet && context.wallet.address ? context.wallet.address : 'No Address';

    walletConnector.on("disconnect", (error, payload) => {
      saveLog("INFO", `${address} ${payload.params[0].message}`);
      if (error) {
        saveLog("ERROR", error);
        throw error;
      }

      // Delete walletConnector
      context.forgetWallet()
    })

  }


  const paneStyle = {
    backgroundColor: "#48515D",
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "50px",
    borderRadius: 5,
    boxShadow: "0px 0px 5px #50E3C2",
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
