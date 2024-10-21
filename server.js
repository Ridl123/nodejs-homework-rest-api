import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Admin:Adminforhomework@cluster0.onxr6.mongodb.net/"
    );
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1); // încheie procesul dacă conexiunea la baza de date eșuează
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
