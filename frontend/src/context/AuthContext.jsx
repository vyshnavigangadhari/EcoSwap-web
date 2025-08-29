import { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Login
  const login = async (email, password) => {
    try {
      const res = await authService.login(email, password);
      setUser(res.user); // user has { username, swapCoins }
      setToken(res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Signup
  const signup = async (username, email, password) => {
    try {
      const res = await authService.signup(username, email, password);
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Update user coins after swap approval/decline
  const updateCoins = (newBalance) => {
    if (user) {
      const updatedUser = { ...user, swapCoins: newBalance };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, updateCoins }}
    >
      {children}
    </AuthContext.Provider>
  );
};
