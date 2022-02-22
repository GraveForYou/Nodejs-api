const express = require('express');
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin } = require('../middleware/authenticate');
const orderController = require('../controllers/orderController');

// Get all orders --> admin

router.get('/', verifyTokenAdmin, orderController.getAllOrders);

// create new order --> admin
router.post('/newOrder', verifyToken, orderController.newOrder);

router.get('/me', verifyToken, orderController.getMyOrders);

router.put('/:id/updateOrderStatus', verifyTokenAdmin, orderController.updateOrderStatus);

router.get('/:id', verifyTokenAdmin, orderController.getOrderById);

module.exports = router;