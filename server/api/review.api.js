const router = require('express').Router();
const auth = require('../middlewares/auth');
const reviewsController = require('../controllers/review.controller');

router.post('/', auth, reviewsController.createReview);

router.delete('/:id', auth, reviewsController.deleteReview);

router.patch('/:id', auth, reviewsController.updateReview);

module.exports = router;
