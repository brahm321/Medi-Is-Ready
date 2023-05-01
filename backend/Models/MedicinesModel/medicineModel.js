const mongoose = require("mongoose");
const commentSchema = require("./commentModel");
const quantitySchema = require("./quantityModel");

const medicineSchema = new mongoose.Schema({
  medicineId: {
    type: String,
    required: true,
  },
  medicineName: {
    type: String,
    required: true,
  },
  activeIngredient: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  productFrom: {
    type: String,
    required: true,
  },
  productForm: {
    type: String,
    required: true,
  },
  routeOfAdministration: {
    type: String,
    required: true,
  },
  indications: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  contraindications: {
    type: String,
    required: true,
  },
  sideEffects: {
    type: String,
    required: true,
  },
  drugInteractions: {
    type: String,
    required: true,
  },
  pregnancyCategory: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: [quantitySchema],
    required: true,
  },
  prescriptionRequired: {
    type: Boolean,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  productHighlights: {
    type: String,
    required: true,
  },
  keyBenefits: {
    type: String,
    required: true,
  },
  safetyInformation: {
    type: String,
    required: true,
  },
  directionToUse: {
    type: String,
    required: true,
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
