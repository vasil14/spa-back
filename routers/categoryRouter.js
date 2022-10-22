const express = require('express');
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const router = new express.Router();

// CREATE CATEGORY
router.post('/', auth, categoryController.addCategory);

// GETT ALL CATEGORIES
router.get('/', categoryController.getCategory);

// EDIT CATEGORY
router.put('/:id', auth, categoryController.editCategory);

//DELETE CATEGORY
router.delete('/:id',auth,categoryController.deleteCategory)

module.exports = router;
