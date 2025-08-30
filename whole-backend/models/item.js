// backend/models/Item.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: String,
    imageUrl: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["AVAILABLE", "PENDING", "SWAPPED"],
      default: "AVAILABLE",
    },
    swapRequests: [
      {
        requesterName: String,
        offeredItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
        message: String,
        status: { type: String, default: "PENDING" }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
