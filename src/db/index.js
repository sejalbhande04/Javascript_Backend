import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log(`\n MongoDB connected!! DB HOST: ${connectionInstance.connection.host} \n`);

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
// This function connects to the MongoDB database using Mongoose.
// It logs the connection status and handles errors by exiting the process if the connection fails.