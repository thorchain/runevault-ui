let NET = "testnet"

let isTestnet = window.location.hostname.endsWith("testnet.binancetools.org") || window.location.hostname.endsWith("localhost")
let isMainnet = window.location.hostname === "binancetools.org"

if (isMainnet) {
  NET = "mainnet"
}

export {
  NET,
  isTestnet,
  isMainnet,
}
