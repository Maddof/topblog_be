# TopBlog Backend

The backend for **TopBlog** provides a RESTful API for managing blog posts, comments, and user authentication. This server is built with **Express.js** and uses **Prisma** as the ORM to interact with a PostgreSQL database, along with JWT for secure user authentication.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

## Tech Stack

### Main Technologies

- **Express**: A lightweight framework for building the server and handling API requests.
- **Prisma**: ORM for managing data in PostgreSQL, with models for users, posts, and comments.
- **JWT (jsonwebtoken)**: Used for user authentication, generating access tokens for secure endpoints.
- **bcryptjs**: Hashes passwords to store them securely in the database.
- **cookie-parser**: Parses cookies, allowing JWT tokens to be sent securely in cookies.
- **CORS**: Configured to allow secure cross-origin requests from the frontend.

### Additional Libraries

- **express-validator**: Provides validation and sanitization for incoming request data.
- **express-rate-limit**: Limits the number of API requests to prevent abuse or brute force attacks.
- **jsdom & dompurify**: Sanitizes HTML input from users to prevent XSS attacks.

## Features

- **User Authentication**:
  - Login and signup with password hashing and JWT authentication.
  - Tokens are stored in cookies to secure sessions across requests.
- **Post Management**:
  - CRUD functionality for posts, with admin-only routes for creating and editing posts.
- **Comment Management**:
  - CRUD functionality for comments, with moderation capabilities for admins.
- **API Rate Limiting**:
  - Limits requests to sensitive routes to enhance security and prevent abuse.

## Usage

API Endpoints: The server runs on http://localhost:5000 by default. API endpoints are available for:

- /posts: Create, read, update, and delete posts.
- /comments: Create, read, update, and delete comments.
- /auth: Signup and login functionality for users.

## Folder Structure

- **index.js**: Main server file that sets up middleware, routes, and error handling.
- **routes**: Contains route files for main navigation, posts, comments, and authentication.
- **middleware**: Contains middleware, including error handling and authorization.
- **seed**: Includes scripts to seed the database with sample data.
