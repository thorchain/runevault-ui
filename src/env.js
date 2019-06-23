const prod_hostnames = [
  "binancetools.org",
  "binancetools-prod.web.app",
]
const isMainnet = prod_hostnames.includes(window.location.hostname)
const isTestnet = !isMainnet

const NET = isMainnet ? "mainnet" : "testnet"

export {
  NET,
  isTestnet,
  isMainnet,
}
