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

Utilizar um Docker para testar
docker run -it -p 8080:4000 -v "/Totvs/Docker/sftp-local:/var/www" node bash 
