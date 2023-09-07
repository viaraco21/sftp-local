#!/bin/bash

# Defina o caminho para o arquivo users.conf na sua aplicação
USERSCONF='/Totvs/Docker/sftp-local/app/src/users.conf'

# Verifique se o arquivo users.conf existe
if [ -f "$USERSCONF" ]; then
  # Crie o arquivo configmap-sftp.yaml com base no conteúdo de users.conf
  cat > /tmp/configmap-sftp.yaml <<EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: sftp-users
data:
  users.conf: |
EOF
  cat "$USERSCONF" >> /tmp/configmap-sftp.yaml

  # Aplique o arquivo YAML usando kubectl apply
  kubectl apply -f /tmp/configmap-sftp.yaml
  
  echo "Conteúdo de users.conf salvo no ConfigMap sftp-users com sucesso."
else
  echo "Arquivo users.conf não encontrado."
fi
