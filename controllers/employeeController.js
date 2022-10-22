'use strict';
const { Employee, Service, Availability, employee_service } = require('../models');
const { unlink } = require('node:fs/promises');
const { Op } = require('sequelize');

const multer = require('multer');
const path = require('path');
const { getAllServices } = require('./serviceController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

exports.upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Upload proper file format!');
  }
}).single('image');

exports.addEmployee = async (req, res) => {
  const { name, role, about, services } = req.body;
  const { filename } = req.file;

  try {
    const employee = await Employee.create({
      image: filename,
      name,
      role,
      about
    });

    for (const id of services) {
      const service = await Service.findByPk(id);
      employee.addService(service);
    }

    res.send(employee);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.editEmployee = async (req, res) => {
  const { name, role, about, services } = req.body;
  const { id } = req.params;
  const { file } = req;

  try {
    const employee = await Employee.findByPk(id);
    employee.set({ name, role, about });
    await employee.save();

    if (services) {
      await employee.setServices([]);
      for (const id of services) {
        const service = await Service.findByPk(id);
        console.log(service);
        employee.addService(service);
      }
    }

    if (file) {
      await unlink(`./Images/${employee.image}`);
      await employee.update({ image: file.filename });
      await employee.save();
    }
    res.send({ message: 'Employee Updated!', data: { employee } });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getEmployees = async (req, res) => {
  const { employeeCount, pageCount, queryString } = req.query;
  const limit = parseInt(employeeCount);
  const offset = (parseInt(pageCount) - 1) * limit;
  const key = `%${queryString}%`;
  try {
    const where = {
      include: [
        {
          model: Service,
          through: {
            attributes: []
          }
        },
        { model: Availability }
      ],
      ...(queryString && { where: { name: { [Op.like]: key } } }),
      distinct: true
    };
    const rows = await Employee.findAll(where).then((rows) => {
      if (employeeCount && pageCount) {
        return rows.splice(offset, limit);
      } else return rows;
    });
    const count = await Employee.count(where);

    const totalPages = Math.ceil(count / limit);

    res.json({ rows, count, totalPages });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.destroy({
      where: {
        id
      }
    });

    res.send({ message: 'Employee deleted!' });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.findEmployees = async (req, res) => {
  const { serviceId } = req.body;
  try {
    let employee = await Employee.findAll({
      include: {
        model: Service,
        where: { id: serviceId },
        attributes: ['id', 'name'],
        through: { attributes: [] }
      },
      attributes: ['id', 'name']
    });
    //const filter = employee.filter(employee => employee.Services.length === serviceId.length)
    res.send(employee);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
