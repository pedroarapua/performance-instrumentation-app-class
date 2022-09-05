# Adicionando Resiliciencia com Retentativa Manual

### Steps
* Instalar a lib request-promise + request
```
npm install request request-promise --save
```
* Alterar app 1:
  * Crie uma logica para retornar sucesso ou falha dependendo de uma variável de ambiente.
  * Alterar serviço "app1_instancia1" no docker-compose, adicionando variavel de ambiente IS_RETURN_200: 1, assim sempre retornando SUCESSO para essa instancia
  * Alterar serviço "app1_instancia2" no docker-compose, adicionando variavel de ambiente IS_RETURN_200: 0, assim sempre retornando FALHA para essa instancia

* Criar app2 (client):
  * Criando pasta "app2" em "${WORKSPACE}"
  ```
  mkdir app2
  ```
  * Criar arquivo index.js em "${WORKSPACE}/app2"
  * Crie a função recursiva "requestRetry" que faça chamada no endpoint da app1, essa função deve receber o máximo de retentativas a serem feitas.
  * Crie uma rota "/get" que utilize a função criada anteriormente.
  * Criar Dockerfile, igualmente o Dockerfile do "app1", porém alterando o COPY da pasta "app1" -> "app2"
  ```
  COPY ./app2/*.js ./
  ```
  * Alterar docker-compose adicionando o app client "app2_instancia1"

* Fazer build das imagens com docker-compose
```
docker-compose build
```
* Subindo aplicações com docker-compose
```
docker-compose up -d
```
* Fazer alguns requests na aplicação.
```
watch -n 5 "curl http://localhost:3003/get"
```
* Analisar logs dos containers app1_instancia_1, app1_instancia_2, app2_instancia_1
```
docker-compose logs -f
```
* Remover todos os recursos criados
```
docker-compose down
```
