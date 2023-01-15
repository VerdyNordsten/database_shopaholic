/* eslint-disable camelcase */
/* eslint-disable no-undef */
const transactionModel = require("../models/transactionModel")
const commonHelper = require("../helper/common")
const moment = require("moment")

const transactionController = {
  getAllTransaction: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortBY = req.query.sortBY || "create_at"
      const sort = req.query.sort || "ASC"
      const searchParam = req.query.search ? req.query.search.toLowerCase() : ""
      const result = await transactionModel.selectAllTransaction(limit, offset, searchParam, sortBY, sort)
      if (result.rowCount === 0) {
        return res.json({
          message: "Data not found",
        })
      }
      const {
        rows: [count],
      } = await transactionModel.countData()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData / limit)
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      }
      commonHelper.response(
        res,
        result.rows.map((data) => {
          return {
            ...data,
            create_at: moment(data.create_at).format('YYYY-MM-DD'),
            update_at: moment(data.update_at).format('YYYY-MM-DD')
          }
        }),
        200,
        "get data success",
        pagination
      )
    } catch (error) {
      console.log(error)
    }
  },

  getDetailTransaction: async (req, res) => {
    const id = Number(req.params.id)
    const { rowCount } = await transactionModel.findId(id)
    if (!rowCount) {
      return res.json({
        Message: "data not found",
      })
    }
    transactionModel
      .selectTransaction(id)
      .then((result) => {
        const data = {
          ...result.rows[0],
          create_at: moment(result.rows[0].create_at).format("YYYY-MM-DD"),
          update_at: moment(result.rows[0].update_at).format("YYYY-MM-DD"),
        }
        commonHelper.response(res, data, 200, "get data success")
      })
      .catch((err) => res.send(err))
  },

  createTransaction: async (req, res) => {
    try {
      const { customer_id, product_id, quantity, price, total_price, status, payment_method, shipping_address } = req.body
      const data = {
        customer_id,
        product_id,
        quantity,
        price,
        total_price,
        status,
        payment_method,
        shipping_address,
      }
      data.create_at = new Date()
      const result = await transactionModel.insertTransaction(data)
      commonHelper.response(res, result.rows, 201, "Transaction has been added")
    } catch (err) {
      res.send(err)
    }
  },

  updateTransaction: async (req, res) => {
    try {
      const id = Number(req.params.id)
      const { product_id, quantity, price, total_price, status, payment_method, shipping_address } = req.body
      const { rowCount } = await transactionModel.findId(id)
      if (!rowCount) {
        return res.json({
          message: "Transaction not found",
        })
      }
      let data = {}
      let updateQuery = ""
      let message = "Transaction updated"
      if (product_id) {
        data.product_id = product_id
        updateQuery += `${updateQuery ? ", " : ""}product_id=$${Object.keys(data).length}`
        message = "product_id " + message
      }
      if (quantity) {
        data.quantity = quantity
        updateQuery += `${updateQuery ? ", " : ""}quantity=$${Object.keys(data).length}`
        message = "quantity " + message
      }
      if (price) {
        data.price = price
        updateQuery += `${updateQuery ? ", " : ""}price=$${Object.keys(data).length}`
        message = "price " + message
      }
      if (total_price) {
        data.total_price = total_price
        updateQuery += `${updateQuery ? ", " : ""}total_price=$${Object.keys(data).length}`
        message = "total_price " + message
      }
      if (status) {
        data.status = status
        updateQuery += `${updateQuery ? ", " : ""}status=$${Object.keys(data).length}`
        message = "status " + message
      }
      if (payment_method) {
        data.payment_method = payment_method
        updateQuery += `${updateQuery ? ", " : ""}payment_method=$${Object.keys(data).length}`
        message = "payment_method " + message
      }
      if (shipping_address) {
        data.shipping_address = shipping_address
        updateQuery += `${updateQuery ? ", " : ""}shipping_address=$${Object.keys(data).length}`
        message = "shipping_address " + message
      }
      data.update_at = new Date()
      updateQuery += `${updateQuery ? ", " : ""}update_at=$${Object.keys(data).length}`
      data.id = id
      transactionModel
        .updateTransaction(updateQuery, data)
        .then(() => {
          transactionModel
            .findId(id)
            .then((customer) => {
              commonHelper.response(res, customer.rows[0], 200, message)
            })
            .catch((err) => res.send(err))
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
          Message: "data not found",
        })
      }
      transactionModel
        .deleteTransaction(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "transaction deleted")
        })
        .catch((err) => res.send(err))
    } catch (error) {
      console.log()
    }
  },
}

module.exports = transactionController
