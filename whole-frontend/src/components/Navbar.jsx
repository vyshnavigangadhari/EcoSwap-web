import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="nav">
      <NavLink to="/" className="brand">
        EcoSwap
      </NavLink>

      <div>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/add">Add Item</NavLink>
        <NavLink to="/swap-requests">Swap Requests</NavLink>
        <NavLink to="/my-requests">My Requests</NavLink>

        {user ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}

        {/* Always at the end */}
        <NavLink to="/about">About</NavLink>
      </div>
    </nav>
  );
}
