import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true }
)

const Cart = mongoose.model("cart",cartSchema)

export default Cart;