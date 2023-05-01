const mongoose = require("mongoose");
const quantitySchema = require("./quantityModel");

const medicineSchema = mongoose.Schema({
  medicineName: { type: String, required: true },
  activeIngredient: { type: String },
  salt: { type: String },
  productFrom: { type: String },
  productForm: { type: String },
  routeOfAdministration: { type: String },
  indications: { type: String },
  categories: [{ type: String }],
  contraindications: { type: String },
  sideEffects: { type: String },
  drugInteractions: { type: String },
  pregnancyCategory: { type: String },
  manufacturer: { type: String },
  rating: { type: Number },
  quantity: [quantitySchema],
  prescriptionRequired: { type: String },
  imageURL: { type: String },
  productHighlights: { type: String },
  keyBenefits: { type: String },
  safetyInformation: { type: String },
  directionToUse: { type: String },
});

const Product = mongoose.model("Products", medicineSchema);

module.exports = { Product };
