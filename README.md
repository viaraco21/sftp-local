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
/home e ect/sftp
