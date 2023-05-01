const mongoose = require("mongoose");

const quantitySchema = mongoose.Schema({
  amount: { type: String, required: true },
  priceINR: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
});

module.exports = { quantitySchema };
