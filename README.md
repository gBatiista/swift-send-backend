<p align="center">
  <a href="http://github.com/gBatiista/swift-send-backend/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
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

Finally, you need to create the first user to start accessing all the routes.

## Routes 
### Users:
  1 - Method: `POST` in `('/users')` to create a new user you need to pass in the body of the request a JSON with:
   - {

    `name: String`,

    `email: String`,

    `password: String`,

    `isAdmin: Boolean`,

  }

  2 - Method: `POST` in `('/login')` To login you need to pass in the body of the request a JSON with:
   - {

    `email: String`,

    `password: String`,

  }

  From now on, you need to include the authorization field in the request headers in the following format: Authorization:  `Bearer ${access_token}`

  3 - Method: `DELETE` in `('/users/:id')` To delete an existing user you need to pass user id in the request parameters.

  4 - Method: `'GET'` in `('/users/:id')` You will receive information about the user and the deliveries they have created.

  5 - Method: `'GET'` in `('/users')` You will receive a list of all users.

  6 - Method: `'PATCH'` in `('/users:id')` To update the information of an existing user, you need to pass the user ID in the request parameters, and the   new information in the request body.
  
  ### Deliveries:

  1 - Method: `POST` in `('/')` to create a new delivery you need to pass in the body of the request a JSON with:
   - {

    `item: String`,

    `shipper: String`,

    `addressee: Object like {
      `name: String`,
      `email: String`,
      `address: Object like {
        `cep: String`,
        `street: String`,
        `houseNumber: String`,
       }`,    
    },

  }

  2 - Method: `POST` in `('/login')` To login you need to pass in the body of the request a JSON with:
   - {

    `email: String`,

    `password: String`,

  }

  From now on, you need to include the authorization field in the request headers in the following format: Authorization:  `Bearer ${access_token}`

  3 - Method: `DELETE` in `('/users/:id')` To delete an existing user you need to pass user id in the request parameters.

  4 - Method: `'GET'` in `('/users/:id')` You will receive information about the user and the deliveries they have created.

  5 - Method: `'GET'` in `('/users')` You will receive a list of all users.

  6 - Method: `'PATCH'` in `('/users:id')` To update the information of an existing user, you need to pass the user ID in the request parameters, and the   new information in the request body.
