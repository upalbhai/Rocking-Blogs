import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("Database connection successfull")
}).catch((err)=>{
    console.log(err)
})
app.listen(3000,(req,res)=>{
    console.log('Server running on 3000')
})

// routes
app.use('/api/user',userRoutes)