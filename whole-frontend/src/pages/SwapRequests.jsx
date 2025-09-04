import { useEffect, useState } from "react";

export default function SwapRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(stored); // ✅ show all requests for testing
  }, []);

  const updateStatus = (id, newStatus) => {
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    const updated = storedRequests.map((req) =>
      req.requestId === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
    localStorage.setItem("requests", JSON.stringify(updated));

    // also update item status
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const req = storedRequests.find((r) => r.requestId === id);

    let updatedItems = [...items];
    if (newStatus === "ACCEPTED") {
      updatedItems = items.map((it) =>
        it._id === req.itemId ? { ...it, status: "SWAPPED" } : it
      );
    } else if (newStatus === "REJECTED") {
      updatedItems = items.map((it) =>
        it._id === req.itemId ? { ...it, status: "AVAILABLE" } : it
      );
    }

    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  return (
    <div className="container">
      <h1 className="brand">Swap Requests (Testing – All)</h1>
      {requests.length === 0 ? (
        <p className="muted">No swap requests found.</p>
      ) : (
        <div className="grid">
          {requests.map((req) => (
            <div key={req.requestId} className="card">
              <h2>{req.itemTitle}</h2>
              <p>
                From: <strong>{req.fromUser}</strong>
              </p>
              <p>
                To: <strong>{req.toUser}</strong>
              </p>
              {req.message && <p className="muted">“{req.message}”</p>}
              <p>
                Status:{" "}
                <span
                  className={`badge ${
                    req.status === "PENDING"
                      ? "yellow"
                      : req.status === "ACCEPTED"
                      ? "green"
                      : "gray"
                  }`}
                >
                  {req.status}
                </span>
              </p>
              {req.status === "PENDING" && (
                <div className="card-actions">
                  <button
                    className="btn"
                    onClick={() => updateStatus(req.requestId, "ACCEPTED")}
                  >
                    Accept
                  </button>
                  <button
                    className="btn ghost"
                    onClick={() => updateStatus(req.requestId, "REJECTED")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
