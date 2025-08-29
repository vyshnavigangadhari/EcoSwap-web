// services/itemService.js
import Item from "../models/item.js";

// Get all items
const getAllItems = async () => {
  return await Item.find();
};

// Get a single item by ID
const getItemById = async (id) => {
  return await Item.findById(id);
};

// Create a new item
const createItem = async (itemData) => {
  const newItem = new Item(itemData);
  return await newItem.save();
};

// Update an existing item
const updateItem = async (id, itemData) => {
  return await Item.findByIdAndUpdate(id, itemData, { new: true });
};

// Delete an item
const deleteItem = async (id) => {
  return await Item.findByIdAndDelete(id);
};

export default {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
