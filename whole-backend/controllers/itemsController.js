// controllers/itemController.js
export const getAllItems = async (req, res, itemService) => {
  try {
    const items = await itemService.getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving items', error });
  }
};

export const getItemById = async (req, res, itemService) => {
  const { id } = req.params;
  try {
    const item = await itemService.getItemById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving item', error });
  }
};


export const createItem = async (req, res, itemService) => {
  try {
    const newItem = {
      ...req.body,
      owner: req.user._id, // ✅ attach logged-in user
    };
    const createdItem = await itemService.createItem(newItem);
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: "Error creating item", error });
  }
};


export const updateItem = async (req, res, itemService) => {
  const { id } = req.params;
  const updatedItem = req.body;
  try {
    const item = await itemService.updateItem(id, updatedItem);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
};

export const deleteItem = async (req, res, itemService) => {
  const { id } = req.params;
  try {
    const deletedItem = await itemService.deleteItem(id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
};
