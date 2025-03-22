import React from "react";

const LoginForm = () => {
  return (
      <form className="p-4 border rounded shadow bg-white align-middle">
        <h2 className="mb-4 text-center">Login</h2>

        <div className="mb-3">
          <label htmlFor="InputID" className="form-label">Employee ID</label>
          <input type="text" className="form-control" id="InputID" aria-describedby="idHelp" />
        </div>

        <div className="mb-3">
          <label htmlFor="InputPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="InputPassword" />
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