const mongoose = require("mongoose");
mongoose.set("debug", true);
const app = require("./app"); // presupunem că 'app' este aplicația Express definită în alt fișier
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
    J;
    process.exit(1); // încheie procesul dacă conexiunea la baza de date eșuează
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
