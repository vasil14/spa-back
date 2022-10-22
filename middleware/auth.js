const jwt = require('jsonwebtoken');
const { Admin } = require('../models');
require('dotenv').config();

const auth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SETSCREW);
      req.admin = await Admin.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Not authorized' });
    }
  }
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });
};

module.exports = auth;
