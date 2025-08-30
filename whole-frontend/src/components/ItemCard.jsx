import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge.jsx";

export default function ItemCard({ item }) {
  return (
    <article className="card">
      {/* Optional Image */}
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-40 w-full object-cover rounded"
        />
      )}

      {/* Title */}
      <h3>{item.title || "Untitled Item"}</h3>

      {/* Owner + Status */}
      <p className="muted">
        Owner: <strong>{item.owner?.name || "Unknown"}</strong> • Status:{" "}
        <StatusBadge status={item.status || "available"} />
      </p>

      {/* Description */}
      <p>{item.description || "No description provided"}</p>

      {/* Actions */}
      <div className="card-actions">
        <Link className="btn" to={`/items/${item._id}`}>
          View details 
        </Link>
      </div>
    </article>
  );
}
