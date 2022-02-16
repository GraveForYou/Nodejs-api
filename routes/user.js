const express = require('express');
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/authenticate');
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers); //verifyTokenAndAdmin,

// user
router.get('/me', verifyToken, userController.getUserById)

//admin
router.get('/:id', userController.getUserByIdAd) //verifyTokenAndAuthorization,

router.put('/:id/update', verifyTokenAndAuthorization, userController.updateUserById);

router.delete('/:id/destroy', verifyTokenAndAdmin, userController.destroyUserById);


module.exports = router;