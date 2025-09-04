import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    pending: 0,
    swapped: 0,
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const available = items.filter((it) => it.status === "AVAILABLE").length;
    const pending = items.filter((it) => it.status === "PENDING").length;
    const swapped = items.filter((it) => it.status === "SWAPPED").length;

    setStats({
      total: items.length,
      available,
      pending,
      swapped,
    });
  }, []);

  return (
    <div className="container dashboard">
      <h1>Dashboard</h1>

      {/* Stats cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-num">{stats.total}</div>
          <div className="stat-label">Total Items</div>
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

      {/* Optional: Progress bar */}
      <div className="card">
        <h2>Progress Overview</h2>
        <div className="progress-container">
          <div
            className="progress available"
            style={{
              width: stats.total
                ? `${(stats.available / stats.total) * 100}%`
                : "0%",
            }}
          />
          <div
            className="progress pending"
            style={{
              width: stats.total
                ? `${(stats.pending / stats.total) * 100}%`
                : "0%",
            }}
          />
          <div
            className="progress swapped"
            style={{
              width: stats.total
                ? `${(stats.swapped / stats.total) * 100}%`
                : "0%",
            }}
          />
        </div>
        <p className="muted">
          {stats.available} Available • {stats.pending} Pending • {stats.swapped} Swapped
        </p>
      </div>
    </div>
  );
}
