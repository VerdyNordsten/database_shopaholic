const Pool = require('../config/db');

const findEmail = (email) => {
  return Pool.query('SELECT * FROM users WHERE email = $1', [email]);
}

const createUser = async (data) => {
  return await Pool.query('INSERT INTO users (id, fullname, email, password, role, phone) VALUES ($1, $2, $3, $4, $5, $6)', [data.id, data.fullname, data.email, data.password, data.role, data.phone]);
}

module.exports = { findEmail, createUser}