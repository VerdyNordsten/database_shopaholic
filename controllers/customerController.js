/* eslint-disable camelcase */
/* eslint-disable no-undef */
const customerModel = require('../models/customerModel')
const commonHelper = require('../helper/common')
const bcrypt = require('bcrypt');
const moment = require('moment')
const saltRounds = 10;

const customerController = {
  getAllCustomer: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortBY = req.query.sortBY || 'name'
      const sort = req.query.sort || 'ASC'
      const searchParam = req.query.search ? req.query.search.toLowerCase() : ''
      const result = await customerModel.selectAllCustomer(limit, offset, searchParam, sortBY, sort)
      if(result.rowCount === 0) {
        return res.json({
        message: 'Data not found'
        });
        }
      const {
        rows: [count]
      } = await customerModel.countData()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData / limit)
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage
      }
      commonHelper.response(res, result.rows.map(data => {
        return {
          ...data,
          dob: moment(data.dob).format('YYYY-MM-DD')
        }
      }), 200, 'get data success', pagination)  
    } catch (error) {
      console.log(error)
    }
  },

  getDetailCustomer: async (req, res) => {
    const id = Number(req.params.id)
    const { rowCount } = await customerModel.findId(id)
    if (!rowCount) {
      return res.json({
        Message: 'data not found'
      })
    }
    customerModel
      .selectCustomer(id)
      .then((result) => {
        commonHelper.response(res, result.rows[0], 200, 'get data success')
      })
      .catch((err) => res.send(err))
  },

  createCustomer: async (req, res) => {
    try{
        const { name, email, password, phone } = req.body;
        const checkEmail = await customerModel.findEmail(email);
        if (checkEmail.rowCount > 0) {
            return res.json({
                message: 'Email already exist'
            });
        }
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const data = {
          name,
          email,
          password: hashPassword,
          phone
        }
        const result = await customerModel.insertCustomer(data);
        commonHelper.response(res, result.rows, 201, 'Customer has been added')
    }catch(err){
        res.send(err)
    }
  },

  updateCustomer: async (req, res) => {
    try {
      const id = Number(req.params.id)
      const { name, email, password, address, phone, dob } = req.body
      const checkEmail = await customerModel.findEmail(email);
      if (checkEmail.rowCount > 0) {
          return res.json({
              message: 'Email already exist'
          });
      }
      const { rowCount } = await customerModel.findId(id)
      if (!rowCount) {
        return res.json({
          message: 'Customer not found'
        })
      }
      let data = {};
      let updateQuery = '';
      let message = 'Customer updated';
      if (name) {
        data.name = name;
        updateQuery += `name=$${Object.keys(data).length}`;
        message = 'name ' + message;
      }
      if (email) {
        data.email = email;
        updateQuery += `${updateQuery ? ', ' : ''}email=$${Object.keys(data).length}`;
        message = 'email ' + message;
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        data.password = hashedPassword;
        updateQuery += `${updateQuery ? ', ' : ''}password=$${Object.keys(data).length}`;
        message = 'password ' + message;
      }
      if (address) {
        data.address = address;
        updateQuery += `${updateQuery ? ', ' : ''}address=$${Object.keys(data).length}`;
        message = 'address ' + message;
      }
      if (phone) {
        data.phone = phone;
        updateQuery += `${updateQuery ? ', ' : ''}phone=$${Object.keys(data).length}`;
        message = 'phone ' + message;
      }
      if (dob) {
        data.dob = dob;
        updateQuery += `${updateQuery ? ', ' : ''}dob=$${Object.keys(data).length}`;
        message = 'dob ' + message;
      }
      data.id = id;
      customerModel.updateCustomer(updateQuery, data)
        .then(() => {
          customerModel.findId(id)
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

  deleteCustomer: async (req, res) => {
    try {
      const id = Number(req.params.id)
      const { rowCount } = await customerModel.findId(id)
      if (!rowCount) {
        return res.json({
          Message: 'Customer not found'
        })
      }
      customerModel
        .deleteCustomer(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, 'Customer has been deleted')
        })
        .catch((err) => res.send(err))
    } catch (error) {
      console.log()
    }
  }
}

module.exports = customerController
