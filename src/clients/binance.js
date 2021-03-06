import bnbClient from '@binance-chain/javascript-sdk'
import TokenManagement from '@binance-chain/javascript-sdk'
import axios from 'axios'

import { NET, isTestnet} from '../env'

class Binance {
  constructor() {
    this.baseURL = "https://dex.binance.org"
    this.explorerBaseURL = "https://explorer.binance.org"
    if (isTestnet) {
      this.baseURL = "https://testnet-dex.binance.org"
      this.explorerBaseURL = "https://testnet-explorer.binance.org"
    }

    this.net = NET
    console.log("Net:", this.net)

    this.httpClient = axios.create({
      baseURL:  this.baseURL + "/api/v1",
      contentType: "application/json",
    })

    this.bnbClient = new bnbClient(this.baseURL);
    this.bnbClient.chooseNetwork(this.net)
    this.bnbClient.initChain()
    this.bnbTokens = new TokenManagement(this.bnbClient).tokens;
  }

  setPrivateKey(privateKey) {
    this.bnbClient.setPrivateKey(privateKey)
    this.bnbClient.chooseNetwork(this.net)
    this.bnbClient.initChain()
  }

  useLedgerSigningDelegate(ledgerApp, preSignCb, postSignCb, errCb, hdPath) {
    return this.bnbClient.useLedgerSigningDelegate(ledgerApp, preSignCb, postSignCb, errCb, hdPath)
  }

  clearPrivateKey() {
    this.bnbClient.privateKey = null
  }

  getPrefix() {
    return isTestnet ? "tbnb" : "bnb"
  }

  txURL(tx) {
    return this.explorerBaseURL + "/tx/" + tx
  }

  fees() {
    return this.httpClient.get("/fees")
  }

  async price(symbol) {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=thorchain&vs_currencies=usd")
    return response.data.thorchain.usd ? response.data.thorchain.usd : null
  }

  // convert fee number into BNB tokens
  calculateFee(x) {
    return  x / 100000000
  }

  getBalances(address) {
    return this.bnbClient.getBalance(address)
  }

  getAccount(address) {
    return this.bnbClient.getAccount(address)
  }

  getMarkets(limit = 1000, offset = 0) {
    return this.bnbClient.getMarkets(limit, offset)
  }

  async multiSend(address, transactions, memo="") {
    // send coins!
    const result = await this.bnbClient.multiSend(address, transactions, memo)

    // clear private key from memory after each transaction
    this.clearPrivateKey()

    return result
  }
}

var binance = window.binance = new Binance()
export default binance
