# Implementação de monitoramento com NewRelic APM

### Pre Requisitos 
* Criação de conta New Relic Free (https://newrelic.com/signup?via=login).

### Steps
* Instalando/Configuration lib newrelic
  * Instalação
  ```
  npm install newrelic --save
  ```
  * Configuração app1
    * Copiar arquivo de configuração
    ```
    cp ./node_modules/newrelic/newrelic.js ./app1
    ```
    * Criar arquivo .env dentro da pasta app1 e setar a env "NEW_RELIC_LICENSE_KEY"
    * Alterar "newrelic.js" setando "app_name" e "license_key" via variavel de ambiente NEW_RELIC_LICENSE_KEY
    ```
    app_name: ['app1'],
    license_key: process.env.NEW_RELIC_LICENSE_KEY || 'license key here',
    ```
    * Fazer o require da lib no arquivo app1/index.js
    ```
    require('newrelic');
    ```
    * Alterar service "app1_instancia1" e "app1_instancia2" para adicionar o arquivo .env no docker-compose
  
* Configuração app2
    * Copiar arquivo de configuração
    ```
    cp ./node_modules/newrelic/newrelic.js ./app2
    ```
    * Criar arquivo .env dentro da pasta app2 e setar a env "NEW_RELIC_LICENSE_KEY"
    * Alterar "newrelic.js" setando "app_name" e "license_key" via variavel de ambiente NEW_RELIC_LICENSE_KEY
    ```
    app_name: ['app2'],
    license_key: process.env.NEW_RELIC_LICENSE_KEY || 'license key here',
    ```
    * Fazer o require da lib no arquivo app2/index.js
    ```
    require('newrelic');
    ```
    * Alterar service "app2_instancia1" para adicionar o arquivo .env no docker-compose
* Fazer build das imagens com docker-compose
```
docker-compose build
```
* Subindo aplicações com docker-compose
```
docker-compose up -d
```
* Fazer alguns requests na app2 e validar se a aplicação "app1" e "app2" apareceu no portal do newrelic.
```
watch "curl http://localhost:3003/get"
```
* Remover todos os recursos criados
```
docker-compose down
```