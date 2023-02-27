const mongoose = require("mongoose");

const orderModel = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  noOfItems: { type: Number, required: true },
  amount: { type: Number, required: true },
});

module.exports = { orderModel };
