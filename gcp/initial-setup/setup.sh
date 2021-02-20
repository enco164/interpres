CLUSTER_NAME=interpres-164-cluster
GCLOUD_PROJECT=$(gcloud config get-value project)
INSTANCE_ZONE=$(gcloud config get-value compute/zone)

cd ./scripts

echo "Create cluster"
./create-cluster.sh

echo ""
./create-service-account.sh

echo ""
./create-nginx-ingress.sh
