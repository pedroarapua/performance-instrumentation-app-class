# Implementação de circuit breaker para apis

### Steps
* Instalação / Configuração da lib na aplicação (https://github.com/nodeshift/opossum).
* Criar uma api A com uma rota retornando sempre sucesso.
* Criar uma outra api B com uma rota.
* Alterar a api B para que a mesma faça um request na api A.
* Adicionar a lib opossum para habilitarmos o circuit breaker no request.
* Criar fallback no request para a api A, retornando um valor default.
* Subir apenas a aplicação B e deixar a aplicação A parada.
* Fazer alguns requests na aplicação (deverá sempre retornar o valor default do fallback).
* Subir a aplicação A.
* Fazer alguns requests na aplicação B (no começo é possível que os requests não estejam caindo na aplicação A, devido ao CB estar no estado “OPEN”).
```