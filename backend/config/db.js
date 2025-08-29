import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        //establish connection to MongoDB using URI stored in .env
        //process.env.MONGO_URI -> fetches the database URL from environment variables 
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);        
    }
    catch(error){
        //if something goes wrong(wrong URI,DB server down)
        //print error message on console
        console.error(`Error: ${error.message}`);
        //exit the process with failure(1->error,0->success)
        process.exit(1);
    }
};
//export the function to be used in other files
export default connectDB;