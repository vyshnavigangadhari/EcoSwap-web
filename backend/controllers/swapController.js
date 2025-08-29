import Transaction from "../models/Transaction.js";
import Item from "../models/Item.js";

export const requestSwap = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);

    if (!item || !item.available) {
      return res.status(400).json({ message: "Item not available" });
    }

    const transaction = await Transaction.create({
      item: itemId,
      requestedBy: req.user._id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
