import { log } from "console";
import express from "express";
import authRouter from "./controllers/auth/auth.js"


const app = express();
const PORT = 3000;


app.use(express.json());


app.get('/', (req, res)=> {
    res.json({
        message: "Server is running"
    })
})


app.use('/auth', authRouter);


app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})
