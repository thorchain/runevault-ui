const prod_hostnames = [
  "beptools.org",
]
const stage_hostnames = [
  "binancetools-prod.firebaseapp.com",
]

const isMainnet = prod_hostnames.includes(window.location.hostname)
const isStagenet = stage_hostnames.includes(window.location.hostname)
const isTestnet = !isMainnet && !isStagenet

const NET = isMainnet ? "mainnet" : "testnet"

export {
  NET,
  isTestnet,
  isMainnet,
  isStagenet,
}
