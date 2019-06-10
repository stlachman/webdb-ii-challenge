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
  return db("zoos");
}

function findById(id) {
  return db("zoos")
    .where({ id })
    .first();
}

function add(zoo) {
  return db("zoos").insert(zoo, "id");
}

function update(zoo, id) {
  return db("zoos")
    .where({ id })
    .update(zoo);
}

function remove(id) {
  return db("zoos")
    .where({ id })
    .del();
}
