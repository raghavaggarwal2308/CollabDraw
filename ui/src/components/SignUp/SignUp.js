import React, { useState } from "react";
import { addUser } from "../../api/User";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const addUserDetails = async (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password, confirmPassword };
    try {
      const res = await addUser(user);
      window.location = "/join";
    } catch (e) {
      alert(e.message);
    }
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    switch (name) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;
      default:
    }
  };
  return (
    <form onSubmit={addUserDetails}>
      <label>First Name</label>
      <input
        value={firstName}
        type="text"
        required
        name="firstName"
        onChange={changeHandler}
      />
      <label>Last Name</label>
      <input
        value={lastName}
        type="text"
        name="lastName"
        onChange={changeHandler}
      />
      <label>Email</label>
      <input
        value={email}
        type="email"
        required
        name="email"
        onChange={changeHandler}
      />
      <label>Password</label>
      <input
        value={password}
        type="password"
        required
        name="password"
        onChange={changeHandler}
      />
      <label>Confirm Password</label>
      <input
        value={confirmPassword}
        type="password"
        required
        name="confirmPassword"
        onChange={changeHandler}
      />
      <input type="submit" />
    </form>
  );
}

export default SignUp;
