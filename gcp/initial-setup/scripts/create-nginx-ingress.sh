#!/usr/bin/env bash

helm repo add nginx-stable https://helm.nginx.com/stable
helm repo update
helm install nginx-ingress nginx-stable/nginx-ingress

echo "Verify that the nginx-ingress-controller Deployment and Service are deployed to the GKE cluster:"
kubectl get deployment nginx-ingress-nginx-ingress
kubectl get service nginx-ingress-nginx-ingress

controller_ready_line=$(kubectl --namespace default get services | grep nginx-ingress-controller | grep "<pending>")
while [ ${#controller_ready_line} -gt 0 ]; do
  echo "... nginx-ingress not ready - keep waiting ..."
  sleep 15
  controller_ready_line=$(kubectl --namespace default get services | grep nginx-ingress-controller | grep "<pending>")
done

NGINX_INGRESS_IP=$(kubectl get service nginx-ingress-nginx-ingress -ojson | jq -r '.status.loadBalancer.ingress[].ip')

cat <<EOF > ingress-resource.yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: ingress-resource
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
spec:
  rules:
  - host: ${NGINX_INGRESS_IP}.xip.io
    http:
      paths:
      - backend:
          serviceName: hello-app
          servicePort: 8080
        path: /hello
EOF

kubectl apply -f ingress-resource.yaml

echo "Verify that Ingress Resource has been created:"
kubectl get ingress ingress-resource

# Remove artifacts
rm ingress-resource.yaml

echo "Done: create-nginx-ingress.sh"
