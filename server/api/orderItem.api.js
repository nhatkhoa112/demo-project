const router = require('express').Router();
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');
const orderItemsController = require('../controllers/orderItem.controller');

router.get('/', auth, authAdmin, orderItemsController.getAll);

router.get('/:id', auth, orderItemsController.getOrderItemsById);

router.get('/:id/product', auth, orderItemsController.getOrderItemsByProductId);

router.post('/', auth, orderItemsController.createOrderItem);

router.delete(
  '/:id/order/:orderId',
  auth,
  orderItemsController.deleteOrderItem
);

router.patch('/:id/order/:orderId', auth, orderItemsController.updateOrderItem);

module.exports = router;
