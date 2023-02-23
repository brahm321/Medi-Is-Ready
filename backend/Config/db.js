// This file is responsible for connecting to our DataBase
const mongoose = require("mongoose");
const colors = require("colors");
mongoose.set("strictQuery", true); // Please read this to understand this line : :
// This warning is related to the strictQuery option in Mongoose, which controls whether queries that include fields not defined in the schema should be rejected or not. In Mongoose version 6 and below, the default behavior was to allow queries with undefined fields (i.e., strictQuery was false by default). However, in Mongoose 7, the default behavior will be changed to reject such queries (i.e., strictQuery will be true by default).
// The warning message is telling you that your current codebase is using the default behavior of Mongoose 6 and below, where strictQuery is false. It is advising you to either prepare for the change by setting mongoose.set('strictQuery', false);, which will set the strictQuery option to false explicitly, or to suppress the warning by setting mongoose.set('strictQuery', true);, which will keep the current behavior and silence the warning.
// It's important to note that you should only use mongoose.set('strictQuery', false); if you have a specific reason to allow queries with undefined fields. Otherwise, it's recommended to set mongoose.set('strictQuery', true); to enforce stricter validation and prevent unexpected behavior.

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((cons) => console.log(`MongoDB Succesfully Connected`.cyan.underline))
    .catch((err) =>
      console.log(`Error Connecting to DataBase: ${err.message}`.red.bold)
    );
};

module.exports = connectDB;
