const express = require('express');
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/authenticate');
const userController = require('../controllers/userController');

router.get('/', verifyTokenAndAdmin, userController.getAllUsers); //

// user
router.get('/me', verifyToken, userController.getUserById)

//admin
router.get('/:id', verifyTokenAndAuthorization, userController.getUserByIdAd) //

router.put('/:id/update', verifyTokenAndAuthorization, userController.updateUserById);

router.delete('/:id/destroy', verifyTokenAndAdmin, userController.destroyUserById);


module.exports = router;