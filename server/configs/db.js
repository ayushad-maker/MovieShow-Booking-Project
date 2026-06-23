import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("URI:", process.env.MONGODB_URI);

    mongoose.connection.on("connected", () => {
      console.log("Database connected");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/movieshow`);
  } catch (error) {
    console.log(error);
  }
};