const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    body: { type: String, trim: true, required: true },
    owner: { ref: 'User', required: true, type: Schema.Types.ObjectId },
    rating: { type: Number, trim: true, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
