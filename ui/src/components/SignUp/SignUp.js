import React, { useState, useEffect } from "react";
import { addUser } from "../../api/User";
import { Link, useHistory } from "react-router-dom";
import "./SignUp.css";

function SignUp({ setisAuthenticated }) {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    const form = document.getElementById("signupForm");
    form.addEventListener("submit", addUserDetails);
    return () => {
      form.removeEventListener("submit", addUserDetails);
    };
  });
  const addUserDetails = async (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password, confirmPassword };
    try {
      const res = await addUser(user);
      console.log(res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAuthenticated", true);
      setisAuthenticated("true");
      history.push("/join");
      // window.location = "/join";
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
    <div className="signUp">
      <p className="exploreLink">
        <Link to="/" style={{ color: "skyblue" }}>
          Explore
        </Link>
      </p>
      <h1 className="signupHead">SignUp</h1>
      <form id="signupForm" className="signupForm">
        <input
          value={firstName}
          type="text"
          required
          name="firstName"
          onChange={changeHandler}
          placeholder="First Name"
          className="firstName signupInput"
        />
        <input
          value={lastName}
          type="text"
          name="lastName"
          onChange={changeHandler}
          placeholder="Last Name"
          className="lastName signupInput"
        />
        <input
          value={email}
          type="email"
          required
          name="email"
          onChange={changeHandler}
          placeholder="Email"
          className="signupEmail signupInput"
        />
        <input
          value={password}
          type="password"
          required
          name="password"
          onChange={changeHandler}
          placeholder="Password"
          className="password signupInput"
        />
        <input
          value={confirmPassword}
          type="password"
          required
          name="confirmPassword"
          onChange={changeHandler}
          placeholder="Confirm Password"
          className="confirmPassword signupInput"
        />
        <input type="submit" value="SignUp" className="submitSign" />
        <p className="signupLogin">
          Already have an account?{" "}
          <Link to="/login" className="signupLoginLink">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
