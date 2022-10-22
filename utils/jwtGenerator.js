const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(id) {
  const accessToken = jwt.sign({ id }, process.env.SETSCREW, {
    expiresIn: '3d'
  });
  const refreshToken = jwt.sign({ id }, process.env.REFRESHTOKEN, {
    expiresIn: '7d'
  });
  return { accessToken, refreshToken };
}

module.exports = jwtGenerator;
