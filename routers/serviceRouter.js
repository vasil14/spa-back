const express = require('express');
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/auth');
const router = new express.Router();

// CREATE SERVICE
router.post('/', auth, serviceController.addService);

// GET SERVICES
router.get('/', serviceController.getAllServices);

// GET SERVICES AND EMPLOYEES
// router.get('/e', serviceController.getServicesE);

// EDIT SERVICE
router.put('/:id', auth, serviceController.editService);
router.delete('/:id', auth, serviceController.deleteService);

module.exports = router;
