import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description : String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
}, 
{ timestamps: true})


export const Product = mongoose.model("products",productSchema)