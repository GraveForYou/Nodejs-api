const express = require('express');
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin } = require('../middleware/authenticate');
const userController = require('../controllers/userController');

// Get all users --> admin
router.get('/', verifyTokenAdmin, userController.getAllUsers); //

// get user information login --> user
router.get('/me', verifyToken, userController.getUserById)

// update user information login --> user
router.put('/me/update', verifyToken, userController.updateUserByIdUser);

// get user by id --> admin, user(with id login)
router.get('/:id', verifyTokenAndAuthorization, userController.getUserByIdAd) //

// update user by id --> admin
router.put('/:id/update', verifyTokenAdmin, userController.updateUserByIdAdmin);

// delete user by id --> admin
router.delete('/:id/destroy', verifyTokenAdmin, userController.destroyUserById);


module.exports = router;