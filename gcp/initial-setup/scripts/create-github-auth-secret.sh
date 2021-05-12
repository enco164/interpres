#!/usr/bin/env bash

read -rp "GITHUB_CLIENT_ID: " GITHUB_CLIENT_ID
read -rsp "GITHUB_CLIENT_SECRET: " GITHUB_CLIENT_SECRET
kubectl create secret generic github-auth-secret \
  --from-literal=github_client_id="${GITHUB_CLIENT_ID}" \
  --from-literal=github_client_secret="${GITHUB_CLIENT_SECRET}"
