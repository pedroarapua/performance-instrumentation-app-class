# Implementação de circuit breaker para apis

### Steps
* Instalação da lib opossum (https://github.com/nodeshift/opossum).
```
npm install opossum --save
```
* Alterar app2:
  * Adicionar/Configurar circuit breaker através da lib "opossum"
  * Implemente os eventos do circuit breaker "open", "halfopen" e "close", assim poderemos monitorar os mesmos.
  * Implemente o fallback para o CB retornando uma informação fixa.
  * Altere a rota "/get" utilizando o circuit breaker

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
* Analisar logs dos containers app1_instancia1, app1_instancia2, app2_instancia1
```
docker-compose logs -f
```
* Parando os containers app1_instancia1 e app1_instancia2
```
docker-compose stop app1_instancia1 app1_instancia2
```
* Analisar eventos "open" and "halfopen" do circuit breaker
```
docker-compose logs -f app2_instancia1
```
* Iniciando os containers app1_instancia1 e app1_instancia2
```
docker-compose start app1_instancia1 app1_instancia2
```
* Analisar evento "close" do circuit breaker
```
docker-compose logs -f app2_instancia1
```
* Remover todos os recursos criados
```
docker-compose down
```