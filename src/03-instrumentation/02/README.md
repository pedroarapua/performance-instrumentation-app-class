# Implementação de Logs com bunyan

### Steps
* Instalando lib bunyan
```
npm install bunyan --save
```
* Configurar app2
  * Fazendo require da lib e criando uma instancia
  ```
  const bunyan = require('bunyan');
  const log = bunyan.createLogger({ name: 'app2' });
  ```
  * Adicionar middleware com log request/response para todas as rotas


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
* Remover todos os recursos criados
```
docker-compose down
```