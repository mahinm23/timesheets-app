import React from "react";

const LoginForm = () => {
  return (
    <form className="login-form">
      <h2>Employee Login</h2>
      <div>
        <label htmlFor="employeeId">Employee ID</label>
        <input type="text" id="employeeId" placeholder="Enter your ID" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" />
      </div>
      <button type="submit">Login</button>
      <p>
        <a href="/forgot-password">Forgot Password?</a>
      </p>
    </form>
  );
};

export default LoginForm;