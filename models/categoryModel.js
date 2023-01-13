/* eslint-disable camelcase */
const Pool = require('../config/db')

const selectAllCategory = (limit, offset, searchParam, sortBY, sort) => {
  return Pool.query(`SELECT * FROM categories WHERE lower(name) LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const selectCategory = (id) => {
  return Pool.query(`SELECT * FROM categories WHERE id=${id}`)
}

const insertCategory = async (data) => {
  return await Pool.query('INSERT INTO categories (name) VALUES ($1)', [data.name]);
}

const updateCategory = (updateQuery, data) => {
  return Pool.query(
    `UPDATE categories SET ${updateQuery} WHERE id=$${Object.keys(data).length}`,
    Object.values(data)
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

const findName = (name) => {
  return Pool.query('SELECT * FROM categories WHERE name = $1', [name]);
}

module.exports = {
  selectAllCategory,
  selectCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  countData,
  findId,
  findName
}
