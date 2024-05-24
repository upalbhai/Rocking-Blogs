import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser())
mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("Database connection successfull")
}).catch((err)=>{
    console.log(err)
})
app.listen(3000,(req,res)=>{
    console.log('Server running on 3000')
})
app.get('/',(req,res)=>{
    res.send('Hello World')
})

// routes
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

//middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})