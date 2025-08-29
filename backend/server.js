//import required packages and files
import express from 'express'; //for builidng APIs
import dotenv from 'dotenv'; //helps use .env file
import connectDB from './config/db.js'; //function to connect to database
import authRoutes from './routes/authRoutes.js';// routes related to user authentication(login,regsiter)
import itemRoutes from './routes/itemRoutes.js';//routes for managing items
import swapRoutes from './routes/swapRoutes.js';//routes for swapping items between users

//load environment variables and connect to database
dotenv.config();
connectDB();

//initialize express app and middleware
const app=express();
app.use(express.json());

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/items',itemRoutes);
app.use('/api/swap',swapRoutes);

//start server
const PORT=process.env.PORT || 5000;
//listen on specified port
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})