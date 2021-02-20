
echo "gloud project = " "$GCLOUD_PROJECT"
echo "zone = " "$INSTANCE_ZONE"

gcloud container clusters create "${CLUSTER_NAME}" --num-nodes=1

gcloud container clusters list

gcloud container clusters get-credentials ${CLUSTER_NAME}

kubectl cluster-info

echo "create cluster administrator"
kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole=cluster-admin --user=$(gcloud config get-value account)

echo "list production services"
kubectl get svc
