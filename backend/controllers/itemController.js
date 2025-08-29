import Item from "../models/Item.js";

export const createItem = async (req, res) => {
  try {
    const item = await Item.create({
      title: req.body.title,
      description: req.body.description,
      owner: req.user._id
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.find().populate("owner", "name email");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
