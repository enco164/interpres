#!/usr/bin/env bash

DOCKER_TAG=$1
NGINX_INGRESS_IP=$(kubectl get service nginx-ingress-nginx-ingress -ojson | jq -r '.status.loadBalancer.ingress[].ip')
echo "Docker image tag: '$DOCKER_TAG'"

kubectl apply -f environment-variables.yml
cat ./ingress-resource.yml | sed "s/@@NGINX_INGRESS_IP@@/$NGINX_INGRESS_IP/g" | kubectl apply -f -

cat ./gateway-deployment.yml | sed "s/@@IMAGE_TAG@@/$DOCKER_TAG/g" | kubectl apply -f -
kubectl apply -f gateway-service.yml

