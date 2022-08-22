# Implementação de Logs centralizados com ELK

### Steps
* Instalando lib bunyan-logstash-tcp
```
npm install bunyan-logstash-tcp --save
```

* Configurar ELK
  * Adicionar service elasticsearch em docker-compose
  * Configurar logstash
    * Criar pasta "logstash-conf" em "${WORKSPACE}/app2"
    ```
    mkdir logstash-conf
    ```
    * Criar arquivo "logstash.conf" em "${WORKSPACE}/app2/logstash-conf"
    * Adicionar service logstash em docker-compose
  * Adicionar service kibana em docker-compose

* Configurar app2
  * Adicionar bunyan-logstash-tcp para o bunyan
  * Adicionar variáveis de ambiente do logstash para a "app2" no docker.compose.yaml

* Fazer build das imagens com docker-compose
```
docker-compose build
```
* Subindo aplicações com docker-compose
```
docker-compose up -d
```
* Fazer alguns requests na app2 e validar se os logs estão aparecendo no terminal.
```
watch "curl http://localhost:3003/get"
docker-compose logs -f
```
* Criar index no kibana (http://localhost:5601) com pattern "logstash" e analisar os logs da aplicação "app2"
* Remover todos os recursos criados
```
docker-compose down
```