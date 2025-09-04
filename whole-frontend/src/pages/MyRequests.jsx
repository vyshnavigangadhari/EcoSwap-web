import { useEffect, useState } from "react";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(stored); // ✅ show all requests for testing
  }, []);

  return (
    <div className="container">
      <h1 className="brand">My Requests (Testing – All)</h1>
      {requests.length === 0 ? (
        <p className="muted">You haven’t sent any requests yet.</p>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
