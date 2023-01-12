/* eslint-disable camelcase */
const Pool = require('../config/db')

const selectAllCategory = (limit, offset, searchParam, sortBY, sort) => {
  return Pool.query(`SELECT * FROM categories WHERE name LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const selectCategory = (id) => {
  return Pool.query(`SELECT * FROM categories WHERE id=${id}`)
}

const insertCategory = (data) => {
  const { id, name } = data
  return Pool.query(`INSERT INTO categories(id,name) VALUES(${id},'${name}')`)
}

const updateCategory = (data) => {
  const { id, name } = data
  return Pool.query(
    `UPDATE categories SET name='${name}' WHERE id=${id}`
  )
}

const deleteCategory = (id) => {
  return Pool.query(`DELETE FROM categories WHERE id=${id}`)
}

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM categories')
}

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM categories WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

module.exports = {
  selectAllCategory,
  selectCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  countData,
  findId
}
