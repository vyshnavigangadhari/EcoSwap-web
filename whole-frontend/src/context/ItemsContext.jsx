// src/context/ItemsContext.jsx
import { createContext, useContext, useEffect, useState, useMemo } from "react";

const Ctx = createContext();

export function ItemsProvider({ children }) {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token"); // assume stored at login

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/items", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Failed to fetch items", err));
  }, [token]);

  // Add Item (backend handles owner)
  const addItem = async (item) => {
    try {
      const res = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });
      const newItem = await res.json();
      setItems((prev) => [newItem, ...prev]);
    } catch (err) {
      console.error("Failed to add item", err);
    }
  };

  // Update Item
  const updateItem = async (id, updates) => {
    try {
      const res = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      const updated = await res.json();
      setItems((prev) => prev.map((i) => (i._id === id ? updated : i)));
    } catch (err) {
      console.error("Failed to update item", err);
    }
  };

  // Delete Item
  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Failed to delete item", err);
    }
  };

  const value = useMemo(
    () => ({ items, addItem, updateItem, deleteItem }),
    [items]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useItems = () => useContext(Ctx);
