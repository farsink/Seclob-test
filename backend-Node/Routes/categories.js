const express = require('express');
const router = express.Router();
const categoriesController = require('../Controller/categoriesControllers');
const { model } = require('mongoose');


// Get all categories
router.get('/all', categoriesController.getCategories);

router.post('/add', categoriesController.addCategory);

router.put('/update/:id', categoriesController.updateCategory);

router.delete('/delete/:id', categoriesController.deleteCategory);

module.exports = router;