const express = require("express");
const router = express.Router();

const {
  AddProduct,
  AddAllProduct,
  SearchByName,
  SearchByCategory
} = require("../controllers/productController");

router.post("/add", AddProduct);
router.post("/addall", AddAllProduct);
router.get("/searchbyname", SearchByName);
router.get("/SearchByCategory", SearchByCategory);

module.exports = router;
