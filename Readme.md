# Library API

Backend API for managing users and book loans.

## How to run

npm install
npm run dev

## Authentication

### Admin login

POST /admin/login

Body:
{
  "email": "<admin@email.com>",
  "password": "123456"
}

Returns a JWT token.

## Authentication flow

1. Login to receive a JWT token
2. Use the token in the Authorization header
3. Access protected routes
