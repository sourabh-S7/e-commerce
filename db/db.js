import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb+srv://sourabhs7:143123@cluster0.qeukmbw.mongodb.net/e-commerce");
        console.log("connected to MongoDB");
        
    } catch (error) {
        console.log("connection failed", error.message);
        
    }
}

export {connectDB};