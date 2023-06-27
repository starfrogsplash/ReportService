# Report Data App API

https://user-images.githubusercontent.com/22579826/229634861-5d683a85-a454-4b17-97ec-13d9f4fb03b2.mov

A (view and create) service for storing and retrieving environmental report data with tests. 
built using:
TypeScript, jest, knex, postgres, Docker-compose, React


## Installation

You will need

- [docker](https://docs.docker.com/get-docker)
- [Node](https://nodejs.org/en/download)
- [TypeScript](https://www.typescriptlang.org/download)

### Instructions

1. you will need to create an .env file at the root of the server project, with these environment variables

```
DB_HOST=localhost
DB_USER=Report
DB_PASS=verysecretpassword
DB=Report
DB_TEST_HOST=localhost
TEST_USER=testUser
TEST_PASS=testPassword
DB_TEST=reportTest
JWT_SECRET=mysecretkey
```

2. spin up databases

```
docker-compose up
```

2. start the server
- navigate to the `server` directory

```
`npm run start` or `yarn start`
```

###
3. To run tests locally
###
```
npm run test
```

4. To start the ui
- navigate to `client` directory

```
`npm run start`
```

5. to close the databases
```
docker-compose down
```
