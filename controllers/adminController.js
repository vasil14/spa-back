'use strict';
const bcrypt = require('bcryptjs');
const { Admin } = require('../models');
const jwtGenerator = require('../utils/jwtGenerator');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

exports.createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({ name, email, password: bcryptPassword });

    res.status(201).send(newAdmin);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).send({ message: 'Invalid Credential' });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(400).send({ message: 'Invalid Credential' });
    }

    const tokens = jwtGenerator(admin.id);
    res.send(tokens);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESHTOKEN);

    const tokens = jwtGenerator(decoded.id);

    res.send(tokens);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const { adminCount, pageCount, queryString } = req.query;
    const limit = parseInt(adminCount);
    const offset = (parseInt(pageCount) - 1) * limit;
    const key = `%${queryString}%`;
    const { rows, count } = await Admin.findAndCountAll({
      limit,
      offset,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
      ...(queryString && {
        where: { [Op.or]: [{ name: { [Op.like]: key } }, { email: { [Op.like]: key } }] }
      })
    });
    const totalPages = Math.ceil(count / limit);
    return res.json({ data: { admins: rows, count, totalPages } });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

exports.editAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;

  try {
    const checkEmail = await Admin.findOne({ where: { email, id: { [Op.ne]: id } } });
    if (checkEmail) {
      return res.status(400).send({ message: 'This email already exists' });
    }
    const admin = await Admin.findByPk(id);
    admin.set({ name, email });
    await admin.save();
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await admin.update({ password: hashedPassword });
      await admin.save();
    }
    res.send({ message: 'Admin Updated!', data: { admin } });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    await Admin.destroy({
      where: {
        id
      }
    });
    res.send({ message: 'Admin deleted!' });
  } catch (err) {
    res.status(500).send(err);
  }
};
