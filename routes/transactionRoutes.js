const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')
// const { validate } = require('../middleware/common')

router.get('/', transactionController.getAllTransaction)
router.get('/:id', transactionController.getDetailTransaction)
router.post('/', transactionController.createTransaction)
router.put('/:id', transactionController.updateTransaction)
router.delete('/:id', transactionController.deleteTransaction)

module.exports = router
