/* eslint-disable camelcase */
const Pool = require('../config/db')

const selectAllProduct = (limit, offset, searchParam, sortBY, sort) => {
  return Pool.query(`SELECT * FROM products WHERE name LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const selectProduct = (id) => {
  return Pool.query(`SELECT * FROM products WHERE id=${id}`)
}

const insertProduct = (data) => {
  const { id, name, description, price, category_id, image, quantity } = data
  return Pool.query(`INSERT INTO products(id,name,description,price,category_id,image,quantity) VALUES(${id},'${name}','${description}',${price},${category_id},'${image}',${quantity})`)
}

const updateProduct = (data) => {
  const { id, name, description, price, category_id, image, quantity } = data
  return Pool.query(
    `UPDATE products SET name='${name}', description='${description}', price=${price}, category_id=${category_id}, image='${image}', quantity=${quantity} WHERE id=${id}`
  )
}

const deleteProduct = (id) => {
  return Pool.query(`DELETE FROM products WHERE id=${id}`)
}

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM products')
}

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM products WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

module.exports = {
  selectAllProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findId
}
