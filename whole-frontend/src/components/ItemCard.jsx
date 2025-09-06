import { Link } from "react-router-dom";

export default function ItemCard({ item, onDelete }) {
  return (
    <div className="card">
      {/* Item Image */}
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="item-image"
        />
      )}

      {/* Item Info */}
      <h2>{item.title}</h2>
      <p>{item.description || "No description provided"}</p>
      <p>Owner: {item.owner}</p>
      <p>Status: {item.status}</p>

      {/* Actions */}
      <div className="card-actions">
        <Link to={`/items/${item._id}`}>
          <button className="btn">View Details</button>
        </Link>

        <button
          className="btn ghost"
          onClick={() => {
            if (window.confirm(`Delete "${item.title}"?`)) {
              onDelete(item._id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
