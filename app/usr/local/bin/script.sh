#!/bin/bash

set -e

echo iniciando appserver

kubectl get cm-sftp -o yaml > /tmp/cm-sftp.yaml

echo "$user:$pass::::" >> /tmp/cm-sftp.yaml

kubectl path cm-sftp -f /tmp/cm-sftp.yaml