const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
// const { validate } = require('../middleware/common')

router.get('/', categoryController.getAllCategory)
router.get('/:id', categoryController.getDetailCategory)
router.post('/', categoryController.createCategory)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router
