import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../db/models/User.js";


const router = express.Router();

router.post('/register', async(req,res)=>{
try {
        const{name, email, password, role}=req.body;
    
        let user = await User.findOne({email});
        if (user) return res.status(400).json({"message" :"user already exists"})
        
        const hashedPassword = await bcrypt.hash(password, 10);
    
        user = new User({name, email, password: hashedPassword, role});
        await user.save();
    
        res.status(201).json({"message":"user registered successfully"})
        
} catch (error) {
    res.status(500).json({error})
}
})



router.post('/login', async (req,res)=>{
    try {
        const {email, password} =req.body;  
        
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({"message":"Invalid Credentials"})
    
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({"message":"Invalid Credentials"})
    
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn:"1h"})
    
        res.json({token, user:{id: user._id, name: user.name, email: user.email, role: user.role}})
        
    } catch (error) {
        res.status(500).json({error})
        
    }
})


export default router;