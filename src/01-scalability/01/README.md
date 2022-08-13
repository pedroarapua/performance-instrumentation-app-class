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
* Criando pasta app1
```
mkdir app1
```
* Criando aquivo [app1/index.js](./app1/index.js)
* Executando Aplicação
```
node app1/index.js
```
* Validar funcionamento da api
```
curl http://localhost:3000
```

### Step 2 - Criando imagem docker da aplicação
* Criando arquivo [app1/Dockerfile](./app1/Dockerfile)
* Construindo imagem e taguiando a mesma
```
docker-compose build
```

### Step 3 - Configurando um docker-compose
* Criando arquivo [docker-compose](./docker-compose.yaml)
* Configurar [app_instancia1](./docker-compose.yaml)
* Configurar [app_instancia2](./docker-compose.yaml)
* Configurar [nginx](./docker-compose.yaml)

### Step 4 - Subindo as Aplicações + Nginx LoadBalance
```
docker-compose up -d
```

* Validar se a api ta respondendo na porta 3001
```
curl http://localhost:3001
```
* Validar se a api ta respondendo na porta 3002
```
curl http://localhost:3002
```
* Validar se o nginx ta respondendo na porta 80 e balanceando a carga entre as 2 instancias
```
curl http://localhost:80
```

### Steps 5 - Destruindo a infra criada
```
docker-compose down
```