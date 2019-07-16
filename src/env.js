const prod_hostnames = [
  "binancetools.org",
  "beptools.org",
  "binancetools-prod.firebaseapp.com",
]
const isMainnet = prod_hostnames.includes(window.location.hostname)
const isTestnet = !isMainnet

const NET = isMainnet ? "mainnet" : "testnet"

export {
  NET,
  isTestnet,
  isMainnet,
}
