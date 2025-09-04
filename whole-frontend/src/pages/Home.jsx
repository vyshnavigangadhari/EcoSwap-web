import React, { useMemo, useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [q, setQ] = useState("");

  // Load items from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("items")) || [];
    setItems(stored);
  }, []);

  // Delete item
  const handleDelete = (id) => {
    const updated = items.filter((it) => it._id !== id);
    setItems(updated);
    localStorage.setItem("items", JSON.stringify(updated));
  };

  // Filter + search logic
  const list = useMemo(() => {
    return items
      .filter((it) =>
        filter === "ALL" ? true : it.status?.toUpperCase() === filter
      )
      .filter((it) => {
        const title = it?.title || "";
        const desc = it?.description || "";
        return (
          title.toLowerCase().includes(q.toLowerCase()) ||
          desc.toLowerCase().includes(q.toLowerCase())
        );
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [items, filter, q]);

  return (
    <div className="space-y-6 container">
      {/* Top Controls */}
      <div className="home-controls">
        <SearchBar value={q} onChange={setQ} />
        <FilterBar filter={filter} setFilter={setFilter} />
      </div>

      {/* Items Grid */}
      <div className="grid">
        {list.map((item) => (
          <ItemCard key={item._id} item={item} onDelete={handleDelete} />
        ))}
        {list.length === 0 && (
          <p className="muted">No items match your filters.</p>
        )}
      </div>
    </div>
  );
}
