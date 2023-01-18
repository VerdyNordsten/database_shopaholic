/* eslint-disable no-unused-vars */
const userModel = require("../models/userModel");
const uuid = require('uuid');
const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");
const jwt = require("jsonwebtoken");
const moment = require('moment')
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {
  registerUser: async (req, res) => {
    try{
        const { fullname, email, password, phone } = req.body;
        const checkEmail = await userModel.findEmail(email);
        if (checkEmail.rowCount > 0) {
            return res.json({
                message: 'Email already exist'
            });
        }
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const id = uuid.v4();
        const data = {
          id,
          fullname,
          email,
          password: hashPassword,
          role: 'USER',
          phone
        }
        const result = await userModel.createUser(data);
        commonHelper.response(res, result.rows, 201, 'Register has been success')
    }catch(err){
        res.send(err)
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [user],
      } = await userModel.findEmail(email);
      if (!user) {
        return res.json({
          Message: " Email is invalid",
        });
      }
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        return res.json({
          Message: " Password is invalid",
        });
      }
      user.dob = moment(user.dob).format('YYYY-MM-DD');
      delete user.password;
      let payload = {
        email: user.email,
        role: user.role,
      };
      user.token = authHelper.generateToken(payload);
      user.refreshToken = authHelper.generateRefreshToken(payload);
      commonHelper.response(res, user, 201, "login is successful");
    } catch (error) {
      console.log(error);
    }
  },

  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    let payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res, result, 200);
  },

  profileUser: async (req, res) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await userModel.findEmail(email);
    user.dob = moment(user.dob).format('YYYY-MM-DD');
    delete user.password;
    commonHelper.response(res, user, 200);
  },
};

module.exports = userController;