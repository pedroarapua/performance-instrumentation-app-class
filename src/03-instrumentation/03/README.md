# Implementação de Logs centralizados com ELK

### Steps
* Executar comando para limpar volumes, isso é necessário caso vc ja tenha subido alguma vez essa imagem
```
docker-compose down -v
```
* Clona repositório em uma pasta fora do projeto, em casos de aplicações windows dentro do disco C:
```
git clone https://github.com/deviantony/docker-elk
```
* Subir o ELK
```
docker-compose up -d
```
* Executar comando para regerar senhas
```
docker-compose exec -T elasticsearch bin/elasticsearch-setup-passwords auto --batch
```
* Alterar senha do usuários logstash_system no arquivo
```
${WORKDIR}/logstash/config/logstash.yml
```
* Alterar senha do usuários elasticsearch no arquivo
```
${WORKDIR}/logstash/pipeline/logstash.conf
```
* Alterar usuário (kibana_system) e senha do usuário do kibana
```
${WORKDIR}/kibana/config/kibana.yml
```
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
* Separação de index pattern por aplicação (TODO)
