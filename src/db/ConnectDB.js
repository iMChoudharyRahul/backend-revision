import mongoose from "mongoose";
import { DB_NAME } from "../constants/db.constants.js";

const connectDB = async () => {
  try {
    const connectionDB = await mongoose.connect(
      `${process.env.MONGODB_URL}${DB_NAME}`
    );
    console.log(`💖 MongoDB connected 💖 : ${connectionDB.connection.host}`);
  } catch (error) {
    console.log("😒😒error from connection db😒😒:", error);
    process.exit(1);
  }
};

export default connectDB;
