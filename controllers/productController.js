/* eslint-disable camelcase */
/* eslint-disable no-undef */
const productModel = require("../models/productModel")
const commonHelper = require("../helper/common")
const uuid = require("uuid")
var cloudinary = require("../config/cloudinary")

const productController = {
  getAllProduct: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortBY = req.query.sortBY || "name"
      const sort = req.query.sort || "ASC"
      const searchParam = req.query.search ? req.query.search.toLowerCase() : ""
      const result = await productModel.selectAllProduct(limit, offset, searchParam, sortBY, sort)
      if (result.rowCount === 0) {
        return res.json({
          message: "Data not found",
        })
      }
      const {
        rows: [count],
      } = await productModel.countData()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData / limit)
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      }
      commonHelper.response(res, result.rows, 200, "get data success", pagination)
    } catch (error) {
      console.log(error)
    }
  },

  getDetailProduct: async (req, res) => {
    const id = req.params.id
    const { rowCount } = await productModel.findId(id)
    if (!rowCount) {
      return res.json({
        Message: "data not found",
      })
    }
    productModel
      .selectProduct(id)
      .then((result) => {
        commonHelper.response(res, result.rows[0], 200, "get data success")
      })
      .catch((err) => res.send(err))
  },

  createProduct: async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image",
      })
    }
    const { name, price, stock, description, quantity } = req.body
    const id = uuid.v4()
    const imageUrl = await cloudinary.uploader.upload(req.file.path, { folder: "shopaholic" })
    let data = {
      id,
      name,
      price,
      stock,
      image: imageUrl.secure_url,
      description,
      quantity,
    }
    productModel
      .insertProduct(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, "Product created")
      })
      .catch((err) => res.send(err))
  },

  updateProduct: async (req, res) => {
    try {
      const id = Number(req.params.id)
      const { name, description, price, category_id, image, quantity } = req.body
      const checkName = await productModel.findName(name)
      if (checkName.rowCount > 0) {
        return res.json({
          message: "Product Name already exist",
        })
      }
      const { rowCount } = await productModel.findId(id)
      if (!rowCount) {
        return res.json({
          message: "Product not found",
        })
      }
      let data = {}
      let updateQuery = ""
      let message = "Product updated"
      if (name) {
        data.name = name
        updateQuery += `name=$${Object.keys(data).length}`
        message = "name " + message
      }
      if (description) {
        data.description = description
        updateQuery += `${updateQuery ? ", " : ""}description=$${Object.keys(data).length}`
        message = "description " + message
      }
      if (price) {
        data.price = price
        updateQuery += `${updateQuery ? ", " : ""}price=$${Object.keys(data).length}`
        message = "price " + message
      }
      if (category_id) {
        data.category_id = category_id
        updateQuery += `${updateQuery ? ", " : ""}category_id=$${Object.keys(data).length}`
        message = "category_id " + message
      }
      if (image) {
        data.image = image
        updateQuery += `${updateQuery ? ", " : ""}image=$${Object.keys(data).length}`
        message = "image " + message
      }
      if (quantity) {
        data.quantity = quantity
        updateQuery += `${updateQuery ? ", " : ""}quantity=$${Object.keys(data).length}`
        message = "quantity " + message
      }
      data.id = id
      productModel
        .updateProduct(updateQuery, data)
        .then(() => {
          productModel
            .findId(id)
            .then((product) => {
              commonHelper.response(res, product.rows[0], 200, message)
            })
            .catch((err) => res.send(err))
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
          Message: "Product not found",
        })
      }
      productModel
        .deleteProduct(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "Product has been deleted")
        })
        .catch((err) => res.send(err))
    } catch (error) {
      console.log()
    }
  },
}

module.exports = productController
