# Escalabilidade Manual com Nginx Load Balance e Docker

### Steps 1 - Explicar Arquivos do Projeto
* index.js
* Dockerfile
* docker-compose.yaml

### Steps 2 - Subindo as Aplicações
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

### Steps 3 - Subindo o Nginx LoadBalance 
```
* Executar nginx
```
docker-compose up -d nginx
```
* Validar se o nginx ta respondendo na porta 80 e balanceando a carga entre as 2 instancias
```
curl http://localhost:80
```