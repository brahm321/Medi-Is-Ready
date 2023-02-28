const express = require("express");
const router = express.Router();

const { registerUser, authUser } = require("../controllers/userControllers");

// Route for user registration
router.post("/signup", registerUser);

router.post("/signin", authUser);

module.exports = router;
