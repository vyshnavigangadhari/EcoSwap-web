import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemById, requestSwap } from "../services/itemService";

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [swapOpen, setSwapOpen] = useState(false);
  const [swapForm, setSwapForm] = useState({ requesterName: "", offeredItemId: "", message: "" });
  const [swapMsg, setSwapMsg] = useState("");
  const [swapErr, setSwapErr] = useState("");
  const [coins, setCoins] = useState(100);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getItemById(id);
      console.log("🔎 Loaded item in detail page:", data);
      setItem(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const onSwapChange = (e) =>
    setSwapForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSwapSubmit = async (e) => {
    e.preventDefault();
    setSwapErr("");
    setSwapMsg("");
    try {
      await requestSwap(id, swapForm);
      setSwapMsg("Swap request sent! 🎉 You earned 100 coins.");
      setCoins((c) => c + 100);
      setSwapOpen(false);
      setSwapForm({ requesterName: "", offeredItemId: "", message: "" });
      await load();
    } catch (err) {
      setSwapErr(err?.message || "Swap request failed");
    }
  };

  if (loading) return <p>Loading…</p>;
  if (!item) return <p>Item not found.</p>;

  // Simplified image logic: always use item.image if present
  return (
    <div className="card">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="item-detail-image"
          style={{ width: "220px", height: "220px", objectFit: "cover", marginBottom: "16px" }}
        />
      ) : (
        <p className="muted">(No image available)</p>
      )}

      <h2 style={{ marginTop: 14 }}>{item.title}</h2>
      <p className="muted">
        Owner: <b>{item.owner || "Unknown"}</b> • Status:{" "}
        <span className={`badge ${item.status}`}>{item.status}</span>
      </p>

      <div className="spacer" />
      <p style={{ color: "#334155" }}>{item.description}</p>
    </div>
  );
}
