# Implementação de cache com redis

### Steps
* Instalação da lib node-redis (https://github.com/NodeRedis/node-redis).
```
npm install redis --save
```
* Alterar docker-compose
  * Adicionar service redis.
  * Adicionar variaveis de ambiente REDIS_HOST e REDIS_PORT ao service app2_instancia1 para que o mesmo possa conectar no redis.
* Alterar app2:
  * Adicionar/Configurar o redis lib.
  * Alterar função "requestRetry" para fazer a persistência do cache no redis, quando o retorno da api seja sucesso.
* Alterando fallback para buscar informação do cache
  * Criar função "requestFallbackRedis" para buscar cache no redis
  * Utilizar a função "requestFallbackRedis" na função "fallback" do circuit breaker.
* Validando execução da aplicação
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
  curl http://localhost:3003/get
  ```
  * Validar se foi gravado informações no cache do redis
  ```
  docker-compose exec redis sh
  redis-cli
  keys *
  ```
  * Forçando indisponibilidade do app1 e validando resiliência utilizando fallback do cache do redis
  ```
  docker-compose stop app1_instancia1 app1_instancia2
  curl http://localhost:3003/get
  ```
  * Forçando indisponibilidade do redis e validando resiliência utilizando fallback com informações default no app2
  ```
  docker-compose stop redis
  curl http://localhost:3003/get
  ```
* Remover todos os recursos criados
```
docker-compose down
```