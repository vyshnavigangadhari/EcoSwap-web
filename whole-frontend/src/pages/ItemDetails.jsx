import { useParams, Link } from "react-router-dom";
import { useItems } from "../context/ItemsContext.jsx";
import StatusBadge from "../components/StatusBadge.jsx";

export default function ItemDetails() {
  const { id } = useParams();
  const { items, updateItem } = useItems();
  const item = items.find((i) => i._id === id); // ✅ use _id

  if (!item) return <p>Item not found.</p>;

  const cycle = () => {
    const order = ["available", "pending", "swapped"]; // ✅ lowercase
    const next = order[(order.indexOf(item.status) + 1) % order.length];
    updateItem(item._id, { status: next }); // ✅ use _id
  };

  return (
    <section className="stack-lg">
      <Link className="link" to="/">
        <button className="btn">Back</button>
      </Link>
      <h1>{item.title}</h1>

      <p className="muted">
        Owner:{" "}
        <strong>{item.owner?.name || "Unknown"}</strong>{" "}
        ({item.owner?.email || "No email"}) • Status:{" "}
        <StatusBadge status={item.status} />
      </p>

      <p>{item.description}</p>

      <div className="row gap">
        <button className="btn" onClick={cycle}>
          Change status
        </button>
        <button className="btn ghost">Start swap chat</button>
      </div>
    </section>
  );
}
