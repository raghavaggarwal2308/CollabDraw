import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./Home.css";

function Home() {
  return (
    <div>
      <nav className="navbar">
        <div className="loginButton">
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "rgb(235, 230, 230)",
            }}
          >
            Login
          </Link>
        </div>
        <div className="signupButton">
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "rgb(235, 230, 230)",
            }}
          >
            SignUp
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Home);
