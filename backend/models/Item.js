import mongoose from "mongoose";

const itemSchema=new mongoose.Schema(
    {
        title:{type:String,required:true},
        description:String,
        owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
        available:{type:Boolean,default:true}   
    },
    {
        timestamps:true
    }
);

export default mongoose.model('Item',itemSchema);