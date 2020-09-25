# Implementação de Logs centralizados com ELK

### Steps
* Subir o ELK com o docker-compose (https://github.com/deviantony/docker-elk).
* Seguir procedimento de setup (https://github.com/deviantony/docker-elk#initial-setup).
* Validar se os containers estão UP.
```
docker container ls
```
* Logar no elasticsearch (http://localhost:9200) e no kibana (http://localhost:5601) pra validar se esta autenticando com as senhas geradas.
* Copy + Paste exercício anterior.
* Instalar lib bunyan-logstash-tcp (https://github.com/transcovo/bunyan-logstash-tcp)
* Configurar stream no bunyan apontando para o logstash na porta 5000
* Subir aplicação A ou B (só utilizaremos uma delas)
* Fazer alguns requests na aplicação
* Validar se os logs estão saindo no terminal
* Criar index no kibana com o prefixo “logstash-*” (http://localhost:5601/app/management/data/index_management/indices)
* Validar se os logs estão sendo apresentados no kibana
* Fazer configuração de parse json no logstash (https://github.com/pedroarapua/performance-instrumentation-app-class/blob/master/src/03-instrumentation/03/logstash.conf)
* Fazer o restart do container do logstash 
```
docker-compose restart logstash
```
* Fazer alguns requests na aplicação, e validar se os logs agora vieram em campos indexados
* Separação de index pattern por aplicação (TODO)
