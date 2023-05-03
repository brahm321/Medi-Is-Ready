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


// FULL NAME SEARCH

const SearchByName = asyncHandler(async (req, res) => {
 const medicineName = req.query.name;
  const medicine = await Product.findOne({ medicineName: medicineName });
  if (medicine) {
    res.status(200).json(medicine);
  } else {
    res.status(404).json({ message: "Medicine not found" });
  }
});

// const SearchByName = asyncHandler(async (req, res) => {
//   const keyword = req.query.keyword;
//   const regex = new RegExp(keyword, 'i');
//   const medicine = await Product.find({ medicineName: { $regex: regex } });

//   if (medicine.length > 0) {
//     res.status(200).json(medicine);
//   } else {
//     res.status(404).json({ message: "Medicine not found" });
//   }
// });

const SearchByCategory = asyncHandler(async (req, res) => {
  const categories = req.query.category;
  console.log(categories);
  const medicines = await Product.find({ categories: categories });

  if (medicines.length > 0) {
    res.status(200).json(medicines);
  } else {
    res.status(404).json({ message: "Medicines not found in the given category" });
  }
});

const SearchById = asyncHandler(async (req, res) => {
  const _id = req.query.id;
  const medicine = await Product.find({ _id: _id });

  if (medicine) {
    res.status(200).json(medicine);
  } else {
    res.status(404).json({ message: "Medicine not found" });
  }
});


const GetAllProducts = asyncHandler(async (req, res) => {
  const medicines = await Product.find({});
  res.status(200).json(medicines);
});



// search by id 
// search by keyword
// substr 
//all medicine\




module.exports = { AddProduct, AddAllProduct , SearchByName, SearchByCategory , SearchById , GetAllProducts};
