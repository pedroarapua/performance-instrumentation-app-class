# Implementação de cache com redis

### Steps
* Instalação da lib na aplicação (https://github.com/NodeRedis/node-redis)
* Copy + Paste exercício anterior.
* Criar docker-compose com redis.
* Subir redis localmente com docker.
* Alterar a lógica do request para a api A, para criar o cache no redis quando o retorno seja com sucesso.
* Subir a aplicação A e B.
* Fazer alguns requests na aplicação.
* Validar se a informação foi gravada em cache.
* Alterar a lógica de fallback para quando a api A retornar algum erro, fazer um get no redis para verificar se temos alguma informação.
* Subir a aplicação B.
* Fazer alguns requests na aplicação B (nesse caso o CB irá se abrir e o fallback deveria ser chamado).