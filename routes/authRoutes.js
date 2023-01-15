const express = require('express')
const router = express.Router()

// const { upload } = require("../middlewares/userImages");
const { login } = require('../controllers/authController')

// router.post("/register", upload, register);
router.post('/login', login)

module.exports = router
