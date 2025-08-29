const STORAGE_KEY = "swapapp_items";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Optional: seed a couple of items on first load
(function seed() {
  const items = readAll();
  if (items.length === 0) {
    const demo = [
      {
        _id: uid(),
        title: "Guitar Strap",
        description: "Padded strap in good condition.",
        owner: "Alex",
        imageUrl: "",
        status: "available",
        swapRequests: [],
        createdAt: Date.now()
      },
      {
        _id: uid(),
        title: "Cookbook",
        description: "Vegetarian recipes. Like new.",
        owner: "Riya",
        imageUrl: "",
        status: "available",
        swapRequests: [],
        createdAt: Date.now()
      }
    ];
    writeAll(demo);
  }
})();

export async function getItems(params = {}) {
  const { q = "", status = "" } = params;
  const items = readAll();
  const query = q.trim().toLowerCase();

  let filtered = items;
  if (query) {
    filtered = filtered.filter((it) =>
      [it.title, it.description, it.owner].some((v) =>
        (v || "").toLowerCase().includes(query)
      )
    );
  }
  if (status) {
    filtered = filtered.filter((it) => it.status === status);
  }
  // sort newest first
  filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  return filtered;
}

export async function getItemById(id) {
  const items = readAll();
  const item = items.find((it) => it._id === id);
  if (!item) throw new Error("Item not found");
  return item;
}

export async function createItem(payload) {
  if (!payload?.title || !payload?.owner) {
    throw new Error("title and owner are required");
  }
  const items = readAll();
  const newItem = {
    _id: uid(),
    title: payload.title,
    description: payload.description || "",
    owner: payload.owner,
    imageUrl: payload.imageUrl || "",
    status: "available",
    swapRequests: [],
    createdAt: Date.now()
  };
  items.push(newItem);
  writeAll(items);
  return newItem;
}

export async function updateItem(id, updates) {
  const items = readAll();
  const idx = items.findIndex((it) => it._id === id);
  if (idx === -1) throw new Error("Item not found");
  items[idx] = { ...items[idx], ...updates };
  writeAll(items);
  return items[idx];
}

export async function deleteItem(id) {
  const items = readAll();
  const next = items.filter((it) => it._id !== id);
  writeAll(next);
  return { ok: true };
}

export async function requestSwap(id, payload) {
  if (!payload?.requesterName) throw new Error("requesterName is required");
  const items = readAll();
  const idx = items.findIndex((it) => it._id === id);
  if (idx === -1) throw new Error("Item not found");

  const swap = {
    _id: uid(),
    requesterName: payload.requesterName,
    offeredItemId: payload.offeredItemId || null,
    message: payload.message || "",
    status: "pending",
    createdAt: Date.now()
  };

  const updated = { ...items[idx], swapRequests: [...(items[idx].swapRequests || []), swap] };
  items[idx] = updated;
  writeAll(items);
  return { message: "Swap requested", item: updated };
}
// Ensure we always have demo items for each status on first run
(function ensureStatusExamples() {
  const items = readAll();
  const hasPending = items.some((it) => it.status === "pending");
  const hasSwapped = items.some((it) => it.status === "swapped");

  if (!hasPending) {
    items.push({
      _id: uid(),
      title: "Bluetooth Headphones",
      description: "Over-ear; battery ~15h. Minor scuffs.",
      owner: "Sam",
      imageUrl: "",
      status: "pending",
      swapRequests: [],
      createdAt: Date.now()
    });
  }

  if (!hasSwapped) {
    items.push({
      _id: uid(),
      title: "Yoga Mat",
      description: "Non-slip mat, 6mm, lilac. Already swapped.",
      owner: "Meera",
      imageUrl: "",
      status: "swapped",
      swapRequests: [],
      createdAt: Date.now()
    });
  }

  if (!hasPending || !hasSwapped) {
    writeAll(items);
  }
})();
