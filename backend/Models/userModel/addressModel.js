const mongoose = require("mongoose");

const addressModel = new mongoose.Schema({
  isStore: { type: Boolean, default: false },
  shopNo: {type: Number},
  houseNo: { type: Number },
  nearBy: { type: String },
  landmark: { type: String },
  street: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
});


module.exports = { addressModel };
