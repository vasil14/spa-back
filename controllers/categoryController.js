'use strict';
const { Category, Service } = require('../models');
const { Op } = require('sequelize');

exports.addCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name });
    res.status(201).send(category);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getCategory = async (req, res) => {
  const { categoryCount, pageCount, queryString } = req.query;
  const limit = parseInt(categoryCount);
  const offset = (parseInt(pageCount) - 1) * limit;
  const key = `%${queryString}%`;
  try {
    const { count, rows } = await Category.findAndCountAll({
      include: [
        {
          model: Service
        }
      ],
      distinct: true,
      ...(categoryCount && pageCount ? { limit, offset } : {}),
      ...(queryString && {
        where: {
          [Op.or]: {
            name: { [Op.like]: key },
            '$Services.name$': { [Op.like]: key }
          }
        }
      })
    });
    const totalPages = Math.ceil(count / limit);
    res.send({ rows, count, totalPages });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.editCategory = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const category = await Category.findOne({ where: { id } });
    await category.update({ name });

    res.send({ message: 'Category Updated!', data: category });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.destroy({
      where: {
        id
      }
    });

    res.send({ message: 'Category deleted!' });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
