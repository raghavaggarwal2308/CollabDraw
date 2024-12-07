import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../Logo/Logo";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function Navbar({ logOut, isAuthenticated }) {
  const history = useHistory();

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      const nav = document.querySelector(".navbar");
      if (nav !== null) {
        if (window.pageYOffset > 0) {
          nav.classList.add("add-shadow");
        } else {
          nav.classList.remove("add-shadow");
        }
      }
    });
  });
  return (
    <div className="navbar">
      <Logo />
      <div className="inner">
        {isAuthenticated === "true" ? (
          <>
            <span onClick={() => history.push("/join")} className="join">
              Join a Room
            </span>
            <span onClick={logOut} className="logout">
              Logout
            </span>
          </>
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
