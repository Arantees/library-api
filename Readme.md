# Library API

Esta API foi criada como um desafio técnico para praticar autenticação e regras de negócio relacionadas ao empréstimo de livros.

A aplicação permite:

- Login de administrador utilizando JWT
- Criação de empréstimos de livros
- Cálculo do valor do aluguel
- Cálculo de multa por atraso com desconto no primeiro atraso
- Proteção de rotas com middleware de autenticação
- Testes automatizados das regras de negócio

---

## Tecnologias utilizadas

- Node.js
- Express
- JWT
- Jest
- Nodemon

---

## Como executar o projeto

Clone o repositório e instale as dependências:

```bash
npm install
```

Para rodar a aplicação em modo desenvolvimento

```bash
npm run dev
```

## A API ficará disponível em

```http
http://localhost:3000
```

## Executando os testes

Para rodar os testes automatizados:

```bash
 npm test
```

## Autenticação

As rotas protegidas exigem autenticação via JWT.

## Login de Administrador

Endpoint responsável por gerar o token de acesso:

```http
POST /admin/login
```

Exemplo de corpo da requisição

```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

Resposta

 ```json
{

  "token": "JWT_TOKEN"
}
```

O token deve ser enviado no header das rotas protegidas

```makefile
Authorization: Bearer JWT_TOKEN
```

## Endpoints

Os endpoints foram testados utilizando o Postman, mas podem ser acessados
por qualquer cliente HTTP.

## Criar empréstimo (rota protegida)

```http
POST /loans
```

Headers

```http
Authorization: Bearer JWT_TOKEN
Content-Type: application/json
```

Exemplo de corpo da requisição

```json
{
  "userName": "Lucas",
  "bookTitle": "Clean Code",
  "days": 10
}
```

## Buscar empréstimo

 ```http
 GET /loans/:id
 ```

## Calcular valor do aluguel

 ```http
GET /loans/:id/rental
 ```

Resposta

 ```json
{
  "rentalValue": 15
}
 ```

## Calcular multa por atraso

```bash
GET /loans/:id/fine
```

Resposta

```json
{
  "fine": 4
}
```

No primeiro atraso, a multa recebe automaticamente um desconto de 50%.
