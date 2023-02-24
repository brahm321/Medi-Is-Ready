const mongoose = require("mongoose");
const { orderSchema } = require("./orderSchema");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String },
  orders: [orderSchema],
  address: { type: String },
  reviewIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  password: { type: String, required: true },
  gender: { type: String },
  isAdmin: { type: Boolean, default: false },
  isStoreOwner: { type: Boolean, default: false },
  licenceUrl: { type: String },
  nameOfStore: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
