const asyncHandler = require("express-async-handler");
const { Product } = require("../Models/MedicinesModel/medicineModel");
const dotenv = require("dotenv");
dotenv.config();

const AddProduct = asyncHandler(async (req, res) => {
  let {
    medicineName,
    activeIngredient,
    salt,
    productFrom,
    productForm,
    routeOfAdministration,
    indications,
    categories,
    contraindications,
    sideEffects,
    drugInteractions,
    pregnancyCategory,
    manufacturer,
    rating,
    quantity,
    prescriptionRequired,
    imageURL,
    productHighlights,
    keyBenefits,
    safetyInformation,
    directionToUse,
  } = req.body;

  const newProduct = new Product({
    medicineName,
    activeIngredient,
    salt,
    productFrom,
    productForm,
    routeOfAdministration,
    indications,
    categories,
    contraindications,
    sideEffects,
    drugInteractions,
    pregnancyCategory,
    manufacturer,
    rating,
    quantity,
    prescriptionRequired,
    imageURL,
    productHighlights,
    keyBenefits,
    safetyInformation,
    directionToUse,
  });

  const savedProduct = await newProduct.save();
  res.status(201).json({
    message: "Medicine Added successfully",
    Medicine: savedProduct,
  });
});

const AddAllProduct = asyncHandler(async (req, res) => {
  const products = req.body.products;
  const savedProducts = await Product.insertMany(products);

  res.status(201).json({
    message: "All Medicines added successfully",
    Medicines: savedProducts,
  });
});

module.exports = { AddProduct, AddAllProduct };
