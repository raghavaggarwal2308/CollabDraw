import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ logOut, isAuthenticated }) {
  return (
    <div className="navbar">
      {isAuthenticated === "true" ? (
        <div onClick={logOut} className="logout">
          Logout
        </div>
      ) : (
        <>
          <Link to="/login" className="login">
            Login
          </Link>
          <Link to="/signup" className="signup">
            Signup
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
