# Implementação de circuit breaker para apis

### Steps
* Instalação / Configuração da lib na aplicação (https://github.com/nodeshift/opossum).
* Copy + Paste exercício anterior, e vamos alterar a lógica de retry no client.js para utilizar a lib GOT.
* Adicionar a lib opossum para habilitarmos o circuit breaker no request.
* Alterar client.js, criando fallback no request para a api, retornando um valor default.
* Executar server.js
* Executar client.js
```