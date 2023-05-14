# Todo Backend App 

This is a simple todo backend app built with NestJS.

There's also a front-end project that's developed in pair with this one. 
It can be accessed at https://github.com/asajim/todo-app-nextjs.

## Features
1. Create todo items where title is required and deadline is optional
2. Update a todo item (change its title, add/remove deadline, mark it as done)
3. Remove a todo item
4. All functionalities are accessible to API endpoint and
   protected through basic authentication, except the health check endpoint (`GET /`).
   Username and password used for the basic authentication are defined in `.env` file.

## Getting Started

1. Install Node.js and NPM.
2. Use Node 18 (if you have nvm installed, you can do it by typing `nvm use 18`)
3. Install the dependencies:
   ```bash
   $ npm install
   ```
4. Run the database
   ```bash
   $ docker-compose up -d
   ```
5. Start the development server:
   ```bash
   $ npm run start:dev
   ```
6. Open your browser and navigate to `http://localhost:8080`.


## Techstack

* [NestJS](https://nestjs.com/)<br/>
  NestJS is selected because it offers several advantages compared to ExpressJS, such as
  * Modular architecture
  * Dependency injection
  * Built-in testing
  * TypeScript support
  * Supports for various tools, such as Swagger, GraphQL, TypeORM, etc.
* [TypeScript](https://www.typescriptlang.org/)
* [PostgreSQL](https://www.postgresql.org/)

## Further Improvement

* No setup for production. Everything are still based on development setup.
* More testing, both unit testing but also end-to-end testing
* Add more feature
* Add more documentation
