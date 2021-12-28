import React, { useState } from "react";
import { loginUser } from "../../api/User";
import "./Login.css";

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
      console.log(user);
      window.location = "/join";
    } catch (e) {
      alert(e.message);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <form onSubmit={submitHandler} className="logIn">
      <input
        value={email}
        name="email"
        type="email"
        onChange={changeHandler}
        placeholder="Email"
        className="loginEmail"
        required
      />
      <input
        name="password"
        type="password"
        value={password}
        onChange={changeHandler}
        placeholder="Password"
        className="loginPassword"
        required
      />
      <input type="submit" value="Login" className="submitLogin" />
    </form>
  );
}

export default Login;
