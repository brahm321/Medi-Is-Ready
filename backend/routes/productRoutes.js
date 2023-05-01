const express = require("express");
const router = express.Router();

const {
  AddProduct,
  AddAllProduct,
} = require("../controllers/productController");

router.post("/add", AddProduct);
router.post("/addall", AddAllProduct);

module.exports = router;
