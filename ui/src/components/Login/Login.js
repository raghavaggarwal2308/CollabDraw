import React from "react";

function Login() {
  return (
    <div>
      <label>Email</label>
      <input type="email" required />
      <label>Password</label>
      <input type="password" required />
    </div>
  );
}

export default Login;
