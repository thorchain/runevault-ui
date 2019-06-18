import axios from 'axios'

class Binance {
  constructor() {
    this.baseURL = "https://testnet-dex.binance.org/api/v1"

    this.client = axios.create({
      baseURL:  this.baseURL,
      contentType: "application/json",
    })
  }

  fees() {
    return this.client.get("/fees")
  }

  // convert fee number into BNB tokens
  calculateFee(x) {
    return  x / 100000000
  }
}

var binance = window.binance = new Binance()
export default binance
