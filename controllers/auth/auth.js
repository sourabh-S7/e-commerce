import express from 'express';


const router = express.Router()




router.get('/login', (req, res)=>{
    res.send('Login Route')
})

router.get('/signup', (req, res)=>{
    res.send('Signup Route')
})


export default router;