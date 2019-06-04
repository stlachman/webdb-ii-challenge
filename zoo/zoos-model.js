const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true
};

const db = knex(knexConfig);

module.exports = {
  find,
  add
};

function find() {
  return db("zoos");
}

function add(zoo) {
  return db("zoos").insert(zoo, "id");
}
