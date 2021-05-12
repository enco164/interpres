#!/usr/bin/env bash

JWT_SECRET=$(openssl rand -base64 32 | head -c 16 ; echo)
kubectl create secret generic jwt-secret --from-literal=jwt-secret="${JWT_SECRET}"
echo "JWT_SECRET generated"
