# Implementação de Alertas com policies com NewRelic APM

### Steps
* Acessar a url https://one.newrelic.com/launcher/nrai.launcher
* Acessar a aba policies
* Criar nova policy
* Setar entidade (application) que iremos observar
* Setar a métrica de error percentage
* Setar opção "at least once in" com 5min
* Setar o email (proprio) para receber o aviso
* Subir a aplicação "01 de instrumentação" com a api A
* Instalar o artillery (o artillery irá fazer vários requests na api para termos massa de dados)
```
npm install -g artillery
```
* Executar o artillery com o target na rota de erro
```
artillery quick -r 1 -d 180 <url de erro>
```
* Esperar até o processo terminar e validar se chegou o email com o incidente.
* Esperar mais um tempo e validar se chegou o email com a resolução do incidente.

