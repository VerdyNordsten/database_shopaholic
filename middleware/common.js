/* eslint-disable camelcase */
/* eslint-disable no-undef */
const validate = (req, res, next) => {
  const { name, description, price, category_id, image, quantity } = req.body
  try {
    if (name === '' || description === '' || price === '' || category_id === '' || image === '' || quantity === '') throw new Error('kosong')
    if (isNaN(price) || isNaN(quantity) || isNaN(category_id)) throw new Error('input bukan angka')
    if (!isNaN(name) || !isNaN(description) || !isNaN(image)) throw new Error('input bukan text')
  } catch (error) {
    return res.send(`${error}`)
  }
  next()
}

// const myCors = (req, res, next) => {
//   response.setHeader('Access-Control-Allow-Origin', '*')
//   response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
//   response.setHeader('Access-Control-Headers', 'Content-Type')
//   next()
// }

module.exports = { validate }
