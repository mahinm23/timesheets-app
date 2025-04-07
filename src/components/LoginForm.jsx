// File: src/components/LoginForm.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example role-based credential check
    if (employeeID === "consultant" && password === "consult123") {
      navigate("/consultant-dashboard");
    } else if (employeeID === "manager" && password === "manager123") {
      navigate("/manager-dashboard");
    } else if (employeeID === "executive" && password === "executive123") {
      navigate("/executive-dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <form className="p-4 border rounded shadow bg-white align-middle" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-center">Login</h2>

      <div className="mb-3">
        <label htmlFor="InputID" className="form-label">Employee ID</label>
        <input
          type="text"
          className="form-control"
          id="InputID"
          value={employeeID}
          onChange={(e) => setEmployeeID(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="InputPassword" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="InputPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Login</button>
      </div>

      <p className="text-center mt-3 mb-0">
        <a href="/forgot-password">Forgot Password?</a>
      </p>
    </form>
  );
};

export default LoginForm;
