# Role-Based Notes Management API

Backend assessment project demonstrating authentication, authorization, and CRUD operations using Node.js and Express.

---

## Overview

This project implements a RESTful API where users can register, log in, and manage notes.
The system supports role-based access control (RBAC):

* **User**

  * Create notes
  * View own notes
  * Update/Delete own notes

* **Admin**

  * View all notes
  * View all users
  * Manage system data

The API is secured using **JWT authentication** and includes validation, centralized error handling, and Swagger documentation.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcrypt password hashing
* Swagger (OpenAPI)
* Express Validator

---

## Getting Started

### 1. Clone repository

```bash
git clone https://github.com/bhanupratapvk06/Primetrade.ai-Backend-Developer-Intern-Assessment.git
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env` file in the backend root:

```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/notesdb
SECRET_KEY=supersecretkey
```

### 4. Run server

```bash
npm run dev
```

Server will start at:

```
http://localhost:4000
```

---

## API Documentation

Swagger documentation available at:

```
http://localhost:4000/api-docs
```

---

## Authentication

JWT token must be sent in header:

```
Authorization: Bearer <token>
```

---

## Main Endpoints

### Auth

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| POST   | /api/v1/auth/register | Register new user |
| POST   | /api/v1/auth/login    | Login user        |

### Admin

| Method | Endpoint                 | Description                |
| ------ | ------------------------ | -------------------------- |
| GET    | /api/v1/auth/admin/users | Get all users (Admin only) |

### Notes

| Method | Endpoint          | Description                     |
| ------ | ----------------- | ------------------------------- |
| POST   | /api/v1/notes     | Create note                     |
| GET    | /api/v1/notes     | Get notes (own or all if admin) |
| PUT    | /api/v1/notes/:id | Update note                     |
| DELETE | /api/v1/notes/:id | Delete note                     |

---

## Project Architecture

* **Controllers** → business logic
* **Routes** → endpoint definitions
* **Middlewares**

  * authMiddleware → verifies JWT
  * roleMiddleware → checks user role
  * validation → request validation
* **Models** → database schemas
* **Configs** → database connection

---

## Error Handling

All APIs return structured responses:

```
{
  "message": "Error description"
}
```

Centralized error handling middleware ensures consistent API behavior.

---

## Security Measures

* Password hashing using bcrypt
* JWT based stateless authentication
* Role-based authorization
* Input validation
* Protected routes

---

## Scalability Considerations

* Stateless JWT authentication allows horizontal scaling
* MongoDB can be deployed using replica sets
---------------------------------------------------------
* Redis caching can be added for frequent reads
* Services can be separated into Auth and Notes microservices
* Load balancing via Nginx or cloud provider

---

## Author

Primetrade.ai Backend Developer Intern Assessment Project
