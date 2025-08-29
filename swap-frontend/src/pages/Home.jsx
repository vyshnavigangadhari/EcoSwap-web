import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getItems } from "../services/itemService";

export default function Home() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");

  const load = async () => {
    const data = await getItems({ q, status });
    setItems(data);
  };

  useEffect(() => { load(); }, []); // initial

  const onFilter = async (e) => { e.preventDefault(); await load(); };

  return (
    <div>
      <form onSubmit={onFilter} className="toolbar">
        <input
          className="input"
          placeholder="Search title/description/owner"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="pending">Pending</option>
          <option value="swapped">Swapped</option>
        </select>
        <button className="btn btn-primary" type="submit">Filter</button>
      </form>

      <div className="grid">
        {items.map((it) => <ItemCard key={it._id} item={it} />)}
      </div>

      {items.length === 0 && <p className="muted" style={{ marginTop: 16 }}>No items found.</p>}
    </div>
  );
}
