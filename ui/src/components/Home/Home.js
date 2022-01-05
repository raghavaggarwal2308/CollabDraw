import React from "react";
import { Link, Redirect } from "react-router-dom";
// import { withRouter } from "react-router";
import "./Home.css";

function Home() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <>
      {isAuthenticated === "false" || isAuthenticated === null ? (
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
      ) : (
        <Redirect to="/join" />
      )}
    </>
  );
}

export default Home;
