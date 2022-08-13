# Escalabilidade Manual com Nginx Load Balance e Docker

### Step 1 - Criando Aplicação
* Iniciando aplicação nodejs
```
npm init -y
```
* Instalando express lib
```
npm install express --save
```
* Criando aquivo [index.js](./index.js)
* Executando Aplicação
```
node index.js
```
* Validar funcionamento da api
```
curl http://localhost:3000
```

### Step 2 - Criando imagem docker da aplicação
* Criando arquivo [Dockerfile](./Dockerfile)
* Construindo imagem e taguiando a mesma
```
docker build -t pos-facef/app:v1.0.0 .
```

### Step 3 - Configurando um docker-compose
* Criando arquivo [docker-compose](./docker-compose.yaml)
* Configurar [app_instancia1](./docker-compose.yaml)
* Configurar [app_instancia2](./docker-compose.yaml)
* Configurar [nginx](./docker-compose.yaml)

### Step 4 - Subindo as Aplicações
* Executar aplicação 1
```
docker-compose up -d app_instancia1
```
* Validar se a api ta respondendo na porta 3001
```
curl http://localhost:3001
```
* Executar aplicação 2
```
docker-compose up -d app_instancia2
```
* Validar se a api ta respondendo na porta 3002
```
curl http://localhost:3002
```

### Steps 5 - Subindo o Nginx LoadBalance 
* Executar nginx
```
docker-compose up -d nginx
```
* Validar se o nginx ta respondendo na porta 80 e balanceando a carga entre as 2 instancias
```
curl http://localhost:80
```

### Steps 5 - Destruindo a infra criada
```
docker-compose down
```