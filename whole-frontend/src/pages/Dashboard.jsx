import { useMemo } from "react";
import { useItems } from "../context/ItemsContext.jsx";

export default function Dashboard() {
  const { items } = useItems();

  const stats = useMemo(() => {
    return {
      total: items.length,
      available: items.filter(i => i.status?.toUpperCase() === "AVAILABLE").length,
      pending: items.filter(i => i.status?.toUpperCase() === "PENDING").length,
      swapped: items.filter(i => i.status?.toUpperCase() === "SWAPPED").length,
      newest: [...items]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5),
    };
  }, [items]);

  return (
    <section className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-num">{stats.total}</div>
          <div className="stat-label">Total items</div>
        </div>
        <div className="stat-card available">
          <div className="stat-num">{stats.available}</div>
          <div className="stat-label">Available</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-num">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card swapped">
          <div className="stat-num">{stats.swapped}</div>
          <div className="stat-label">Swapped</div>
        </div>
      </div>

      <h2>Recent items</h2>
      <ul className="recent-list">
        {stats.newest.map(i => (
          <li key={i._id || i.title}>
            <strong>{i.title}</strong> —{" "}
            {new Date(i.createdAt).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </section>
  );
}
