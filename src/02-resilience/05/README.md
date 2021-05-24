# Implementação de cache com redis

### Steps
* Instalação da lib na aplicação (https://github.com/squaremo/amqp.node)
* Copy + Paste exercício anterior.
* Criar docker-compose com rabbitmq.
* Subir rabbitmq localmente com docker.
* Alterar client.js, adicionando logica para produzir mensagem para notificar responsável da aplicação servidora quando o circuit breaker abriu.
* Criar consumer.js, adicionando logica para receber mensagem e notificar responsável da aplicação servidora.
* Executar client.js
* Executar worker.js