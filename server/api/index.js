const router = require('express').Router();
const userRouter = require('./user.api');
const imageRouter = require('./upload.api');

router.use('/user', userRouter);

router.use('/upload', imageRouter);

module.exports = router;
