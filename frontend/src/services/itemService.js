import axios from "axios";

const API_URL = "http://localhost:5000/api/items"; // adjust if different

// Add new item
const addItem = async (formData, token) => {
  const res = await axios.post(API_URL + "/add", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Get all items of a user
const getUserItems = async (userId) => {
  const res = await axios.get(`${API_URL}/user/${userId}`);
  return res.data;
};

// Get single item by ID
const getItemById = async (itemId) => {
  const res = await axios.get(`${API_URL}/${itemId}`);
  return res.data;
};

const itemService = {
  addItem,
  getUserItems,
  getItemById,
};

export default itemService;
