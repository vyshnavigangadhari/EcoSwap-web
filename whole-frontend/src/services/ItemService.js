// src/services/itemService.js

// Get all items from localStorage
export async function getItems() {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  return items;
}

// Get single item by id
export async function getItemById(id) {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  const found = items.find((it) => String(it._id) === String(id));
  console.log("getItemById returning:", found); // 👀 Debug log
  return found || null;
}

// Create new item
export async function createItem(payload) {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  items.push(payload);
  localStorage.setItem("items", JSON.stringify(items));
  return payload;
}

// Update item
export async function updateItem(id, updates) {
  let items = JSON.parse(localStorage.getItem("items")) || [];
  items = items.map((it) => (String(it._id) === String(id) ? { ...it, ...updates } : it));
  localStorage.setItem("items", JSON.stringify(items));
  return items.find((it) => String(it._id) === String(id));
}

// Delete item
export async function deleteItem(id) {
  let items = JSON.parse(localStorage.getItem("items")) || [];
  items = items.filter((it) => String(it._id) !== String(id));
  localStorage.setItem("items", JSON.stringify(items));
  return { ok: true };
}

// Handle swap requests
export async function requestSwap(id, payload) {
  let items = JSON.parse(localStorage.getItem("items")) || [];
  items = items.map((it) => {
    if (String(it._id) === String(id)) {
      const swapRequests = it.swapRequests || [];
      return {
        ...it,
        swapRequests: [
          ...swapRequests,
          { ...payload, _id: Date.now().toString(), status: "PENDING" },
        ],
      };
    }
    return it;
  });
  localStorage.setItem("items", JSON.stringify(items));
  return items.find((it) => String(it._id) === String(id));
}
