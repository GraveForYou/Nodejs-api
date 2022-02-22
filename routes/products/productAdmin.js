const express = require('express');
const router = express.Router();
const productAdminController = require('../../controllers/productController');
const { verifyTokenAdmin } = require('../../middleware/authenticate');


// Get all trash products -- Admin
router.get('/trashes', verifyTokenAdmin, productAdminController.getTrashProduct) //verifyTokenAdmin ---v

// Create product -- Admin
router.post('/new', verifyTokenAdmin, productAdminController.createProduct); //verifyTokenAdmin ---v

// Update product -- Admin
router.put('/:id/update', verifyTokenAdmin, productAdminController.updateProduct); //verifyTokenAdmin ---v

// (Soft) Delete product -- Admin
router.delete('/:id/soft', verifyTokenAdmin, productAdminController.softDelete); //verifyTokenAdmin ---v

// Force Delete product -- Admin
router.delete('/trashes/:id/force', verifyTokenAdmin, productAdminController.forceDelete); //verifyTokenAdmin ---v

// Restore product -- Admin
router.patch('/trashes/:id/restore', verifyTokenAdmin, productAdminController.restoreProduct); //verifyTokenAdmin ---v

module.exports = router;