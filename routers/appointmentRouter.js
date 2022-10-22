const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const router = new express.Router();

router.post('/', appointmentController.createAppointment);

router.get('/all', appointmentController.getAppointments);

router.get('/', appointmentController.findAppointment);

module.exports = router;
