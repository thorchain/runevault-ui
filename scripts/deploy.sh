#!/bin/bash

ENVIRONMENT=${ENVIRONMENT:=test}
echo "Deploying environment: $ENVIRONMENT"

set -e
set -x

yarn build
firebase use binancetools-$ENVIRONMENT
firebase deploy
