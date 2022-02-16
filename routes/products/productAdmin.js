const express = require('express');
const router = express.Router();
const productAdminController = require('../../controllers/productController');
const { verifyTokenAndAdmin } = require('../../middleware/authenticate');


// Get all trash products -- Admin


router.get('/trashes', verifyTokenAndAdmin, productAdminController.getTrashProduct) //verifyTokenAndAdmin

// Create product -- Admin

router.post('/new', verifyTokenAndAdmin, productAdminController.createProduct); //verifyTokenAndAdmin

// Update product -- Admin
router.put('/:id', verifyTokenAndAdmin, productAdminController.updateProduct); //verifyTokenAndAdmin

// (Soft) Delete product -- Admin
router.delete('/:id/soft', verifyTokenAndAdmin, productAdminController.softDelete); //verifyTokenAndAdmin

// Force Delete product -- Admin
router.delete('/trashes/:id/force', verifyTokenAndAdmin, productAdminController.forceDelete); //verifyTokenAndAdmin

// Restore product -- Admin
router.patch('/trashes/:id/restore', verifyTokenAndAdmin, productAdminController.restoreProduct); //verifyTokenAndAdmin

module.exports = router;