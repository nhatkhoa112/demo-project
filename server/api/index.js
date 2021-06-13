const router = require('express').Router();
const userRouter = require('./user.api');
const imageRouter = require('./upload.api');
const productRouter = require('./product.api');

router.use('/user', userRouter);

router.use('/upload', imageRouter);

router.use('/products', productRouter);

module.exports = router;
