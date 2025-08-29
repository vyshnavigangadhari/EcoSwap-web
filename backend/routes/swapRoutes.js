import express from "express";
import { requestSwap } from "../controllers/swapController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:itemId", protect, requestSwap);

export default router;
