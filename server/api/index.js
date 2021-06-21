const router = require('express').Router();
const userRouter = require('./user.api');
const imageRouter = require('./upload.api');
const productRouter = require('./product.api');
const orderRouter = require('./order.api');
const orderItemRouter = require('./orderItem.api');
const reviewRouter = require('./review.api');
const categoryRouter = require('./category.api');

router.use('/user', userRouter);

router.use('/upload', imageRouter);

router.use('/products', productRouter);

router.use('/orders', orderRouter);

router.use('/orderItems', orderItemRouter);

router.use('/categories', categoryRouter);

router.use('/reviews', reviewRouter);

module.exports = router;
