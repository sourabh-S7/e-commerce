import express from "express";
import Cart from "../../db/models/Cart.js";
import Order from "../../db/models/Order.js";
import Product from '../../db/models/Product.js';
import User from "../../db/models/User.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/profile", authMiddleware(["buyer"]), async (req, res) => {
  res.json(req.user);
});


router.post("/add-balance", authMiddleware(["buyer"]), async (req, res) => {
  const { amount } = req.body;
  req.user.balance += amount;
  await req.user.save();
  res.json({ balance: req.user.balance });
});


router.post("/add-to-cart", authMiddleware(["buyer"]), async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ buyer: req.user._id });
  if (!cart) cart = new Cart({ buyer: req.user._id, items: [] });

  cart.items.push({ product: productId, quantity });
  await cart.save();
  res.json(cart);
});


router.post("/place-order", authMiddleware(["buyer"]), async (req, res) => {
  const cart = await Cart.findOne({ buyer: req.user._id }).populate("items.product");
  if (!cart) return res.status(400).json({ message: "Cart is empty" });

  let totalAmount = 0;
  const products = cart.items.map(item => {
    totalAmount += item.product.price * item.quantity;
    return { product: item.product._id, quantity: item.quantity };
  });

  if (req.user.balance < totalAmount) return res.status(400).json({ message: "Insufficient balance" });

  req.user.balance -= totalAmount;
  await req.user.save();

  const order = new Order({
    buyer: req.user._id,
    seller: cart.items[0].product.seller,
    products,
    totalAmount
  });
  await order.save();

  await Cart.deleteOne({ buyer: req.user._id });

  res.json({ message: "Order placed successfully", order });
});

export default router;
