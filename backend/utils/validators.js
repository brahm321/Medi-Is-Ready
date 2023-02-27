const validator = require("validator");

const validateName = (name) => {
  const nameRegex = new RegExp(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/);
  return nameRegex.test(name);
};

const validateEmail = (email) => {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  );
  return passwordRegex.test(password);
};

const validatePhone = (phoneNumber) => {
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

  // Validate phone number using validator library
  const isValidPhoneNumber = validator.isMobilePhone(cleanedPhoneNumber, "any");

  return isValidPhoneNumber;
};

const validateAddress = (address, isSeller) => {
  const {
    isStore,
    shopNo,
    houseNo,
    nearBy,
    landmark,
    street,
    area,
    city,
    state,
    pincode,
  } = address;

  if (isSeller) {
    if (!isStore) {
      return { isValid: false, message: "You are seller address must be of store type" };
    }
  }
  if (!street) {
    return { isValid: false, message: "Street is required" };
  }
  if (!area) {
    return { isValid: false, message: "Area is required" };
  }
  if (!city) {
    return { isValid: false, message: "City is required" };
  }
  if (!state) {
    return { isValid: false, message: "State is required" };
  }
  if (!pincode) {
    return { isValid: false, message: "Pincode is required" };
  }
  if (!validator.isPostalCode(pincode, "IN")) {
    return { isValid: false, message: "Pincode is Invalid" };
  }

  return { isValid: true, message: "Address is valid" };
};


const validateGender = (gender) => {
  // Gender should be either "male", "female" or "other"
  return ["male", "female", "other"].includes(gender);
};

  

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validatePhone,
  validateAddress,
  validateGender,
};
