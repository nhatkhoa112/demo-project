const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const orderSchema = mongoose.Schema(
  {
    owner: { ref: 'User', required: false, type: Schema.Types.ObjectId },
    orderItems: [
      {
        ref: 'OrderItem',
        required: true,
        type: Schema.Types.ObjectId,
      },
    ],
    shippingAddress: {
      address: { type: String, trim: true, required: true },
      cityOrProvince: { type: String, trim: true, required: true },
      countryOrRegion: { type: String, trim: true, required: true },
      phoneNumber: { type: Number, trim: true, required: true },
    },
    totals: { type: Number, trim: true, required: true },
    status: {
      type: String,
      enum: ['Pending', 'On delivery', 'Completed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
