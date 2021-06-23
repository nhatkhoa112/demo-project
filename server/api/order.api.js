const router = require('express').Router();
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');
const ordersController = require('../controllers/order.controller');

router.get('/', auth, authAdmin, ordersController.getAllOrders);

router.get('/:userId', auth, ordersController.getAllOrders);

router.get('/:id/order', auth, ordersController.getOrderById);

router.post('/', auth, ordersController.createOrder);

router.delete('/:id', auth, authAdmin, ordersController.deleteOrder);

router.patch('/:id', auth, authAdmin, ordersController.updateOrder);

module.exports = router;
