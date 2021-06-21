const mongoose = require('mongoose');

const Schema = require('mongoose').Schema;

const reviewSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    body: { type: String, trim: true, required: true },
    owner: { ref: 'User', required: true, type: Schema.Types.ObjectId },
    rating: { type: Number, trim: true, default: null },
    product: { ref: 'Product', required: true, type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
