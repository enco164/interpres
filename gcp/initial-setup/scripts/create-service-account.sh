#!/usr/bin/env bash

# general service account
echo "create cloud storage service account ..."
gcloud beta iam service-accounts create interpres-164-service-account \
  --description "interpres-164 service account for cloud storage access and cloud trace by interpres-164 services" \
  --display-name "interpres-164-service-account"
echo "... done"

echo ""
echo "grant required roles ..."
gcloud projects add-iam-policy-binding interpres-164 \
  --member serviceAccount:interpres-164-service-account@interpres-164.iam.gserviceaccount.com \
  --role roles/storage.admin

echo "... done"

echo ""
echo "create service account secret ..."
# create service account key
gcloud iam service-accounts keys create ~/.keys/interpres-164-service-account.json \
  --iam-account interpres-164-service-account@interpres-164.iam.gserviceaccount.com

# Use service account key/downloaded json file to create secret
cp ~/.keys/interpres-164-service-account.json .
kubectl create secret generic interpres-164-service-account-key --from-file=key.json=interpres-164-service-account.json
rm interpres-164-service-account.json
echo "... done"

echo ""
echo "grant required roles ..."
gcloud projects add-iam-policy-binding interpres-164 \
  --member serviceAccount:interpres-164-service-account@interpres-164.iam.gserviceaccount.com \
  --role roles/cloudsql.client
echo "... done"
