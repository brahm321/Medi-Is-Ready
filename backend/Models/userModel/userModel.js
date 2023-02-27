const mongoose = require("mongoose");
const { addressModel } = require("./addressModel");

function validateLicenceUrl(value) {
  if (this.isStoreOwner && !value) {
    return false;
  }
  return true;
}

function validateNameOfStore(value) {
  if (this.isStoreOwner && !value) {
    return false;
  }
  return true;
}

const userModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
      admin: { type: String },
      buyer: { type: String },
      seller: { type: String },
    },
    gender: { type: String, require: true },
    phone: { type: String, required: true },
    address: [
      {
        type: addressModel,
        validate: function () {
          if (this.isSeller && !this.address) {
            return false;
          }
          return true;
        },
        message: "Address is required for store owners",
      },
    ],
    photo: { type: String, default: "xyz.jpg" },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "orderModel" }],
    reviewIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    isAdmin: { type: Boolean, default: false },
    isBuyer: { type: Boolean, default: false },
    isSeller: { type: Boolean, default: false },
    licenceUrl: {
      type: String,
      validate: {
        validator: validateLicenceUrl,
        message: "Licence URL is required for store owners",
      },
    },
    nameOfStore: {
      type: String,
      validate: {
        validator: validateNameOfStore,
        message: "Name of store is required for store owners",
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userModel);

module.exports = { User };
