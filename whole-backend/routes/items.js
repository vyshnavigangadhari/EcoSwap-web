// routes/itemRoutes.js
import express from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemsController.js";
import itemService from "../services/itemService.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all items
router.get("/", (req, res) => getAllItems(req, res, itemService));

// GET item by ID
router.get("/:id", (req, res) => getItemById(req, res, itemService));

// POST create new item (protected)
router.post("/", auth, (req, res) => createItem(req, res, itemService));

// PUT update item (protected)
router.put("/:id", auth, (req, res) => updateItem(req, res, itemService));

// DELETE item (protected)
router.delete("/:id", auth, (req, res) => deleteItem(req, res, itemService));

export default router;
