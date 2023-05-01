const asyncHandler = require("express-async-handler");
const generateToken = require("../Config/generateToken");
const { User } = require("../Models/userModel/userModel");
const { Product } = require("../Models/MedicinesModel/medicineModel");
const jwt = require('jsonwebtoken');
const config = require('config');
const dotenv = require("dotenv");
dotenv.config();


const AddProduct = asyncHandler(async (req, res) => {
    let {
        medicineId,
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
        directionToUse
    } = req.body;

    const newProduct = new Product({
        medicineId,
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
        message: "Medicine registered successfully",
        Medicine: savedMedicine,
      });


});


