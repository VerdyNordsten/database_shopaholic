const express = require('express')
const router = express.Router()
const userController =  require('../controllers/userController')
const { verifyToken } = require('../middleware/auth')

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/refresh-token', userController.refreshToken)
router.get('/profile', verifyToken, userController.profileUser)

module.exports = router