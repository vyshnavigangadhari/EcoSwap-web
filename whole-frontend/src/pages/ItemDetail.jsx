import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemById, requestSwap } from "../services/itemService";

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [swapOpen, setSwapOpen] = useState(false);
  const [swapForm, setSwapForm] = useState({ requesterName:"", offeredItemId:"", message:"" });
  const [swapMsg, setSwapMsg] = useState("");
  const [swapErr, setSwapErr] = useState("");
  const [coins, setCoins] = useState(100); // default

  const load = async () => {
    setLoading(true);
    try { setItem(await getItemById(id)); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [id]);

  const onSwapChange = (e) => setSwapForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSwapSubmit = async (e) => {
    e.preventDefault(); setSwapErr(""); setSwapMsg("");
    try {
      await requestSwap(id, {
        requesterName: swapForm.requesterName,
        offeredItemId: swapForm.offeredItemId || undefined,
        message: swapForm.message
      });
      setSwapMsg("Swap request sent! 🎉 You earned 100 coins.");
      setCoins(c => c + 100);
      setSwapOpen(false);
      setSwapForm({ requesterName:"", offeredItemId:"", message:"" });
      await load();
    } catch (err) { setSwapErr(err?.message || "Swap request failed"); }
  };

  if (loading) return <p>Loading…</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <div className="card">
      {item.imageUrl ? <img src={item.imageUrl} alt={item.title} /> : null}
      <h2 style={{ marginTop: 14 }}>{item.title}</h2>
      <p className="muted">
        Owner: <b>{item.owner?.name}</b> ({item.owner?.email}) • Status:{" "}
        <span className={`badge ${item.status}`}>{item.status}</span>
      </p>
      <div className="spacer" />
      <p style={{ color:"#334155" }}>{item.description}</p>

      <p className="mt-3">💰 Your coins: <b>{coins}</b></p>

      <div className="section">
        <button className="btn btn-primary" onClick={() => setSwapOpen(v => !v)}>
          {swapOpen ? "Close" : "Request Swap"}
        </button>
      </div>

      {swapOpen && (
        <form onSubmit={onSwapSubmit} style={{ display:"grid", gap:12, marginTop:12 }}>
          {swapErr && <div className="error">{swapErr}</div>}
          <div>
            <div className="label">Your name *</div>
            <input className="input" name="requesterName" value={swapForm.requesterName} onChange={onSwapChange} required />
          </div>
          <div>
            <div className="label">Offered Item ID (optional)</div>
            <input className="input" name="offeredItemId" value={swapForm.offeredItemId} onChange={onSwapChange} />
          </div>
          <div>
            <div className="label">Message (optional)</div>
            <textarea className="textarea" rows={3} name="message" value={swapForm.message} onChange={onSwapChange} />
          </div>
          <button className="btn btn-ghost" type="submit">Send Request</button>
        </form>
      )}

      {swapMsg && <div className="section success">{swapMsg}</div>}

      <div className="section">
        <h3>Swap Requests</h3>
        {item.swapRequests?.length ? (
          <ul style={{ paddingLeft: 18 }}>
            {item.swapRequests.map((sr) => (
              <li key={sr._id} style={{ marginBottom: 8 }}>
                <b>{sr.requesterName}</b> — {sr.message || "(no message)"} • <i>{sr.status}</i>
              </li>
            ))}
          </ul>
        ) : <p className="muted">No swap requests yet.</p>}
      </div>
    </div>
  );
}
