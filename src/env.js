const isMainnet = true
const isTestnet = !isMainnet

const NET = isTestnet ? "testnet" : "mainnet"
const CHAIN_ID = isTestnet ? "Binance-Chain-Nile" : "Binance-Chain-Tigris"

export {
  NET,
  CHAIN_ID,
  isTestnet,
  isMainnet
}
