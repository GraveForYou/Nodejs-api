const express = require('express');
const router = express.Router();
const productAdminController = require('../../controllers/productController');
const { verifyTokenAndAdmin } = require('../../middleware/authenticate');


// Get all trash products -- Admin


router.get('/trashes', verifyTokenAndAdmin, productAdminController.getTrashProduct) //verifyTokenAndAdmin ---v

// Create product -- Admin

router.post('/new', verifyTokenAndAdmin, productAdminController.createProduct); //verifyTokenAndAdmin ---v

// Update product -- Admin
router.put('/:id/update', verifyTokenAndAdmin, productAdminController.updateProduct); //verifyTokenAndAdmin ---v

// (Soft) Delete product -- Admin
router.delete('/:id/soft', verifyTokenAndAdmin, productAdminController.softDelete); //verifyTokenAndAdmin ---v

// Force Delete product -- Admin
router.delete('/trashes/:id/force', verifyTokenAndAdmin, productAdminController.forceDelete); //verifyTokenAndAdmin ---v

// Restore product -- Admin
router.patch('/trashes/:id/restore', verifyTokenAndAdmin, productAdminController.restoreProduct); //verifyTokenAndAdmin ---v

module.exports = router;