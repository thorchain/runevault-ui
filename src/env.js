const prod_hostnames = [
  "beptools.org",
]
const stage_hostnames = [
  "binancetools-prod.firebaseapp.com",
  "binancetools-prod.web.app",
]

const isMainnet = prod_hostnames.includes(window.location.hostname)
const isStagenet = stage_hostnames.includes(window.location.hostname)
const isTestnet = !isMainnet && !isStagenet

const NET = isTestnet ? "testnet" : "mainnet"

export {
  NET,
  isTestnet,
  isMainnet,
  isStagenet,
}
