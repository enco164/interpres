#!/usr/bin/env bash

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install postgres -f ./config/postgres-values.yml bitnami/postgresql
helm install ingress-nginx ingress-nginx/ingress-nginx


./scripts/create-jwt-secret.sh
echo ""
./scripts/create-github-auth-secret.sh
echo ""
./scripts/create-github-client-secret.sh
