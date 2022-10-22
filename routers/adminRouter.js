const express = require('express');
const adminController = require('../controllers/adminController');
const validInfo = require('../middleware/validinfo');
const auth = require('../middleware/auth');
const router = new express.Router();

// CREATE ADMIN
router.post('/create', validInfo, adminController.createAdmin);

// LOGIN
router.post('/login', validInfo, adminController.login);

// REFRESH TOKEN
router.post('/refresh', adminController.refreshToken);

// GET ADMINS
router.get('/get', auth, adminController.getAllAdmins);

// EDIT ADMIN
router.put('/edit/:id', auth, adminController.editAdmin);

// DELETE ADMIN
router.delete('/delete/:id', auth, adminController.deleteAdmin);

module.exports = router;
