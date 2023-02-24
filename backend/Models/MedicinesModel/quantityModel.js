const mongoose = require("mongoose");

const quantitySchema = mongoose.Schema({
  amount: { type: String },
  priceINR: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model("Quantity", quantitySchema);
