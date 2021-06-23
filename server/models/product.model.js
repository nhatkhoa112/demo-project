const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      unique: true,
      trim: true,
      required: false,
      default: Date.now(),
    },
    title: { type: String, trim: true, required: true },
    price: { type: Number, trim: true, required: true },
    description: { type: String, required: true },
    images: [{ type: Object, required: true }],
    categories: [
      { ref: 'Category', required: false, type: Schema.Types.ObjectId },
    ],
    sold: { type: Number, default: 0 },
    sale: { type: Number, default: 0 },
    new: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        ref: 'Review',
        required: false,
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
