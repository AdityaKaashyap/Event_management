// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");     // or username
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/token/", {
        username: email,  // use username or email depending on backend
        password: password,
      });

      // Save tokens to localStorage
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      setMsg("✅ Login successful!");
    } catch (err) {
      setMsg("❌ Invalid credentials");
    }
  }

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username or Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
}
