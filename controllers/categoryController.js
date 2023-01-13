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
      const searchParam = req.query.search ? req.query.search.toLowerCase() : ''
      const result = await categoryModel.selectAllCategory(limit, offset, searchParam, sortBY, sort)
      if(result.rowCount === 0) {
        return res.json({
        message: 'Data not found'
        });
        }
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
        Message: 'Category not found'
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
    try {
        const { name } = req.body;
        const checkName = await categoryModel.findName(name);
        if (checkName.rowCount > 0) {
            throw new Error('Name Category already exist');
        }
        const data = {
            name
        }
        const result = await categoryModel.insertCategory(data);
        commonHelper.response(res, result.rows, 201, 'Category has been created');
    } catch (err) {
        res.json({ message: err.message });
    }
},

updateCategory: async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { name } = req.body
    const checkName = await categoryModel.findName(name);
    if (checkName.rowCount > 0) {
        return res.json({
            message: 'Category Name already exist'
        });
    }
    const { rowCount } = await categoryModel.findId(id)
    if (!rowCount) {
      return res.json({
        message: 'Category not found'
      })
    }
    let data = {};
    let updateQuery = '';
    let message = 'Category updated';
    if (name) {
      data.name = name;
      updateQuery += `name=$${Object.keys(data).length}`;
      message = 'name ' + message;
    }
    data.id = id;
    categoryModel.updateCategory(updateQuery, data)
      .then(() => {
        categoryModel.findId(id)
          .then((category) => {
            commonHelper.response(res, category.rows[0], 200, message)
          })
          .catch((err) => res.send(err))
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
          Message: 'Category not found'
        })
      }
      categoryModel
        .deleteCategory(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, 'Category has been deleted')
        })
        .catch((err) => res.send(err))
    } catch (error) {
      console.log()
    }
  }
}

module.exports = categoryController
