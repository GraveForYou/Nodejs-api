const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');



// Get all product 
router.get('/', productController.getAllProducts); // ---v

//Get product by id
router.get('/:id', productController.getProductById); // ---v


module.exports = router;