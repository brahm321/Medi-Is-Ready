// This file is responsible for creating the JWT token which gonna to send to the user for this we have to import

// JWTs are mainly used for authentication. After a user signs in to an application, the application then assigns JWT to that user. Subsequent requests by the user will include the assigned JWT. This token tells the server what routes, services, and resources the user is allowed to access.

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // in how many times this jwt expires
    expiresIn: "30d",
  });
  // return "r3refsahfoiasjfojsodifji noiuejwnoifjeoifjoiwenfewf"
};

module.exports = generateToken;
