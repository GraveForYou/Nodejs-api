const express = require('express')
const router = express.Router()
const productController = require('../../controllers/productController')

// Get all product
router.get('/', productController.getAllProducts) //

//Get product by id
router.get('/:id', productController.getProductById) //

module.exports = router
