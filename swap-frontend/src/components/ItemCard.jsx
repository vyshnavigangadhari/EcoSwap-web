import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
  return (
    <div className="card">
      {item.imageUrl ? <img src={item.imageUrl} alt={item.title} /> : null}

      <h3 className="title">{item.title}</h3>
      <p className="muted">
        Owner: <b>{item.owner}</b> • Status:{" "}
        <span className={`badge ${item.status}`}>{item.status}</span>
      </p>

      <div className="spacer" />
      <p className="muted" style={{ color: "#334155" }}>
        {item.description?.slice(0, 140)}
        {item.description && item.description.length > 140 ? "…" : ""}
      </p>

      <div className="section">
        <Link className="btn btn-ghost" to={`/items/${item._id}`}>View details →</Link>
      </div>
    </div>
  );
}
