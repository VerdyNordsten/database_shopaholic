const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
// const { validateProduct } = require('../middleware/validateProduct')
const { verifyToken } = require('../middleware/auth')
const upload = require('../middleware/validateUpload')

router.get('/', productController.getAllProduct)
router.get('/:id', productController.getDetailProduct)
router.post('/', upload.single('image'), productController.createProduct)
router.put('/:id', verifyToken, upload.single('image'), productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router
