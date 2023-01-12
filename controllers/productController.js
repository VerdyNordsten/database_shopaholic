/* eslint-disable camelcase */
/* eslint-disable no-undef */
const productModel = require('../models/productModel')
const commonHelper = require('../helper/common')

const productController = {
  getAllProduct: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortBY = req.query.sortBY || 'name'
      const sort = req.query.sort || 'ASC'
      const searchParam = req.query.search || ''
      const result = await productModel.selectAllProduct(limit, offset, searchParam, sortBY, sort)
      const {
        rows: [count]
      } = await productModel.countData()
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

  getDetailProduct: async (req, res) => {
    const id = Number(req.params.id)
    const { rowCount } = await productModel.findId(id)
    if (!rowCount) {
      return res.json({
        Message: 'data not found'
      })
    }
    productModel
      .selectProduct(id)
      .then((result) => {
        commonHelper.response(res, result.rows[0], 200, 'get data success')
      })
      .catch((err) => res.send(err))
  },

  createProduct: async (req, res) => {
    const { rows: [count] } = await productModel.countData()
    const id = Number(count.count) + 1
    const { name, description, price, category_id, image, quantity } = req.body
    const data = {
      id,
      name,
      description,
      price,
      category_id,
      image,
      quantity
    }
    // validate data here
    productModel.insertProduct(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, 'Product created')
      })
      .catch((err) => res.send(err))
  },

  updateProduct: async (req, res) => {
    try {
      const id = Number(req.params.id)
      const { name, description, price, category_id, image, quantity } = req.body
      const { rowCount } = await productModel.findId(id)
      if (!rowCount) {
        return res.json({
          Message: 'data not found'
        })
      }
      const data = {
        id,
        name,
        description,
        price,
        category_id,
        image,
        quantity
      }
      productModel.updateProduct(data)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, 'Product updated')
        })
        .catch((err) => res.send(err))
    } catch (error) {
      console.log(error)
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const id = Number(req.params.id)
      const { rowCount } = await productModel.findId(id)
      if (!rowCount) {
        return res.json({
          Message: 'data not found'
        })
      }
      productModel
        .deleteProduct(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, 'Product deleted')
        })
        .catch((err) => res.send(err))
    } catch (error) {
      console.log()
    }
  }
}

module.exports = productController
