/* eslint-disable no-unused-vars */
const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customerController')
const { validateRegisterCustomer, validateUpdateCustomer } = require('../middleware/validateCustomer')

router.get('/', customerController.getAllCustomer)
router.get('/:id', customerController.getDetailCustomer)
router.post('/', validateRegisterCustomer, customerController.createCustomer)
router.put('/:id', validateUpdateCustomer, customerController.updateCustomer)
router.delete('/:id', customerController.deleteCustomer)

module.exports = router
