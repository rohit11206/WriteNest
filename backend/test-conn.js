import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_URI } = process.env;
if (!MONGO_URI) {
  console.error("MONGO_URI missing");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB");
    return mongoose.connection.close();
  })
  .catch(err => {
    console.error("Connection failed:", err.message || err);
    process.exit(1);
  });
