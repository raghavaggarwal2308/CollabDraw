import React, { useState } from "react";
import { loginUser } from "../../api/User";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const changeHandler = (e) => {
    const name = e.target.name;
    switch (name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({ email, password });
      window.location = "/join";
    } catch (e) {
      alert(e.message);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <form onSubmit={submitHandler}>
      <label>Email</label>
      <input
        value={email}
        name="email"
        type="email"
        onChange={changeHandler}
        required
      />
      <label>Password</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={changeHandler}
        required
      />
      <input type="submit" />
    </form>
  );
}

export default Login;
