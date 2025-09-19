import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["buyer", "seller"], default: "buyer" },
  balance: { type: Number, default: 0 }
}, 
{ timestamps: true })


const User = mongoose.model("users", userSchema)

export default User;