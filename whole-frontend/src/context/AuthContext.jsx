import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // ✅ Login function
  const login = (username, password) => {
    // Here you can add real API check. For now, mock user:
    const newUser = { username };

    // Save only user data — DO NOT touch items/requests
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // ✅ Logout function
  const logout = () => {
  setUser(null);
  // ❌ localStorage.clear();   // wrong
  // ✅ only clear auth keys
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
