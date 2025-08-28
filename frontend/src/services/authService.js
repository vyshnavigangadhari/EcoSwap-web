// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // adjust for your backend

const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data; // expected { user: {username, swapCoins, token} }
};

const signup = async (username, email, password) => {
  const res = await axios.post(`${API_URL}/signup`, { username, email, password });
  return res.data;
};

export default { login, signup };
