#!/usr/bin/env bash

read -rp "GITHUB_APP_ID: " GITHUB_APP_ID

echo "create file named GITHUB_APP_PRIVATE_KEY with content of RSA key and then press <Enter>"
read -r
GITHUB_APP_PRIVATE_KEY=$(cat GITHUB_APP_PRIVATE_KEY)
kubectl create secret generic github-client-secret \
  --from-literal=github-app-id="${GITHUB_APP_ID}" \
  --from-literal=github-app-private-key="${GITHUB_APP_PRIVATE_KEY}"
