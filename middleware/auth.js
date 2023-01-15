require('dotenv').config()
const jwt = require('jsonwebtoken')

const tokenVerify = async (req, res, next) => {
  try {
    const token = req.headers?.authorization
    if (!token) {
      return res.status(403).send({
        message: `please login to access`,
        err: `forbidden`,
      })
    }
    const decoded = jwt.verify(token?.substring(7, token?.length), process.env.JWT_SECRET)
    if (decoded) return next()
  } catch (err) {
    return res.status(401).send({
      message: `Invalid token access`,
      err: `Unauthorized`,
    })
  }
}

module.exports = { tokenVerify }
