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
  findById,
  add,
  update,
  remove
};

function find() {
  return db("bears");
}

function findById(id) {
  return db("bears")
    .where({ id })
    .first();
}

function add(bear) {
  return db("bears").insert(bear, "id");
}

function update(bear, id) {
  return db("bears")
    .where({ id })
    .update(bear);
}

function remove(id) {
  return db("bears")
    .where({ id })
    .del();
}
