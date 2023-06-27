import Knex, { Knex as knexNs } from "knex";
import config from "./knexfile";

let db: knexNs
if (process.env.NODE_ENV === "test") {
  db = Knex(config.test)
} else {
  db = Knex(config.development)
}

export default db