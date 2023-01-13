/* eslint-disable camelcase */
/* eslint-disable no-undef */

const validateRegisterCustomer = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  try {
    const checkNameRegister = async name => {
      if (name === "") throw new Error('Name is required');
      if (!/^[a-zA-Z ]+$/.test(name)) throw new Error('Name must be alphabetic');
    };
  
    const checkEmailRegister = async email => {
      if (email === "") throw new Error('Email is required');
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) throw new Error('Invalid email format');
    };
  
    const checkPasswordRegister = async password => {
      if (password === "") throw new Error('Password is required');
      if (password.length < 8) throw new Error('Password must be at least 8 characters');
      if(/\s/.test(password)) throw new Error('Password should not contain any spaces');
    };
  
    const checkPhoneRegister = async phone => {
      if (phone === "") throw new Error('Phone number is required');
      if (!/^[0-9]{8,}$/.test(phone)) throw new Error('Invalid phone number format');
    };
    await Promise.all([
      checkNameRegister(name),
      checkEmailRegister(email),
      checkPasswordRegister(password),
      checkPhoneRegister(phone)
    ]);
    next();
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const validateUpdateCustomer = async (req, res, next) => {
  const { name, email, password, phone, dob, address } = req.body;
  try {
    const checkNameUpdate = async name => {
      if (!name) return;
      if (!/^[a-zA-Z ]+$/.test(name)) throw new Error('Name must be alphabetic');
    };
  
    const checkEmailUpdate = async email => {
      if (!email) return;
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) throw new Error('Invalid email format');
    };
  
    const checkPasswordUpdate = async password => {
      if (!password) return;
      if (password.length < 8) throw new Error('Password must be at least 8 characters');
      if(/\s/.test(password)) throw new Error('Password should not contain any spaces');
    };
  
    const checkPhoneUpdate = async phone => {
      if (!phone) return;
      if (!/^[0-9]{8,}$/.test(phone)) throw new Error('Invalid phone number format');
    };
  
    const checkDOBUpdate = async dob => {
      if (!dob) return;
      if (!/^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/.test(dob)) throw new Error('Invalid dob format (YYYY-MM-DD)');
    };
  
    const checkAddressUpdate = async address => {
      if (!address) return;
      if (!/^[a-zA-Z0-9 .,#-]+$/.test(address)) throw new Error('Invalid address format');
    };
    await Promise.all([
      checkNameUpdate(name),
      checkEmailUpdate(email),
      checkPasswordUpdate(password),
      checkPhoneUpdate(phone),
      checkDOBUpdate(dob),
      checkAddressUpdate(address)
    ]);
    next();
  } catch (error) {
    return res.json({ message: error.message });
  }
};

module.exports = { validateRegisterCustomer, validateUpdateCustomer }
