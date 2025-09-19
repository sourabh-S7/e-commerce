import express from "express";
import Product from "../../db/models/Product.js";
import Order from "../../db/models/Order.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/profile", authMiddleware(["seller"]), (req, res) => {
  res.json(req.user);
});


router.post("/add-product", authMiddleware(["seller"]), async (req, res) => {
  const { name, description, price, stock } = req.body;

  const product = new Product({ name, description, price, stock, seller: req.user._id });

  await product.save();
  res.json(product);
});


router.get("/orders", authMiddleware(["seller"]), async (req, res) => {
  const orders = await Order.find({ seller: req.user._id }).populate("products.product");
  res.json(orders);
});


export default router;
