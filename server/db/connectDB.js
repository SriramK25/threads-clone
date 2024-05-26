import mongoose from "mongoose";

async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;
