'use strict';
const { Service, Category } = require('../models');
const { Op } = require('sequelize');

exports.addService = async (req, res) => {
  const { name, duration, price, description, categoryId } = req.body;

  try {
    const service = await Service.create({
      name,
      duration,
      price,
      categoryId,
      description
    });

    res.status(201).send(service);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAllServices = async (req, res) => {
  const { serviceCount, pageCount, queryString } = req.query;
  const limit = parseInt(serviceCount);
  const offset = (parseInt(pageCount) - 1) * limit;
  const key = `%${queryString}%`;
  try {
    const { count, rows } = await Service.findAndCountAll({
      include: [{ model: Category, attributes: ['name'] }],
      ...(serviceCount && pageCount ? { limit, offset } : {}),
      ...(queryString && { where: { name: { [Op.like]: key } } })
    });
    const totalPages = Math.ceil(count / limit);
    res.send({ rows, count, totalPages });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.editService = async (req, res) => {
  const { id } = req.params;
  const { name, duration, price, description, categoryId } = req.body;
  try {
    const service = await Service.findOne({ where: { id } });
    await service.update({ name, duration, price, description, categoryId });
    await res.send({ message: 'Service updated!' });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.body;
    await Service.destroy({ where: { id } });
    res.send({ message: 'Service deleted!' });
  } catch (e) {
    res.status(500).send(err);
  }
};
