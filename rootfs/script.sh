#!/bin/bash
#usada para indicar qual interpretador de shell deve ser usado para executar o script, neste caso shell Bash

set -e
#tornar o script mais robusto, garantindo que ele pare imediatamente quando ocorrer um erro inesperado

echo "Iniciando appserver"

# Defina os valores das variáveis de usuário e senha
user="seu_usuario"
pass="sua_senha"

# Obtém o ConfigMap atual como YAML e redireciona para /tmp/sftp-users.yaml
kubectl get configmap sftp-users -o yaml > /tmp/sftp-users.yaml

# Adicione a linha de comando para extrair .data e salvar no arquivo /tmp/sftp-users.yaml
# é usado para obter os dados de um ConfigMap no Kubernetes e formatá-los usando a ferramenta yq
# '|', é usado para redirecionar a saída do comando anterior para o próximo comando
# 'yq', usa a ferramenta yq para formatar e exibir os dados no formato YAML
# '-r', significa "raw", o que significa que ele exibirá os dados no formato YAML sem formatação adiciona
kubectl get configmap sftp-users -o yaml | yq -r .data >> /tmp/sftp-users.yaml

# Atualiza as chaves no arquivo /tmp/sftp-users.yaml
echo "  user: $user" >> /tmp/sftp-users.yaml
echo "  pass: $pass" >> /tmp/sftp-users.yaml

# Aplique o arquivo YAML usando kubectl apply
# '--dry-run=client' antes da opção -o yaml para garantir que o comando seja executado em modo de simulação
# Isso é necessário para que o comando não crie o ConfigMap diretamente, mas apenas o exiba no formato YAML
kubectl create configmap sftp-users --from-file=users.conf=/tmp/sftp-users.yaml --dry-run=client -o yaml | kubectl apply -f -
# A saída do primeiro comando, que é o YAML do ConfigMap, é então passada para o kubectl apply -f -, que aplica o ConfigMap ao cluster

echo "ConfigMap sftp-users criado/atualizado com sucesso."