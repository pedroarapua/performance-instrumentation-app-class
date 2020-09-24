# Implementação de retry manual

### Steps
* Instalação / Configuração da lib na aplicação (https://github.com/request/request-promise).
* Criar uma api A com uma rota, forçando a mesma intercalar entre sucesso e erro na resposta.
* Criar uma outra api B com uma rota.
* Crie um função recursiva que faça chamada na rota da api A, essa função deve receber o máximo de retentativas a serem feitas.
* Adicione alguns logs para saber quando foi feito o retry.
* Utilize a função recursiva criada na rota B.
* Trate a resposta recebida na rota B e retorne sucesso ou erro.
* Fazer alguns requests na aplicação.