#!/bin/bash

eval $(minikube docker-env)

docker build . -t nodejs-app
kubectl create -f deploy/