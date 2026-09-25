import mongoose from "mongoose";
import "dotenv/config";

const connectingString = process.env.MONGODB_URI;

export const db = async () => {
    if (!connectingString) {
        throw new Error("MONGODB_URI is not configured");
    }

    await mongoose.connect(connectingString);
    console.log("connection dataBase");
};
