const express = require('express');
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin } = require('../middleware/authenticate');

const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', verifyToken, authController.logout);

module.exports = router;