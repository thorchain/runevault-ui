import bnbClient from '@binance-chain/javascript-sdk'
import axios from 'axios'

class Binance {
  constructor() {
    this.baseURL = "https://testnet-dex.binance.org"
    this.net = "testnet"

    this.httpClient = axios.create({
      baseURL:  this.baseURL + "/api/v1",
      contentType: "application/json",
    })

    this.bnbClient = new bnbClient(this.baseURL);
  }

  setPrivateKey(privateKey) {
    this.bnbClient.setPrivateKey(privateKey)
    this.bnbClient.chooseNetwork(this.net)
    this.bnbClient.initChain()
  }

  clearPrivateKey() {
    this.bnbClient.privateKey = null
  }

  fees() {
    return this.httpClient.get("/fees")
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

  async multiSend(privateKey, address, transactions, memo="") {
    this.setPrivateKey(privateKey)

    // send coins!
    const result = await this.bnbClient.multiSend(address, transactions, memo)

    // clear private key from memory after each transaction
    this.clearPrivateKey()

    return result
  }
}

var binance = window.binance = new Binance()
export default binance
