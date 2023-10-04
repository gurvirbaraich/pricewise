import mongoose from "mongoose";

// To keep track, wether server is connected to database or not.
let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Already connected to database!");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!, {
      dbName: "pricewise",
    });

    isConnected = true;
    console.log("Connected to database!");
  } catch (error) {
    console.log((error as { message: string }).message);
  }
};
