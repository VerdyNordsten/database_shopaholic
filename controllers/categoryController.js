/* eslint-disable camelcase */
/* eslint-disable no-undef */
const categoryModel = require('../models/categoryModel')
const commonHelper = require('../helper/common')

const categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortBY = req.query.sortBY || 'name'
      const sort = req.query.sort || 'ASC'
      const searchParam = req.query.search || ''
      const result = await categoryModel.selectAllCategory(limit, offset, searchParam, sortBY, sort)
      const {
        rows: [count]
      } = await categoryModel.countData()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData / limit)
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage
      }
      commonHelper.response(res, result.rows, 200, 'get data success', pagination)
    } catch (error) {
      console.log(error)
    }
  },

  getDetailCategory: async (req, res) => {
    const id = Number(req.params.id)
    const { rowCount } = await categoryModel.findId(id)
    if (!rowCount) {
      return res.json({
        Message: 'data not found'
      })
    }
    categoryModel
      .selectCategory(id)
      .then((result) => {
        commonHelper.response(res, result.rows[0], 200, 'get data success')
      })
      .catch((err) => res.send(err))
  },

  createCategory: async (req, res) => {
    const { rows: [count] } = await categoryModel.countData()
    const id = Number(count.count) + 1
    const { name } = req.body
    const data = {
      id,
      name
    }
    // validate data here
    categoryModel.insertCategory(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, 'Category created')
      })
      .catch((err) => res.send(err))
  },

  updateCategory: async (req, res) => {
    try {
      const id = Number(req.params.id)
      const { name } = req.body
      const { rowCount } = await categoryModel.findId(id)
      if (!rowCount) {
        return res.json({
          Message: 'data not found'
        })
      }
      const data = {
        id,
        name
      }
      categoryModel.updateCategory(data)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, 'Category updated')
        })
        .catch((err) => res.send(err))
    } catch (error) {
      console.log(error)
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const id = Number(req.params.id)
      const { rowCount } = await categoryModel.findId(id)
      if (!rowCount) {
        return res.json({
          Message: 'data not found'
        })
      }
      categoryModel
        .deleteCategory(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, 'Category deleted')
        })
        .catch((err) => res.send(err))
    } catch (error) {
      console.log()
    }
  }
}

module.exports = categoryController
