import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { type } from "os";
import { timeStamp } from "console";

//schema for user data in MongoDB
const userSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true}
    },

    {
    //createdAt,updatedAt fields will be automatically added and managed by mongoose
    timeStamps:true
    }
);

//Mongoose 'pre-save' middleware 
//to hash password before saving user document
userSchema.pre('save',async function (next){
    //if password is not modified,skip hashing
    if(!this.isModified('password')) return next();
    //hash the password with a salt round of 10
    this.password=await bcrypt.hash(this.password,10);
    //proceed to save the user document
    next();
});

//method to compare entered password with hashed password in DB
userSchema.methods.matchPassword=async function (enteredPassword){
    //bcrypt.compare returns true if passwords match,false otherwise
    return await bcrypt.compare(enteredPassword,this.password);
};

export default mongoose.model