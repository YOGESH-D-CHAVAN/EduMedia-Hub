
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./Backend/models/User.js";

dotenv.config({ path: "./Backend/.env" });

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const users = await User.find({}, "username email role");
    console.log("Unique Users Found:", users.length);
    users.forEach(u => {
      console.log(`ID: ${u._id}, Email: '${u.email}', Role: ${u.role}, Username: ${u.username}`);
    });

    mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
};

checkUsers();
