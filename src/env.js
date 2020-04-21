const isMainnet = true
const isTestnet = !isMainnet

const NET = isTestnet ? "testnet" : "mainnet"
const CHAIN_ID = isTestnet ? "Binance-Chain-Nile" : "Binance-Chain-Tigris"

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    frozenApi: process.env.REACT_APP_FROZEN_API,
    coingeckoApi: process.env.REACT_APP_COINGECKO_API,
    logApi: process.env.REACT_APP_LOG_API
};

export {
    NET,
    CHAIN_ID,
    isTestnet,
    isMainnet,
    config
}
