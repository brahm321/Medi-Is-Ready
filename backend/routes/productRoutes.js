const express = require("express");
const router = express.Router();

 const { AddProduct } = require("../controllers/productController");

// Route for user registration
//router.get("/signup", registerUser);


//outer.get("/signin", authUser);

router.post("/add", AddProduct);




module.exports = router;
