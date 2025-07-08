// require("dotenv").config({path: "./config.env"}); // yaha require hai and pura code import based hai - inconsistency issue - this will run with no issue
// another way to import dotenv is to use import statement - import dotenv from "dotenv"; dotenv.config({path: "./config.env"});
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./env",
});
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB CONNECTION FAILED : ", err);
  });








  

/* 1ST APPROACH - connect to MongoDB using mongoose 
 const connectDB() {

 }
 connectDB()
 */

/*
2ND APPROACH - IIFE to connect to MongoDB using mongoose

import express from "express";
import mongoose from "mongoose";
import {DB_NAME} from "./constants.js"; // constants.js file with DB_NAME defined
const app = express();


(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

    app.on("error", (error) => {
      console.error("Error connecting to MongoDB:", error);
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();
*/
