# Implementação de Alertas com policies com NewRelic APM

### Steps
* Setup NewRelic Alert
  * Acessar a url https://one.newrelic.com/launcher/nrai.launcher
  * Acessar a aba policies
  * Criar nova policy
  * Setar entidade (application) que iremos observar
  * Setar a métrica de error percentage
  * Setar opção "at least once in" com 5min
  * Setar o email (proprio) para receber o aviso

* Subindo aplicações com docker-compose
```
docker-compose up -d
```
* Recebendo email de anomalia
  * Fazer alguns requests na app1_instancia2 onde a mesma sempre retornará erro.
  ```
  watch "curl http://localhost:3002/shipping"
  docker-compose logs -f
  ```
  * Validar se o alerta foi recebido via email
* Recebendo email de anomalia restabelecida
  * Fazer alguns requests na app1_instancia1 onde a mesma sempre retornará sucesso.
  ```
  watch "curl http://localhost:3001/shipping"
  docker-compose logs -f
  ```
  * Validar se o alerta foi normalizado via email
* Remover todos os recursos criados
```
docker-compose down
```