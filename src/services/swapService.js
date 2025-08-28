import axios from "axios";

// Base URL of your backend API
const API_URL = "http://localhost:5000/api/swaps"; // adjust if different

// Helper to get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch pending swaps for a user
const getPendingSwaps = async (userId) => {
  const res = await axios.get(`${API_URL}/pending/${userId}`, getAuthHeaders());
  return res.data; // Array of swaps
};

// Approve a swap
const approveSwap = async (swapId) => {
  const res = await axios.put(`${API_URL}/approve/${swapId}`, {}, getAuthHeaders());
  return res.data;
};

// Decline a swap
const declineSwap = async (swapId) => {
  const res = await axios.put(`${API_URL}/decline/${swapId}`, {}, getAuthHeaders());
  return res.data;
};

const swapService = {
  getPendingSwaps,
  approveSwap,
  declineSwap,
};

export default swapService;
