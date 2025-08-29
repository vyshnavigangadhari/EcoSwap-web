import { useState } from "react";
import { createItem } from "../services/itemService";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title:"", description:"", owner:"", imageUrl:"" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const created = await createItem(form);
      navigate(`/items/${created._id}`);
    } catch (err) {
      setError(err?.message || "Failed to create item");
    }
  };

  return (
    <div className="card" style={{ maxWidth: 680 }}>
      <h2 style={{ marginTop: 0 }}>Add Item</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <div>
          <div className="label">Title *</div>
          <input className="input" name="title" value={form.title} onChange={onChange} required />
        </div>

        <div>
          <div className="label">Description</div>
          <textarea className="textarea" rows={4} name="description" value={form.description} onChange={onChange} />
        </div>

        <div>
          <div className="label">Owner *</div>
          <input className="input" name="owner" value={form.owner} onChange={onChange} required />
        </div>

        <div>
          <div className="label">Image URL (optional)</div>
          <input className="input" name="imageUrl" value={form.imageUrl} onChange={onChange} />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-primary" type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}
