const express = require('express')
const router = express.Router()
const productRouter = require('./productRoutes')
const categoryRouter = require('./categoryRoutes')
const transactionRouter = require('./transactionRoutes')
// const customerRouter = require('./customerRoutes')

router.use('/products', productRouter)
router.use('/category', categoryRouter)
router.use('/transaction', transactionRouter)
// router.use('/customer', customerRouter)

module.exports = router
