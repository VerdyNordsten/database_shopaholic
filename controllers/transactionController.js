/* eslint-disable camelcase */
/* eslint-disable no-undef */
const transactionModel = require('../models/transactionModel')
const commonHelper = require('../helper/common')

const transactionController = {
  getAllTransaction: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortBY = req.query.sortBY || 'status'
      const sort = req.query.sort || 'ASC'
      const searchParam = req.query.search || ''
      const result = await transactionModel.selectAllTransaction(limit, offset, searchParam, sortBY, sort)
      const {
        rows: [count]
      } = await transactionModel.countData()
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

  getDetailTransaction: async (req, res) => {
    const id = Number(req.params.id)
    const { rowCount } = await transactionModel.findId(id)
    if (!rowCount) {
      return res.json({
        Message: 'data not found'
      })
    }
    transactionModel
      .selectTransaction(id)
      .then((result) => {
        commonHelper.response(res, result.rows[0], 200, 'get data success')
      })
      .catch((err) => res.send(err))
  },

  createTransaction: async (req, res) => {
    const { rows: [count] } = await transactionModel.countData()
    const id = Number(count.count) + 1
    const { customer_id, product_id, quantity, price, total_price, status, payment_method, shipping_address } = req.body
    const data = {
      id,
      customer_id,
      product_id,
      quantity,
      price,
      total_price,
      status,
      payment_method,
      shipping_address
    }
    transactionModel.insertTransaction(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, 'Transaction created')
      })
      .catch((err) => res.send(err))
  },

  updateTransaction: async (req, res) => {
    try {
      const id = Number(req.params.id)
      const { customer_id, product_id, quantity, price, total_price, status, payment_method, shipping_address } = req.body
      const { rowCount } = await transactionModel.findId(id)
      if (!rowCount) {
        return res.json({
          message: 'Transaction not found'
        })
      }
      const data = {
        id,
        customer_id,
        product_id,
        quantity,
        price,
        total_price,
        status,
        payment_method,
        shipping_address
      }
      transactionModel.updateTransaction(data)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, 'Transaction updated')
        })
        .catch((err) => res.send(err))
    } catch (error) {
      console.log(error)
    }
  },

  deleteTransaction: async (req, res) => {
    try {
      const id = Number(req.params.id)
      const { rowCount } = await transactionModel.findId(id)
      if (!rowCount) {
        return res.json({
          Message: 'data not found'
        })
      }
      transactionModel
        .deleteTransaction(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, 'transaction deleted')
        })
        .catch((err) => res.send(err))
    } catch (error) {
      console.log()
    }
  }
}

module.exports = transactionController
