const prod_hostnames = [
  "localhost",
]
const stage_hostnames = [
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
