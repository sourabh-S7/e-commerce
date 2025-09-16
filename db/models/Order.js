import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: Number
    }
  ],
    totalAmount: Number,
    status: { type: String, enum: ["pending", "completed"], default: "pending" }
}, 
{ timestamps: true });

export const Order = mongoose.model("orders",orderSchema)