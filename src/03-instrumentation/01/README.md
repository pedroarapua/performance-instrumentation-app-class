# Implementação de monitoramento com NewRelic APM

### Pre Requisitos 
* Criação de conta New Relic Free (https://newrelic.com/signup?via=login).

### Steps
* Instalação / Configuração da lib na aplicação (https://github.com/newrelic/node-newrelic).
* Pegar e setar token no newrelic.js (https://one.newrelic.com/launcher/account-settings-launcher.account-settings-launcher).
* Copy + Paste exercício anterior.
* Inclusão da lib na api A.
* Executar a api A.
* Fazer alguns requests na aplicação e validar se a aplicação apareceu no portal do newrelic.
* Criar uma rota na api A que retorne um erro 500.
* Fazer alguns requests na nova rota e validar se a aplicação apareceu no portal do newrelic.
* Inclusão da lib na api B.
* Fazer alguns requests na aplicação e validar se a aplicação apareceu no portal do newrelic.
* Alterar a rota criada, adicionando uma instrumentação customizada. (TODO)