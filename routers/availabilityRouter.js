const express = require('express');
const availabilityController = require('../controllers/availabilityController');
const auth = require('../middleware/auth');
const router = new express.Router();

// ADD AVAILABILITY
router.post('/', auth, availabilityController.addAvailability);

// GET AVAILABILITY
router.get('/', availabilityController.getAvailability);

// EDIT AVAILABILITY
router.put('/:id', availabilityController.editAvailability);

// DELETE AVAILABILITY
router.delete('/:id', availabilityController.deleteAvailability);

module.exports = router;
