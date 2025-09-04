import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", message: "" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("items")) || [];
    const found = stored.find((it) => it._id === id);
    setItem(found);
  }, [id]);

  const handleRequest = (e) => {
    e.preventDefault();

    const newRequest = {
      requestId: Date.now().toString(),
      itemId: item._id,
      itemTitle: item.title,
      fromUser: form.name,
      toUser: item.owner,
      message: form.message || "",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    // Save request
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    const updatedRequests = [...storedRequests, newRequest];
    localStorage.setItem("requests", JSON.stringify(updatedRequests));

    // 🔥 Update item’s status → PENDING
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    const updatedItems = storedItems.map((it) =>
      it._id === item._id ? { ...it, status: "PENDING" } : it
    );
    localStorage.setItem("items", JSON.stringify(updatedItems));

    alert("Swap request sent!");
    setForm({ name: "", message: "" });
    setShowForm(false);
  };

  if (!item) return <p>Item not found</p>;

  return (
    <div className="details-page">
      <div className="details-card">
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <p className="muted">Owner: {item.owner}</p>
        <p className="muted">Status: {item.status}</p>

        {item.status === "AVAILABLE" && (
          <>
            <button className="btn" onClick={() => setShowForm(!showForm)}>
              Request Swap
            </button>

            {showForm && (
              <form onSubmit={handleRequest} className="form">
                <label>
                  Your Name
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  Message
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                </label>
                <button type="submit" className="btn">
                  Send Request
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
