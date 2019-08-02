Rune Vault
=============

UI for [RuneVault](https://runevault.org)

## Setup
```bash
yarn install
```

## Start
```bash
yarn start
```

If you need to use Ledger to connect your wallet, you need to be serving over
https. To do so....
```bash
HTTP=true yarn start
```

## Deploy
```bash
yarn deploy
```

To deploy production...
```bash
ENVIRONMENT=prod yarn deploy
```
