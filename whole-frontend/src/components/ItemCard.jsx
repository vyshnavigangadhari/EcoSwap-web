import { Link } from "react-router-dom";

export default function ItemCard({ item, onDelete }) {
  return (
    <div className="card">
      <h2>{item.title}</h2>
      <p>Owner: {item.owner}</p>
      <p>Status: {item.status}</p>

      <div className="card-actions">
        <Link to={`/items/${item._id}`}>
          <button className="btn">View Details</button>
        </Link>

        {/* Delete button */}
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
