const router = require('express').Router();
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');
const orderItemsController = require('../controllers/orderItem.controller');

router.get('/', auth, authAdmin, orderItemsController.getAll);

router.get('/:id', auth, orderItemsController.getOrderItemsById);
    
router.post('/', auth, orderItemsController.createOrderItem);

router.delete('/:id', auth, orderItemsController.deleteOrderItem);

router.patch('/:id', auth, orderItemsController.updateOrderItem);

module.exports = router;
