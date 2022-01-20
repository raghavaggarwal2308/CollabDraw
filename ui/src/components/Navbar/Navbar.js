import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ logOut, isAuthenticated }) {
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      const nav = document.querySelector(".navbar");
      if (window.pageYOffset > 0) {
        nav.classList.add("add-shadow");
      } else {
        nav.classList.remove("add-shadow");
      }
    });
  });
  return (
    <div className="navbar">
      <div className="inner">
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
    </div>
  );
}

export default Navbar;
