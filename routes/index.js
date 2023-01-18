const express = require('express')
const router = express.Router()
const productRouter = require('./productRoutes')
const categoryRouter = require('./categoryRoutes')
const transactionRouter = require('./transactionRoutes')
const customerRouter = require('./customerRoutes')
const userRouter = require('./authRoutes')

router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/transaction', transactionRouter)
router.use('/customer', customerRouter)
router.use('/users', userRouter)

module.exports = router
