import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.Mongo_URI);
        console.log("connected to MongoDB");
        
    } catch (error) {
        console.log("connection failed", error.message);
        
    }
}

export {connectDB};