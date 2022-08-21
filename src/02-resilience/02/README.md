# Modificando Resiliciencia de Retry através da lib Got

### Steps
* Instalar a lib got
```
npm install got@v11.8.5 --save
```
* Alterar app2:
  * Alterar a função "requestRetry" para utilizar da lib "got".

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