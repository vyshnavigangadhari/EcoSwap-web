// backend/services/itemService.js
import Item from "../models/item.js";

// Get all items with owner populated
const getAllItems = async () => {
  return await Item.find().populate("owner", "name email");
};

// Get one item with owner populated
const getItemById = async (id) => {
  return await Item.findById(id).populate("owner", "name email");
};

// ✅ Create a new item, return with owner populated
const createItem = async (itemData) => {
  const newItem = new Item(itemData);
  await newItem.save();
  return await newItem.populate("owner", "name email");
};

// Update an existing item
const updateItem = async (id, itemData) => {
  return await Item.findByIdAndUpdate(id, itemData, { new: true }).populate(
    "owner",
    "name email"
  );
};

// Delete an item
const deleteItem = async (id) => {
  return await Item.findByIdAndDelete(id);
};

export default { getAllItems, getItemById, createItem, updateItem, deleteItem };
