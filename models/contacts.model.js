import mongoose from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId, // Stoceaza ID-ul utilizatorului care a creat contactul
    ref: "User", // Referință la modelul 'User'
    required: true,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
