const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const orderItemSchema = mongoose.Schema(
  {
    owner: { ref: 'User', required: true, type: Schema.Types.ObjectId },
    product: { ref: 'Product', required: true, type: Schema.Types.ObjectId },
    price_on_purchase_date: { type: Number, trim: true, required: true },
    quantity: { type: Number, trim: true, required: true },
    status: {
      type: String,
      enum: ['Pending', 'On delivery', 'Completed', 'Out of stock', ''],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('OrderItem', orderItemSchema);
