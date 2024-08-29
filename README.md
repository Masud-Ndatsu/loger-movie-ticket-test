# Ticketing API Documentation

This API provides routes for managing users, movies, and tickets, with authentication mechanisms in place. The API is built using the following frameworks:

- **ExpressJS**
- **NodeJS**
- **MongoDB**
  (latest stable versions)

## Table of Contents

- [User Routes](#user-routes)
  - [Register User](#register-user)
  - [Login User](#login-user)
- [Movie Routes](#movie-routes)
  - [Get All Movies](#get-all-movies)
- [Ticket Routes](#ticket-routes)
  - [Book a Ticket](#book-a-ticket)
  - [Get All Tickets](#get-all-tickets)

## SETUP

Clone this git repository:

```sh
cd loger-ticket-api

npm install

npm run dev
```

To seed movies:

```sh
node src/seed/movieSeed.js
```

## User Routes

### Register User

- **URL**: `/users/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "phone_number": "string"
  }
  ```

### Login User

- **URL**: `/users/login`
- **Method**: `POST`
- **Description**: Login a user.
- **Request Body**:

```json
{
  "email": "string",
  "password": "string"
}
```

- Responses:
  200 OK: User successfully logged in, returns JWT token.
  401 Unauthorized: Invalid credentials.

## Movie Routes

### Get All Movies

- **URL**: /movies
- **Method**: GET
- **Description**: Retrieves all movies.
- **Responses**:

```
     200 OK: Movies successfully retrieved.

```

## Ticket Routes

### Book Ticket

- **URL**: `/tickets/book`
- **Method**: `POST`
- **Description**: Book movie Ticket.
- **Request Body**:
  ```json
  {
    "movieIds": ["string", "string"]
  }
  ```
