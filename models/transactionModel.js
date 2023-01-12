/* eslint-disable camelcase */
const Pool = require('../config/db')

const selectAllTransaction = (limit, offset, searchParam, sortBY, sort) => {
  return Pool.query(`SELECT * FROM transactions WHERE status LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const selectTransaction = (id) => {
  return Pool.query(`SELECT * FROM transactions WHERE id=${id}`)
}

const insertTransaction = (data) => {
  const { id, customer_id, product_id, quantity, price, total_price, status, payment_method, shipping_address } = data
  return Pool.query(`INSERT INTO transactions(id,customer_id,product_id,quantity,price,total_price,status,payment_method,shipping_address) VALUES(${id},${customer_id},${product_id},${quantity},${price},${total_price},'${status}','${payment_method}','${shipping_address}')`)
}

const updateTransaction = (data) => {
  const { id, customer_id, product_id, quantity, price, total_price, status, payment_method, shipping_address } = data
  return Pool.query(
    `UPDATE transactions SET customer_id=${customer_id}, product_id=${product_id}, quantity=${quantity}, price=${price}, total_price=${total_price}, status='${status}', payment_method='${payment_method}', shipping_address='${shipping_address}' WHERE id=${id}`
  )
}

const deleteTransaction = (id) => {
  return Pool.query(`DELETE FROM transactions WHERE id=${id}`)
}

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM transactions')
}

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM transactions WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

module.exports = {
  selectAllTransaction,
  selectTransaction,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
  countData,
  findId
}
