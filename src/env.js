const isMainnet = true
const isTestnet = !isMainnet

const NET = isTestnet ? "testnet" : "mainnet"

export {
  NET,
  isTestnet,
  isMainnet
}
