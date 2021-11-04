# Processo seletivo - WA Project

Passo a passo para rodar o projeto:

1. Rode `npm install`
2. Altere as variáveis no arquivo `.env`
3. Rode `yarn dev` para levantar a API.

## Um pouco sobre o projeto

A arquitetura do projeto é bem simples, as rotas chamam os controllers 
e o mesmo utiliza os repositories para trabalhar junto ao banco de dados.
Talvez não seja necessário o uso de middleware nesse projeto em específico,
porém eu quis colocar para me poupar tempo, pois a semana está muito corrida pra mim.
Não coloquei nenhum tipo de validação, pois não tive tempo.. mas se tivesse,
usaria a lib "joi".

## Documentação da API

- Exams
  @ - [POST] Create a new exam:
  - URL: http://localhost:{APP_PORT}/exams
  - BODY (JSON): 
    {
        "name": "EXAM",
        "type": "CLINICA",
        "laboratory": [
            "LAB TEST 1",
            "LAB TEST 2"
        ]
    }

  @ - [GET] List exams:
  - URL: http://localhost:{APP_PORT}/exams

  @ - [DELETE] Delete an exam:
  - URL: http://localhost:{APP_PORT}/exams/{exam_id}

  @ - [PATCH] Update an exam:
  - URL: http://localhost:{APP_PORT}/exams/{exam_id}
  - BODY (JSON): 
    {
        "name": "EXAM",
        "type": "CLINICA"
    }

  @ - [GET] List laboratories in an exam:
  - URL: http://localhost:{APP_PORT}/exams/laboratories?name=ExamName
  - QUERY STRING: 
    - param: name
    - type: string

  @ - [DELETE] Disassociate an Laboratory:
  - URL: http://localhost:{APP_PORT}/exam/{exam_id}/laboratory/{laboratory_id}/disassociate

  @ - [POST] Associate an Laboratory:
  - URL: http://localhost:{APP_PORT}/exam/{exam_id}/laboratory/{laboratory_id}/associate

- Laboratories
  @ - [POST] Create a new laboratory:
  - URL: http://localhost:{APP_PORT}/labs
  - BODY (JSON): 
    {
        "name": "Lab 1",
        "address": "st one"
    }

  @ - [PATCH] Update an laboratory:
  - URL: http://localhost:{APP_PORT}/labs/{laboratory_id}
  - BODY (JSON): 
    {
        "name": "EXAM",
        "type": "CLINICA",
        "address": "st two"
    }

  @ - [GET] List all laboratories:
  - URL: http://localhost:{APP_PORT}/labs

  @ - [DELETE] Delete an Laboratory:
  - URL: http://localhost:{APP_PORT}/labs/{laboratory_id}

