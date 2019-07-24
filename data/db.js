const db = require('./dbConfig');

function getUsers() {
  return db('users');
}

function getUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

function getUserByName(name) {
  return db('users')
    .where({ name })
    .first();
}

async function addUser(data) {
  const [id] = await db('users').insert(data);
  return getUserById(id);
}

module.exports = { getUsers, getUserByName, addUser };
