import express from "express";
import { createItem, getItems } from "../controllers/itemController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createItem);
router.get("/", getItems);

export default router;
