const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { validate } = require('../middleware/common')

router.get('/', productController.getAllProduct)
router.get('/:id', productController.getDetailProduct)
router.post('/', validate, productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router
