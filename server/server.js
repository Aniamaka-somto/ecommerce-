const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

//utilities
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
