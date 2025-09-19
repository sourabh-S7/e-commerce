import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import authRouter from "./controllers/auth/auth.js";
import buyerRouter from "./controllers/buyer/buyer.js";
import sellerRouter from "./controllers/seller/seller.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/buyer", buyerRouter);
app.use("/api/seller", sellerRouter);

app.get("/", (req, res) => res.json({ message: "Server running 🚀" }));


connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});
