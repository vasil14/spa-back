'use strict';
const { Availability, Employee } = require('../models');
const { Op } = require('sequelize');

exports.addAvailability = async (req, res) => {
  const { start_at, end_at, employeeId } = req.body;
  try {
    const availability = await Availability.create({
      employeeId,
      start_at,
      end_at
    });
    res.send(availability);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAvailability = async (req, res) => {
  const { availabilityCount, pageCount, queryString } = req.query;
  const limit = parseInt(availabilityCount);
  const offset = (parseInt(pageCount) - 1) * limit;
  const key = `%${queryString}%`;

  try {
    const { count, rows } = await Availability.findAndCountAll({
      include: [{ model: Employee, attributes: ['name'] }],
      ...(availabilityCount && pageCount && { limit, offset }),
      ...(queryString && { where: { '$Employee.name$': { [Op.like]: key } } })
    });

    const totalPages = Math.ceil(count / limit);
    res.send({ rows, count, totalPages });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.editAvailability = async (req, res) => {
  const { employeeId, start_at, end_at } = req.body;
  const { id } = req.params;

  try {
    const availability = await Availability.findByPk(id);
    await availability.set({ employeeId, start_at, end_at });
    await availability.save();

    res.send({ message: 'Availability Uodated!', data: { availability } });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.deleteAvailability = async (req, res) => {
  const { id } = req.params;

  try {
    const availability = await Availability.destroy({
      where: {
        id
      }
    });

    res.send({ message: 'Availability deleted!' });
  } catch (err) {
    res.status(500).send(err);
  }
};
