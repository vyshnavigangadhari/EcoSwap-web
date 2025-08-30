import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password); // ✅ pass fields
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
      
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit">Login</button>
          </form>
          <div className="switch-link">
            Don't Already have an account? <div><a href="/register">Register</a></div>
          </div>
      </div>
    </div>
    
  );
}
