const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/userControllers");

// Route for user registration
router.post("/signup", registerUser);
// router.get()

module.exports = router;
