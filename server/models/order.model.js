const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const orderSchema = mongoose.Schema(
  {
    owner: { ref: 'User', required: true, type: Schema.Types.ObjectId },
    orderItems: [
      {
        ref: 'OrderItem',
        required: true,
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
