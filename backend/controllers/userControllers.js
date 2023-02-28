// first we are gonna create the logic for the registration of the USER

// SingUp logic
const asyncHandler = require("express-async-handler");
const generateToken = require("../Config/generateToken");
const bcrypt = require("bcrypt");
const { User } = require("../Models/userModel/userModel");

const {
  validatePhone,
  validateAddress,
  validateGender,
  validateName,
  validateEmail,
  validatePassword,
  checkOnlyOneUserRoleSelected,
} = require("../utils/validators");

const registerUser = asyncHandler(async (req, res) => {
  let {
    name,
    email,
    password,
    gender,
    phone,
    address,
    photo,
    isBuyer,
    isAdmin,
    isSeller,
    licenceUrl,
    nameOfStore,
  } = req.body;

  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.gender ||
    !req.body.phone
  ) {
    return res
      .status(400)
      .send(
        "Error: Please fill are required fields : name, email, password, gender, phone"
      );
  }

  if (!req.body.isAdmin && !req.body.isBuyer && !req.body.isSeller) {
    return res
      .status(400)
      .send(
        "Error: Please fill atleast one of them: isAdmin, isBuyer, isSeller"
      );
  }

  if (!validateName(name)) {
    return res.status(400).json({
      message:
        "Error: Invalid user name: name must be longer than two characters and must not include any numbers or special characters",
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      message: "Error: Invalid email",
    });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Invalid password: password must be at least 8 characters long and must include atlest one - one uppercase letter, one lowercase letter, one digit, one special character",
    });
  }

  if (!validatePhone(phone)) {
    return res.status(400).json({
      message:
        "Invalid phone number format. Please enter a valid phone number.",
    });
  }

  if (address) {
    if (!validateAddress(address, isSeller).isValid) {
      return res.status(400).json({
        message: validateAddress(address).message,
      });
    }
  }

  if (!validateGender(gender)) {
    return res.status(400).json({
      message: "Invalid Gender: gender should be male, female or other",
    });
  }

  let userType; // upcomming user Type (this will for storing the password)
  if (isBuyer) userType = "buyer";
  if (isAdmin) userType = "admin";
  if (isSeller) userType = "seller";

  // If everything is fine then we have to check if the user is already present as he is signing UP with asAdmin/asBuyer/asSeller

  // Check if email already exists with which he trying to signing Up
  const existingUser = await User.findOne({ email: email });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // is user already exist but sigingUp for different authenticity
  if (existingUser) {
    console.log("Updating the existing user");

    // finding what the type of existing user type
    let existingIsAdmin = false,
      existingIsBuyer = false,
      existingIsSeller = false;
    existingIsAdmin = existingUser.isAdmin;
    existingIsBuyer = existingUser.isBuyer;
    existingIsSeller = existingUser.isSeller;

    if (isBuyer && existingIsBuyer) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (isAdmin && existingIsAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    if (isSeller && existingIsSeller) {
      return res.status(400).json({ message: "seller already exists" });
    }

    // updating the isAdmin, isBuyer, isSeller fields with existing user, because now he have multiple types
    if (existingIsAdmin) isAdmin = true;
    if (existingIsBuyer) isBuyer = true;
    if (existingIsSeller) isSeller = true;

    // Set the update object based on the user type
    const update = {
      email,
      $push: {
        address: address,
      },
      name,
      gender,
      phone,
      photo,
      isAdmin,
      isBuyer,
      isSeller,
    };

    if (userType === "admin") {
      update.$set = {
        "password.admin": hashedPassword,
      };
    } else if (userType === "buyer") {
      update.$set = {
        "password.buyer": hashedPassword,
      };
    } else if (userType === "seller") {
      update.$set = {
        "password.seller": hashedPassword,
      };
    }

    if (userType === "seller") {
      update.licenceUrl = licenceUrl;
      update.nameOfStore = nameOfStore;
    }

    // Copy over existing license URL and name of store fields
    if (existingUser.licenceUrl) {
      update.licenceUrl = existingUser.licenceUrl;
    }
    if (existingUser.nameOfStore) {
      update.nameOfStore = existingUser.nameOfStore;
    }

    // Set the options for findOneAndUpdate()
    const options = {
      new: true, // to return the updated document after the update is applied
    };

    try {
      // Update the user in the database
      const updatedUser = await User.findOneAndUpdate(
        { email: email }, // filter by email
        update, // update object
        options // options object
      );
      return res.status(201).json({
        message: `Successfully registered ${userType}`,
        updatedUser,
      });
    } catch (error) {
      return res.status(400).json({
        message: `Error in registering the ${userType}`,
        error,
      });
    }
  }

  // if there no confilcts then we have to register a new account with a type (admin/user/seller)

  // Create new user
  // console.log("Hashed Password ::::: ", hashedPassword);
  // console.log("Registering the New user");
  const newUser = new User({
    name,
    email,
    password: {
      admin: userType === "admin" ? hashedPassword : undefined,
      buyer: userType === "buyer" ? hashedPassword : undefined,
      seller: userType === "seller" ? hashedPassword : undefined,
    },
    gender,
    phone,
    address,
    photo,
    isBuyer,
    isAdmin,
    isSeller,
    licenceUrl,
    nameOfStore,
  });
  // if he is seller then licence and nameOfStore is validate into mongoDB schema itself

  // Save user to database
  const savedUser = await newUser.save();
  let resUserType;
  if (userType === "buyer") resUserType = "User";
  if (userType === "admin") resUserType = "Admin";
  if (userType === "seller") resUserType = "Seller";
  res.status(201).json({
    message: `${resUserType} registered successfully`,
    user: savedUser,
  });
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password, isAdmin, isBuyer, isSeller } = req.body;

  if (!checkOnlyOneUserRoleSelected(isAdmin, isBuyer, isSeller)) {
    res.status(400).json({
      message: "Error: Please select only one role",
    });
  }
  if (email.length === 0) {
    // we have to verify if email and password is valid/empty or not
    res.status(400).json({
      message: "Error: Please enter your email",
    });
  }
  if (password.length === 0) {
    res.status(400).json({
      message: "Error: Please enter your password",
    });
  }

  // If email and password is not empty then we have to check weather it is valid or not
  if (!validateEmail(email)) {
    return res.status(400).json({
      message: "Error: Invalid email",
    });
  }

  let userType;
  if (isAdmin) userType = "admin";
  if (isBuyer) userType = "buyer";
  if (isSeller) userType = "seller";

  // If email is valid then we have to verify that user exist or not

  const user = await User.findOne({ email });

  // Logic for loging with different types (user is buyer, but trying to login for seller etc...)
  

  // if user exist then we have to check wheather the password is matched or not (remeber that password is stored in our data in encrypted format)
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, authUser };
