Execução do SFTP local + App de manutenção de usuários.
Feito

Compilação:
1. Primeiro deve-se compilar a imagem do app
`make build`
Feito

2. Testar localmente a aplicação com o docker run. A imagem gerada será feita apartir do VERSION + Commit (Em caso de branch diferente da MASTER)
Feito

3. Subir a imagem para o repositorio docker.totvs.io (Harbour)
`make push`
Feito

  IMPORTANTE:
  Exportar as variaveis HARBOUR_USER e HARBOUR_PASS para conseguir fazer o push da imagem. (Usuario e senha de rede da TOTVS)

Implantação:
A solução foi escrita para executar em um cluster kubernetes e para auxiliar na instalação, iremos utilizar o HELM.

Passo 1. Compilar as dependencias do chart
`helm3 dependencies build charts`
Feito

Passo 2. Ajustar os valores do arquivo values.yaml
Feito

Passo 3. Realizar a implantação do namespace com o helm

`helm3 upgrade sftp-local charts/ --namespace=sftp-local --install --debug --timeout 30000s`
Feito

Passo 4. Testar a aplicação. 
O SFTP estará escutando a porta 22 (sftp-local-service)
e o aplicativo de manutenção de usuários estará escutando na porta 4000 (sftp-users-app)

Utilizar um Docker para testar localmente
docker run -it -p 8081:4000 -v "/Totvs/Docker/sftp-local:/var/www" node bash 

depois de executar o make build
pegar a imagem no docker atraves do docker images ls para criar o container

docker run -d --name sftp-user --hostname sftp-user-svc -p 8081:4000 --entrypoint "/bin/bash" -it id-imagemdf9ff13555c4             
vai criar um container 

docker exec -it bec3de464602024c44e3209f71eb7878ae75f3112026d6fd96d692c49db19584 bash
para entrar em um container

node src/index.js 
para executar a aplicação

curl localhost:8081/users/foo 

curl --request GET \ 
  --url 'http://localhost:8081/users?=' \
  --header 'Content-Type: application/json'  


curl --request POST \ 
  --url 'http://localhost:8081/users' \  
  --header 'Content-Type: application/json' \
  --data '{"usuarioNovo": "dim", "senhaNova": "302", "grupoNovo": "1002"}'

kubernetes ***********************
k -n sftp-local port-forward sftp-local-container 3003:22
comando para fazer a coneão

k -n sftp-local exec -it sftp-local-container bash
comando para entrar no container do pod

sftp -P 3003 bar@localhost  
comando para entrar no sftp

minikube ssh 
comando para entrar no volume

services account 
comandos para verificar se eles foram criados

k -n sftp-local get serviceaccount
k -n sftp-local get serviceaccount configmap-updater        

k -n sftp-local get role
k -n sftp-local get role configmap-updater-role

k -n sftp-local get rolebinding
k -n sftp-local get rolebinding configmap-updater-rolebinding

Comando para entrar no Pod de teste
k -n sftp-local exec -it test-pod -- /bin/sh

curl -X PUT --data '{"apiVersion":"v1","kind":"ConfigMap","metadata":{"name":"sftp-config"},"data":{"key":"value"}}' -H "Content-Type: application/json" http://localhost:80/api/v1/namespaces/default/configmaps/sftp-users

curl -X PUT --data '{"apiVersion":"v1","kind":"ConfigMap","metadata":{"name":"sftp-config"},"data":{"key":"new-value"}}' -H "Content-Type: application/json" http://kubernetes.default.svc:443/api/v1/namespaces/default/configmaps/sftp-users
Comando para Atualizar o ConfigMap, Dentro do shell do pod de teste


k -n sftp-local get configmap sftp-users -o json  
comando para ver as alterações no configMap

foo:abc:1002
bar:abc:1002
baz:xyz:1003
gab:123:1004
ber:abc:1005

a URL da API do Kubernetes é https://127.0.0.1:46239

1.0.0.127

nameserver 10.96.0.10
search sftp-local.svc.cluster.local svc.cluster.local cluster.local
options ndots:5

nameserver 10.96.0.10: Isso especifica o servidor DNS que o Pod deve usar para resolver nomes de domínio. No seu caso, o servidor DNS é 10.96.0.10, que é um servidor DNS interno do Kubernetes.

sftp-local-service   ClusterIP   10.107.249.219 default
sftp-local-service   ClusterIP   10.107.249.219 sftp-local

Internal Endpoints
sftp-local-service.sftp-local:22 TCP
sftp-local-service.sftp-local:0 TCP

Cluster IP
10.106.182.175



integração entre api e sftp
A integração pode ser feita usando a biblioteca Node.js ssh2-sftp-client, que permite interagir com servidores SFTP:

comunicar com a API do Kubernetes e atualizar um ConfigMap.
Variável kubernetesApiUrl: Esta variável armazena a URL da API do Kubernetes. Ela é usada para fazer solicitações HTTP para a API do Kubernetes a fim de atualizar um ConfigMap. configuração.

há uma função chamada atualizarConfigMap que usa a biblioteca Axios para fazer uma solicitação PATCH (atualização) para o endpoint da API do Kubernetes especificado na variável kubernetesApiUrl. Esta solicitação é feita para atualizar os dados em um ConfigMap específico no cluster Kubernetes.

POSTMAN / INSONMIA / CURL --> API <--> USERS.CONF <--> SFTP

a minha aplicação salva os usuários no arquivo local const USERSCONF = './users.conf';

eu tenho que pegar este arquivo e enviar para o SFTP através do ConfigMap;

************************************************************************************
Criar um API em nodejs com o http para receber uma chamada de inclusão de novos usuarios no sftp (configmap ou secrets)

index.js
const express = require('express');
const users = require('./lib/app');
const app = express();

const { execSync } = require('child_process');

users.incluiusuario(app);

app.use(express.json());

app.get('/users/', users.listartodos); 
app.get('/users/:usuario', users.buscarusuario);
app.put('/users/:usuario', users.atualizausuario);
app.post('/users', users.incluiusuario);
app.delete('/users/:usuario', users.deletausuario);

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Servidor escutando em ${server.address().port}`)
});

module.exports = app

app.js

// Rota para adicionar um novo usuário
const incluiusuario = async (app) => {
app.post('/users', (req, res) => {
  const { usuarioNovo, senhaNova, grupoNovo } = req.body;

  if (!usuarioNovo || !senhaNova || !grupoNovo) {
    return res.status(400).json({ error: 'Informe usuarioNovo, senhaNova e grupoNovo.' });
  }

  try {
    // Execute o comando kubectl para criar o ConfigMap com os novos dados
    execSync(`kubectl create configmap sftp-users --from-literal=${usuarioNovo}:${senhaNova}:${grupoNovo}`, {
      stdio: 'inherit',
    });

    console.log('Usuário adicionado com sucesso ao ConfigMap.');

    // Adicione o novo usuário ao arquivo users.conf
    const novoConteudo = `${usuarioNovo}:${senhaNova}:${grupoNovo}\n`;

    // Executar operações de manipulação de arquivo síncronas
    const fd = fs.openSync(USERSCONF, 'a'); // Use 'a' para abrir o arquivo no modo de anexação
    fs.writeSync(fd, novoConteudo);
    fs.closeSync(fd);

    return res.status(200).json({ message: 'Usuário adicionado com sucesso ao ConfigMap e a users.conf.' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Erro ao adicionar o usuário.' });
  }
})
};
**************************************************************************************

script.sh
#!/bin/bash
#usada para indicar qual interpretador de shell deve ser usado para executar o script, neste caso shell Bash

set -e
#tornar o script mais robusto, garantindo que ele pare imediatamente quando ocorrer um erro inesperado

echo "Iniciando appserver"

# Definindo os valores das variáveis de usuário, senha e grupo
usuarioNovo="gab"
senhaNova="abc"
grupoNovo="1002"

# Crie ou atualize o arquivo /tmp/configmap-sftp.yaml com os valores do users.conf
echo "users.conf: |" > /tmp/configmap-sftp.yaml
echo "  foo:123:1001:100" >> /tmp/configmap-sftp.yaml
echo "  bar:abc:1002:100" >> /tmp/configmap-sftp.yaml
echo "  baz:xyz:1003:100" >> /tmp/configmap-sftp.yaml
echo "  ren:123:1004:100" >> /tmp/configmap-sftp.yaml
echo "  $usuarioNovo:$senhaNova:$grupoNovo" >> /tmp/configmap-sftp.yaml

# Aplique o arquivo YAML usando kubectl apply
kubectl apply -f /tmp/configmap-sftp.yaml

echo "ConfigMap sftp-users criado/atualizado com sucesso."

**************************************************************************************

