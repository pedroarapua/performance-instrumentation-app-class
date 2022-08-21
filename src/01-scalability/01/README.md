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
* Criar pasta "app1" em "${WORKSPACE}"
```
mkdir app1
```
* Criar arquivo index.js em "${WORKSPACE}/app1"
* Criar rota GET "/shipping" utilizando o express
* Executando Aplicação
```
node app1/index.js
```
* Validar funcionamento da api
```
curl http://localhost:3000/shipping
```
* Criar arquivo Dockerfile para a "app1" em "${WORKSPACE}/app1"
* Criar pasta nginx-conf em "${WORKSPACE}/app1"
* Criar arquivo nginx.conf em "${WORKSPACE}/app1/nginx-conf"
* Configurar um docker-compose
  * Criar arquivo docker-compose.yaml em "${WORKSPACE}"
  * Configurar app1_instancia1
  * Configurar app1_instancia2
  * Configurar nginx
* Subir as Aplicações + Nginx LoadBalance
```
docker-compose up -d
```
* Validar se o "app1_instancia1" está respondendo na porta 3001
```
curl http://localhost:3001/shipping
```
* Validar se o "app1_instancia2" está respondendo na porta 3002
```
curl http://localhost:3002/shipping
```
* Validar se o nginx ta respondendo na porta 80 e balanceando a carga entre as 2 instancias
```
watch "curl http://localhost:80/shipping"
```
* Analisar logs da app1 + nginx
```
docker-compose logs -f
```
* Destruindo a infra criada
```
docker-compose down
```