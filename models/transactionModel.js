/* eslint-disable camelcase */
const Pool = require("../config/db")

const selectAllTransaction = (limit, offset, searchParam, sortBY, sort) => {
  return Pool.query(`SELECT transactions.* FROM transactions WHERE lower(status) LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const selectTransaction = (id) => {
  return Pool.query(
    `SELECT * FROM transactions WHERE id=${id}`
  )
}

const insertTransaction = async (data) => {
  return await Pool.query("INSERT INTO transactions (customer_id, product_id, quantity, price, total_price, status, payment_method, shipping_address, create_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [
    data.customer_id,
    data.product_id,
    data.quantity,
    data.price,
    data.total_price,
    data.status,
    data.payment_method,
    data.shipping_address,
    data.create_at
  ])
}


const updateTransaction = (updateQuery, data) => {
  return Pool.query(`UPDATE transactions SET ${updateQuery} WHERE id=$${Object.keys(data).length}`, Object.values(data))
}

const deleteTransaction = (id) => {
  return Pool.query(`DELETE FROM transactions WHERE id=${id}`)
}

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM transactions")
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
  findId,
}
