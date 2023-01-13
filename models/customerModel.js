/* eslint-disable camelcase */
const Pool = require('../config/db')

const selectAllCustomer = (limit, offset, searchParam, sortBY, sort) => {
  return Pool.query(`SELECT customers.*, to_char(dob, 'YYYY-MM-DD') as dob FROM customers WHERE lower(name) LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const selectCustomer = (id) => {
  return Pool.query(`SELECT * FROM customers WHERE id=${id}`)
}

const insertCustomer = async (data) => {
  return await Pool.query('INSERT INTO customers (name, email, password, phone) VALUES ($1, $2, $3, $4)', [data.name, data.email, data.password, data.phone]);
}

const updateCustomer = (updateQuery, data) => {
  return Pool.query(
    `UPDATE customers SET ${updateQuery} WHERE id=$${Object.keys(data).length}`,
    Object.values(data)
  )
}

const deleteCustomer = (id) => {
  return Pool.query(`DELETE FROM customers WHERE id=${id}`)
}

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM customers')
}

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM customers WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

const findEmail = (email) => {
  return Pool.query('SELECT * FROM customers WHERE email = $1', [email]);
}

module.exports = {
  selectAllCustomer,
  selectCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
  countData,
  findId,
  findEmail
}
