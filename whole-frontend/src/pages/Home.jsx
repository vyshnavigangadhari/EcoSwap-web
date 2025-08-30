import React, { useMemo, useState } from "react";
import { useItems } from "../context/ItemsContext";
import ItemCard from "../components/ItemCard";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const { items = [] } = useItems();
  const [filter, setFilter] = useState("ALL");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    return items
      .filter(it => filter === "ALL" ? true : it.status?.toUpperCase() === filter)
      .filter(it => {
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
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="home-controls">
        <SearchBar value={q} onChange={setQ} />
        <FilterBar filter={filter} setFilter={setFilter} />
      </div>

      {/* Items Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {list.map(item => (
          <ItemCard key={item._id} item={item} />
        ))}
        {list.length === 0 && (
          <p className="text-gray-500">No items match your filters.</p>
        )}
      </div>
    </div>
  );
}
