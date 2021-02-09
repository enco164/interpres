#!/usr/bin/env bash

DOCKER_TAG=$1
echo "Docker image tag: '$DOCKER_TAG'"

kubectl apply -f ./environment-variables.yml

cat ./gateway-deployment.yml | sed "s/@@IMAGE_TAG@@/$DOCKER_TAG/g" | kubectl apply -f -
kubectl apply -f gateway-service.yml
