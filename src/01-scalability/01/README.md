# Escalabilidade Nginx Load Balance + Docker

### Steps 1 - Criação da Aplicação e Imagem Docker (pra quem quiser a imagem pronta: pedroarapua/node-web-app:latest)
* Criar uma api de Hello World, expondo a mesma na porta 3000
* Criar Dockerfile para rodar a aplicação
* Criar imagem local
```
docker build -f <docker file path + docker file name> -t scalability/node-web-app .
```

### Steps 2 - Execução da Aplicação
* Executar aplicação 1
```
docker run -p 3001:3000 -d scalability/node-web-app
```
* Validar se a api ta respondendo na porta 3001
```
curl http://localhost:3001
```
* Executar aplicação 2
```
docker run -p 3002:3000 -d scalability/node-web-app
```
* Validar se a api ta respondendo na porta 3002
```
curl http://localhost:3002
```

### Steps 3 - Criação da imagem nginx
* Pegar o IP do docker na máquina (normalmente com o nome "docker0")
```
ifconfig
```
* Criar o nginx conf apontando para as 2 aplicações
* Criar Dockerfile para substituir o nginx.conf
* Criar imagem local
```
docker build -f <docker file path + docker file name> -t scalability/nginxloadbalance .
```
* Executar nginx
```
docker run -p 3000:80 -d scalability/nginxloadbalance
```
* Validar se a api ta respondendo na porta 3002
```
curl http://localhost:3000
```