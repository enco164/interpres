#!/usr/bin/env bash

DOCKER_TAG=$1
echo "Docker image tag: '$DOCKER_TAG'"

kubectl apply -f environment-variables.yml
kubectl apply -f ingress-resource-api.yml
kubectl apply -f ingress-resource-client.yml

declare -a services=(
  "api-gateway"
  "client"
  "core"
  "integration"
  "user-management"
)

## loop through services array and apply configs
for serviceName in "${services[@]}"; do
  kubectl set image -f "$serviceName"-deployment.yml "$serviceName"=interpres/"$serviceName":"$DOCKER_TAG" --local -o yaml | kubectl apply -f -
  kubectl apply -f "$serviceName"-service.yml
done
