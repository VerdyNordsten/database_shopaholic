/* eslint-disable camelcase */
const Pool = require('../config/db')

const selectAllProduct = (limit, offset, searchParam, sortBY, sort) => {
  return Pool.query(`SELECT * FROM products WHERE lower(name) LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const selectProduct = (id) => {
  return Pool.query(`SELECT * FROM products WHERE id='${id}'`)
}

const insertProduct = (data) =>{
  const { id, name, stock, price, image, description, quantity} = data;
  return Pool.query(`INSERT INTO products(id, name, stock, price, image, description, quantity) VALUES('${id}','${name}',${stock},${price},'${image}','${description}',${quantity})`);
}

const updateProduct = (updateQuery, data) => {
  return Pool.query(
    `UPDATE products SET ${updateQuery} WHERE id=$${Object.keys(data).length}`,
    Object.values(data)
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
    Pool.query(`SELECT id FROM products WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

const findName = (name) => {
  return Pool.query('SELECT * FROM products WHERE name = $1', [name]);
}

module.exports = {
  selectAllProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findId,
  findName
}
