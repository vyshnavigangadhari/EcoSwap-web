// src/pages/Profile.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

  return (
    <section className="profile-page">
      {/* Header with title + logout button */}
      <div className="profile-header">
        <h1>Your Profile</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Profile card */}
      <div className="profile-card">
        <h3>{user.name || "Unknown User"}</h3>
        <p>{user.email || "No email available"}</p>
        <p>Role: {user.role || "Not assigned"}</p>
      </div>
    </section>
  );
}
