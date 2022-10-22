const validator = require('validator');

const validInfo = async (req, res, next) => {
  const { password, email } = req.body;

  const newEmail = email.trim().toLowerCase();

  if (!validator.isEmail(newEmail.toLowerCase())) {
    return res.status(400).send('Email is invalid!');
  }

  const newPassword = password.trim().toLowerCase();

  if (newPassword.length < 8) {
    return res.status(400).send('Password is too short!');
  } else if (newPassword.includes('password')) {
    return res.status(400).send('Password cannot contain "password"');
  }

  next();
};

module.exports = validInfo;
