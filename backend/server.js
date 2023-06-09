const express = require("express"); //server
const dotenv = require("dotenv"); //.env file use karne ke liye
const connectDB = require("./config/db"); //databse coonection
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

// Instance of this express
const app = express(); // with the use of this app variable we can start of our own server

dotenv.config();

connectDB(); // connection to the DataBase

// middleware are the function that gets called before your function written in the API is called and inside the use there is middleware
// accept the JSON
// accept the body
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // you can accept a request.body

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);

const PORT = process.env.PORT || 5000;
// if in the env file it doesn't find any port then by default it take 5000
app.listen(PORT, console.log(`Server is Running on PORT ${PORT}`.yellow.bold));
