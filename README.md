# nab-challenge
## Services
- log-service: handle logs came from other services
- order-service: handle information and operations related to orders.
- product-service: handle information and operations related to products.
- stock-service: handle number quantity of products.

## Source code structure
This is the basic structure for all of services:

src:
  - common -> contain common modules to support for the project.
    * error.code.js -> define error codes
    * error.js  -> error handler
    * logger.js
  - config
    * database.js
  - core -> context layer of the service.
    * service-name -> contains modules related to business logic of the service.
      + migrations -> migration files created by sequelize cli.
      + models
        * mocks
        * index.js -> contain all of models.
        * model_1.js
        * model_2.js
        + ....js
      + services -> contains logic business modules.
  - test
    * core
      + service-name
        * services
          + service.test.js -> service UT tests.
        * service.test.js -> integration tests.
  - web -> web layer.
    * controllers
      + service-name.js
    * routes
      + service-name.js
    * router.js
  - app.js
  - middleware.js


## Setup

Go inside every services and follow the steps below:

- run 'npm install'

- edit .env.example to .env
- edit POSTGRES_PASSWORD in .env with right password

- edit db information (username, database, host, port) for dev and test env in src/config/database.js
- run 'npm run db_create' and 'npm run create_db_test' to create 2 databases for the first time.

- run 'npm run migration.migrate'

- run 'npm run migration.seed'

- start app: 'npm start'

- test app: 'npm run test'

Note: need to start services with order:
- log-service
- stock-service
- product-service
- order-service

## Postman

## Assumption
- We should push logs into a message broker like kafka, rabbitmq or sqs and have a worker to consume the relevant logs instead of use REST API, because the number requests/s are usually high frequency and it's async operations.
- We should use NoSQL db like mongodb, dynamodb for log-service instead of postgresql used for this challenge.
- Here is using cote to handle service discovery and send event between services, in practice we can use other service discovery like consul or k8s and GRPC, REST API, message queue to communicate between services.
- order-service has not implemented yet. it's responsible to order products. When making an order, we need to use distributed transaction between order-service and stock-service to create an order on order-service and reduce the number of products on stock-service.
+ stock-service needs to sync the number of quantity for each products when reducing it (it means handling with race condition), we can use postgresql transaction or atomic operator to do that (there are a lot of way to handle race condition problem like using queue or using Actor model with Elixir).
+ order-service needs to create a transaction id (use uuid) every send message to stock-service to make distributed transaction.
