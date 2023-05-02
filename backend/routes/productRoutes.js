const express = require("express");
const router = express.Router();

const {
  AddProduct,
  AddAllProduct,
  SearchByName
} = require("../controllers/productController");

router.post("/add", AddProduct);
router.post("/addall", AddAllProduct);
router.get("/searchbyname", SearchByName);

module.exports = router;
