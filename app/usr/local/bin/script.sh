#!/bin/bash

set -e

echo iniciando appserver

kubectl get configmap-sftp -o yaml > /tmp/configmap-sftp.yaml

echo "$user:$pass::::" >> /tmp/configmap-sftp.yaml

kubectl path configmap-sftp -f /tmp/configmap-sftp.yaml