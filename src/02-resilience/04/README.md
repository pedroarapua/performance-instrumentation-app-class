# Implementação de cache com redis

### Steps
* Instalação da lib na aplicação (https://github.com/NodeRedis/node-redis)
* Copy + Paste exercício anterior.
* Criar docker-compose com redis.
* Subir redis localmente com docker.
* Alterar client.js, adicionando logica para armazenar cache no redis em caso de sucesso na chamada da api.
* Alterar client.js, adicionando logica para buscar cache do redis ao invés de sempre retornar informação padrão.
* Executar server.js
* Executar client.js