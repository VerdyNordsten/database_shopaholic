const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const { validateProduct } = require('../middleware/validateProduct')

router.get('/', productController.getAllProduct)
router.get('/:id', productController.getDetailProduct)
router.post('/', validateProduct, productController.createProduct)
router.put('/:id', validateProduct, productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router
