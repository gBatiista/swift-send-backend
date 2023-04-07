<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

This application is a dockerized REST API built using Node.js with the Nest.js framework and TypeScript that connects to a MySQL database through Prisma ORM, being able to CRUD new deliveries and manage users.

## Installation

```bash
$ docker-compose up --build    // note: Wait until the containers finish initializing correctly and the initial commands are completed.

after that attach to swift-send-app container using:
$ docker exec -it switf-send-app bash

and run the following command inside swift-send-app container:
$ npx prisma migrate dev --name init
```

## Running the app

The app is already online at localhost:3000, but if you want to monitor the database you can use the following command inside swift-send-app container:

```bash
$ npx prisma studio
```
Now prisma studio is online at localhost:5555

