# Implementação de Logs centralizados com ELK

### Steps
* Instalando lib bunyan-logstash-tcp
```
npm install bunyan-logstash-tcp --save
```
* Fazendo require da lib "bunyan-logstash-tcp" e configurar output para logstash
* Adicionar variáveis de ambiente do logstash para a "app2" no docker.compose.yaml
* Fazer build das imagens com docker-compose
```
docker-compose build
```
* Subindo aplicações com docker-compose
```
docker-compose up -d
* Fazer alguns requests na app2 e validar se os logs estão aparecendo no terminal.
```
watch "curl http://localhost:3003/get"
docker-compose logs -f app2_instancia1
```
* Criar index no kibana (http:localhost: 5601) com pattern "logstash" e analisar os logs da aplicação "app2"
* Remover todos os recursos criados
```
docker-compose down
```