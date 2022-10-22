const { Appointment, Employee, Service, Availability, employee_service } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

exports.createAppointment = async (req, res) => {
  const {
    employeeId,
    firstName,
    lastName,
    email,
    phone,
    comment,
    date,
    start_at,
    end_at,
    duration,
    total
  } = req.body;
  try {
    const appointment = await Appointment.create({
      firstName,
      lastName,
      email,
      phone,
      comment,
      employeeId,
      date,
      start_at,
      end_at,
      duration,
      total
    });
    // for (const id of services) {
    //   const service = await Service.findByPk(id);
    //   appointment.addService(service);
    // }
    res.status(201).send(appointment);
  } catch (err) {
    res.status(500).send();
  }
};

// GET APPOINTMENTS
exports.getAppointments = async (req, res) => {
  const { appointmentCount, pageCount, queryString } = req.query;
  const limit = parseInt(appointmentCount);
  const offset = (parseInt(pageCount) - 1) * limit;
  const key = `%${queryString}%`;
  try {
    const where = {
      include: [
        // {
        //   model: Service,
        //   through: {
        //     attributes: []
        //   }
        // },
        { model: Employee, attributes: ['name'] }
      ],
      order: [['start_at', 'ASC']],
      ...(queryString && {
        where: {
          [Op.or]: {
            '$Employee.name$': {
              [Op.substring]: key
            },
            date: {
              [Op.substring]: key
            }
          }
        }
      }),
      distinct: true
    };
    const rows = await Appointment.findAll(where).then((rows) => {
      if (appointmentCount && pageCount) {
        return rows.splice(offset, limit);
      } else return rows;
    });
    const count = await Appointment.count(where);

    const totalPages = Math.ceil(count / limit);

    res.json({ rows, count, totalPages });
  } catch (err) {
    res.status(500).send(err);
  }
};

function freeTime(appointments) {
  let c = [];
  appointments.map((appointment, index, array) => {
    const openTime = '09:00:00';
    const closeTime = '21:00:00';
    if (array.length === 1) {
      c.push([openTime, appointment.start_at], [appointment.end_at, closeTime]);
    } else if (index === 0) {
      c.push([openTime, appointment.start_at], [appointment.end_at, array[index + 1].start_at]);
    } else if (index < array.length - 1) {
      c.push([appointment.end_at, array[index + 1].start_at]);
    } else {
      c.push([appointment.end_at, closeTime]);
    }
  });
  return c;
}
function busyTime(appointments) {
  let res = [];
  appointments.map((appointment, index, array) => {
    res.push([appointment.start_at, appointment.end_at]);
  });
  return res;
}
function findEmployees(id) {
  const employees = Employee.findAll({
    include: {
      model: Service,
      where: { id },
      attributes: ['id', 'name'],
      through: { attributes: [] }
    },
    attributes: ['id', 'name']
  });
  return employees;
}
// FIND FREE TIME
exports.findAppointment = async (req, res) => {
  const { serviceId, date } = req.body;

  try {
    const services = await Service.findAll({ where: { id: serviceId } });
    const mappedServices = services.map((service) => service.duration);
    const duration = mappedServices.reduce((partialSum, a) => partialSum + a, 0);

    const { employees } = findEmployees(serviceId);
    console.log(employees);

    // const mappedEmployees = employees.map((employee) => employee.id);

    // for (const id of mappedEmployees) {
    //   const appointments = await Appointment.findAll({
    //     where: {
    //       [Op.and]: {
    //         date,
    //         employeeId: id
    //       }
    //     },
    //     order: [['start_at', 'ASC']]
    //   });
    //   // let c = [];
    //   let busyTime = [];
    //
    //   // BUSY TIME FOR EACH EMPLOYEE
    //   appointments.map((appointment, index, array) => {
    //     busyTime.push([appointment.start_at, appointment.end_at]);
    //   });
    //   schedules.push(busyTime);
    // }

    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
