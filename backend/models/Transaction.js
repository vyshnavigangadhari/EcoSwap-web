import mongoose from "mongoose";

const transactionSchema=new mongoose.Schema(
    {
        item:{ type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        requestedBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        status:{ type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
    }, 
    { 
        timestamps: true 
    }
);

export default mongoose.model("Transaction", transactionSchema);
