const express = require("express");
const router = express.Router();

const {
  AddProduct,
  AddAllProduct,
  SearchByName,
  SearchByCategory,
  SearchById,
  GetAllProducts
} = require("../controllers/productController");

router.post("/add", AddProduct);
router.post("/addall", AddAllProduct);
router.get("/searchbyname", SearchByName);
router.get("/SearchByCategory", SearchByCategory);
router.get("/SearchById", SearchById);
router.get("/SearchById", GetAllProducts);




module.exports = router;
