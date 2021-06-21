const Review = require('../models/review.model');
const Product = require('../models/product.model');
const reviewsController = {
  getAllReviews: async (req, res) => {},
  createReview: async (req, res) => {
    try {
      const { title, body, rating, productId } = req.body;
      const review = await new Review({
        title,
        body,
        rating,
        product: productId,
        owner: req.user.id,
      });

      await review.populate({ path: 'owner', model: 'User' });
      await review.save();

      const product = await Product.findOne({ _id: productId });
      product.reviews.unshift(review._id);
      await product
        .populate({ path: 'categories', model: 'Category' })
        .populate({
          path: 'reviews',
          model: 'Review',
          populate: {
            path: 'owner',
            model: 'User',
          },
        });
      await product.execPopulate();
      await product.save();

      res.json({ msg: 'Created the review', review, product });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateReview: async (req, res) => {},
  deleteReview: async (req, res) => {},
};

module.exports = reviewsController;
