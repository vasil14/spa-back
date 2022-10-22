const express = require('express');
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/auth');
const router = new express.Router();

// ADD EMPLOYEE
router.post('/', auth, employeeController.upload, employeeController.addEmployee);

//EDIT EMPLOYEE
router.put('/:id', auth, employeeController.upload, employeeController.editEmployee);

// GET EMPLOYEES
router.get('/', employeeController.getEmployees);

// DELETE EMPLOYEE
router.delete('/:id', auth, employeeController.deleteEmployee);

router.get('/services', employeeController.findEmployees)

module.exports = router;
