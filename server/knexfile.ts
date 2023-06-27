require('dotenv').config()

const config = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB,
      port: 5432,
      password: process.env.DB_PASS,
      user: process.env.DB_USER,
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  test: {
    client: "pg",
    connection: {
      host: process.env.DB_TEST_HOST,
      database: process.env.DB_TEST,
      port: 5400,
      password: process.env.TEST_PASS,
      user: process.env.TEST_USER
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      directory: './test/migrations'
    },
    seeds: {
      directory: './test/seeds'
    }
  }
};

export default config