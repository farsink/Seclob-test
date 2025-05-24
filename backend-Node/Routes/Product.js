const express = require('express');
const router = express.Router();

const productController = require('../Controller/ProductConroller');
const upload = require('../middlewares/multer');

// Get all products
router.get('/all', productController.getProducts);
// Add a new product
router.post('/add', upload.array('images', 5), productController.addProduct);

// Update a product
router.put('/update/:id', upload.array('images', 5), productController.updateProduct);

module.exports = router;